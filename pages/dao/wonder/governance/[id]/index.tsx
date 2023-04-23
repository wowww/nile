import React, { useEffect } from 'react';
import cn from 'classnames';
import DaoLayout from '@components/dao/DaoLayout';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAtom, useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { wonderProposalAtom } from '@/state/governanceAtom';
import GovernanceDetailHeader from '@components/dao/governance/GovernanceDetailHeader';
import GovernanceSetting from '@components/dao/governance/GovernanceSetting';
import GovernanceCheckCommentsView from '@components/dao/governance/check/GovernanceCheckCommentsView';
import GovernanceVote from '@components/dao/governance/GovernanceVote';

import { useTranslation } from 'next-i18next';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useLayoutResize } from '@utils/layout';
import { NileApiService } from '@/services/nile/api';
import { useWonder } from '@/hook/useWonder';
import { provider } from '@/state/nileWalletAtom';
import { daoAbis, daoJsonAbiAddress } from '@/web3/abis/dao';

const Check = () => {
  const { query } = useRouter();
  const { id } = query;

  const { wonderDao } = useWonder();
  const { isTablet } = useLayoutResize();
  const api = NileApiService();

  const { t } = useTranslation(['dao']);
  const activeDao = useAtomValue(daoThemeAtom);

  const [proposal, setProposal] = useAtom(wonderProposalAtom);

  useEffect(() => {
    if (wonderDao?.daoId && id) {
      api.dao.governance.proposal
        .getItem(wonderDao?.daoId, String(id))
        .then(({ data }) => setProposal(data.data))
        .catch((err) => console.log(err));
    }
  }, [wonderDao, id]);

  const getAgenda = async () => {
    if (!wonderDao?.daoId || !proposal?.proposalId) return;
    const contract = new provider.web3.eth.Contract(daoAbis.Governance, daoJsonAbiAddress().current.GovernanceProxy);

    const result = await contract.methods.getAgenda(wonderDao?.daoId, proposal?.proposalId).call();
    console.log("result >> ", result);
  }

  useEffect(() => {
    getAgenda();
  }, [wonderDao, proposal]);

  return (
    <>
      <Helmet>
        <title>DAO &gt; Nile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <body className={cn(`${activeDao.value}-wrap`, 'dao-wrap', isTablet && 'has-floating')} />
      </Helmet>
      <DaoLayout activate="menu-governance">
        <GovernanceDetailHeader
          type="governance"
          comment={{
            count: 130,
            href: 'comment',
            link: true,
          }}
          view={50}
        />
        <div className={cn('governance-check-contents-wrap')}>
          <div className={cn('governance-check-contents-left')}>
            <GovernanceSetting type="Governance" />
            <div className={cn('dao-check-content')}>
              <strong>{t('governance.checkContent.title')}</strong>
              {/* 23.04.11 수정: 빈 p 태그 보여지는 현상으로 인해 조건 추가 */}
              {proposal !== undefined && <p>{proposal?.content}</p>}
            </div>
            <GovernanceCheckCommentsView />
          </div>
          <div className={cn('governance-check-contents-right')}>
            <GovernanceVote type={'consensus'} />
          </div>
        </div>
      </DaoLayout>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'dao'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default Check;
