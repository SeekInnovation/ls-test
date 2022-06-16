import { Meta, Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import Kanban from './kanban';
// Declare which Story you want. With the / syntax grouping is possible

export default {
  title: 'Kanban',
  component: Kanban,
} as Meta;

// Generate the Template

const Template: Story<ComponentProps<typeof Kanban>> = (args) => <Kanban {...args} />;

// Bind the Template
export const Default = Template.bind({});

// Fill the Template with default values
Default.args = {} as ComponentProps<typeof Kanban>;


