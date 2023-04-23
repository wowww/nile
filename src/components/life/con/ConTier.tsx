import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

const Tier = ({ category, amount }: { category: string; amount: number }) => {
  return (
    <li className={cn(category.toLowerCase())}>
      <div className={cn('tier-dim')}></div>
      <p className={cn('category')}>{category}</p>
      <p className={cn('amount')}>
        {amount.toLocaleString(undefined, { maximumSignificantDigits: 3 })} <span>WEMIX</span>
      </p>
    </li>
  );
};

const ConTier = () => {
  const { t } = useTranslation('life');
  return (
    <div className={cn('life-neith-section tier')}>
      <div className={cn('life-neith-section-inner')}>
        <section>
          <h2>{t('con.tierCovenant.headingTitle')}</h2>
          <p>{t('con.tierCovenant.description')}</p>
        </section>
        <div className={cn('tier-list')}>
          <ul>
            <Tier category="Mythical" amount={100000} />
            <Tier category="Legendary" amount={50000} />
            <Tier category="Epic" amount={10000} />
            <Tier category="Rare" amount={5000} />
            <Tier category="Civic" amount={100} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ConTier);
