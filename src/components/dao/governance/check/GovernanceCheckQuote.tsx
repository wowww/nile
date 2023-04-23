import cn from 'classnames';
import { CommentType } from './GovernanceCheckCommentsView';
import { ReactSVG } from 'react-svg';
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import GovernanceCheckProfile from './GovernanceCheckProfile';
import { useTranslation } from 'next-i18next';

interface Props {
  inComment?: boolean;
  inModalQuote?: boolean;
  showMore?: boolean;
  ellipsis?: boolean;
  replyContent?: CommentType;
  activeLink?: boolean;
}

// 원 댓글 삭제되었을때.
const replyContentDeleted = true;
const flag = true;
const GovernanceCheckQuote = ({ inComment = false, showMore = false, ellipsis = false, replyContent, activeLink = false }: Props) => {
  const { t } = useTranslation(['dao']);
  // const [refs, _] = useCommentRefsContext();
  const [lineCount, setLineCount] = useState<number>(0);
  const [more, setMore] = useState<boolean>(false);
  const paraRef = useRef<HTMLParagraphElement>(null);

  const getLineCount = () => {
    if (!paraRef.current) return;
    const style = getComputedStyle(paraRef.current);
    const lineHeight = style.lineHeight.replace('px', '');
    const offsetHeight = paraRef.current.offsetHeight;
    setLineCount(Math.round(offsetHeight / +lineHeight));
  };

  useEffect(() => {
    getLineCount();
  }, []);

  useEffect(() => {
    if (lineCount >= 5) setMore(true);
  }, [lineCount]);

  const MoreParagraph = () => {
    const { t } = useTranslation(['dao']);
    return (
      <div>
        <p ref={paraRef} className={cn('quote-in-comment', { more: more })}>
          {lineCount >= 5 && '다섯줄 넘음'}
          {replyContent?.commentContent}
        </p>
        <button onClick={() => setMore(!more)}>
          {more ? t('governance.checkComment.btnMore') : t('governance.checkComment.btnFold')}
          <ReactSVG wrapper="span" src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
        </button>
      </div>
    );
  };

  return (
    <div className={cn('quote-wrap')}>
      {/* 원 댓글 삭제시 케이스
      {replyContentDeleted && <p className={cn('quote-deleted')}>{t('governance.checkComment.quoteDeleted')}</p>} */}
      {flag && (
        <GovernanceCheckProfile
          type={'quote'}
          activeLink={activeLink}
          profileImgUrl={replyContent?.profileImgUrl}
          walletAddress={replyContent?.walletAddress}
          moveToComment={replyContent?.id}
        />
      )}
      {inComment && showMore ? <MoreParagraph /> : <p className={cn({ ellipsis: ellipsis })}>{replyContent?.commentContent}</p>}
    </div>
  );
};

export default GovernanceCheckQuote;
