import { useState, useRef, useEffect, useMemo } from 'react';
import { throttle } from 'lodash';
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import NileTop from '@/components/life/nile/NileTop';
import NileBottom from '@/components/life/nile/NileBottom';
// 22.11.18 수정: 22일 오픈 컨텐츠로 LifeFloatingBar 추가
import LifeFloatingBar from '@/components/life/LifeFloatingBar';

const SightsOfNile = () => {
  // 22.11.18 수정 start: 22일 오픈 컨텐츠로 LifeFloatingBar 추가
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
    []
  );

  useEffect(() => {
    documentRef.current = document;
    const documentCurrent = documentRef.current;

    documentCurrent.addEventListener('scroll', throttleHandler);
    return () => {
      documentCurrent.removeEventListener('scroll', throttleHandler);
    };
  }, [throttleHandler]);

  // 22.11.18 수정 end: 22일 오픈 컨텐츠로 LifeFloatingBar 추가

  return (
    <>
      <Helmet>
        <title>Sights of Nile &gt; Life &gt; NILE</title>
        <body className={cn('has-floating')} />
      </Helmet>
      <div className={cn('life-nile')}>
        <NileTop ref={productInfoRef} />
        <NileBottom />
        {/*<LifeFloatingBar time="buy-now" sellType="auction" nftLink="/marketplace/SON3/1" classNames={`${showFloating ? 'active' : ''}`} multiPiece />*/}
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

export default SightsOfNile;
