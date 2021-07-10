import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import InvoiceStatus from '../components/InvoiceStatus';
import './invoice-status.css';

const ChevronSVG = (): JSX.Element => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="invoice__open-chevron"
    >
      <path d="M6 4L10 8L6 12" stroke="#7C5DFA" strokeWidth="2" />
    </svg>
  );
};

//👇 This default export determines where your story goes in the story list
export default {
  title: 'InvoiceStatus',
  component: InvoiceStatus,
  decorators: [
    (Story) => (
      <div className="invoice-status-storybook">
        <Story />
      </div>
    ),
  ],
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof InvoiceStatus>> = (args) => (
  <InvoiceStatus {...args} />
);

export const Paid = Template.bind({});
Paid.args = {
  status: 'paid',
};

export const Pending = Template.bind({});
Pending.args = {
  status: 'pending',
};

export const Draft = Template.bind({});
Draft.args = {
  status: 'draft',
};

export const WithRightIcon = Template.bind({});
WithRightIcon.args = {
  status: 'paid',
  rightIcon: <ChevronSVG />,
};

export const WithShowStatus = Template.bind({});
WithShowStatus.args = {
  status: 'pending',
  showStatus: true,
};
