import cn from 'classnames';
import StationTitle from '@components/dao/station/recruit/StationTitle';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import useMediaQuery from '@/hook/useMediaQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

interface TokenList {
  ticker: string;
  name: string;
  desc: string;
  list: string[];
}

const OperationToken = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [tokenList, setTokenList] = useState<TokenList[]>([]);

  useEffect(() => {
    setTokenList(
      t(`station.recruiting.token.item`, {
        type: useDaoCharacterConvert(activeDao.value),
        /* 23.03.03 수정: 발행량 다국어 처리 추가 */
        num: (1900010).toLocaleString('KR-ko'),
        unit1: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
        unit2: t('unit2', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
        returnObjects: true,
      }),
    );
    /* 23.04.10 수정: useEffect dependency 값 추가 */
  }, [t]);

  return (
    <div className={cn('operation-token-wrap')}>
      <StationTitle title="Token (Membership)" desc={t('station.recruiting.token.desc', { type: useDaoCharacterConvert(activeDao.value) })} />
      {isMobile ? (
        <Swiper className={cn('operation-content-wrap')} slidesPerView={1} spaceBetween={8} modules={[Pagination]} pagination={{}}>
          {tokenList.map((el, index) => {
            return (
              <SwiperSlide className={cn('item')} key={`item${index}`}>
                <div className={cn('image-wrap')}>
                  <ReactSVG
                    src={
                      index === 0
                        ? `https://nile.blob.core.windows.net/images/assets/images/icon/daotokens/ico_${activeDao.value}_full.svg`
                        : `https://nile.blob.core.windows.net/images/assets/images/icon/daotokens/ico_g${activeDao.value}_full.svg`
                    }
                  />
                </div>
                <div className={cn('inner')}>
                  <span className={cn('sub')}>{index === 0 ? 'DAO Token' : 'Governance Token'}</span>
                  <div className={cn('token-name')}>
                    <strong className={cn('name')}>{el.name}</strong>
                    <span className={cn('ticker')}>{el.ticker}</span>
                  </div>
                  <p className={cn('token-desc')}>{el.desc}</p>
                  <ul className={cn('list-dot-wrap')}>
                    {el.list.map((listItem, listIndex) => {
                      return <li key={`list${listIndex}`}>{listItem}</li>;
                    })}
                  </ul>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className={cn('operation-content-wrap')}>
          {tokenList.map((el, index) => {
            return (
              <div className={cn('item')} key={`item${index}`}>
                <div className={cn('image-wrap')}>
                  <ReactSVG
                    src={
                      index === 0
                        ? `https://nile.blob.core.windows.net/images/assets/images/icon/daotokens/ico_${activeDao.value}_full.svg`
                        : `https://nile.blob.core.windows.net/images/assets/images/icon/daotokens/ico_g${activeDao.value}_full.svg`
                    }
                  />
                </div>
                <div className={cn('inner')}>
                  <span className={cn('sub')}>{index === 0 ? 'DAO Token' : 'Governance Token'}</span>
                  <div className={cn('token-name')}>
                    <strong className={cn('name')}>{el.name}</strong>
                    <span className={cn('ticker')}>{el.ticker}</span>
                  </div>
                  <p className={cn('token-desc')}>{el.desc}</p>
                  <ul className={cn('list-dot-wrap')}>
                    {el.list.map((listItem, listIndex) => {
                      return <li key={`list${listIndex}`}>{listItem}</li>;
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OperationToken;
