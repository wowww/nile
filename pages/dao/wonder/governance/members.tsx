import cn from 'classnames';
import DaoLayout from '@/components/dao/DaoLayout';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MembersTable from '@components/dao/governance/MembersTable';
import { useAtomValue } from 'jotai';
import { daoSelectedMenu, daoThemeAtom } from '@/state/daoAtom';
import { useSetAtom } from 'jotai';

const Governance = () => {
  const activeDao = useAtomValue(daoThemeAtom);

  const setDaoSelectedMenu = useSetAtom(daoSelectedMenu);
  setDaoSelectedMenu('Governance');

  return (
    <>
      <Helmet>
        <title>DAO &gt; Nile</title>
        <body className={cn(`${activeDao.value}-wrap`, 'dao-wrap')} />
      </Helmet>
      <div className={cn('governance-members-page-wrap')}>
        <DaoLayout activate="menu-governance">
          <MembersTable />
        </DaoLayout>
      </div>
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

export default Governance;
