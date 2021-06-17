import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Button, Grid, Stack } from '@material-ui/core';
import React, { useState } from 'react';
import CardItem from './Cards/CardItem';
import CardWrapper from './Cards/CardWrapper';
import './kanban.module.scss';
/* eslint-disable-next-line */
export interface KanbanProps {
  helloWorldProp: string;
}
import {getItems} from './utils/columnItems'
export function Kanban({ helloWorldProp }: KanbanProps) {
 
  const [columnList, setColumnList] = useState(1);
  const itemList = getItems(columnList);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        {itemList &&
          itemList.map((item, index) => (
            <Stack spacing={2} margin={5} direction="row" key={index}>
              <CardWrapper>
                <CardItem item={item} />
              </CardWrapper>
            </Stack>
          ))}

        <Button variant="contained" color="secondary" onClick={() => setColumnList((column) => column + 1)}>
          Add Item
        </Button>
      </Grid>
    </Grid>
  );
}

export default Kanban;
