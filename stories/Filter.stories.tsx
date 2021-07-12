import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import Filter from '../components/Filter';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Filter',
  component: Filter,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Filter>> = (args) => <Filter />;

export const Default = Template.bind({});
Default.args = {};
