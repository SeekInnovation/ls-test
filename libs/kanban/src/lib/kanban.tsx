import {Button, Card, CardContent, Checkbox, Paper, Stack, Typography} from '@material-ui/core';
import React, {useReducer, useState} from 'react';
// import {v4 as uuidv4} from 'uuid'; // TODO is there a performance difference? (like in minifying. normally not, right?)
import * as uuid from 'uuid';
import './kanban.module.scss';

export interface KanbanState {
  lists: KanbanList[],
}

// TODO how to properly name components differently from relevant data structures? is 'Component'-postfix ok for UI?
export interface KanbanList {
  id: string;
  items: KanbanItem[];
}

// TODO store order of items separately? they at least stored the columnOrder similarily in the DND tutorial, probably to mimick how an API would return the data.

export interface KanbanItem {
  id: string;
  content: string;
}


function createInitialState(): KanbanState {
  return {
    lists: [
      {
        id: "todo",
        items: [
          {
            id: uuid.v4(),
            content: "Task 1",
          },
          {
            id: uuid.v4(),
            content: "Task 2",
          },
        ],
      },
      {
        id: "in-progress",
        items: [
          {
            id: uuid.v4(),
            content: "Task 3",
          },
          {
            id: uuid.v4(),
            content: "Task 4",
          },
        ],
      },
      {
        id: "done",
        items: [
          {
            id: uuid.v4(),
            content: "Task 5",
          },
        ],
      },
    ]
  }
}

type KanbanAddItemAction = {
  type: "add",
  item: KanbanItem,
}
type KanbanAction = KanbanAddItemAction;

function stateReducer(state: KanbanState, action: KanbanAction): KanbanState {
  switch (action.type) {
    case "add":
      throw new Error("todo implement");
    default:
      throw new Error(`unknown action type ${action.type}`);
  }
}

export function Kanban({helloWorldProp}: { helloWorldProp: string }) {
  const [state, dispatch] = useReducer(stateReducer, null, () => createInitialState());
  return (
    <Paper sx={{paddingBottom: 4}}>
      <Stack spacing={2} margin={5} direction="row">
        {state.lists.map((list, index) => {
          return <KanbanListComponent key={list.id} list={list}/>
        })}
      </Stack>
    </Paper>
  );
}

function KanbanItemComponent({item}: { item: KanbanItem }) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} direction="row" alignItems="center">
          <Checkbox/>
          <Typography variant="h6">{item.content}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

function KanbanListComponent({list}: { list: KanbanList }) {
  return (
    // TODO because of this hard-coded color, the darkMode doesn't work properly
    <Card variant="outlined" sx={{bgcolor: 'grey.200', width: 400}}>
      <CardContent>
        <Stack spacing={2}>
          {list.items.map((item, index) => {
            return <KanbanItemComponent key={item.id} item={item}/>
          })}
          <Button>Add item</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Kanban;
