import cn from 'classnames';
import DaoLayout from '@components/dao/DaoLayout';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAtomValue } from 'jotai';
import { daoSelectedMenu, daoThemeAtom } from '@/state/daoAtom';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { DaoBox, DaoBoxLayout, DaoBoxTitle } from '@components/dao/DaoBoxLayout';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { ReactSVG } from 'react-svg';
import DaoTrustReport from '@components/dao/trust/DaoTrustReport';
import DaoTrustContent from '@components/dao/trust/DaoTrustContent';
import { useTranslation } from 'next-i18next';
import DaoChartArea from '@components/dao/DaoChartArea';

const DaoTrust = () => {
  const { t } = useTranslation('dao');

  const activeDao = useAtomValue(daoThemeAtom);
  const setDaoSelectedMenu = useSetAtom(daoSelectedMenu);

  useEffect(() => {
    setDaoSelectedMenu('Trust');
  }, []);
  return (
    <>
      <Helmet>
        <title>Trust &gt; DAO &gt; NILE</title>
        <body className={cn(`${activeDao.value}-wrap`, 'dao-wrap')} />
      </Helmet>
      <DaoLayout activate="menu-trust">
        <div className={cn('dao-trust-wrap')}>
          <DaoBoxTitle title={t('trust.title')} desc={t('trust.desc', { type: useDaoCharacterConvert(activeDao.value) })} type="img">
            <div className={cn('img-wrap')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_trust.svg" />
            </div>
          </DaoBoxTitle>
          <DaoBoxLayout className="ratio">
            <DaoBox>
              <DaoChartArea areaType="trust" title={t('trust.graphTitle')} figure={0.0} date="0000-00-00 00:00" />
            </DaoBox>
            <DaoBox className="dao-common-card trust-report">
              <DaoTrustReport />
            </DaoBox>
          </DaoBoxLayout>
          <DaoTrustContent />
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

export default DaoTrust;
