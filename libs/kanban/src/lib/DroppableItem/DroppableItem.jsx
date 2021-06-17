import React from 'react'
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
export default function DraggableItem({ id, itemList }) {
    return (
        <SortableContext id={id} items={itemList} strategy={rectSortingStrategy}>
            <div></div>
        </SortableContext>
    )
}
