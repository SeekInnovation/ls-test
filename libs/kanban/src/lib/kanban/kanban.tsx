import { Paper, Stack } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';

import {KanbanList} from "../kanban-list/kanban-list";
import {KanbanItem} from "../kanban-item/kanban-item";

import './kanban.module.scss';
import {IKanbanItem} from "./kanban.types";

export function Kanban() {
  const columnsCount = 3;
  const [data, setData] = useState<IKanbanItem[]>([]);

  const handleDragEnd = (item) => {
    const {destination, draggableId} = item;

    setData(data.map((item) => item.id === draggableId ? {...item, listId: destination.droppableId * 1} : item))
  };

  const handleAddItem = (listId, text) => {
    const randomId = `${Math.round(Math.random() * 1000000000000)}`;
    const newItem = {id: randomId, listId, text};

    setData([...data, newItem]);
  };

  return (
    <Paper sx={{ paddingBottom: 4 }}>
      <Stack spacing={2} margin={5} direction="row" sx={{alignItems: 'flex-start'}}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {new Array(columnsCount).fill(0).map((_, index) => (
            <KanbanList key={`kanban-list-${index}`} onAddItem={handleAddItem} id={index}>
              {data.filter(({listId}) => listId === index).sort((a, b) => a.text.localeCompare(b.text)).map((item, id) => (
                <KanbanItem key={`kanban-list-${index}-item-${id}`} {...item} />
              ))}
            </KanbanList>
          ))}
        </DragDropContext>
      </Stack>
    </Paper>
  );
}

export default Kanban;
