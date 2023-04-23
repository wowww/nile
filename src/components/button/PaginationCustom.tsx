/* eslint-disable react/require-default-props */
import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { Pagination } from 'antd';
import { ReactSVG } from 'react-svg';
import useMediaQuery from '@/hook/useMediaQuery';

interface PaginationPropsType {
  activate?: number;
  defaultCurrent?: number;
  defaultPageSize?: number;
  current?: number;
  total?: number;
  onChange?: (page: number, pageSize: number) => void;
}

const PaginationCustom: React.FC<PaginationPropsType> = ({
  current,
  activate = 1,
  defaultCurrent = 1,
  defaultPageSize = 10,
  total = 0,
  onChange,
}) => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const paginationRef = useRef<HTMLDivElement>(null);

  const lastPage = Math.ceil(total / defaultPageSize);

  useEffect(() => {
    const hiddenFirstTarget = paginationRef.current?.querySelector('.ant-pagination-item-1') ?? document.body;
    const hiddenLastTarget = paginationRef.current?.querySelector(`.ant-pagination-item-${lastPage}`) ?? document.body;
    if (isMobile) {
      if (activate > 3) {
        hiddenFirstTarget.setAttribute('style', 'display: none');
      } else {
        hiddenFirstTarget.removeAttribute('style');
      }

      if (activate === lastPage - 3) {
        hiddenLastTarget.setAttribute('style', 'display: none');
      } else {
        hiddenLastTarget.removeAttribute('style');
      }
    } else {
      hiddenFirstTarget.removeAttribute('style');
      hiddenLastTarget.removeAttribute('style');
    }
  }, [activate, isMobile]);

  const paginationCustom = (type: string, page: number) => {
    if (type === 'prev') return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />;
    if (type === 'next') return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />;
    if (type === 'jump-prev' || type === 'jump-next')
      return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_pagination.svg" />;
    if (type === 'page') {
      if (page < 10) {
        return '0' + page;
      } else {
        return page;
      }
    }
  };

  return (
    <div className={cn('pagination-wrap')} ref={paginationRef}>
      <Pagination
        current={activate}
        defaultCurrent={defaultCurrent}
        defaultPageSize={defaultPageSize}
        total={total}
        showSizeChanger={false}
        responsive={false}
        size="default"
        showLessItems={false}
        itemRender={(page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next', element: React.ReactNode) =>
          paginationCustom(type, page)
        }
        onChange={onChange}
      />
    </div>
  );
};
export default PaginationCustom;
