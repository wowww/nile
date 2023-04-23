import cn from 'classnames';
import { Collapse, Form, Input, Select } from 'antd';
import { ReactSVG } from 'react-svg';
import OutlineButton from '@components/button/OutlineButton';
import BgButton from '@components/button/BgButton';
import { FILTER_SORTING_DEFAULT, FilterType } from '@/state/filterAtom';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import IconButton from '@components/button/IconButton';
import dynamic from 'next/dynamic';
import { useLayoutResize } from '@utils/layout';
import useScrollLock from '@/hook/useScrollLock';

const { Panel } = Collapse;
const { Option } = Select;

const Drawer = dynamic(() => import('antd/lib/drawer'), { ssr: false });

interface CommonFilterProps {
  sharedFilter: FilterType;
  setSharedFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  selectedFilterForMobile?: FilterType;
  setSelectedFilterForMobile?: React.Dispatch<React.SetStateAction<FilterType>>;
  isCollectionFilter?: boolean;
  children?: ReactNode;
  setPage?: (v: number) => void;
}

const CommonFilter = ({
  sharedFilter,
  setSharedFilter,
  selectedFilterForMobile,
  setSelectedFilterForMobile,
  isCollectionFilter,
  children,
  setPage,
}: CommonFilterProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation('common');

  const [open, setOpen] = useState<boolean>(false);
  const selectedCount = useMemo(() => 0, []);
  const { isMobile, isDesktop } = useLayoutResize();
  const { lockScroll } = useScrollLock();

  useEffect(() => {
    lockScroll(isMobile && open);
    if (isMobile && open) {
      setSelectedFilterForMobile?.({ ...sharedFilter });
    }
  }, [isMobile, open]);

  const onValuesChange = useCallback((values: any) => {
    setPage?.(1);
    setSelectedFilterForMobile?.((prev) => ({ ...prev, ...values }));
  }, []);

  const onFinish = useCallback((values: any) => {
    setSharedFilter({ ...values });
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setSharedFilter({ ...selectedFilterForMobile });
    }
  }, [selectedFilterForMobile]);

  const onClickReset = useCallback(() => {
    form.setFieldValue('sorting', 'endAt,asc|orderId,desc');
    form.setFieldValue('status', []);
    form.setFieldValue('type', []);

    setSelectedFilterForMobile?.(() => ({ ...form.getFieldsValue() }));
  }, [form]);

  const filters = () => {
    return (
      <Form
        className={cn('filter-wrap')}
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValues={{
          status: sharedFilter.status,
          type: sharedFilter.type,
          sorting: sharedFilter.sorting,
          price: 'WEMIX$',
          unit: 'WEMIX$',
          collectionSlug: sharedFilter.collectionSlug,
        }}
      >
        <Collapse expandIconPosition="end" className={cn('filter-1depth', { 'nft-filter-1depth': !isCollectionFilter })} defaultActiveKey={2}>
          {children}
          <Panel header={t('filter.details')} key="3">
            <dl className={cn('filter-detail-list-wrap')}>
              {/*<dt>{t('filter.priceRange')}</dt>*/}
              {/*<dd>*/}
              {/*  <div className={cn('input-group-wrap')}>*/}
              {/*    {isMobile ? (*/}
              {/*      <Input placeholder="Min" size="middle" />*/}
              {/*    ) : (*/}
              {/*      <Form.Item name={['price', 'min']}>*/}
              {/*        <Input placeholder="Min" size="middle" />*/}
              {/*      </Form.Item>*/}
              {/*    )}*/}
              {/*    <span>to</span>*/}
              {/*    {isMobile ? (*/}
              {/*      <Input placeholder="Max" size="middle" />*/}
              {/*    ) : (*/}
              {/*      <Form.Item name={['price', 'max']}>*/}
              {/*        <Input placeholder="Max" size="middle" />*/}
              {/*      </Form.Item>*/}
              {/*    )}*/}
              {/*  </div>*/}
              {/*  <Form.Item name={['price', 'unit']}>*/}
              {/*    <Select*/}
              {/*      size="middle"*/}
              {/*      className={cn('width-full')}*/}
              {/*      suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}*/}
              {/*      popupClassName="select-size-md-dropdown"*/}
              {/*      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}*/}
              {/*    >*/}
              {/*      <Option value="WEMIX$">WEMIX$</Option>*/}
              {/*      <Option value="WEMIX">WEMIX</Option>*/}
              {/*    </Select>*/}
              {/*  </Form.Item>*/}
              {/*  {isMobile && <OutlineButton buttonText={t('filter.setPrice')} color="black" size="sm" />}*/}
              {/*</dd>*/}
              <dt>Sorting</dt>
              <dd>
                <Form.Item name={['sorting']} initialValue={FILTER_SORTING_DEFAULT}>
                  <Select
                    size="middle"
                    className={cn('width-full')}
                    suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
                    popupClassName="select-size-md-dropdown"
                    listHeight={100}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                  >
                    <Option value={FILTER_SORTING_DEFAULT}>{t('sorting.recentlyActive')}</Option>
                    {/* {form.getFieldValue('status') && form.getFieldValue('status').includes('OPEN') && ( */}
                    {/*   <Option value="order.endAt,asc">{t('sorting.endingSoon')}</Option> */}
                    {/* )} */}
                    <Option value="createdAt,desc">{t('sorting.newest')}</Option>
                    <Option value="createdAt,asc">{t('sorting.oldest')}</Option>
                    {/* <Option value="price,desc">{t('sorting.highestPrice')}</Option> */}
                    {/* <Option value="price,asc">{t('sorting.lowestPrice')}</Option> */}
                  </Select>
                </Form.Item>
              </dd>
            </dl>
          </Panel>
        </Collapse>
        <OutlineButton buttonText={t('filter.resetFilter')} color="black" size="md" iconType iconValue="reset" onClick={onClickReset} />
        {isMobile && <BgButton htmlType="submit" buttonText="Apply" color="black" size="md" />}
      </Form>
    );
  };

  return (
    <>
      {isDesktop ? (
        <div className={cn('filter-btn-wrap')}>
          {selectedCount > 0 ? <span className={cn('filter-selected-num')}>{selectedCount}</span> : ''}
          <OutlineButton buttonText={t('filter.title')} color="black" size="md" iconType iconValue="filter" onClick={() => setOpen(true)} />
          <Drawer
            title={t('filter.title')}
            open={open}
            placement="left"
            closable={false}
            onClose={() => setOpen(false)}
            key="left"
            maskClosable={false}
            mask={false}
            extra={
              <IconButton
                iconValue="close"
                onClick={() => {
                  setSelectedFilterForMobile?.({ ...sharedFilter });
                  setOpen(false);
                }}
                buttonText="Close"
                size="32"
              />
            }
            className="filter-inner-wrap"
            forceRender
          >
            {filters()}
          </Drawer>
        </div>
      ) : (
        filters()
      )}
    </>
  );
};

export default CommonFilter;
