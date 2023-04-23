import dynamic from 'next/dynamic';
import cn from 'classnames';
/* 23.03.03 수정: 불필요한 코드 삭제 ChartPeriodTab */
import { LinChartFilterState, daoLineChartData } from '@/components/chart/chartDummyData';
/* 23.03.03 수정: 불필요한 코드 삭제 DaoChartBox */
import { DaoBox, DaoBoxLayout } from '@/components/dao/ui/DaoBoxLayout';
import { useTranslation } from 'next-i18next';
/* 23.03.03 수정: 불필요한 코드 삭제 ReactSVG */
import { useAtom, useAtomValue } from 'jotai';

import DaoChartArea from '../DaoChartArea';
import { Popover } from 'antd';
import { ReactSVG } from 'react-svg';

const DaoLineChart = dynamic(() => import('@/components/chart/DaoLineChart'), {
  ssr: false,
});

export const DaoTrustGraph = () => {
  const lineChartInit = useAtomValue(daoLineChartData);
  const [filter, setFilter] = useAtom(LinChartFilterState);
  const { t } = useTranslation('dao');

  const summaryObject = [
    {
      name: t('trust.chart.name'),
      value: '5.10',
      unit: '%',
    },
  ];

  return (
    <DaoBoxLayout className="ratio">
      <DaoBox>
        <DaoChartArea areaType="trust" title={t('trust.graphTitle')} figure={5.12} date="2022-07-22 03:30" />
      </DaoBox>
      {/* 03.13 마크업 수정 - 불필요 div 제거하고 클래스 병합 처리 */}
      <DaoBox className="dao-common-card trust-report">
        <h4 className={cn('card-title')}>{t('trust.report.title')}</h4>
        {/* 03.13 마크업 수정 - 중요 정보 primary 타입 분리 */}
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
              {/* 23.03.03 수정 start: 툴팁 팝업 추가 */}
              <Popover
                overlayClassName="tooltip"
                placement="top"
                content={<div className={cn('tooltip-contents')}>{t('trust.report.item.tooltip1')}</div>}
                trigger="hover"
                getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              >
                <button type="button">
                  <span className={cn('a11y')}>tooltip</span>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                </button>
              </Popover>
              {/* 23.03.03 수정 end: 툴팁 팝업 추가 */}
            </div>
            <strong className={cn('card-unit')}>$ 0</strong>
          </li>
          <li className={cn('card-item')}>
            {/* 23.03.03 수정: outflow 클래스명 삭제 */}
            <div className={cn('card-notice')}>
              {t('trust.report.item.2')}
              {/* 23.03.03 수정 start: 툴팁 팝업 추가 */}
              <Popover
                overlayClassName="tooltip"
                placement="top"
                content={<div className={cn('tooltip-contents')}>{t('trust.report.item.tooltip2')}</div>}
                trigger="hover"
                getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              >
                <button type="button">
                  <span className={cn('a11y')}>tooltip</span>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                </button>
              </Popover>
              {/* 23.03.03 수정 end: 툴팁 팝업 추가 */}
            </div>
            <strong className={cn('card-unit')}>$ 0</strong>
          </li>
          <li className={cn('card-item')}>
            <div className={cn('card-notice')}>
              {t('trust.report.item.3')}
              {/* 23.03.03 수정 start: 툴팁 팝업 추가 */}
              <Popover
                overlayClassName="tooltip"
                placement="top"
                content={<div className={cn('tooltip-contents')}>{t('trust.report.item.tooltip3')}</div>}
                trigger="hover"
                getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              >
                <button type="button">
                  <span className={cn('a11y')}>tooltip</span>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                </button>
              </Popover>
              {/* 23.03.03 수정 end: 툴팁 팝업 추가 */}
            </div>
            <strong className={cn('card-unit')}>$ 0</strong>
          </li>
        </ul>
      </DaoBox>
    </DaoBoxLayout>
  );
};

export default DaoTrustGraph;
