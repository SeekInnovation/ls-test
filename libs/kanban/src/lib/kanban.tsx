import { Button, Card, CardContent, Checkbox, Paper, Stack, Typography } from '@material-ui/core';
import React from 'react';

import './kanban.module.scss';

/* eslint-disable-next-line */
export interface KanbanProps {
  helloWorldProp: string;
}

export function Kanban({ helloWorldProp }: KanbanProps) {
  return (
    <Paper sx={{ paddingBottom: 4 }}>
      <Stack spacing={2} margin={5} direction="row">
        <KanbanList>
          <KanbanItem />
          <KanbanItem />
          <KanbanItem />
          <Button>Add item</Button>
        </KanbanList>
        <KanbanList>
          <KanbanItem />
          <KanbanItem />
          <KanbanItem />
          <Button>Add item</Button>
        </KanbanList>
        <KanbanList>
          <KanbanItem />
          <KanbanItem />
          <KanbanItem />
          <Button>Add item</Button>
        </KanbanList>
      </Stack>
    </Paper>
  );
}

function KanbanItem() {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} direction="row" alignItems="center">
          <Checkbox />
          <Typography variant="h6">Some item</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

function KanbanList({ children }) {
  return (
    <Card variant="outlined" sx={{ bgcolor: 'grey.200', width: 400 }}>
      <CardContent>
        <Stack spacing={2}>{children}</Stack>
      </CardContent>
    </Card>
  );
}

export default Kanban;
