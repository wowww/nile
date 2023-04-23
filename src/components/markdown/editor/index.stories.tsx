import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MarkdownEditor } from './index';

export default {
  title: 'Molecule/Markdown/Editor',
  component: MarkdownEditor,
} as ComponentMeta<typeof MarkdownEditor>;

const Template: ComponentStory<typeof MarkdownEditor> = (args) => <MarkdownEditor {...args} />;

export const Default = Template.bind({});
