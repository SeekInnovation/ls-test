import { Button, Paper, Stack, Typography } from '@material-ui/core';
import React from 'react';

import './kanban.module.scss';

/* eslint-disable-next-line */
export interface KanbanProps {
  helloWorldProp: string
}

export function Kanban({ helloWorldProp }: KanbanProps) {
  return (
    <Paper>
      <Stack spacing={2} margin={2} marginY={2}>
        <Typography variant="h1">Welcome to kanban!</Typography>
        <Typography>{helloWorldProp}</Typography>
        <Button color="success" variant="contained">Test Button</Button>
      </Stack>
    </Paper>
  );
}

export default Kanban;
