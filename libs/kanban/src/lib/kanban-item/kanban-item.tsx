import {Card, CardContent, Stack, Typography} from "@material-ui/core";
import React from "react";
import {Draggable} from "react-beautiful-dnd";

import {KanbanItemProps} from "./kanban-item.types";

export function KanbanItem({id, text}: KanbanItemProps) {
  return (
    <Draggable key={`${id}`} draggableId={`${id}`}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <CardContent>
            <Stack spacing={2} direction="row" alignItems="center">
              <Typography variant="h6">{text}</Typography>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}
