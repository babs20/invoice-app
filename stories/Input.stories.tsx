import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import Input from '../components/Input';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Input',
  component: Input,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Input>> = (args) => (
  <Input {...args} />
);

export const Default = Template.bind({});
Default.args = {
  placeholder: '123 Main Street',
  name: 'Street Address',
};
