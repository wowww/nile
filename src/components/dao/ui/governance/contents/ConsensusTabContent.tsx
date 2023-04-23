import React, { useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import TextButton from '@/components/button/TextButton';
import { consensusData } from './data';
import GovernanceCard from './GovernanceCard';
import { GovernanceEmpty, chipsListType, ChipsFilter } from '@/components/dao/ui/governance/contents/TemperatureTabContent';

const ConsensusTabContent = ({ chipsList, type }: chipsListType) => {
  const { t } = useTranslation(['dao', 'common']);

  return (
    <>
      <ChipsFilter chipsList={chipsList} type={type} />
      <div className={cn('content-wrap')}>
        <div className={cn('governance-contents')}>
          {consensusData &&
            consensusData.map((cd, i) => (
              <React.Fragment key={cd.type + i}>
                <GovernanceCard
                  index={i}
                  type={cd.type}
                  title={cd.title}
                  description={cd.description}
                  author={cd.author}
                  date={cd.date}
                  views={cd.views}
                  commentCount={cd.commentCount}
                  currentQuorum={cd.currentQuorum}
                  targetQuorum={cd.targetQuorum}
                  agreeRate={cd.agreeRate}
                  againstRate={cd.againstRate}
                  agreeGwdr={cd.agreeGwdr}
                  againstGwdr={cd.againstGwdr}
                  agreeUser={cd.agreeUser}
                  againstUser={cd.againstUser}
                />
              </React.Fragment>
            ))}
          {consensusData && (
            <TextButton
              buttonText={t('governance.membersTable.showMore')}
              size={'sm'}
              type={'text'}
              direction={'bottom'}
              iconValue={'arrow'}
              onClick={() => {
                return;
              }}
            />
          )}

          {!consensusData && <GovernanceEmpty />}
        </div>
      </div>
    </>
  );
};

export default ConsensusTabContent;
