import { Fragment, useState, useEffect, ReactElement } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import RadioTab from '@components/tokens/RadioTab';
import TextButton from '@/components/button/TextButton';
import GovernanceCard from '../governance/contents/GovernanceCard';
// dummy data
import { temperatureData } from '../governance/contents/data';
import { consensusData } from '../governance/contents/data';
import { governanceData } from '../governance/contents/data';

interface Props {}

const ChipList = [
  {
    name: 'Temperature Check',
    value: 'temperature',
  },
  {
    name: 'Consensus Check',
    value: 'consensus',
  },
  {
    name: 'Governance Check',
    value: 'governance',
  },
];

const GovernanceArea = ({}: Props): ReactElement => {
  const { t } = useTranslation('');
  const [nowTab, setNowTab] = useState<string>('temperature');
  const [data, setData] = useState(temperatureData);

  useEffect(() => {
    switch (nowTab) {
      case 'temperature':
        setData(temperatureData);
        break;
      case 'consensus':
        setData(consensusData);
        break;
      case 'governance':
        setData(governanceData);
        break;
      default:
        console.log('just dummy');
    }
  }, [nowTab]);

  return (
    <div className={cn('dao-individual-home-governance-area')}>
      <div className={cn('area-header')}>
        {/* 23.04.05 수정: arrow svg xl 케이스 변경 */}
        <TextButton buttonText={'Governance'} iconValue="arrow-xl" size="xl" href={'/'} />
      </div>
      <div className={cn('contents-area')}>
        <div className="content-radio-group">
          <RadioTab btnList={ChipList} nowTab={nowTab} setNowTab={setNowTab} chipSize="sm" />
        </div>
        {data.map((td, i) => (
          <Fragment key={td.type + i}>
            <GovernanceCard
              index={i}
              type={td.type}
              title={td.title}
              description={td.description}
              author={td.author}
              date={td.date}
              views={td.views}
              commentCount={td.commentCount}
              currentQuorum={td.currentQuorum}
              targetQuorum={td.targetQuorum}
              agreeRate={td.agreeRate}
              againstRate={td.againstRate}
              agreeGwdr={td.agreeGwdr}
              againstGwdr={td.againstGwdr}
              agreeUser={td.agreeUser}
              againstUser={td.againstUser}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default GovernanceArea;
