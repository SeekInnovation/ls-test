import {Button, Card, CardContent, Checkbox, Paper, Stack, Typography} from '@material-ui/core';
import React from 'react';

import './kanban.module.scss';

/* eslint-disable-next-line */
export interface KanbanProps {
  helloWorldProp: string;
}

// TODO how to properly name components differently from relevant data structures? is 'Component'-postfix ok for UI?
export interface KanbanColumn {
  id: string;
  items: KanbanItem[];
}

// TODO store order of items separately? they at least stored the columnOrder similarily in the DND tutorial, probably to mimick how an API would return the data.

export interface KanbanItem {
  id: string;
  content: string;
}


export function Kanban({helloWorldProp}: KanbanProps) {
  return (
    <Paper sx={{paddingBottom: 4}}>
      <Stack spacing={2} margin={5} direction="row">
        <KanbanListComponent>
          <KanbanItemComponent/>
          <KanbanItemComponent/>
          <KanbanItemComponent/>
          <Button>Add item</Button>
        </KanbanListComponent>
        <KanbanListComponent>
          <KanbanItemComponent/>
          <KanbanItemComponent/>
          <KanbanItemComponent/>
          <Button>Add item</Button>
        </KanbanListComponent>
        <KanbanListComponent>
          <KanbanItemComponent/>
          <KanbanItemComponent/>
          <KanbanItemComponent/>
          <Button>Add item</Button>
        </KanbanListComponent>
      </Stack>
    </Paper>
  );
}

function KanbanItemComponent() {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} direction="row" alignItems="center">
          <Checkbox/>
          <Typography variant="h6">Some item</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

function KanbanListComponent({children}: { children: JSX.Element[] }) {
  return (
    // TODO because of this hard-coded color, the darkMode doesn't work properly
    <Card variant="outlined" sx={{bgcolor: 'grey.200', width: 400}}>
      <CardContent>
        <Stack spacing={2}>{children}</Stack>
      </CardContent>
    </Card>
  );
}

export default Kanban;
