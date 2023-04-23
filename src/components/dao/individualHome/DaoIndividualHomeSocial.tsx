import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Trans, useTranslation } from 'next-i18next';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';

import { DaoBoxTitle } from '@/components/dao/DaoBoxLayout';
import DaoIndividualHomeTwitter from '@/components/dao/individualHome/DaoIndividualHomeTwitter';
import Tag from '@/components/tag/Tag';
import Empty from '@/components/empty/Empty';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { daoThemeAtom } from '@/state/daoAtom';

const DaoIndividualHomeSocial = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);

  const offset = useAtomValue(windowResizeAtom);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  const twitterData = [
    {
      link: '/',
      author: 'string',
      authorImg: 'https://picsum.photos/32/32/?image=1',
      desc: '원더다오가 이제 막 열렸습니다. 다들 서두르세요! 닫히기 전에 꼭 가입하기!',
      tags: ['WONDER', 'WONDERDAO'],
    },
    {
      link: '/',
      author: 'string',
      authorImg: 'https://picsum.photos/32/32/?image=1',
      desc: '원더다오가 이제 막 열렸습니다. 다들 서두르세요! 닫히기 전에 꼭 가입하기!',
      tags: ['WONDER', 'WONDERDAO'],
    },
    {
      link: '/',
      author: 'string',
      authorImg: 'https://picsum.photos/32/32/?image=1',
      desc: '원더다오가 이제 막 열렸습니다. 다들 서두르세요! 닫히기 전에 꼭 가입하기!',
      tags: ['WONDERDAO'],
    },
    {
      link: '/',
      author: 'string',
      authorImg: 'https://picsum.photos/32/32/?image=1',
      desc: '원더다오가 이제 막 열렸습니다. 다들 서두르세요! 닫히기 전에 꼭 가입하기!',
      tags: ['WONDERDAO'],
    },
  ];

  // tagBtnList 버튼 리스트
  const tagBtnList = [
    {
      name: `#${useDaoCharacterConvert(activeDao.value)}DAO}`,
      value: `#${useDaoCharacterConvert(activeDao.value)}DAO`,
    },
    {
      name: `#${useDaoCharacterConvert(activeDao.value)}`,
      value: `#${useDaoCharacterConvert(activeDao.value)}`,
    },
  ];

  useEffect(() => {
    if (offset.width > 768 && offset.width < 1024) {
      setIsTablet(true);
    } else {
      setIsTablet(false);
    }
  }, [offset.width]);

  return (
    <div className={cn('dao-social-wrap')}>
      <DaoBoxTitle
        className="dao-home-type"
        icon={
          <span className={cn('icon')}>
            <ReactSVG src="https://file.mir4global.com/nile/resources/images/icon/ico_twitter_color.svg" />
          </span>
        }
        title={
          <Trans
            i18nKey="individualHome.social.title"
            ns="dao"
            values={{ num: 342, strong: t('individualHome.social.strong'), type: useDaoCharacterConvert(activeDao.value) }}
          >
            <span></span>
            <span className={cn('twitter')}></span>
          </Trans>
        }
      />
      <div className={cn('tag-wrap')}>
        {tagBtnList.map((el, index) => {
          return (
            <Tag type="primary" size="md-m" key={`tag${index}`}>
              {el.value}
            </Tag>
          );
        })}
      </div>
      {twitterData.length > 0 ? (
        <div className={cn('slide-wrap')}>
          <Swiper
            modules={[Pagination]}
            slidesPerView={4}
            spaceBetween={16}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 32,
              },
              360: {
                slidesPerView: 1,
                spaceBetween: 32,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
            }}
            pagination={{
              clickable: true,
            }}
          >
            {twitterData.map((data, index) => {
              if (isTablet && index > 2) {
                return false;
              }
              return (
                <SwiperSlide key={`twitter${index}`}>
                  <DaoIndividualHomeTwitter data={data} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <Empty iconType="none" className="lg" text={t('empty.noArticle', { ns: 'common' })} />
      )}
    </div>
  );
};

export default DaoIndividualHomeSocial;
