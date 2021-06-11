/**
 * displaying images not working correctly and I was wasting too much time
 * trying to figure out why
 */
// import spoon from '../assets/spoon.jpg';
// const spoon = require('../assets/spoon.jpg');

import { Button, Paper, Stack, Typography, Grid } from '@material-ui/core';
import React, { useState } from 'react';

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

import { Droppable } from './Droppable.jsx';
import { Draggable } from './Draggable.jsx';

import './kanban.module.scss';

/* eslint-disable-next-line */
export interface KanbanProps {
  helloWorldProp: string;
}

export function Kanban({ helloWorldProp }: KanbanProps) {
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);

  // const draggableMarkup = (id) => (
  //   <Draggable id="draggable">
  //     <Paper onClick={() => console.log('clicked')} sx={{ p: 2 }} style={{ backgroundColor: 'rgba(145, 158, 171, 0.08)' }}>
  //       <Stack spacing={2} margin={2} marginY={2}>
  //         <Paper sx={{ p: 2 }}>
  //           <Stack>
  //             <Typography>Implement drag & drop api</Typography>
  //           </Stack>
  //         </Paper>
  //       </Stack>
  //     </Paper>
  //   </Draggable>
  // );

  // const droppableMarkup = (
  //   <Paper sx={{ p: 2 }} style={{ backgroundColor: 'rgba(145, 158, 171, 0.08)' }}>
  //     <Stack spacing={2} margin={2} marginY={2}>
  //       <Paper sx={{ p: 2 }}>
  //         <Stack>
  //           <Typography>Implement drag & drop api</Typography>
  //         </Stack>
  //       </Paper>
  //     </Stack>
  //   </Paper>
  // );

  // function handleDragEnd(event) {
  //   const { over } = event;

  //   console.log('over', over);
  //   setParent(over ? over.id : null);
  // }

  const [items, setItems] = useState([1, 2, 3]);
  const [markup, setMarkup] = useState([
    <Paper sx={{ p: 2 }} style={{ backgroundColor: 'rgba(145, 158, 171, 0.08)' }}>
      <Stack spacing={2} margin={2} marginY={2}>
        <Paper sx={{ p: 2 }}>
          <Stack>
            <Typography>Buy bread</Typography>
          </Stack>
        </Paper>
      </Stack>
    </Paper>,
    <Paper sx={{ p: 2 }} style={{ backgroundColor: 'rgba(145, 158, 171, 0.08)' }}>
      <Stack spacing={2} margin={2} marginY={2}>
        <Paper sx={{ p: 2 }}>
          <Stack>
            <Typography>Buy milk</Typography>
          </Stack>
        </Paper>
      </Stack>
    </Paper>,
    <Paper sx={{ p: 2 }} style={{ backgroundColor: 'rgba(145, 158, 171, 0.08)' }}>
      <Stack spacing={2} margin={2} marginY={2}>
        <Paper sx={{ p: 2 }}>
          <Stack>
            <Typography>Buy soy sauce</Typography>
          </Stack>
        </Paper>
      </Stack>
    </Paper>,
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd(event) {
    const { active, over } = event;
    console.log('active', active);
    console.log('over', over);
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={3}>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((id) => (
              <SortableItem key={id} id={id}>
                {markup[id - 1]}
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      </Grid>
    </Grid>
  );
}

// eslint-disable-next-line no-lone-blocks
{
  /* <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={3}>
        <DndContext onDragEnd={handleDragEnd}>
          {parent === null ? draggableMarkup : null}

          {containers.map((id) => (
            // We updated the Droppable component so it would accept an `id`
            // prop and pass it to `useDroppable`
            <Droppable key={id} id={id}>
              {parent === id ? draggableMarkup : 'Drop here'}
            </Droppable>
          ))}
        </DndContext>
        <Button variant="text" style={{ width: '100%', margin: '1em 0' }}>
          + Add Task
        </Button>
      </Grid>
    </Grid> */
}

export default Kanban;
