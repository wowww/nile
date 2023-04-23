import cn from 'classnames';
import TreasuryGraph from '@/components/dao/ui/treasury/contents/TreasuryGraph';
import TreasuryInformation from '@/components/dao/ui/treasury/contents/TreasuryInformation';
import DaoActivity from '@/components/dao/ui/DaoActivity';
import { DaoBoxTitle, DaoTableLayout, DaoTableTitle } from '@/components/dao/ui/DaoBoxLayout';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
/* 23.03.02 수정 start: useDaoCharacterConvert, useAtomValue, daoThemeAtom, OutlineButton 추가 */
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import OutlineButton from '@/components/button/OutlineButton';

export const DaoTreasuryContent = () => {
  const { t } = useTranslation('dao');
  /* 23.03.02 수정: activeDao 추가 */
  const activeDao = useAtomValue(daoThemeAtom);
  return (
    <div className={cn('dao-individual-content-wrap')}>
      <DaoBoxTitle title={t('treasury.title')} desc={t('treasury.desc')} type="img">
        <div className={cn('img-wrap')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_treasury.svg" />
        </div>
      </DaoBoxTitle>
      <TreasuryGraph />

      <DaoTableLayout>
        <DaoTableTitle title={t('treasury.information.title')} />
        <TreasuryInformation />
      </DaoTableLayout>
      <DaoTableLayout>
        {/* 23.04.06 수정: 타이틀 수정 */}
        {/* 23.03.02 수정: 타이틀 수정 */}
        <DaoTableTitle title="Operation Transactions" />
        {/* 23.03.02 수정 start: wonder scan button 추가 */}
        <div className={cn('more-btn-st-wrap')}>
          <OutlineButton
            buttonText={`${useDaoCharacterConvert(activeDao.value) as string} Scan`}
            color="gray"
            size="sm"
            iconType={true}
            iconValue="line-arrow"
            align={true}
            href={'/wonderscan'}
          />
        </div>
        {/* 23.03.02 수정 end: wonder scan button 추가 */}
        <DaoActivity />
      </DaoTableLayout>
      {/* 23.03.30 수정: 모바일에서 버튼 위치 수정 */}
      {/* 23.03.21 수정: 모바일 더보기 레이아웃 분기 디자인 변경 */}
      <div className={cn('mobile-scan-btn')}>
        <div className={cn('more-btn-st-wrap')}>
          <OutlineButton
            buttonText={`${useDaoCharacterConvert(activeDao.value) as string} Scan`}
            color="gray"
            size="sm"
            iconType={true}
            iconValue="line-arrow"
            align={true}
            href={'/wonderscan'}
          />
        </div>
      </div>
    </div>
  );
};

export default DaoTreasuryContent;
