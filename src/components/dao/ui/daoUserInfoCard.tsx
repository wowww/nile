// TODO: 삭제 예정
/* eslint-disable react/no-unstable-nested-components */
import cn from 'classnames';
// import { useTranslation } from 'next-i18next';
import Tag from '@/components/tag/Tag';
import { avatarClick, daoHomeTableDataType } from '@/components/table/tableDummyData';
import { Avatar } from 'antd';

interface daoUserInfoCardType {
  userInfo: daoHomeTableDataType;
}

const DaoUserInfoCard = ({ userInfo }: daoUserInfoCardType) => {
  // const { t } = useTranslation('daoStation');
  const render = (value: number) => {
    return `${Number(value)
      .toFixed(3)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const dateRender = (value: Date) => {
    const month = value.getMonth() + 1;
    const date = value.getDate();
    return `${value.getFullYear()}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
  };

  return (
    <button className={cn('user-card-view')} type="button" onClick={() => avatarClick(userInfo.members?.userId ?? '')}>
      <div className={cn('user-card-inner')}>
        {userInfo.members?.memberPurpose !== undefined ? (
          <div className={cn('user-purpose')}>
            <Tag size="xs">For {userInfo.members?.memberPurpose}</Tag>
          </div>
        ) : (
          ''
        )}
        <div className={cn('user-info')}>
          <Avatar
            className={cn('user-image', userInfo.members?.userDefaultType)}
            size={64}
            style={userInfo.members?.imgUrl !== undefined ? { backgroundImage: `url(${userInfo.members?.imgUrl})` } : {}}
          />
          <strong>{userInfo.members?.userId}</strong>
          <span>{userInfo.members?.userGreetings}</span>
        </div>
        <div className={cn('user-data')}>
          <dl>
            <div>
              <dt>Stake WONDERs</dt>
              <dd>
                {render(userInfo.wonders ?? 0)} <span>WONDER</span>
              </dd>
              <dt>Cast Power</dt>
              <dd>
                {render(userInfo.castPower ?? 0)} <span>gWONDER</span>
              </dd>
            </div>
            <div>
              <dt>Proposal</dt>
              <dd>{userInfo.proposalCreated}</dd>
              <dt>Votes</dt>
              <dd>{userInfo.members?.votes}</dd>
            </div>
          </dl>
        </div>
        <div className={cn('user-last-date')}>Recent Activity : {dateRender(userInfo.members?.lastActivityDate ?? new Date())}</div>
      </div>
    </button>
  );
};

export default DaoUserInfoCard;
