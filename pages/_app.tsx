import React, { StrictMode, useCallback, useEffect, useMemo, useState } from 'react';
import { AppProps } from 'next/app';
import type { Locale as RcPickerLocale } from 'rc-picker/lib/interface';
import { Footer, Header } from '@components';
import Head from 'next/head';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { HelmetProvider } from 'react-helmet-async';
import 'tailwindcss/tailwind.css';
import '@styles/global.css';
import '@scss/common.scss';
import Script from 'next/script';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSetAtom } from 'jotai';
import { addressListAtom, contractsAtom, daoAddressListAtom, daoContractsAtom, tokensAtom } from '@/state/web3Atom';
import { web3Init } from '@/web3/contracts';
import { useRouter } from 'next/router';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import koKR from 'antd/lib/locale/ko_KR';
import { AdditionalPickerLocaleLangProps } from 'antd/es/date-picker/generatePicker';
import moment from 'moment';
import { useImmersiveMode } from '@/hook/useImmersiveMode';
import { useCookies } from 'react-cookie';
import { NileApiService } from '@/services/nile/api';
import { daoThemeAtom, daoVisibleMenuAtom } from '@/state/daoAtom';
import { MediaQueryProvider } from '@/hook/useMediaQuery';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(duration);

// BigInt.prototype.toJSON = function () {
//   return this.toString();
// };

if (process.env.NEXT_PUBLIC_ENV_PROFILE === 'production') {
  console.log = () => {
    // do nothing
  };
  console.table = () => {
    // do nothing
  };
}

const Application = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const asPath = router.asPath;
  const { i18n } = useTranslation();

  const [locale, setLocal] = useState(enUS);
  const resetWindowScrollPosition = useCallback(() => window.scrollTo(0, 0), []);

  const setActiveDao = useSetAtom(daoThemeAtom);
  const setDaoVisibleMenu = useSetAtom(daoVisibleMenuAtom);
  const immersiveMode = useImmersiveMode();

  const api = NileApiService();

  const [cookies, setCookie, removeCookie] = useCookies(['nileGuest']);

  useEffect(() => {
    console.log('cookies', cookies);
    if (!cookies.nileGuest) {
      api.user.guest().then(() => {
        console.log('guest ok');
      });
    } else {
      console.log(cookies.nileGuest);
    }
  }, [cookies]);

  useEffect(() => {
    const daoPath = router.asPath.split('/');

    if (router.asPath.startsWith('/dao') || router.asPath.startsWith('/ko/dao')) {
      if (daoPath.includes('wonder')) {
        setActiveDao({ value: 'wonder' });
      } else if (daoPath.includes('arteum')) {
        setActiveDao({ value: 'arteum' });
      } else if (daoPath.includes('delta')) {
        setActiveDao({ value: 'delta' });
      } else if (daoPath.includes('oracle')) {
        setActiveDao({ value: 'oracle' });
      } else if (daoPath.includes('topstpot')) {
        setActiveDao({ value: 'topstpot' });
      }
    }
  }, []);

  useEffect(() => {
    window.onbeforeunload = () => {
      resetWindowScrollPosition();
    };
  }, [resetWindowScrollPosition]);

  const setTokens = useSetAtom(tokensAtom);

  const setContract = useSetAtom(contractsAtom);
  const setDaoContract = useSetAtom(daoContractsAtom);
  const setAddressList = useSetAtom(addressListAtom);
  const setDaoAddressList = useSetAtom(daoAddressListAtom);

  useEffect(() => {
    web3Init().then((data) => {
      const { marketContracts, marketAddresses, daoContracts, daoAddresses, tokens } = data;
      setContract(marketContracts);
      setDaoContract(daoContracts);
      setAddressList(marketAddresses);
      setDaoAddressList(daoAddresses);
      setTokens(new Map(Object.entries(tokens)));
    });
  }, []);

  useEffect(() => {
    moment.locale(i18n.language);

    if (i18n.language === 'ko') setLocal(koKR);
    else setLocal(enUS);
  }, [i18n.language]);

  useEffect(() => {
    if (router.asPath.includes('dao') && router.asPath.split('/').length > 2) {
      setDaoVisibleMenu(true);
    } else {
      setDaoVisibleMenu(false);
    }
  }, [router.asPath]);

  const ogImage = useMemo(() => (router.asPath.match(/dao\/*/) ? '/NILE_DAO_OGTag.png' : '/NILE_OGTag.png'), [asPath]);

  const langConfig: RcPickerLocale & AdditionalPickerLocaleLangProps = useMemo(() => {
    if (i18n.language === 'ko') {
      return {
        locale: 'ko_KR',
        placeholder: 'Select date',
        rangePlaceholder: ['Start date & time', 'End date & time'],
        today: '현재로 설정하기',
        now: '현재로 설정하기',
        backToToday: 'Back to today',
        ok: 'OK',
        clear: 'Clear',
        month: 'Month',
        year: 'Year',
        timeSelect: 'Select time',
        dateSelect: 'Select date',
        monthSelect: 'Choose a month',
        yearSelect: 'Choose a year',
        decadeSelect: 'Choose a decade',
        yearFormat: 'YYYY년',
        dateFormat: 'M/D/YYYY',
        dayFormat: 'D',
        dateTimeFormat: 'M/D/YYYY HH:mm:ss',
        monthFormat: 'M월',
        monthBeforeYear: false,
        previousMonth: 'Previous month (PageUp)',
        nextMonth: 'Next month (PageDown)',
        previousYear: 'Last year (Control + left)',
        nextYear: 'Next year (Control + right)',
        previousDecade: 'Last decade',
        nextDecade: 'Next decade',
        previousCentury: 'Last century',
        nextCentury: 'Next century',
      };
    }
    return {
      locale: 'en_US',
      placeholder: 'Select date',
      rangePlaceholder: ['Start date & time', 'End date & time'],
      today: 'Now',
      now: 'Now',
      backToToday: 'Back to today',
      ok: 'OK',
      clear: 'Clear',
      month: 'Month',
      year: 'Year',
      timeSelect: 'Select time',
      dateSelect: 'Select date',
      monthSelect: 'Choose a month',
      yearSelect: 'Choose a year',
      decadeSelect: 'Choose a decade',
      yearFormat: 'YYYY',
      dateFormat: 'M/D/YYYY',
      dayFormat: 'D',
      dateTimeFormat: 'M/D/YYYY HH:mm:ss',
      monthFormat: 'MMM',
      monthBeforeYear: true,
      previousMonth: 'Previous month (PageUp)',
      nextMonth: 'Next month (PageDown)',
      previousYear: 'Last year (Control + left)',
      nextYear: 'Next year (Control + right)',
      previousDecade: 'Last decade',
      nextDecade: 'Next decade',
      previousCentury: 'Last century',
      nextCentury: 'Next century',
    };
  }, [i18n]);

  return (
    <StrictMode>
      <HelmetProvider>
        <ConfigProvider
          locale={{
            ...locale,
            DatePicker: {
              lang: langConfig,
              timePickerLocale: {
                placeholder: 'Select time',
              },
              dateFormat: 'YYYY-MM-DD',
              dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
              weekFormat: 'YYYY-wo',
              monthFormat: 'YYYY-MM',
            },
          }}
        >
          <MediaQueryProvider>
            <Head>
              <title>{router.asPath.includes('/dao') && router.asPath.split('/').length > 2 ? 'WONDER DAO' : 'NILE'}</title>
              <meta name="description" content="DAO & LIFE platform based on the WEMIX3.0 mainnet" />
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <meta property="og:type" content="website" />
              <meta property="og:title" content={`NILE`} />
              <meta property="og:description" content="DAO & LIFE platform" />
              <meta property="og:article:author" content="WEMADE" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
              <meta property="og:url" content={`https://www.nile.io${asPath}`} />
              <meta property="og:image" content={`https://nile.blob.core.windows.net/og-tags${ogImage}`}
                    data-react-helmet="true" />
              {/* Google Analytics */}
              <Script src="https://www.googletagmanager.com/gtag/js?id=G-MFZBL8E909" strategy="afterInteractive" />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-MFZBL8E909');
          `}
              </Script>
            </Head>
            {!immersiveMode && <Header />}
            {/*<div className="flex items-center justify-center px-5" style={{*/}
            {/*  height: '100vh',*/}
            {/*}}>*/}
            {/*  <div className="flex flex-col items-center justify-center my-8 lwux-6 md:mx-12">*/}
            {/*    <Image src={WillBeBack} height={240} width={300} className="w-full md:max-w-36" />*/}
            {/*    <p className="items-center align-center text-center text-2xl md:text-4xl"*/}
            {/*       style={{ textAlign: 'center', marginTop: '30px', fontFamily: 'Times', fontStyle: 'bold' }}>We'll be back in no*/}
            {/*      time!</p>*/}
            {/*    <p className="items-center text-center text-sm md:text-lg" style={{ fontFamily: 'Roboto' }}>Nile is currently undergoing maintenance*/}
            {/*      at this time.</p>*/}
            {/*    <p className="items-center text-center text-sm md:text-lg mt-6" style={{ marginTop: '32px' }}>- The NILE team -</p>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <Component {...pageProps} />
            {!immersiveMode && <Footer />}
            {/*{showBottom && !immersiveMode && <MarketplaceLiveBoard />}*/}
          </MediaQueryProvider>
          {/* 23.03.10 수정: useMediaQuery 추가 */}
        </ConfigProvider>
      </HelmetProvider>
    </StrictMode>
  );
};

export default appWithTranslation(Application);
