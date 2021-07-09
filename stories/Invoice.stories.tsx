import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import Invoice from '../components/Invoice';

import './invoice.css';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Invoice',
  component: Invoice,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="invoice-storybook">
        <Story />
      </div>
    ),
  ],
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Invoice>> = (args) => (
  <Invoice {...args} />
);

export const Paid = Template.bind({});
Paid.args = {
  id: 'RT3080',
  paymentDue: '2021-08-19',
  clientName: 'Jensen Huang',
  status: 'paid',
  total: '1,800.90',
};

export const Pending = Template.bind({});
Pending.args = {
  ...Paid.args,
  status: 'pending',
};

export const Draft = Template.bind({});
Draft.args = {
  ...Paid.args,
  status: 'draft',
};
