import { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Checkbox, Collapse, Form } from 'antd';
import Tag from '@components/tag/Tag';
import { ReactSVG } from 'react-svg';

import { useTranslation } from 'next-i18next';
import { NileCollectionCategory } from '@/models/nile/marketplace/NileCollection';
import { useAtom } from 'jotai';
import CommonFilter from '@components/marketplace/filter/CommonFilter';
import { NileApiService } from '@/services/nile/api';
import { collectionFilterAtom, FilterType } from '@/state/filterAtom';
import { TraitType } from '@/types/marketplace.types';
import { useSetAtom } from 'jotai';
import { collectionDetailPageAtom } from '@/state/marketplace';

const { Panel } = Collapse;

type CollectionFilterPropType = {
  traits: TraitType[];
};

const CollectionFilter = ({ traits }: CollectionFilterPropType) => {
  const { t } = useTranslation('common');
  const api = NileApiService();

  const [sharedFilter, setSharedFilter] = useAtom<FilterType>(collectionFilterAtom);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>({});
  const [categories, setCategories] = useState<NileCollectionCategory[]>([]);
  const setCurrentPage = useSetAtom(collectionDetailPageAtom);

  useEffect(() => {
    api.marketplace.collection
      .getCategories()
      .then(({ data }) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  const filter2Depth = (menu: string, selected: number) => {
    return (
      <div className={cn('filter-2depth-menu-inner')}>
        <strong>{menu}</strong>
        <span className={cn('filter-selected')}>
          {selected > 0 ? (
            <Tag size="xs" bg>
              {selected > 98 ? '+99' : selected}
            </Tag>
          ) : (
            ''
          )}
        </span>
      </div>
    );
  };

  const getSelectedCategoryCount = useCallback(
    (slug: string) => {
      return selectedFilter?.collections?.[slug]?.length ?? 0;
    },
    [selectedFilter],
  );

  const statusFilter = [{ label: t('upcoming'), value: 'TO_BE_OPENED' }];

  const typeFilter = [
    { label: t('onAuction'), value: 'AUCTION' },
    { label: t('buyNow'), value: 'FIXED_PRICE' },
  ];

  return (
    <CommonFilter
      sharedFilter={sharedFilter}
      setSharedFilter={setSharedFilter}
      selectedFilterForMobile={selectedFilter}
      setSelectedFilterForMobile={setSelectedFilter}
      setPage={setCurrentPage}
      isCollectionFilter
    >
      <Panel header={t('filter.properties')} key="1">
        <Collapse
          accordion
          expandIconPosition="end"
          className={cn('filter-2depth')}
          expandIcon={({ isActive }) => (
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" rotate={isActive ? 180 : 90} />
          )}
        >
          {traits?.map((trait) => {
            return (
              <Panel key={trait.id} header={filter2Depth(trait.name, getSelectedCategoryCount(trait.name))}>
                <Form.Item name={['properties']}>
                  <Form.Item name={[trait.name]}>
                    <Checkbox.Group options={trait.values.map((value) => ({ label: value.value, value: value.id }))} />
                  </Form.Item>
                </Form.Item>
              </Panel>
            );
          })}
        </Collapse>
      </Panel>
      <Panel header={t('filter.status')} key="2">
        <dl className={cn('filter-detail-list-wrap')}>
          <dt className={cn('a11y')}>{t('filter.status')}</dt>
          <dd>
            <Form.Item name={['status']}>
              <Checkbox.Group options={statusFilter} />
            </Form.Item>
            <Form.Item name={['type']}>
              <Checkbox.Group options={typeFilter} />
            </Form.Item>
          </dd>
        </dl>
      </Panel>
    </CommonFilter>
  );
};

export default CollectionFilter;
