import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NeithUpcoming } from '@/components/neithstation/NeithUpcoming';
import { NeithVaultTitle } from '@/components/neithstation/NeithVaultTitle';
import { NeithVaultAltar } from '@/components/neithstation/NeithVaultAltar';

const NeithStationVault = () => {
  return (
    <>
      <Helmet>
        <title>NEITH Station &gt; NILE</title>
      </Helmet>
      <div className={cn('neith-station-vault-wrap')}>
        <NeithVaultTitle />
        <NeithVaultAltar />
        <NeithUpcoming />
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'neithStation'])),
    },
  };
};

export default NeithStationVault;
