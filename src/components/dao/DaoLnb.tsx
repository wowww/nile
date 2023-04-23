/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Dropdown, Menu } from 'antd';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
// import useMediaQuery, { useMediaQuerySync } from '@/hook/useMediaQuery';
/* 23.04.11 수정: message추가 */
import { Popover, message } from 'antd';
import { useMediaQuery } from 'react-responsive';

interface DaoLnbPropsType {
  activate: string;
  classnames: string;
}

const DaoLnb: React.FC<DaoLnbPropsType> = ({ activate, classnames }) => {
  const { t, i18n } = useTranslation(['common', 'dao']);
  // const isMobile = useMediaQuerySync('(max-width: 767px)');
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const { pathname } = useRouter();
  const activeDao = useAtomValue(daoThemeAtom);
  const root = `/dao/${activeDao.value}`;

  const changeTooltipDesc = () => {
    switch (activeMenu.current) {
      case 'Station':
        // 모집전 디스크립션
        return 'station.recruitCondition.subDesc';
      // TODO: 모집후가 되면 디스크립션 변경되어야 함
      // return 'station.complete.desc';
      case 'Treasury':
        return 'treasury.desc';
      case 'Obelisk':
        return 'stakingPool.desc';
      case 'Governance':
        return 'governance.desc';
      case 'Trust':
        return 'trust.desc';
      case 'Incinerator':
        return 'incinerator.desc';
      case `${useDaoCharacterConvert(activeDao.value)} Scan`:
        return 'scan.desc';
      default:
        break;
    }
  };
  const activeMenu = useRef<string | 'Menu'>();
  const titleDesc = changeTooltipDesc();

  const setLnbList = (daoType: string) => {
    switch (daoType) {
      case 'wonder':
        /* 23.02.20 수정: 메뉴명 변경 */
        return ['Home', 'Station', 'Treasury', 'Obelisk', 'Governance', 'Trust', 'Incinerator', `${useDaoCharacterConvert(activeDao.value)} Scan`];
    }
  };

  const lnbList = setLnbList(activeDao.value)?.map((item) => {
    return {
      title: item,
      label: (
        <>
          {/recruiting/.test(pathname) ? (
            <Link href={`${root}/recruiting`}>
              <a>{item}</a>
            </Link>
          ) : (
            <>
              <Link href={`${root}/${item.split(' ').join('').toLocaleLowerCase()}`}>
                <a>{item}</a>
              </Link>
              {/*<Link href={`${root}/${item.split(' ').join('').toLocaleLowerCase()}`}>*/}
              {/*  <a>{item}</a>*/}
              {/*</Link>*/}
            </>
          )}
        </>
      ),
      key: `menu-${item.split(' ').join('').toLocaleLowerCase()}`,
    };
  });

  lnbList?.forEach((el) => {
    if (el.key === activate) {
      activeMenu.current! = el.title;
    }
  });

  const menuComponent = <Menu items={lnbList} defaultSelectedKeys={[activate]} />;

  // if (isMobile === null) {
  //   return <></>;
  // }
  return (
    <div className={cn('dao-lnb-wrap', classnames)}>
      {!isMobile ? (
        menuComponent
      ) : (
        <>
          <Dropdown
            overlay={menuComponent}
            trigger={['click']}
            overlayClassName="mobile-lnb"
            /* 23.03.03 수정: getPopupContainer 옵션 추가  */
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          >
            <button type="button">
              <div className={cn('lnb-text-wrap')}>
                <ReactSVG
                  src={`https://nile.blob.core.windows.net/images/assets/images/img/img_dao_${activeMenu.current!.toLocaleLowerCase()}.svg`}
                />
                <span className={cn('dao-lnb-text')}>
                  {activeMenu.current}
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                </span>
              </div>
            </button>
          </Dropdown>
          {titleDesc !== undefined && (
            <div className={cn('lnb-tooltip-wrap')}>
              <Popover
                overlayClassName="tooltip"
                placement="bottomRight"
                content={
                  <div className={cn('tooltip-contents')}>
                    {t(titleDesc, {
                      ns: 'dao',
                      type: useDaoCharacterConvert(activeDao.value),
                      dtName: useDaoCharacterConvert(activeDao.value),
                      dtUnit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
                      gtName: `g.${useDaoCharacterConvert(activeDao.value)}`,
                      gtUnit: t('unit2', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
                    })}
                  </div>
                }
                trigger="click"
                getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              >
                <button type="button">
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                </button>
              </Popover>
            </div>
          )}
        </>
      )}
      {/* 23.04.11 수정 start: 준비중 버튼으로 임의교체 */}
      <a
        className={cn('dao-lnb-outline-button')}
        target="_blank"
        title={t('blank')}
        rel="noopener noreferrer"
        href={`https://wonder-dao.gitbook.io/whitepaper-${i18n.language === 'en' ? 'en' : 'kr'}`}
      >
        Whitepaper
      </a>
      {/*<button*/}
      {/*  className={cn('dao-lnb-outline-button')}*/}
      {/*  type="button"*/}
      {/*  onClick={(e) => {*/}
      {/*    e.stopPropagation();*/}
      {/*    message.info({ content: t('prepareService2', { ns: 'common' }), key: 'toast' });*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Whitepaper*/}
      {/*</button>*/}
      {/* 23.04.11 수정 end: 준비중 버튼으로 임의교체 */}
      <div className={cn('external-link-wrap')}>
        {/* 23.03.30 수정: 텔레그램 -> 디스코드로 변경 */}
        {/*<Link href="https://discord.com/channels/1083269128053346316/1084726657975324782">*/}
        <Link href="https://discord.com/invite/78wzkvrsbj">
          <a target="_blank" title={t('blank')} rel="noopener noreferrer">
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_discord_lnb.svg" />
            <span>Discord</span>
          </a>
        </Link>
        {/* 23.04.11 수정 start: toast 팝업 기능 추가 */}
        <a
          target="_blank"
          title={t('blank')}
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            message.info({ content: t('prepareService', { ns: 'common' }), key: 'toast' });
          }}
        >
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_union.svg" />
          <span>PAPYRUS</span>
        </a>
        {/* 23.04.11 수정 end: toast 팝업 기능 추가 */}
      </div>
    </div>
  );
};

export default DaoLnb;
