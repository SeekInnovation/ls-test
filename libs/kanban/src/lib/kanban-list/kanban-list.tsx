import {Button, Card, CardContent, Stack} from "@material-ui/core";
import React, {useState} from "react";
import {Droppable} from "react-beautiful-dnd";

import {AddItemModal} from "../add-item-modal/add-item-modal";

import {KanbanListProps} from "./kanban-list.types";

export function KanbanList({id, onAddItem, children}: KanbanListProps) {
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const handleOpenAddItemModal = () => {
    setShowAddItemModal(true);
  };

  const handleCloseAddItemModal = () => {
    setShowAddItemModal(false);
  };

  const handleAddItem = (text: string) => {
    onAddItem(id, text);
  };

  return (
    <>
      <Droppable key={`${id}`} droppableId={`${id}`}>
        {(provided) => (
          <Card ref={provided.innerRef} variant="outlined" sx={{ bgcolor: 'grey.200', width: 400 }} {...provided.droppableProps}>
            <CardContent>
              <Stack spacing={2}>
                {children}
                <Button onClick={handleOpenAddItemModal}>Add Item</Button>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Droppable>
      <AddItemModal onAddItem={handleAddItem} open={showAddItemModal} onClose={handleCloseAddItemModal} />
    </>
  );
}
