import { useEffect, useMemo, useState } from 'react';
import { Avatar } from 'antd';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import ProfileModal from '@/components/modal/ProfileModal';
import GovernanceCommentView from '@/components/dao/governance/contents/GovernanceCommentView';
import { ReactSVG } from 'react-svg';
import ProposalStatusTag from '@components/dao/governance/card/ProposalStatusTag';
import { Proposal, ProposalCheck, ProposalStatus } from '@/types/dao/proposal.types';
import ProposalSubTag from '@components/dao/governance/card/ProposalSubTag';
import ProposalListProceedButton from '@components/dao/governance/button/ProposalListProceedButton';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import dayjs from 'dayjs';
import { TimeFormat, utcToLocal } from '@utils/formatter/time';
import { useWalletFormatter } from '@utils/formatter/wallet';

interface GovernanceCardType {
  views: number;
  commentCount: number;
  proposal?: Proposal;
}

const GovernanceCard = ({
                          views,
                          commentCount,
                          proposal,
                        }: GovernanceCardType) => {
  const { t } = useTranslation(['dao', 'common']);
  const activeDao = useAtomValue(daoThemeAtom);
  const nileWallet = useAtomValue(nileWalletAtom);

  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);

  const { shorten } = useWalletFormatter();

  const isProposalWriter = useMemo(() => {
    return proposal?.userAddress?.toLowerCase() === nileWallet?.toLowerCase();
  }, [nileWallet, proposal?.userAddress]);

  const isVoteEnd = useMemo(() => {
    return dayjs().isAfter(dayjs.utc(proposal?.voteEndAt));
  }, [proposal?.voteEndAt]);

  const statusInfo = useMemo(() => {
    if (isVoteEnd && proposal?.status === ProposalStatus.IN_PROGRESS) {
      return t('governance.proposal.cardStatus.endOfVote');
    }

    if (proposal?.status === ProposalStatus.DONE) {
      return t('governance.proposal.cardStatus.bePassed', { text: '' });
    }

    if (proposal?.status === ProposalStatus.REJECTED) {
      if (proposal?.check === ProposalCheck.TEMPERATURE) {
        return t('governance.proposal.cardStatus.noEmpathyPredominance');
      }

      // TODO: 정족수 실패 케이스
      // return t('governance.proposal.cardStatus.lackOfQuorum')
      return t('governance.proposal.cardStatus.againstPredominance');
    }

    const hours = dayjs.utc(proposal?.voteEndAt).diff(dayjs(), 'hours');

    if (hours > 24) {
      const day = Math.floor(hours / 24);
      return `${day}${t('governance.remainTimeDay')} ${hours - (day * 24)}${t('governance.remainTimeHour')} ${t('governance.remainTime')}`;
    }
    return `${hours}${t('governance.remainTimeHour')} ${t('governance.remainTime')}`;

    // TODO: 즉시 가결 / 즉시 부결 케이스 -> check permittedAt
    // t('governance.proposal.cardStatus.majorityInFavor', { text: '(2023-07-10)' })
    // t('governance.proposal.cardStatus.majorityInAgainst', { text: '(2023-07-10)' })
  }, [isVoteEnd, proposal, t]);

  return (
    <>
      <div
        className={cn('governance-card', {
          'my-agenda': isProposalWriter,
          'trust-check': proposal?.check === ProposalCheck.TRUST,
        })}
      >
        <div className={cn('top')}>
          <div className={cn('governance-content-info')}>
            <div className='content-info'>
              <span className={cn('tags')}>
                <ul>
                  <li>
                    <ProposalStatusTag status={proposal?.status} check={proposal?.check} />
                  </li>
                  {/* TODO: trust check / my / voted / joined */}
                  {/*<li>*/}
                  {/*  <ProposalSubTag type={} />*/}
                  {/*</li>*/}
                  {proposal?.check === ProposalCheck.TRUST && (
                    <li>
                      <ProposalSubTag type='trust' />
                    </li>
                  )}
                </ul>
              </span>
              <Link href={`/dao/${activeDao.value}/governance/${proposal?.id}`}>
                <a className={cn('content-info-link')}>
                  <div className={cn('title')}>
                    {proposal?.check === ProposalCheck.TRUST && (
                      <span className={cn('trust-icon')}>
                        <ReactSVG
                          src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_trust_flag.svg' />
                      </span>
                    )}
                    <strong>{proposal?.title}</strong>
                  </div>
                  <p className={cn('description')}>{proposal?.content}</p>
                </a>
              </Link>
              <div className={cn('thumb-address')}>
                <button
                  onClick={() => setIsOpenProfile(true)}
                >
                  {proposal?.userProfileImg ? (
                    <Avatar className={cn('user-image')} size={20}
                            style={{ backgroundImage: proposal.userProfileImg }} />
                  ) : (
                    <Avatar className={cn('user-image type1')} size={20} />
                  )}
                  <span className={cn('address')}>{shorten(proposal?.userAddress)}</span>
                </button>
              </div>
              <ProposalListProceedButton proposal={proposal} />
            </div>
          </div>
          <Link href={`/dao/${activeDao.value}/governance/check`}>
            <a className={cn('governance-content-visual')}>
              {/*<QuorumInfo*/}
              {/*  type={type}*/}
              {/*  currentQuorum={currentQuorum}*/}
              {/*  targetQuorum={targetQuorum}*/}
              {/*  agreeRate={agreeRate}*/}
              {/*  againstRate={againstRate}*/}
              {/*  agreeGwdr={agreeGwdr}*/}
              {/*  againstGwdr={againstGwdr}*/}
              {/*  agreeUser={agreeUser}*/}
              {/*  againstUser={againstUser}*/}
              {/*  trustCheck={trustCheck}*/}
              {/*/>*/}
            </a>
          </Link>
        </div>
        <div className={cn('bottom')}>
          <div className={cn('date-status')}>
            <dl className={cn('date')}>
              <dt>{proposal?.check === ProposalCheck.TEMPERATURE ? `${t('governance.proposal.participationPeriod')}` : `${t('governance.votingPeriod')}`}</dt>
              <dd>
                {utcToLocal(proposal?.voteStartAt, TimeFormat.STANDARD)} ~ {utcToLocal(proposal?.voteEndAt, TimeFormat.STANDARD)}
              </dd>
            </dl>
            <div className={cn('status')}>{statusInfo}</div>
          </div>
          <GovernanceCommentView
            comment={{ count: commentCount, href: `/dao/${activeDao.value}/governance/check#comment`, link: true }}
            view={views}
          />
        </div>
      </div>
      <ProfileModal
        isOpen={isOpenProfile}
        setIsOpen={setIsOpenProfile}
        profile={{
          name: 'Polaris Liu',
          address: '0x65b2...1413',
          url: 'https://joeschmoe.io/api/v1/random',
        }}
      />
    </>
  );
};

export default GovernanceCard;
