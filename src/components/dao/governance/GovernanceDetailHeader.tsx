import { ReactSVG } from 'react-svg';

// hooks
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import useMediaQuery from '@/hook/useMediaQuery';
import { useState } from 'react';
import { useCharacterFirstUppercase } from '@/hook/useCharacterConverter';
import { useAtomValue } from 'jotai';
import { wonderProposalAtom } from "@/state/governanceAtom";

// component
import BgButton from '@/components/button/BgButton';
import ModalLayout from '@/components/modal/ModalLayout';
import Tag from '@/components/tag/Tag';
import OutlineButton from '@/components/button/OutlineButton';
import { Avatar, message } from 'antd';
import SquareTag from '@/components/tag/SquareTag';
import ProfileModal from '@/components/modal/ProfileModal';
import GovernanceCommentView from '@components/dao/governance/contents/GovernanceCommentView';
import ShareButton from '@components/dao/governance/button/ShareButton';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import { ProposalCheck, ProposalStatus } from '@/types/dao/proposal.types';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useLayoutResize } from '@utils/layout';

export interface Props {
  type?: 'temperature' | 'consensus' | 'governance' | 'trust';
  comment: {
    count: number;
    href: string;
    link?: boolean;
  };
  view: number;
}

const GovernanceDetailHeader: React.FC<Props> = ({ type = 'temperature', comment, view }: Props) => {
  const [isModalSm, setModalSm] = useState(false);
  const [isModalSm3, setModalSm3] = useState(false);

  const { t } = useTranslation(['dao', 'common']);
  const { locale, asPath } = useRouter();
  const { isMobile } = useLayoutResize();

  const proposal = useAtomValue(wonderProposalAtom);
  const nileWallet = useAtomValue(nileWalletAtom);

  return (
    <div className={cn('detail-header-area', locale)}>
      <div className={cn('title-area')}>
        <span className={cn('title')}>{useCharacterFirstUppercase(type)} Check</span>
        <div className={cn('tag-area')}>
          {(proposal?.status !== ProposalStatus.DONE || proposal?.check !== ProposalCheck.GOVERNANCE) && (
            <Tag size="s" color={proposal?.status === ProposalStatus.REJECTED ? 'light-gray' : 'black'}>
              Rejected
            </Tag>
          )}
          {proposal?.check === ProposalCheck.GOVERNANCE && proposal?.status === ProposalStatus.DONE && (
            <Tag size="s" type="primary" bg>
              Executed
            </Tag>
          )}
          {proposal?.check === ProposalCheck.TRUST && <SquareTag>Trust Check</SquareTag>}
          {proposal?.userAddress?.toLocaleLowerCase() === nileWallet?.toLowerCase() && <SquareTag>My Proposal</SquareTag>}

          {/*TODO: temperature check && vote*/}
          {/*<SquareTag>Participated</SquareTag>*/}

          {/*TODO: vote*/}
          {/*<SquareTag>*/}
          {/*  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_check.svg" />*/}
          {/*  Voted*/}
          {/*</SquareTag>*/}
        </div>
      </div>
      <strong className={cn('sub-title', [proposal?.check])}>{t(`governance.agenda.item.${Number(proposal?.spellType) + 1}`)}</strong>
      <p className={cn('header-desc')}>{proposal?.title}</p>

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
          <ShareButton url={asPath} title={proposal?.title} />
          <CopyToClipboard text={`https://nile.io${asPath}`}>
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
          </CopyToClipboard>

          {proposal?.userAddress?.toLowerCase() === nileWallet?.toLowerCase() && (
            <>
              <OutlineButton buttonText={t('governance.proposal.btn.5')} size="sm" color="black" />
              {proposal?.check === ProposalCheck.TEMPERATURE && proposal?.status === ProposalStatus.IN_PROGRESS && (
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
