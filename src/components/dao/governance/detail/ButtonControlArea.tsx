import cn from 'classnames';
import OutlineButton from '@components/button/OutlineButton';
import BgButton from '@components/button/BgButton';
import { message } from 'antd';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { wonderProposalAtom } from '@/state/governanceAtom';

import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { daoAbis, daoJsonAbiAddress } from '@/web3/abis/dao';
import { useWonder } from '@/hook/useWonder';
import { useTranslation } from 'next-i18next';
import VoteButton from '@components/dao/governance/button/VoteButton';
import { daoContractsAtom } from '@/state/web3Atom';
import { ProposalCheck, ProposalStatus, VoteType } from '@/types/dao/proposal.types';
import VoteCancelButton from '@components/dao/governance/button/VoteCancelButton';
import CountingButton from '@components/dao/governance/button/CountingButton';
import ProceedButton from '@components/dao/governance/button/ProceedButton';
import GTReclaimButton from '@components/dao/governance/button/GTReclaimButton';

const ButtonControlArea = () => {
  const { wonderDao } = useWonder();
  const { t } = useTranslation(['dao', 'common']);

  const proposal = useAtomValue(wonderProposalAtom);
  const nileWallet = useAtomValue(nileWalletAtom);
  const [isVoted, setIsVoted] = useState();

  const isVoteEnd = useMemo(() => {
    return dayjs().isAfter(dayjs.utc(proposal?.voteEndAt));
  }, [proposal?.voteEndAt]);

  const checkVoted = () => {
    if (!nileWallet) {
      return;
    }
    if (!wonderDao?.daoId) {
      return;
    }
    if (!proposal?.proposalId) {
      return;
    }

    const contract = new provider.web3.eth.Contract(daoAbis.Governance, daoJsonAbiAddress().current.GovernanceProxy);

    contract?.methods.isVoted(wonderDao?.daoId, proposal?.proposalId, nileWallet).call(function(err: any, res: any) {
      setIsVoted(res);
    });
  };

  useEffect(() => {
    checkVoted();
  }, [wonderDao, proposal, nileWallet]);

  const [selectedOpinion, setSelectedOpinion] = useState<VoteType>();

  const button = useMemo(() => {
    if (proposal?.check === ProposalCheck.TEMPERATURE) {
      return (
        <div className={cn('wrap-button double')}>
          <div className={cn(selectedOpinion === VoteType.AGREEMENT && 'active')}>
            <OutlineButton
              buttonText={t('vote.GovernanceVote.agree')}
              color='highlight'
              size='xl'
              iconType={selectedOpinion === VoteType.AGREEMENT}
              iconValue={'check'}
              onClick={() => {
                setSelectedOpinion(VoteType.AGREEMENT);
              }}
            />
          </div>
          <div className={cn(selectedOpinion === VoteType.OPPOSITE && 'active')}>
            <OutlineButton
              buttonText={t('vote.GovernanceVote.disagree')}
              color='highlight'
              size='xl'
              iconType={selectedOpinion === VoteType.OPPOSITE}
              iconValue={'check'}
              onClick={() => {
                setSelectedOpinion(VoteType.OPPOSITE);
              }}
            />
          </div>
        </div>
      );
    } else {
      if (isVoteEnd) {
        if (proposal?.status === ProposalStatus.IN_PROGRESS) {
          return (
            <div className={cn('wrap-button')}>
              <CountingButton />
            </div>
          );
        }

        if (proposal?.check !== ProposalCheck.GOVERNANCE && proposal?.status === ProposalStatus.DONE) {
          return (
            <div className={cn('wrap-button')}>
              <ProceedButton />
            </div>
          );
        }
      }
    }

    return (
      <div className={cn('wrap-button', { double: isVoted })}>
        {isVoted && <VoteCancelButton />}
        <VoteButton />
      </div>
    );
  }, [isVoted, proposal, isVoteEnd]);

  // return (
  //   {type === 'temperature' ? (
  //     // type === 'temperature'
  //     <>
  //       {participationPeriod ? (
  //         // 참여 기간
  //         <div className={cn('wrap-button double')}>
  //           <div className={cn(clickAgreeButton && 'active')}>
  //             <OutlineButton
  //               buttonText={t('vote.GovernanceVote.agree')}
  //               color="highlight"
  //               size="xl"
  //               iconType={clickAgreeButton ? true : false}
  //               iconValue={'check'}
  //               onClick={() => {
  //                 agreeAgainstButton(event, 'agree', clickAgreeButton);
  //               }}
  //             />
  //           </div>
  //           <div className={cn(clickAgainstButton && 'active')}>
  //             <OutlineButton
  //               buttonText={t('vote.GovernanceVote.disagree')}
  //               color="highlight"
  //               size="xl"
  //               iconType={clickAgainstButton ? true : false}
  //               iconValue={'check'}
  //               onClick={() => {
  //                 agreeAgainstButton(event, 'against', clickAgainstButton);
  //               }}
  //             />
  //           </div>
  //         </div>
  //       ) : (
  //         // 참여 기간 종료
  //         <>
  //           {passed && (
  //             // 가결 되었을 경우만 버튼 제공
  //             <>
  //               {writer ? (
  //                 // 작성자
  //                 <div className={cn('wrap-button')}>
  //                   <div className={cn(!writer && 'on-call')}>
  //                     <BgButton
  //                       buttonText={'Proceed'}
  //                       color="highlight"
  //                       size="xl"
  //                       onClick={() => {
  //                         message.info({ content: t('vote.GovernanceVote.executed'), key: 'toast' });
  //                       }}
  //                     />
  //                   </div>
  //                 </div>
  //               ) : (
  //                 // 참여자 & 미참여자
  //                 <>
  //                   {proceed ? (
  //                     // proceed 후
  //                     <div className={cn('wrap-button')}>
  //                       {/* 해당 버튼 선택시 연관된 Consensus Check 상세 화면으로 이동 */}
  //                       <Link href={''}>
  //                         <a className={cn('link-consensus-check')}>
  //                           <div>
  //                             <span className={cn('check-text')}>{t('vote.GovernanceVote.stepMovement')}</span>
  //                             <span className={cn('check-text')}>(2023-01-01)</span>
  //                           </div>
  //                           <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_dao_vote_arrow.svg" />
  //                         </a>
  //                       </Link>
  //                     </div>
  //                   ) : (
  //                     // proceed 전
  //                     <div className={cn('wrap-button')}>
  //                       <div className={cn('on-call')}> {t('vote.GovernanceVote.proceedOnCall')}</div>
  //                     </div>
  //                   )}
  //                 </>
  //               )}
  //             </>
  //           )}
  //         </>
  //       )}
  //     </>
  //   ) : (
  //     // type === 'consensus', 'governance'
  //     <>
  //       {participationPeriod ? (
  //         // 투표 기간 진행중
  //         <>
  //           {!isAgainst && !isAgree ? (
  //             // 투표 미참여
  //             // TODO---------------------------------------------------------------------------------------------------------------------------------------------
  //             <div className={cn('wrap-button')}>
  //               <BgButton
  //                 buttonText={isApproved ? t('vote.GovernanceVote.beVote') : t('approveButton', { ns: 'common' })}
  //                 color="highlight"
  //                 size="xl"
  //                 onClick={() => (isApproved ? vote() : sendApproved())}
  //               />
  //             </div>
  //           ) : (
  //             // 투표 참여
  //             <div className={cn('wrap-button double')}>
  //               <OutlineButton buttonText={t('vote.GovernanceVote.voteCancel')} color="highlight" size="xl" />
  //               <BgButton buttonText={t('vote.GovernanceVote.addVote')} color="highlight" size="xl" />
  //             </div>
  //           )}
  //         </>
  //       ) : (
  //         // 투표 기간 종료
  //         <>
  //           {type === 'consensus' ? (
  //             // type === 'consensus'
  //             <>
  //               {!counting ? (
  //                 //  counting 전
  //                 <div className={cn('wrap-button')}>
  //                   <BgButton buttonText={t('vote.GovernanceVote.counting')} color="highlight" size="xl" />
  //                 </div>
  //               ) : (
  //                 //  counting 후 + 가결 되었을 경우
  //                 <>
  //                   {passed && (
  //                     <>
  //                       {!proceed ? (
  //                         //  proceed 전
  //                         <>
  //                           {writer ? (
  //                             // 작성자
  //                             <div className={cn('wrap-button')}>
  //                               <BgButton buttonText={t('vote.GovernanceVote.proceed')} color="highlight" size="xl" />
  //                             </div>
  //                           ) : (
  //                             // 참여자
  //                             <div className={cn('wrap-button')}>
  //                               <div className={cn('on-call')}>{t('vote.GovernanceVote.proceedOnCall')}</div>
  //                             </div>
  //                           )}
  //                         </>
  //                       ) : (
  //                         //  proceed 후
  //                         <div className={cn('wrap-button')}>
  //                           {/* 해당 버튼 선택시 연관된 Consensus Check 상세 화면으로 이동 */}
  //                           <Link href={''}>
  //                             <a className={cn('link-consensus-check')}>
  //                               <div>
  //                                 <span className={cn('check-text')}>{t('vote.GovernanceVote.stepMovement')}</span>
  //                                 <span className={cn('check-text')}>(2023-01-01)</span>
  //                               </div>
  //                               <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_single_arrow.svg" />
  //                             </a>
  //                           </Link>
  //                         </div>
  //                       )}
  //                     </>
  //                   )}
  //                 </>
  //               )}
  //             </>
  //           ) : (
  //             // type === 'governance'
  //             <>
  //               {!execution ? (
  //                 //  execution 전
  //                 <div className={cn('wrap-button')}>
  //                   <BgButton buttonText={t('vote.GovernanceVote.execution')} color="highlight" size="xl" />
  //                 </div>
  //               ) : (
  //                 //  execution 후
  //                 <>
  //                   {passed && (
  //                     // 가결 O
  //                     <>
  //                       {otherTextAgenda ? (
  //                         // 기타 text 안건O
  //                         <div className={cn('wrap-button')}>
  //                           <div className={cn('on-call')}>
  //                             <span className={cn('on-call-text')}>{t('vote.GovernanceVote.finallyApproved')}</span>
  //                             <span className={cn('on-call-text')}>(2023-04-01 10:30 {t('vote.GovernanceVote.standard')})</span>
  //                           </div>
  //                         </div>
  //                       ) : (
  //                         // 기타 text 안건X
  //                         <div className={cn('wrap-button')}>
  //                           <div className={cn('on-call')}>
  //                             <span className={cn('on-call-text')}>{t('vote.GovernanceVote.onChained')}</span>
  //                             <span className={cn('on-call-text')}>(2023-04-01 10:30 {t('vote.GovernanceVote.standard')})</span>
  //                           </div>
  //                         </div>
  //                       )}
  //                     </>
  //                   )}
  //                 </>
  //               )}
  //             </>
  //           )}
  //           <div className={cn('wrap-button')}>
  //             <BgButton
  //               buttonText={reclaimComplete ? t('vote.GovernanceVote.gWONDERReclaimcomplete') : t('vote.GovernanceVote.gWONDERReclaim')}
  //               color="highlight"
  //               size="xl"
  //               disabled={reclaimComplete ? true : false}
  //             />
  //           </div>
  //         </>
  //       )}
  //     </>
  //   )}
  // )

  return (
    <>
      {button}
      {proposal?.check !== ProposalCheck.TEMPERATURE && proposal?.status === ProposalStatus.DONE && (
        <div className={cn('wrap-button')}>
          <GTReclaimButton />
        </div>
      )}
    </>
  );
};

export default ButtonControlArea;
