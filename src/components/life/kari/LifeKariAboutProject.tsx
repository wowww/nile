import cn from 'classnames';
import { Trans, useTranslation } from 'next-i18next';
import { LifeKariTitle } from './LifeKariTitle';

const LifeKariAboutProject = () => {
  const { t } = useTranslation('life');
  return (
    <div className={cn('about-project-wrap')}>
      <LifeKariTitle smallTitle="About Project" largeTitle="Kari from Ari Universe" align="center" />
      <p className={cn('desc')}>{t('kari.about.desc')}</p>
      <ul className={cn('card-wrap')}>
        <li>
          <p>{t('kari.about.card.title1')}</p>
          <strong>25 WEMIX$</strong>
        </li>
        <li>
          <p>{t('kari.about.card.title2')}</p>
          <strong>200 NFTs / Fixed Price</strong>
        </li>
        <li>
          <p>{t('kari.about.card.title3')}</p>
          <strong>2023.04.03</strong>
        </li>
      </ul>
    </div>
  );
};

export { LifeKariAboutProject };
