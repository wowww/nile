import { ReactSVG } from 'react-svg';
import cn from 'classnames';

export const LifeInformation = () => {
  return (
    <div className={cn('life-information-container')}>
      <div className={cn('life-information-wrap')}>
        <strong className={cn('life-information-title')}>Check more information</strong>
        <div className={cn('life-information-link')}>
          <a href="https://tangled.im/" target="_blank" rel="noopener noreferrer" title="새창열림">
            <ReactSVG src='https://nile.blob.core.windows.net/images/icons/ico_homepage.svg' />
          </a>
          <a href="https://twitter.com/tangled_NFT" target="_blank" rel="noopener noreferrer" title="새창열림">
            <ReactSVG src='https://nile.blob.core.windows.net/images/icons/ico_twitter.svg' />
          </a>
          <a href="https://discord.com/invite/tUNwSykFGb" target="_blank" rel="noopener noreferrer" title="새창열림">
            <ReactSVG src='https://nile.blob.core.windows.net/images/icons/ico_discord.svg' />
          </a>
        </div>
        <span className={cn('life-infor-shape01')}></span>
      </div>
    </div>
  );
};