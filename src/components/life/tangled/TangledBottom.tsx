/* 22.10.27 수정: forwardRef 추가 */
import { forwardRef, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { Tabs } from 'antd';
import TangledNfts from '@/components/life/tangled/TangledNfts';
import TangledOverview from '@/components/life/tangled/TangledOverview';
import TangledInformation from '@/components/life/tangled/TangledInformation';
import TangledNeithStation from '@/components/life/tangled/TangledNeithStation';

/* 22.10.27 수정: forwardRef 추가 */
const TangledBottom = forwardRef<HTMLDivElement>(({}, ref) => {
  const [currentTab, setCurrentTab] = useState<string>('nft');
  /* 22.10.26 수정: currentState 추가 */
  const [currentState, setCurrentState] = useState<string>('upcoming');
  const { t } = useTranslation(['life', 'common']);

  const tangledTabs = [
    {
      label: 'Overview',
      key: 'overview',
      children: <TangledOverview />,
    },
    {
      label: 'NFT',
      key: 'nft',
      children: <TangledNfts />,
    },
    {
      label: 'NEITH Station',
      key: 'neithStation',
      children: <TangledNeithStation />,
    },
  ];

  return (
    <div className={cn('life-tangled-bottom-section')}>
      {/* 22.10.26 수정 start: Auction 판매 중 케이스 추가 */}

      {/* Auction 시작 전 */}

      {/* 22.11.24 수정: 타이머 삭제 */}
      {/* {currentState === 'upcoming' && (
        <div className={cn('tangled-time')} ref={ref}>
          <strong>
            {t('salesStartsIn', { ns: 'common' })}
            <button
              className={cn('time-notice')}
              onClick={() => message.info({ content: t('toastMessage.requestAlarm', { ns: 'common' }), key: 'toast' })}
            >
              <IconNotice />
            </button>
          </strong>
          <TimeList target={process.env.NEXT_PUBLIC_ENV_NFT_TANGLED_START_DATE} />
        </div>
      )} */}

      {/* Auction 판매 중 */}
      {currentState === 'buy-now' && (
        /* 22.10.27 수정: ref 추가 */
        <div className={cn('tangled-sale')} ref={ref}>
          <dl>
            <dt>{t('fixedPrice', { ns: 'common' })}</dt>
            <dd>1,100 WEMIX$</dd>
          </dl>
          <dl>
            <dt>{t('nFTLeft', { ns: 'common' })}</dt>
            <dd>214/1,000</dd>
          </dl>
        </div>
      )}

      {/* 22.10.26 수정 end: Auction 판매 중 케이스 추가 */}
      <Tabs
        destroyInactiveTabPane
        activeKey={currentTab}
        className={cn('tab-type tab-lg tab-full')}
        items={tangledTabs}
        onTabClick={(key: string) => {
          setCurrentTab(key);
        }}
      />
      <TangledInformation />
    </div>
  );
});

export default TangledBottom;
