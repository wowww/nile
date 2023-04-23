import { ReactSVG } from 'react-svg';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

const GovernanceCheckCommentTerm = () => {
  const { t } = useTranslation(['dao']);
  return (
    <div className={cn('dao-check-comment-term')}>
      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
      <p>{t('governance.checkComment.term')}</p>
    </div>
  );
};
export default GovernanceCheckCommentTerm;
