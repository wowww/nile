import { useEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'lodash';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import cn from 'classnames';

import LusMainInfo from '@/components/life/lus/LusMainInfo';
import Overview from '@components/life/lus/Overview';
import ArtistInfo from '@/components/life/lus/ArtistInfo';
import VideoArea from '@/components/life/lus/VideoArea';
import Generation from '@/components/life/lus/Generation';
import People from '@/components/life/lus/People';
import AuctionGuide from '@/components/life/lus/AuctionGuide';

const Lus = () => {
  /* 22.10.27 수정 start: floating bar 액션 제어용 코드 추가 */
  const [showFloating, setShowFloating] = useState(false);
  const productInfoRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<Document>();

  const throttleHandler = useMemo(
    () =>
      throttle(() => {
        const { pageYOffset } = window;
        const productInfoOffset = productInfoRef.current?.offsetTop as number;
        const productInfoHeight = productInfoRef.current?.scrollHeight as number;

        if (pageYOffset > productInfoOffset + productInfoHeight + 50) {
          setShowFloating(true);
        } else {
          setShowFloating(false);
        }
      }, 300),
    [],
  );

  useEffect(() => {
    documentRef.current = document;
    const documentCurrent = documentRef.current;

    documentCurrent.addEventListener('scroll', throttleHandler);
    return () => {
      documentCurrent.removeEventListener('scroll', throttleHandler);
    };
  }, [throttleHandler]);

  return (
    <>
      <Helmet>
        <title>LUS264 &gt; Life &gt; NILE</title>
        <body className={cn('has-floating')} />
      </Helmet>
      <div>
        <LusMainInfo ref={productInfoRef} />
        <Overview />
        <Generation />
        <People />
        <AuctionGuide />
        <ArtistInfo />
        <VideoArea />
        {/* <LifeFloatingBar time="duy-now" sellType="auction" nftLink="/" classNames={`${showFloating ? 'active' : ''}`} /> */}
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'life'])),
    },
  };
};

export default Lus;
