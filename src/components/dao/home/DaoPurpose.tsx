import { daoThemeAtom } from '@/state/daoAtom';
import cn from 'classnames';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import Tag from '@/components/tag/Tag';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { FreeMode, Pagination } from 'swiper';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import useMediaQuery from '@/hook/useMediaQuery';

interface dataType {
  title: string;
  subTitle: string;
  subInfo: string;
  infoList?: {
    title: string;
    info: string;
    image: string;
  }[];
  comment?: string;
}

interface listType {
  title: string;
  info: string;
  image: string;
  index: number;
}
const DaoPurpose = () => {
  const { t } = useTranslation('daoHome');
  const activeDao = useAtomValue(daoThemeAtom);
  const swiperRef = useRef<SwiperCore>();

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1279px)');

  const purposeData: dataType = {
    title: t(`${activeDao.value}Showcase.purpose.title`),
    subTitle: t(`${activeDao.value}Showcase.purpose.subTitle`),
    subInfo: t(`${activeDao.value}Showcase.purpose.subInfo`),
    infoList: [
      {
        title: t(`${activeDao.value}Showcase.purpose.infoList.1.title`),
        info: t(`${activeDao.value}Showcase.purpose.infoList.1.info`),
        image: `https://nile.blob.core.windows.net/images/assets/images/img/img_dao_purpose_${activeDao.value}1.${
          activeDao.value === 'arteum' ? 'png' : 'svg'
        }`,
      },
      {
        title: t(`${activeDao.value}Showcase.purpose.infoList.2.title`),
        info: t(`${activeDao.value}Showcase.purpose.infoList.2.info`),
        image: `https://nile.blob.core.windows.net/images/assets/images/img/img_dao_purpose_${activeDao.value}2.${
          activeDao.value === 'arteum' ? 'png' : 'svg'
        }`,
      },
    ],
    comment: t(`${activeDao.value}Showcase.purpose.comment`),
  };
  const [size, setSize] = useState('sm');

  const windowWidthCheck = () => {
    if (isTablet && !isMobile) {
      setSize('md');
    } else if (isMobile) {
      setSize('sm');
    } else {
      setSize('lg');
    }
  };

  useEffect(() => {
    windowWidthCheck();
  }, [isMobile, isTablet]);

  useEffect(() => {
    swiperRef.current?.slideTo(0);
  }, [activeDao.value]);

  return (
    <div className={cn('purpose-contain', activeDao.value)}>
      <div className={cn('purpose-wrap')}>
        <div className={cn('purpose-info')}>
          <PurposeInfo title={purposeData.title} subTitle={purposeData.subTitle} subInfo={purposeData.subInfo} comment={purposeData.comment} />
        </div>
        <div className={cn('purpose-detail-info')}>
          <Swiper
            slidesPerView={size === 'sm' ? 1.01 : 2}
            resistanceRatio={0}
            modules={size === 'sm' ? [Pagination] : [FreeMode]}
            observer={true}
            spaceBetween={size === 'sm' ? 12 : 0}
            pagination={{
              clickable: true,
            }}
            onInit={(swiper: SwiperCore) => {
              swiperRef.current = swiper;
            }}
          >
            {purposeData.infoList?.map((t, i) => (
              <SwiperSlide key={`${t}}-${i}`}>
                <InfoList title={t.title} info={t.info} image={t.image} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

const PurposeInfo = ({ title, subTitle, subInfo, comment }: dataType) => {
  return (
    <div className={cn('purpose-box')}>
      <span className={cn('purpose-title')}>{title}</span>
      <strong className={cn('purpose-subtitle')}>{subTitle}</strong>
      <p className={cn('info')}>{subInfo}</p>
      <span className={cn('purpose-comment')}>{comment}</span>
    </div>
  );
};

const InfoList = ({ title, info, image, index }: listType) => {
  return (
    <div className={cn('purpose-info-list')}>
      <div className={cn('content-box')}>
        <span className={cn('info-list-num')}>
          <Tag size="s" color={'black'}>
            0{index + 1}
          </Tag>
        </span>
        <strong className={cn('info-list-title')}>{title}</strong>
        <p className={cn('info-list-detail')}>{info}</p>
      </div>
      <div className={cn('info-img-wrap')}>
        <ReactSVG src={image} />
      </div>
    </div>
  );
};

export default DaoPurpose;
