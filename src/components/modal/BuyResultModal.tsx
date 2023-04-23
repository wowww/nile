import cn from 'classnames';
import Image from 'next/image';

import BgButton from '@/components/button/BgButton';

/* 22.10.11 수정 start: 로티 더미 교체 */
import { useEffect, useRef, useState } from 'react';
import lottieCongratulations from '@/assets/lottie/lottie_congratulations.json';
import lottie from 'lottie-web';
import { Trans, useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';
import dynamic from 'next/dynamic';
/* 22.10.11 수정 end: 로티 더미 교체 */

type resultCaseType = 'auctionSuccess' | 'auctionFail' | 'offerExpired' | 'openForOffersSuccess' | 'openForOffersFail' | 'sellBuyNow';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  resultCase: resultCaseType;
  userName: string;
  imgUrl: string;
  price?: number;
  buyer?: string;
  seller?: string;
}

const BuyResultModal: React.FC<Props> = ({ isOpen, setIsOpen, resultCase, userName, imgUrl, price, buyer, seller }): JSX.Element => {
  const [destroyClose, setDestroyClose] = useState<boolean>(false);
  const successCase = ['auctionSuccess', 'openForOffersSuccess', 'sellBuyNow'];
  const isSuccess: boolean = successCase.includes(resultCase);

  /* 22.10.11 수정 start: 로티 더미 교체 */
  const bgLottie = useRef<any>(null);

  useEffect(() => {
    isOpen ? setDestroyClose(true) : setDestroyClose(false);
    if (isOpen) {
      const lottieLoad = lottie.loadAnimation({
        container: bgLottie.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: lottieCongratulations,
      });

      return () => lottieLoad.destroy();
    }
  }, [isOpen]);
  /* 22.10.11 수정 end: 로티 더미 교체 */

  return (
    <ModalLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="md"
      wrapClassName={cn('buy-result-modal-wrap')}
      footer={true}
      footerContent={[<ModalButton resultCase={resultCase} key="result-case-btn" />]}
      title={<ModalHeader resultCase={resultCase} />}
      titleType="center"
      destroyOnClose={destroyClose}
    >
      <div className={cn('img-area')}>
        <Image src={imgUrl} layout="fill" objectFit="cover" loader={NileCDNLoader} alt="" />
      </div>
      <ModalText resultCase={resultCase} userName={userName} price={price} buyer={buyer} seller={seller} />
      {/* 22.10.11 수정 start: 로티 더미 교체 */}
      {isSuccess && <div className={cn('lottie-area')} ref={bgLottie}></div>}
      {/* 22.10.11 수정 end: 로티 더미 교체 */}
    </ModalLayout>
  );
};

const ModalHeader = ({ resultCase }: { resultCase: resultCaseType }) => {
  const { t } = useTranslation(['marketplace', 'common']);
  switch (resultCase) {
    case 'auctionSuccess':
      return <span>{t('buyResultModal.successTitle', { ns: 'common' })}</span>;
    case 'auctionFail':
      return <span>{t('buyResultModal.failTitle', { ns: 'common' })}</span>;
    case 'offerExpired':
      // 22.11.17 수정: 다국어 수정
      return <span>{t('buyResultModal.expiredTitle', { ns: 'common' })}</span>;
    case 'openForOffersSuccess':
      // 22.11.17 수정: 다국어 수정
      return <span>{t('buyResultModal.successTitle', { ns: 'common' })}</span>;
    case 'openForOffersFail':
      return <span>{t('buyResultModal.offerFailTitle', { ns: 'common' })}</span>;
    case 'sellBuyNow':
      return <span>{t('buyResultModal.successTitle', { ns: 'common' })}</span>;
    default:
      return <span>'wrong case'</span>;
  }
};

const ModalText = ({
  resultCase,
  userName,
  price,
  buyer,
  seller,
}: {
  resultCase: resultCaseType;
  userName: string;
  price: number | undefined;
  buyer: string | undefined;
  seller: string | undefined;
}) => {
  const formatedPrice = price?.toLocaleString();
  // 22.11.17 수정: 다국어 추가
  const { t } = useTranslation(['marketplace', 'common']);

  switch (resultCase) {
    case 'auctionSuccess':
      return (
        // 5.2.5 NFT_Popup_Buy_Auction_Success
        <p className={cn('text-content')}>
          <Trans
            i18nKey={'buyResultModal.successDesc'}
            ns="common"
            values={{
              price: `${formatedPrice}`,
              unit: 'wemix$',
            }}
          />
        </p>
      );
    case 'auctionFail':
      return (
        // 5.2.5.1 NFT_Popup_Buy_Auction_Fail
        <p className={cn('text-content')}>
          <Trans
            i18nKey={'buyResultModal.failDesc'}
            ns="common"
            values={{
              user: `${userName}`,
              price: `${formatedPrice}`,
              unit: 'WEMIX$',
            }}
          />
        </p>
      );
    // 22.11.17 수정 start: 다국어 수정
    case 'offerExpired':
      return (
        // 5.2.5.7 NFT_Popup_Buy_Offer expired
        <p className={cn('text-content')}>{t('buyResultModal.expiredDesc', { ns: 'common' })}</p>
      );
    case 'openForOffersSuccess':
      return (
        // 5.2.5.2 NFT_Popup_Buy_Open for Offers_Success
        <p className={cn('text-content')}>
          <Trans
            i18nKey={'buyResultModal.offerSuccessDesc'}
            ns="common"
            values={{
              user: `${userName}`,
              price: `${formatedPrice}`,
              unit: 'WEMIX$',
            }}
          />
        </p>
      );
    case 'openForOffersFail':
      return (
        // 5.2.5.3 NFT_Popup_Buy_Open for Offers_Fail
        <p className={cn('text-content')}>{t('buyResultModal.offerFailDesc', { ns: 'common' })}</p>
      );
    case 'sellBuyNow':
      return (
        // 5.2.5.6 NFT_Popup_Sell_Buy Now
        <p className={cn('text-content')}>
          <Trans
            i18nKey={'buyResultModal.sellBuyDesc'}
            ns="common"
            values={{
              user: `${buyer}`,
              price: `${formatedPrice}`,
              unit: 'WEMIX$',
            }}
          />
        </p>
      );
    // 22.11.17 수정 end: 다국어 수정
    default:
      return <span>'wrong case'</span>;
  }
};

const ModalButton = ({ resultCase }: { resultCase: resultCaseType }) => {
  const { t } = useTranslation(['marketplace', 'common']);

  switch (resultCase) {
    case 'auctionSuccess':
      return <BgButton buttonText={t('marketplaceModal.completePayment', { ns: 'common' })} color="black" size="lg" key="result-case-btn" />;
    case 'auctionFail':
      return <BgButton buttonText={t('marketplaceModal.getMyBidBack', { ns: 'common' })} color="black" size="lg" key="result-case-btn" />;
    case 'offerExpired':
      return <BgButton buttonText={t('marketplaceModal.getMyBidBack', { ns: 'common' })} color="black" size="lg" key="result-case-btn" />;
    case 'openForOffersSuccess':
      // 22.11.17 수정: 다국어 수정
      return <BgButton buttonText={t('marketplaceModal.okay', { ns: 'common' })} color="black" size="lg" key="result-case-btn" />;
    case 'openForOffersFail':
      return <BgButton buttonText={t('marketplaceModal.getMyBidBack', { ns: 'common' })} color="black" size="lg" key="result-case-btn" />;
    case 'sellBuyNow':
      // 22.11.17 수정: 다국어 수정
      return <BgButton buttonText={t('marketplaceModal.okay', { ns: 'common' })} color="black" size="lg" key="result-case-btn" />;
    default:
      return <span>'wrong case'</span>;
  }
};

export default BuyResultModal;
