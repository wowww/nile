import cn from 'classnames';
import DaoLayout from '@/components/dao/DaoLayout';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAtomValue } from 'jotai';
import { daoThemeAtom, daoSelectedMenu } from '@/state/daoAtom';
import ScanTransaction, { dataType } from '@/components/dao/scan/ScanTransaction';
import { useSetAtom } from 'jotai';
import { DaoBoxTitle } from '@/components/dao/DaoBoxLayout';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useTranslation } from 'next-i18next';
import ScanTableArea from '@/components/dao/scan/ScanTableArea';
import { useEffect } from 'react';

const DaoScan = () => {
  const { t } = useTranslation('dao');
  // 개별 다오 컬러 커스텀을 위한 전역 변수 : default 'wonder' 원더다오
  const activeDao = useAtomValue(daoThemeAtom);
  const setDaoSelectedMenu = useSetAtom(daoSelectedMenu);

  useEffect(() => {
    setDaoSelectedMenu('WONDER Scan');
  }, []);

  return (
    <>
      <Helmet>
        <title>Scan &gt; DAO &gt; NILE</title>
        <body className={cn(`${activeDao.value}-wrap`, 'dao-wrap')} />
      </Helmet>
      <DaoLayout activate="menu-wonderscan">
        <DaoBoxTitle
          title={t('scan.title', { type: useDaoCharacterConvert(activeDao.value) })}
          desc={t('scan.desc', { type: useDaoCharacterConvert(activeDao.value) })}
        />
        <ScanTransaction />
        <ScanTableArea />
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

export default DaoScan;
