import BgButton from '@/components/button/BgButton';
import TextButton from '@/components/button/TextButton';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import DaoGovernanceStatus, { membersDataType, statusType } from '@/components/dao/ui/governance/DaoGovernanceStatus';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import useMediaQuery from '@/hook/useMediaQuery';

const DaoGovernanceHowItWorksModal = dynamic(() => import('@/components/modal/DaoGovernanceHowItWorksModal'), { ssr: false });

const DaoGovernanceStatusBoard = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1023px)');

  const membersData: membersDataType = {
    title: t('governance.governanceMember'),
    volume: 1251,
    userImage: ['https://picsum.photos/32/32/?image=1', 'https://picsum.photos/32/32/?image=1', 'https://picsum.photos/32/32/?image=1'],
  };
  const statusData: statusType = [
    {
      title: t('governance.statusData.1'),
      volume: 120,
    },
    {
      title: t('governance.statusData.2'),
      volume: 80,
    },
    {
      title: t('governance.statusData.3'),
      volume: 100,
    },
    {
      title: t('governance.statusData.4'),
      volume: 1234,
    },
  ];
  return (
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
          <BgButton buttonText={t('governance.proposalWriteBtn')} color="highlight" size="xl" href={`/dao/ui/${activeDao.value}/governance/create`} />
        )}
      </div>
      {/* 23.03.27 수정: status 컴포넌트 복구 */}
      <DaoGovernanceStatus
        statusData={statusData}
        membersData={{
          title: membersData.title,
          volume: membersData.volume,
          userImage: membersData.userImage,
        }}
      />
    </div>
  );
};

export default DaoGovernanceStatusBoard;
