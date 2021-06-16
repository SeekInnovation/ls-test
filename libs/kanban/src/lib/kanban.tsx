import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Paper, Stack } from '@material-ui/core';
import React from 'react';
import CardItem from './Cards/CardItem';
import CardWrapper from './Cards/CardWrapper';
import './kanban.module.scss';
/* eslint-disable-next-line */
export interface KanbanProps {
  helloWorldProp: string;
}

export function Kanban({ helloWorldProp }: KanbanProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  return (
    <Paper sx={{ paddingBottom: 4 }}>
      <Stack spacing={2} margin={5} direction="row">
        <CardWrapper>
          <CardItem/>
        </CardWrapper>
      </Stack>
    </Paper>
  );
}

export default Kanban;
