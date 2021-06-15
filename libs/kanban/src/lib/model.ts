export type ItemType = 'Backlog' | 'Progress' | 'Done'

export function isItemType(data: string): data is ItemType {
  return data === 'Backlog' || data === 'Progress' || data === 'Done';
}

type Item = {
  text: string,
  type: ItemType,
}

type DenormalizedItem = {
  text: string,
}

type DenormalizedKanbanBoard = {
  lists: { [key in ItemType]: DenormalizedItem[] }
}

export type KanbanBoard = {
  lists: { [key in ItemType]: string[] },
  items: { [key: string]: Item }
  nextId: number,
}

export function kanbanBoardToDenormalized(state: KanbanBoard): DenormalizedKanbanBoard {
  return {
    lists: Object.fromEntries<DenormalizedItem[]>(
      Object.entries(state.lists)
        .map(([key, items]) => [key, items.map(item => ({
          text: state.items[item].text,
        }))])
    )
  } as DenormalizedKanbanBoard
}

export function denormalizedToKanbanBoard(state: DenormalizedKanbanBoard): KanbanBoard {
  const values = Object.entries(state.lists)
    .flatMap(([type, items]) => items.map(item => ({
      ...item,
      type: type as ItemType,
    })))

  return values.reduce((state, item) => {
    return reducer(state, actions.addItem({ type: item.type, text: item.text }))
  }, initialKanbanBoard)
}

export const actions = {
  addItem: (payload: { type: ItemType, text: string }) => ({
    type: 'ADD_ITEM' as const,
    payload,
  }),
  switchType: (payload: { type: ItemType, item: string }) => ({
    type: 'SWITCH_TYPE' as const,
    payload,
  }),
  switchTypeToTypeOfOtherCard: (payload: { targetCard: string, item: string }) => ({
    type: 'SWITCH_TYPE_CARD' as const,
    payload,
  })

}

export type Actions = { [key in keyof typeof actions]: ReturnType<typeof actions[key]> }[keyof typeof actions]

function addItem(state: KanbanBoard, action: ReturnType<typeof actions.addItem>): KanbanBoard {
  const id = state.nextId.toString();
  return { ...state,
    items: {
      ...state.items,
      [id]: { text: action.payload.text, type: action.payload.type },
    },
    lists: {
      ...state.lists,
      [action.payload.type]: state.lists[action.payload.type].concat(id)
    },
    nextId: state.nextId + 1,
  }
}

function switchListTypeOfItem(state: KanbanBoard, action: ReturnType<typeof actions.switchType>): KanbanBoard {
  const { item, type } = action.payload;
  const itemObject = state.items[item];
  const oldType = itemObject.type;
  if (oldType === type) {
    return state;
  }
  return {
    ...state,
    items: {
      ...state.items,
      [item]: {
        ...state.items[item],
        type,
      }
    },
    lists: {
      ...state.lists,
      [oldType]: [
        ...state.lists[oldType].filter(oldItem => oldItem !== item)
      ],
      [type]: [
        ...state.lists[type].concat(item),
      ]
    }
  }
}

function switchListTypeOfItemToTargetItemType(state: KanbanBoard, action: ReturnType<typeof actions.switchTypeToTypeOfOtherCard>): KanbanBoard {
  const { item, targetCard } = action.payload;
  const type = state.items[targetCard].type;
  return switchListTypeOfItem(state, actions.switchType({
    type,
    item,
  }))
}

export function reducer(state: KanbanBoard, action: Actions) {
  switch (action.type) {
    case 'ADD_ITEM':
      return addItem(state, action)
    case 'SWITCH_TYPE':
      return switchListTypeOfItem(state, action)
    case 'SWITCH_TYPE_CARD':
      return switchListTypeOfItemToTargetItemType(state, action)
  }

  return state
}

export const initialKanbanBoard: KanbanBoard = {
  nextId: 1,
  items: {},
  lists:  {
    Backlog: [],
    Progress: [],
    Done: [],
  }
};
