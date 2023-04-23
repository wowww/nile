import cn from 'classnames';
import { daoSelectedMenu, daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue, useSetAtom } from 'jotai';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Helmet } from 'react-helmet-async';

import DaoLayout from '@/components/dao/DaoLayout';
import { useEffect, useState } from 'react';
import { useWonder } from '@/hook/useWonder';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import {
  refreshWonderDaoStakingPoolSwapAmountAtom,
  refreshWonderDaoStakingPoolUserInfoAtom,
  refreshWonderObeliskBalanceAtom,
} from '@/state/obeliskAtom';
import { DaoBox, DaoBoxLayout, DaoBoxTitle, DaoTableLayout, DaoTableTitle } from '@components/dao/DaoBoxLayout';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import DaoChartArea from '@components/dao/DaoChartArea';
import MyTokens from '@components/dao/staking/MyTokens';
import DaoStakingReport from '@components/dao/staking/DaoStakingReport';
import OutlineButton from '@components/button/OutlineButton';
import DaoComponentActivity from '@components/dao/DaoComponentActivity';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import { DaoActivity } from '@/types/dao/dao.types';
import { NileApiService } from '@/services/nile/api';

const DaoObelisk = () => {
  const { t } = useTranslation('dao');
  const { wonderDao, refreshWonderDao } = useWonder();

  const api = NileApiService();

  const activeDao = useAtomValue(daoThemeAtom);
  const nileWallet = useAtomValue(nileWalletAtom);

  const setDaoSelectedMenu = useSetAtom(daoSelectedMenu);
  const refreshWonderDaoStakingPoolUserInfo = useSetAtom(refreshWonderDaoStakingPoolUserInfoAtom);
  const refreshWonderDaoStakingPoolSwapAmount = useSetAtom(refreshWonderDaoStakingPoolSwapAmountAtom);
  const refreshWonderObeliskBalance = useSetAtom(refreshWonderObeliskBalanceAtom);

  const [activites, setActivities] = useState<DaoActivity[]>();

  useEffect(() => {
    api.dao.activity.obelisk
      .getList()
      .then((data) => setActivities(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setDaoSelectedMenu('Obelisk');
  }, []);

  useEffect(() => {
    if (wonderDao?.daoId && nileWallet) {
      refreshWonderObeliskBalance();
      refreshWonderDaoStakingPoolUserInfo();
    }
    refreshWonderDaoStakingPoolSwapAmount();
  }, [wonderDao, nileWallet]);

  useEffect(() => {
    if (!wonderDao) {
      refreshWonderDao();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Obelisk &gt; DAO &gt; NILE</title>
        <body className={cn(`${activeDao.value}-wrap`, 'dao-wrap')} />
      </Helmet>
      <DaoLayout activate="menu-obelisk">
        <div className={cn('dao-staking-wrap')}>
          <DaoBoxTitle
            title={t('stakingPool.title')}
            desc={t('stakingPool.desc', {
              dtName: useDaoCharacterConvert(activeDao.value),
              dtUnit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
              gtName: `g.${useDaoCharacterConvert(activeDao.value)}`,
              gtUnit: t('unit2', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
            })}
            type="img"
          >
            <div className={cn('img-wrap')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_stakingpool.svg" />
            </div>
          </DaoBoxTitle>
          <DaoBoxLayout className="ratio">
            <DaoBox>
              <DaoChartArea
                areaType="obelisk"
                title={t('stakingPool.chart.name', { token: useDaoCharacterConvert(activeDao.value) })}
                figure={0}
                date="2022-07-22 03:30"
              />
            </DaoBox>
            <DaoBox className={cn('dao-common-card', 'obelisk')}>
              <MyTokens />
            </DaoBox>
          </DaoBoxLayout>
          <DaoBoxLayout>
            <DaoBox className={cn('obelisk-horizontal')}>
              <DaoStakingReport />
            </DaoBox>
          </DaoBoxLayout>

          <DaoTableLayout>
            <div className={cn('staking-table-area')}>
              <DaoTableTitle title="Transactions" />
              <div className={cn('more-btn-st-wrap')}>
                <OutlineButton
                  buttonText={`${useDaoCharacterConvert(activeDao.value) as string} Scan`}
                  color="gray"
                  size="sm"
                  iconType
                  iconValue="line-arrow"
                  align
                  href="/dao/wonder/wonderscan"
                />
              </div>
              <DaoComponentActivity activities={activites} />
            </div>
          </DaoTableLayout>

          <div className={cn('mobile-scan-btn')}>
            <div className={cn('more-btn-st-wrap')}>
              <OutlineButton
                buttonText={`${useDaoCharacterConvert(activeDao.value) as string} Scan`}
                color="gray"
                size="sm"
                iconType
                iconValue="line-arrow"
                align
                href="/dao/wonder/wonderscan"
              />
            </div>
          </div>
        </div>
      </DaoLayout>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'dao'])),
    },
  };
};

export default DaoObelisk;
