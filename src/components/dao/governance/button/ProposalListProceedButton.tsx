import cn from 'classnames';
import BgButton from '@components/button/BgButton';
import OutlineButton from '@components/button/OutlineButton';
import { ReactSVG } from 'react-svg';
import { Proposal, ProposalCheck, ProposalStatus } from '@/types/dao/proposal.types';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import dayjs from 'dayjs';

interface ProceedButtonProps {
  proposal?: Proposal;
}

const ProposalListProceedButton = ({ proposal }: ProceedButtonProps) => {
  const { t } = useTranslation(['dao', 'common']);
  const nileWallet = useAtomValue(nileWalletAtom);

  const isVoteEnd = useMemo(() => {
    return dayjs().isAfter(dayjs.utc(proposal?.voteEndAt));
  }, [proposal?.voteEndAt]);

  const isProposalWriter = useMemo(() => {
    return proposal?.userAddress?.toLowerCase() === nileWallet?.toLowerCase();
  }, [nileWallet, proposal?.userAddress]);

  const button = useMemo(() => {
    if (!isVoteEnd) {
      return;
    }

    switch (proposal?.check) {
      case ProposalCheck.TEMPERATURE:
        // TODO: if consensus check가 있으면
        // return (
        //   <div className={cn('proceed')}>
        //     {/* 23.03.30 수정: 검수 / 모바일 디자인 변경 - block={isMobile} 제거 */}
        //     <BgButton
        //       buttonText={
        //         <>
        //           {t('governance.proposal.buttonText.consensusCheck', { text: '(2023-04-01)' })}
        //           <span className={cn('icon-wrap')}>
        //             <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_single_arrow.svg" />
        //           </span>
        //         </>
        //       }
        //       color="soft"
        //       size="sm"
        //       href={`/dao/${activeDao.value}/governance/check`}
        //     />
        //   </div>
        // )

        if (isProposalWriter) {
          return (<div className={cn('proceed')}>
            <BgButton buttonText="Proceed" color="highlight" size="sm" />
          </div>);
        }
        return (
          <div className={cn('proceed')}>
            {/* 23.03.30 수정: 검수 / 모바일 디자인 변경 - block={isMobile} 제거 */}
            <OutlineButton buttonText={`${t('governance.proposal.buttonText.waitProceed')} `} color="highlight" size="sm" disabled />
          </div>
        );
      case ProposalCheck.CONSENSUS:
        if (proposal?.status === ProposalStatus.IN_PROGRESS) {
          return (
            <div className={cn('proceed')}>
              <BgButton buttonText="Counting" color="highlight" size="sm" />
            </div>
          );
        }

        // TODO: if governance check가 있으면
        // <div className={cn('proceed')}>
        //   {/* 23.03.30 수정: 검수 / 모바일 디자인 변경 - block={isMobile} 제거 */}
        //   <BgButton
        //     buttonText={
        //       <>
        //         {t('governance.proposal.buttonText.governanceCheck', { text: '(2023-04-01)' })}
        //         <span className={cn('icon-wrap')}>
        //           <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_single_arrow.svg" />
        //         </span>
        //       </>
        //     }
        //     color="soft"
        //     size="sm"
        //     disabled
        //     href={`/dao/${activeDao.value}/governance/check`}
        //   />
        // </div>

        if (isProposalWriter) {
          return (
            <div className={cn('proceed')}>
              <BgButton buttonText="Proceed" color="highlight" size="sm" />
            </div>
          );
        }
        return (
          <div className={cn('proceed')}>
            <OutlineButton buttonText={`${t('governance.proposal.buttonText.waitProceed')} `} color="highlight" size="sm" disabled />
          </div>
        );
      case ProposalCheck.GOVERNANCE:
        if (proposal?.status === ProposalStatus.IN_PROGRESS) {
          return (
            <div className={cn('proceed')}>
              {/* 23.03.30 수정: 검수 / 모바일 디자인 변경 - block={isMobile} 제거 */}
              <BgButton buttonText="Execution" color="highlight" size="sm" />
            </div>
          );
        }
      // TODO: governance 안건 실행 이후
      // if (proposal?.status === ProposalStatus.DONE) {
      //   return (
      //     <div className={cn('proceed')}>
      //       {/* 23.03.30 수정: 검수 / 모바일 디자인 변경 - block={isMobile} 제거 */}
      //       <OutlineButton
      //         buttonText={`${
      //           StatusStore[type][index as number].etc
      //             ? t('governance.proposal.buttonText.etcApproval', {
      //               text: '2023-04-01 10:30',
      //             })
      //             : t('governance.proposal.buttonText.onChained', {
      //               text: '2023-04-01 10:30',
      //             })
      //         }`}
      //         color="highlight"
      //         size="sm"
      //         disabled
      //       />
      //     </div>
      //   )
      // }
    }
  }, [isVoteEnd, isProposalWriter, proposal]);

  return (
    <>
      {button}
    </>
  );
};

export default ProposalListProceedButton;