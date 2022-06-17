import {
  Button,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Paper,
  Stack,
  TextField,
  Theme,
  Typography
} from '@material-ui/core';
import React, {CSSProperties, Dispatch, useCallback, useContext, useReducer, useState} from 'react';
import * as uuid from 'uuid';
import './kanban.module.scss';
import {assert, deepCopy, ReactChildOrChildren} from './util';
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
import {faBan, faCheck} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


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
                  <KanbanListAddItemComponent listId={list.id}></KanbanListAddItemComponent>
                </Stack>
              </CardContent>
            </Card>
          </div>
        );
      }}
    </Droppable>
  );
}

export function KanbanListAddItemComponent({listId}: { listId: string }) {
  const dispatch: Dispatch<KanbanAction> = useContext(KanbanActionDispatchContext);

  // null if **no** item is being added
  // non-null if item is being added
  const [newItem, setNewItem] = useState<KanbanItem | null>(null);
  const showAddItemButton = newItem === null;
  const showItemContentEditor = newItem !== null;

  function addItemIfPossibleAndClear() {
    if (newItem === null) {
      // already cleared
    } else {
      if (newItem.content.length !== 0) {
        dispatch({
          type: 'addItem',
          targetListId: listId,
          item: newItem
        });
      }
      setNewItem(null);
    }
  }

  function clear() {
    if (newItem === null) {
      // already cleared
    } else {
      setNewItem(null);
    }
  }

  function handleAddItemButtonClicked() {
    if (newItem !== null) {
      addItemIfPossibleAndClear();
    }
    const value: KanbanItem = {
      id: uuid.v4(),
      content: "",
      checked: false,
    };
    setNewItem(value);
  }

  function handleContentChanged(event: React.ChangeEvent<HTMLInputElement>) {
    assert(newItem !== null);
    const value = deepCopy(newItem);
    value.content = event.target.value;
    setNewItem(value);
  }

  function handleKeypressOnTextfield(event: React.KeyboardEvent<HTMLInputElement>) {
    assert(newItem !== null);
    if (event.key === 'Enter') {
      addItemIfPossibleAndClear();
      event.preventDefault();
    }
  }

  function handleCheckedChanged(event: React.ChangeEvent<HTMLInputElement>) {
    assert(newItem !== null);
    const value = deepCopy(newItem);
    value.checked = event.target.checked;
    setNewItem(value);
  }

  return (
    // TODO it is not very intuitive that this component returns a fragment, how to improve this? this behavior is tightly coupled with KanbanListComponent
    <>
      {showItemContentEditor && (
        <Card>
          <CardContent>
            <TextField id="content" label="Content" variant="standard"
                       aria-label="new-item-content"
                       value={newItem!.content} onChange={handleContentChanged}
                       onKeyPress={handleKeypressOnTextfield} />
            <Stack spacing={2} direction="row" alignItems="center">
              <Checkbox checked={newItem!.checked} onChange={handleCheckedChanged} />
              <IconButton aria-label="add-item" disabled={newItem!.content === ""}
                          onClick={addItemIfPossibleAndClear}>
                <FontAwesomeIcon icon={faCheck} width={24} height={24}/>
              </IconButton>
              <IconButton aria-label="clear" onClick={clear}>
                <FontAwesomeIcon icon={faBan} width={24} height={24} />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
      )}
      {showAddItemButton && (
        <Button aria-label="start-adding-item" onClick={handleAddItemButtonClicked}>Add item</Button>
      )}
    </>
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
