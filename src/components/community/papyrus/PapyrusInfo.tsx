import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
/* 22.11.02 수정: 다국어 추가 */
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';

const PapyrusInfo = () => {
  const { t } = useTranslation('community');
  const infoData = [
    {
      imgUrl: '/images/img_papyrus_info1.svg',
      title: t('papyrus.title-1'),
      desc: t('papyrus.text-1'),
    },
    {
      imgUrl: '/images/img_papyrus_info2.svg',
      title: t('papyrus.title-2'),
      desc: t('papyrus.text-2'),
    },
    {
      imgUrl: '/images/img_papyrus_info3.svg',
      title: t('papyrus.title-3'),
      desc: t('papyrus.text-3'),
    },
  ];

  return (
    <ul className={cn('info-list')}>
      {infoData.map((info) => {
        return (
          <li key={info.title}>
            <div className={cn('info-img')}>
              <span>
                <Image src={info.imgUrl} alt="" layout="fill" loader={NileCDNLoader} objectFit="cover" />
              </span>
            </div>
            <div className={cn('info-content')}>
              <h2 className={cn('info-title')}>{info.title}</h2>
              <p className={cn('info-desc')}>{info.desc}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PapyrusInfo;
