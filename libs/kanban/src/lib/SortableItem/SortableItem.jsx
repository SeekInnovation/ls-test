import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    userSelect: "none",
    cursor: "grab",

  };

  return (
    <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
      {props.children} 
    </div>
  );
};

export default SortableItem;
