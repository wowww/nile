import { useState } from 'react';

import cn from 'classnames';
// 22.11.02 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';

import { ReactSVG } from 'react-svg';

import { mypageNftCardData } from '@/components/mypage/mypageData';

import { Select } from 'antd';
import TextButton from '@/components/button/TextButton';
import Empty from '@/components/empty/Empty';
import PaginationCustom from '@/components/button/PaginationCustom';
import MypageFilter from '@/components/mypage/MypageFilter';
/* 22.11.21 수정: uid 추가 */
import { uuid } from 'uuidv4';

const { Option } = Select;

const MypageNftCreated = () => {
  // 22.11.02 수정: useTranslation 추가
  const { t } = useTranslation(['mypage', 'common']);
  const [activatePagination, setPaginationActivate] = useState(1);
  /* 22.11.21 수정: uid 추가 */
  const Id = uuid();

  const onChange = (page: number) => {
    // 현재 active 된 페이지 체크
    setPaginationActivate(page);
  };

  return (
    <>
      <div className={cn('mypage-utils')}>
        <div className={cn('filters-wrap')}>
          <MypageFilter />
        </div>
        <div className={cn('utils-wrap')}>
          <Select
            size="middle"
            defaultValue={t('recently')}
            /* 22.11.21 수정: 셀렉트 키값 추가 */
            key={Id}
            suffixIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />}
            popupClassName="select-size-md-dropdown"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          >
            <Option value="recently">{t('sorting.1')}</Option>
            <Option value="ending">{t('sorting.2')}</Option>
            <Option value="oldest">{t('sorting.3')}</Option>
            <Option value="highest">{t('sorting.4')}</Option>
            <Option value="lowest">{t('sorting.5')}</Option>
            <Option value="lowest">{t('sorting.6')}</Option>
          </Select>
        </div>
      </div>
      <div className={cn('mypage-cards')}>
        <span className={cn('total-num')}>0 NFT</span>
        {mypageNftCardData.length > 0 ? (
          <>
            {/* 22.11.18 수정: 아바타 사이즈 프롭스 추가 */}
            {/*<MarketplaceCard cardData={mypageNftCardData} avatarSize={20} />*/}
            <PaginationCustom defaultCurrent={1} defaultPageSize={10} total={140} onChange={onChange} activate={activatePagination} />
          </>
        ) : (
          <Empty
            subText={t('empty.ownedNft')}
            button={<TextButton buttonText="Go Marketplace" iconValue="arrow" size="sm" href="/marketplace" type="link" />}
          />
        )}
      </div>
    </>
  );
};

export default MypageNftCreated;
