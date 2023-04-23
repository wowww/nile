import React from 'react';
import cn from 'classnames';
import { Checkbox } from 'antd';
import { SettingListProps } from 'pages/notification';
import ContentTitle from '@/components/marketplace/ContentTitle';

interface NotificationSettingProps {
  settingList: SettingListProps[];
  changeEvent?: () => void;
}

const NotificationSettingList: React.FC<NotificationSettingProps> = ({ settingList, changeEvent }) => {
  return (
    <>
      {settingList.map((item) => {
        return (
          <div className={cn('setting-list')} key={item.name}>
            <ContentTitle title={item.name} titleSize="xs" />
            <ul>
              {item.list.map((list, index) => (
                <li key={index} className={cn('list-item')}>
                  <Checkbox defaultChecked onChange={changeEvent}>
                    {list}
                  </Checkbox>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default NotificationSettingList;
