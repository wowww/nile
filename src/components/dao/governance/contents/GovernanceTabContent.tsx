import React, { useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import TextButton from '@/components/button/TextButton';
import { governanceData } from './data';
import GovernanceCard from './GovernanceCard';
import { GovernanceEmpty, chipsListType, ChipsFilter } from '@/components/dao/governance/contents/TemperatureTabContent';

const GovernanceTabContent = ({ chipsList, type }: chipsListType) => {
  const { t } = useTranslation(['dao', 'common']);

  return (
    <>
      <ChipsFilter chipsList={chipsList} type={type} />
      <div className={cn('content-wrap')}>
        <div className={cn('governance-contents')}>
          {governanceData &&
            governanceData.map((gd, i) => (
              <React.Fragment key={gd.type + i}>
                {/*<GovernanceCard*/}
                {/*  index={i}*/}
                {/*  type={gd.type}*/}
                {/*  title={gd.title}*/}
                {/*  description={gd.description}*/}
                {/*  author={gd.author}*/}
                {/*  date={gd.date}*/}
                {/*  views={gd.views}*/}
                {/*  commentCount={gd.commentCount}*/}
                {/*  currentQuorum={gd.currentQuorum}*/}
                {/*  targetQuorum={gd.targetQuorum}*/}
                {/*  agreeRate={gd.agreeRate}*/}
                {/*  againstRate={gd.againstRate}*/}
                {/*  agreeGwdr={gd.agreeGwdr}*/}
                {/*  againstGwdr={gd.againstGwdr}*/}
                {/*  agreeUser={gd.agreeUser}*/}
                {/*  againstUser={gd.againstUser}*/}
                {/*/>*/}
              </React.Fragment>
            ))}
          {governanceData && (
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

          {!governanceData && <GovernanceEmpty />}
        </div>
      </div>
    </>
  );
};

export default GovernanceTabContent;
