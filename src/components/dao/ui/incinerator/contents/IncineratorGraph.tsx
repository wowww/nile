/* 23.02.23 수정: 불필요한 import 삭제 */
import { Popover } from 'antd';
import cn from 'classnames';
import { DaoBox, DaoBoxLayout } from '@/components/dao/ui/DaoBoxLayout';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
/* 23.02.23 수정: useAtomValue 추가 */
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

import DaoChartArea from '../../DaoChartArea';

export const IncineratorGraph = () => {
  const { t, i18n } = useTranslation('dao', { keyPrefix: 'incinerator' });
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <div className={cn('dao-individual-graph-wrap')}>
      <DaoBoxLayout className={cn('ratio')}>
        <DaoBox>
          <DaoChartArea
            areaType="incinerator"
            title={t('chart.title', { type: useDaoCharacterConvert(activeDao.value) })}
            figure={1.12}
            date="2022-07-22 03:30"
          />
        </DaoBox>

        <DaoBox className={cn('dao-common-card', 'treasury')}>
          <h4 className={cn('card-title')}>{t('report.title', { type: useDaoCharacterConvert(activeDao.value) })}</h4>
          {/* 23.03.13 수정: 중요 정보 primary 타입 분리 */}
          <ul className={cn('card-item-list', 'primary')}>
            <li className={cn('card-item')}>
              <div className={cn('card-notice')}>{t('report.item.1', { type: useDaoCharacterConvert(activeDao.value) })}</div>
              <strong className={cn('card-unit active')}>
                8,482,912 <span className={cn('unit')}>{t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}</span>
              </strong>
              <span className={cn('card-unit-dollar')}>($7,120,400)</span>
            </li>
            <li className={cn('card-item')}>
              <div className={cn('card-notice')}>{t('report.item.2', { type: useDaoCharacterConvert(activeDao.value) })}</div>
              <strong className={cn('card-unit')}>
                8,482,912 <span className={cn('unit')}>{t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}</span>
              </strong>
              <span className={cn('card-unit-dollar')}>($7,120,400)</span>
            </li>
            <li className={cn('card-item')}>
              <div className={cn('card-notice')}>
                {t('report.item.3', { type: useDaoCharacterConvert(activeDao.value) })}
                <Popover
                  overlayClassName="tooltip"
                  placement="top"
                  content={
                    <div className={cn('tooltip-contents')}>{t('report.item.tooltip1', { type: useDaoCharacterConvert(activeDao.value) })}</div>
                  }
                  trigger="hover"
                  getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                >
                  <button type="button">
                    <span className={cn('a11y')}>tooltip</span>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                  </button>
                </Popover>
              </div>
              <strong className={cn('card-unit')}>
                8,482,912 <span className={cn('unit')}>{t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}</span>
              </strong>
              <span className={cn('card-unit-dollar')}>($7,120,400)</span>
            </li>
            {/* <li className={cn('card-item')}>
              <div className={cn('card-notice')}>{t('report.item.4', { type: useDaoCharacterConvert(activeDao.value) })}</div>
              <strong className={cn('card-unit')}>
                // 23.03.06 수정: 단위 표기 수정, 달러 표기 추가
                2,123,123
                <span className={cn('unit')}>WEMIX</span>
              </strong>
              <span className={cn('card-unit-dollar')}>($7,120,400)</span>
            </li> */}
          </ul>
          <ul className={cn('card-item-list')}>
            <li className={cn('card-item')}>
              <div className={cn('card-notice')}>{t('report.item.5')}</div>
              <strong className={cn('card-unit')}>
                {/* 23.03.06 수정: 단위 표기 수정, 달러 표기 추가 */}
                2,123,123
                <span className={cn('unit')}>WEMIX</span>
              </strong>
              <span className={cn('card-unit-dollar')}>($7,120,400)</span>
            </li>
            <li className={cn('card-item')}>
              <div className={cn('card-notice')}>
                {t('report.item.6', { type: useDaoCharacterConvert(activeDao.value) })}
                <Popover
                  overlayClassName="tooltip"
                  placement="top"
                  content={
                    <div className={cn('tooltip-contents')}>{t('report.item.tooltip2', { type: useDaoCharacterConvert(activeDao.value) })}</div>
                  }
                  trigger="hover"
                  getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                >
                  <button type="button">
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                  </button>
                </Popover>
              </div>
              <strong className={cn('card-unit')}>
                {/* 23.03.06 수정: 단위 표기 수정, 달러 표기 추가 */}
                1,523,124
                {/* 23.03.13 수정: WEMIX 삭제 */}
                <span className={cn('unit')}>WEMIX</span>
              </strong>
              <span className={cn('card-unit-dollar')}>($7,120,400)</span>
            </li>
          </ul>
        </DaoBox>
      </DaoBoxLayout>
    </div>
  );
};

export default IncineratorGraph;
