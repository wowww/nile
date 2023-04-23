import { useEffect, useRef, useState } from 'react';
/* 23.02.23 수정: 불필요한 import 삭제 */
import cn from 'classnames';
import { Popover } from 'antd';
import { DaoBox, DaoBoxLayout } from '@/components/dao/ui/DaoBoxLayout';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import BgButton from '@/components/button/BgButton';

import { TooltipPlacement } from 'antd/es/tooltip';
import DaoChartArea from '../DaoChartArea';
import { daoThemeAtom } from '@/state/daoAtom';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

import useMediaQuery from '@/hook/useMediaQuery';
import { ReactSVG } from 'react-svg';
import Swiper from 'swiper';

export const DaoStakingGraph = () => {
  /* 23.03.29 수정: tooltip 화살표 위치 수정 */
  const [tooltipAlign, setTooltipAlign] = useState<TooltipPlacement>('topRight');
  const [isConnectWallet, setIsConnectWallet] = useState(true); // 지갑 연결 여부
  const [disabledUnstaking, setDisabledUnstaking] = useState(true); // Unstaking 기능 비활성화 여부
  const [unstakingDate, setUnstakingDate] = useState(true); // Unstaking 기능 일자 여부
  /* 23.02.23 수정: 불필요한 파일 삭제 */
  const { t } = useTranslation('dao');
  /* 23.02.23 수정: daoThemeAtom 추가 */
  const activeDao = useAtomValue(daoThemeAtom);

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isXl = useMediaQuery('(min-width: 1440px)');

  const swiperRef = useRef<HTMLDivElement>(null);

  /* 23.03.29 수정: tooltip 화살표 위치 수정 - 기존 코드 주석 */
  // useEffect(() => {
  //   if (!isXl) {
  //     setTooltipAlign('topRight');
  //   } else {
  //     setTooltipAlign('top');
  //   }
  // }, [isXl]);

  useEffect(() => {
    if (isMobile) {
      const swiper = new Swiper(swiperRef.current!, {
        slidesPerView: 'auto',
        spaceBetween: 8,
      });
    }
    return () => {};
  }, [isMobile]);
  return (
    <>
      <DaoBoxLayout className="ratio">
        <DaoBox>
          <DaoChartArea
            areaType="obelisk"
            title={t('stakingPool.chart.name', { token: useDaoCharacterConvert(activeDao.value) })}
            figure={5.12}
            date="2022-07-22 03:30"
          />
        </DaoBox>
        <DaoBox className={cn('dao-common-card', 'obelisk')}>
          {/* 23.03.01 수정 start: 카드 위치 변경 */}
          <div className={cn('card-title', 'flex-box')}>
            <h4>{t('stakingPool.tokens.title')}</h4>
            {/* 23.03.22 수정:  툴팁  여부 조건 변경 */}
            <p className={cn('card-tooltip')}>
              {t('stakingPool.tokens.tooltip.title')}
              <Popover
                overlayClassName="tooltip"
                placement={tooltipAlign}
                content={
                  <div className={cn('tooltip-contents')}>
                    {t('stakingPool.tokens.tooltip.desc1')}
                    <p className={cn('sub-desc')}>{t('stakingPool.tokens.tooltip.desc2')}</p>
                  </div>
                }
                trigger="hover"
                getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              >
                <button type="button">
                  <span className={cn('a11y')}>tooltip</span>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                </button>
              </Popover>
            </p>
          </div>
          {isConnectWallet ? (
            //  지갑 연결된 상태
            /* 23.03.21 수정: 최신디자인 반영 전체 마크업 일괄 수정 */
            <>
              <ul className={cn('card-item-list', 'primary')}>
                <li className={cn('card-item')}>
                  <div className={cn('card-notice')}>{t('stakingPool.tokens.item.2', { token: useDaoCharacterConvert(activeDao.value) })}</div>
                  <strong className={cn('card-unit')}>
                    0.0000 <span className={cn('unit')}>{t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}</span>
                    {/* 23.03.29 수정: Unstake 가능 일자는 Stake 이후에 노출되어야합니다. -> 이로 인해 주석 */}
                    {/* {unstakingDate && <span className={cn('unstake-date')}>Unstake 가능 일자 : 2023-11-01 12:00:03</span>} */}
                  </strong>
                </li>
              </ul>

              <ul className={cn('card-item-list')}>
                <li className={cn('card-item')}>
                  <div className={cn('card-notice')}>{useDaoCharacterConvert(activeDao.value)}</div>
                  <strong className={cn('card-unit')}>
                    2,123,123.0000 <span className={cn('unit')}>{t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}</span>
                  </strong>
                </li>
                <li className={cn('card-item')}>
                  <div className={cn('card-notice')}>g.{useDaoCharacterConvert(activeDao.value)}</div>
                  <strong className={cn('card-unit')}>
                    1,523,124.0000 <span className={cn('unit')}>g.{t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}</span>
                  </strong>
                </li>
              </ul>

              <div className={cn('btn-wrap')}>
                <BgButton buttonText={t('stakingPool.tokens.btn1')} color="highlight" size={!isMobile ? 'md' : 'lg'} />
                {/* 23.03.01 수정: Unstaking 버튼 주석 */}
                {/* <BgButton
                  buttonText={t('stakingPool.tokens.btn2')}
                  hasTooltip={disabledUnstaking}
                  tooltipClassName={'dao-unstaking-btn-tooltip'}
                  tooltipPlace="bottom"
                  tooltipHtml={disabledUnstaking && t('stakingPool.tokens.toastTooltip')}
                  disabled={disabledUnstaking}
                  color="highlight"
                  size={offset.width >= 768 ? 'md' : 'lg'}
                /> */}
              </div>
            </>
          ) : (
            // 지갑 미연결 상태
            <>
              <div className={cn('wallet-none-area')}>
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_wallet.svg" />
                <p className={cn('card-guide-info')}>{t('stakingPool.tokens.desc')}</p>
              </div>
              <div className={cn('btn-wrap')}>
                <BgButton buttonText={t('stakingPool.tokens.btn3')} block color="highlight" size={!isMobile ? 'md' : 'lg'} />
              </div>
            </>
          )}
        </DaoBox>
      </DaoBoxLayout>
      {/* 23.03.21 수정:  최신디자인 반영 전체 마크업 일괄 수정  */}
      <DaoBoxLayout>
        <DaoBox className={cn('obelisk-horizontal')}>
          {isMobile ? (
            <div className={cn('dao-common-card', 'horizontal')}>
              <h4 className={cn('card-title')}>{t('stakingPool.report.title')}</h4>
              <div className={cn('swiper obelisk-report-content')} ref={swiperRef}>
                <div className={cn('swiper-wrapper')}>
                  <div className={cn('swiper-slide')}>
                    <div className={cn('obelisk-box-content')}>
                      <div className={cn('box-notice')}>{t('stakingPool.report.item.0', { token: useDaoCharacterConvert(activeDao.value) })}</div>
                      <strong className={cn('box-unit', 'active')}>1 : 1.1421</strong>
                    </div>
                  </div>
                  <div className={cn('swiper-slide')}>
                    <div className={cn('obelisk-box-content')}>
                      <div className={cn('box-notice')}>{t('stakingPool.report.item.1', { token: useDaoCharacterConvert(activeDao.value) })}</div>
                      <strong className={cn('box-unit')}>
                        2,123,124 <span className={cn('unit')}>{t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}</span>
                      </strong>
                    </div>
                  </div>
                  <div className={cn('swiper-slide')}>
                    <div className={cn('obelisk-box-content')}>
                      <div className={cn('box-notice')}>{t('stakingPool.report.item.2', { token: useDaoCharacterConvert(activeDao.value) })}</div>
                      <strong className={cn('box-unit')}>
                        1,523,124 <span className={cn('unit')}>g.{t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}</span>
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={cn('dao-common-card', 'horizontal')}>
              <h4 className={cn('card-title')}>{t('stakingPool.report.title')}</h4>
              <div className={cn('obelisk-report-content')}>
                <div className={cn('obelisk-box-content')}>
                  <div className={cn('box-notice')}>{t('stakingPool.report.item.0', { token: useDaoCharacterConvert(activeDao.value) })}</div>
                  <strong className={cn('box-unit', 'active')}>1 : 1.1421</strong>
                </div>
                <div className={cn('obelisk-box-content')}>
                  <div className={cn('box-notice')}>{t('stakingPool.report.item.1', { token: useDaoCharacterConvert(activeDao.value) })}</div>
                  <strong className={cn('box-unit')}>
                    2,123,124 <span className={cn('unit')}>{t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}</span>
                  </strong>
                </div>
                <div className={cn('obelisk-box-content')}>
                  <div className={cn('box-notice')}>{t('stakingPool.report.item.2', { token: useDaoCharacterConvert(activeDao.value) })}</div>
                  <strong className={cn('box-unit')}>
                    1,523,124 <span className={cn('unit')}>g.{t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}</span>
                  </strong>
                </div>
              </div>
            </div>
          )}
        </DaoBox>
      </DaoBoxLayout>
    </>
  );
};

export default DaoStakingGraph;
