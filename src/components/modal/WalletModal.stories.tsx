import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import OutlineButton from '../button/OutlineButton';
import WalletModal from './WalletModal';

export default {
  title: 'Modal/WalletModal',
  component: WalletModal,
  parameters: {
    componentSubtitle: '월렛 승인 팝업',
    // antd 모달에서 footer의 컴포넌트 배열을 넘기는데 스토리북에서 Error: Evaluation failed: TypeError: Cannot convert a Symbol value to a string 노출
    // https://github.com/storybookjs/storybook/issues/11554
    docs: {
      source: {
        code: 'Disabled for this story, see https://github.com/storybookjs/storybook/issues/11554',
      },
    },
  },
  argTypes: {
    isOpen: {
      defaultValue: true,
      description: '모달 오픈 여부',
    },
    setIsOpen: {
      description: '모달 오픈 여부 컨트롤 하는 state 함수',
    },
    type: {
      description: '결제 프로세스 단계. 단계에 따라서 이미지, 안내 텍스트가 변경됨',
      options: ['process01', 'process02'],
      control: { type: 'select' },
    },
    progressText: {
      description: '팝업의 종류는 월렛 승인, 월렛 결제으로 정해지는데 이에 따라 진행중인 텍스트를 보여줌',
      options: ['approve', 'payment'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof WalletModal>;

const Template: ComponentStory<typeof WalletModal> = (args) => {
  return <WalletModal {...args} />;
};

export const Default: ComponentStory<typeof WalletModal> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <OutlineButton buttonText="월렛팝업 활성화" color="black" size="md" onClick={() => setIsOpen(!isOpen)}>
        모달 활성화
      </OutlineButton>
      {isOpen && <Template {...args} setIsOpen={setIsOpen} />}
    </>
  );
};

Default.args = {
  isOpen: true,
  type: 'process01',
  progressText: 'approve',
};
