import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CardList from "./Cards/CardList";
import "./kanban.module.scss";
import { getItems } from "./utils/columnItems";
/* eslint-disable-next-line */
export interface KanbanProps {
  helloWorldProp: string;
}
export function Kanban({ helloWorldProp }: KanbanProps) {
  const [columnList, setColumnList] = useState(1);
  const itemList = getItems(columnList);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [activeItem, setActiveItem] = useState(null);
  const [items, setItems] = useState(null);
  const handleDragStart = ({ active }) => {
    console.log(active, "active");
    setActiveItem(active.id);
  };
  useEffect(() => {
    setItems(itemList);
  }, [getItems, columnList]);

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setItems(() => {
        const oldIndex = items.findIndex((data) => data.id === active.id);
        const newIndex = items.findIndex((data) => data.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveItem(null);
  };

  return (
  
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveItem(null)}
      >
        {" "}
       

          <CardList itemList={items} />
      
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setColumnList((column) => column + 1)}
            style={{marginTop:10}}
          >
            Add Item
          </Button>
       
      </DndContext>

  );
}

export default Kanban;
