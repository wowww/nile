import cn from 'classnames';
import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { Input, message } from 'antd';
import BgButton from '@/components/button/BgButton';
import useMediaQuery from '@/hook/useMediaQuery';
import { useIsModalEditContext, useModalSelectedCommentContext } from './GovernanceCheckCommentsModal';
import ModalLayout from '@/components/modal/ModalLayout';
import OutlineButton from '@/components/button/OutlineButton';
import { useTranslation } from 'next-i18next';

interface Props {
  type?: 'quote';
  wrapRef: RefObject<HTMLUListElement>;
  insertMode: boolean;
  setInsertMode: Dispatch<SetStateAction<boolean>>;
  setModal?: Dispatch<SetStateAction<boolean>>;
}

const GovernanceCheckCommentModalInput = ({ type, wrapRef, insertMode, setInsertMode, setModal }: Props) => {
  const { t } = useTranslation(['dao']);
  const [text, setText] = useState('');
  const [selectedComment, setSelectedComment] = useModalSelectedCommentContext();
  const [isModalEdit, setIsModalEdit] = useIsModalEditContext();
  const [activeCancelModal, setActiveCancelModal] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const modalTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleModalTextAreaFocus = () => {
    setInsertMode(true);
    if (!wrapRef.current) return;
    wrapRef.current.style.paddingBottom = '136px';
  };

  const handleSaveAction = () => {
    setInsertMode(false);
    setText('');
    setSelectedComment(null);
    if (isModalEdit) {
      message.info({ content: t('dao:governance.smallPopup.toast.edit'), key: 'toast' });
    } else {
      message.info({ content: t('dao:governance.smallPopup.toast.register'), key: 'toast' });
    }
    if (setModal) {
      setModal(false);
    }
  };

  const handleModalTextAreaBlur = () => {
    if (!wrapRef.current) return;
    wrapRef.current.style.paddingBottom = '40px';
  };

  useEffect(() => {
    if (type === 'quote') {
      setText('');
    } else {
      if (selectedComment) setText(selectedComment.commentContent);
    }
  }, [selectedComment]);

  const handleDimClick = () => {
    if (isModalEdit) {
      setSelectedComment(null);
      setActiveCancelModal(true);
      setInsertMode(false);
    } else {
      setInsertMode(false);
    }
  };
  const handleModalAction = () => {
    setText('');
    setIsModalEdit(false);
    setActiveCancelModal(false);
  };

  return (
    <>
      <div className={cn('dao-check-comments-modal-input-wrap', { 'insert-mode': insertMode })}>
        {insertMode && type !== 'quote' && <div className={cn('dao-check-comments-modal-input-dim')} onClick={handleDimClick}></div>}
        <div className={cn('dao-check-comments-modal-input')}>
          {insertMode && (
            <>
              {/* 23.03.28 수정: textarea 관련 기획 정의 수정 byte 추가 */}
              <Input.TextArea
                ref={modalTextAreaRef}
                onBlur={handleModalTextAreaBlur}
                className={cn('dao-comment-input')}
                showCount={{ formatter: ({ count, maxLength }) => `${count}/${maxLength} byte` }}
                maxLength={3000}
                bordered
                placeholder={type === 'quote' ? t('governance.checkComment.replyPlaceHolder') : t('governance.checkComment.commentPlaceHolder')}
                onChange={(e) => setText(e.target.value)}
                value={text}
                /* 23.04.04 수정: autoFocus 추가 */
                autoFocus
              />
              <BgButton
                buttonText={isMobile ? t('governance.checkComment.btnAdd') : t('governance.checkComment.btnWrite')}
                color="highlight"
                size="md"
                disabled={text.length === 0}
                onClick={handleSaveAction}
              />
            </>
          )}
          {!insertMode && (
            <Input
              onFocus={handleModalTextAreaFocus}
              className={cn('dao-comment-input', { 'wait-mode': !insertMode })}
              bordered
              placeholder={type === 'quote' ? t('governance.checkComment.replyPlaceHolder') : t('governance.checkComment.commentPlaceHolder')}
              value={text}
            />
          )}
        </div>
      </div>
      <ModalLayout
        isOpen={activeCancelModal}
        setIsOpen={setActiveCancelModal}
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
              setActiveCancelModal(false);
            }}
            key="cancel"
          />,
          <BgButton buttonText={t('governance.smallPopup.btn.editCancel')} color="black" size="md" key="Save" onClick={handleModalAction} />,
        ]}
      >
        <p>{t('governance.smallPopup.commentEditCancel.desc')}</p>
      </ModalLayout>
    </>
  );
};

export default React.memo(GovernanceCheckCommentModalInput);
