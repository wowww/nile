import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState, useMemo, forwardRef } from 'react';
import { useAtomValue } from 'jotai';
import { daoHomeProtocolLottiePlay, daoThemeAtom } from '@/state/daoAtom';

import lottie from 'lottie-web';

// 임시 더미데이터
import lottieProtocolWonder from '@/assets/lottie/daoIndex/lottie_wonder_protocol.json';
import lottieProtocolOracle from '@/assets/lottie/daoIndex/lottie_oracle_protocol.json';
import lottieProtocolArteum from '@/assets/lottie/daoIndex/lottie_arteum_protocol.json';
import lottieProtocolDelta from '@/assets/lottie/daoIndex/lottie_delta_protocol.json';

export const DaoHomeProtocol = forwardRef<HTMLDivElement>(({}, ref) => {
  const { t } = useTranslation(['daoHome', 'common']);
  const [lottieData, setLottieData] = useState<any>(null);

  // lottie div Element
  const daoLottieHeroWonder = useRef<any>(null);
  const daoLottieHeroRef = useRef<any>(null);
  const activeDao = useAtomValue(daoThemeAtom);
  const homeProtocolLottiePlay = useAtomValue(daoHomeProtocolLottiePlay);

  // 테마별 로디 셋팅 함수
  const lottieUpdateHandler = (theme: string) => {
    switch (theme) {
      case 'oracle':
        return setLottieData(lottieProtocolOracle);
        break;
      case 'wonder':
        return setLottieData(lottieProtocolWonder);
        break;
      case 'arteum':
        return setLottieData(lottieProtocolArteum);
        break;
      case 'delta':
        return setLottieData(lottieProtocolDelta);
        break;
    }
  };

  //테마별 로티 업데이트
  useEffect(() => {
    lottieUpdateHandler(activeDao.value);
  }, [activeDao]);

  //로티 로드
  useEffect(() => {
    daoLottieHeroRef.current = lottie.loadAnimation({
      container: daoLottieHeroWonder.current!,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      animationData: lottieData,
    });

    return () => daoLottieHeroRef.current?.destroy();
  }, [lottieData, homeProtocolLottiePlay]);

  useEffect(() => {
    if (daoLottieHeroRef.current) {
      if (homeProtocolLottiePlay) {
        daoLottieHeroRef.current?.play();
      } else {
        daoLottieHeroRef.current?.pause();
      }
    }
  }, [daoLottieHeroRef.current, homeProtocolLottiePlay]);

  return (
    <div className={cn('dao-protocol-wrap')} ref={ref}>
      <div className={cn('protocol-inner')}>
        <div className={cn('title-wrap')}>
          <span className={cn('protocol-sub-title')}>{t(`protocol.title`)}</span>
          <strong className={cn('protocol-main-title')}>{t(`protocol.${activeDao.value}Title`)}</strong>
        </div>
        <div>
          <div className={cn('protocol-lottie', { wonder: activeDao.value === 'wonder' })} ref={daoLottieHeroWonder} />
        </div>
      </div>
    </div>
  );
});

export default DaoHomeProtocol;
