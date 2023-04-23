import cn from 'classnames';
import Tag from '@/components/tag/Tag';
import { useTranslation } from 'next-i18next';
import { Avatar } from 'antd';
import OutlineButton from '@/components/button/OutlineButton';

const DiscussionDetailHeader = () => {
  const { t } = useTranslation('dao');
  return (
    <div className={cn('governance-detail-header')}>
      <span className={cn('all-text')}>All Discussion</span>
      <div className={cn('tag-wrap')}>
        <Tag size="xs" color="positive">
          {t('governance.discussion.notice')}
        </Tag>
      </div>
      <strong className={cn('detail-title')}>Community Governance Process</strong>
      <span className={cn('detail-date')}>Created Date : 2022-07-05</span>
      <div className={cn('detail-header-row')}>
        <div className={cn('info-area')}>
          <div className={cn('user-info')}>
            <Avatar className={cn('user-image type2')} size={28} style={{ backgroundImage: `url(https://picsum.photos/32/32/?image=1)` }} />
            <span className={cn('wallet-address')}>0xabcd...abcd</span>
          </div>
          <ul className={cn('detail-info-list')}>
            <li>
              <span className={cn('info-name')}>{t('governance.replies')}</span>
              <span className={cn('info-content')}>130</span>
            </li>
            <li>
              <span className={cn('info-name')}>{t('governance.hits')}</span>
              <span className={cn('info-content')}>442</span>
            </li>
            <li>
              <span className={cn('info-name')}>{t('governance.recentActivity')}</span>
              <span className={cn('info-content')}>Apr 20</span>
            </li>
          </ul>
        </div>
        <div className={cn('btn-area')}>
          <OutlineButton buttonText="Switch to Proposal" size="sm" color="black" />
          <OutlineButton buttonText="Share" size="sm" color="black" iconType iconValue="share" />
          <OutlineButton buttonText="Copy" size="sm" color="black" iconType iconValue="copy" />
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetailHeader;
