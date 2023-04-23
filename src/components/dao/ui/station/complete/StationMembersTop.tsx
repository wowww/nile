import cn from 'classnames';
import { useTranslation } from 'next-i18next';

interface membersType {
  all: number | string;
  governance: number | string;
  vote?: number | string;
  proposal?: number | string;
}

const StationMembersTop = ({ all, governance, vote, proposal }: membersType) => {
  const { t } = useTranslation('dao');
  return (
    <div className={cn('station-members-table-contain')}>
      <ul className={cn('members-wrap')}>
        <li>
          <span>{t('station.stationMembersTop.members')}</span>
          <strong>{all}</strong>
        </li>
        <li>
          <span>{t('station.stationMembersTop.governance')}</span>
          <strong>{governance}</strong>
        </li>
        <li>
          <span>{t('station.stationMembersTop.voters')}</span>
          {/* 23.03.01 수정: 거버넌스 오픈전 하이픈 표기 */}
          <strong>{vote ? vote : '-'}</strong>
        </li>
        <li>
          <span>{t('station.stationMembersTop.proposal')}</span>
          {/* 23.03.01 수정: 거버넌스 오픈전 하이픈 표기 */}
          <strong>{proposal ? proposal : '-'}</strong>
        </li>
      </ul>
    </div>
  );
};

export default StationMembersTop;
