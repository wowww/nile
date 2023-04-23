import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';

import cn from 'classnames';
import { NileCDNLoader } from '@utils/image/loader';

interface NftsTitleType {
  title: string;
  titleColor: string;
  desc: string;
  subDesc: string;
}

const ConCitys = () => {
  const { t } = useTranslation('life');

  const [swiperClassName, setSwiperClassName] = useState('first-slide');

  return <div className={cn('life-con-inner nfts')}></div>;
};

export default ConCitys;
