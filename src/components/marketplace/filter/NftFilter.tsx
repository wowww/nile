import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { Checkbox, Collapse, Form, Radio, RadioChangeEvent } from 'antd';
import { ReactSVG } from 'react-svg';

import { useTranslation } from 'next-i18next';
import { useAtom } from 'jotai';
import { FILTER_SORTING_DEFAULT, FilterType, tokenFilterAtom } from '@/state/filterAtom';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import CommonFilter from '@components/marketplace/filter/CommonFilter';
import { nftTabPageAtom } from '@/state/marketplace';
import { useSetAtom } from 'jotai';
import { useLayoutResize } from '@utils/layout';

const { Panel } = Collapse;

const nftCategories = [
  {
    name: 'SNKR2',
    slug: 'SNKRZ',
    logoUrl: '/temp/@temp_alarm_SNKR2.png',
  },
  {
    name: 'Tangled',
    slug: 'TTPS',
    logoUrl: '/temp/@temp_alarm_Tangled.png',
  },
  {
    name: 'City of RA',
    slug: 'CORA',
    logoUrl: '/temp/@temp_alarm_CORA.png',
  },
  {
    name: 'Kari',
    slug: 'KARI',
    logoUrl: '/temp/@temp_alarm_KARI.png',
  },
  {
    name: 'City of NEITH',
    slug: 'CONE',
    logoUrl: '/temp/@temp_alarm_CONE.png',
  },
  {
    name: 'Sights of NILE',
    slug: 'SON',
    logoUrl: '/temp/@temp_alarm_Sights_of_NILE.png',
  },
  {
    name: 'LUS264',
    slug: 'LUS',
    logoUrl: '/temp/@temp_alarm_LUS.png',
  },
  { name: 'All collection', slug: '', logoUrl: '/temp/@temp_alarm_NILE.png' },
];

const NftFilter = () => {
  const { t } = useTranslation('common');

  const [selectedFilter, setSelectedFilter] = useState<FilterType>({
    sorting: FILTER_SORTING_DEFAULT,
    status: [],
    type: [],
    collectionSlug: 'SNKRZ',
  });
  const { isMobile } = useLayoutResize();

  const [sharedFilter, setSharedFilter] = useAtom(tokenFilterAtom);
  const setCurrentPage = useSetAtom(nftTabPageAtom);

  const statusFilter = [{ label: t('upcoming'), value: 'TO_BE_OPENED' }];

  const typeFilter = [
    { label: t('onAuction'), value: 'AUCTION' },
    { label: t('onSale'), value: 'FIXED_PRICE' },
  ];

  const changeCollectionActiveKey = useCallback((e: RadioChangeEvent) => {
    setSelectedFilter((prev) => ({ ...prev, collectionSlug: e.target.value }));
  }, []);


  return (
    <CommonFilter
      sharedFilter={sharedFilter}
      setSharedFilter={setSharedFilter}
      selectedFilterForMobile={selectedFilter}
      setSelectedFilterForMobile={setSelectedFilter}
      setPage={setCurrentPage}
    >
      <dl className={cn('filter-1depth-list')}>
        <div className={cn('filter-detail-list-wrap')}>
          <dt>Collection</dt>
          <dd>
            <Form.Item name={['collectionSlug']}>
              <Radio.Group onChange={changeCollectionActiveKey}>
                <Collapse
                  accordion
                  expandIconPosition="end"
                  className={cn('filter-2depth')}
                  expandIcon={() => <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_check.svg" />}
                  activeKey={isMobile ? `panel-${selectedFilter.collectionSlug}` : `panel-${sharedFilter.collectionSlug}`}
                  defaultActiveKey={`panel-${sharedFilter.collectionSlug}`}
                >
                  {nftCategories?.map((category) => {
                    return (
                      <Panel
                        key={`panel-${category.slug}`}
                        header={
                          <Radio value={category.slug}>
                            <span className={cn('img-wrap')}>
                              <Image src={category.logoUrl} alt="" layout="fill" loader={NileCDNLoader} objectFit="cover" />
                            </span>
                            <span className={cn('text-wrap')}>{category.name}</span>
                          </Radio>
                        }
                      />
                    );
                  })}
                </Collapse>
              </Radio.Group>
            </Form.Item>
          </dd>
        </div>
        <div className={cn('filter-detail-list-wrap')}>
          <dt>{t('filter.status')}</dt>
          <dd>
            <Form.Item name={['status']}>
              <Checkbox.Group options={statusFilter} />
            </Form.Item>
            <Form.Item name={['type']}>
              <Checkbox.Group options={typeFilter} />
            </Form.Item>
          </dd>
        </div>
      </dl>
    </CommonFilter>
  );
};

export default NftFilter;
