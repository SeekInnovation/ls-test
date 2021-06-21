import React from "react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Paper,
  Stack,
  Typography,
  CardMedia
} from "@material-ui/core";
import CardItem from "../CardItem";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CardSubItem from "../CardSubItem";
export default function CardWrapper({ children, data }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: data.id,
    });
  const style = { transform: CSS.Transform.toString(transform), transition,marginRight:10};

  return (
    <>

      <Card
        variant="outlined"
        sx={{ bgcolor: "grey.200", width: 400 }}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
           <CardMedia
          style={{height:150}}
          image={data.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Stack spacing={2}>
            <CardItem item={data} />
          </Stack>
        </CardContent>

        <CardSubItem data={data} />
      </Card>
    </>
  );
}
