import { useState } from 'react';
import cn from 'classnames';
import { Button } from 'antd';
import { uuid } from 'uuidv4';
import { ReactSVG } from 'react-svg';

interface LikeButton {
  count: number;
  /* 22.10.11 수정: isLike prop 추가 */
  isLike?: boolean;
}

/* 22.10.11 수정: isLike prop 추가 */
const LikeButton = ({ count, isLike = false }: LikeButton) => {
  /* 22.10.11 수정: initial state 변경 */
  const [active, setActive] = useState<boolean>(isLike ? true : false);
  const key = uuid();
  const toggleLike = (e: any) => {
    setActive(!active);
  };

  return (
    <Button onClick={toggleLike} className={cn('btn btn-like', { active })} icon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_heart.svg' />} key={key}>
      <span className={cn('a11y')}>좋아요</span>
      {count !== 0 && <span className={cn('like-count')}>{count >= 999 ? `+999` : count}</span>}
    </Button>
  );
};

export default LikeButton;
