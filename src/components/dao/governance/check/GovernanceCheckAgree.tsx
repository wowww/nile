import { ReactSVG } from 'react-svg';
import cn from 'classnames';

const GovernanceCheckAgree = () => {
  return (
    <div className={cn('dao-check-agree')}>
      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
      <p>이용 약관에 따라 부적절한 댓글의 경우 불이익을 받을 수 있습니다.</p>
    </div>
  );
};
export default GovernanceCheckAgree;
