import {useCallback, useState} from 'react';
import cn from 'classnames';
import { Tabs } from 'antd';

import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { AgendaType } from '@/types/dao/proposal.types';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });
const TreasuryMoneyUse = dynamic(() => import('@/components/dao/governance/agendaRegister/TreasuryMoneyUse'));
const DaoRatioEdit = dynamic(() => import('@/components/dao/governance/agendaRegister/DaoRatioEdit'));
const WonderRatioEdit = dynamic(() => import('@/components/dao/governance/agendaRegister/WonderRatioEdit'));
const GovernanceSetting = dynamic(() => import('@/components/dao/governance/agendaRegister/GovernanceSetting'));
const TreasuryTokenEdit = dynamic(() => import('@/components/dao/governance/agendaRegister/TreasuryTokenEdit'));
const StationReOpen = dynamic(() => import('@/components/dao/governance/agendaRegister/StationReOpen'));
const TrustCheckSetting = dynamic(() => import('@/components/dao/governance/agendaRegister/TrustCheckSetting'));
const EtcAgenda = dynamic(() => import('@/components/dao/governance/agendaRegister/EtcAgenda'));

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentType?: AgendaType;
  setCurrentType?: (type: AgendaType) => void;
}

const DaoAgendaRegisterModal = ({ isOpen, setIsOpen, currentType, setCurrentType }: Props) => {
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const [hasTrustAddress, setHasTrustAddress] = useState(false);

  const confirm = useCallback((type: AgendaType) => {
    setCurrentType?.(type);
    setIsOpen(false);
  }, [])

  return (
    <ModalLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="lg"
      title={
        <div className={cn('headline-wrap')}>
          <div className={cn('headline')}>
            {hasTrustAddress && <span className={cn('label')}>Trust Check</span>}
            <strong className={cn('title')}>{t('agenda.modalTitle')}</strong>
          </div>
          <p className={cn('desc')}>{t('agenda.modalDesc')}</p>
        </div>
      }
      footer={false}
      destroyOnClose={true}
      wrapClassName="dao-agenda-register-modal"
      className="title-line"
    >
      <div className={cn('')}>
        <Tabs
          defaultActiveKey={currentType}
          tabPosition="left"
          style={{ height: 642 }}
          items={[
            {
              label: t('agenda.item.1'),
              key: `0`,
              disabled: false,
              children: <TreasuryMoneyUse onConfirm={() => confirm(AgendaType.TREASURY)} />,
            },
            {
              label: t('agenda.item.2'),
              key: `1`,
              disabled: false,
              children: <DaoRatioEdit onConfirm={() => confirm(AgendaType.REVENUE)} />,
            },
            {
              label: t('agenda.item.3'),
              key: `2`,
              disabled: false,
              children: <WonderRatioEdit onConfirm={() => confirm(AgendaType.DISTRIBUTION)} />,
            },
            {
              label: t('agenda.item.4'),
              key: `3`,
              disabled: false,
              children: <GovernanceSetting onConfirm={() => confirm(AgendaType.GOVERNANCE)} />,
            },
            {
              label: t('agenda.item.5'),
              key: `4`,
              disabled: false,
              children: <TreasuryTokenEdit onConfirm={() => confirm(AgendaType.SWAP)} />,
            },
            {
              label: t('agenda.item.6'),
              key: `5`,
              disabled: false,
              children: <StationReOpen onConfirm={() => confirm(AgendaType.REOPEN)} />,
            },
            {
              label: t('agenda.item.7'),
              key: `6`,
              disabled: false,
              children: <TrustCheckSetting onConfirm={() => confirm(AgendaType.TRUST_CHECK)} />,
            },
            {
              label: t('agenda.item.8'),
              key: `7`,
              disabled: false,
              children: <EtcAgenda onConfirm={() => confirm(AgendaType.ETC)} />,
            },
          ]}
        />
      </div>
    </ModalLayout>
  );
};

export default DaoAgendaRegisterModal;
