import cn from 'classnames';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useLayoutResize } from '@utils/layout';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { useTranslation } from 'next-i18next';
import { useWonder } from '@/hook/useWonder';
import { contractsAtom, daoContractsAtom } from '@/state/web3Atom';
import { provider } from '@/state/nileWalletAtom';
import { daoAbis, daoJsonAbiAddress } from '@/web3/abis/dao';
import { fromWei } from 'web3-utils';
import Swiper from 'swiper';

const DaoStakingReport = () => {
  const { t } = useTranslation('dao');
  const { isMobile } = useLayoutResize();

  const swiperRef = useRef<HTMLDivElement>(null);
  const activeDao = useAtomValue(daoThemeAtom);
  const [stakedWonder, setStakedWonder] = useState<number>(0);
  const [gtSupply, setGtSupply] = useState<number>(0);

  const { wonderDao } = useWonder();

  /* 23.04.11 수정: jira QA379 수정 */
  useEffect(() => {
    if (isMobile) {
      const swiper = new Swiper(swiperRef.current!, {
        slidesPerView: 'auto',
        spaceBetween: 8,
      });
    }
    return () => {};
  }, [isMobile]);

  useEffect(() => {
    if (wonderDao) {
      const proxyContract = new provider.web3.eth.Contract(daoAbis.StakingPool, daoJsonAbiAddress().current.StakingPoolProxy);

      proxyContract?.methods.totalStakedAmount(wonderDao?.daoId).call(function (err: any, res: any) {
        setStakedWonder(Number(fromWei(res, 'ether')));
      });

      if (wonderDao?.gtAddress) {
        const contract = new provider.web3.eth.Contract(daoAbis.GovernanceToken, wonderDao?.gtAddress);

        contract?.methods.totalSupply().call(function (err: any, res: any) {
          setGtSupply(Number(fromWei(res, 'ether')));
        });
      }
    }
  }, [wonderDao]);

  const rate = useMemo(() => {
    if (gtSupply === 0 || stakedWonder === 0) {
      return;
    }
    return gtSupply / stakedWonder;
  }, [stakedWonder, gtSupply]);

  return (
    <>
      {isMobile ? (
        <div className={cn('dao-common-card', 'horizontal')}>
          <h4 className={cn('card-title')}>{t('stakingPool.report.title')}</h4>
          <div className={cn('swiper')} ref={swiperRef}>
            <div className={cn('swiper-wrapper')}>
              <div className={cn('swiper-slide')}>
                <div className={cn('obelisk-box-content')}>
                  <div className={cn('box-notice')}>{t('stakingPool.report.item.0', { token: useDaoCharacterConvert(activeDao.value) })}</div>
                  {rate ? <strong className={cn('box-unit', 'active')}>1 : {rate}</strong> : '-'}
                </div>
              </div>
              <div className={cn('swiper-slide')}>
                <div className={cn('obelisk-box-content')}>
                  <div className={cn('box-notice')}>{t('stakingPool.report.item.1', { token: useDaoCharacterConvert(activeDao.value) })}</div>
                  <strong className={cn('box-unit')}>
                    {stakedWonder}&nbsp;
                    <span className={cn('unit')}>
                      {t('unit1', {
                        ns: 'dao',
                        keyPrefix: `amountUnit.${activeDao.value}`,
                      })}
                    </span>
                  </strong>
                </div>
              </div>
              <div className={cn('swiper-slide')}>
                <div className={cn('obelisk-box-content')}>
                  <div className={cn('box-notice')}>{t('stakingPool.report.item.2', { token: useDaoCharacterConvert(activeDao.value) })}</div>
                  <strong className={cn('box-unit')}>
                    {gtSupply}&nbsp;
                    <span className={cn('unit')}>
                      g.
                      {t('unit1', {
                        ns: 'dao',
                        keyPrefix: `amountUnit.${activeDao.value}`,
                      })}
                    </span>
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
              <strong className={cn('box-unit', 'active')}>{rate ? `1 : ${rate}` : '-'}</strong>
            </div>
            <div className={cn('obelisk-box-content')}>
              <div className={cn('box-notice')}>{t('stakingPool.report.item.1', { token: useDaoCharacterConvert(activeDao.value) })}</div>
              <strong className={cn('box-unit')}>
                {stakedWonder}&nbsp;
                <span className={cn('unit')}>
                  {t('unit1', {
                    ns: 'dao',
                    keyPrefix: `amountUnit.${activeDao.value}`,
                  })}
                </span>
              </strong>
            </div>
            <div className={cn('obelisk-box-content')}>
              <div className={cn('box-notice')}>{t('stakingPool.report.item.2', { token: useDaoCharacterConvert(activeDao.value) })}</div>
              <strong className={cn('box-unit')}>
                {gtSupply}&nbsp;
                <span className={cn('unit')}>
                  g.
                  {t('unit1', {
                    ns: 'dao',
                    keyPrefix: `amountUnit.${activeDao.value}`,
                  })}
                </span>
              </strong>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DaoStakingReport;
