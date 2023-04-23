import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { NileCDNLoader } from '@utils/image/loader';

interface SearchResultList extends ResultList {
  setModalClose: Function;
}

export interface ResultList {
  categoryKey: string;
  categoryName: string;
  list: ListItem[];
}

interface ListItem {
  link: string;
  img: string;
  desc: string;
  subDesc?: string;
  imgType: 'square' | 'circle';
}

const SearchResultList = ({ categoryKey, categoryName, list, setModalClose }: SearchResultList) => {
  const ResultItem = (item: ListItem) => {
    return (
      <>
        <span className={cn('img-wrap', item.imgType)}>
          <Image src={item.img} alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
        </span>
        <span className={cn('desc-wrap')}>
          <span>{item.desc}</span>
          {item.subDesc && <span>{item.subDesc}</span>}
        </span>
      </>
    );
  };

  return (
    <div className={cn('result-row')}>
      <div className={cn('result-top')}>
        <strong className={cn('name')}>{categoryName}</strong>
        <span className={cn('count')}>{list.length}</span>
        {/* {list.length > 3 ? (
          <TextButton buttonText={String(list.length)} iconValue="arrow" gapSpacing={'sm'} size={'md'} />
        ) : (
          <span className={cn('count')}>{list.length}</span>
        )} */}
      </div>
      <ul className={cn('result-list')}>
        {list?.map((item: ListItem, index: number) => (
          <li key={`result-${categoryKey}-${index}`}>
            <>
              {/* 내부 링크 */}
              {item.link.startsWith('/') && (
                <Link href={item.link}>
                  <a onClick={() => setModalClose()}>{ResultItem(item)}</a>
                </Link>
              )}
              {/* 외부 링크 */}
              {item.link.startsWith('http') && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" title="새창열림" onClick={() => setModalClose()}>
                  {ResultItem(item)}
                </a>
              )}
            </>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultList;
