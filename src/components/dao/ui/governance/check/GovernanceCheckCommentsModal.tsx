import cn from 'classnames';
import ModalLayout from '@/components/modal/ModalLayout';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { CommentType, useCommentContext, useCommentIndexContext } from './GovernanceCheckCommentsView';
import GovernanceCheckComment from './GovernanceCheckComment';
import GovernanceCheckCommentModalInput from './GovernanceCheckCommentModalInput';
import GovernanceCheckQuote from './GovernanceCheckQuote';
import GovernanceCheckCommentTerm from './GovernanceCheckCommentTerm';
import { useTranslation } from 'next-i18next';

type ModalSelectedCommentContextType = [CommentType | null, Dispatch<SetStateAction<CommentType | null>>];
const ModalSelectedCommentContext = createContext<ModalSelectedCommentContextType>([null, () => {}]);

type IsModalEditContextType = [boolean | null, Dispatch<SetStateAction<boolean | null>>];
const IsModalEditContextTypeContext = createContext<IsModalEditContextType>([null, () => {}]);

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const GovernanceCheckCommentsModal = ({ open, setOpen }: Props) => {
  const { t } = useTranslation(['dao']);
  const [showQuote, setShowQuote] = useState(false);
  const [insertMode, setInsertMode] = useState(false);
  const [selectedComment, setSelectedComment] = useState<CommentType | null>(null);
  const [isModalEdit, setIsModalEdit] = useState<boolean | null>(null);
  const [commentIndex, _] = useCommentIndexContext();
  const commentList = useCommentContext();
  const commentsWrapRef = useRef<HTMLUListElement>(null);

  return (
    <IsModalEditContextTypeContext.Provider value={[isModalEdit, setIsModalEdit]}>
      <ModalSelectedCommentContext.Provider value={[selectedComment, setSelectedComment]}>
        <ModalLayout
          className={cn('dao-check-comments-modal')}
          isOpen={open}
          setIsOpen={setOpen}
          size="lg-t"
          title={
            <>
              <div className={cn('dao-check-extra-info')}>
                <div>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_sns.svg" />
                  <span className={cn('dao-check-extra-info-title')}>&nbsp;{t('governance.checkComment.title')}&nbsp;(2)</span>
                </div>
              </div>
              {/* 23.04.04 수정: insertMode props 추가 */}
              <GovernanceCheckCommentTerm insertMode={insertMode} />
            </>
          }
          footer={false}
          destroyOnClose={true}
        >
          <div className={cn('dao-check-include-term')}>
            {commentList.length > 0 ? (
              <ul ref={commentsWrapRef}>
                {commentList?.map((c, index) => (
                  <li id={c.id.toString()} key={c.profileImgUrl + c.walletAddress + index}>
                    <GovernanceCheckComment type="modal" comment={c} setInsertMode={setInsertMode} setShowInModalQuote={setShowQuote} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className={cn('dao-check-comments-none')}>
                <p>{t('dao:governance.checkComment.commentsNone')}</p>
              </div>
            )}
          </div>
          <GovernanceCheckCommentModalInput wrapRef={commentsWrapRef} insertMode={insertMode} setInsertMode={setInsertMode} />
        </ModalLayout>
        <ModalLayout
          className={cn('dao-check-comments-modal')}
          isOpen={showQuote}
          setIsOpen={setShowQuote}
          size="lg-t"
          title={
            <>
              <span>{t('governance.checkComment.btnReply')}</span>
            </>
          }
          footer={false}
          destroyOnClose={true}
        >
          <GovernanceCheckQuote replyContent={commentList[commentIndex as number]} />
          <GovernanceCheckCommentModalInput
            type="quote"
            wrapRef={commentsWrapRef}
            insertMode={insertMode}
            setInsertMode={setInsertMode}
            setModal={setShowQuote}
          />
        </ModalLayout>
      </ModalSelectedCommentContext.Provider>
    </IsModalEditContextTypeContext.Provider>
  );
};

export const useModalSelectedCommentContext = () => {
  const value = useContext(ModalSelectedCommentContext);
  if (value === null) throw new Error('Provider가 제공되지 않았습니다.');
  return value;
};
export const useIsModalEditContext = () => useContext(IsModalEditContextTypeContext);

export default GovernanceCheckCommentsModal;
