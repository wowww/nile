import { DaoBoxTitle } from '@/components/dao/DaoBoxLayout';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';
/* 23.04.10 수정 start: useDaoCharacterConvert, useAtomValue, daoThemeAtom 추가 */
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
/* 23.04.10 수정 end: useDaoCharacterConvert, useAtomValue, daoThemeAtom 추가 */

const StationCompleteTop = () => {
  const { t } = useTranslation('dao');
  /* 23.04.10 수정: activeDao 추가 */
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    /* 23.04.10 수정: 다국어 표현 수정 */
    <DaoBoxTitle
      title={t('station.complete.title')}
      desc={t('station.complete.desc', { type: useDaoCharacterConvert(activeDao.value), unit: t(`amountUnit.${activeDao.value}.unit1`) })}
      type="img"
    >
      <div className={cn('img-wrap')}>
        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_station.svg" />
      </div>
    </DaoBoxTitle>
  );
};

export default StationCompleteTop;
