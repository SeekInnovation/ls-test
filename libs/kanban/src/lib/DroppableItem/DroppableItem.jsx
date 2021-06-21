import React from 'react'
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "../SortableItem";
export default function DraggableItem({ item}) {
    return (
        <SortableContext items={item.id} strategy={rectSortingStrategy}>
          <SortableItem id={item?.id}/>
        </SortableContext>
    )
}
