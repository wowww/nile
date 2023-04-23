import { ComponentMeta, ComponentStory } from '@storybook/react';
import LikeButton from './LikeButton';

export default {
  title: 'Button/LikeButton',
  component: LikeButton,
} as ComponentMeta<typeof LikeButton>;

export const Default: ComponentStory<typeof LikeButton> = (args) => <LikeButton {...args} />;

Default.args = {
  count: 100,
};
