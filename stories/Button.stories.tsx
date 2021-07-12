import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import Button from '../components/Button';

import './css/invoice.css';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Button',
  component: Button,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <Button {...args} />
);

export const NewInvoice = Template.bind({});
NewInvoice.args = {
  text: 'New Invoice',
  showCirclePlus: true,
};

export const MarkAsPaid = Template.bind({});
MarkAsPaid.args = {
  text: 'Mark as Paid',
};

export const Edit = Template.bind({});
Edit.args = {
  text: 'Edit',
  isEdit: true,
};

export const SaveAsDraft = Template.bind({});
SaveAsDraft.args = {
  text: 'Save as Draft',
  isSaveAsDraft: true,
};

export const Delete = Template.bind({});
Delete.args = {
  text: 'Delete',
  isDestructive: true,
};

export const AddNewItem = Template.bind({});
AddNewItem.args = {
  text: '+ Add New Item',
  isAddNewItem: true,
};
