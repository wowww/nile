import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { windowResizeAtom } from '@/state/windowAtom';

import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';
import { useAtomValue } from 'jotai';

const LifeTheTeam = () => {
  const offset = useAtomValue(windowResizeAtom);
  const [isMobile, setIsMobile] = useState(false);

  const { t } = useTranslation('life');

  const teamData = [
    {
      image: '/assets/images/img/img_team_jinpark.png',
      name: t('tangled.overview.theTeam.1.name'),
      rank: t('tangled.overview.theTeam.1.rank'),
      intro: t('tangled.overview.theTeam.1.desc'),
    },
    {
      image: '/assets/images/img/img_team_jsshin.png',
      name: t('tangled.overview.theTeam.2.name'),
      rank: t('tangled.overview.theTeam.2.rank'),
      intro: t('tangled.overview.theTeam.2.desc'),
    },
    {
      image: '/assets/images/img/img_team_hyopark.png',
      name: t('tangled.overview.theTeam.3.name'),
      rank: t('tangled.overview.theTeam.3.rank'),
      intro: t('tangled.overview.theTeam.3.desc'),
    },
    {
      image: '/assets/images/img/img_team_edwardlee.png',
      name: t('tangled.overview.theTeam.4.name'),
      rank: t('tangled.overview.theTeam.4.rank'),
      intro: t('tangled.overview.theTeam.4.desc'),
    },
    {
      image: '/assets/images/img/img_team_moomin.png',
      name: t('tangled.overview.theTeam.5.name'),
      rank: t('tangled.overview.theTeam.5.rank'),
      intro: t('tangled.overview.theTeam.5.desc'),
    },

    {
      image: '/assets/images/img/img_team_paulcho.png',
      name: t('tangled.overview.theTeam.6.name'),
      rank: t('tangled.overview.theTeam.6.rank'),
      intro: t('tangled.overview.theTeam.6.desc'),
    },
  ];

  /* 22.11.11 수정: Card 순서 제어 state 추가 */
  // const [indexList, setIndexList] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [indexList, setIndexList] = useState<number[]>([0, 3, 1, 4, 2, 5]);

  useEffect(() => {
    if (offset.width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    if (offset.width < 1280) {
      setIndexList([0, 2, 4, 1, 3, 5]);
    } else {
      // setIndexList([0, 1, 2, 3, 4, 5]);
      setIndexList([0, 3, 1, 4, 2, 5]);
    }
  }, [offset.width]);

  return (
    <div className={cn('life-the-team')}>
      <div className={cn('life-team-container')}>
        {!isMobile ? (
          <div className={cn('team-item-wrap')}>
            {/* 22.11.11 수정: loop render index 기준으로 변경 */}
            {indexList.map((i) => (
              <div key={teamData[i].name} className={cn('team-item')}>
                <div className={cn('team-image')}>
                  <Image src={teamData[i].image} alt="" layout="responsive" width="100%" height="100%" loader={NileCDNLoader} />
                </div>
                <div className={cn('team-name')}>{teamData[i].name}</div>
                <div className={cn('team-rank')}>{teamData[i].rank}</div>
                <div className={cn('team-intro')}>{teamData[i].intro}</div>
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            className={cn('neith-slider')}
            modules={[Pagination]}
            centeredSlides
            slidesPerView={1.2}
            spaceBetween={16}
            speed={300}
            threshold={10}
            pagination={{
              clickable: true,
            }}
            draggable
          >
            {teamData.map((item, idx) => (
              <SwiperSlide key={item.name}>
                <div className={cn('team-slider-item')}>
                  <div key={idx} className={cn('team-item')}>
                    <div className={cn('team-image')}>
                      <Image src={item.image} alt="" layout="responsive" width="100%" height="100%" loader={NileCDNLoader} />
                    </div>
                    <div className={cn('team-name')}>{item.name}</div>
                    <div className={cn('team-rank')}>{item.rank}</div>
                    <div className={cn('team-intro')}>{item.intro}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default LifeTheTeam;
