import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';
import Link from 'next/link';

import Tag from '../tag/Tag';
import { NileNftToken } from '@/models/nile/marketplace/NileNft';
import { useNumberFormatter } from '@utils/formatter/number';
import { useNileNft } from '@/hook/useNileNft';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useCountdown } from '@utils/countdown';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { useTranslation } from 'next-i18next';
import CustomAvatar from '@components/avatar/CustomAvatar';
import { fromWei } from 'web3-utils';

export interface RecentlySoldCardProps {
  token: NileNftToken;
}

const RecentlySoldCard = ({ token }: RecentlySoldCardProps) => {
  const { t } = useTranslation('common');
  const { shorthanded } = useNumberFormatter();
  const { shorten } = useWalletFormatter();
  const { lastOrder } = useNileNft({ token });
  const { remainTime } = useCountdown({ seconds: 0, activeUnderZero: true });

  const calcRemainTime = useMemo(() => {
    const updateAt = dayjs.utc(lastOrder?.completedAt);

    const remainDays = dayjs().diff(updateAt, 'day');
    const remainHours = dayjs().diff(updateAt, 'hour');
    const remainMinutes = dayjs().diff(updateAt, 'minute');
    const remainSeconds = dayjs().diff(updateAt, 'second');

    if (remainDays >= 1) {
      if (remainDays === 0) {
        return '1 days ago';
      } else {
        return updateAt.format('YYYY-MM-DD');
      }
    }

    if (remainHours > 0) {
      return `${remainHours} hours ago`;
    }

    if (remainMinutes > 0) {
      return `${remainMinutes} minutes ago`;
    }

    if (remainSeconds > 0) {
      return `${remainSeconds} seconds ago`;
    }
  }, [token, remainTime]);

  const user = useMemo(() => {
    if (token?.profile) return token?.profile;
    return {
      address: token?.ownerAddress,
      nickname: token?.ownerName,
      themeIndex: undefined,
      img: undefined,
    }
  }, [token]);

  return (
    <li>
      <Link
        href={{
          pathname: '/marketplace/[collectionAddressOrSlug]/[tokenId]',
          query: { collectionAddressOrSlug: token?.collectionAddress, tokenId: token?.tokenId },
        }}
      >
        <a>
          <div className={cn('recently-sold-card')}>
            <div className={cn('card-top')}>
              <Tag size="s">Sold</Tag>
              <span className={cn('left-time')}>{calcRemainTime}</span>
            </div>
            {token?.videoUrl && (
              <span className={cn('video-wrap')}>
                <video autoPlay loop muted playsInline disablePictureInPicture>
                  <source src={token?.videoUrl} type="video/mp4" />
                </video>
              </span>
            )}
            {!token?.videoUrl && token?.imageUrl && (
              <div className={cn('image-block')}>
                <Image src={token?.imageUrl} alt="" layout="fill" objectFit="cover" loader={NileCDNLoader} unoptimized loading="lazy" />
              </div>
            )}
            <div className={cn('info-block')}>
              <div className={cn('info-top')}>
                <div className={cn('info-top-md')}>
                  <Tag size="s">Sold</Tag>
                  <span className={cn('left-time')}>{calcRemainTime}</span>
                </div>
                <strong className={cn('product-name')}>{token?.name}</strong>
              </div>
              <div className={cn('info-bottom')}>
                <dl>
                  <dt>{t('lastSale')}</dt>
                  <dd>{shorthanded(Number(fromWei(String(token?.price ?? '0'), 'ether')))} WEMIX$</dd>
                </dl>
                <dl>
                  <dt>Owner</dt>
                  <dd>
                    <CustomAvatar size={20} themeIndex={user?.themeIndex} src={user?.img} />
                    {user?.nickname ?? shorten(user?.address)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default RecentlySoldCard;
