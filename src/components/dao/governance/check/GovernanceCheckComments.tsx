import useMediaQuery from '@/hook/useMediaQuery';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import GovernanceCheckComment from './GovernanceCheckComment';
import { useCommentContext } from './GovernanceCheckCommentsView';

const GovernanceCheckComments = () => {
  const { t } = useTranslation('dao');
  const commentList = useCommentContext();
  const isTablet = useMediaQuery('(max-width: 767px)');

  return (
    <>
      <div className={cn('dao-check-comments-wrap')}>
        {!isTablet && (
          <>
            {commentList.length > 0 ? (
              <ul>
                {commentList?.map((c, index) => (
                  <li id={c.id.toString()} key={c.profileImgUrl + c.walletAddress + index}>
                    <GovernanceCheckComment comment={c} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className={cn('dao-check-comments-none')}>
                <p>{t('dao:governance.checkComment.commentsNone')}</p>
              </div>
            )}

            {commentList.length > 30 && (
              <button className={cn('dao-check-comments-more')} onClick={() => {}}>
                {t('dao:governance.checkComment.btnMore')}
                <ReactSVG wrapper="span" src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default GovernanceCheckComments;
