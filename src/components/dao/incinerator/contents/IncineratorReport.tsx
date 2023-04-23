import cn from 'classnames';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { Popover } from 'antd';
import IconInfo from '@images/icon/ico_info.svg';
import { DaoBox } from '@components/dao/DaoBoxLayout';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

const IncineratorReport = () => {
  const { t } = useTranslation('dao', { keyPrefix: 'incinerator' });
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <DaoBox className={cn('dao-common-card', 'treasury')}>
      <h4 className={cn('card-title')}>{t('report.title', { type: useDaoCharacterConvert(activeDao.value) })}</h4>
      <ul className={cn('card-item-list')}>
        <li className={cn('card-item')}>
          <div className={cn('card-notice')}>{t('report.item.1', { type: useDaoCharacterConvert(activeDao.value) })}</div>
          <strong className={cn('card-unit active')}>$0</strong>
        </li>
        <li className={cn('card-item', 'no-border')}>
          <div className={cn('card-notice')}>{t('report.item.2', { type: useDaoCharacterConvert(activeDao.value) })}</div>
          <strong className={cn('card-unit')}>$0</strong>
        </li>
        <li className={cn('card-item', 'no-border')}>
          <div className={cn('card-notice')}>
            {t('report.item.3', { type: useDaoCharacterConvert(activeDao.value) })}
            <Popover
              overlayClassName="tooltip"
              placement="top"
              content={<div className={cn('tooltip-contents')}>{t('report.item.tooltip1')}</div>}
              trigger="hover"
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            >
              <button type="button">
                <IconInfo />
              </button>
            </Popover>
          </div>
          <strong className={cn('card-unit')}>$0</strong>
        </li>
        <li className={cn('card-item', 'sub-data')}>
          <div className={cn('card-notice')}>{t('report.item.4', { type: useDaoCharacterConvert(activeDao.value) })}</div>
          <strong className={cn('card-unit')}>
            {/* 23.02.23 수정: WDR 티커 단위 다국어 처리 */}
            2,123,123{' '}
            <span className={cn('unit')}>
              {t('unit1', {
                ns: 'dao',
                keyPrefix: `amountUnit.${activeDao.value}`,
              })}
            </span>
          </strong>
        </li>
        <li className={cn('card-item', 'no-border', 'sub-data')}>
          <div className={cn('card-notice')}>{t('report.item.5')}</div>
          <strong className={cn('card-unit')}>
            2,123,123{' '}
            <span className={cn('unit')}>
              {t('unit1', {
                ns: 'dao',
                keyPrefix: `amountUnit.${activeDao.value}`,
              })}
            </span>
          </strong>
        </li>
        <li className={cn('card-item', 'no-border', 'sub-data')}>
          <div className={cn('card-notice')}>
            {t('report.item.6', { type: useDaoCharacterConvert(activeDao.value) })}
            <Popover
              overlayClassName="tooltip"
              placement="top"
              content={<div className={cn('tooltip-contents')}>{t('report.item.tooltip2', { type: useDaoCharacterConvert(activeDao.value) })}</div>}
              trigger="hover"
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            >
              <button type="button">
                <IconInfo />
              </button>
            </Popover>
          </div>
          <strong className={cn('card-unit')}>
            1,523,124{' '}
            <span className={cn('unit')}>
              {t('unit1', {
                ns: 'dao',
                keyPrefix: `amountUnit.${activeDao.value}`,
              })}
            </span>
          </strong>
        </li>
      </ul>
    </DaoBox>
  );
};

export default IncineratorReport;
