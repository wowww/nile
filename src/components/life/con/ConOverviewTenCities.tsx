import React from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import cn from 'classnames';
import { NileCDNLoader } from '@utils/image/loader';

interface CitiesProps {
  name: string;
  active: boolean;
}

const ConOverviewCities = () => {
  const { t } = useTranslation('life');

  const cities: CitiesProps[] = [
    {
      name: 'neith',
      active: true,
    },
    /* 23.04.04 수정: active true로 수정 */
    {
      name: 'ra',
      active: true,
    },
    {
      name: 'shu',
      active: false,
    },
    {
      name: 'tefnut',
      active: false,
    },
    {
      name: 'geb',
      active: false,
    },
    {
      name: 'nut',
      active: false,
    },
    {
      name: 'osiris',
      active: false,
    },
    {
      name: 'isis',
      active: false,
    },
    {
      name: 'seth',
      active: false,
    },
    {
      name: 'nephthys',
      active: false,
    },
  ];

  return (
    <>
      <div className={cn('life-con-ten-cities')}>
        <div className={cn('headline')}>
          <span>{t('con.overview.tenCities.engSub')}</span>
          <strong>{t('con.overview.tenCities.title')}</strong>
        </div>
        <p className={cn('adventure')}>{t('con.overview.tenCities.desc')}</p>
        <p className={cn('descript')}>{t('con.overview.tenCities.desc2')}</p>
        <div className={cn('map')}>
          <ul>
            {cities.map((v: CitiesProps, i: number) => {
              return (
                <li className={cn(`city-${v.name}`, { active: v.active })} key={`city-${v.name}`}>
                  <span className={cn('symbol')}>
                    <Image
                      src={v.active ? `/assets/images/img/img_symbol_life_con_${v.name}.png` : `/assets/images/img/img_symbol_life_con_ank.png`}
                      alt={t(`con.overview.tenCities.list.${i}`)}
                      width="100%"
                      height="100%"
                      loader={NileCDNLoader}
                    />
                  </span>
                  <span className={cn('name')}>{t(`con.overview.tenCities.list.${i}`)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default React.memo(ConOverviewCities);
