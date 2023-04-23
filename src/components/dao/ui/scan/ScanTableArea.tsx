import { Input } from 'antd';
import cn from 'classnames';
import { DaoTableLayout, DaoTableTitle } from '../DaoBoxLayout';
import { useAtomValue } from 'jotai';
import ScanTable from './ScanTable';
import Empty from '@/components/empty/Empty';
import { Trans, useTranslation } from 'next-i18next';
import useMediaQuery from '@/hook/useMediaQuery';
import { ReactSVG } from 'react-svg';

type propsType = {
  num?: number;
};

const SearchBar = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  return (
    <Input
      placeholder={`${!isMobile ? 'Search by' : ''} TX Hash/Protocol/Address/Value`}
      size="middle"
      prefix={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_search.svg" />}
      className={cn('search-bar')}
    />
  );
};

const SearchResult = ({ num }: propsType) => {
  return (
    <button
      className={cn('result-info')}
      onClick={() => {
        console.log('link');
      }}
    >
      <span>
        {num} results for <strong>‘Station’</strong>
      </span>
    </button>
  );
};

const ScanTableArea = () => {
  const { t } = useTranslation('dao');
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <>
      <DaoTableLayout>
        <DaoTableTitle title={'Transactions'} children={<SearchBar />} direction={!isMobile ? 'row' : 'column'} />
        {/* default */}
        {/* <ScanTable /> */}
        {/* result 결과 */}
        <ScanTable searchResult={999} />
        {/* 23.03.31 수정: empty 케이스 변경 적용으로 인한 불필요 코드(케이스) 제거 */}
      </DaoTableLayout>
    </>
  );
};

export default ScanTableArea;
