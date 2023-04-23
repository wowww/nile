import cn from 'classnames';
import { ReactSVG } from 'react-svg';

const BagcInformation = () => {
  return (
    <div className={cn('bagc-information-container')}>
      <div className={cn('bagc-information-wrap')}>
        <strong className={cn('bagc-information-title')}>Check more information</strong>
        <div className={cn('bagc-information-link')}>
          <a href="https://bagc.altava.com" target="_blank" rel="noopener noreferrer" title="bagc 홈 새창열림">
            <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_homepage.svg" />
          </a>
          <a href="https://twitter.com/bored_golf" target="_blank" rel="noopener noreferrer" title="bagc 트위터 새창열림">
            <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_twitter.svg" />
          </a>
          <a href="https://discord.gg/altava" target="_blank" rel="noopener noreferrer" title="bagc 디스코드 새창열림">
            <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_discord.svg" />
          </a>
          <a href="https://bored-ape-golf-club.gitbook.io/about-the-project/" target="_blank" rel="noopener noreferrer" title="bagc 깃북 새창열림">
            <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_gitbook.svg" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BagcInformation;
