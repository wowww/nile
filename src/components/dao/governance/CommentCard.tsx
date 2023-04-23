import cn from 'classnames';
import { Avatar } from 'antd';
import CommentLikeButton from '@/components/button/CommentLikeButton';
import OutlineButton from '@/components/button/OutlineButton';
import { useTranslation } from 'next-i18next';

export interface CommentCardProps {
  profileImgUrl: string;
  walletAddress: string;
  date: string;
  commentContent: string;
  likeCount: number;
}

const CommentCard: React.FC<CommentCardProps> = ({ profileImgUrl, walletAddress, date, commentContent, likeCount }) => {
  const { t } = useTranslation(['common']);
  return (
    <div className={cn('dao-comment-card')}>
      <div className={cn('card-header')}>
        <div className={cn('profile-info')}>
          <Avatar className={cn('user-image type2')} size={32} style={{ backgroundImage: `url(${profileImgUrl})` }} />
          <span className={cn('wallet-address')}>{walletAddress}</span>
        </div>
        <span className={cn('date')}>Created Date : {date}</span>
      </div>
      <p className={cn('comment-content')}>{commentContent}</p>
      <div className={cn('btn-wrap')}>
        <CommentLikeButton likeCount={likeCount} />
        <OutlineButton buttonText={t('hide')} color="highlight" size="sm" />
      </div>
    </div>
  );
};

export default CommentCard;
