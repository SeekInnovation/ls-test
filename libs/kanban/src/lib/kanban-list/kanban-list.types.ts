import {ReactNode} from "react";

export interface KanbanListProps {
  id: number;
  onAddItem(listId: number, text: string): void;
  children: ReactNode;
}
