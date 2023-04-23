import cn from 'classnames';
/* 22.11.02 수정: 다국어 추가 */
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';


const SearchResultEmpty = () => {
  const { t } = useTranslation('common');
  return (
    <div className={cn('result-empty')}>
      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_search.svg' />
      <strong>{t('header.search.noResult.title')}</strong>
      <span>{t('header.search.noResult.desc', { keyword: 'sunny' })}</span>
    </div>
  );
};

export default SearchResultEmpty;
