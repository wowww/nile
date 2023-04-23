import cn from 'classnames';
import BgButton from '@components/button/BgButton';
import { ReactNode } from 'react';
import { useTranslation } from 'next-i18next';

interface NileHeroContentProps {
  children?: ReactNode;
  button?: {
    text?: string;
    link?: string;
    target?: string;
  };
}

const NileHeroContent = ({ children, button }: NileHeroContentProps) => {
  const { t } = useTranslation(['nile', 'common']);

  return (
    <div className={cn('nile-hero-content')}>
      <div className={cn('text-wrap')}>
        <div className={cn('title-wrap')}>
          <h2 className={cn('title')}>
            NFT is <br className={cn('br')} />
            Life Evolution
          </h2>
          <p className={cn('desc')}>{t('home.hero.desc')}</p>
        </div>
        <BgButton buttonText={button?.text} color="black" size="lg" href={button?.link} target={button?.target} />
      </div>
      {children}
    </div>
  );
};
export default NileHeroContent;
