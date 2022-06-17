import {Button, Card, CardContent, Checkbox, Paper, Stack, Theme, Typography} from '@material-ui/core';
import React, {CSSProperties, Dispatch, useCallback, useContext, useReducer} from 'react';
import * as uuid from 'uuid';
import './kanban.module.scss';
import {assert, ReactChildOrChildren} from './util';
import {
  DragDropContext,
  Draggable,
  DraggableStateSnapshot,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
  ResponderProvided
} from "react-beautiful-dnd";
import {useTheme} from "@emotion/react";
// import '@theming/theme'; // TODO this would break the UI tests because jest/babel is not configured correctly. workaround is an ignored import on the next line
import {lightTheme as ignoredValue} from '@theming/theme'; // workaround (as mentioned above)
import {createInitialState, KanbanAction, KanbanItem, KanbanList, KanbanState, stateReducer} from "./state";


// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509
export const KanbanActionDispatchContext = React.createContext<Dispatch<KanbanAction>>(undefined as never);

// TODO how to nicely tell typescript that an emtpy object will be passed as arg?
// eslint-disable-next-line
export function Kanban({}: any) {
  const [state, dispatch] = useReducer(stateReducer, null, () => createInitialState());
  return (
    <Paper sx={{paddingBottom: 4}}>
      <KanbanActionDispatchContext.Provider value={dispatch}>
        <KanbanDragAndDropContext>
          <KanbanListsComponent lists={state.lists}/>
        </KanbanDragAndDropContext>
      </KanbanActionDispatchContext.Provider>
    </Paper>
  );
}

export function KanbanDragAndDropContext({children}: { children: ReactChildOrChildren }) {
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
        });
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

function KanbanListsComponent({lists}: { lists: KanbanList[] }) {
  return (
    <Stack spacing={2} margin={5} direction="row">
      {lists.map((list, index) => {
        return <KanbanListComponent key={list.id} list={list}/>
      })}
    </Stack>
  );
}


export function KanbanListComponent({list}: { list: KanbanList }) {
  const dispatch: Dispatch<KanbanAction> = useContext(KanbanActionDispatchContext);

  function handleAddItem() {
    dispatch({
      type: 'addItem',
      targetListId: list.id,
      item: {
        id: uuid.v4(),
        content: 'Dummy add text',
        checked: false,
      }
    });
  }

  const theme = useTheme() as Theme;
  return (
    // TODO does droppableId need to be unique over different types too? or is it enough to be unique among same type?
    <Droppable droppableId={list.id} type="KanbanItem">
      {(provided, snapshot) => {
        const backgroundColor = snapshot.isDraggingOver
          // TODO the ?. is a workaround for the unit tests to work as documented in 'worklog.md'
          ? theme.palette?.kanbanListBackgroundOnDraggingOver
          : theme.palette?.kanbanListBackground;
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

function KanbanItemComponent({item, index}: { item: KanbanItem, index: number }) {
  const dispatch: Dispatch<KanbanAction> = useContext(KanbanActionDispatchContext);

  function onCheckedChanged(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'updateItem',
      itemId: item.id,
      checked: event.target.checked,
    });
  }

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef}
             {...provided.draggableProps}
             {...provided.dragHandleProps}
             style={getKanbanItemStyle(provided.draggableProps.style, snapshot)}>
          <Card>
            <CardContent>
              <Stack spacing={2} direction="row" alignItems="center">
                <Checkbox checked={item.checked} onChange={onCheckedChanged}/>
                <Typography variant="h6">{item.content}</Typography>
              </Stack>
            </CardContent>
          </Card>
        </div>
      )
      }
    </Draggable>
  );
}

function getKanbanItemStyle(style: DraggingStyle | NotDraggingStyle | undefined,
                            snapshot: DraggableStateSnapshot): CSSProperties {
  if (snapshot.isDropAnimating) {
    // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/drop-animation.md
    const notDraggingStyle = style as NotDraggingStyle;
    return {
      ...notDraggingStyle,
      // Apparently it is important, that this is the last property so that it overrides the 'transition' aspect.
      transitionDuration: `0.15s`, // default is 0.34s
    };
  } else if (snapshot.isDragging) {
    const draggingStyle = style as DraggingStyle;
    draggingStyle.opacity = 0.8;
    return draggingStyle as CSSProperties;
  } else {
    return style as CSSProperties;
  }
}

export default Kanban;
