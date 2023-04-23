import cn from 'classnames';
import { ReactSVG } from 'react-svg';

interface SearchHistory {
  list: string[];
  setSearchValue: Function;
}

const SearchHistory = ({ list, setSearchValue }: SearchHistory) => {
  return (
    <div className={cn('history-wrap')}>
      <ul className={cn('history-list')}>
        {list.map((item: string, index: number) => (
          <li key={`history-${index}`}>
            <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_time.svg' />
            <button
              type="button"
              className={cn('history-button')}
              onClick={() => {
                setSearchValue(item);
              }}
            >
              {item}
            </button>
            <button type="button" className={cn('history-delete')}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SearchHistory;
