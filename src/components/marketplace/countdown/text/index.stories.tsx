import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MarketCountdownText } from './index';

export default {
  title: 'Market/Countdown/Text',
  component: MarketCountdownText,
} as ComponentMeta<typeof MarketCountdownText>;

const Template: ComponentStory<typeof MarketCountdownText> = (args) => <MarketCountdownText {...args} />;

export const Default = Template.bind({});

Default.args = {
  expireTime: 180,
};
