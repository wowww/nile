import { useEffect, useRef, useState } from 'react';
import { Trans } from 'next-i18next';
import lottie from 'lottie-web';
import lottieCongratulations from '@/assets/lottie/lottie_congratulations.json';
import cn from 'classnames';
import { Avatar } from 'antd';
import { useWalletFormatter } from '@utils/formatter/wallet';
import NileNft from '@/models/nile/marketplace/NileNft';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
import { NileApiService } from '@/services/nile/api';

interface Props {
  status: 'success' | 'fail' | 'no-bid';
  image?: string;
  name: string;
  price: string;
  time: string;
  nft?: NileNft;
}

const MarketplaceDetailBidResult = ({ status = 'success', image, name, price, time, nft }: Props) => {
  const api = NileApiService();

  const bgLottie = useRef<any>(null);
  const { shorten } = useWalletFormatter();
  const [isMobile, setIsMobile] = useState(false);
  const [userInfo, setUserInfo] = useState<NileUserAccount>();

  useEffect(() => {
    api.user.account
      .getUserInfo(nft?.token?.collection?.ownerAddress ?? '')
      .then(({ data }) => setUserInfo(data))
      .catch(({ response }) => {
        return null;
      });
  }, [nft]);

  useEffect(() => {
    const lottieLoad = lottie.loadAnimation({
      container: bgLottie.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottieCongratulations,
    });
    return () => lottieLoad.destroy();
  }, []);

  return (
    <div className={cn('marketplace-bid-result', status)}>
      {nft && (
        <Avatar
          size={40}
          className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)}
          style={{ backgroundImage: image && image }}
        />
      )}
      <p>
        <Trans
          i18nKey="detailTop.resultMsg"
          ns="marketplace"
          values={{
            name: `${isMobile ? shorten(name) : name}`,
            price: `${new Intl.NumberFormat('ko-KR').format(Number(price))} WEMIX$`,
            mark: '!',
          }}
        >
          <strong></strong>
        </Trans>
      </p>
      <span className={cn('time')}>{time}</span>
      {status !== 'fail' && <div className={cn('lottie-area')} ref={bgLottie}></div>}
    </div>
  );
};

export default MarketplaceDetailBidResult;
