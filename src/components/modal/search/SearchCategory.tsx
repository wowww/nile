import cn from 'classnames';

import Chip from '@/components/tag/Chip';

interface SearchCategory {
  currentCategory: string;
  setCurrentCategory: Function;
}

interface CategoryItem {
  key: string;
  name: string;
  count: number;
}

const SearchCategory = ({ currentCategory, setCurrentCategory }: SearchCategory) => {
  const categoryList: CategoryItem[] = [
    // {
    //   key: '1',
    //   name: 'All',
    //   count: 32,
    // },
    {
      key: '2',
      name: 'DAO',
      count: 1000,
    },
    {
      key: '3',
      name: 'Life',
      count: 24,
    },
    {
      key: '4',
      name: 'Marketplace',
      count: 24,
    },
    {
      key: '5',
      name: 'Community',
      count: 0,
    },
    {
      key: '6',
      name: 'Tokens',
      count: 1,
    },
    {
      key: '7',
      name: 'Profile',
      count: 43,
    },
  ];

  return (
    <div className={cn('category-wrap')}>
      <ul className={cn('category-list')}>
        {categoryList.map((item: CategoryItem, index: number) => (
          <li key={`category-${index}`}>
            <button
              type="button"
              onClick={() => {
                setCurrentCategory(item.key);
              }}
            >
              <Chip size="md" bg={item.key === currentCategory}>
                <strong>{item.name}</strong>
                {item.count < 1000 ? item.count : '999+'}
              </Chip>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchCategory;
