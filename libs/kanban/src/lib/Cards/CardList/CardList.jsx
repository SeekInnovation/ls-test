import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import CardWrapper from "../CardWrapper";
const CardList = ({ itemList }) => {
  const fakeArr = [{ id: 1 }, { id: 2 }];
  return (
    <div className="card-wrapper">
      <SortableContext
        items={itemList?.length > 0 ? itemList.map((task) => task.id) : fakeArr}
        strategy={horizontalListSortingStrategy}
      >
        {itemList &&
          itemList.map((data) => {
            return <CardWrapper key={data.id} data={data} />;
          })}
      </SortableContext>
    </div>
  );
};

export default CardList;
