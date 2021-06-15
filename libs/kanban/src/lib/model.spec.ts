import {
  KanbanBoard,
  initialKanbanBoard,
  reducer,
  actions,
  ItemType,
  denormalizedToKanbanBoard,
  kanbanBoardToDenormalized
} from './model';

function getListTypeOfCard(state: KanbanBoard, item: string): ItemType | undefined {
  return state.items[item].type
}

function getNumCards(state: KanbanBoard, type: ItemType): number {
  return state.lists[type].length ?? 0
}

function actionAddItemToDone(text?: string) {
  return actions.addItem({ type: 'Done', text: text ?? 'Hello World!' })
}

function actionAddItemToBacklog(text?: string) {
  return actions.addItem({ type: 'Backlog', text: text ?? 'Hello World!' })
}

function actionSwitchItemToBacklog(item: string) {
  return actions.switchType({ type: 'Backlog', item })
}

function actionSwitchItemToDone(item: string) {
  return actions.switchType({ type: 'Done', item })
}

function lastAddedCardId(state: KanbanBoard) {
  return (state.nextId - 1).toString()
}

const stateWithCard = reducer(initialKanbanBoard, actionAddItemToDone())

describe('Kanban model', () => {
  it('puts card into correct list when adding', () => {
    const state = reducer(initialKanbanBoard, actionAddItemToDone())
    const id = lastAddedCardId(state)
    expect(getListTypeOfCard(state, id)).toBe('Done')
  });

  it('removes card when switching to a different type', () => {
    const id = lastAddedCardId(stateWithCard)
    const state = reducer(stateWithCard, actionSwitchItemToBacklog(id))
    expect(getNumCards(state, 'Done')).toBe(0)
  })

  it('moves card when switching to a different type', () => {
    const id = lastAddedCardId(stateWithCard)
    const state = reducer(stateWithCard, actionSwitchItemToBacklog(id))
    expect(getListTypeOfCard(state, id)).toBe('Backlog')
  })

  it('does nothing when switching to the same type', () => {
    const id = lastAddedCardId(stateWithCard)
    const state = reducer(stateWithCard, actionSwitchItemToDone(id))
    expect(getNumCards(state, 'Done')).toBe(1)
    expect(getListTypeOfCard(state, id)).toBe('Done')
  })
});

describe('State transformation', () => {
  // It isn't really isomorph because item ids might change.
  it('is isomoprh', () => {
    const denormalized = kanbanBoardToDenormalized(stateWithCard)
    const state = denormalizedToKanbanBoard(denormalized)
    expect(state).toEqual(stateWithCard)
  })

  it('denormalizes', () => {
    const state = [actionAddItemToDone('Hello'), actionAddItemToDone('World'), actionAddItemToBacklog('Worlds')]
      .reduce((state, action) => reducer(state, action), initialKanbanBoard)
    const denormalized = kanbanBoardToDenormalized(state)
    expect(denormalized.lists).toEqual({
      Backlog: [{ text: 'Worlds' }],
      Done: [{ text: 'Hello' }, { text: 'World' }],
      Progress: [],
    })
  })
})
