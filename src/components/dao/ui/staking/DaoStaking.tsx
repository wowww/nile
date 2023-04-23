import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
/* 23.03.02 수정: DaoTableLayout, DaoTableTitle 추가 */
import { DaoBoxTitle, DaoTableLayout, DaoTableTitle } from '@/components/dao/ui/DaoBoxLayout';
import DaoStakingGraph from '@/components/dao/ui/staking/DaoStakingGraph';
import DaoStakingActivity from '@/components/dao/ui/staking/DaoStakingActivity';
/* 23.02.23 수정: useAtomValue, daoThemeAtom, useDaoCharacterConvert 추가 */
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
/* 23.03.02 수정: OutlineButton 컴포넌트 추가 */
import OutlineButton from '@/components/button/OutlineButton';

const DaoStaking = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);
  return (
    <div className={cn('dao-staking-wrap')}>
      <DaoBoxTitle
        title={t('stakingPool.title')}
        desc={t('stakingPool.desc', {
          /* 23.02.23 수정: 23.02.23 수정: WDR 티커 단위 다국어 처리 */
          dtName: useDaoCharacterConvert(activeDao.value),
          dtUnit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
          gtName: `g.${useDaoCharacterConvert(activeDao.value)}`,
          gtUnit: t('unit2', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
        })}
        type="img"
      >
        <div className={cn('img-wrap')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_stakingpool.svg" />
        </div>
      </DaoBoxTitle>
      <DaoStakingGraph />
      {/* 23.03.02 수정 start: DaoTableLayout 추가 */}
      <DaoTableLayout>
        <div className={cn('staking-table-area')}>
          {/* 23.03.02 수정 start: DaoTableTitle 컴포넌트 교체 wonder scan button 추가 */}
          <DaoTableTitle title="Staking Transactions" />
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
          {/* 23.03.02 수정 end: DaoTableTitle 컴포넌트 교체 wonder scan button 추가 */}
          <DaoStakingActivity />
        </div>
      </DaoTableLayout>
      {/* 23.03.02 수정 end: DaoTableLayout 추가 */}

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

export default DaoStaking;
