import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import NeithContentTitle from '@/components/neithstation/NeithContentTitle';

const NeithAbout: React.FC = () => {
  const { t } = useTranslation('neithStation');

  return (
    <section className={cn('about-wrap')}>
      <NeithContentTitle field="About" title={t('home.about.title')} />
      <div className={cn('video-wrap')}>
        <iframe
          className={cn('video-control')}
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/jdY3simW33Q"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default NeithAbout;
