import cn from 'classnames';
import { Dropdown, Menu, message } from 'antd';
import CommentLikeButton from '@/components/button/CommentLikeButton';
import OutlineButton from '@/components/button/OutlineButton';
import { useTranslation } from 'next-i18next';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { CommentType, useCommentIndexContext, useCommentRefsContext } from './GovernanceCheckCommentsView';
import GovernanceCheckQuote from './GovernanceCheckQuote';
import GovernanceCheckCommentInput from './GovernanceCheckCommentInput';
import GovernanceCheckProfile from './GovernanceCheckProfile';
import ModalLayout from '@/components/modal/ModalLayout';
import BgButton from '@/components/button/BgButton';
import { ReactSVG } from 'react-svg';
import { useIsModalEditContext, useModalSelectedCommentContext } from './GovernanceCheckCommentsModal';

interface Props {
  type?: 'modal';
  comment: CommentType;
  setInsertMode?: Dispatch<SetStateAction<boolean>>;
  setShowInModalQuote?: Dispatch<SetStateAction<boolean>>;
}

const flagId = 1;

const GovernanceCheckComment = ({ type, comment, setInsertMode, setShowInModalQuote }: Props) => {
  const { t } = useTranslation(['common', 'dao']);
  const [_, setCommentIndex] = useCommentIndexContext();
  const [refs, __] = useCommentRefsContext();
  const [___, setSelectedComment] = useModalSelectedCommentContext();
  const [____, setIsModalEdit] = useIsModalEditContext();
  const [actionEdit, setActionEdit] = useState<boolean>(false);
  const [actionDelete, setActionDelete] = useState<boolean>(false);

  const commentRef = useRef<HTMLDivElement | null>(null);

  const moveToCommentInput = () => {
    refs.input?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleReplyComment = () => {
    if (type === 'modal' && setShowInModalQuote) {
      setCommentIndex(comment.id);
      setShowInModalQuote(true);
    } else {
      setCommentIndex(comment.id);
      moveToCommentInput();
    }
  };

  const handleEdit = () => {
    if (type === 'modal' && setInsertMode) {
      setIsModalEdit(true);
      setInsertMode(true);
      setSelectedComment(comment);
    } else {
      setIsModalEdit(false);
      setActionEdit(true);
    }
  };
  const handleDelete = () => {
    setActionDelete(true);
  };

  const menu = (
    <Menu
      className={cn('dao-check-comment-dropdown')}
      items={[
        {
          key: 'edit',
          label: <button onClick={handleEdit}>{t('dao:governance.checkComment.btnEdit')}</button>,
        },
        {
          key: 'delete',
          label: <button onClick={handleDelete}>{t('dao:governance.checkComment.btnDelete')}</button>,
        },
      ]}
    />
  );
  return (
    <>
      {actionEdit && type !== 'modal' && (
        <div className={cn('dao-check-edit-comment', 'dao-check-comment-card')}>
          <GovernanceCheckCommentInput type="edit" comment={comment} setCancel={setActionEdit} />
        </div>
      )}
      {!actionEdit && (
        <div id={'comment' + comment.id} className={cn('dao-check-comment-card')} ref={commentRef}>
          <div className={cn('card-header')}>
            <GovernanceCheckProfile id={comment.id} profileImgUrl={comment.profileImgUrl} walletAddress={comment.walletAddress} activeLink />
            {flagId === comment.id && (
              <Dropdown overlay={menu} trigger={['click']}>
                <button>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_more.svg" />
                </button>
              </Dropdown>
            )}
          </div>
          <span className={cn('date')}>
            {comment.date}
            {comment.edited && <span>&nbsp;(Edited)</span>}
          </span>
          {comment.quote && <GovernanceCheckQuote inComment showMore activeLink replyContent={comment.quote} />}
          <p className={cn('comment-content')}>{comment.commentContent}</p>
          <div className={cn('btn-wrap')}>
            <CommentLikeButton likeCount={comment.likeCount} />
            <CommentLikeButton type="unlike" likeCount={comment.likeCount} />
            <OutlineButton buttonText={t('dao:governance.checkComment.btnReply')} color="black" size="sm" onClick={handleReplyComment} />
          </div>
        </div>
      )}
      <ModalLayout
        isOpen={actionDelete}
        setIsOpen={setActionDelete}
        size="sm"
        title={t('dao:governance.smallPopup.commentDel.title')}
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <OutlineButton
            buttonText={t('dao:governance.smallPopup.btn.no2')}
            color="black"
            size="md"
            onClick={() => {
              setActionDelete(false);
            }}
            key="cancel"
          />,
          <BgButton
            buttonText={t('dao:governance.smallPopup.btn.yes2')}
            color="black"
            size="md"
            key="Save"
            onClick={() => {
              message.info({ content: t('dao:governance.smallPopup.toast.delete'), key: 'toast' });
              setActionDelete(false);
            }}
          />,
        ]}
      >
        <p>{t('dao:governance.smallPopup.commentDel.desc')}</p>
      </ModalLayout>
    </>
  );
};

export default React.memo(GovernanceCheckComment);
