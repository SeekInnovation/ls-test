import React from 'react';
import * as uuid from 'uuid';
import './kanban.module.scss';

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
