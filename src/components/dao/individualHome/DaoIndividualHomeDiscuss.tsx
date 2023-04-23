import cn from 'classnames';

import { Avatar } from 'antd';
import Link from 'next/link';
import NileNft from '@/models/nile/marketplace/NileNft';
import { useAtomValue } from 'jotai';
import { userProfileAtom } from '@/state/accountAtom';
import { useTranslation } from 'next-i18next';
import { windowResizeAtom } from '@/state/windowAtom';

interface DaoIndividualHomeDiscussType {
  data: DaoIndividualHomeDiscussData;
  nft?: NileNft;
}

export interface DaoIndividualHomeDiscussData {
  link: string;
  title: string;
  desc: string;
  group: {
    user: string;
    userImage: string;
  }[];
  info?: {
    like: number;
    comment: number;
    count: number;
    recentlyActivity: string;
  };
}

const DaoIndividualHomeDiscuss = ({ data, nft }: DaoIndividualHomeDiscussType) => {
  const userProfile = useAtomValue(userProfileAtom);
  const { t } = useTranslation('dao');
  const offset = useAtomValue(windowResizeAtom);

  return (
    <Link href={data.link}>
      <a className={cn('dao-discuss-wrap')}>
        <div className={cn('discuss-container')}>
          <div className={cn('discuss-title')}>
            <strong>{data.title}</strong>
          </div>
          <p className="discuss-desc">{data.desc}</p>

          <div className={cn('avatar-group-wrap avatar-group-sm discuss-group')}>
            <Avatar.Group maxCount={3}>
              {data.group.map((group, index) => (
                <Avatar
                  key={`discuss-avatar${index}`}
                  className={cn('user-image type3')}
                  size={offset.width < 768 ? 20 : 28}
                  style={{ backgroundImage: `url(${group.userImage})` }}
                />
              ))}
            </Avatar.Group>
            <span className={cn('avatar-group-more')}>
              {data.group.length} {t('individualHome.community.discuss.discussNow')}
            </span>
          </div>
        </div>
        <div className={cn('discuss-info')}>
          <ul className="info-list-wrap">
            <li>
              <span className={cn('name')}>{t('individualHome.community.discuss.like')}</span>
              <span className={cn('value')}>{data?.info?.like}</span>
            </li>
            <li>
              <span className={cn('name')}>{t('individualHome.community.discuss.comment')}</span>
              <span className={cn('value')}>{data?.info?.comment}</span>
            </li>
            <li>
              <span className={cn('name')}>{t('individualHome.community.discuss.count')}</span>
              <span className={cn('value')}>{data?.info?.count}</span>
            </li>
            <li>
              <span className={cn('name')}>{t('individualHome.community.discuss.recentlyActivity')}</span>
              <span className={cn('value')}>{data?.info?.recentlyActivity}</span>
            </li>
          </ul>
        </div>
      </a>
    </Link>
  );
};

export default DaoIndividualHomeDiscuss;
