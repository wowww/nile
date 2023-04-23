import cn from 'classnames';
import Image from 'next/image';
import { Avatar } from 'antd';
import { NileCDNLoader } from '@utils/image/loader';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { useEffect, useState } from 'react';
import { MarketNftItemStatusType, NileApiService } from '@/services/nile/api';
import { NileNftToken } from '@/models/nile/marketplace/NileNft';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
import { useNileNft } from '@/hook/useNileNft';

interface MarketplaceProfileCardProps {
  token?: NileNftToken;
}

const MarketplaceProfileCard = ({ token }: MarketplaceProfileCardProps) => {
  const { shorten } = useWalletFormatter();
  const api = NileApiService();
  const [creator, setCreator] = useState<NileUserAccount>();
  const [owner, setOwner] = useState<NileUserAccount>();

  const { status } = useNileNft({ token: token ?? {} });

  useEffect(() => {
    const creatorAddress = token?.collection?.ownerAddress;
    if (creatorAddress) {
      api.user.account
        .getUserInfo(creatorAddress)
        .then(({ data }) => setCreator(data.result))
        .catch(({ response }) => {
          return null;
        });
    }

    const ownerAddress = token?.ownerAddress;
    if (ownerAddress) {
      api.user.account
        .getUserInfo(ownerAddress)
        .then(({ data }) => setOwner(data.result))
        .catch(({ response }) => {
          return null;
        });
    }
  }, [token]);

  return (
    <div className={cn('profile-card')}>
      <div className={cn('img-block')}>
        {token?.image ? (
          <Image src={token?.image ?? ''} alt="" layout="fill" loader={NileCDNLoader} unoptimized />
        ) : (
          <video autoPlay loop muted playsInline disablePictureInPicture>
            <source src={token?.videoUrl ?? ''} type="video/mp4" />
          </video>
        )}
      </div>

      <div className={cn('profile-info-block')}>
        <div className={cn('profile-info-top')}>
          <strong className={cn('product-name')}>{token?.name}</strong>
        </div>
        <div className={cn('profile-info-bottom')}>
          <dl>
            <button type="button">
              <dt>Creator</dt>
              <dd className={cn('profile-user-info')}>
                <Avatar size={28} className={cn('user-image', `type${creator?.themeIndex}`)} />
                <span className={cn('name')}>{token?.collection?.ownerName ?? shorten(creator?.address)}</span>
              </dd>
            </button>
            {status === MarketNftItemStatusType.CLOSED && (
              <button type="button">
                <dt>Owner</dt>
                <dd className={cn('profile-user-info')}>
                  <Avatar size={28} className={cn('user-image', `type${owner?.themeIndex}`)} />
                  <span className={cn('name')}>{shorten(owner?.address) ?? ''}</span>
                </dd>
              </button>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceProfileCard;
