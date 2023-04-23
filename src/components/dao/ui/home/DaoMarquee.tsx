import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import useMediaQuery from '@/hook/useMediaQuery';

const DaoMarquee = () => {
  const { t } = useTranslation('daoHome');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1279px)');

  const MarqueeData = [
    {
      imageUrl: '/assets/images/img/arteum/img_arteum_item1.jpg',
      alt: '',
    },
    {
      imageUrl: '/assets/images/img/arteum/img_arteum_item2.jpg',
      alt: '',
    },
    {
      imageUrl: '/assets/images/img/arteum/img_arteum_item3.jpg',
      alt: '',
    },
    {
      imageUrl: '/assets/images/img/arteum/img_arteum_item4.jpg',
      alt: '',
    },
    {
      imageUrl: '/assets/images/img/arteum/img_arteum_item5.jpg',
      alt: '',
    },
    {
      imageUrl: '/assets/images/img/arteum/img_arteum_item6.jpg',
      alt: '',
    },
    {
      imageUrl: '/assets/images/img/arteum/img_arteum_item7.jpg',
      alt: '',
    },
    {
      imageUrl: '/assets/images/img/arteum/img_arteum_item8.jpg',
      alt: '',
    },
    {
      imageUrl: '/assets/images/img/arteum/img_arteum_item9.jpg',
      alt: '',
    },
    {
      imageUrl: '/assets/images/img/arteum/img_arteum_item10.jpg',
      alt: '',
    },
  ];

  const itemCount = MarqueeData.length;
  const transitionDuration = `${itemCount * 5}s`;
  const bannerListStyle = {
    '--banner-show-el': itemCount,
    '--item-width': isMobile ? '154px' : isTablet ? '202px' : '270px',
    animation: `scrolling-type${isMobile ? '-s' : isTablet ? '-m' : ''} ${transitionDuration} linear infinite`,
  } as React.CSSProperties;

  const originalEl: React.ReactElement[] = [];
  const copyEvent = (times: number) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < times; i++) {
      originalEl.push(
        ...MarqueeData.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className={cn('banner-item')} key={'item' + idx + i}>
            <div className={cn('banner-inner')}>
              <Image src={item.imageUrl} loader={NileCDNLoader} layout="fill" alt={item.alt} />
            </div>
          </div>
        )),
      );
    }
    return originalEl;
  };

  return (
    <div className={cn('marquee-wrap')}>
      <strong className={cn('marquee-wrap-title')}>{t('daoMarquee')}</strong>
      <div className={cn('type-banner')} style={bannerListStyle}>
        {copyEvent(2)}
      </div>
    </div>
  );
};

export { DaoMarquee };
