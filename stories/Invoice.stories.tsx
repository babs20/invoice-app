import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import Invoice from '../components/Invoice';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Invoice',
  component: Invoice,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Invoice>> = () => <Invoice />;

export const Default = Template.bind({});
Default.args = {};
