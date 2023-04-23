import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { message } from 'antd';

import cn from 'classnames';
import OutlineButton from '@/components/button/OutlineButton';
import { NileCDNLoader } from '@utils/image/loader';

import { StatusTag } from '@components/tag/StatusTag';
import { MarketNftItemStatusType } from '@/services/nile/api';

interface StoryDetailNftType {
  data: StoryDetailNftData;
}

interface StoryDetailNftData {
  imgUrl: string;
  state: MarketNftItemStatusType;
  remain?: number;
  title: string;
  buttons: StoryDetailNftDataButton[];
  auction: {
    priceInfo: string;
    price: string;
    startIn: string;
  };
}

interface StoryDetailNftDataButton {
  name: string;
  link: string;
  type: 'primary' | 'default' | any;
  toastText?: string;
  disabled: boolean;
}
const StoryDetailNft = ({ data }: StoryDetailNftType) => {
  const { t } = useTranslation(['nile', 'common']);

  return (
    <div className={cn('story-detail-nft')}>
      <div className={cn('info')}>
        <div className={cn('info-image')}>
          <Image src={data.imgUrl} alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
        </div>
        <div className={cn('info-content')}>
          <StatusTag status={data.state} remain={data.remain} />
          <strong className={cn('info-title')}>{data.title}</strong>
          <div className={cn('info-button')}>
            {data.buttons.map((btn, index) => (
              <OutlineButton
                type={btn.type}
                key={`btn-${index}`}
                href={btn.disabled ? undefined : btn.link}
                buttonText={btn.name}
                color="black"
                size="sm"
                onClick={() =>
                  btn.disabled && message.info({ content: btn.toastText, key: 'toast' })
                }
              />
            ))}
          </div>
        </div>
      </div>
      <div className={cn('extra-info')}>
        <dl>
          <dt>{t(data.auction.priceInfo, { ns: 'common' })}</dt>
          <dd>
            {data.auction.price} <span className={cn('unit')}>WEMIX$</span>
          </dd>
        </dl>
        <dl>
          <dt>Opens on</dt>
          <dd>{data.auction.startIn}</dd>
        </dl>
      </div>
    </div>
  );
};

export default StoryDetailNft;
