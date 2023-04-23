import cn from 'classnames';
import { SetStateAction } from 'jotai';
import { createContext, Dispatch, RefObject, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import GovernanceCheckCommentInput from './GovernanceCheckCommentInput';
import GovernanceCheckComments from './GovernanceCheckComments';
import useMediaQuery from '@/hook/useMediaQuery';
import GovernanceCheckCommentsModal from './GovernanceCheckCommentsModal';
import { ReactSVG } from 'react-svg';
import OutlineButton from '@/components/button/OutlineButton';
import BgButton from '@/components/button/BgButton';
import GovernanceCheckCommentTerm from './GovernanceCheckCommentTerm';
import { useTranslation } from 'next-i18next';

interface CommentType {
  id: number;
  profileImgUrl: string;
  walletAddress: string;
  date: string;
  commentContent: string;
  quote?: CommentType;
  likeCount: number;
  edited?: boolean;
}

type CommentIndexContextType = [number | null, Dispatch<SetStateAction<number | null>>];

type CommentInputRefContextType = [{ input: RefObject<HTMLElement> | null; comment: RefObject<HTMLElement> | null }, Dispatch<SetStateAction<any>>];

const CommentContext = createContext<CommentType[]>([]);

const CommentIndexContext = createContext<CommentIndexContextType>([null, () => {}]);

const CommentInputRefContext = createContext<CommentInputRefContextType>([{ input: null, comment: null }, () => {}]);

const Dummy = [
  {
    id: 0,
    profileImgUrl: 'https://picsum.photos/32/32/?image=1',
    walletAddress: '0xabcd...abcd',
    date: '2022-07-01',
    commentContent:
      '111111 This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request\n\nThe GPC is seeking the following funding:\nSeason 15 Total Need: $983,429 (413,206 GTC)\n60 day reserves*: $462,085 (194,154 GTC)\nAmount Requested from Treasury $1,445,514 (607,360 GTC)\n*60 day reserves are calculated only against the contributor compensation and payroll related OpEx.',
    likeCount: 999,
    edited: false,
  },
  {
    id: 1,
    profileImgUrl: 'https://picsum.photos/32/32/?image=2',
    walletAddress: '1231xa...abcd',
    date: '2022-07-01',
    commentContent:
      '222222 This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request\n\nThe GPC is seeking the following funding:\nSeason 15 Total Need: $983,429 (413,206 GTC)\n60 day reserves*: $462,085 (194,154 GTC)\nAmount Requested from Treasury $1,445,514 (607,360 GTC)\n*60 day reserves are calculated only against the contributor compensation and payroll related OpEx.',
    likeCount: 90,
    edited: false,
  },
  {
    id: 2,
    profileImgUrl: 'https://picsum.photos/32/32/?image=3',
    walletAddress: '1xaash...abcd',
    date: '2022-07-01',
    commentContent:
      '333333 This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request\n\nThe GPC is seeking the following funding:\nSeason 15 Total Need: $983,429 (413,206 GTC)\n60 day reserves*: $462,085 (194,154 GTC)\nAmount Requested from Treasury $1,445,514 (607,360 GTC)\n*60 day reserves are calculated only against the contributor compensation and payroll related OpEx.',
    likeCount: 90,
    edited: false,
  },
  {
    id: 3,
    profileImgUrl: 'https://picsum.photos/32/32/?image=4',
    walletAddress: '31efgg..abcd',
    date: '2022-07-01',
    commentContent:
      '444444 This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request\n\nThe GPC is seeking the following funding:\nSeason 15 Total Need: $983,429 (413,206 GTC)\n60 day reserves*: $462,085 (194,154 GTC)\nAmount Requested from Treasury $1,445,514 (607,360 GTC)\n*60 day reserves are calculated only against the contributor compensation and payroll related OpEx.',
    likeCount: 90,
    edited: false,
  },
  {
    id: 4,
    profileImgUrl: 'https://picsum.photos/32/32/?image=4',
    walletAddress: '12xbcd...abcd',
    date: '2022-07-01',
    commentContent:
      '555555 This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request\n\nThe GPC is seeking the following funding:\nSeason 15 Total Need: $983,429 (413,206 GTC)\n60 day reserves*: $462,085 (194,154 GTC)\nAmount Requested from Treasury $1,445,514 (607,360 GTC)\n*60 day reserves are calculated only against the contributor compensation and payroll related OpEx.',
    likeCount: 90,
    edited: true,
  },
  {
    id: 5,
    profileImgUrl: 'https://picsum.photos/32/32/?image=4',
    walletAddress: '0xabcd...abcd',
    date: '2022-07-01',
    commentContent:
      '666666 This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request\n\nThe GPC is seeking the following funding:\nSeason 15 Total Need: $983,429 (413,206 GTC)\n60 day reserves*: $462,085 (194,154 GTC)\nAmount Requested from Treasury $1,445,514 (607,360 GTC)\n*60 day reserves are calculated only against the contributor compensation and payroll related OpEx.',
    likeCount: 90,
    edited: false,
    quote: {
      id: 3,
      profileImgUrl: 'https://picsum.photos/32/32/?image=4',
      walletAddress: '31efgg..abcd',
      date: '2022-07-01',
      commentContent:
        '-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-wor-workstream-proposal-budget-request\n\nThe GPC is seeking the following funding:\nSeason 15 Total Need: $983,429 (413,206 GTC)\n60 day reserves*: $462,085 (194,154 GTC)\nAmount Requested from Treasury $1,445,514 (607,360 GTC)\n*60 day reserves are calculated only against the contributor compensation and payroll related OpEx.',
      likeCount: 90,
      edited: false,
    },
  },
];

const GovernanceCheckCommentsView = () => {
  const { t } = useTranslation(['dao']);
  const [commentIndex, setCommentIndex] = useState<number | null>(null);
  const [commentInputRef, setCommentInputRef] = useState({ input: null, comment: null });
  const [open, setOpen] = useState<boolean>(false);

  const [showExtraInput, setShowExtraInput] = useState<boolean>(false);
  const isTablet = useMediaQuery('(max-width: 767px)');

  const getReplyContent = useCallback(
    (index: number | null) => {
      if (index === null) return;
      return Dummy[index];
    },
    [commentIndex],
  );

  const ExtraInput = () => {
    return (
      <>
        <div id="comment" className={cn('dao-check-extra-input')}>
          {!showExtraInput && (
            <>
              <div className={cn('dao-check-extra-info')}>
                <div>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_sns.svg" />
                  <span className={cn('dao-check-extra-info-title')}>&nbsp;{t('governance.checkComment.title')}&nbsp;(2)</span>
                </div>
                {!isTablet ? (
                  <OutlineButton buttonText={t('governance.checkComment.btnWrite2')} color="gray" size="sm" onClick={() => setShowExtraInput(true)} />
                ) : (
                  <BgButton buttonText={t('governance.checkComment.btnShowComments')} color="highlight" size="sm" onClick={() => setOpen(true)} />
                )}
              </div>
              {!isTablet && <GovernanceCheckCommentTerm />}
            </>
          )}

          {showExtraInput && (
            <>
              {!isTablet && (
                <div className={cn('dao-check-extra-agree')}>
                  <GovernanceCheckCommentTerm />
                </div>
              )}
              <GovernanceCheckCommentInput type="extra" setCancel={setShowExtraInput} />
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <CommentIndexContext.Provider value={[commentIndex, setCommentIndex]}>
      <CommentContext.Provider value={Dummy}>
        <CommentInputRefContext.Provider value={[commentInputRef, setCommentInputRef]}>
          <ExtraInput />
          {!isTablet ? (
            <>
              <GovernanceCheckComments />
              <div className={cn('dao-check-comments-view-input')}>
                <GovernanceCheckCommentInput type="reply" replyContent={getReplyContent(commentIndex)} />
              </div>
            </>
          ) : (
            <>
              <GovernanceCheckCommentsModal open={open} setOpen={setOpen} />
            </>
          )}
        </CommentInputRefContext.Provider>
      </CommentContext.Provider>
    </CommentIndexContext.Provider>
  );
};

export const useCommentContext = () => useContext(CommentContext);
export const useCommentIndexContext = () => useContext(CommentIndexContext);
export const useCommentRefsContext = () => useContext(CommentInputRefContext);

export type { CommentType };
export default GovernanceCheckCommentsView;
