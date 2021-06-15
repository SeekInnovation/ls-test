import { Button, Card, CardContent, Checkbox, Paper, Stack, Typography } from '@material-ui/core';
import React, { Dispatch, useCallback, useMemo, useReducer, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import './kanban.module.scss';
import { actions, Actions, initialKanbanBoard, isItemType, ItemType, KanbanBoard, reducer } from './model';
import { DefaultComponentProps, OverridableTypeMap } from '@material-ui/core/OverridableComponent';

/* eslint-disable-next-line */
export interface KanbanProps {
}

export function Kanban() {
  const [state, dispatch] = useReducer(reducer, initialKanbanBoard)

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  )

  const [activeId, setActiveId] = useState<string | undefined>(undefined)

  const onDragStart = React.useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id)
  }, [setActiveId])

  const onDragOver = React.useCallback((event: DragOverEvent) => {
    if (!event.over) {
      return
    }
    if (isItemType(event.over.id)) {
      dispatch(actions.switchType({ type: event.over.id, item: event.active.id }))
    }
    else {
      dispatch(actions.switchTypeToTypeOfOtherCard({ item: event.active.id,
          targetCard: event.over.id,
        }))
    }
  }, [dispatch]
  )

  const onDragEnd = React.useCallback((event: DragEndEvent) => {
    setActiveId(undefined)
  }, [setActiveId])

  const activeText = React.useMemo(() => {
    return activeId ? state.items[activeId].text : ''
  }, [state, activeId])

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
        <KanbanItemRaw text={activeText} />
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

  const itemData = state.items[item]

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined,
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

type KanbanItemRawProps = DefaultComponentProps<OverridableTypeMap> & {
  text: string,
}

const KanbanItemRaw = React.forwardRef<HTMLDivElement, KanbanItemRawProps>(({ text, ...props }, ref) => {
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

const cardNames = ['Hello', 'World', 'Worlds', 'Handy', 'Blocked']

function getCardName(): string {
  const name = cardNames.pop() as string
  cardNames.unshift(name)
  return name
}

function KanbanList({ type, dispatch, state }: { type: ItemType, dispatch: Dispatch<Actions>, state: KanbanBoard }) {
  const addItem = useCallback(() => {
    dispatch(actions.addItem({ type, text: getCardName() }))
  }, [dispatch, type])

  const unsortedItems = state.lists[type]
  const items = useMemo(() => {
    const items = [...unsortedItems]
    items.sort((itemA, itemB) => state.items[itemA].text.localeCompare(state.items[itemB].text))
    return items
  }, [state, unsortedItems])

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
