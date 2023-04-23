import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { WemixNftUpload } from './index';

export default {
  title: 'Molecule/Token/Wemix/NFT/Uplaod',
  component: WemixNftUpload,
} as ComponentMeta<typeof WemixNftUpload>;

const Template: ComponentStory<typeof WemixNftUpload> = (args) => <WemixNftUpload {...args} />;

export const Default = Template.bind({});
