import cn from 'classnames';
import DaoLayout from '@/components/dao/DaoLayout';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAtomValue, useSetAtom } from 'jotai';
import { daoSelectedMenu, daoThemeAtom } from '@/state/daoAtom';
import { DaoBoxTitle } from '@components/dao/DaoBoxLayout';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { ReactSVG } from 'react-svg';
import TrustCheckSlide from '@components/dao/governance/TrustCheckSlide';
import GovernanceTab from '@components/dao/governance/contents/GovernanceTab';
import { useTranslation } from 'next-i18next';
import BgButton from '@components/button/BgButton';
import TextButton from '@components/button/TextButton';
import DaoGovernanceStatus, { membersDataType, statusType } from '@components/dao/governance/DaoGovernanceStatus';
import { useEffect, useState } from 'react';
import { useLayoutResize } from '@utils/layout';
import dynamic from 'next/dynamic';
import { useWonder } from '@/hook/useWonder';
import { provider } from '@/state/nileWalletAtom';
import { daoAbis, daoJsonAbiAddress } from '@/web3/abis/dao';

const DaoGovernanceHowItWorksModal = dynamic(() => import('@/components/modal/DaoGovernanceHowItWorksModal'), { ssr: false });

const Governance = () => {
  const { t } = useTranslation('dao');

  const activeDao = useAtomValue(daoThemeAtom);
  const { wonderDao, wonderProposals, refreshWonderDao, refreshWonderProposals } = useWonder();

  const setDaoSelectedMenu = useSetAtom(daoSelectedMenu);
  setDaoSelectedMenu('Governance');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isMobile, isTablet } = useLayoutResize();

  useEffect(() => {
    if (!wonderDao) {
      refreshWonderDao();
    }
  }, []);

  useEffect(() => {
    if (wonderDao?.daoId) {
      if (!wonderProposals) {
        refreshWonderProposals();
      }
    }
  }, [wonderDao]);

  const getAgendas = async () => {
    const contract = new provider.web3.eth.Contract(daoAbis.Governance, daoJsonAbiAddress().current.GovernanceProxy);
    const agendas = await contract?.methods.getAllAgendas(wonderDao?.daoId).call();
    console.log('all agendas >>> ', agendas);
  };
  useEffect(() => {
    if (wonderDao?.daoId) {
      getAgendas();
    }
    console.log('proposals >>> ', wonderProposals);
  }, [wonderDao]);

  const membersData: membersDataType = {
    title: t('governance.governanceMember'),
    volume: 0,
    userImage: ['https://picsum.photos/32/32/?image=1', 'https://picsum.photos/32/32/?image=1', 'https://picsum.photos/32/32/?image=1'],
  };

  const statusData: statusType = [
    {
      title: t('governance.statusData.1'),
      volume: 0,
    },
    {
      title: t('governance.statusData.2'),
      volume: 0,
    },
    {
      title: t('governance.statusData.3'),
      volume: 0,
    },
    {
      title: t('governance.statusData.4'),
      volume: 0,
    },
  ];

  return (
    <>
      <Helmet>
        <title>DAO &gt; Nile</title>
        <body className={cn(`${activeDao.value}-wrap`, 'dao-wrap')} />
      </Helmet>
      <DaoLayout activate="menu-governance">
        <div className={cn('dao-governance-wrap')}>
          <DaoBoxTitle title={t('governance.title')} desc={t('governance.desc', { type: useDaoCharacterConvert(activeDao.value) })} type="img">
            <div className={cn('img-wrap')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_governance.svg" />
            </div>
          </DaoBoxTitle>
          <div className={cn('dao-governance-status-board')}>
            <div className={cn('btn-wrap')}>
              {!isMobile ? (
                <BgButton
                  buttonText={t('governance.governanceRunBtn')}
                  color="black"
                  size="md"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                />
              ) : (
                <TextButton
                  buttonText={t('governance.governanceRunBtn')}
                  iconValue="line-arrow"
                  gapSpacing="lg"
                  size="md"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                />
              )}
              {isTablet || isMobile ? (
                <span className={cn('tablet-waring')}>*{t('governance.tabletWarning')}</span>
              ) : (
                <BgButton
                  buttonText={t('governance.proposalWriteBtn')}
                  color="highlight"
                  size="xl"
                  href={`/dao/${activeDao.value}/governance/create`}
                />
              )}
            </div>
            <DaoGovernanceStatus
              statusData={statusData}
              membersData={{
                title: membersData.title,
                volume: membersData.volume,
                userImage: membersData.userImage,
              }}
            />
          </div>
          <TrustCheckSlide />
          <GovernanceTab />
        </div>
      </DaoLayout>
      <DaoGovernanceHowItWorksModal isOpen={isOpen} setIsOpen={setIsOpen} />
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
