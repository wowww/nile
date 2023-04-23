import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Tag from '@/components/tag/Tag';
import ShareButton from '@/components/button/ShareButton';
import { useTranslation } from 'next-i18next';
import StoryDetailNft from '@/components/nile/storydetail/StoryDetailNft';
import BgButton from '@/components/button/BgButton';
import { Avatar } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import ColumnistInfo from '@/components/nile/storydetail/ColumnistInfo';

import Image from 'next/image';
import Link from 'next/link';
import { NileCDNLoader } from '@utils/image/loader';
import { ReactSVG } from 'react-svg';
import { MarketNftItemStatusType } from '@/services/nile/api';

const MarketplaceBid = () => {
  const { t } = useTranslation(['nile', 'common']);

  const profileList = [null, 'type1', 'type2', 'type3', 'type4', 'type5'];
  const [profileIdx, setProfileIdx] = useState<null | string>(null);

  useEffect(() => {
    setProfileIdx(profileList[Math.floor(Math.random() * 6)]);
  }, []);

  const nftData = {
    imgUrl: '/images/img_sights_of_nile_son5_738.jpg',
    title: t('home.story.item.6.artTitle'),
    state: MarketNftItemStatusType.COMPLETE,
    buttons: [
      {
        // name: 'Preview',
        name: t('viewResult', { ns: 'common' }),
        disabled: false,
        link: '/marketplace/SON5/1',
        type: 'primary',
        toastText: '',
      },
      {
        name: t('viewCollectionInfo', { ns: 'common' }),
        disabled: false,
        link: '/life/son',
        type: 'default',
        toastText: '',
      },
      // { name: t('viewNft', { ns: 'common' }), disabled: true, link: '/', hasTooltip: true },
      // { name: t('viewCollectionInfo', { ns: 'common' }), disabled: false, link: '/life', hasTooltip: false },
    ],
    auction: {
      priceInfo: 'Last Sale',
      price: '2,100',
      startIn: '2023-02-27 12:00 PM',
    },
  };

  const columnistData: {
    profileImg: string;
    name: string;
    career: string[];
  } = {
    profileImg: '/images/img_nile_columnist.svg',
    name: t('home.story.item.6.columnist.name'),
    career: t('home.story.item.6.columnist.desc', { returnObjects: true }),
  };

  return (
    <>
      <Helmet>
        <title>StoryDetail &gt; NileStory &gt; NILE </title>
        <body />
      </Helmet>
      <div className={cn('story-detail-wrap')}>
        <div className={cn('story-detail-cont')}>
          <div className={cn('story-detail-title')}>
            <div className={cn('tag-list')}>
              <Tag size="s">{t('home.story.item.6.tag.0')}</Tag>
              <Tag size="s">{t('home.story.item.6.tag.1')}</Tag>
              <Tag size="s">{t('home.story.item.6.tag.2')}</Tag>
              <Tag size="s">{t('home.story.item.6.tag.3')}</Tag>
            </div>
            <h2 className={cn('story-detail-heading')}>{t('home.story.item.6.title')}</h2>
            <div className={cn('writer-wrap')}>
              <span className={cn('person')}>
                <span className={cn('category')}>Columnist</span>
                <span className={cn('name')}>{t('home.story.item.6.columnist.name')}</span>
              </span>
              <span className={cn('person')}>
                <span className={cn('category')}>Creator</span>
                <span className={cn('name')}>{t('home.story.item.6.creator')}</span>
              </span>
            </div>
            <div className={cn('story-share-wrap')}>
              <span className={cn('share-date')}>{t('home.story.item.6.date')}</span>
              <ShareButton facebook={true} telegram={true} />
            </div>
          </div>
          <div className={cn('story-detail-post')}>
            <p>{t('home.story.item.6.detail.post.p1')}</p>
            <div className={cn('article-wrap')}>
              <div className={cn('video-wrap')}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  controls
                  controlsList="nodownload nofullscreen"
                  className={cn('video-control')}
                >
                  <source src="/video/life_sights_of_nile5_regina.mp4" type="video/mp4" />
                </video>
              </div>
              <div className={cn('article-info')}>
                <strong>{t('home.story.item.6.artTitle')}</strong>
                <div className={cn('article-creator')}>
                  <Avatar className={cn('user-image', profileIdx)} size={20} />
                  <span className={cn('name-tag-name')}>{t('home.story.item.6.creator')}</span>
                </div>
              </div>
            </div>
            <p>{t('home.story.item.6.detail.post.p2')}</p>
            <p>{t('home.story.item.6.detail.post.p3')}</p>

            <p>{t('home.story.item.6.detail.post.p4')}</p>
            <p>{t('home.story.item.6.detail.post.p5')}</p>
            <p>{t('home.story.item.6.detail.post.p6')}</p>
            <p>{t('home.story.item.6.detail.post.p7')}</p>
            <p>{t('home.story.item.6.detail.post.p8')}</p>
          </div>
          <ColumnistInfo data={columnistData} />
          <StoryDetailNft data={nftData} />
          <div className={cn('another-item-wrap')}>
            <ul className={cn('another-list-item')}>
              <li className={cn('before-item')}>
                <Link href={'/nile/storydetail4'}>
                  <a className={cn('another-link-item')}>
                    <span className={cn('another-state-text')}>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                      <span>{t('home.story.item.2.detail.beforeItem.iconText')}</span>
                    </span>
                    <div className={cn('another-state-img')}>
                      <Image src="/images/img_sights_of_nile_son4_738.jpg" alt="" layout="fill" loader={NileCDNLoader} objectFit="cover" />
                    </div>
                    <div className={cn('another-info-area')}>
                      <strong className={cn('another-info-title')}>{t('home.story.item.4.title')}</strong>
                      <p className={cn('another-info-cont')}>{t('home.story.item.4.desc')}</p>
                    </div>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={cn('list-btn-wrap')}>
            <BgButton
              buttonText={t('listView', { ns: 'common' })}
              color="black"
              size="md"
              key="Save"
              href="/nile/story"
              // onClick={() => {
              //   setConfirmModal(false);
              // }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'nile'])),
    },
  };
};
export default MarketplaceBid;
