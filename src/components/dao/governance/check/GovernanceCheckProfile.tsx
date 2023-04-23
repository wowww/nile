import cn from 'classnames';
import { Avatar } from 'antd';
import { MouseEvent, useCallback, useState } from 'react';
import { ReactSVG } from 'react-svg';
import Tag from '@/components/tag/Tag';
import ProfileModal from '@/components/modal/ProfileModal';
import * as Scroll from 'react-scroll';
import useMediaQuery from '@/hook/useMediaQuery';

interface Props {
  id?: number;
  type?: 'standard' | 'quote';
  activeLink?: boolean;
  profileImgUrl?: string;
  walletAddress?: string;
  moveToComment?: string | number;
}

const myWalletAddress = '1231xa...abcd';
const author = myWalletAddress;
// 임시 flag
const showAuthorId = 3;

const GovernanceCheckProfile = ({ id, type = 'standard', activeLink, profileImgUrl, walletAddress, moveToComment }: Props) => {
  const [isModal, setIsModal] = useState(false);
  const isDaoPc = useMediaQuery('(max-width: 1023px)');
  const isPc = useMediaQuery('(min-width: 1440px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const moveToCommentMo = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      location.href = '#comment' + moveToComment;
    },
    [moveToComment],
  );

  const Tags = () => {
    return (
      <>
        {myWalletAddress === walletAddress && (
          <Tag type="primary" size="sm" border="white-gray">
            My Reply
          </Tag>
        )}
        {id === showAuthorId && (
          <Tag type="primary" size="sm" border="white-gray">
            Proposal Maker
          </Tag>
        )}
      </>
    );
  };
  return (
    <div className={cn('governance-check-profile-info', `governance-check-profile-${type}`)}>
      <button className={cn('profile')} onClick={() => setIsModal(true)}>
        <Avatar className={cn('user-image type2')} size={type === 'quote' ? 26 : 32} style={{ backgroundImage: `url(${profileImgUrl})` }} />
        <span className={cn('wallet-address')}>{walletAddress}</span>
        {type === 'standard' && <Tags />}
      </button>
      {type === 'quote' && activeLink && (
        <>
          {!isMobile ? (
            <Scroll.Link className={cn('move-anchor')} to={moveToComment as string} offset={isPc ? -60 : isDaoPc ? -105 : -90}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_right.svg" />
            </Scroll.Link>
          ) : (
            <a href="javascript:;" onClick={moveToCommentMo} className={cn('move-anchor')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_right.svg" />
            </a>
          )}
        </>
      )}
      <ProfileModal
        isOpen={isModal}
        setIsOpen={setIsModal}
        nileUser={{
          nickname: 'Polaris Liu',
          address: walletAddress as string,
          img: profileImgUrl,
        }}
      />
    </div>
  );
};

export default GovernanceCheckProfile;
