import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MarketViewCount } from './index';

export default {
  title: 'Market/ViewCount',
  component: MarketViewCount,
} as ComponentMeta<typeof MarketViewCount>;

const Template: ComponentStory<typeof MarketViewCount> = (args) => <MarketViewCount {...args} />;

export const Default = Template.bind({});

Default.args = {
  views: 0,
};
