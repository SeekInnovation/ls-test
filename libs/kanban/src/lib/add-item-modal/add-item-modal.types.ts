import {ModalProps} from "@material-ui/core";

export interface AddItemModalProps extends Omit<ModalProps, 'children'> {
  onAddItem(text: string): void;
}
