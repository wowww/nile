import { useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import { useTranslation } from 'next-i18next'; /* 22.11.17 수정: 다국어 추가 */
import { Input, InputRef } from 'antd';
import { ReactSVG } from 'react-svg';

const { Search } = Input;
interface SearchHeader {
  isFocus: boolean;
  searchValue: string;
  setSearchValue: Function;
}

const SearchHeader = ({ isFocus, searchValue, setSearchValue }: SearchHeader) => {
  const { t } = useTranslation(['common']); /* 22.11.17 수정: 다국어 추가 */
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const inputRef = useRef<InputRef>(null);

  const inputFocusOut = () => {
    if (isFocus) {
      inputRef.current?.blur();
    }
  };
  const onFocus = () => {
    setInputFocus(true);
  };
  const onBlur = () => {
    setInputFocus(false);
  };

  useEffect(() => {
    isFocus && inputRef.current?.focus();
  }, [isFocus]);

  useEffect(() => {
    window.addEventListener('touchmove', inputFocusOut);

    return () => window.removeEventListener('touchmove', inputFocusOut);
  }, [inputFocus]);

  return (
    <div className={cn('search-header')}>
      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_search.svg' />
      <Search
        ref={inputRef}
        value={searchValue}
        placeholder={t('header.search.placeHolder')} /* 22.11.17 수정: 다국어 추가 */
        allowClear={{ clearIcon: <span>Clear</span> }}
        enterButton={null}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        className={cn('search-input')}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default SearchHeader;
