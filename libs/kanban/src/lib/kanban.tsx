import {Button, Card, CardContent, Checkbox, Paper, Stack, Typography} from '@material-ui/core';
import React, {Dispatch, useContext, useReducer} from 'react';
// import {v4 as uuidv4} from 'uuid'; // TODO is there a performance difference? (like in minifying. normally not, right?)
import * as uuid from 'uuid';
import './kanban.module.scss';
import {assert} from './util';

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
  targetListId: string,
  item: KanbanItem,
}
type KanbanAction = KanbanAddItemAction;

// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509
const KanbanActionDispatchContext = React.createContext<Dispatch<KanbanAction>>(undefined as never);

function stateReducer(state: KanbanState, action: KanbanAction): KanbanState {
  // the following deep copy is slow, but I would use 'Structured Cloning' in an up-to-date NodeJS:
  // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
  const newState: KanbanState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "add": {
      const relevantList = newState.lists.find(value => value.id === action.targetListId);
      assert(relevantList !== undefined);
      relevantList.items.push(action.item);
      return newState;
    }
    default:
      throw new Error(`unknown action type ${action.type}`);
  }
}

export function Kanban({helloWorldProp}: { helloWorldProp: string }) {
  const [state, dispatch] = useReducer(stateReducer, null, () => createInitialState());
  return (
    <Paper sx={{paddingBottom: 4}}>
      <KanbanActionDispatchContext.Provider value={dispatch}>
        <Stack spacing={2} margin={5} direction="row">
          {state.lists.map((list, index) => {
            return <KanbanListComponent key={list.id} list={list}/>
          })}
        </Stack>
      </KanbanActionDispatchContext.Provider>
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
  const dispatch: Dispatch<KanbanAction> = useContext(KanbanActionDispatchContext);

  function handleAddItem() {
    dispatch({
      type: 'add',
      targetListId: list.id,
      item: {
        id: uuid.v4(),
        content: 'Dummy add text',
      }
    });
  }

  return (
    // TODO because of this hard-coded color, the darkMode doesn't work properly
    <Card variant="outlined" sx={{bgcolor: 'grey.200', width: 400}}>
      <CardContent>
        <Stack spacing={2}>
          {list.items.map((item, index) => {
            return <KanbanItemComponent key={item.id} item={item}/>
          })}
          <Button onClick={handleAddItem}>Add item</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Kanban;
