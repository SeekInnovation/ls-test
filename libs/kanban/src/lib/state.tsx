import React, {Dispatch} from 'react';
import * as uuid from 'uuid';
import './kanban.module.scss';
import {assert} from "./util";

export interface KanbanState {
  // TODO maybe store items separately to able to efficiently access item only via id.
  //  This makes it easier to address single items and is also closer to real-life situations.
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
  checked: boolean;
}


export function createInitialState(): KanbanState {
  const createItem = (content: string): KanbanItem => {
    return {
      id: uuid.v4(),
      content: content,
      checked: false,
    }
  }

  return {
    lists: [
      {
        id: "todo",
        items: [
          createItem("Task 1"),
          createItem("Task 2"),
        ],
      },
      {
        id: "in-progress",
        items: [
          createItem("Task 3"),
          createItem("Task 4"),
        ],
      },
      {
        id: "done",
        items: [
          createItem("Task 5"),
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

type KanbanUpdateItemAction = {
  type: "updateItem",
  itemId: string,
  checked: boolean,
}

export type KanbanMoveItemAction = {
  type: "moveItem",
  itemId: string,
  sourceListId: string,
  sourceIndex: number,
  targetListId: string,
  targetIndex: number,
}

export type KanbanAction = KanbanAddItemAction | KanbanMoveItemAction | KanbanUpdateItemAction;

export function stateReducer(state: KanbanState, action: KanbanAction): KanbanState {
  // the following deep copy is slow, but I would use 'Structured Cloning' in an up-to-date NodeJS:
  // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
  // Naturally, merging the state with the changes to preserve as much state as possible
  // would be more efficient but more work.
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
    case "updateItem": {
      // note: super inefficient, but whatever for this example.
      const relevantList = newState.lists.find(value => value.items.find(item => item.id === action.itemId) !== undefined);
      assert(relevantList !== undefined);

      const item = relevantList.items.find(item => item.id === action.itemId);
      assert(item !== undefined);
      assert(item.id === action.itemId);

      item.checked = action.checked;

      return newState;
    }
    default:
      throw new Error();
  }
}
