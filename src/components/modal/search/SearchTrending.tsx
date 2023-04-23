import cn from 'classnames';

import Chip from '@/components/tag/Chip';

interface SearchTrending {
  list: string[];
  setSearchValue: Function;
}

const SearchTrending = ({ list, setSearchValue }: SearchTrending) => {
  return (
    <div className={cn('trending-wrap')}>
      <strong>Trending</strong>
      <ul className={cn('trending-list')}>
        {list?.map((item: string, index: number) => (
          <li key={`search-trending-${index}`}>
            <button
              type="button"
              onClick={() => {
                setSearchValue(item);
              }}
            >
              <Chip size="lg">{item}</Chip>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchTrending;
