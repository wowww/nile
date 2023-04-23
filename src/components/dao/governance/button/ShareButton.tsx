import cn from 'classnames';
import { Dropdown } from 'antd';
import { FacebookShareButton, TelegramShareButton, TwitterShareButton } from 'react-share';
import OutlineButton from '@components/button/OutlineButton';
import { useTranslation } from 'next-i18next';

interface ShareButtonProps {
  title?: string;
  url: string;
}

const ShareButton = ({ title, url }: ShareButtonProps) => {
  const { t } = useTranslation(['dao', 'common']);

  return (
    <div className={cn('share-wrap')}>
      <Dropdown
        overlay={
          <ul className={cn('share-list')}>
            <li>
              <FacebookShareButton
                title={title}
                url={`https://nile.io${url}`}
              >
                Facebook
              </FacebookShareButton>
            </li>

            <li>
              <TwitterShareButton
                title={title}
                url={`https://nile.io${url}`}
                hashtags={[]}
                via="/"
              >
                {t('shareBtn.twitter', { ns: 'common' })}
              </TwitterShareButton>
            </li>

            <li>
              <TelegramShareButton
                title={title}
                url={`https://nile.io${url}`}
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
        <OutlineButton buttonText={t('governance.proposal.btn.2')} size="sm" color="black" iconType iconValue="share_12" />
      </Dropdown>
    </div>
  );
};

export default ShareButton;