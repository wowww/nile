/* eslint-disable react/no-array-index-key */
import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import * as Scroll from 'react-scroll';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  daoCommentNoticeData,
  daoDiscussionNoticeData,
  daoHistoryNoticeData,
  daoProposalNoticeData,
  daoVoteNoticeData,
} from '@/components/mypage/mypageData';

import useWindowResize from '@/hook/useWindowResize';
import PfpModal from '@/components/modal/PfpModal';
import OutlineButton from '@/components/button/OutlineButton';
import TextButton from '@/components/button/TextButton';
import MypageNoticeList from '@/components/mypage/MypageNoticeList';
import MypageCard from '@/components/mypage/MyPageCard';

import Empty from '@/components/empty/Empty';
import BgButton from '@/components/button/BgButton';
import { Avatar, Radio } from 'antd';
import { useTranslation } from 'next-i18next';
import { windowResizeAtom } from '@/state/windowAtom';
import { NileNftToken } from '@/models/nile/marketplace/NileNft';
import { useAtomValue } from 'jotai';
import { userProfileAtom } from '@/state/accountAtom';
import Head from 'next/head';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

export type mypageProps = {
  token?: NileNftToken;
};

const Common = ({ token }: mypageProps) => {
  const userProfile = useAtomValue(userProfileAtom);
  const resizeEvtInit = useWindowResize();
  const offset = useAtomValue(windowResizeAtom);
  const [size, setSize] = useState('lg');
  const [sectionLinks, setSectionLinks] = useState<boolean>();
  const sectionLinkAll = useRef<any>([]);
  // const lineChartInit = useRecoilValue(LineChartData);
  const [isModalNftAlbum, setModalNftAlbum] = useState(false);
  const { t } = useTranslation('common');

  // 팝업 호출 데이터 Start

  const [isModalSm1, setModalSm1] = useState(false);
  const [isModalSm2, setModalSm2] = useState(false);
  const [isModalSm3, setModalSm3] = useState(false);
  const [isModalSm4, setModalSm4] = useState(false);

  const [currentBasic, setCurrentBasic] = useState<null | string>('basic1');
  const [basicProfileList, setBasicProfileList] = useState([
    {
      value: 'basic1',
      type: 'type5',
    },
    {
      value: 'basic2',
      type: 'type4',
    },
    {
      value: 'basic3',
      type: 'type3',
    },
    {
      value: 'basic4',
      type: 'type2',
    },
    {
      value: 'basic5',
      type: 'type1',
    },
    {
      value: 'basic6',
      type: '',
    },
  ]);

  useEffect(() => {
    const links = document.querySelectorAll('section > h1');
    if (sectionLinks === undefined) {
      links.forEach((link, index) => {
        sectionLinkAll.current[index] = link;
      });
      setSectionLinks(true);
    }
  }, [sectionLinks]);

  useEffect(() => {
    if (offset.width >= 768 && offset.width <= 1279) {
      setSize('md');
    } else if (offset.width < 768) {
      setSize('sm');
    } else {
      setSize('lg');
    }
  }, [offset.width]);
  return (
    <>
      {/*
        * common 파일 작성 법!
        *
        * section 추가시 title id로 링크(Scroll.Link)도 함께 추가 되게 작업 되어 있음
        * 기본 구조
        * <section className={cn('common-section')}>
            <h1 className={cn('common-title')} id="아이디 추가">
              title 추가
            </h1>
            <div>
              * 공지로 작성할 글이 있을때는 common-notice 이용해서 작성
              * li 목록으로 작성하면 되며 strong은 bold, b는 negative 색상, span은 highlight 색상이 추가 되어 있음
              <ul className={cn('common-notice')}>
                <li>공지 1</li>
                <li>공지 2</li>
              </ul>
              * 여기서부터 공통 컴포넌트 작성 div 생성 후 div 안에 작성
              * button, icon, image 같이 일렬로 나열해서 넣을 경우 common-display-flex 클래스 사용
              * sub title을 사용해야 할 경우 이 단계에 추가
              * <h2 className={cn('common-sub-title')}>sub title</h2>
              <div>
                component 추가
                <div className={cn('common-name')}>component name 추가</div>
              </div>
            </div>
          </section>
      */}
      <Head>
        <title>Common &gt; NILE &gt; Mypage</title>
        <body className={cn('common-wrap')} />
      </Head>
      <div className={cn('common-content-wrap')}>
        <div className={cn('common-links')}>
          <a href='/common'>Common</a>
          <a href='/common/dao'>Dao</a>
          <a href='/common/mypage'>Mypage</a>
        </div>
        <div className={cn('common-links')}>
          {sectionLinks
            ? sectionLinkAll.current?.map((link: HTMLElement, index: number) => {
              return (
                <Scroll.Link to={link.id} offset={-57} key={`link-${index}`}>
                  {link.textContent}
                </Scroll.Link>
              );
            })
            : ''}
        </div>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id='Modal'>
            Notice
          </h1>
          <h2>Proposal</h2>
          <MypageNoticeList data={daoProposalNoticeData} />
          <h2>Vote</h2>
          <MypageNoticeList listType='vote' data={daoVoteNoticeData} />
          <h2>Comment</h2>
          <MypageNoticeList listType='comment' data={daoCommentNoticeData} />
          <h2>discussion</h2>
          <MypageNoticeList listType='discussion' data={daoDiscussionNoticeData} />
          <h2>history</h2>
          <MypageNoticeList listType='history' data={daoHistoryNoticeData} />

          <h1 className={cn('common-title')} id='Modal'>
            Modal
          </h1>
          <div>
            <div className={cn('common-display-flex')}>
              {/* 모달 호출 버튼 */}
              <OutlineButton
                buttonText='PFP 모달'
                color='black'
                size='md'
                onClick={() => {
                  setModalSm1(true);
                }}
              />
              {/* 모달 호출 버튼 */}
              <OutlineButton
                buttonText='PFP empty 모달'
                color='black'
                size='md'
                onClick={() => {
                  setModalSm2(true);
                }}
              />
              <OutlineButton
                buttonText='Profile Popup'
                color='black'
                size='md'
                onClick={() => {
                  setModalSm3(true);
                }}
              />
              <OutlineButton
                buttonText='Profile Popup 닉네임 이미지 없는경우'
                color='black'
                size='md'
                onClick={() => {
                  setModalSm4(true);
                }}
              />
              <OutlineButton
                buttonText='NFT Album'
                color='black'
                size='md'
                onClick={() => {
                  setModalNftAlbum(true);
                }}
              />
              <PfpModal isOpen={isModalSm1} setIsOpen={setModalSm1} />
              <ModalLayout
                wrapClassName='pfp-modal'
                isOpen={isModalSm2}
                setIsOpen={setModalSm2}
                size='md'
                title='Select profile picture'
                footer
                destroyOnClose={true}
                footerContent={[
                  <OutlineButton
                    key='Cancel'
                    buttonText='Cancel'
                    color='black'
                    size='md'
                    onClick={() => {
                      setModalSm2(false);
                    }}
                  />,
                  <BgButton
                    key='Apply'
                    buttonText='Apply'
                    color='black'
                    size='md'
                    onClick={() => {
                      setModalSm2(false);
                    }}
                  />,
                ]}
              >
                <div className={cn('pfp-modal-inner')}>
                  <div className={cn('title-wrap')}>
                    <strong>Theme color of basic profile</strong>
                  </div>
                  <Radio.Group
                    onChange={(e) => {
                      setCurrentBasic(e.target.value);
                    }}
                    value={currentBasic}
                    className={cn('profile-list basic')}
                  >
                    {basicProfileList.map((items, index: number) => (
                      <Radio.Button value={items.value} key={`basic-list-${index}`}>
                        <Avatar
                          className={cn('user-image', userProfile?.themeIndex && `type${userProfile?.themeIndex}`)}
                          size={64}>
                          <span className={cn('a11y')}>프로필</span>
                        </Avatar>
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                  <div className={cn('title-wrap')}>
                    <strong>Owned NFT</strong>
                  </div>
                  <Empty
                    subText={'소유하고 있는 NTF가 없습니다.\nMarketplace에서 다양한 NTF를 만나보세요!'}
                    button={<TextButton buttonText='Go Marketplace' iconValue='arrow' size='sm' href='/marketplace'
                                        type='link' />}
                  />
                </div>
              </ModalLayout>
              {/*<ProfileModal*/}
              {/*  isOpen={isModalSm3}*/}
              {/*  setIsOpen={setModalSm3}*/}
              {/*  data={{*/}
              {/*    nickname: 'Polaris Liu',*/}
              {/*    pocketAddress: '0x65b2...1413',*/}
              {/*    img: 'https://joeschmoe.io/api/v1/random',*/}
              {/*  }}*/}
              {/*/>*/}
              {/*<ProfileModal isOpen={isModalSm4} setIsOpen={setModalSm4} data={{ pocketAddress: '0x65b2...1413' }} />*/}
              <ModalLayout
                isOpen={isModalNftAlbum}
                setIsOpen={setModalNftAlbum}
                size='lg-t'
                title='NFT 컬렉션 수집 현황'
                subTitle='전체 컬렉션 중 내가 소유한 NFT 개수를 확인할 수 있어요.'
                wrapClassName='nft-owned-select-wrap empty'
                destroyOnClose={true}
              >
                {/* 1.1.5 DAO - Empty case */}
                <Empty
                  subText={'컬렉션 NFT가 없습니다.\nMarketplace에서 다양한 NFT를 만나보세요!'}
                  button={<TextButton buttonText='Marketplace 바로가기' iconValue='arrow' size='sm' href='/dao' />}
                />
              </ModalLayout>
            </div>
          </div>
        </section>

        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id='Chart'>
            Chart
          </h1>
          <div
            className={cn('common-display-flex')}>{/* <MypageLineChart id="mypage-line-chart" data={lineChartInit} /> */}</div>
        </section>

        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id='Empty'>
            Empty
          </h1>
          <div>
            <div>
              {/* 1-1. NFT filter */}
              <Empty subText='조건을 만족하는 결과가 없습니다.' />
              {/* 1.1.4 NFT_Activity_Empty case */}
              <Empty subText='활동한 내역이 없습니다.' />
              {/* 1.1.5 DAO - Empty case */}
              <Empty
                subText={'참여하고 있는 DAO가 없습니다.\n지금 모집 중인 WONDER DAO에 참여해보세요!'}
                button={<TextButton buttonText='DAO Home 바로가기' iconValue='arrow' size='sm' href='/dao' />}
              />
              {/* 1.1.3 NFT_Favorites_Empty case */}
              <Empty
                subText={'소유하고 있는 NFT가 없습니다.\nMarketplace에서 다양한 NFT를 만나보세요!'}
                button={<TextButton buttonText='Marketplace 바로가기' iconValue='arrow' size='sm' href='/marketplace' />}
              />
              {/* 1-4. Activity_Search */}
              <Empty iconType='search' text='검색 결과가 없습니다.' subText="'sunny'에 해당하는 검색 결과가 없습니다." />
            </div>
          </div>
        </section>

        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id='MypageCard'>
            MypageCard
          </h1>
          <div className={cn('common-display-flex')}>
            <MypageCard
              title='My Balance'
              date='2022-08-16 13:53 기준'
              mainUnit='$1,500.00'
              percent='+9.66%'
              wonder='3,334.1234'
              gwonder='3,334.1234'
            />
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['mypage', 'common'])),
    },
  };
};

export default Common;
