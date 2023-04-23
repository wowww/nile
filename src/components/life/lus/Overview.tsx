import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import cn from 'classnames';
import { NileCDNLoader } from '@/utils/image/loader';

function Overview() {
  // 22.11.02 수정: useTranslation 추가
  const { t } = useTranslation(['life', 'common']);

  function loopElement(floor: number, times: number) {
    const item: React.ReactElement[] = [];
    for (let i = 0; i < times; i++) {
      for (let j = 1; j <= 13; j++) {
        item.push(
          <div className={cn('overview-item')} key={`${floor} + ${i} + ${j}`}>
            <Image src={`/images/lus/img_life_lus${floor}-${j}.png`} alt={''} layout="fill" quality="100" loading="eager" loader={NileCDNLoader} />
          </div>
        );
      }
    }
    return item;
  }

  return (
    <>
      <div className={cn('overview-wrap')}>
        <div className={cn('overview-text-wrap')}>
          <div className={cn('title-wrap')}>
            <h2 className={cn('title')}>Overview</h2>
            <p className={cn('desc')}>{t('lus.overview.desc')}</p>
          </div>
          <div className={cn('text-wrap')}>
            <p>{t('lus.overview.text1')}</p>
            <p>{t('lus.overview.text2')}</p>
            <p>{t('lus.overview.text3')}</p>
          </div>
        </div>
        <div className={cn('overview-visual-wrap')}>
          <div className={cn('overview-visual', 'floor-1st')}>
            <div className={cn('overview-visual-inner')}>{loopElement(1, 2)}</div>
          </div>
          <div className={cn('overview-visual', 'floor-2nd')}>
            <div className={cn('overview-visual-inner')}>{loopElement(2, 2)}</div>
          </div>
          <div className={cn('overview-visual', 'floor-3rd')}>
            <div className={cn('overview-visual-inner')}>{loopElement(3, 2)}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
