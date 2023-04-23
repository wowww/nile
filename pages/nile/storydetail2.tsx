import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Tag from '@/components/tag/Tag';
import ShareButton from '@/components/button/ShareButton';
import { useTranslation } from 'next-i18next';
import StoryDetailNft from '@/components/nile/storydetail/StoryDetailNft';
import BgButton from '@/components/button/BgButton';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import ColumnistInfo from '@/components/nile/storydetail/ColumnistInfo';

import Image from 'next/image';
import Link from 'next/link';
import { NileCDNLoader } from '@utils/image/loader';
import { ReactSVG } from 'react-svg';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
import { NileApiService } from '@/services/nile/api';
/* 22.12.21 수정: StatusTag 컴포넌트 적용하면서 state 상태값 가져옴 */
import { MarketNftItemStatusType } from '@/services/nile/api';

const MarketplaceBid = () => {
  const { t } = useTranslation(['nile', 'common']);
  const api = NileApiService();

  const [userInfo, setUserInfo] = useState<NileUserAccount>();
  const [creatorAddress, setCreatorAddress] = useState<string>();

  useEffect(() => {
    api.marketplace.collection
      .getItem({ slug: 'SON2' })
      .then(({ data }) => setCreatorAddress(data.result.collection.ownerAddress))
      .catch(({ data }) => {
        return null;
      });
  }, []);

  useEffect(() => {
    if (creatorAddress) {
      api.user.account
        .getUserInfo(creatorAddress)
        .then(({ data }) => setUserInfo(data))
        .catch(({ response }) => {
          return null;
        });
    }
  }, [creatorAddress]);

  const nftData = {
    imgUrl: '/images/img_sights_of_nile_son2_738.jpg',
    title: t('home.story.item.3.artTitle'),
    /* 22.12.21 수정: 상태값 변경 */
    state: MarketNftItemStatusType.COMPLETE,
    buttons: [
      {
        name: t('viewNft', { ns: 'common' }),
        disabled: false,
        link: '/marketplace/SON2/1',
        type: 'primary',
        toastText: t('NFTFirstOpenMessage', { ns: 'common' }),
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
      priceInfo: 'lastSale',
      price: '1,700',
      startIn: '2022-12-14 12:00 PM',
    },
  };

  const columnistData: {
    profileImg: string;
    name: string;
    career: string[];
  } = {
    profileImg: '/images/img_nile2_columnist.png',
    name: t('home.story.item.3.columnist.name'),
    career: t('home.story.item.3.columnist.desc', { returnObjects: true }),
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
              <Tag size="s">{t('home.story.item.3.tag.0')}</Tag>
              <Tag size="s">{t('home.story.item.3.tag.1')}</Tag>
              <Tag size="s">{t('home.story.item.3.tag.2')}</Tag>
              <Tag size="s">{t('home.story.item.3.tag.3')}</Tag>
            </div>
            <h2 className={cn('story-detail-heading')}>{t('home.story.item.3.title')}</h2>
            <div className={cn('writer-wrap')}>
              <span className={cn('person')}>
                <span className={cn('category')}>Columnist</span>
                <span className={cn('name')}>{t('home.story.item.3.columnist.name')}</span>
              </span>
              <span className={cn('person')}>
                <span className={cn('category')}>Creator</span>
                <span className={cn('name')}>{t('home.story.item.3.creator')}</span>
              </span>
            </div>
            <div className={cn('story-share-wrap')}>
              <span className={cn('share-date')}>{t('home.story.item.3.date')}</span>
              <ShareButton facebook={true} telegram={true} />
            </div>
          </div>
          <div className={cn('story-detail-post')}>
            <p>{t('home.story.item.3.detail.post.p1')}</p>
            <p>{t('home.story.item.3.detail.post.p2')}</p>
            <p>{t('home.story.item.3.detail.post.p3')}</p>

            <div className={cn('article-wrap')}>
              <div className={cn('img-wrap')}>
                <Image src={'/images/img_sights_of_nile_son2_1920.png'} alt="" layout="fill" objectFit="contain" />
              </div>
              <div className={cn('article-info')}>
                <strong>{t('home.story.item.3.artTitle')}</strong>
                <div className={cn('article-creator')}>
                  {/* 22.11.16 수정: 프로필 이미지 수정 */}
                  <Avatar className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} size={20} />
                  <span className={cn('name-tag-name')}>{t('home.story.item.3.creator')}</span>
                </div>
              </div>
            </div>
            <h4>{t('home.story.item.3.detail.post.strong1')}</h4>
            <p>{t('home.story.item.3.detail.post.p4')}</p>
            <p>{t('home.story.item.3.detail.post.p5')}</p>
            <p>{t('home.story.item.3.detail.post.p6')}</p>
            <p>{t('home.story.item.3.detail.post.p7')}</p>
            <p>{t('home.story.item.3.detail.post.p8')}</p>
            <h4>{t('home.story.item.3.detail.post.strong2')}</h4>
            <p>{t('home.story.item.3.detail.post.p9')}</p>
            <p>{t('home.story.item.3.detail.post.p10')}</p>
            <p>{t('home.story.item.3.detail.post.p11')}</p>
            <p>{t('home.story.item.3.detail.post.p12')}</p>
            <p>{t('home.story.item.3.detail.post.p13')}</p>
          </div>
          <ColumnistInfo data={columnistData} />
          <StoryDetailNft data={nftData} />
          <div className={cn('another-item-wrap')}>
            <ul className={cn('another-list-item')}>
              <li className={cn('before-item')}>
                <Link href={'/nile/storydetail'}>
                  <a className={cn('another-link-item')}>
                    <span className={cn('another-state-text')}>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                      <span>{t('home.story.item.2.detail.beforeItem.iconText')}</span>
                    </span>
                    <div className={cn('another-state-img')}>
                      <Image src="/temp/@temp_story_detail_post.jpg" alt="" layout="fill" loader={NileCDNLoader} objectFit="cover" />
                    </div>
                    <div className={cn('another-info-area')}>
                      <strong className={cn('another-info-title')}>{t('home.story.item.2.title')}</strong>
                      <p className={cn('another-info-cont')}>{t('home.story.item.2.desc')}</p>
                    </div>
                  </a>
                </Link>
              </li>
              {/* 22.12.21 수정 start: 다음 아티클 추가 */}
              <li className={cn('after-item')}>
                <Link href={'/nile/storydetail3'}>
                  <a className={cn('another-link-item')}>
                    <span className={cn('another-state-text')}>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                      <span>{t('home.story.item.2.detail.afterItem.iconText')}</span>
                    </span>
                    <div className={cn('another-state-img')}>
                      <Image src="/images/img_sights_of_nile_son3_738.jpg" alt="" layout="fill" loader={NileCDNLoader} objectFit="cover" />
                    </div>
                    <div className={cn('another-info-area')}>
                      <strong className={cn('another-info-title')}>{t('home.story.item.4.title')}</strong>
                      <p className={cn('another-info-cont')}>{t('home.story.item.4.desc')}</p>
                    </div>
                  </a>
                </Link>
              </li>
              {/* 22.12.21 수정 end: 다음 아티클 추가 */}
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
