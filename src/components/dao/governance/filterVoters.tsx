import React, { useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import RadioTab from '@/components/tokens/RadioTab';

const FilterVoters = () => {
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const [nowTab, setNowTab] = useState<string>('entire');

  const chipsList = [
    {
      name: t('proposal.entire'),
      value: 'entire',
      count: 344,
    },
    {
      name: t('proposal.for'),
      value: 'for',
      count: 2,
    },
    {
      name: t('proposal.against'),
      value: 'against',
      count: 300,
    },
  ];
  return (
    <div className={cn('filter-voters-wrap')}>
      <RadioTab btnList={chipsList} nowTab={nowTab} setNowTab={setNowTab} chipSize="sm" strong />
    </div>
  );
};

export default React.memo(FilterVoters);
