import { ReactSVG } from 'react-svg';
import cn from 'classnames';

const SnkrzSocialBanner = () => {
  return (
    <div className={cn('life-snkrz-information-container')}>
      <div className={cn('snkrz-information-wrap')}>
        <strong className={cn('snkrz-information-title')}>Check more information</strong>
        <div className={cn('snkrz-information-link')}>
          <a href="https://www.thesnkrz.com/" target="_blank" rel="noopener noreferrer" title="새창열림" className={cn('homepage')}>
            <ReactSVG src='https://nile.blob.core.windows.net/images/icons/ico_homepage.svg' />
          </a>
          <a href="https://twitter.com/theSNKRZ" target="_blank" rel="noopener noreferrer" title="새창열림">
            <ReactSVG src='https://nile.blob.core.windows.net/images/icons/ico_twitter.svg' />
          </a>
          <a href="https://discord.com/invite/thesnkrz" target="_blank" rel="noopener noreferrer" title="새창열림">
            <ReactSVG src='https://nile.blob.core.windows.net/images/icons/ico_discord.svg' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SnkrzSocialBanner;
