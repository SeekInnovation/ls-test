import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CardItem from "../CardItem";

export default function CardSubItem({ data }) {
  return (
    <SortableContext
      items={data?.children?.map((el) => el.id)}
      strategy={verticalListSortingStrategy}
    >
      {data?.children?.map((data) => {
        return <CardItem key={data.id} item={data} />;
      })}
    </SortableContext>
  );
}
