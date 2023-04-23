import cn from 'classnames';
import Tag from '@/components/tag/Tag';
import { ReactSVG } from 'react-svg';

export const MypageNoticeNormalItem = ({ noticeData, tagSize }: any) => {
  const setStep = () => {
    switch (noticeData.step) {
      case 1:
        return 'Consensus check';
      case 2:
        return 'Governance Proposal';
      case 3:
        return 'Execution';
    }
  };

  const statusClass = () => {
    switch (noticeData.status) {
      case 'accepted':
        return { color: 'positive' };
      case 'rejected':
        return { color: 'negative' };
      case 'canceled':
        return { color: 'light-gray' };
      case 'active':
        return { type: 'primary' };
    }
  };
  if (!noticeData.nonLink) {
    return (
      <button type="button" className={cn('mypage-notice-list')}>
        <div className={cn('title-wrap')}>
          {noticeData.step && <span className={cn('step')}>{setStep()}</span>}
          <strong className={cn('title')}>{noticeData.title}</strong>
          <div className={cn('addition-wrap')}>
            {typeof noticeData.vote === 'boolean' && (
              <span className={cn('vote-wrap')}>
                {noticeData.vote ? (
                  <>
                    <span className={cn('icon-wrap')}>
                      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_check_agree.svg' />
                    </span>
                    For
                  </>
                ) : (
                  <>
                    <span className={cn('icon-wrap')}>
                      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_check_disagree.svg' />
                    </span>
                    Against
                  </>
                )}
              </span>
            )}
            <span className={cn('date')}>{noticeData.date}</span>
          </div>
        </div>
        {noticeData.status && (
          <div className={cn('status-wrap')}>
            <Tag size={tagSize} {...statusClass()}>
              {noticeData.status}
            </Tag>
          </div>
        )}
        {(noticeData.replies || noticeData.views) && (
          <div className={cn('status-wrap')}>
            <ul className={cn('field-wrap')}>
              <li>
                <strong className={cn('name')}>Replies</strong>
                <span className={cn('value')}>{noticeData.replies}</span>
              </li>
              <li>
                <strong className={cn('name')}>Views</strong>
                <span className={cn('value')}>{noticeData.views}</span>
              </li>
            </ul>
          </div>
        )}
      </button>
    );
  } else {
    return (
      <div className={cn('mypage-notice-list')}>
        <div className={cn('title-wrap')}>
          {noticeData.step && <span className={cn('step')}>{setStep()}</span>}
          <strong className={cn('title')}>{noticeData.title}</strong>
          <div className={cn('addition-wrap')}>
            {typeof noticeData.vote === 'boolean' && (
              <span className={cn('vote-wrap')}>
                {noticeData.vote ? (
                  <>
                    <span className={cn('icon-wrap')}>
                      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_check_agree.svg' />
                    </span>
                    For
                  </>
                ) : (
                  <>
                    <span className={cn('icon-wrap')}>
                      <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_check_disagree.svg' />
                    </span>
                    Against
                  </>
                )}
              </span>
            )}
            <span className={cn('date')}>{noticeData.date}</span>
          </div>
        </div>
        {noticeData.status && (
          <div className={cn('status-wrap')}>
            <Tag size={tagSize} {...statusClass()}>
              {noticeData.status}
            </Tag>
          </div>
        )}
        {(noticeData.replies || noticeData.views) && (
          <div className={cn('status-wrap')}>
            <ul className={cn('field-wrap')}>
              <li>
                <strong className={cn('name')}>Replies</strong>
                <span className={cn('value')}>{noticeData.replies}</span>
              </li>
              <li>
                <strong className={cn('name')}>Views</strong>
                <span className={cn('value')}>{noticeData.views}</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
};

export default MypageNoticeNormalItem;
