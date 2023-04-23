import { useEffect, useState } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'next-i18next';
import { daoThemeAtom } from '@/state/daoAtom';
import useMediaQuery from '@/hook/useMediaQuery';

import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

const TokenFlowInfo = () => {
  const { t } = useTranslation(['dao']);
  const [tokenList, setTokenList] = useState([]);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const activeDao = useAtomValue(daoThemeAtom);

  useEffect(() => {
    setTokenList(
      t(`station.recruiting.tokenomics.list`, {
        type: useDaoCharacterConvert(activeDao.value),
        returnObjects: true,
      }),
    );
  }, [t]);

  return (
    <div className={cn('check-item-wrap')}>
      <div className={cn('check-item', 'reward')}>
        <div className={cn('list-wrapper')}>
          <ul className={cn('list-wrap')}>
            {tokenList.map((el, index) => {
              return (
                <li key={`list${index}`}>
                  {index > 0 && (
                    <span className={cn('arrow')}>
                      {!isMobile ? (
                        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_reward_arrow.svg" />
                      ) : (
                        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_reward_arrow_mobile.svg" />
                      )}
                    </span>
                  )}
                  <span className={cn('img-wrap')}>
                    <ReactSVG src={`https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_reward_step${index + 1}.svg`} />
                  </span>
                  <span className={cn('text-wrap')}>
                    <strong className={cn('name')}>{el}</strong>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TokenFlowInfo;
