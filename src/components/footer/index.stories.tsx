import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Footer } from './index';

export default {
  title: 'Organism/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
