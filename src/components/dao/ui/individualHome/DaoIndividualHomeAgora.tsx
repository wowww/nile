import cn from 'classnames';

import { Avatar } from 'antd';
import Link from 'next/link';
import NileNft from '@/models/nile/marketplace/NileNft';
import { useAtomValue } from 'jotai';
import { userProfileAtom } from '@/state/accountAtom';
import Agora from '@/components/chart/Agora';

interface DaoIndividualHomeDiscussType {
  data: DaoIndividualHomeAgora;
  item?: NileNft;
}

export interface DaoIndividualHomeAgora {
  chart: {
    rate: number;
    goalNum: number;
  };
  link: string;
  step: string;
  title: string;
  date: string;
  suggest: string;
  suggestImg: string;
}

const DaoIndividualHomeDiscuss = ({ data, item }: DaoIndividualHomeDiscussType) => {
  const userProfile = useAtomValue(userProfileAtom);

  return (
    <Link href={data.link}>
      <a className={cn('dao-agora-wrap')}>
        <div className={cn('agora-container')}>
          <div className={cn('agora-step')}>{data.step}</div>
          <div className={cn('agora-title')}>
            <strong>{data.title}</strong>
            <span className={cn('date')}>{data.date}</span>
          </div>
          <div className={cn('agora-chart-wrap')}>
            <Agora goal={data.chart.goalNum} />
          </div>
        </div>
        <div className={cn('agora-person-wrap')}>
          <div className={cn('agora-suggest')}>
            <Avatar
              size={20}
              className={cn('user-image', userProfile?.themeIndex && `type${userProfile?.themeIndex}`)}
              style={{ backgroundImage: `url(${data.suggestImg})` }}
            />
            <span className={cn('value')}>{data.suggest}</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default DaoIndividualHomeDiscuss;
