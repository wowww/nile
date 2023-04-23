import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import LifeHeroMarquee from './LifeHeroMarquee';

const LifeHero = () => {
  const { t } = useTranslation(['life', 'common']);

  return (
    <div className={cn('life-hero-wrap')}>
      <div className={cn('title-wrap')}>
        <h2 className={cn('title')}>Life beyond expectation</h2>
        <p className={cn('desc')}>{'There are various projects in Life. \nWith Life, new experiences become a daily life.'}</p>
      </div>
      {/* 23.03.14 수정: 영역 삭제 */}
      {/* <LifeHeroMarquee /> */}
    </div>
  );
};

export default LifeHero;
