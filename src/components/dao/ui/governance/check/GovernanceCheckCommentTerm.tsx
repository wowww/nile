import { ReactSVG } from 'react-svg';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

/* 23.04.04 수정: Props 추가 */
interface Props {
  insertMode?: boolean;
}

/* 23.04.04 수정: insertMode Props 추가 */
const GovernanceCheckCommentTerm = ({ insertMode }: Props) => {
  const { t } = useTranslation(['dao']);
  return (
    <div className={cn('dao-check-comment-term', { 'disable-z-index': insertMode })}>
      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
      <p>{t('governance.checkComment.term')}</p>
    </div>
  );
};
export default GovernanceCheckCommentTerm;
