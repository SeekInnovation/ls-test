import { Button, Card, CardContent, Checkbox, Paper, Stack, Typography } from '@material-ui/core';
import React, { useCallback, useReducer, Dispatch, useMemo, useState } from 'react';
import {
  DndContext, DragEndEvent,
  DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { useSortable, SortableContext } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import './kanban.module.scss';

type ItemType = 'Backlog' | 'Progress' | 'Done'

function isItemType(data: string): data is ItemType {
  return data === 'Backlog' || data === 'Progress' || data === 'Done'
}

type Item = {
  text: string,
  type: ItemType,
}

type List = {
  items: string[]
}

type KanbanBoard = {
  lists: Map<ItemType, List>,
  items: Map<string, Item>
  nextId: number,
  dragging: string,
}

type Actions = { type: "ADD_ITEM", payload: {
  type: ItemType,
  }} | {
  type: 'SWITCH_TYPE', payload: { item: string, type: ItemType },
} | {
  type: 'SWITCH_TYPE_CARD', payload: { item: string, target: string }
}

function reducer(state: KanbanBoard, action: Actions) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const id = state.nextId.toString()
      state.items.set(id, { text: 'Hello World!', type: action.payload.type })
      state.lists.get(action.payload.type).items.push(id)
      state.nextId += 1
      return { ...state }
    }
    case 'SWITCH_TYPE': {
      console.log(action)
      const { item, type } = action.payload
      const itemObject = state.items.get(item)
      const oldType = itemObject.type
      console.log(itemObject)
      if (oldType === type) {
        return state
      }
      itemObject.type = type
      const oldList = state.lists.get(oldType)
      oldList.items = oldList.items.filter(oldItem => oldItem !== item)
      state.lists.get(type).items.push(item)
      console.log(state)
      return { ...state }
    }
    case 'SWITCH_TYPE_CARD': {
      const { item, target } = action.payload
      const type = state.items.get(target).type
      const itemObject = state.items.get(item)
      const oldType = itemObject.type
      console.log(itemObject)
      if (oldType === type) {
        return state
      }
      itemObject.type = type
      const oldList = state.lists.get(oldType)
      oldList.items = oldList.items.filter(oldItem => oldItem !== item)
      state.lists.get(type).items.push(item)
      console.log(state)
      return { ...state }
    }
  }
}

const initialKanbanBoard: KanbanBoard = {
  nextId: 1,
  items: new Map(),
  lists: new Map([["Backlog", { items: [] }], ["Progress", { items: [] }], ["Done", { items: [] }]]),
  dragging: null,
}

/* eslint-disable-next-line */
export interface KanbanProps {
  helloWorldProp: string;
}

export function Kanban({ helloWorldProp }: KanbanProps) {
  const [state, dispatch] = useReducer(reducer, initialKanbanBoard)

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  )

  const [activeId, setActiveId] = useState(null);

  const onDragStart = React.useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id)
  }, [setActiveId])

  const onDragOver = React.useCallback((event: DragOverEvent) => {
    if (!event.over) {
      return
    }
    if (isItemType(event.over.id)) {
      dispatch({ type: 'SWITCH_TYPE', payload: {
          item: event.active.id,
          type: event.over.id,
        }})
    }
    else {
      dispatch({ type: 'SWITCH_TYPE_CARD', payload: {
          item: event.active.id,
          target: event.over.id,
        }})

    }
  }, [dispatch]
  )

  const onDragEnd = React.useCallback((event: DragEndEvent) => {
    setActiveId(null)
  }, [setActiveId])

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
    <Paper sx={{ paddingBottom: 4 }}>
      <Stack spacing={2} margin={5} direction="row">
        <KanbanList dispatch={dispatch} type="Backlog" state={state}/>
        <KanbanList dispatch={dispatch} type="Progress" state={state} />
        <KanbanList dispatch={dispatch} type="Done" state={state} />
      </Stack>
    </Paper>
    <DragOverlay>
      {activeId ? (
        <KanbanItemRaw text={`Item ${activeId}`} />
      ): null}
    </DragOverlay>
    </DndContext>
  );
}

function KanbanItem({ item, state }: { item: string, state: KanbanBoard }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    active
  } = useSortable({ id: item });

  const itemData = React.useMemo(() => {
    return state.items.get(item)
  }, [state, item])

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (active === item) {
    return (<Card ref={setNodeRef} {...attributes} {...listeners} style={{ ...style, borderStyle: 'dashed' }}>
      <CardContent>
        <Stack spacing={2} direction="row" alignItems="center" style={{visibility: 'hidden'}}>
          <Checkbox />
          <Typography variant="h6">Hidden</Typography>
        </Stack>
      </CardContent>
    </Card>
    )
  }

  return (
    <KanbanItemRaw ref={setNodeRef} style={style} text={itemData.text} {...attributes} {...listeners} />
  );
}

const KanbanItemRaw = React.forwardRef(({ text, ...props }, ref) => {
  return (
    <Card ref={ref} {...props}>
      <CardContent>
        <Stack spacing={2} direction="row" alignItems="center">
          <Checkbox />
          <Typography variant="h6">{text}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
})

function KanbanList({ type, dispatch, state }: { type: ItemType, dispatch: Dispatch<Actions>, state: KanbanBoard }) {
  const addItem = useCallback(() => {
    dispatch({ type: 'ADD_ITEM', payload: { type } })
  }, [dispatch, type])

  const items = useMemo(() => {
    const items = [...state.lists.get(type).items]
    items.sort()
    return items
  }, [state, type])

  const { setNodeRef } = useDroppable({ id: type })

  return (
    <SortableContext items={items}>
      <Card ref={setNodeRef} variant="outlined" sx={{ bgcolor: 'grey.200', width: 400 }}>
      <CardContent>
        <Stack spacing={2}>
          {items.map(item => <KanbanItem key={item} item={item} state={state} />)}
          <Button onClick={addItem}>Add item</Button>
        </Stack>
      </CardContent>
    </Card>
    </SortableContext>
  );
}

export default Kanban;
