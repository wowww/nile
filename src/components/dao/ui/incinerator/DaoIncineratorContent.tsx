import cn from 'classnames';
import IncineratorGraph from '@/components/dao/ui/incinerator/contents/IncineratorGraph';
import IncineratorActivity from '@/components/dao/ui/incinerator/contents/IncineratorActivity';
import { DaoBoxTitle, DaoTableLayout, DaoTableTitle } from '@/components/dao/ui/DaoBoxLayout';
/* 23.03.02 수정: ImgDaoIncinerator 삭제 */
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
import OutlineButton from '@/components/button/OutlineButton';

export const DaoTreasuryContent = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <div className={cn('dao-individual-content-wrap')}>
      <DaoBoxTitle title={t('incinerator.title')} desc={t('incinerator.desc', { type: useDaoCharacterConvert(activeDao.value) })} type="img">
        <div className={cn('img-wrap')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_dao_incinerator.svg" />
        </div>
      </DaoBoxTitle>
      <IncineratorGraph />
      <DaoTableLayout>
        {/* 23.03.02 수정: 타이틀 수정 */}
        {/* 23.03.31 수정: 타이틀 수정 */}
        <DaoTableTitle title="Burnt Transactions" />
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
        <IncineratorActivity />
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
