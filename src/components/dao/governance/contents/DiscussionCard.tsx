import cn from 'classnames';
import Tag from '@/components/tag/Tag';
import { useTranslation } from 'next-i18next';
import { Avatar } from 'antd';
import Link from 'next/link';
export interface DiscussionCardProps {
  title: string;
  desc: string;
  imgUrlList: string[];
  participantCount: number;
  commentCount: number;
  hits: number;
  recentActivity: string;
  isNotice?: boolean;
  href: string;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({
  title,
  desc,
  imgUrlList,
  participantCount,
  commentCount,
  hits,
  recentActivity,
  isNotice = false,
  href,
}) => {
  const { t } = useTranslation('dao');

  return (
    <Link href={href}>
      <a>
        <div className={cn('discussion-card')}>
          <div className={cn('card-top')}>
            {isNotice && (
              <div className={cn('tag-wrap')}>
                <Tag size="xs" color="positive">
                  {t('governance.discussion.notice')}
                </Tag>
              </div>
            )}
            <strong className={cn('card-title')}>{title}</strong>
            <p className={cn('desc')}>{desc}</p>
          </div>
          <div className={cn('card-bottom')}>
            <div className={cn('avatar-group-wrap avatar-group-sm')}>
              <Avatar.Group maxCount={3}>
                {imgUrlList.map((el, index) => (
                  <Avatar key={el + index} className={cn('user-image type2')} size={28} style={{ backgroundImage: `url(${el})` }} />
                ))}
              </Avatar.Group>
              <span className={cn('avatar-group-more')}>{participantCount}</span>
            </div>
            <ul className={cn('card-info')}>
              <li>
                <span className={cn('info-name')}>{t('governance.replies')}</span>
                <span className={cn('info-content')}>{commentCount}</span>
              </li>
              <li>
                <span className={cn('info-name')}>{t('governance.hits')}</span>
                <span className={cn('info-content')}>{hits}</span>
              </li>
              <li>
                <span className={cn('info-name')}>{t('governance.recentActivity')}</span>
                <span className={cn('info-content')}>{recentActivity}</span>
              </li>
            </ul>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default DiscussionCard;
