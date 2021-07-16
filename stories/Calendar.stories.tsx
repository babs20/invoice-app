import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import DatePicker from '../components/DatePicker';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'DatePicker',
  component: DatePicker,
  // parameters: {
  //   layout: 'centered',
  // },
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof DatePicker>> = (args) => (
  <DatePicker />
);

export const Default = Template.bind({});
Default.args = {};
