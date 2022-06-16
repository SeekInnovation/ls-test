import {Button, Card, CardContent, Checkbox, Paper, Stack, Theme, Typography} from '@material-ui/core';
import React, {Dispatch, useCallback, useContext, useReducer} from 'react';
// import {v4 as uuidv4} from 'uuid'; // TODO is there a performance difference? (like in minifying. normally not, right?)
import * as uuid from 'uuid';
import './kanban.module.scss';
import {assert, JsxChildOrChildren} from './util';
import {DragDropContext, Draggable, DraggingStyle, Droppable, DropResult, ResponderProvided} from "react-beautiful-dnd";
import {useTheme} from "@emotion/react";
import '@theming/theme';

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
      {
        id: "whatever",
        items: [],
      },
    ]
  }
}

type KanbanAddItemAction = {
  type: "addItem",
  targetListId: string,
  item: KanbanItem,
}

type KanbanMoveItemAction = {
  type: "moveItem",
  itemId: string,
  sourceListId: string,
  sourceIndex: number,
  targetListId: string,
  targetIndex: number,
}

type KanbanAction = KanbanAddItemAction | KanbanMoveItemAction;

// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509
const KanbanActionDispatchContext = React.createContext<Dispatch<KanbanAction>>(undefined as never);

function stateReducer(state: KanbanState, action: KanbanAction): KanbanState {
  // the following deep copy is slow, but I would use 'Structured Cloning' in an up-to-date NodeJS:
  // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
  const newState: KanbanState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "addItem": {
      const relevantList = newState.lists.find(value => value.id === action.targetListId);
      assert(relevantList !== undefined);
      relevantList.items.push(action.item);
      return newState;
    }
    case "moveItem": {
      const sourceList = newState.lists.find(value => value.id === action.sourceListId);
      assert(sourceList !== undefined);
      const targetList = newState.lists.find(value => value.id === action.targetListId);
      assert(targetList !== undefined);

      const item = sourceList.items[action.sourceIndex];
      assert(item.id === action.itemId);

      // remove item first
      sourceList.items.splice(action.sourceIndex, 1);

      // then add it to the target list
      targetList.items.splice(action.targetIndex, 0, item);

      return newState;
    }
    default:
      throw new Error();
  }
}

// eslint-disable-next-line no-empty-pattern
export function KanbanDragAndDropContext({children}: { children: JsxChildOrChildren }) {
  const dispatch: Dispatch<KanbanAction> = useContext(KanbanActionDispatchContext);

  const onBeforeCapture = useCallback(() => {
    /*...*/
  }, []);
  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragUpdate = useCallback(() => {
    /*...*/
  }, []);
  const onDragEnd = useCallback((result: DropResult, provided: ResponderProvided) => {
    assert(result.combine === null);
    if (!result.destination) {
      // unsuccessful drag
      return;
    }
    switch (result.type) {
      case "KanbanItem": {
        dispatch({
          type: "moveItem",
          itemId: result.draggableId,
          sourceListId: result.source.droppableId,
          sourceIndex: result.source.index,
          targetListId: result.destination.droppableId,
          targetIndex: result.destination.index,
        })
        break;
      }
      default:
        throw new Error();
    }
  }, [dispatch]);

  return (
    <DragDropContext
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      {children}
    </DragDropContext>
  );
}

// TODO how to nicely tell typescript that an emtpy object will be passed as arg?
// eslint-disable-next-line
export function Kanban({}: any) {
  const [state, dispatch] = useReducer(stateReducer, null, () => createInitialState());
  return (
    <Paper sx={{paddingBottom: 4}}>
      <KanbanActionDispatchContext.Provider value={dispatch}>
        <KanbanDragAndDropContext>
          <KanbanLists lists={state.lists}/>
        </KanbanDragAndDropContext>
      </KanbanActionDispatchContext.Provider>
    </Paper>
  );
}

export function KanbanLists({lists}: { lists: KanbanList[] }) {
  return (
    <Stack spacing={2} margin={5} direction="row">
      {lists.map((list, index) => {
        return <KanbanListComponent key={list.id} list={list}/>
      })}
    </Stack>
  );
}

function KanbanItemComponent({item, index}: { item: KanbanItem, index: number }) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        if (snapshot.isDragging) {
          const draggingStyle = provided.draggableProps.style as DraggingStyle;
          draggingStyle.opacity = 0.8;
        }
        return (
          <Card ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
            <CardContent>
              <Stack spacing={2} direction="row" alignItems="center">
                <Checkbox/>
                <Typography variant="h6">{item.content}</Typography>
              </Stack>
            </CardContent>
          </Card>
        );
      }
      }
    </Draggable>
  );
}

function KanbanListComponent({list}: { list: KanbanList }) {
  const dispatch: Dispatch<KanbanAction> = useContext(KanbanActionDispatchContext);

  function handleAddItem() {
    dispatch({
      type: 'addItem',
      targetListId: list.id,
      item: {
        id: uuid.v4(),
        content: 'Dummy add text',
      }
    });
  }

  const theme = useTheme() as Theme;
  return (
    // TODO does droppableId need to be unique over different types too? or is it enough to be unique among same type?
    <Droppable droppableId={list.id} type="KanbanItem">
      {(provided, snapshot) => {
        const backgroundColor = snapshot.isDraggingOver
          ? theme.palette.kanbanListBackgroundOnDraggingOver
          : theme.palette.kanbanListBackground;
        return (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Card variant="outlined" sx={{bgcolor: backgroundColor, width: 300}}
            >
              <CardContent>
                <Stack spacing={2}>
                  {list.items.map((item, index) => {
                    return <KanbanItemComponent key={item.id} item={item} index={index}/>
                  })}
                  {provided.placeholder}
                  <Button onClick={handleAddItem}>Add item</Button>
                </Stack>
              </CardContent>
            </Card>
          </div>
        );
      }}
    </Droppable>
  );
}

export default Kanban;
