import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  console.log('isOver', isOver);

  return (
    <Grid item xs={3} ref={setNodeRef} style={style}>
      {props.children}
      <Button variant="text" style={{ width: '100%', margin: '1em 0' }}>
        + Add Task
      </Button>
    </Grid>
  );
}
