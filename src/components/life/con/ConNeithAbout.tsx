import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

const NeithAbout: React.FC = () => {
  const { t } = useTranslation('life');

  return (
    <div className={cn('life-neith-section about')}>
      <div className={cn('title')}>
        <h3>{t('con.neith.about.title')}</h3>
      </div>
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
    </div>
  );
};

export default NeithAbout;
