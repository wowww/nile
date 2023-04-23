import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FacebookShareButton, TelegramShareButton, TwitterShareButton } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import cn from 'classnames';

import { Dropdown, message } from 'antd';
import BgButton from '@/components/button/BgButton';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import dynamic from 'next/dynamic';
import { NileApiService } from '@/services/nile/api';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface buttonPropsType {
  buttonType?: string;
  placement?: 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'top' | 'bottom' | undefined;
  telegram?: boolean;
  facebook?: boolean;
  customPath?: string;
  collection?: string;
  tokenId?: string;
  btnText?: number;
}

const ShareButton: React.FC<buttonPropsType> = ({
  buttonType,
  placement = 'bottomRight',
  telegram,
  facebook,
  customPath,
  collection,
  tokenId,
  btnText,
}) => {
  const { asPath, locale } = useRouter();
  const [isModal, setIsModal] = useState(false);

  const { t } = useTranslation('common');

  const { marketplace } = NileApiService();

  const sendShareActivity = async () => {
    if (collection) {
      if (tokenId && Number(tokenId)) {
        await marketplace.nft.share(collection, Number(tokenId));
      } else {
        await marketplace.collection.share(collection);
      }
    }
  };

  // share용 정보
  const shareUrl = `${process.env.NEXT_PUBLIC_ENV_NILE_APP}${locale === 'ko' ? '/ko' : ''}${customPath ? customPath : asPath}`;
  const shareTitle = 'NFT Is Life Evolution';
  const shareHashs = ['NILE'];
  const shareUsers = 'NILE_WM';

  const buttonView = () => {
    switch (buttonType) {
      case 'bgButton':
        return <BgButton buttonText={t('share', { ns: 'common' })} color={'black'} size={'md'} />;
      default:
        return (
          <button type="button" className={cn('btn-share')}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_share.svg" />
            <span className={cn('a11y')}>{t('share', { ns: 'common' })}</span>
          </button>
        );
    }
  };

  switch (buttonType) {
    case 'bgButton':
      return (
        <>
          <BgButton buttonText={t('share', { ns: 'common' })} color={'black'} size={'md'} onClick={() => setIsModal(true)} />
          <ModalLayout
            isOpen={isModal}
            setIsOpen={setIsModal}
            size="sm"
            title="Share"
            footer={true}
            destroyOnClose={true}
            wrapClassName={'share-modal'}
            footerContent={[
              <BgButton
                buttonText="Cancel"
                color="black"
                size="md"
                key="Save"
                onClick={() => {
                  setIsModal(false);
                }}
              />,
            ]}
          >
            <ul className={cn('share-list')}>
              <li>
                <FacebookShareButton title={shareTitle} url={shareUrl} hashtag={'#NILE'}>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_facebook.svg" />
                  <span>Facebook</span>
                </FacebookShareButton>
              </li>
              <li>
                <TwitterShareButton title={shareTitle} url={shareUrl} hashtags={shareHashs} via={shareUsers}>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_twitter.svg" />
                  <span>{t('shareBtn.twitter')}</span>
                </TwitterShareButton>
              </li>
              <li>
                <TelegramShareButton title={shareTitle} url={shareUrl}>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_telegram.svg" />
                  <span>Telegram</span>
                </TelegramShareButton>
              </li>
              <li>
                <CopyToClipboard text={shareUrl}>
                  <button type="button" onClick={() => message.info({ content: t('completeCopy'), key: 'toast' })}>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_copy_link_32.svg" />
                    <span>{t('shareBtn.copy')}</span>
                  </button>
                </CopyToClipboard>
              </li>
            </ul>
          </ModalLayout>
        </>
      );
    default:
      return (
        <div className={cn('share-wrap')}>
          <Dropdown
            overlay={
              <ul className={cn('share-list')}>
                {facebook && (
                  <li>
                    <FacebookShareButton
                      title={shareTitle}
                      url={shareUrl}
                      hashtag={'#NILE'}
                      onClick={() => {
                        console.log('click fb');
                        sendShareActivity();
                      }}
                    >
                      Facebook
                    </FacebookShareButton>
                  </li>
                )}
                <li>
                  <TwitterShareButton
                    title={shareTitle}
                    url={shareUrl}
                    hashtags={shareHashs}
                    via={shareUsers}
                    onClick={() => {
                      console.log('click tw');
                      sendShareActivity();
                    }}
                  >
                    {t('shareBtn.twitter')}
                  </TwitterShareButton>
                </li>
                {telegram && (
                  <li>
                    <TelegramShareButton
                      title={shareTitle}
                      url={shareUrl}
                      onClick={() => {
                        console.log('click tg');
                        sendShareActivity();
                      }}
                    >
                      Telegram
                    </TelegramShareButton>
                  </li>
                )}
                <li>
                  <CopyToClipboard text={shareUrl}>
                    {/* 22.11.09 수정: 토스트 팝업 중복 생성 방지 코드로 수정 */}
                    <button
                      type="button"
                      onClick={() => {
                        console.log('click copy');
                        sendShareActivity();
                        message.info({ content: t('completeCopy'), key: 'toast' });
                      }}
                    >
                      {t('shareBtn.copy')}
                    </button>
                  </CopyToClipboard>
                </li>
              </ul>
            }
            trigger={['click']}
            placement={placement}
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          >
            <button type="button" className={cn('btn-share')}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_share.svg" />
              <span className={cn('a11y')}>{t('share', { ns: 'common' })}</span>
              {btnText && <span className={cn('btn-text')}>{btnText.toLocaleString('ko-KR')}</span>}
            </button>
          </Dropdown>
        </div>
      );
  }
};

export default ShareButton;
