import { forwardRef } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';
import { Popover } from 'antd';
import { useTranslation } from 'next-i18next';
import useMediaQuery from '@/hook/useMediaQuery';

// dao works list item
import HowDao1 from './HowDao1';
import HowDao2 from './HowDao2';
import HowDao3 from './HowDao3';
import HowDao4 from './HowDao4';

interface DaoWorksDataType {
  title: string;
  desc: string;
  bottom?: {
    type: 'link' | 'figure';
    linkText?: string;
    figure?: {
      desc: string;
      figure: string;
      unit: string;
    };
  };
  imgUrl: string;
  id: string;
}

const HowDaoWorks = forwardRef((props, ref: any) => {
  const { t } = useTranslation('dao');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const size = !isMobile ? 'lg' : 'sm';

  const DaoWorksData: DaoWorksDataType[] = [
    {
      title: t('station.recruiting.section.2.1.title'),
      desc: t('station.recruiting.section.2.1.desc'),
      bottom: {
        type: 'link',
        linkText: t('station.recruiting.section.2.1.link'),
      },
      imgUrl: '/images/img_recruit_dao_work_1.png',
      id: 'business-plan',
    },
    {
      title: t('station.recruiting.section.2.2.title'),
      desc: t('station.recruiting.section.2.2.desc'),
      imgUrl: '/images/img_recruit_dao_work_2.png',
      id: 'dao-token',
    },
    {
      title: t('station.recruiting.section.2.3.title'),
      desc: t('station.recruiting.section.2.3.desc'),
      bottom: {
        type: 'figure',
        figure: {
          desc: t('station.recruiting.section.2.3.tooltip.text'),
          figure: '26,280',
          unit: 'WEMIX/Month',
        },
      },
      imgUrl: '/images/img_recruit_dao_work_3.png',
      id: 'reward',
    },
  ];

  return (
    <div className={cn('dao-works-wrap')}>
      <ul className={cn('work-list')} ref={ref}>
        <HowDao1 />
        <HowDao2 />
        <HowDao3 />
        <HowDao4 />
      </ul>
      <div className={cn('reward-flow-img-area')}>
        <div className={cn('text-area')}>
          <strong className={cn('text-area-title')}>{t('station.recruiting.section.2.4.title')}</strong>
          <p className={cn('text-paragraph')}>{t('station.recruiting.section.2.4.desc')}</p>
        </div>
        <div className={cn('img-area')}>
          <Image
            src={`/images/img_dao_reward_flow_${size}.png`}
            alt=""
            layout="fill"
            quality="100"
            loading="eager"
            objectFit="contain"
            loader={NileCDNLoader}
          />
        </div>
        <ul className={cn('desc-list')}>
          <li>{t('station.recruiting.section.2.4.list.1')}</li>
        </ul>
      </div>
    </div>
  );
});

export default HowDaoWorks;
