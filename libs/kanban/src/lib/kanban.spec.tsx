import React from 'react';
import {render} from '@testing-library/react';

import Kanban from './kanban';

describe('Kanban', () => {
  it('should render successfully', () => {
    const {baseElement} = render(<Kanban helloWorldProp="Hello there!"/>);
    expect(baseElement).toBeTruthy();
  });
});
