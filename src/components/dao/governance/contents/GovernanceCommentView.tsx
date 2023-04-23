import cn from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import * as Scroll from 'react-scroll';
import useMediaQuery from '@/hook/useMediaQuery';

type Props = {
  comment: {
    count: number;
    href?: string;
    link?: boolean;
    onClick?: () => void;
  };
  view: number;
  type?: string;
};

/* 23.03.27 수정 start: GovernanceCommentIcon 추가 */
const GovernanceCommentIcon = () => {
  return (
    <>
      <span className={cn('icon-sns')}>
        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_sns.svg" />
      </span>
      <span className={cn('icon-sns-hover')}>
        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_sns_full.svg" />
      </span>
    </>
  );
};
/* 23.03.27 수정 end: GovernanceCommentIcon 추가 */

const GovernanceCommentView = ({ comment, view, type }: Props) => {
  const { t } = useTranslation(['dao', 'common']);
  const isPc = useMediaQuery('(min-width: 1440px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const linkOption = {
    onClick: comment?.onClick,
    className: cn('comments'),
  };

  return (
    <div className={cn('comment-view-wrap', [type])}>
      {comment.link ? (
        <>
          {type === 'governanceList' && (
            <>
              {isMobile ? (
                <div className={cn('comments', 'comments-temp-disable-hover')}>
                  {/* 23.03.27 수정: GovernanceCommentIcon 변경 */}
                  <GovernanceCommentIcon />
                  <span className={cn('count')}>{comment.count}</span>
                </div>
              ) : (
                <Scroll.Link className={cn('comments')} to={comment.href as string} offset={isPc ? 0 : isMobile ? -56 : -44}>
                  {/* 23.03.27 수정: GovernanceCommentIcon 변경 */}
                  <GovernanceCommentIcon />
                  <span className={cn('count')}>{comment.count}</span>
                </Scroll.Link>
              )}
            </>
          )}
          {type !== 'governanceList' && (
            <>
              <Link href={comment.href ? comment.href : '/'}>
                <a {...linkOption}>
                  {/* 23.03.27 수정: GovernanceCommentIcon 변경 */}
                  <GovernanceCommentIcon />
                  <span className={cn('count')}>{comment.count}</span>
                </a>
              </Link>
            </>
          )}
        </>
      ) : (
        <button {...linkOption}>
          <GovernanceCommentIcon />
          {/* 23.03.27 수정: GovernanceCommentIcon 변경 */}
          <span className={cn('count')}>{comment.count}</span>
        </button>
      )}

      <span className={cn('watch')}>
        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_watch.svg" />
        <span className={cn('count')}>{view}</span>
      </span>
    </div>
  );
};

export default GovernanceCommentView;
