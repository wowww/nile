import { ReactSVG } from 'react-svg';
import { FacebookShareButton, TelegramShareButton, TwitterShareButton } from 'react-share';

// hooks
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import useMediaQuery from '@/hook/useMediaQuery';
import { useState } from 'react';
import { useCharacterFirstUppercase } from '@/hook/useCharacterConverter';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

// component
import BgButton from '@/components/button/BgButton';
import ModalLayout from '@/components/modal/ModalLayout';
import Tag from '@/components/tag/Tag';
import OutlineButton from '@/components/button/OutlineButton';
import { Avatar, Dropdown, message } from 'antd';
import SquareTag from '@/components/tag/SquareTag';
import ProfileModal from '@/components/modal/ProfileModal';
import GovernanceCommentView from '@components/dao/ui/governance/contents/GovernanceCommentView';

// 공유하기 버튼 분기 컴포넌트
const ShareButtonComponent = () => {
  const { t } = useTranslation(['dao', 'common']);

  const activeDao = useAtomValue(daoThemeAtom);
  return (
    <div className={cn('share-wrap')}>
      <Dropdown
        overlay={
          <ul className={cn('share-list')}>
            <li>
              <FacebookShareButton
                title="/"
                url="/"
                onClick={() => {
                  console.log('click fb');
                }}
              >
                Facebook
              </FacebookShareButton>
            </li>

            <li>
              <TwitterShareButton
                title="/"
                url="/"
                hashtags={[]}
                via="/"
                onClick={() => {
                  console.log('click tw');
                }}
              >
                {t('shareBtn.twitter', { ns: 'common' })}
              </TwitterShareButton>
            </li>

            <li>
              <TelegramShareButton
                title="/"
                url="/"
                onClick={() => {
                  console.log('click tg');
                }}
              >
                Telegram
              </TelegramShareButton>
            </li>
          </ul>
        }
        trigger={['click']}
        placement="bottom"
        getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
      >
        {/* 23.03.28 수정: share 아이콘 변경 */}
        <OutlineButton buttonText={t('governance.proposal.btn.2')} size="sm" color="black" iconType iconValue="share_12" />
      </Dropdown>
    </div>
  );
};

// default 는 temperature 타입입니다
// 타입은 총 4가지 입니다.
export interface Props {
  type?: 'temperature' | 'consensus' | 'governance' | 'trust';
  user?: 'writer' | 'trust-check' | null;
  stage?: 'active' | 'approved' | 'rejected' | 'executed';
  vote?: boolean;
  content?: {
    agenda: string;
    title: string;
  };
  comment: {
    count: number;
    href: string;
    link?: boolean;
  };
  view: number;
}

const GovernanceDetailHeader: React.FC<Props> = ({ type = 'temperature', user, stage, vote, content, comment, view }: Props) => {
  const [isModalSm, setModalSm] = useState(false);
  const [isModalSm3, setModalSm3] = useState(false);

  const { t } = useTranslation(['dao', 'common']);
  const { locale } = useRouter();

  const isMobile = useMediaQuery('(max-width: 767px)');
  const activeDao = useAtomValue(daoThemeAtom);

  return (
    <div className={cn('detail-header-area', locale)}>
      <div className={cn('title-area')}>
        <span className={cn('title')}>{useCharacterFirstUppercase(type)} Check</span>
        <div className={cn('tag-area')}>
          {stage !== 'executed' && (
            <Tag size="s" color={stage === 'rejected' ? 'light-gray' : 'black'}>
              {useCharacterFirstUppercase(stage)}
            </Tag>
          )}
          {type === 'governance' && stage === 'executed' && (
            <Tag size="s" type="primary" bg>
              {useCharacterFirstUppercase(stage)}
            </Tag>
          )}
          {type === 'trust' && <SquareTag>Trust Check</SquareTag>}
          {user === 'writer' && <SquareTag>My Proposal</SquareTag>}
          {type === 'temperature' && vote && <SquareTag>Participated</SquareTag>}
          {(type === 'consensus' || type === 'governance') && vote && (
            <SquareTag>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_check.svg" />
              Voted
            </SquareTag>
          )}
        </div>
      </div>
      {/* trust 만  bg 적용 */}
      <strong className={cn('sub-title', [type])}>{content && content.agenda}</strong>
      <p className={cn('header-desc')}>{content && content.title}</p>

      <div className={cn('detail-header-cont')}>
        <div className={cn('info-area')}>
          <button
            type="button"
            title={t('openProfile', { ns: 'common' })}
            className={cn('user-info')}
            onClick={() => {
              setModalSm3(true);
            }}
          >
            <Avatar
              className={cn('user-image type2')}
              size={isMobile ? 20 : 28}
              style={{ backgroundImage: `url(https://picsum.photos/32/32/?image=1)` }}
            />
            <span className={cn('wallet-address')}>0xabcd...abcd</span>
          </button>
          <GovernanceCommentView type="governanceList" comment={comment} view={view} />
        </div>
        <div className={cn('btn-area')}>
          <ShareButtonComponent />
          {/* 23.03.28 수정: 복사하기 버튼 아이콘 변경 */}
          <OutlineButton
            buttonText={t('governance.proposal.btn.3')}
            size="sm"
            color="black"
            iconType
            iconValue="copy_link_12"
            onClick={() => {
              message.info({ content: t('copyLink', { ns: 'common' }), key: 'toast' });
            }}
          />

          {user === 'writer' && (
            <>
              <OutlineButton buttonText={t('governance.proposal.btn.5')} size="sm" color="black" />
              {type === 'temperature' && stage === 'active' && (
                <OutlineButton
                  buttonText={t('governance.proposal.btn.6')}
                  size="sm"
                  color="black"
                  onClick={() => {
                    setModalSm(true);
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* 안건삭제 팝업  */}
      <ModalLayout
        isOpen={isModalSm}
        setIsOpen={setModalSm}
        size="sm"
        title={t('governance.smallPopup.delProposal.title')}
        footer={true}
        destroyOnClose={true}
        footerContent={[
          <OutlineButton
            buttonText={t('governance.smallPopup.btn.no')}
            color="black"
            size="md"
            onClick={() => {
              setModalSm(false);
            }}
            key={t('governance.smallPopup.btn.no')}
          />,
          <BgButton
            buttonText={t('governance.smallPopup.btn.yes')}
            color="black"
            size="md"
            key={t('governance.smallPopup.btn.yes')}
            onClick={() => {
              setModalSm(false);
              message.info({ content: t('governance.smallPopup.delProposal.msg', { ns: 'common' }), key: 'delete' });
            }}
          />,
        ]}
      >
        {t('governance.smallPopup.delProposal.desc')}
      </ModalLayout>

      <ProfileModal
        isOpen={isModalSm3}
        setIsOpen={setModalSm3}
        nileUser={{
          nickname: 'Polaris Liu',
          address: '0x65b2...1413',
          url: 'https://joeschmoe.io/api/v1/random',
        }}
      />
    </div>
  );
};

export default GovernanceDetailHeader;
