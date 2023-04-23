import cn from 'classnames';
import TextButton from '@/components/button/TextButton';
import { useTranslation } from 'next-i18next';
import ItemArea from '../../StationCheckMore/ItemArea';
import BgButton from '@/components/button/BgButton';
import OutlineButton from '@/components/button/OutlineButton';
import { windowResizeAtom } from '@/state/windowAtom';
import { useAtomValue } from 'jotai';

interface Props {
  status: 'beforeParticipate' | 'afterParticipate' | 'closeRecruit';
}

const AdditionalRecruit = ({ status }: Props) => {
  const { t } = useTranslation(['dao', 'daoHome']);
  const offset = useAtomValue(windowResizeAtom);
  const tooltipPosition = offset.width > 767 ? 'left' : 'top';

  const ItemAreaProps = {
    ...(status === 'closeRecruit' ? { isEnd: true } : { ongoing: true }),
    chartData: {
      goalNum: 1500010,
      currentNum: 1950000,
      participateNum: 128,
    },
    station: true,
    ongoing: false,
  };

  console.log(ItemAreaProps);

  const buttonRenderer = () => {
    if (status === 'closeRecruit') {
      return (
        <BgButton
          buttonText={t('check.about.btn.btn.1', { ns: 'daoHome' })}
          color="highlight"
          hasTooltip
          tooltipPlace={'left'}
          disabled
          tooltipClassName={'dao-station-check-more-tooltip end'}
          tooltipHtml={t('check.about.btn.tooltip.1', { ns: 'daoHome' })}
          size="md"
        />
      );
    } else if (status === 'afterParticipate') {
      return (
        <>
          <BgButton
            buttonText={t('check.about.after.btn1', { ns: 'daoHome' })}
            color="highlight"
            hasTooltip
            tooltipPlace={tooltipPosition}
            tooltipClassName={'dao-station-check-more-tooltip end'}
            tooltipHtml={t('check.about.after.tooltip', { ns: 'daoHome' })}
            size="md"
          />
          <OutlineButton buttonText={t('check.about.after.btn2', { ns: 'daoHome' })} size="md" color="highlight" />
        </>
      );
    } else {
      return (
        <BgButton
          buttonText={t('check.about.before.btn1', { ns: 'daoHome' })}
          color="highlight"
          hasTooltip
          tooltipPlace={'left'}
          tooltipClassName={'dao-station-check-more-tooltip end'}
          tooltipHtml={t('check.about.before.additionalTooltip', { ns: 'daoHome' })}
          size="md"
        />
      );
    }
  };

  return (
    <div className={cn('additional-recruit-wrap')}>
      <div className={cn('additional-recruit-header')}>
        <div className={cn('left')}>
          <strong className={cn('station-section-title')}>
            {t('station.complete.additional.title')}
            {t('station.complete.additional.key', { count: 1, ordinal: true })}
          </strong>
          <p className={cn('desc')}>{t('station.complete.additional.desc')}</p>
        </div>
        <div className={cn('right')}>
          <TextButton buttonText={t('check.about.btn1', { ns: 'daoHome' })} iconValue="line-arrow" gapSpacing="lg" size="md" type="link" href="/" />
        </div>
      </div>
      <ItemArea {...ItemAreaProps} />
      <div className={cn('btn-area')}>{buttonRenderer()}</div>
    </div>
  );
};

export default AdditionalRecruit;
