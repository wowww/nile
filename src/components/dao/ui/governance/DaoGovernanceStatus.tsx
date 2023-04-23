import { Avatar } from 'antd';
import cn from 'classnames';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';

export type statusType = {
  title: string;
  volume: number;
}[];

export type membersDataType = {
  title: string;
  volume: number;
  userImage?: string[];
};

export type statusDataType = {
  statusData: statusType;
  membersData: membersDataType;
};

const NumberVolume = (volume: number) => {
  return Number(volume)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const DaoGovernanceStatus = ({ statusData, membersData }: statusDataType) => {
  return (
    <div className={cn('status-box')}>
      <dl className={cn('status-wrap')}>
        {statusData.map((sd, i) => (
          <div className={cn('status-detail')} key={`${sd.title}-${i}`}>
            <dt className={cn('status-title')}>{sd.title}</dt>
            <dd className={cn('status-value')}>{NumberVolume(sd.volume)}</dd>
          </div>
        ))}
      </dl>
      <div className={cn('members-wrap')}>
        <Link href={'/dao/ui/wonder/governance/members'}>
          <a className={cn('link')}>
            <span className={cn('members-title')}>{membersData.title}</span>
            <span className={cn('icon-wrap')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_single_arrow.svg" />
            </span>
          </a>
        </Link>
        <div className={cn('members-volume')}>
          <Avatar.Group maxCount={3}>
            {membersData.userImage?.map((md, i) => (
              <Avatar className={cn('user-image')} size={24} style={{ backgroundImage: `url(${md})` }} key={`image-${i}`} />
            ))}
          </Avatar.Group>
          <span className={cn('status-value')}>{NumberVolume(membersData.volume)}</span>
        </div>
      </div>
    </div>
  );
};

export default DaoGovernanceStatus;
