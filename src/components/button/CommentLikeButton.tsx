import { useState } from 'react';
import { Button } from 'antd';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';

interface Props {
  type?: 'like' | 'unlike';
  likeCount: number;
}

const CommentLikeButton: React.FC<Props> = ({ type = 'like', likeCount }) => {
  const { t } = useTranslation(['common']);

  const [isActive, setIsActive] = useState<boolean>(false);

  // TODO: Like Button 클릭 시 로직
  return (
    <>
      {type === 'like' && (
        <Button
          className={cn('btn btn-outline outline-black btn-sm like-btn', isActive && 'liked')}
          title={t('like')}
          onClick={() => setIsActive(!isActive)}
        >
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_thumbsup.svg" />
          <span className={cn('text')}>{t('like')}</span>&nbsp;(<span className={cn('count')}>{likeCount}</span>)
        </Button>
      )}
      {type === 'unlike' && (
        <Button
          className={cn('btn btn-outline outline-black btn-sm like-btn', isActive && 'liked')}
          title={t('like')}
          onClick={() => setIsActive(!isActive)}
        >
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_thumbsdown.svg" />
          <span className={cn('text')}>{t('unlike')}</span>&nbsp;(<span className={cn('count')}>{likeCount}</span>)
        </Button>
      )}
    </>
  );
};

export default CommentLikeButton;
