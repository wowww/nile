import { ComponentMeta, ComponentStory } from '@storybook/react';
import MarketplaceSubBanner from './MarketplaceSubBanner';

export default {
  title: 'Marketplace/MarketplaceSubBanner',
  component: MarketplaceSubBanner,
  parameters: {
    componentSubtitle: '마켓플레이스 서브배너',
  },
  argTypes: {
    salesStatus: {
      description: '판매 상태',
    },
    title: {
      description: 'nft(콜렉션) 명',
    },
    collectionLink: {
      description: 'View NFT 버튼에 들어가는 경로',
    },
    lifeLink: {
      description: 'View Collection Info 버튼에 들어가는 경로',
    },
    imgUrl: {
      description: '백그라운드 이미지 경로 (백그라운드 이미지의 경우 /public/images/에 넣어준 후 경로 넘겨주어야 합니다.',
    },
  },
} as ComponentMeta<typeof MarketplaceSubBanner>;

const Template: ComponentStory<typeof MarketplaceSubBanner> = (args) => {
  return (
    <div style={{ maxWidth: '1200px' }}>
      <MarketplaceSubBanner {...args} />
    </div>
  );
};

export const Default = Template.bind({});

export const LondonUnderground = Template.bind({});

Default.args = {
  salesStatus: 'on sale',
  title: 'London Underground Station 264 Genesis',
  collectionLink: '/',
  lifeLink: '/',
  imgUrl: '/images/bg_market_collection_tangled.png',
};

LondonUnderground.args = {
  salesStatus: 'on sale',
  title: 'London Underground Station 264 Genesis',
  collectionLink: '/',
  lifeLink: '/',
  imgUrl: '/images/bg_market_collection_lus.png',
};
