import { useState } from 'react';
import cn from 'classnames';
import { StationMemberType } from './TabMembers';
import { Avatar } from 'antd';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useNumberFormatterToFix } from '@/hook/useNumberFormatter';

interface Props {
  cardData: StationMemberType[];
}

const MembersCardList = ({ cardData }: Props) => {
  const { t } = useTranslation('dao');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <>
      <ul className={cn('station-members-card-view-list')}>
        {cardData.map((el, index) => (
          <li key={`${el.figure.wonder + index}`}>
            {/* <span className={cn('recent-activity-date')}>
              {t('station.complete.card.recent')} {el.recentActivityDate}
            </span> */}
            <Avatar className={cn('user-image')} size={64} style={el.profile.imgUrl !== '' ? { backgroundImage: `url(${el.profile.imgUrl})` } : {}} />
            <span className={cn('user-id')}>{el.profile.userId}</span>
            <p className={cn('user-introduce')}>{el.profile.introduce}</p>
            <div className={cn('info-box')}>
              <dl>
                <dt>{t('station.complete.card.2', { type: useDaoCharacterConvert(activeDao.value) })}</dt>
                <dd>
                  {useNumberFormatterToFix(el.figure.gWonder)}
                  <span className={cn('unit')}>{t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}</span>
                </dd>
              </dl>
            </div>
            <div className={cn('date-area')}>
              <div className={cn('info-row')}>
                <span>{t('station.complete.table.participateDate')}</span>
                <span>{el.participateDate}</span>
              </div>
              <div className={cn('info-row')}>
                <span>{t('station.complete.card.recent')}</span>
                <span>{el.recentActivityDate}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MembersCardList;
