import { useEffect, useState } from 'react';
import useWindowResize from '@/hook/useWindowResize';
import useScrollLock from '@/hook/useScrollLock';

// 22.11.02 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

import { Checkbox, Collapse, Drawer } from 'antd';
import OutlineButton from '@/components/button/OutlineButton';
import BgButton from '@/components/button/BgButton';
import IconButton from '@/components/button/IconButton';
import { useAtom, useAtomValue } from 'jotai';
import { visibleMyPageFilterAtom } from '@/state/filterAtom';
/* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';

const { Panel } = Collapse;

interface filterType {
  category: number;
  status: any[];
}

/* 23.04.05 수정: Props 추가 */
// bid 탭에서 노출되는 필터에서 status를 노출하지 않는다고 합니다.
interface Props {
  type?: 'bid';
}

const MypageFilter = ({ type }: Props) => {
  // 22.11.02 수정: useTranslation 추가
  const { t } = useTranslation(['mypage', 'common']);
  /* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [filterChecked, setFilterChecked] = useState<filterType>({
    category: 0,
    status: [],
  });

  const [open, setOpen] = useState<boolean>(false);
  const [filterSelected, setFilterSelected] = useState(0);
  const [destroyFilter, setDestroyFilter] = useState(false);
  const { lockScroll } = useScrollLock();

  useEffect(() => {
    lockScroll(open);
  }, [open]);

  const [visibleMyPageFilter, setVisibleMyPageFilter] = useAtom(visibleMyPageFilterAtom);

  const showDrawer = () => {
    setOpen(true);
    setVisibleMyPageFilter(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  const filterOptions = {
    collection: [
      {
        label: 'LUS264',
        value: 'LUS264',
      },
      {
        label: 'Tangled',
        value: 'Tangled',
      },
    ],
  };

  const onChangeCollection = (checkedValues: any) => {
    setFilterChecked({
      ...filterChecked,
      category: checkedValues.length,
    });
  };
  const onChangeStatus = (checkedValues: any) => {
    setFilterChecked({
      ...filterChecked,
      status: checkedValues,
    });
  };
  /* 22.11.01 수정: filter 컨텐츠 변경 */
  const statusFilter = [t('upcoming'), t('auctionClosed'), t('openForOffers'), t('onAuction'), t('buyNow'), t('notForSale')];
  // Activity 상태일 경우
  // const statusFilter = [
  //   t('statusFilter.sales'),
  //   t('statusFilter.listings'),
  //   t('statusFilter.offers'),
  //   t('statusFilter.bidings'),
  //   t('statusFilter.checkout'),
  //   t('statusFilter.transfers'),
  //   t('statusFilter.minted'),
  // ];

  useEffect(() => {
    setFilterSelected(filterChecked.category);
  }, [filterChecked]);

  useEffect(() => {
    if (visibleMyPageFilter) {
      onClose();
      setFilterChecked({ category: 0, status: [] });
      setDestroyFilter(true);
    } else {
      setDestroyFilter(false);
    }
  }, [visibleMyPageFilter]);

  const filters = () => {
    return (
      <div className={cn('filter-wrap')}>
        <Collapse expandIconPosition="end" className={cn('filter-1depth')} defaultActiveKey={['1', '2']}>
          <Panel header="Collection" key="1">
            <Checkbox.Group options={filterOptions.collection} onChange={onChangeCollection} />
          </Panel>
          {/* TODO: 작업자 확인 필요 */}
          {/* 22.11.01 수정: panel header status -> type 으로 변경 */}
          {/* 23.04.05 수정: bid일때 status 필터 제거 */}
          {type !== 'bid' && (
            <Panel header="Status" key="2">
              <Checkbox.Group options={statusFilter} onChange={onChangeStatus} />
            </Panel>
          )}
        </Collapse>
        <OutlineButton buttonText={t('filter.resetFilter', { ns: 'common' })} color="black" size="md" iconType iconValue="reset" />
        {isMobile && <BgButton buttonText="Apply" color="black" size="md" onClick={onClose} />}
      </div>
    );
  };

  return (
    <div className={cn('filter-btn-wrap')}>
      {filterSelected > 0 ? <span className={cn('filter-selected-num')}>{filterSelected}</span> : ''}
      <OutlineButton buttonText="Filters" color="black" size="md" iconType iconValue="filter" onClick={showDrawer} />
      <Drawer
        title={t('filter.title', { ns: 'common' })}
        open={open}
        placement="left"
        closable={false}
        onClose={onClose}
        key="left"
        maskClosable={false}
        mask={false}
        extra={<IconButton iconValue="close" onClick={onClose} buttonText="Close" size="32" />}
        className="filter-inner-wrap filter-mypage"
        destroyOnClose={destroyFilter}
      >
        {filters()}
      </Drawer>
    </div>
  );
};

export default MypageFilter;
