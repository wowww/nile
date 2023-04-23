import React from 'react';
import cn from 'classnames';

export const NileVisual = () => {

  return (
    <div className={cn('nile-visual')}>
      <div className={cn('video-wrap')}>
        <video autoPlay loop muted playsInline>
          <source src="https://nile.blob.core.windows.net/images/video/nile_main.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};