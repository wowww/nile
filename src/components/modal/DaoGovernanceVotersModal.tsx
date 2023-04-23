import { useState, useEffect, ReactElement } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import ProposalVoters from '../dao/ui/governance/ProposalVoters';
import FilterVoters from '@/components/dao/ui/governance/filterVoters';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import PaginationCustom from '../button/PaginationCustom';
import { VoterTableItemType } from '../dao/ui/governance/ProposalVoters';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: VoterTableItemType[];
}

const ChipList = [
  {
    name: 'Temperature Check',
    value: 'temperature',
  },
  {
    name: 'Consensus Check',
    value: 'consensus',
  },
  {
    name: 'Governance Check',
    value: 'governance',
  },
];

const DaoGovernanceVotersModal = ({ isOpen, setIsOpen, data }: Props): ReactElement => {
  const { t } = useTranslation('dao');

  const activeDao = useAtomValue(daoThemeAtom);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <ModalLayout
      wrapClassName="dao-governance-voters-modal"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="lg"
      title={t('governance.proposal.voterTable.voters')}
      destroyOnClose={true}
    >
      <FilterVoters />
      <ProposalVoters type="popup" voteUnit={t(`amountUnit.${activeDao.value}.unit2`)} data={data} />
      <PaginationCustom
        defaultCurrent={currentPage}
        defaultPageSize={9}
        current={currentPage}
        total={100}
        onChange={onPageChange}
        activate={currentPage}
      />
    </ModalLayout>
  );
};

export default DaoGovernanceVotersModal;
