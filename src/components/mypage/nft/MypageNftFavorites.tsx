import { useState } from 'react';

import cn from 'classnames';
// 22.11.14 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';

import { ReactSVG } from 'react-svg';

import { Select } from 'antd';
import TextButton from '@/components/button/TextButton';
import Empty from '@/components/empty/Empty';
import FavoriteCards from '@/components/cards/FavoriteCards';
import PaginationCustom from '@/components/button/PaginationCustom';
import MypageFilter from '@/components/mypage/MypageFilter';

const { Option } = Select;

const MypageNftFavorites = () => {
  // 22.11.14 수정: useTranslation 추가
  const { t } = useTranslation(['mypage', 'common']);
  const [activatePagination, setPaginationActivate] = useState(1);

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
            defaultValue={t('sorting.1')}
            key={t('sorting.1')}
            suffixIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />}
            popupClassName="select-size-md-dropdown"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          >
            <Option value="recently">{t('sorting.1')}</Option>
            <Option value="ending">{t('sorting.2')}</Option>
            <Option value="ending">{t('sorting.3')}</Option>
            <Option value="highest">{t('sorting.4')}</Option>
            <Option value="lowest">{t('sorting.5')}</Option>
            <Option value="lowest">{t('sorting.6')}</Option>
          </Select>
        </div>
      </div>
      <div className={cn('mypage-cards')}>
        <span className={cn('total-num')}>0 NFT</span>
        {false ? (
          <>
            <FavoriteCards tokens={[]} />
            <PaginationCustom defaultCurrent={1} defaultPageSize={10} total={140} onChange={onChange} activate={activatePagination} />
          </>
        ) : (
          <Empty
            // 22.11.14 수정: 다국어 변환 작업
            subText={t('empty.favorites')}
            button={<TextButton buttonText={t('goToMarketplace', { ns: 'common' })} iconValue="arrow" size="sm" href="/marketplace" type="link" />}
          />
        )}
      </div>
    </>
  );
};

export default MypageNftFavorites;
