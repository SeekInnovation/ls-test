import React from 'react';
import {Button, Modal, TextField, Box} from "@material-ui/core";
import {useState} from "react";

import {AddItemModalProps} from "./add-item-modal.types";
import './add-item-modal.module.scss';

export const AddItemModal = ({onAddItem, open, onClose, ...props}: AddItemModalProps) => {
  const [text, setText] = useState('');

  const handleAddItem = () => {
    onAddItem(text);
    onClose();
    setText('');
  };

  return (
    <Modal
      className="modal-wrapper"
      {...{onClose, open}}
      {...props}>
      <div className="add-item-modal">
        <h2 style={{textAlign: 'center'}}>Add item</h2>
        <TextField autoFocus id="item-label-input" label="Item label" value={text} onChange={(e) => setText(e.target.value)} fullWidth />
        <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: 2}}>
          <Button onClick={handleAddItem} disabled={!text}>Add</Button>
          <Button onClick={onClose}>Cancel</Button>
        </Box>
      </div>
    </Modal>
  )
};
