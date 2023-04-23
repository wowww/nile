/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import * as Scroll from 'react-scroll';
import {
  Avatar,
  Checkbox,
  Form,
  Input,
  message,
  Popover,
  Radio,
  RadioChangeEvent,
  Select,
  Switch,
  Table,
  Tabs,
  Timeline,
} from 'antd';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import IconLogoWhite from '@images/icon/ico_logo_white.svg';
import IconLangWhite from '@images/icon/ico_footer_lang.svg';
import IconLang from '@images/icon/ico_lang.svg';
import IconPapyrus from '@images/icon/ico_papyrus.svg';
import IconLogoImg from '@images/icon/ico_logo.svg';
import IconNotice from '@images/icon/ico_notice.svg';
import IconSearch from '@images/icon/ico_search.svg';
import IconFacebook from '@public/icons/ico_facebook.svg';
import IconMedium from '@public/icons/ico_medium.svg';
import IconTelegram from '@public/icons/ico_telegram.svg';
import IconTwitter from '@public/icons/ico_twitter.svg';
import IconYoutube from '@public/icons/ico_youtube.svg';
import IconHomepage from '@public/icons/ico_homepage.svg';
import IconDiscord from '@public/icons/ico_discord.svg';
import IconGitBook from '@public/icons/ico_gitbook.svg';
import IconInstagram from '@public/icons/ico_instagram.svg';
import IconInfo from '@images/icon/ico_info.svg';
import IconArrow from '@images/icon/ico_arrow_16.svg';
import IconArrowClear from '@images/icon/ico_arrow_clear.svg';
import IconSuccess from '@images/icon/ico_success.svg';

import OutlineButton from '@/components/button/OutlineButton';
import BgButton from '@/components/button/BgButton';
import TextButton from '@/components/button/TextButton';
import IconButton from '@/components/button/IconButton';
import Tag from '@/components/tag/Tag';
import Chip from '@/components/tag/Chip';
import TagData from '@/components/tag/TagData';
import Recruiting from '@/components/chart/Recruiting';
import PaginationCustom from '@/components/button/PaginationCustom';
import { ColumnLineMixChartData, lineBasicChartData, lineChartData } from '@/components/chart/chartDummyData';
import {
  daoHomeTableColumns,
  daoHomeTableColumnsData,
  daoStationTableColumns,
  daoStationTableColumnsData,
  filterSampleColumns,
  filterSampleData,
} from '@/components/table/tableDummyData';
import NumberInput from '@/components/input/NumberInput';
import ShareButton from '@/components/button/ShareButton';
import ContentTitle from '@/components/marketplace/ContentTitle';
import Empty from '@/components/empty/Empty';
import InfiniteLoader from '@/components/loader/InfiniteLoader';
import MarqueeBanner from '@/components/marquee/MarqueeBanner';
import SquareTag from '@/components/tag/SquareTag';
import TimeList from '@/components/list/TimeList';
import TermsModal from '@/components/modal/TermsModal';
import NetworkModal from '@/components/modal/NetworkModal';
import NetworkSettingModal from '@/components/modal/NetworkSettingModal';
import NileIntroduceModal from '@/components/modal/introduce/NileIntroduceModal';
import { useTranslation } from 'next-i18next';
import { windowResizeAtom } from '@/state/windowAtom';
import { IconLogo } from '@components/logo/IconLogo';
import { useAtom, useAtomValue } from 'jotai';
import CollectionSonModal from '@/components/modal/CollectionSonModal';
import Agora from '@/components/chart/Agora';
import TagFluctuationRate from '@components/tag/TagFluctuationRate';
import { DaoScanTableButton } from '@/components/button/DaoScanTableButton';
import PaginationTransaction from '@/components/button/PaginationTransaction';
import useWindowResize from '@/hook/useWindowResize';
import Head from 'next/head';
// const LineChartBasic = dynamic(() => import('@/components/chart/LineChartBasic'), {
//   ssr: false,
// });

// const LineChart = dynamic(() => import('@/components/chart/LineChart'), {
//   ssr: false,
// });

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

const ColumnLineMixChart = dynamic(() => import('@/components/chart/ColumnLineMixChart'), {
  ssr: false,
});

const PriceHistoryChart = dynamic(() => import('@/components/chart/PriceHistoryChart'), {
  ssr: false,
});

const { Option } = Select;
const colorSets = [
  { colorVariable: '$black', colorValue: '#1a1a1a' },
  { colorVariable: '$white', colorValue: '#fff' },
  { colorVariable: '$positive', colorValue: '#27c683' },
  { colorVariable: '$negative', colorValue: '#fa5454' },
  { colorVariable: '$warning', colorValue: '#FF810D' },
  { colorVariable: '$highlight', colorValue: '#9860ff' },
  { colorVariable: '$favorite', colorValue: '#FFD138' },
  { colorVariable: '$textDefault', colorValue: '#1a1a1a' },
  { colorVariable: '$textSubdued', colorValue: '#595959' },
  { colorVariable: '$textDisabled', colorValue: '#a6a6a6' },
  { colorVariable: '$gray100', colorValue: '#fff' },
  { colorVariable: '$gray90', colorValue: '#f2f2f2' },
  { colorVariable: '$gray80', colorValue: '#d9d9d9' },
  { colorVariable: '$gray70', colorValue: '#bfbfbf' },
  { colorVariable: '$gray60', colorValue: '#a6a6a6' },
  { colorVariable: '$gray50', colorValue: '#8c8c8c' },
  { colorVariable: '$gray40', colorValue: '#737373' },
  { colorVariable: '$gray30', colorValue: '#595959' },
  { colorVariable: '$gray20', colorValue: '#404040' },
  { colorVariable: '$gray10', colorValue: '#2e2e2e' },
  { colorVariable: '$gray00', colorValue: '#1a1a1a' },
  { colorVariable: '$nile10', colorValue: '#ECAAFD' },
  { colorVariable: '$nile20', colorValue: '#EC98FF' },
  { colorVariable: '$nile30', colorValue: '#EC80FF' },
  { colorVariable: '$nile40', colorValue: '#A864FF' },
  { colorVariable: '$nile50', colorValue: '#9860FF' },
  { colorVariable: '$nile60', colorValue: '#875CFF' },
  { colorVariable: '$increase', colorValue: '#27c683' },
  { colorVariable: '$decrease', colorValue: '#fa5454' },
  { colorVariable: '$complement', colorValue: '#2e2e2e' },
  { colorVariable: '$complementDark', colorValue: '#d9d9d9' },
  { colorVariable: '$increaseBg', colorValue: '#eafbf4' },
  { colorVariable: '$decreaseBg', colorValue: '#fff5f5' },
  { colorVariable: '$complementBg', colorValue: '#f2f2f2' },
  { colorVariable: '$increaseBgDark', colorValue: '#0d402a' },
  { colorVariable: '$decreaseBgDark', colorValue: '#4a0202' },
  { colorVariable: '$complementBgDark', colorValue: '#404040' },
  { colorVariable: '$category1', colorValue: '#9860ff' },
  { colorVariable: '$category2', colorValue: '#1d94f5' },
  { colorVariable: '$category3', colorValue: '#465cff' },
  { colorVariable: '$category4', colorValue: '#04c35c' },
  { colorVariable: '$category2Dark', colorValue: '#36b8ff' },
  { colorVariable: '$category3Dark', colorValue: '#5e5ff5' },
  { colorVariable: '$category4Dark', colorValue: '#62e1c3' },
  { colorVariable: '$etc', colorValue: '#eda20b' },
  { colorVariable: '$etcDark', colorValue: '#ffd056' },
  { colorVariable: '$total', colorValue: '#1a1a1a' },
];

const Common = () => {
  const [sectionLinks, setSectionLinks] = useState<boolean>();
  const [uploadFormState, setUploadFormState] = useState<'' | 'success' | 'error' | 'warning' | 'validating' | undefined>('');
  const [uploadFormHasFile, setUploadFormHasFile] = useState<boolean>(false);
  const [uploadFileFormat, setUploadFileFormat] = useState<string>('default');
  const sectionLinkAll = useRef<any>([]);
  const [lineChartBasicInit, setLineChartBasic] = useAtom(lineBasicChartData);
  const [lineChartInit, setLineChart] = useAtom(lineChartData);
  const [columnLineMixChartInit, setColumnLineMixChart] = useAtom(ColumnLineMixChartData);
  // const priceHistoryInit = useRecoilValue(PriceHistoryData);

  // 팝업 호출 데이터 Start
  const [isModalSm, setModalSm] = useState(false);
  const [isModalSmType2, setModalSmType2] = useState(false);
  const [isModalMd, setModalMd] = useState(false);
  const [isModalMdType2, setModalMdType2] = useState(false);
  const [isModalMdType3, setModalMdType3] = useState(false);
  const [isModalMdType4, setModalMdType4] = useState(false);
  const [isModalMdType5, setModalMdType5] = useState(false);
  const [isModalLg, setModalLg] = useState(false);
  const [isModalLgType2, setModalLgType2] = useState(false);
  const [isModalLgType3, setModalLgType3] = useState(false);
  const [isModalLgType4, setModalLgType4] = useState(false);
  const [isModalRequired, setModalRequired] = useState(false);
  const [isNileServiceModal, setIsNileServiceModal] = useState(false);

  const [isModalService, setModalService] = useState(false);
  const [isModalTerm, setModalTerm] = useState(false);
  const [isModalServiceAgree, setModalServiceAgree] = useState(false);
  const [isModalTermAgree, setModalTermAgree] = useState(false);
  const [isModalNetwork, setModalNetwork] = useState(false);
  const [isModalNetworkSetting, setModalNetworkSetting] = useState(false);
  const [isModalEvent, setModalEvent] = useState(false);
  const [isSonModal, setSonModal] = useState(false);

  const [value, setValue] = useState(0);
  const { t } = useTranslation('common');

  const [radioValue, setRadioValue] = useState(1);
  const resizeEvtInit = useWindowResize();
  const offset = useAtomValue(windowResizeAtom);

  // marque banner용 임시 데이터
  const nftList = ['COLLECTIBLES', 'PIXEL ART', 'PFP', 'MOVE TO EARN', 'PLAY TO EARN', 'UTILITY', 'TALK TO EARN', 'RELAX TO EARN', 'SPORTS', 'MUSIC'];

  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
  };

  // const uploadFile = useRecoilValue(isOnChange);
  // 팝업 호출 데이터 End

  // pagination 사용시 필요한 부분 Start
  const [activatePagination, setPaginationActivate] = useState(1);

  const onChange = (page: number, pageSize: number) => {
    // 현재 active 된 페이지 체크
    setPaginationActivate(page);
  };
  // pagination 사용시 필요한 부분 End

  // form 사용시 필요한 부분 Start
  const [uploadOnChange, setUploadOnChange] = useState();
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const [tooltipOpen, setTooltipOpen] = useState(true);

  const onFinish = (values: any) => {
    console.log(values);
  };
  // form 사용시 필요한 부분 End

  useEffect(() => {
    const links = document.querySelectorAll('section > h1');
    if (sectionLinks === undefined) {
      links.forEach((link, index) => {
        sectionLinkAll.current[index] = link;
      });
      setSectionLinks(true);
    }
  }, [sectionLinks]);

  //탭 임시데이터
  const TabInTab = [
    {
      label: 'Token Usage',
      key: 'token',
      children: (
        <Tabs defaultActiveKey="5-1" className={cn('tab-type', 'tab-round', 'tab-sm')}>
          <Tabs.TabPane tab="Proposal 30" key="5-1">
            Content of Tab Pane 1
          </Tabs.TabPane>
          <Tabs.TabPane tab="Voting 5" key="5-2">
            Content of Tab Pane 2
          </Tabs.TabPane>
          <Tabs.TabPane tab="Comment 28" key="5-3">
            Content of Tab Pane 3
          </Tabs.TabPane>
        </Tabs>
      ),
    },
    {
      label: 'Proposal 참여 이력',
      key: 'Proposal',
      children: (
        <Tabs defaultActiveKey="6-1" className={cn('tab-type', 'tab-round', 'tab-sm')}>
          <Tabs.TabPane tab="Proposal 30" key="6-1">
            Content of Tab Pane 1
          </Tabs.TabPane>
          <Tabs.TabPane tab="Voting 5" key="6-2">
            Content of Tab Pane 2
          </Tabs.TabPane>
          <Tabs.TabPane tab="Comment 28" key="6-3">
            Content of Tab Pane 3
          </Tabs.TabPane>
        </Tabs>
      ),
    },
    {
      label: 'Discussion 참여 이력',
      key: 'Discussion',
      children: (
        <Tabs defaultActiveKey="7-1" className={cn('tab-type', 'tab-round', 'tab-sm')}>
          <Tabs.TabPane tab="Proposal 30" key="7-1">
            Content of Tab Pane 1
          </Tabs.TabPane>
          <Tabs.TabPane tab="Voting 5" key="7-2">
            Content of Tab Pane 2
          </Tabs.TabPane>
          <Tabs.TabPane tab="Comment 28" key="7-3">
            Content of Tab Pane 3
          </Tabs.TabPane>
        </Tabs>
      ),
    },
    {
      label: 'History',
      key: 'History',
      children: (
        <Tabs defaultActiveKey="8-1" className={cn('tab-type', 'tab-round', 'tab-sm')}>
          <Tabs.TabPane tab="Proposal 30" key="8-1">
            Content of Tab Pane 1
          </Tabs.TabPane>
          <Tabs.TabPane tab="Voting 5" key="8-2">
            Content of Tab Pane 2
          </Tabs.TabPane>
          <Tabs.TabPane tab="Comment 28" key="8-3">
            Content of Tab Pane 3
          </Tabs.TabPane>
        </Tabs>
      ),
    },
  ];

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
        <title>Common &gt; NILE</title>
        <body className={cn('common-wrap')} />
      </Head>
      <div className={cn('common-content-wrap')}>
        <div className={cn('common-links')}>
          <a href="/common">Common</a>
          <a href="/common/dao">Dao</a>
          <a href="/common/mypage">Mypage</a>
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
          <h1 className={cn('common-title')} id="Color">
            Color
          </h1>
          <div className={cn('color-set-view')}>
            {colorSets.map((colorSet, index) => {
              return (
                <div key={`color-set-${index}`}>
                  <div className={cn('color-set')} style={{ backgroundColor: colorSet.colorValue }}>
                    <p>
                      <span>{colorSet.colorVariable}</span>
                      <span>{colorSet.colorValue}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Typography">
            Typography
          </h1>
          <div>
            <ul className={cn('common-notice')}>
              {/* <li>
                폰트 사이즈 정의 시 mixin에 정의된 <b>fontsizeMixin(font-size, lineHeight)</b> 사용 : <b>font-size</b> 와 <b>line-height</b>를 정의된
                base font size로 재정의
                <br />
                단위는 모두 px 단위로 number만 사용 <span>(예: fontsizeMixin(24, 28))</span>
              </li>
              <li>
                font family 기본은 Notosans<b>($fontFamily)</b>, 영문 title은 Roboto<b>($fontEN)</b> / Times New Roman<b>($fontSerif)</b> 혼용
              </li> */}
              <li>
                font는 라이브러리 피그마에서 정의된 되로 font.scss에서 정의되어 있음. 폰트 사이즈 / weight / family를 별도로 설정하지 않고 이미 정의된
                믹스인 호출로 사용
              </li>
              <li>피그마에서 텍스트 클릭시 Typography 에서 Ag 부분에 정의 된 변수명으로 사용</li>
              <li>fontFamilyDp(xl, hl, l, mr, mb, sb)</li>
              <li>fontFamilyUi(br, bb, lnbr, lnbb, tabmr, tabmb, tabsr, tabsb, gnbr, gnbb)</li>
              <li>fontFamilyHeading(xl, l, mr, mb, s, xs)</li>
              <li>fontFamilyBody(tb, xxlb, xlr, xlb, lr, lb, mr, mb, sr, sb, cl, cs, u)</li>
              <li>fontFamilyData(xl, lr, lb, m1r, m1b, m2, m3, sr, sb, cl, cs)</li>
              <li>fontFamilyTable(tr, tb, blr, blb, br, bb)</li>
              <li>fontFamilyButton(lr, lb, mr, mb, sr, sb)</li>
              <li>fontFamilyChip(lr, lb, mr, mb, s)</li>
              <li>fontFamilyInput(m, s, xs)</li>
            </ul>
            <div className={cn('common-fonts')}>
              <div>Noto Sans KR</div>
              <div className={cn('font-roboto')}>Roboto</div>
              <div className={cn('font-times')}>Times New Roman</div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Icon">
            Icon
          </h1>
          <div>
            <ul className={cn('common-notice')}>
              <li>이미지 아래 컴포넌트 name 명시. 그대로 검색해서 import로 사용</li>
              <li>
                네이밍 규칙 : <b>svg icon component name은 Icon으로 시작</b>
              </li>
              <li>
                public 적혀 있는 것은 public 폴더에 있음 <span>(background 이미지로 사용해야할 경우 public에 저장)</span>
              </li>
              <li>
                svg 컴포넌트로 사용시 <span>width, height 값을 바꿔줘야 하는 경우</span> : svg 파일에서 <b>width: 1em, height: 1em</b>
                으로 바꾼 후 css 적용 (IconPapyrus 참고)
              </li>
            </ul>
            <div className={cn('common-display-flex')}>
              <div>
                <div className={cn('common-name')}>IconLang</div>
                <IconLang />
              </div>
              <div>
                <div className={cn('common-name')}>IconLogo</div>
                <IconLogoImg />
              </div>
              <div>
                <div className={cn('common-name')}>IconNotice</div>
                <IconNotice />
              </div>
              <div>
                <div className={cn('common-name')}>IconSearch</div>
                <IconSearch />
              </div>
            </div>
            <div className={cn('common-display-flex', 'bg-common-black')}>
              <div>
                <div className={cn('common-name')}>IconLogoWhite</div>
                <IconLogoWhite style={{ width: '128px', height: '36px' }} />
              </div>
              <div>
                <div className={cn('common-name')}>IconLangWhite</div>
                <IconLangWhite style={{ width: '24px', height: '24px' }} />
              </div>
              <div>
                <div className={cn('common-name')}>IconPapyrus</div>
                <IconPapyrus style={{ width: '89px', height: '40px' }} />
              </div>
            </div>
            <h2 className={cn('common-sub-title')}>public</h2>
            <div className={cn('common-display-flex', 'bg-common-black')}>
              <div>
                <div className={cn('common-name')}>IconFacebook</div>
                <IconFacebook />
              </div>
              <div>
                <div className={cn('common-name')}>IconMedium</div>
                <IconMedium />
              </div>
              <div>
                <div className={cn('common-name')}>IconTelegram</div>
                <IconTelegram />
              </div>
              <div>
                <div className={cn('common-name')}>IconTwitter</div>
                <IconTwitter />
              </div>
              <div>
                <div className={cn('common-name')}>IconYoutube</div>
                <IconYoutube />
              </div>
            </div>
            <div className={cn('common-display-flex')}>
              <div>
                <div className={cn('common-name')}>IconHomepage</div>
                <IconHomepage />
              </div>
              <div>
                <div className={cn('common-name')}>IconDiscord</div>
                <IconDiscord />
              </div>
              <div>
                <div className={cn('common-name')}>IconGitBook</div>
                <IconGitBook />
              </div>
              <div>
                <div className={cn('common-name')}>IconInstagram</div>
                <IconInstagram />
              </div>
            </div>
            <h2 className={cn('common-sub-title')}>state</h2>
            <div className={cn('common-display-flex')}>
              <div>
                <div className={cn('common-name')}>IconSuccess</div>
                <IconSuccess />
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Button">
            Button
          </h1>
          <div>
            <ul className={cn('common-notice')}>
              <li>
                <b>antd</b> 버튼 커스텀해서 사용
              </li>
              <li>
                모든 버튼 필수 Props 값 : buttonText=&quot;버튼 텍스트&quot;, color=&quot;컬러 값 (black, white, highlight (dao 개별 컬러 BgButton에서
                사용))&quot;, size=&quot;사이즈 값(xs, sm, md ... )&quot;
              </li>
              <li>
                아이콘 + 텍스트 버튼 필수 Props 값 : iconType (선언만 해주면 됨 true 값), iconValue=&quot;아이콘 이미지 값 (OutlineButton,
                BgButton에서 정의된 iconValue 값)&quot;
              </li>
              <li>아이콘 + 텍스트 버튼 옵션 Props 값 : align (선언만 해주면 됨 true 값) -&gt; space-between 으로 정렬</li>
              <li>
                <b>button css는 _button.scss에 작성 / ant-btn css 초기화는 antd.scss에 작성</b>
              </li>
              <li>
                <span>링크 타입</span>일 경우 Props : type=&quot;link&quot;, href=&quot;경로&quot; 는 필수. target=&quot;_blank&quot;는 필요에 따라
                적용
              </li>
              <li>
                component: <span>OutlineButton</span>, <span>BgButton</span>, <span>IconButton</span>, <span>TextButton</span>
              </li>
              <li>
                btn 공통 클래스 / 사이즈: btn-sm, btn-md, btn-lg, btn-full / 타입: btn-outline, btn-bg / 컬러: bg-white, bg-common-black,
                outline-white, outline-black
              </li>
              <li>
                <b>
                  <strong>btn-sm</strong>
                </b>
                : height 28px, font-size 12px /{' '}
                <b>
                  <strong>btn-md</strong>
                </b>
                : height 38px, min-width 120px, font-size 14px /{' '}
                <b>
                  <strong>btn-lg</strong>
                </b>
                : height 44px, font-size 16px /
                <b>
                  <strong>btn-xl</strong>
                </b>
                : height 52px, font-size 16px /
                <b>
                  <strong>btn-full</strong>
                </b>
                : width 100%
              </li>
              <li>
                IconButton 필수 Props 값 : size=&quot;40, 24, 16, 12 중 택1&quot; / buttonText=&quot;버튼 히든 텍스트&quot; / iconValue=&quot;아이콘
                이미지 값 (IconButton 정의된 iconValue 값)&quot;
              </li>
              <li>IconButton 옵션 Props 값 : classnames=&quot;개별 클래스&quot; / circle(선언만 해주면 됨 true 값)</li>
            </ul>
            <div className={cn('common-display-flex')}>
              <div className={cn('wonder-wrap')} style={{ margin: 0 }}>
                <OutlineButton buttonText="xl outline highlight(다오용)" color="highlight" size="xl" />
              </div>
              <OutlineButton buttonText="xl outline black" color="black" size="xl" />
              <OutlineButton buttonText="lg outline black" color="black" size="lg" />
              <OutlineButton buttonText="floating outline black" color="black" size="lg-f" />
              <OutlineButton buttonText="md outline black" color="black" size="md" />
              <OutlineButton buttonText="md outline gray" color="gray" size="md" />
              <OutlineButton buttonText="sm outline black" color="black" size="sm" />
              <OutlineButton buttonText="sm outline black" color="black" size="sm" disabled />
              <OutlineButton buttonText="xs outline black" color="black" size="xs" />
              <div className={cn('wonder-wrap')} style={{ margin: 0 }}>
                <BgButton buttonText="xl bg highlight(다오용)" color="highlight" size="xl" />
              </div>
              <BgButton buttonText="xl bg black" color="black" size="xl" />
              <BgButton buttonText="lg bg black" color="black" size="lg" />
              <BgButton buttonText="floating bg black" color="black" size="lg-f" />
              <BgButton buttonText="md bg black" color="black" size="md" />
              <BgButton buttonText="md bg black" color="black" size="md" iconType iconValue="info" />
              <BgButton buttonText="sm bg black" color="black" size="sm" iconType align iconValue="info" />
              <BgButton buttonText="sm bg black" color="black" size="sm" disabled />
              <BgButton buttonText="xs bg black" color="black" size="xs" />
              <BgButton buttonText="xs bg table gray" color="gray" size="table-xs" />
              <DaoScanTableButton buttonText="xs bg table gray" type="link" link="/" />
            </div>
            <div className={cn('common-display-flex bg-common-black')}>
              <OutlineButton buttonText="xl outline white" color="white" size="xl" />
              <OutlineButton buttonText="lg outline white" color="white" size="lg" />
              <OutlineButton buttonText="floating outline white" color="white" size="lg-f" />
              <OutlineButton buttonText="md outline white" color="white" size="md" />
              <OutlineButton buttonText="sm outline white" color="white" size="sm" />
              <OutlineButton buttonText="sm outline white" color="white" size="sm" disabled />
              <OutlineButton buttonText="sm outline white" color="white" size="sm" disabled />
              <BgButton buttonText="xl bg white" color="white" size="xl" />
              <BgButton buttonText="lg bg white" color="white" size="lg" />
              <BgButton buttonText="floating bg white" color="white" size="lg-f" />
              <BgButton buttonText="md bg white" color="white" size="md" />
              <BgButton buttonText="sm bg white" color="white" size="sm" iconType align iconValue="info" />
              <BgButton buttonText="xs bg white" color="white" size="xs" />
            </div>
            <div className={cn('common-flex-column')}>
              <div className={cn('common-name')}>Icon Button</div>
              <div className={cn('common-display-flex')}>
                <IconButton buttonText="검색창 열기" size="40" iconValue="search" circle classnames="btn-header" />
                <IconButton buttonText="알림 열기" size="40" iconValue="notice" circle classnames="btn-header" />
                <IconButton buttonText="언어 변경" size="40" iconValue="lang" circle classnames="btn-header" />
              </div>
            </div>
            <div className={cn('common-flex-column')}>
              <div className={cn('common-name')}>Text Button</div>
              <div className="common-display-flex">
                <TextButton buttonText="Line Arrow MD" iconValue="line-arrow" gapSpacing="lg" size="md" />
                <TextButton buttonText="Scroll SM" iconValue="scroll" prefix size="sm" />
                <TextButton buttonText="Arrow LG" iconValue="arrow" size="lg" />
                <TextButton buttonText="Arrow MD" iconValue="arrow" size="md" />
                <TextButton buttonText="Arrow SM" iconValue="arrow" size="sm" />
                <TextButton buttonText="Show More" iconValue="arrow" size="sm" direction="left" />
                <TextButton buttonText="Show More" iconValue="arrow" size="sm" direction="top" />
                <TextButton buttonText="Show More" iconValue="arrow" size="sm" direction="bottom" />
              </div>
            </div>
            <div className={cn('common-flex-column')}>
              <div className={cn('common-name')}>Like Button</div>
              <div className="common-display-flex">
                {/*<LikeButton count={100} />*/}
                {/*<LikeButton count={0} />*/}
              </div>
            </div>
            <div className={cn('common-flex-column')}>
              <div className={cn('common-name')}>Share Button</div>
              <div className="common-display-flex">
                <ShareButton />
                <ShareButton buttonType="bgButton" />
              </div>
            </div>
            <div className={cn('common-flex-column')}>
              <div className={cn('common-name')}>Share Button</div>
              <div className="common-display-flex">
                <ShareButton />
              </div>
            </div>
            <div className={cn('common-flex-column')}>
              <div className={cn('common-name')}>Copy Button</div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Tabs">
            Tabs
          </h1>
          <div>
            <ul className={cn('common-notice')}>
              <li>
                <b>antd</b> 버튼 커스텀해서 사용
              </li>
              <li>
                <b>tab 공통 클래스 : tab-type</b>, tab size: tab-lg (height 60px), tab-md (height 48px)
              </li>
              <li>tab-full class와 tab size class 조합으로 사용 가능</li>
            </ul>
            <div className={cn('common-display-flex')}>
              <div className={cn('common-flex-column')}>
                <div className={cn('common-name')}>tab-lg</div>
                <Tabs defaultActiveKey="1" className={cn('tab-type', 'tab-lg')}>
                  <Tabs.TabPane tab=" Tab 1" key="1-1">
                    Content of Tab Pane 1
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Tab 2" key="1-2">
                    Content of Tab Pane 2
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Tab 3" key="1-3">
                    Content of Tab Pane 3
                  </Tabs.TabPane>
                </Tabs>
              </div>
              <div className={cn('common-flex-column')}>
                <div className={cn('common-name')}>tab-lg, tab-full</div>
                <Tabs defaultActiveKey="2" className={cn('tab-type', 'tab-lg', 'tab-full')}>
                  <Tabs.TabPane tab="Tab 1" key="2-1">
                    Content of Tab Pane 1
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Tab 2" key="2-2">
                    Content of Tab Pane 2
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Tab 3" key="2-3">
                    Content of Tab Pane 3
                  </Tabs.TabPane>
                </Tabs>
              </div>
            </div>
            <div className={cn('common-display-flex')}>
              <div className={cn('common-flex-column')}>
                <div className={cn('common-name')}>tab-md</div>
                <Tabs defaultActiveKey="3" className={cn('tab-type', 'tab-md')}>
                  <Tabs.TabPane tab="Tab 1" key="3-1">
                    Content of Tab Pane 1
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Tab 2" key="3-2">
                    Content of Tab Pane 2
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Tab 3" key="3-3">
                    Content of Tab Pane 3
                  </Tabs.TabPane>
                </Tabs>
              </div>
              <div className={cn('common-flex-column wonder-wrap')} style={{ background: '#fff' }}>
                <div className={cn('common-name')}>개별 다오 테마 적용 시</div>
                <Tabs defaultActiveKey="4" className={cn('tab-type', 'tab-md', 'tab-inline')}>
                  <Tabs.TabPane tab="Tab 1" key="4-1">
                    Content of Tab Pane 1
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Tab 2" key="4-2">
                    Content of Tab Pane 2
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Tab 3" key="4-3">
                    Content of Tab Pane 3
                  </Tabs.TabPane>
                </Tabs>
              </div>

              <div className={cn('common-flex-column')}>
                <div className={cn('common-name')}>tab-round</div>
                <Tabs defaultActiveKey="1" className={cn('tab-type', 'tab-round')}>
                  <Tabs.TabPane tab="Created NFT" key="5-1">
                    Content of Tab Pane 1
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Owned NFT" key="5-2">
                    Content of Tab Pane 2
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Favorites" key="5-3">
                    Content of Tab Pane 3
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Activity" key="5-4">
                    Content of Tab Pane 4
                  </Tabs.TabPane>
                </Tabs>
              </div>
              <div className={cn('common-flex-column')}>
                <div className={cn('common-name')}>tab-round, tab-full</div>
                {/* 오른쪽 여백이 붙어 있을시  full-type css 여백 임의 조정  */}
                <Tabs defaultActiveKey="1" className={cn('tab-type', 'tab-round', 'tab-full')}>
                  <Tabs.TabPane tab="Created NFT" key="5-1">
                    Content of Tab Pane 1
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Owned NFT" key="5-2">
                    Content of Tab Pane 2
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Favorites" key="5-3">
                    Content of Tab Pane 3
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Activity" key="5-4">
                    Content of Tab Pane 4
                  </Tabs.TabPane>
                </Tabs>
              </div>

              <div className={cn('common-flex-column wonder-wrap')} style={{ background: '#fff' }}>
                <div className={cn('common-name')}>개별 다오 테마 탭안에 탭</div>
                <Tabs defaultActiveKey="Token Usage" className={cn('tab-type', 'tab-md', 'tab-inline', 'tab-underline')} items={TabInTab} />
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Tag">
            Tag &#38; chip
          </h1>
          <div>
            <ul className={cn('common-notice')}>
              <li>Tag, Chip, TagData 컴포넌트 Props 조합으로 사용</li>
              <li>
                Tag :
                <ul>
                  <li>
                    <b>size :</b>
                    <span>
                      <strong> xs(pc 해상도만 s와 동일, tablet / mobile 해상도에서 구분 확인 가능)</strong>
                    </span>
                    (height 20px, font-size 12px)
                    <span>
                      <strong> s</strong>
                    </span>
                    (height 20px, font-size 12px)
                    <span>
                      <strong> sm</strong>
                    </span>
                    (height 20px, font-size 12px, border-radius: 2px, bg default)
                    <span>
                      <strong> md-m</strong>
                    </span>
                    (tag market / height 24px, font-size 12px)
                    <span>
                      <strong>
                        <del>md</del> &gt; 디자인에서 삭제 됨
                      </strong>
                    </span>
                    (height 28px, font-size 12px)
                  </li>
                  <li>
                    <b>type</b> : tag(default), primary (다오 개별 홈 색상 적용), market
                  </li>
                  <li>
                    <b>bg</b> : boolean (default - false) /<b> disabled</b> : boolean(default - false) /<b> color</b> : negative, warning, gray (bg
                    gray), positive, transparent
                  </li>
                </ul>
              </li>
              <li>
                Tag market :
                <ul>
                  <li>
                    <b>size :</b>
                    <span>
                      <strong> md-m</strong>
                    </span>
                    (height 24px, font-size 12px)
                    <span>
                      <strong> lg-m</strong>
                    </span>
                    (height 32px, font-size 16px)
                  </li>
                  <li>
                    <b>type</b> :
                    <span>
                      <strong>market</strong>
                    </span>
                  </li>
                  <li>
                    <b>bg</b> : boolean (default - false) /<b> disabled</b> : boolean(default - false) /<b> color</b> : negative, warning, gray (bg
                    gray), positive, transparent
                  </li>
                  <li>basic 타입 보더 black -$gt; gray80 으로 수정 되었습니다</li>
                </ul>
              </li>
              <li>
                Chip :
                <ul>
                  <li>
                    <b>size :</b>
                    <span>
                      <strong>sm (market tag)</strong>
                    </span>
                    (height 24px, font-size 12px),
                    <span>
                      <strong> md</strong>
                    </span>
                    (height 28px, font-size 12px),
                    <span>
                      <strong> lg</strong>
                    </span>
                    (height 32px, font-size 16px)
                  </li>
                  <li>
                    <b>bg</b> : boolean (default - false) /<b> disabled</b> : boolean(default - false) /<b> primary</b> : boolean (다오 개별 홈 색상
                    적용, default - false)
                  </li>
                </ul>
              </li>
              <li>
                TagData :
                <ul>
                  <li>
                    <b>dataText</b> : string /<b> option</b> : up, down
                  </li>
                </ul>
              </li>
              <li>
                TagFluctuationRate
                <ul>
                  <li>사이즈 단일 (height 20px, font-size 12px) </li>
                  <li>
                    <b>figure</b> : number (값에 따라 increase / decrease) / <b>bg</b> : boolean (default - false)
                  </li>
                </ul>
              </li>
            </ul>
            <div className={cn('wonder-wrap')} style={{ background: '#fff' }}>
              <div className={cn('common-name')}>Tag</div>
              <div className={cn('common-display-flex')}>
                <Tag size="xs" color="positive">
                  tag xs
                </Tag>
                <Tag size="xs" color="negative">
                  tag xs
                </Tag>
                <Tag size="s" color="positive">
                  tag s
                </Tag>
                <Tag size="s" color="negative">
                  tag s
                </Tag>
                <Tag size="s" color="light-gray">
                  tag s
                </Tag>
                <Tag size="xs" color="light-gray">
                  tag s light-gray
                </Tag>
                <Tag size="xs" color="gray">
                  tag xs gray
                </Tag>
                <Tag size="xs" color="dark-gray">
                  tag s dark-gray
                </Tag>
                <Tag size="xs" color="black">
                  tag s black
                </Tag>
                <div style={{ backgroundColor: '#000' }}>
                  <Tag size="s" color="transparent">
                    tag s
                  </Tag>
                </div>
                <Tag size="sm" color="positive">
                  tag sm
                </Tag>
                <Tag size="sm" color="gray" bg>
                  tag sm gray bg
                </Tag>
                <Tag type="primary" size="md-m">
                  tag md-m, primary
                </Tag>
                <Tag type="primary" size="md-m" bg>
                  tag md-m, primary, bg
                </Tag>
              </div>
            </div>
            <div className={cn('wonder-wrap')} style={{ background: '#fff' }}>
              <div className={cn('common-name')}>Tag market</div>
              <div className={cn('common-display-flex')}>
                {/* 갓 */}
                <Tag type="market" size="md-m" color="negative">
                  Action Now
                </Tag>
                {/* 파라오 */}
                <Tag type="market" size="md-m" color="negative">
                  Action Now
                </Tag>
                <Tag type="market" size="md-m" color="negative">
                  Action Now
                </Tag>
                <Tag type="market" size="md-m" bg>
                  01h : 23m : 33s
                </Tag>
                <Tag size="md-m" bg disabled>
                  Not for Sale
                </Tag>
                <Tag size="md-m" color="gray" bg>
                  Not for Sale
                </Tag>
                <Tag size="md-m" color="dark-gray">
                  Upcoming
                </Tag>
                <Tag type="market" size="lg-m" bg>
                  01h : 23m : 33s
                </Tag>
              </div>
            </div>
            <div className={cn('wonder-wrap')} style={{ background: '#fff' }}>
              <div className={cn('common-name')}>Chip</div>
              <div className={cn('common-display-flex')}>
                <Chip size="lg">
                  <strong>chip</strong> lg
                </Chip>
                <Chip size="lg" bg>
                  <strong>chip</strong> lg, bg
                </Chip>
                <Chip size="lg">chip lg</Chip>
                <Chip size="lg" bg>
                  chip lg, bg
                </Chip>
                <Chip size="md">chip md</Chip>
                <Chip size="md" bg>
                  chip md, bg
                </Chip>
                <Chip size="md" primary>
                  chip md
                </Chip>
                <Chip size="md" disabled>
                  chip md disabled
                </Chip>
                <Chip size="sm">chip sm</Chip>
                <Chip size="sm" bg>
                  chip sm, bg
                </Chip>
                <Chip size="sm" primary>
                  chip sm
                </Chip>
                <Chip size="sm" disabled>
                  chip sm disabled
                </Chip>
              </div>
            </div>
            <div>
              <div className={cn('common-name')}>TagData</div>
              <div className={cn('common-display-flex')}>
                <TagData dataText="+00%" option="up" />
                <TagData dataText="-00%" option="down" />
              </div>
            </div>
            <div>
              <div className={cn('wonder-wrap')} style={{ background: '#fff' }}>
                <div className={cn('common-name')}>TagFluctuationRate (Price Growth)</div>
                <div className={cn('common-display-flex')}>
                  <TagFluctuationRate bg figure={9.66} />
                  <TagFluctuationRate bg figure={-9.66} />
                  <TagFluctuationRate bg figure={0} />
                  <TagFluctuationRate type="primary" figure={9.66} />
                  <TagFluctuationRate figure={9.66} />
                  <TagFluctuationRate figure={-9.66} />
                  <TagFluctuationRate figure={0} />
                </div>
              </div>
            </div>
            <div>
              <div className={cn('common-name')}>Square Tag</div>
              <div className={cn('common-display-flex')}>
                <SquareTag>default black bg tag</SquareTag>
                <SquareTag color="gray">gray bg tag</SquareTag>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Chart">
            Chart
          </h1>
          <div>
            <div className={cn('wonder-wrap')} style={{ background: '#fff' }}>
              <div className={cn('common-name')}>Recruiting</div>
              <div className={cn('common-display-flex')}>
                <Recruiting rate={150} goalNum="13,500,000" />
              </div>
              <div className={cn('common-name')}>LineChartBasic</div>
              <div className={cn('common-display-flex')} style={{ height: '240px' }}>
                {/* <LineChartBasic id="line-basic-chart" data={lineChartBasicInit} /> */}
              </div>
              <div className={cn('common-name')}>LineChart</div>
              <div className={cn('common-display-flex dao-wrap wonder-wrap')} style={{ background: '#fff' }}>
                {/* <LineChart id="line-chart" data={lineChartInit} /> */}
              </div>
              <div className={cn('common-name')}>ColumnLineMixChart</div>
              <div className={cn('common-display-flex dao-wrap wonder-wrap')} style={{ background: '#fff' }}>
                {/* <ColumnLineMixChart id="column-line-mix-chart" data={columnLineMixChartInit} /> */}
              </div>
              <div className={cn('common-name')}>Agora</div>
              <div className={cn('common-display-flex')} style={{ background: '#F3F3FC', padding: '20px' }}>
                <Agora current={10} goal={20} />
              </div>
              <div className={cn('common-display-flex dao-wrap wonder-wrap')} style={{ background: '#fff' }}>
                {/* <PriceHistoryChart data={priceHistoryInit} /> */}
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Form">
            Form
          </h1>
          <div>
            <ul className={cn('common-notice')}>
              <li>
                <b>antd</b> 커스텀해서 사용
              </li>
              <li>select width 100%로 사용 시 width-full 클래스 추가해서 사용</li>
              <li>select 스크롤 있는 modal에서 사용 시 getPopupContainer 값 줬을때 드롭다운 시 화면이 잘리진 않는지 확인 필요</li>
              <li>헬퍼 텍스트가 있는 경우 : Form.item 에 has-helper 클래스 추가, data-content 로 가이드로 들어갈 문구 추가</li>
            </ul>
            <div className={cn('wonder-wrap')} style={{ background: '#fff' }}>
              <div className={cn('common-display-flex')}>
                <Switch />
                <Switch defaultChecked />
                <Checkbox defaultChecked={false}>Checkbox</Checkbox>
                <Checkbox defaultChecked>Checkbox</Checkbox>
                <Checkbox disabled>Checkbox</Checkbox>
                <Checkbox defaultChecked={true} disabled>
                  Checkbox
                </Checkbox>
                <Radio.Group name="radio-group" onChange={onChangeRadio} value={radioValue}>
                  <Radio value={1} />
                  <Radio value={2} />
                  <Radio value={3} disabled />
                </Radio.Group>
                {/* 디자인 확인 용 */}
                <Radio defaultChecked disabled />
              </div>
              <div className={cn('common-display-flex')}>
                <div>
                  <div className={cn('common-name')}>select lg</div>
                  <div className={cn('common-display-flex')}>
                    <Select
                      size="large"
                      defaultValue="lucy"
                      suffixIcon={<IconArrow />}
                      popupClassName="select-size-md-dropdown"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>select md</div>
                  <div className={cn('common-display-flex')}>
                    <Select
                      size="middle"
                      defaultValue="lucy"
                      suffixIcon={<IconArrow />}
                      popupClassName="select-size-md-dropdown"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>select md disabled</div>
                  <div className={cn('common-display-flex')}>
                    <Select
                      size="middle"
                      defaultValue="lucy"
                      suffixIcon={<IconArrow />}
                      popupClassName="select-size-md-dropdown"
                      disabled={true}
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>select sm</div>
                  <div className={cn('common-display-flex')}>
                    <Select
                      size="small"
                      defaultValue="lucy"
                      suffixIcon={<IconArrow />}
                      popupClassName="select-size-sm-dropdown"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>select sm</div>
                  <div className={cn('common-display-flex')}>
                    <Select
                      size="small"
                      defaultValue="lucy"
                      suffixIcon={<IconArrow />}
                      popupClassName="select-size-sm-dropdown"
                      disabled={true}
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className={cn('common-display-flex')}>
                <div>
                  <div className={cn('common-name')}>input singleline lg</div>
                  <div className={cn('common-display-flex')}>
                    <Input size="large" placeholder="text" />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline lg search</div>
                  <div className={cn('common-display-flex')}>
                    <Input size="large" placeholder="text" prefix={<IconSearch />} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline lg disabled</div>
                  <div className={cn('common-display-flex')}>
                    <Input size="large" placeholder="text" disabled={true} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline lg error</div>
                  <div className={cn('common-display-flex')}>
                    <Input size="large" placeholder="text" status="error" />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline lg clearButton</div>
                  <div className={cn('common-display-flex')}>
                    <Input size="large" placeholder="text" value="text" allowClear={{ clearIcon: <IconArrowClear /> }} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline lg maxLength</div>
                  <div className={cn('common-display-flex')}>
                    <Input size="large" showCount maxLength={100} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline lg group</div>
                  <div className={cn('common-display-flex')}>
                    <div className={cn('input-group-wrap')}>
                      <Input size="large" placeholder="Min" />
                      <span>to</span>
                      <Input size="large" placeholder="Max" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={cn('common-display-flex')}>
                <div>
                  <div className={cn('common-name')}>input singleline default</div>
                  <div className={cn('common-display-flex')}>
                    <Input placeholder="text" />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline default search</div>
                  <div className={cn('common-display-flex')}>
                    <Input placeholder="text" prefix={<IconSearch />} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline default disabled</div>
                  <div className={cn('common-display-flex')}>
                    <Input placeholder="text" disabled={true} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline default error</div>
                  <div className={cn('common-display-flex')}>
                    <Input placeholder="text" status="error" />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline default clearButton</div>
                  <div className={cn('common-display-flex')}>
                    <Input placeholder="text" value="text" allowClear={{ clearIcon: <IconArrowClear /> }} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline default maxLength</div>
                  <div className={cn('common-display-flex')}>
                    <Input showCount maxLength={100} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline default group</div>
                  <div className={cn('common-display-flex')}>
                    <div className={cn('input-group-wrap')}>
                      <Input placeholder="Min" />
                      <span>to</span>
                      <Input placeholder="Max" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={cn('common-display-flex')}>
                <div>
                  <div className={cn('common-name')}>input singleline sm</div>
                  <div className={cn('common-display-flex')}>
                    <Input placeholder="text" size="small" />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline default search</div>
                  <div className={cn('common-display-flex')}>
                    <Input placeholder="text" size="small" prefix={<IconSearch />} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline sm disabled</div>
                  <div className={cn('common-display-flex')}>
                    <Input placeholder="text" size="small" disabled={true} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline sm error</div>
                  <div className={cn('common-display-flex')}>
                    <Input placeholder="text" size="small" status="error" />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline sm clearButton</div>
                  <div className={cn('common-display-flex')}>
                    <Input placeholder="text" size="small" value="text" allowClear={{ clearIcon: <IconArrowClear /> }} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline sm maxLength</div>
                  <div className={cn('common-display-flex')}>
                    <Input showCount maxLength={100} size="small" />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input singleline sm group</div>
                  <div className={cn('common-display-flex')}>
                    <div className={cn('input-group-wrap')}>
                      <Input placeholder="Min" size="small" />
                      <span>to</span>
                      <Input placeholder="Max" size="small" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={cn('common-display-flex')}>
                <div>
                  <div className={cn('common-name')}>input number</div>
                  <div className={cn('common-display-flex')}>
                    <NumberInput unit="WEMIX$" value={value} setValue={setValue} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input number plus disabled</div>
                  <div className={cn('common-display-flex')}>
                    <NumberInput unit="WEMIX$" plusDisabled value={value} setValue={setValue} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input number minus disabled</div>
                  <div className={cn('common-display-flex')}>
                    <NumberInput unit="WEMIX$" minusDisabled value={value} setValue={setValue} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input number error</div>
                  <div className={cn('common-display-flex')}>
                    <NumberInput unit="WEMIX$" error value={value} setValue={setValue} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input number input disabled</div>
                  <div className={cn('common-display-flex')}>
                    <NumberInput unit="WEMIX$" inputDisabled value={value} setValue={setValue} />
                  </div>
                </div>
              </div>
              <div className={cn('common-display-flex', 'bg-common-black')}>
                <div>
                  <div className={cn('common-name')}>input number bg black</div>
                  <div className={cn('common-display-flex')}>
                    <NumberInput unit="WEMIX$" bgBlack value={value} setValue={setValue} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input number plus disabled bg black</div>
                  <div className={cn('common-display-flex')}>
                    <NumberInput unit="WEMIX$" bgBlack plusDisabled value={value} setValue={setValue} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input number minus disabled bg black</div>
                  <div className={cn('common-display-flex')}>
                    <NumberInput unit="WEMIX$" bgBlack minusDisabled value={value} setValue={setValue} />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input number error bg black</div>
                  <div className={cn('common-display-flex')}>
                    <NumberInput unit="WEMIX$" bgBlack error />
                  </div>
                </div>
                <div>
                  <div className={cn('common-name')}>input number input disabled</div>
                  <div className={cn('common-display-flex')}>
                    <NumberInput unit="WEMIX$" bgBlack inputDisabled />
                  </div>
                </div>
              </div>
              <div className={cn('common-display-flex')}>
                <div>
                  <div className={cn('common-name')}>Form</div>
                  <div className={cn('common-display-flex')}>
                    <Form name="nest-messages" layout="vertical" onFinish={onFinish} validateMessages={validateMessages} size="small">
                      <Form.Item
                        name={'input'}
                        label="Label"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input placeholder="text" />
                      </Form.Item>
                      <Form.Item
                        name={'select'}
                        label="Label"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          suffixIcon={<IconArrow />}
                          popupClassName="select-size-sm-dropdown"
                          placeholder="지원하고자 하는 NFT 분야를 선택해 주세요."
                        >
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name={'textarea'}
                        label="Label"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input.TextArea showCount maxLength={100} />
                      </Form.Item>
                    </Form>
                    <Form name="nest-messages2" layout="vertical" onFinish={onFinish} validateMessages={validateMessages} size="middle">
                      <Form.Item
                        name={'input2'}
                        label="Label"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input placeholder="text" />
                      </Form.Item>
                      <Form.Item
                        name={'select2'}
                        label="Label"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          suffixIcon={<IconArrow />}
                          popupClassName="select-size-sm-dropdown"
                          placeholder="지원하고자 하는 NFT 분야를 선택해 주세요."
                        >
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name={'dragger'} label="Label">
                        {/* <UploadDragger callback={null} /> */}
                      </Form.Item>
                    </Form>
                    <Form name="nest-messages3" layout="vertical" onFinish={onFinish} validateMessages={validateMessages} size="large">
                      <Form.Item
                        name={'input3'}
                        label="Label"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input placeholder="text" />
                      </Form.Item>
                    </Form>
                  </div>
                  {/* 23.03.28 수정: 헬퍼 텍스트 있는 경우 추가
                  피그마 링크 : https://www.figma.com/file/E1Y2Jq0Ycub8pYR8aEdVOO/%5B%ED%8D%BC%EB%B8%94%EB%A6%AC%EC%8B%B1%5D-%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80?node-id=2147-52848&t=MvXWnw798127u8MV-0 
                  페이지 링크 : http://localhost:3000/ko/mypage/profile */}
                  <div className={cn('common-name')}>Form has Helper Text (mypage/profile.tsx)</div>
                  <div className={cn('common-display-flex')}>
                    <Form name="nest-messages" layout="vertical" onFinish={onFinish} validateMessages={validateMessages} size="small">
                      <Form.Item
                        name="nickname"
                        label={t('profileSetting.userName')}
                        className={cn('profile-form-item has-helper')}
                        required
                        data-content={t('profileSetting.userNameHelper')}
                        // rules={[
                        //   {
                        //     validator: debounce(validateNickname, 500, { leading: true }),
                        //   },
                        // ]}
                      >
                        <div className={cn('helper-wrap')}>
                          <Input placeholder={t('profileSetting.userNamePlaceholder')} />
                        </div>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Timeline">
            Timeline
          </h1>
          <div>
            <div className={cn('wonder-wrap')} style={{ background: '#fff' }}>
              <div className={cn('common-display-flex')}>
                <Timeline>
                  <Timeline.Item>
                    <div className={cn('timeline-wrap')}>
                      <div className={cn('timeline-tit-wrap')}>
                        <strong className={cn('timeline-tit')}>Treasury</strong>
                        <span className={cn('timeline-date')}>2022-07-01 13:30:04</span>
                        <Tag size="xs" color="positive">
                          NEW
                        </Tag>
                      </div>
                      <div className={cn('timeline-content')}>
                        <ul className={cn('list-type-dot')}>
                          <li>200,000 WEMIX is kept in Treasury.</li>
                          <li>200,000 WEMIX is kept in Treasury.</li>
                        </ul>
                      </div>
                    </div>
                  </Timeline.Item>
                  <Timeline.Item>
                    <div className={cn('timeline-wrap')}>
                      <div className={cn('timeline-tit-wrap')}>
                        <strong className={cn('timeline-tit')}>Treasury</strong>
                        <span className={cn('timeline-date')}>2022-07-01 13:30:04</span>
                        <Tag size="xs" color="positive">
                          NEW
                        </Tag>
                      </div>
                      <div className={cn('timeline-content')}>
                        <div className={cn('timeline-desc')}>200,000 WEMIX is kept in Treasury.</div>
                      </div>
                    </div>
                  </Timeline.Item>
                  <Timeline.Item>
                    <div className={cn('timeline-wrap')}>
                      <div className={cn('timeline-tit-wrap')}>
                        <strong className={cn('timeline-tit')}>Treasury</strong>
                        <span className={cn('timeline-date')}>2022-07-01 13:30:04</span>
                        <Tag size="xs" color="positive">
                          NEW
                        </Tag>
                      </div>
                      <div className={cn('timeline-content')}>
                        <div className={cn('timeline-desc')}>200,000 WEMIX is kept in Treasury.</div>
                        <ul className={cn('list-type-dot')}>
                          <li>200,000 WEMIX is kept in Treasury.</li>
                          <li>200,000 WEMIX is kept in Treasury.</li>
                        </ul>
                      </div>
                    </div>
                  </Timeline.Item>
                </Timeline>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="List">
            List
          </h1>
          <div>
            <div className={cn('wonder-wrap')} style={{ background: '#fff' }}>
              <div className={cn('common-display-flex')}>
                <ul className={cn('list-type-dot')}>
                  <li>200,000 WEMIX is kept in Treasury.</li>
                  <li>200,000 WEMIX is kept in Treasury.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="TimeList">
            TimeList
          </h1>
          <div>
            <TimeList target={process.env.NEXT_PUBLIC_ENV_NFT_SALE_START_DATE} />
          </div>
          <div style={{ backgroundColor: '#000' }}>
            <TimeList target={process.env.NEXT_PUBLIC_ENV_NFT_SALE_START_DATE} type="dot" />
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Table">
            Table
          </h1>
          <div>
            <ul className={cn('common-notice')}>
              <li>기본 thead의 정렬은 가운데 정렬</li>
              <li>
                thead의 정렬을 바꾸고 싶을 때 talbe column className에 <span>align-right, align-left</span> 클래스 추가
              </li>
            </ul>
            <div className={cn('wonder-wrap')}>
              <div className={cn('common-display-flex')}>
                <div className={cn('common-name')}>개별 다오 table md</div>
                <Table className={cn('table-type-md')} columns={daoHomeTableColumns} dataSource={daoHomeTableColumnsData} pagination={false} />
                <div className={cn('common-name')}>table lg</div>
                <Table className={cn('table-type-lg')} columns={filterSampleColumns} dataSource={filterSampleData} pagination={false} />
                <div className={cn('common-name')}>filter/sorting 테이블 (샘플 데이터만 넣어둔 상태)</div>
                <Table className={cn('table-type-lg')} columns={daoStationTableColumns} dataSource={daoStationTableColumnsData} pagination={false} />
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Avatar">
            Avatar
          </h1>
          <div>
            <ul className={cn('common-notice')}>
              <li>기본 Avatar 기본 타입은 총 6개. default 타입(회색배경)에는 별도의 클래스가 부여되지 않음.</li>
              <li>
                컬러를 기반으로 나머지 5개 타입은 각각 <span>type1</span>, <span>type2</span>, <span>type3</span>, <span>type4</span>,{' '}
                <span>type5</span> 클래스를 사용하여 해당 기본 이미지 적용 가능
              </li>
              <li>기본 스타일로 border가 들어가있으므로, 디자인에 border가 없을 경우 추가 작업 필요.</li>
            </ul>
            <div className={cn('common-display-flex')}>
              <div>
                <div className={cn('common-name')}>Avatar 버튼 타입</div>
                <div className={cn('common-display-flex')}>
                  {/* 기본 타입 */}
                  <button type="button" className={cn('btn-user-open')}>
                    <Avatar className={cn('user-image')} size={40}>
                      <span className={cn('a11y')}>프로필 열기</span>
                    </Avatar>
                  </button>
                  {/* 사용자 이미지 추가 : backgroundImage url 속성에 해당 이미지 경로 넣어주어야 합니다. */}
                  <button type="button" className={cn('btn-user-open')}>
                    <Avatar className={cn('user-image')} size={40} style={{ backgroundImage: 'url(https://picsum.photos/32/32/?image=1)' }}>
                      <span className={cn('a11y')}>프로필 열기</span>
                    </Avatar>
                  </button>
                </div>
              </div>
              <div>
                <div className={cn('common-name')}>Avatar 아이콘 타입</div>
                <div className={cn('common-display-flex')}>
                  <Avatar className={cn('user-image')} size={40} style={{ backgroundImage: 'url(https://picsum.photos/32/32/?image=1)' }} />
                  <Avatar className={cn('user-image')} size={40} />
                  <Avatar className={cn('user-image type1')} size={40} />
                  <Avatar className={cn('user-image type2')} size={40} />
                  <Avatar className={cn('user-image type3')} size={40} />
                  <Avatar className={cn('user-image type4')} size={40} />
                  <Avatar className={cn('user-image type5')} size={40} />
                  <Avatar className={cn('user-image type6')} size={40} />
                  <Avatar className={cn('user-image type7')} size={40} />
                  <Avatar className={cn('user-image type8')} size={40} />
                  <Avatar className={cn('user-image type9')} size={40} />
                  <Avatar className={cn('user-image type10')} size={40} />
                  <Avatar className={cn('user-image type11')} size={40} />
                  <Avatar className={cn('user-image type12')} size={40} />
                  <Avatar className={cn('user-image type13')} size={40} />
                  <Avatar className={cn('user-image type14')} size={40} />
                  <Avatar className={cn('user-image type15')} size={40} />
                  <Avatar className={cn('user-image type16')} size={40} />
                  <Avatar className={cn('user-image type17')} size={40} />
                  <Avatar className={cn('user-image type18')} size={40} />
                  <Avatar className={cn('user-image type19')} size={40} />
                  <Avatar className={cn('user-image type20')} size={40} />
                  <Avatar className={cn('user-image type21')} size={40} />
                  <Avatar className={cn('user-image type22')} size={40} />
                  <Avatar className={cn('user-image type23')} size={40} />
                  <Avatar className={cn('user-image type24')} size={40} />
                  <Avatar className={cn('user-image type25')} size={40} />
                  <Avatar className={cn('user-image type26')} size={40} />
                  <Avatar className={cn('user-image type27')} size={40} />
                  <Avatar className={cn('user-image type28')} size={40} />
                  <Avatar className={cn('user-image type29')} size={40} />
                </div>
              </div>

              <div>
                <div className={cn('common-name')}>Avatar Group</div>
                <div className={cn('common-display-flex')}>
                  <Avatar.Group maxCount={3}>
                    <Avatar className={cn('user-image')} size={40} />
                    <Avatar className={cn('user-image')} size={40} style={{ backgroundImage: 'url(https://picsum.photos/32/32/?image=1)' }} />
                    <Avatar className={cn('user-image')} size={40} style={{ backgroundImage: 'url(https://picsum.photos/32/32/?image=1)' }} />
                    <Avatar className={cn('user-image')} size={40} style={{ backgroundImage: 'url(https://picsum.photos/32/32/?image=1)' }} />
                  </Avatar.Group>
                  <div className={cn('avatar-group-wrap avatar-group-sm')}>
                    <Avatar.Group maxCount={3}>
                      <Avatar className={cn('user-image')} size={20} />
                      <Avatar className={cn('user-image type3')} size={20} style={{ backgroundImage: 'url(https://picsum.photos/32/32/?image=1)' }} />
                      <Avatar className={cn('user-image type2')} size={20} style={{ backgroundImage: 'url(https://picsum.photos/32/32/?image=1)' }} />
                      <Avatar className={cn('user-image type5')} size={20} style={{ backgroundImage: 'url(https://picsum.photos/32/32/?image=1)' }} />
                    </Avatar.Group>
                    <span className={cn('avatar-group-more')}>47 discuss now</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={cn('common-display-flex')}>
              <div>
                <div className={cn('common-name')}>Avatar name component md</div>
                <div className={cn('common-display-flex')}>
                  <div className={cn('name-tag name-tag-md')}>
                    <Avatar className={cn('user-image type1')} size={28} />
                    <span className={cn('name-tag-name')}>bethemoon</span>
                  </div>
                </div>
              </div>
              <div>
                <div className={cn('common-name')}>Avatar name component sm</div>
                <div className={cn('common-display-flex')}>
                  <div className={cn('name-tag name-tag-sm')}>
                    <Avatar className={cn('user-image type5')} size={20} />
                    <span className={cn('name-tag-name')}>bethemoon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Tooltip">
            Tooltip
          </h1>
          <div>
            <div className={cn('common-display-flex')}>
              <div>
                <div className={cn('common-name')}>top center</div>
                <div>
                  <div className={cn('tooltip-wrap')}>
                    <span style={{ fontSize: '12px' }}>Expected Reward </span>
                    <Popover
                      overlayClassName="tooltip"
                      placement="top"
                      content={
                        <div className={cn('tooltip-contents')}>
                          <strong>Expected Reward</strong> is the extimated revenue for a year from operating the DAO with funds, assuming that 100%
                          of the recruitment (150,000 WEMIX) is achieved.
                        </div>
                      }
                      trigger="hover"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <button type="button">
                        <span className={cn('a11y')}>tooltip</span>
                        <IconInfo />
                      </button>
                    </Popover>
                  </div>
                  <Popover
                    overlayClassName="tooltip"
                    placement="top"
                    content={
                      <div className={cn('tooltip-contents')}>
                        <strong>Expected Reward</strong> is the extimated revenue for a year from operating the DAO with funds, assuming that 100% of
                        the recruitment (150,000 WEMIX) is achieved.
                      </div>
                    }
                    trigger="click"
                  >
                    <button type="button">
                      <span className={cn('a11y')}>tooltip</span>
                      <IconInfo />
                    </button>
                  </Popover>
                </div>
              </div>
              <div>
                <div className={cn('common-name')}>bottom center</div>
                <div>
                  <div className={cn('tooltip-wrap')}>
                    <span style={{ fontSize: '12px' }}>Expected Reward</span>
                    <Popover
                      overlayClassName="tooltip"
                      placement="bottom"
                      content={
                        <div className={cn('tooltip-contents')}>
                          <strong>Expected Reward</strong> is the extimated revenue for a year from operating the DAO with funds, assuming that 100%
                          of the recruitment (150,000 WEMIX) is achieved.
                        </div>
                      }
                      trigger="hover"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <button type="button">
                        <span className={cn('a11y')}>tooltip</span>
                        <IconInfo />
                      </button>
                    </Popover>
                  </div>
                </div>
              </div>
              <div>
                <div className={cn('common-name')}>right center</div>
                <div>
                  <div className={cn('tooltip-wrap')}>
                    <span style={{ fontSize: '12px' }}>Expected Reward</span>
                    <Popover
                      overlayClassName="tooltip"
                      placement="right"
                      content={
                        <div className={cn('tooltip-contents')}>
                          <strong>Expected Reward</strong> is the extimated revenue for a year from operating the DAO with funds, assuming that 100%
                          of the recruitment (150,000 WEMIX) is achieved.
                        </div>
                      }
                      trigger="hover"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <button type="button">
                        <span className={cn('a11y')}>tooltip</span>
                        <IconInfo />
                      </button>
                    </Popover>
                  </div>
                </div>
              </div>
              <div>
                <div className={cn('common-name')}>left center</div>
                <div>
                  <div className={cn('tooltip-wrap')}>
                    <span style={{ fontSize: '12px' }}>Expected Reward</span>
                    <Popover
                      overlayClassName="tooltip"
                      placement="left"
                      content={
                        <div className={cn('tooltip-contents')}>
                          <strong>Expected Reward</strong> is the extimated revenue for a year from operating the DAO with funds, assuming that 100%
                          of the recruitment (150,000 WEMIX) is achieved.
                        </div>
                      }
                      trigger="hover"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <button type="button">
                        <span className={cn('a11y')}>tooltip</span>
                        <IconInfo />
                      </button>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Pagination">
            Pagination
          </h1>
          <div>
            <ul className={cn('common-notice')}>
              <li>Pagination 사용 시 페이지 내에서 필요한 스크립트 주석으로 표시 해둠. (pagination 사용시 필요한 부분)</li>
            </ul>
            <div className={cn('common-display-flex')}>
              <PaginationCustom defaultCurrent={1} defaultPageSize={10} total={140} onChange={onChange} activate={activatePagination} />
            </div>
            <div className={cn('common-display-flex')}>
              <TextButton buttonText="Show More" iconValue="arrow" size="sm" direction="bottom" />
            </div>
            <div className={cn('common-display-flex')}>
              <PaginationTransaction total={2000} jumpArray={[25, 50, 100]} />
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Modal">
            Modal
          </h1>
          <div>
            <ul className={cn('common-notice')}>
              <li>
                Toast 팝업은 antd 커스텀으로 사용, <span>message.info('지원 완료되었습니다.')</span> 형태로 메세지 작성하여 호출
              </li>
              <li>브라우져에서 40px 만큼 위 아래로 여백 적용</li>
              <li>message 뒤에 값은 info, success, error, warning, warn, warning 이 있으나, 모두 동일한 스타일로 적용되어 있음.</li>
            </ul>
            <div className={cn('common-display-flex')}>
              {/* 팝업 호출 버튼 */}
              <OutlineButton
                buttonText="small - confirm type"
                color="black"
                size="md"
                onClick={() => {
                  setModalSm(true);
                }}
              />
              <OutlineButton
                buttonText="small - alert type"
                color="black"
                size="md"
                onClick={() => {
                  setModalSmType2(true);
                }}
              />
              <OutlineButton
                buttonText="medium - footer button type"
                color="black"
                size="md"
                onClick={() => {
                  setModalMd(true);
                }}
              />
              <OutlineButton
                buttonText="medium - footer X"
                color="black"
                size="md"
                onClick={() => {
                  setModalMdType2(true);
                }}
              />
              <OutlineButton
                buttonText="medium - title serif type"
                color="black"
                size="md"
                onClick={() => {
                  setModalMdType3(true);
                }}
              />
              <OutlineButton
                buttonText="medium - sub title type, button O"
                color="black"
                size="md"
                onClick={() => {
                  setModalMdType4(true);
                }}
              />
              <OutlineButton
                buttonText="medium - sub title type, button X"
                color="black"
                size="md"
                onClick={() => {
                  setModalMdType5(true);
                }}
              />
              <OutlineButton
                buttonText="large - footer button type"
                color="black"
                size="md"
                onClick={() => {
                  setModalLg(true);
                }}
              />
              <OutlineButton
                buttonText="large - sub title type, button O"
                color="black"
                size="md"
                onClick={() => {
                  setModalLgType2(true);
                }}
              />

              <OutlineButton
                buttonText="large - sub title type, button X"
                color="black"
                size="md"
                onClick={() => {
                  setModalLgType3(true);
                }}
              />
              <OutlineButton
                buttonText="large - footer X"
                color="black"
                size="md"
                onClick={() => {
                  setModalLgType4(true);
                }}
              />
              <OutlineButton
                buttonText="toast popup"
                color="black"
                size="md"
                onClick={() => message.info({ content: '지원 완료되었습니다.', key: 'toast' })}
              />
              <OutlineButton
                type="primary"
                buttonText="Unfolding Soon toast popup"
                color="black"
                size="md"
                onClick={() => message.info({ content: '상세화면은 11월 22일부터 확인할 수 있습니다.', key: 'toast' })}
              />
              {/* 팝업 SM */}
              <ModalLayout
                isOpen={isModalSm}
                setIsOpen={setModalSm}
                size="sm"
                title="Title"
                footer={true}
                destroyOnClose={true}
                footerContent={[
                  <OutlineButton
                    buttonText="Cancel"
                    color="black"
                    size="md"
                    onClick={() => {
                      setModalSm(false);
                    }}
                    key="cancel"
                  />,
                  <BgButton
                    buttonText="Save"
                    color="black"
                    size="md"
                    key="Save"
                    onClick={() => {
                      setModalSm(false);
                    }}
                  />,
                ]}
              >
                <p>Life is Cool~~ Life is So cool Oh - Yeah</p>
                <Select size="middle" defaultValue="lucy" suffixIcon={<IconArrow />} popupClassName="select-size-md-dropdown">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </ModalLayout>
              <ModalLayout
                isOpen={isModalSmType2}
                setIsOpen={setModalSmType2}
                size="sm"
                title="Title"
                footer={true}
                destroyOnClose={true}
                footerContent={[
                  <BgButton
                    buttonText="Save"
                    color="black"
                    size="md"
                    key="Save"
                    onClick={() => {
                      setModalSmType2(false);
                    }}
                  />,
                ]}
              >
                <p>Life is Cool~~ Life is So cool Oh - Yeah</p>
              </ModalLayout>
              {/* 팝업 medium */}
              <ModalLayout
                isOpen={isModalMd}
                setIsOpen={setModalMd}
                title="Title"
                size="md"
                footer={true}
                destroyOnClose={true}
                footerContent={[
                  <OutlineButton
                    buttonText="Cancel"
                    color="black"
                    size="md"
                    key="Cancel"
                    onClick={() => {
                      setModalMd(false);
                    }}
                  />,
                  <BgButton
                    buttonText="Okay"
                    color="black"
                    size="md"
                    key="Okay"
                    onClick={() => {
                      setModalMd(false);
                    }}
                  />,
                ]}
              >
                <p>
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                </p>
              </ModalLayout>
              <ModalLayout isOpen={isModalMdType2} setIsOpen={setModalMdType2} title="Title" size="md" footer={false} destroyOnClose={true}>
                <p>Life is Cool~~ Life is So cool Oh - Yeah</p>
              </ModalLayout>
              <ModalLayout
                isOpen={isModalMdType3}
                setIsOpen={setModalMdType3}
                size="md"
                title="Display"
                titleType="center"
                titleFont="serif"
                footer={true}
                destroyOnClose={true}
                footerContent={[
                  <BgButton
                    buttonText="Okay"
                    color="black"
                    size="lg"
                    key="Okay"
                    onClick={() => {
                      setModalMdType3(false);
                    }}
                  />,
                ]}
              >
                <p>
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                </p>
              </ModalLayout>
              <ModalLayout isOpen={isModalMdType5} setIsOpen={setModalMdType5} title="Title" size="md-t" subTitle="sub title">
                <p>
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                </p>
              </ModalLayout>
              <ModalLayout
                isOpen={isModalMdType4}
                setIsOpen={setModalMdType4}
                title="Title"
                size="md-t"
                subTitle="sub title"
                footer={true}
                destroyOnClose={true}
                footerContent={[
                  <OutlineButton
                    buttonText="Cancel"
                    color="black"
                    size="md"
                    key="Cancel"
                    onClick={() => {
                      setModalMdType4(false);
                    }}
                  />,
                  <BgButton
                    buttonText="Okay"
                    color="black"
                    size="md"
                    key="Okay"
                    onClick={() => {
                      setModalMdType4(false);
                    }}
                  />,
                ]}
              >
                <p>
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                </p>
              </ModalLayout>
              {/* 팝업 Large */}
              <ModalLayout
                isOpen={isModalLg}
                setIsOpen={setModalLg}
                size="lg"
                title="Title"
                footer={true}
                destroyOnClose={true}
                footerContent={[
                  <OutlineButton
                    buttonText="Cancel"
                    color="black"
                    size="lg"
                    key="Cancel"
                    onClick={() => {
                      setModalLg(false);
                    }}
                  />,
                  <BgButton
                    buttonText="Okay"
                    color="black"
                    size="lg"
                    key="Okay"
                    onClick={() => {
                      setModalLg(false);
                    }}
                  />,
                ]}
              >
                <p>
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                </p>
              </ModalLayout>
              <ModalLayout
                isOpen={isModalLgType2}
                setIsOpen={setModalLgType2}
                size="lg-t"
                title="Title"
                subTitle="sub title"
                footer={true}
                destroyOnClose={true}
                footerContent={[
                  <OutlineButton
                    buttonText="Cancel"
                    color="black"
                    size="lg"
                    key="Cancel"
                    onClick={() => {
                      setModalLgType2(false);
                    }}
                  />,
                  <BgButton
                    buttonText="Okay"
                    color="black"
                    size="lg"
                    key="Okay"
                    onClick={() => {
                      setModalLgType2(false);
                    }}
                  />,
                ]}
              >
                <p>
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                </p>
              </ModalLayout>
              <ModalLayout isOpen={isModalLgType3} setIsOpen={setModalLgType3} size="lg-t" title="Title" destroyOnClose={true} subTitle="sub title">
                <p>
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                </p>
              </ModalLayout>
              <ModalLayout
                isOpen={isModalLgType4}
                setIsOpen={setModalLgType4}
                title="Title"
                size="lg"
                footer={false}
                destroyOnClose={true}
                wrapClassName="lg-t-basic"
              >
                <p>
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                  Life is Cool~~ Life is So cool Oh - Yeah
                  <br />
                </p>
              </ModalLayout>
            </div>
            <div>
              <div className={cn('common-name')}>서비스 소개 모달</div>
              {/* <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="서비스 소개 모달"
                  color="black"
                  size="md"
                  onClick={() => {
                    setIsNileServiceModal(true);
                  }}
                />
                <ServiceIntroduceModal isOpen={isNileServiceModal} setIsOpen={setIsNileServiceModal} setDisAgreeOpen={setModalServiceAgree} />
              </div> */}
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="나일 서비스 소개 모달"
                  color="black"
                  size="md"
                  onClick={() => {
                    setModalService(true);
                  }}
                />
                <NileIntroduceModal isOpen={isModalService} setIsOpen={setModalService} setDisAgreeOpen={setModalServiceAgree} />
                <ModalLayout
                  isOpen={isModalServiceAgree}
                  setIsOpen={setModalServiceAgree}
                  size="sm"
                  title="이용약관 동의"
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <BgButton
                      buttonText="OK"
                      color="black"
                      size="md"
                      key="OK"
                      onClick={() => {
                        setModalServiceAgree(false);
                      }}
                    />,
                  ]}
                >
                  <p>{t('nileIntroduceModal.pushDisagree')}</p>
                </ModalLayout>
              </div>
            </div>
            <div>
              <div className={cn('common-name')}>이용약관 동의</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="이용약관 동의"
                  color="black"
                  size="md"
                  onClick={() => {
                    setModalTerm(true);
                  }}
                />
                <TermsModal isOpen={isModalTerm} setIsOpen={setModalTerm} setDisAgreeOpen={setModalTermAgree} />
                <ModalLayout
                  isOpen={isModalTermAgree}
                  setIsOpen={setModalTermAgree}
                  size="sm"
                  title="이용약관 동의"
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <BgButton
                      buttonText="OK"
                      color="black"
                      size="md"
                      key="OK"
                      onClick={() => {
                        setModalTermAgree(false);
                      }}
                    />,
                  ]}
                >
                  <p>NILE 이용약관 및 개인정보 보호정책에 동의하지 않으면, 서비스를 이용할 수 없습니다.</p>
                </ModalLayout>
              </div>
            </div>
            <div>
              <div className={cn('common-name')}>네트워크 변경</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="네트워크 변경 모달"
                  color="black"
                  size="md"
                  onClick={() => {
                    setModalNetwork(true);
                  }}
                />
                <NetworkModal isOpen={isModalNetwork} setIsOpen={setModalNetwork} />
              </div>
            </div>
            <div>
              <div className={cn('common-name')}>메인넷 네트워크 설정 방법</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="메인넷 네트워크 설정 방법"
                  color="black"
                  size="md"
                  onClick={() => {
                    setModalNetworkSetting(true);
                  }}
                />
                {offset.width < 768 && <NetworkSettingModal isOpen={isModalNetworkSetting} setIsOpen={setModalNetworkSetting} />}
              </div>
            </div>
            <div>
              <div className={cn('common-name')}>메인 이벤트 팝업</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="메인 이벤트 팝업"
                  color="black"
                  size="md"
                  onClick={() => {
                    setModalEvent(true);
                  }}
                />
                {/*<HomeEventModal isModal={isModalEvent} setIsModal={setModalEvent} />*/}
                {/* <HomeEventModal isOpen={isModalEvent} setIsOpen={setModalEvent} /> */}
              </div>
            </div>

            <div>
              <div className={cn('common-name')}>SON collection 팝업</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="Son collection 팝업"
                  color="black"
                  size="md"
                  onClick={() => {
                    setSonModal(true);
                  }}
                />
                <CollectionSonModal isModal={isSonModal} setIsModal={setSonModal} />
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="ContentHeading">
            컨텐츠 헤딩
          </h1>
          <div>
            <ContentTitle title="title" />
            <ContentTitle
              title="title"
              titleSize="md"
              serif
              href="#"
              desc={
                'WEMADE의 블록체인 전문가들이 작성한 아티클을 제공합니다.\nNFT 프로젝트, 토큰 경제, 기술 트렌드 등 블록체인 생태계에 대한 차별화된 인사이트를 확인하세요.'
              }
              newWindow
            />
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Empty">
            Empty
          </h1>
          <div>
            <div>
              <Empty subText="조건을 만족하는 결과가 없습니다." />
              <Empty
                subText={'소유하고 있는 NTF가 없습니다.\nMarketplace에서 다양한 NTF를 만나보세요!'}
                button={<TextButton buttonText="Go Marketplace" iconValue="arrow" size="sm" href="/marketplace" />}
              />
              <Empty iconType="search" text="No search results" subText="There are no search results for ‘asdf’" />
            </div>
          </div>
        </section>

        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Loader">
            Loader
          </h1>
          <div className={cn('common-display-flex')}>
            <ul className={cn('common-notice')}>
              <li>
                Infinite Loader :
                <ul>
                  <li>
                    <b>size :</b>
                    <span>
                      <strong>md, lg</strong>
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
            <div>
              <div className={cn('common-name')}>Infinite Loader</div>
              <div className={cn('common-display-flex')}>
                <InfiniteLoader />
                <InfiniteLoader size="lg" />
              </div>
            </div>
          </div>
        </section>

        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="MarqueeBanner">
            흐르는 배너
          </h1>
          <div>
            <ul className={cn('common-notice')}>
              <li>
                item명이 각 item의 class로 들어가고, 이 클래스는 각각의 백그라운드 이미지 적용에 사용됩니다. (띄어쓰기는 클래스 삽입시 삭제
                처리하므로, 디자인 텍스트 그대로 넣으시면 됩니다.)
              </li>
              <li>
                백그라운드 이미지가 안들어 갈 경우, 기존에 없던 케이스라서 그런거니 이미지 추가해주시고 css 수정해주세요! (.banner-item 에 적용된
                @each 문에 추가된 리스트 적용)
              </li>
              <li>백그라운드 이미지명 : bg_apply_[클래스명(소문자)].png</li>
            </ul>
            <MarqueeBanner itemList={nftList} loopTimes={4} />
          </div>
        </section>

        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="LogoIcon">
            코인 &amp; 다오 토큰 아이콘
          </h1>
          <div>
            <ul className={cn('common-notice')}>
              <li>
                코인 및 다오 토큰 로고의 경우 <b>IconLogo</b> 컴포넌트를 사용합니다.
                <ul>
                  <li>
                    위믹스달러와 위믹스를 어두운 배경에서 사용할 경우 타입에 <span>'_dark'</span> 붙여서 사용
                  </li>
                  <li>
                    <b>type(필수) : </b>wemix$(위믹스달러), wemix$_dark(위믹스달러 다크 모드), wemix(위믹스), wemix_dark(위믹스 다크 모드),
                    sol(솔라나), usdc, dai(다이), busd, usdt, eth(이더리움), btc(비트코인), xrp(리플), ada(에이다), dot(폴카닷), wbnb, klay, wallet,
                    metamask, wonder(wonder dao token), g.wonder(governance token), wemixfi(wemixfi token), kiaf(kiaf token)
                  </li>
                  <li>
                    <b>size(필수) : </b> 숫자로 기입
                  </li>
                  <li>
                    <b>fullType(옵션)</b> : 배경 컬러와 보더 없이 사용해야 하는 경우 (현재 풀타입은 wonder, gwonder만 나온상태로, 차후 다른 토큰
                    추가되면 컴포넌트에 적용해주세요~)
                  </li>
                </ul>
              </li>
            </ul>
            <div className={cn('common-display-flex')}>
              <IconLogo type="wemix$" size={30} />
              <IconLogo type="wemix$_dark" size={30} />
              <IconLogo type="wemix" size={30} />
              <IconLogo type="wemix_dark" size={30} />
              <IconLogo type="sol" size={30} />
              <IconLogo type="usdc" size={30} />
              <IconLogo type="dai" size={30} />
              <IconLogo type="busd" size={30} />
              <IconLogo type="usdt" size={30} />
              <IconLogo type="eth" size={30} />
              <IconLogo type="btc" size={30} />
              <IconLogo type="xrp" size={30} />
              <IconLogo type="ada" size={30} />
              <IconLogo type="dot" size={30} />
              <IconLogo type="wbnb" size={30} />
              <IconLogo type="klay" size={30} />
              <IconLogo type="klaytn" size={30} />
              <IconLogo type="wallet" size={30} />
              <IconLogo type="metamask" size={30} />
              <IconLogo type="wonder" size={30} />
              <IconLogo type="wonder" size={30} fullType />
              <IconLogo type="g.wonder" size={30} />
              <IconLogo type="g.wonder" size={30} fullType />
              <IconLogo type="wemixfi" size={30} />
              <IconLogo type="kiaf" size={30} />
              <IconLogo type="frc" size={30} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'mypage',
        'common',
        'community',
        'dao',
        'daoHome',
        'life',
        'marketplace',
        'nile',
        'story',
        'tokens',
      ])),
    },
  };
};

export default Common;
