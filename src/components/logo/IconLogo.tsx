import { useMemo } from 'react';
/* 23.03.10 수정: ReactSVG -> Image 수정 */
import { NileCDNLoader } from '@utils/image/loader';
import cn from 'classnames';
import Image from 'next/image';

type Props = {
  type: string | undefined;
  size: number;
  fullType?: boolean;
};

{
  /*
   * wemix$ : 위믹스달러
   * wemix$_dark: 위믹스달러 다크 모드
   * wemix : 위믹스
   * wemix_dark: 위믹스 다크 모드
   * sol : 솔라나
   * usdc
   * dai : 다이
   * busd
   * usdt
   * eth : 이더리움
   * btc : 비트코인
   * xrp : 리플
   * ada : 에이다
   * dot : 폴카닷
   * wbnb
   * klay
   * wallet
   * metamask
   * wonder : wonder dao token
   * g.wonder : governance token
   * wemixfi : wemixfi token
   * kiaf : kiaf token
   * dummy: 없음 토큰
   */
}

type iconType = {
  [index: string]: string;
};

export const IconLogo = ({ type, size, fullType = false }: Props) => {
  const icon: iconType = useMemo(
    () => ({
      /* 23.03.10 수정: 파일명에 확장자 추가 */
      wemix$: '/icon/token/icon_wemix$.svg',
      wemix$_dark: '/icon/token/icon_dark_wemix$.svg',
      wemix: '/icon/token/icon_wemix.svg',
      wemix_dark: '/icon/token/icon_dark_wemix.svg',
      sol: '/icon/token/icon_sol.svg',
      usdc: '/icon/token/icon_usdc.svg',
      dai: '/icon/token/icon_dai.svg',
      busd: '/icon/token/icon_busd.svg',
      usdt: '/icon/token/icon_usdt.svg',
      eth: '/icon/token/icon_eth.svg',
      btc: '/icon/token/icon_btcb.svg',
      xrp: '/icon/token/icon_xrp.svg',
      ada: '/icon/token/icon_ada.svg',
      dot: '/icon/token/icon_dot.svg',
      wbnb: '/icon/token/icon_wbnb.svg',
      klaytn: '/icon/token/icon_klaytn.svg',
      klay: '/icon/token/icon_klaytn.svg',
      wallet: '/icon/token/icon_wemix_wallet.svg',
      metamask: '/icon/token/icon_metamask.svg',
      wonder: fullType ? '/icon/daotokens/ico_wonder_full.svg' : '/icon/daotokens/ico_wonder.svg',
      'g.wonder': fullType ? '/icon/daotokens/ico_gwonder_full.svg' : '/icon/daotokens/ico_gwonder.svg',
      arteum: '/icon/daotokens/ico_arteum.svg',
      'g.arteum': '/icon/daotokens/ico_garteum.svg',
      delta: '/icon/daotokens/ico_delta.svg',
      'g.delta': '/icon/daotokens/ico_gdelta.svg',
      zero: '/icon/daotokens/ico_zero.svg',
      'g.zero': '/icon/daotokens/ico_gzero.svg',
      wemixfi: '/icon/daotokens/ico_wemixfi.svg',
      kiaf: '/icon/daotokens/ico_kiaf.svg',
      tangled: '/icon/daotokens/ico_tangled.svg',
      tipo: '/icon/token/ico_tipo.svg',
      snkrz: '/icon/token/ico_skz.svg',
      skz: '/icon/token/ico_skz.svg',
      placeholder1: '/icon/token/icon_placeholder1.svg',
      placeholder2: '/icon/token/icon_placeholder2.svg',
      kari: '/icon/daotokens/ico_kari.png',
      son: '/icon/daotokens/ico_son.svg',
      lus: '/icon/daotokens/ico_lus.svg',
      con: '/icon/daotokens/ico_con.svg',
      /* 23.03.10 수정: cone 추가 */
      cone: '/img/img_symbol_life_con_neith.png',
      /* 23.04.05 수정: frc 추가  */
      frc: '/icon/token/ico_frc.svg',
      /* 23.04.03 수정: cora 추가 */
      cora: '/img/img_symbol_life_con_ra.png',
      /* 23.04.12 수정: bagc 추가  */
      bagc: '/icon/token/ico_bagc.svg',
    }),
    /* 23.04.05 수정: 의존성 값 type 추가 */
    [type],
  );

  return (
    /* 23.03.10 수정: ReactSVG -> Image 수정 */
    <span className={cn('icon-logo-wrap')} style={{ width: `${size}px`, height: `${size}px` }}>
      <Image src={`/assets/images${icon[type ?? '']}`} alt="" layout="fill" quality={100} loader={NileCDNLoader} />
    </span>
  );
};
