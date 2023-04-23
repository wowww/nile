import { useState, useEffect, ReactElement } from 'react';
import cn from 'classnames';
import { useTranslation, Trans } from 'next-i18next';
import AgendaHistoryItem from '@/components/dao/ui/governance/AgendaHistoryItem';

interface Props {}

const AgendaHistoryList = ({}: Props): ReactElement => {
  const { t } = useTranslation('dao');

  return (
    <div className={cn('governance-agenda-history-wrap')}>
      {/* 23.03.30 수정: 타이틀 다국어 적용 */}
      <strong className={cn('wrap-title')}>{t('governance.agendaHistoryItem.title')}</strong>
      <ul className={cn('governance-agenda-history-list')}>
        <AgendaHistoryItem
          step="Temperature Check"
          agendaType={t('governance.agenda.item1')}
          title="Should the community participate in the Protocol Guild Pilot? It is a long Should the community participate in the Protocol Guild Pilot? It is a longShould the community participate in the Protocol Guild Pilot? It is a long"
          votingPeriod={{
            start: '2022-07-01',
            end: '2022-07-07',
          }}
          info={
            <Trans
              i18nKey={'governance.agendaHistoryItem.text.2'}
              ns="dao"
              values={{
                percentage: 60,
                step: 'Consensus Check',
              }}
            >
              <span className={cn('bold')}></span>
              <span className={cn('bold')}></span>
            </Trans>
          }
          date="2023-01-01"
        />
        <AgendaHistoryItem
          step="Temperature Check"
          agendaType={t('governance.agenda.item.1')}
          title="Should the community participate in the Protocol Guild Pilot? It is a long"
          votingPeriod={{
            start: '2022-07-01',
            end: '2022-07-07',
          }}
          info={
            <Trans
              i18nKey={'governance.agendaHistoryItem.text.1'}
              ns="dao"
              values={{
                percentage: 60,
                step: 'Governance Check',
              }}
            >
              <span className={cn('bold')}></span>
              <span className={cn('bold')}></span>
            </Trans>
          }
          date="2023-01-01"
        />
      </ul>
    </div>
  );
};

export default AgendaHistoryList;
