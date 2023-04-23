import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MarkdownViewer } from './index';

export default {
  title: 'Molecule/Markdown/Viewer',
  component: MarkdownViewer,
} as ComponentMeta<typeof MarkdownViewer>;

const Template: ComponentStory<typeof MarkdownViewer> = (args) => <MarkdownViewer {...args} />;

export const Default = Template.bind({});

Default.args = {
  value: '# Title\n' +
    '## Subtitle\n' +
    '**Bold Text**',
};
