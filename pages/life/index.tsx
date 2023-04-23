import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import LifeHero from '@/components/life/LifeHero';
import LifeApply from '@/components/life/LifeApply';
import LifeWhoNext from '@/components/life/LifeWhoNext';
import LifeContentsSection from '@components/life/LifeContentsSection';
import LifeContentsCard, { CardPropsType } from '@components/life/LifeContentsCard';
import { NileApiService } from '@/services/nile/api';
import { StoryData } from '@pages/nile/story';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';

const Life = () => {
  const { t } = useTranslation(['life', 'nile', 'common']);
  const api = NileApiService();

  const [stories, setStories] = useState<StoryData[]>();

  const [lusTweets, setLusTweets] = useState<any[]>();
  const [kariTweets, setKariTweets] = useState<any[]>();
  const [tangledTweets, setTangledTweets] = useState<any[]>();
  const [snkrzTweets, setSnkrzTweets] = useState<any[]>();
  const [bagcTweets, setBagcTweets] = useState<any[]>();
  const [coneType, setConeType] = useState<string>('cora');

  /* 23.04.03 수정 start: 이미지 경로 수정 */
  const coneList = useMemo(
    () => [
      {
        id: 1,
        image: `https://nile.blob.core.windows.net/images/assets/images/img/${coneType}/img_life_con1.png`,
      },
      {
        id: 2,
        image: `https://nile.blob.core.windows.net/images/assets/images/img/${coneType}/img_life_con2.png`,
      },
      {
        id: 3,
        image: `https://nile.blob.core.windows.net/images/assets/images/img/${coneType}/img_life_con3.png`,
      },
      {
        id: 5,
        image: `https://nile.blob.core.windows.net/images/assets/images/img/${coneType}/img_life_con4.png`,
      },
      {
        id: 9,
        image: `https://nile.blob.core.windows.net/images/assets/images/img/${coneType}/img_life_con5.png`,
      },
    ],
    [],
  );
  /* 23.04.03 수정 end: 이미지 경로 수정 */
  const golfList = useMemo(
    () => [
      {
        id: 1,
        image: `https://nile.blob.core.windows.net/images/assets/images/img/img_life_golf1.png`,
      },
      {
        id: 2,
        image: `https://nile.blob.core.windows.net/images/assets/images/img/img_life_golf2.png`,
      },
      {
        id: 3,
        image: `https://nile.blob.core.windows.net/images/assets/images/img/img_life_golf3.png`,
      },
      {
        id: 5,
        image: `https://nile.blob.core.windows.net/images/assets/images/img/img_life_golf4.png`,
      },
      {
        id: 9,
        image: `https://nile.blob.core.windows.net/images/assets/images/img/img_life_golf5.png`,
      },
    ],
    [],
  );

  useEffect(() => {
    api.home.story
      .getList()
      .then((data) => setStories(data))
      .catch((error) => console.log(error));

    api.social.twitter.fetchTweets('KARI').then(({ data }) => {
      setKariTweets(data.results);
    });

    api.social.twitter.fetchTweets('PICDOT').then(({ data }) => {
      setLusTweets(data.results);
    });

    api.social.twitter.fetchTweets('Tangled').then(({ data }) => {
      setTangledTweets(data.results);
    });

    api.social.twitter.fetchTweets('SNKRZ').then(({ data }) => {
      setSnkrzTweets(data.results);
    });

    api.social.twitter.fetchTweets('Bored_Golf').then(({ data }) => {
      setBagcTweets(data.results);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Life &gt; NILE</title>
      </Helmet>
      <div className={cn('life-wrap')}>
        <LifeHero />
        <LifeContentsSection
          classNames={'snkrz'}
          contentsType={'twitter'}
          key={'contents-snkrz'}
          tagText={[{ type: 'general', text: 'Walk to Earn' }]}
          title={'SNKR2'}
          content={t('home.nft.item.3.desc')}
          snsList={[
            { name: 'homepage', url: 'https://www.thesnkrz.com/home' },
            { name: 'twitter', url: 'https://twitter.com/theSNKRZ' },
            { name: 'discord', url: 'https://discord.com/invite/thesnkrz' },
          ]}
          buttonList={[{ buttonText: t('discoverProjectBtn', { ns: 'common' }), buttonLink: '/life/snkrz' }]}
          backgroundImage={'https://nile.blob.core.windows.net/images/assets/images/img/bg_life_banner_snkrz.jpg'}
          isDarkType={true}
          backgroundColor="#00288f"
        >
          <ul className={cn('article-list')}>
            {snkrzTweets?.map((item, index) => (
              <LifeContentsCard
                title={'SNKRZ'}
                content={item.text}
                account={'@theSNKRZ'}
                resourceUrl={`https://nile.blob.core.windows.net/social-images/${item.imageUrl}`}
                href={`https://twitter.com/theSNKRZ/status/${item.tweetId}`}
                isTargetSelf
                key={`key` + index}
              />
            ))}
          </ul>
        </LifeContentsSection>
        <LifeContentsSection
          classNames={'tangled'}
          contentsType={'twitter'}
          key={'contents-tangled'}
          /* 23.03.12 수정 start: 태그 변경 */
          tagText={[
            { type: 'neith', text: 'NEITH NFT' },
            { type: 'general', text: 'Talk to Earn' },
          ]}
          /* 23.03.12 수정 end: 태그 변경 */
          title={'Tangled'}
          content={t('home.nft.item.1.desc')}
          snsList={[
            { name: 'homepage', url: 'https://tangled.im/' },
            { name: 'twitter', url: 'https://twitter.com/tangled_nft' },
            { name: 'discord', url: 'https://discord.com/invite/tUNwSykFGb' },
          ]}
          buttonList={[
            /* 23.03.12 수정 start: 버튼 변경 및 진입 경로 수정 */
            { buttonText: t('discoverProjectBtn', { ns: 'common' }), buttonLink: '/life/ttps' },
            /* 23.03.29 수정: NEITH Station 버튼 일괄 삭제 */
            // { buttonText: t('goToBtn', { ns: 'common', name: 'NEITH Station' }), buttonLink: '/neith-station' },
            /* 23.03.12 수정 end: 버튼 변경 및 진입 경로 수정 */
          ]}
          backgroundImage={'https://nile.blob.core.windows.net/images/assets/images/img/bg_life_banner_tangled.png'}
          isDarkType={true}
        >
          <ul className={cn('article-list')}>
            {tangledTweets?.map((item, index) => (
              <LifeContentsCard
                title={'Tangled Official'}
                content={item.text}
                account={'@tangled_NFT'}
                resourceUrl={`https://nile.blob.core.windows.net/social-images/${item.imageUrl}`}
                href={`https://twitter.com/tangled_NFT/status/${item.tweetId}`}
                isTargetSelf
                key={`key` + index}
              />
            ))}
          </ul>
        </LifeContentsSection>
        <LifeContentsSection
          classNames={'bagc'}
          contentsType={'twitter'}
          key={'contents-bagc'}
          tagText={[
            { type: 'neith', text: 'NEITH NFT' },
            { type: 'general', text: 'Golf Utility' },
          ]}
          title={'BAGC'}
          content={t('home.nft.item.7.desc')}
          snsList={[
            { name: 'homepage', url: 'https://bagc.altava.com/' },
            { name: 'discord', url: 'https://discord.gg/altava' },
            { name: 'twitter', url: 'https://twitter.com/bored_golf' },
            { name: 'gitbook', url: 'https://bored-ape-golf-club.gitbook.io/about-the-project/' },
          ]}
          buttonList={[{ buttonText: t('discoverProjectBtn', { ns: 'common' }), buttonLink: '/life/bagc' }]}
          backgroundImage={'https://nile.blob.core.windows.net/images/assets/images/img/bg_life_banner_bagc.png'}
          isDarkType={true}
        >
          <ul className={cn('article-list')}>
            {bagcTweets?.map((item, index) => (
              <LifeContentsCard
                title={'Bored Ape Golf Club'}
                content={item.text}
                account={'@Bored_Golf'}
                resourceUrl={`https://nile.blob.core.windows.net/social-images/${item.imageUrl}`}
                href={`https://twitter.com/bored_golf/status/${item.tweetId}`}
                isTargetSelf
                key={`key` + index}
              />
            ))}
          </ul>
        </LifeContentsSection>
        <LifeContentsSection
          classNames={'cora'}
          contentsType={'article'}
          key={'contents-con'}
          tagText={[
            { type: 'neith', text: 'NEITH NFT' },
            /* 23.03.12 수정: 태그 수정 */
            { type: 'general', text: 'PFP' },
          ]}
          title={'City of NILE'}
          content={t('home.nft.item.4.desc')}
          buttonList={[
            /* 23.03.12 수정: 버튼 영문 문구 변경으로 키값 변경 */
            { buttonText: t('discoverProjectBtn', { ns: 'common' }), buttonLink: '/life/cone?tab=nfts' },
            /* 23.03.29 수정: NEITH Station 버튼 일괄 삭제 */
            // { buttonText: t('con.main.btn'), buttonLink: '/neith-station' },
          ]}
          backgroundImage={'https://nile.blob.core.windows.net/images/assets/images/img/bg_life_banner_con.jpg'}
          isDarkType={true}
        >
          <ul className={cn('article-list img-type')}>
            {coneList?.map((item, index) => (
              <li key={`key` + index}>
                {/* 23.04.03 수정 start: link 경로 수정 */}
                <a href={`/marketplace/${coneType.toUpperCase()}/${item.id}`}>
                  <div className={cn('img-box')}>
                    <Image src={item.image} alt="" layout="fill" loader={NileCDNLoader} unoptimized />
                  </div>
                </a>
                {/* 23.04.03 수정 end: link 경로 수정 */}
              </li>
            ))}
          </ul>
        </LifeContentsSection>
        {/* 23.04.03 수정 end: City of NILE 위치 최상단으로 변경 */}

        {/* 23.04.12 수정: golf(wemix championship) 추가 */}
        <LifeContentsSection
          classNames={'golf'}
          contentsType={'article'}
          key={'contents-golf'}
          tagText={[
            { type: 'neith', text: 'NEITH NFT' },
            // { type: 'general', text: 'Golf Utility' },
          ]}
          title={'WEMIX CHAMPIONSHIP'}
          content={t('home.nft.item.6.desc')}
          snsList={[{ name: 'homepage', url: 'https://wemix.golf.sbs.co.kr' }]}
          buttonList={[{ buttonText: 'WEMIX Championship', buttonLink: 'https://wemix.golf.sbs.co.kr', target: '_blank' }]}
          backgroundImage={'https://nile.blob.core.windows.net/images/assets/images/img/bg_life_banner_golf.jpg'}
          isDarkType={true}
        >
          <ul className={cn('article-list img-type')}>
            {golfList?.map((item, index) => (
              <li key={`key` + index}>
                <div className={cn('img-box')}>
                  <Image src={item.image} alt="" layout="fill" loader={NileCDNLoader} unoptimized />
                </div>
              </li>
            ))}
          </ul>
        </LifeContentsSection>

        {/* 23.03.23 수정: 까리 배너 추가 */}
        <LifeContentsSection
          classNames={'kari'}
          contentsType={'twitter'}
          key={'contents-kari'}
          tagText={[{ type: 'general', text: 'PFP' }]}
          title={'Kari'}
          content={t('home.nft.item.5.desc')}
          snsList={[
            { name: 'twitter', url: 'https://twitter.com/Ari_Project_10k' },
            { name: 'discord', url: 'https://discord.com/invite/cBpSsMzWcB' },
          ]}
          buttonList={[{ buttonText: t('discoverProjectBtn', { ns: 'common' }), buttonLink: '/life/kari' }]}
          backgroundImage={'https://nile.blob.core.windows.net/images/assets/images/img/bg_life_banner_kari.png'}
          isDarkType={true}
        >
          <ul className={cn('article-list')}>
            {/* 임시 탱글드 더미 데이터  */}
            {kariTweets?.map((item, index) => (
              <LifeContentsCard
                title={'Ari-Kari Project Official'}
                content={item.text}
                account={'@Ari-Kari'}
                resourceUrl={`https://nile.blob.core.windows.net/social-images/${item.imageUrl}`}
                href={`https://twitter.com/tangled_NFT/status/${item.tweetId}`}
                isTargetSelf
                key={`key` + index}
              />
            ))}
          </ul>
        </LifeContentsSection>
        <LifeContentsSection
          classNames={'son'}
          contentsType={'article'}
          key={'contents-son'}
          tagText={[{ type: 'general', text: 'Collectibles' }]}
          title={'Sights of NILE'}
          content={t('home.nft.item.2.desc')}
          /* 23.03.12 수정: 버튼 영문 문구 변경으로 키값 변경 */
          buttonList={[{ buttonText: t('discoverProjectBtn', { ns: 'common' }), buttonLink: '/life/son' }]}
          backgroundImage={'https://nile.blob.core.windows.net/images/assets/images/img/bg_life_banner_son.png'}
          isDarkType={true}
        >
          <ul className={cn('article-list')}>
            {stories?.slice(0, 5).map((item, index) => (
              <LifeContentsCard
                title={t(`${item.title}`, { ns: 'nile' })}
                resourceUrl={item.image ? String(item.image) : String(item.videoUrl)}
                content={t(`${item.content}`, { ns: 'nile' })}
                href={item.link}
                isTargetSelf={false}
                key={'key' + index}
              />
            ))}
          </ul>
        </LifeContentsSection>

        <LifeContentsSection
          classNames={'lus'}
          contentsType={'twitter'}
          key={'contents-lus'}
          tagText={[{ type: 'general', text: 'Pixel Art' }]}
          title={'London Underground Station(LUS) 264 Genesis'}
          content={t('home.nft.item.0.desc')}
          snsList={[
            { name: 'homepage', url: 'https://picdotstudio.com/' },
            { name: 'twitter', url: 'https://twitter.com/PICDOT' },
            { name: 'instagram', url: 'https://www.instagram.com/picdot_studio/' },
          ]}
          /* 23.03.12 수정: 버튼 영문 문구 변경으로 키값 변경 */
          buttonList={[{ buttonText: t('discoverProjectBtn', { ns: 'common' }), buttonLink: '/life/lus' }]}
          backgroundImage={'https://nile.blob.core.windows.net/images/assets/images/img/bg_life_banner_lus.png'}
          isDarkType={false}
        >
          <ul className={cn('article-list')}>
            {lusTweets?.map((item, index) => (
              <LifeContentsCard
                title={'PICDOT'}
                content={item.text}
                account={'@PICDOT'}
                resourceUrl={`https://nile.blob.core.windows.net/social-images/${item.imageUrl}`}
                href={`https://twitter.com/PICDOT/status/${item.tweetId}`}
                isTargetSelf
                key={`key` + index}
              />
            ))}
          </ul>
        </LifeContentsSection>

        <LifeWhoNext desc={t('home.nft.text')} />
        <LifeApply />
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'life', 'nile'])),
    },
  };
};

export default Life;
