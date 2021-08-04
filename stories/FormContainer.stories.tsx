import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import FormContainer from '../layouts/FormContainer';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'FormContainer',
  component: FormContainer,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof FormContainer>> = (args) => (
  <FormContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isFormOpen: true,
};
