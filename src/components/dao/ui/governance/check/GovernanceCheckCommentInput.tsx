import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Input, message } from 'antd';
import BgButton from '@/components/button/BgButton';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import OutlineButton from '@/components/button/OutlineButton';
import { CommentType, useCommentIndexContext, useCommentRefsContext } from './GovernanceCheckCommentsView';
import GovernanceCheckQuote from './GovernanceCheckQuote';
import GovernanceCheckProfile from './GovernanceCheckProfile';
import ModalLayout from '@/components/modal/ModalLayout';

type InputType = 'modal' | 'edit' | 'extra' | 'reply';
interface Props {
  type: InputType;
  setCancel?: Dispatch<SetStateAction<boolean>>;
  replyContent?: CommentType;
  comment?: CommentType;
}

const GovernanceCheckCommentInput = ({ type, setCancel, replyContent, comment }: Props) => {
  const { t } = useTranslation(['dao']);
  const [text, setText] = useState('');
  const [_, setRefs] = useCommentRefsContext();
  const [__, setCommentIndex] = useCommentIndexContext();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    if (type === 'reply') setShowQuote(true);
    if (!replyContent) setShowQuote(false);
  }, [replyContent]);

  const resetReplyContent = () => {
    setCommentIndex(null);
  };

  const handleCancelAction = (): void => {
    if (type === 'reply') {
      resetReplyContent();
      setShowQuote(false);
      setText('');
    }
    if (!setCancel) return;
    if (type === 'modal') {
      setActiveModal(true);
    } else {
      setCancel(false);
    }
  };

  const commentInputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (commentInputRef && type === 'reply') {
      setRefs((prev: any) => ({ ...prev, input: commentInputRef }));
    }
  }, []);

  const handleModalAction = () => {
    setActiveModal(false);
    if (setCancel) {
      setCancel(false);
    }
  };

  const handleSaveAction = () => {
    if (type === 'edit' && setCancel) {
      setCancel(false);
      message.info({ content: t('dao:governance.smallPopup.toast.edit'), key: 'toast' });
    } else {
      setText('');
      setShowQuote(false);
      message.info({ content: t('dao:governance.smallPopup.toast.register'), key: 'toast' });
    }
  };

  return (
    <>
      {showQuote && replyContent && <GovernanceCheckQuote inComment showMore replyContent={replyContent} />}
      {type === 'edit' && (
        <div className={cn('dao-check-comment-edit-input')}>
          <GovernanceCheckProfile profileImgUrl={comment?.profileImgUrl} walletAddress={comment?.walletAddress} />
          <span className={cn('date')}>{comment?.date}</span>
        </div>
      )}
      <div className={cn('dao-check-comment-input')} ref={type === 'reply' ? commentInputRef : null}>
        {/* 23.03.28 수정: textarea 관련 기획 정의 수정 byte 추가 */}
        <Input.TextArea
          showCount={{ formatter: ({ count, maxLength }) => `${count}/${maxLength} byte` }}
          className={cn('dao-comment-input')}
          maxLength={3000}
          autoSize={{ minRows: 2 }}
          bordered
          placeholder={showQuote ? t('governance.checkComment.replyPlaceHolder') : t('governance.checkComment.commentPlaceHolder')}
          onChange={(e) => setText(e.target.value)}
          value={type === 'edit' ? comment?.commentContent : text}
        />
        <div className={cn('dao-check-comment-input-buttons')}>
          {(type === 'extra' || type === 'edit' || showQuote) && (
            <OutlineButton
              buttonText={type === 'extra' || type === 'reply' ? t('governance.checkComment.btnCancel') : t('governance.checkComment.btnCancel')}
              color="highlight"
              size="md"
              onClick={handleCancelAction}
            />
          )}
          <BgButton
            buttonText={type === 'edit' ? t('governance.checkComment.btnSave') : t('governance.checkComment.btnWrite')}
            color="highlight"
            size="md"
            disabled={comment?.commentContent.length === 0 || text.length === 0}
            onClick={handleSaveAction}
          />
        </div>
      </div>

      {/* <ModalLayout
        isOpen={activeModal}
        setIsOpen={setActiveModal}
        size="sm"
        title={t('governance.smallPopup.commentEditCancel.title')}
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <OutlineButton
            buttonText={t('governance.smallPopup.btn.close')}
            color="black"
            size="md"
            onClick={() => {
              setActiveModal(false);
            }}
            key="cancel"
          />,
          <BgButton buttonText={t('governance.smallPopup.btn.editCancel')} color="black" size="md" key="Save" onClick={handleModalAction} />,
        ]}
      >
        <p>{t('governance.smallPopup.commentEditCancel.desc')}</p>
      </ModalLayout> */}
    </>
  );
};

export default GovernanceCheckCommentInput;
