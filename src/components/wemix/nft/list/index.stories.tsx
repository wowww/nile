import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { WemixNftList } from './index';

export default {
  title: 'Molecule/Token/Wemix/NFT/List',
  component: WemixNftList,
} as ComponentMeta<typeof WemixNftList>;

const Template: ComponentStory<typeof WemixNftList> = (args) => <WemixNftList {...args} />;

export const Default = Template.bind({});

Default.args = {
  contractAddress: '0x04ab92Cf7E4eba95d21FbfE08bb43e244Fb64018',
};
