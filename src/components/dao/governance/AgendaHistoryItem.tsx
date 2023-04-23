import { ReactElement } from 'react';
import cn from 'classnames';
import { I18n, useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { useCharacterFirstUppercase } from '@/hook/useCharacterConverter';
import Chip from '@/components/tag/Chip';
import Link from 'next/link';

interface Props {
  step: 'Consensus Check' | 'Temperature Check' | 'Governance Check';
  agendaType: string;
  title: string;
  votingPeriod: {
    start: string;
    end: string;
  };
  info: ReactElement;
  date: string;
}

const AgendaHistoryItem = ({ step, agendaType, title, votingPeriod, info, date }: Props): ReactElement => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <li className={cn('agenda-history-item')}>
      <Link href={`/dao/${activeDao.value}/governance/check`}>
        <a className={cn('history-item-link')}>
          <div className={cn('item-header')}>
            <Chip size="sm">
              <strong>{step}</strong>
            </Chip>
          </div>
          <div className={cn('item-body')}>
            <span className={cn('info')}>{agendaType}</span>
            <div className={cn('title-area')}>
              <strong className={cn('item-title')}>{title}</strong>
              <button>
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
              </button>
            </div>
            <span className={cn('vote-term')}>
              <span className={cn('name')}>{t(`governance.agendaHistoryItem.${step === 'Temperature Check' ? 'partiPeriod' : 'votingPeriod'}`)}</span>
              <span className={cn('date')}>
                {votingPeriod.start} ~ {votingPeriod.end}
              </span>
            </span>
          </div>
        </a>
      </Link>
      <div className={cn('item-bottom')}>
        <>
          {info} <span className={cn('date')}>({date})</span>
        </>
      </div>
    </li>
  );
};

export default AgendaHistoryItem;
