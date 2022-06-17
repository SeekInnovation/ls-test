import React, {useCallback} from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import sinon from 'ts-sinon';

import {Kanban, KanbanActionDispatchContext, KanbanListComponent} from './kanban';
import {KanbanAddItemAction, KanbanList} from "./state";
import {ReactChildOrChildren} from "./util";
import {DragDropContext, DropResult, ResponderProvided} from "react-beautiful-dnd";

describe('Kanban', () => {
  it('should render successfully', () => {
    const {baseElement} = render(<Kanban/>);
    expect(baseElement).toBeTruthy();
  });

  // TODO UI tests for drag'n'drop seem to be harder and I don't wanna play around with that: https://github.com/atlassian/react-beautiful-dnd/issues/623
  //  I wouldn't learn much from that.
  //  But maybe try what the other framework recommends: https://react-dnd.github.io/react-dnd/docs/testing
});

// TODO should UI tests be written in such a unit-test scope or more like integration tests?
describe('KanbanListComponent', () => {
  it('should call dispatch when adding item', async () => {
    const list: KanbanList = {
      id: "list-1",
      items: [],
    };

    const dispatch = sinon.spy();

    const {baseElement} = render(
      <KanbanActionDispatchContext.Provider value={dispatch}>
        <MockDragAndDropContext>
          <KanbanListComponent list={list}/>
        </MockDragAndDropContext>
      </KanbanActionDispatchContext.Provider>
    );
    expect(baseElement).toBeTruthy();

    const startAddingItemButton = await screen.findByLabelText("start-adding-item");
    fireEvent.click(startAddingItemButton);

    const newItemContentTextfield = (await screen.findByLabelText("new-item-content")).querySelector('input');
    fireEvent.change(newItemContentTextfield as Element, {target: {value: "new text"}});

    const addItemButton = await screen.findByLabelText("add-item");
    fireEvent.click(addItemButton);

    expect(dispatch.args[0][0]).toEqual({
      type: 'addItem',
      targetListId: list.id,
      item: {
        id: dispatch.args[0][0].item.id,
        content: 'new text',
        checked: false,
      }
    } as KanbanAddItemAction);
  });

});


function MockDragAndDropContext({children}: { children: ReactChildOrChildren }) {
  const onDragEnd = useCallback((result: DropResult, provided: ResponderProvided) => {
  }, []);

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      {children}
    </DragDropContext>
  );
}
