import React from 'react';
import cn from 'classnames';
import { Avatar } from 'antd';

import { daoMembers } from '@/components/dao/ui/station/daoMembersList';

const DaoStationIngMembers = () => {
  const userCount = daoMembers.length;
  const transitionDuration = `${userCount * 5}s`;
  const userListStyle = {
    '--user-show-el': userCount,
    animation: `scrolling-user ${transitionDuration} linear infinite`,
  } as React.CSSProperties;

  const originalEl: React.ReactElement[] = [];
  const copyEvent = (times: number) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < times; i++) {
      let userTypeNumber = 0;
      originalEl.push(
        ...daoMembers.map((item, idx) => {
          if (item.image === '') {
            userTypeNumber++;
            if (userTypeNumber > 5) {
              userTypeNumber = 1;
            }
          }

          return (
            <div
              key={item.name + idx + i}
              className={cn('user-item', item.index % 100 === 0 && 'special-user')}
              data-text={item.index % 100 === 0 ? `${item.index}th Member Joined!` : ''}
            >
              <Avatar
                size={64}
                className={cn('user-image', item.image === '' ? `type${userTypeNumber}` : '')}
                style={{ backgroundImage: item.image != '' ? `url(${item.image})` : '' }}
              />
              <span className={cn('user-name')}>{item.name}</span>
              <span className={cn('user-greeting')}>{item.greeting}</span>
            </div>
          );
        })
      );
    }
    return originalEl;
  };
  return (
    <div className={cn('dao-recruiting-members', 'dao-station-section')}>
      <div className={cn('title-wrap')}>
        <h3 className={cn('title')}>Here Comes 158 Wonder DAO Members!</h3>
        <p className={cn('desc')}>If you click on the profile of a member you're curious about, you'll see a Profile.</p>
      </div>

      <div className={cn('user-list-wrap')}>
        <div className={cn('user-list')} style={userListStyle}>
          {copyEvent(2)}
        </div>
      </div>
    </div>
  );
};

export default DaoStationIngMembers;
