import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ReactNode } from 'react';
import OutlineButton from './OutlineButton';

export default {
  title: 'Button/OutlineButton',
  component: OutlineButton,
  parameters: {
    componentSubtitle: '단일 형태의 버튼 I를 생성',
  },
  argTypes: {
    buttonText: {
      description: '버튼 텍스트 값',
    },
    color: {
      description: '버튼 컬러 값',
      options: ['black', 'white', 'gray', 'highlight'],
      control: { type: 'select' },
    },
    size: {
      description: '버튼 사이즈 값',
      options: ['lg', 'lg-f', 'md', 'sm'],
      control: { type: 'select' },
    },
    type: {
      description: '링크 타입일 경우 Props : type="link", href="경로" 는 필수. target="_blank"는 필요에 따라 적용',
    },
    iconType: {
      defaultValue: false,
      description: '아이콘 사용 여부',
      control: { type: 'boolean' },
    },
    iconValue: {
      description: '아이콘',
      options: ['info', 'papyrus', 'reset', 'filter', 'alarm', 'link', 'twitterColor', 'instaColor'],
      control: { type: 'select' },
    },
    align: {
      defaultValue: false,
      description: '아이콘 정렬 여부 (좌측, 우측)',
      control: { type: 'boolean' },
    },
  },
} as ComponentMeta<typeof OutlineButton>;

const Background = ({ children, bgColor }: { children: ReactNode; bgColor: string }) => {
  return <div style={{ height: '200px', padding: '5px', background: bgColor }}>{children}</div>;
};

const Template: ComponentStory<typeof OutlineButton> = (args) => {
  if (args.color === 'white') {
    return (
      <Background bgColor="#000">
        <OutlineButton {...args} />;
      </Background>
    );
  }
  return <OutlineButton {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  buttonText: 'lg outline black',
  color: 'black',
  size: 'lg',
};
