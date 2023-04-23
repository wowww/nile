import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Popover } from 'antd';
import { ReactSVG } from 'react-svg';

export const DaoTrustReport = () => {
  const { t } = useTranslation('dao');

  return (
    <>
      <h4 className={cn('card-title')}>{t('trust.report.title')}</h4>
      <ul className={cn('card-item-list', 'primary')}>
        <li className={cn('card-item')}>
          <div className={cn('card-notice')}>{t('trust.report.item.0')}</div>
          <strong className={cn('card-unit active')}>$ 0</strong>
        </li>
      </ul>
      <ul className={cn('card-item-list')}>
        <li className={cn('card-item')}>
          <div className={cn('card-notice')}>
            {t('trust.report.item.1')}
            <Popover
              overlayClassName="tooltip"
              placement="top"
              content={<div className={cn('tooltip-contents')}>{t('trust.report.item.tooltip1')}</div>}
              trigger="hover"
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            >
              <button type="button">
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
              </button>
            </Popover>
          </div>
          <strong className={cn('card-unit')}>$ 0</strong>
        </li>
        <li className={cn('card-item')}>
          <div className={cn('card-notice')}>
            {t('trust.report.item.2')}
            <Popover
              overlayClassName="tooltip"
              placement="top"
              content={<div className={cn('tooltip-contents')}>{t('trust.report.item.tooltip2')}</div>}
              trigger="hover"
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            >
              <button type="button">
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
              </button>
            </Popover>
          </div>
          <strong className={cn('card-unit')}>$ 0</strong>
        </li>
        <li className={cn('card-item')}>
          <div className={cn('card-notice')}>
            {t('trust.report.item.3')}
            <Popover
              overlayClassName="tooltip"
              placement="top"
              content={<div className={cn('tooltip-contents')}>{t('trust.report.item.tooltip3')}</div>}
              trigger="hover"
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            >
              <button type="button">
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
              </button>
            </Popover>
          </div>
          <strong className={cn('card-unit')}>$ 0</strong>
        </li>
      </ul>
    </>
  );
};

export default DaoTrustReport;
