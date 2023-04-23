import React, { useEffect, useMemo } from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAtomValue, useSetAtom } from 'jotai';
import { daoSelectedMenu, daoThemeAtom } from '@/state/daoAtom';
import DaoLayout from '@/components/dao/DaoLayout';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';
import BgButton from '@components/button/BgButton';
import { useLayoutResize } from '@utils/layout';
import { Tabs, TabsProps } from 'antd';
import ParticipateInfo from '@components/dao/preview/ParticipateInfo';
import RecruitingParticipantProcedure from '@components/dao/preview/RecruitingParticipantProcedure';
import DistributionMethod from '@components/dao/preview/DistributionMethod';
import OperationProtocol from '@components/dao/preview/OperationProtocol';
import OperationToken from '@components/dao/preview/OperationToken';
import OperationTokenomics from '@components/dao/preview/OperationTokenomics';

const DaoRecruiting = () => {
  const { t, i18n } = useTranslation(['dao', 'common']);
  const activeDao = useAtomValue(daoThemeAtom);
  const setDaoSelectedMenu = useSetAtom(daoSelectedMenu);
  const nileWallet = useAtomValue(nileWalletAtom);
  const { isMobile } = useLayoutResize();

  useEffect(() => {
    setDaoSelectedMenu('Station');
  }, [nileWallet]);

  const tabs: TabsProps['items'] = useMemo(() => {
    return [
      {
        label: t('station.recruiting.tabs.button.0'),
        key: 'participate-method',
        children: (
          <div className={cn('station-tab-content')}>
            <div className={cn('tab-content-title')}>
              <strong className={cn('title')}>{t('station.recruiting.tabs.title.0', { type: useDaoCharacterConvert(activeDao.value) })}</strong>
            </div>
            <ParticipateInfo />
            <RecruitingParticipantProcedure />
            <div className={cn('station-tab-content-section')}>
              <DistributionMethod />
            </div>
          </div>
        ),
      },
      {
        label: t('station.recruiting.tabs.button.1'),
        key: 'operation-method',
        children: (
          <div className={cn('station-tab-content')}>
            <div className={cn('tab-content-title')}>
              <strong className={cn('title')}>{t('station.recruiting.tabs.title.1', { type: useDaoCharacterConvert(activeDao.value) })}</strong>
            </div>
            <OperationProtocol />
            <OperationToken />
            <OperationTokenomics />
          </div>
        ),
      },
    ];
  }, [t]);

  return (
    <>
      <Helmet>
        <title>Station &gt; DAO &gt; NILE</title>
        <body className={cn(`${activeDao.value}-wrap`, 'dao-wrap', 'has-floating', `dao-recruiting`)} />
      </Helmet>
      <div className={cn('recruiting-wrap')}>
        <DaoLayout activate="menu-station">
          <div className={cn(`dao-recruit-condition-wrap recruited`)}>
            <div className={cn('condition-title-wrap')}>
              <div className={cn('text-wrap')}>
                <strong className={cn('protocol-name')}>Station</strong>
                <p className={cn('protocol-desc')}>
                  {t('station.recruitCondition.desc', {
                    ns: 'dao',
                    type: useDaoCharacterConvert(activeDao.value),
                  })}
                </p>
                <p className={cn('protocol-sub-desc')}>{t('station.recruitCondition.subDesc')}</p>
                <div className={cn('img-wrap')}>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_station.svg" />
                </div>
              </div>
            </div>
            <div className={cn('condition-card-wrap')}>
              <div className={cn('top-wrap')}>
                <strong className={cn('condition-main-title')}>
                  {t('recruitmentCard.start', {
                    ns: 'common',
                    date: i18n.language === 'ko' ? '2023년 4월 14일' : '2023-04-14',
                  })}
                </strong>
                <p className={cn('condition-sub-title')}>{t('recruitmentCard.notice', { ns: 'common' })}</p>
              </div>

              <div className={cn('bottom-wrap')}>
                <div className={cn('recruitment-card-wrap notice')}>
                  <div className={cn('progress-type reward-wrap')} style={{ '--goal': '0%' } as React.CSSProperties}>
                    <p className={cn('notice')}>{t('station.recruitCondition.condition.status.recruited.notice', { ns: 'dao' })}</p>
                    <span className={cn('progress-line goal-line')}>
                      <span
                        className={cn('progress-rate')}
                        style={{
                          width: '0%',
                        }}
                      />
                      <span
                        className={cn('progress-goal')}
                        style={
                          {
                            '--goal': '100%',
                          } as React.CSSProperties
                        }
                      >
                        <span className={cn('img-goal')}>
                          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_station_goal.svg" />
                        </span>
                        <span className={cn('target-goal right')}>1,700,010 WEMIX</span>
                      </span>
                    </span>
                    <p className={cn('chart-field-wrap')}>
                      <span className={cn('counting')}>
                        <span className={cn('number')}>0</span>
                        {i18n.language === 'ko' ? '명' : 'Member'}
                      </span>
                    </p>
                  </div>
                </div>
                <div className={cn('btn-wrap')}>
                  {/* 23.04.19 수정: 버튼 사이즈 변경 */}
                  <BgButton buttonText="Station Opens Soon" color="white" size="lg" disabled block />
                </div>
              </div>
            </div>
          </div>
          <div className={cn('station-sticky-tab-wrap dao-sticky-tab-wrap')} id="station-sticky-tab-wrap">
            <Tabs items={tabs} className={cn('station-sticky-tab dao-sticky-tab')} id="station-sticky-tab" />
          </div>
        </DaoLayout>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'daoHome', 'dao'])),
    },
  };
};

export default DaoRecruiting;
