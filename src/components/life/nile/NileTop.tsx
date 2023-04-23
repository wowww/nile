import Image from 'next/image';

import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import BgButton from '@/components/button/BgButton';

import { forwardRef } from 'react';
import { NileCDNLoader } from '@utils/image/loader';
import { ReactSVG } from 'react-svg';

const NileTop = forwardRef<HTMLDivElement>(({}, ref) => {
  const { t } = useTranslation(['life', 'common']);

  const copyEvent = (times: number, image: string) => {
    let newList = [];

    for (let i = 0; i < times; i++) {
      newList.push(image);
    }

    return (
      <>
        {newList.map((item, index) => (
          <div key={`star-${index}`} className={cn('img-box')}>
            <Image src={item} alt="" layout="fill" objectFit="cover" loader={NileCDNLoader} />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className={cn('life-nile-top-section')} ref={ref}>
      <div className={cn('nile-inner')}>
        <h2>
          <strong>Sights of NILE(SON)</strong>
          <span>The First NILE Original Project</span>
        </h2>
        <span className={cn('text-scroll')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_scroll.svg" />
          SCROLL
        </span>

        <div className={cn('btn-wrap')}>
          <BgButton href="/marketplace/SON6/1" color="white" size="lg" buttonText="View Results" />
        </div>
      </div>
      <div className={cn('nile-bg')}>
        <div className={cn('pyramid-wrap')}>
          <Image src="/assets/images/img/bg_nile_pyramid.png" alt="" layout="fill" objectFit="contain" loader={NileCDNLoader} priority />
        </div>

        <span className={cn('star-wrap star1')}>{copyEvent(2, '/assets/images/img/img_nile_star1.png')}</span>
        <span className={cn('star-wrap star2')}>{copyEvent(2, '/assets/images/img/img_nile_star2.png')}</span>
        <span className={cn('star-wrap star3')}>{copyEvent(2, '/assets/images/img/img_nile_star3.png')}</span>
      </div>

      <div className={cn('nile-gradient')}></div>
    </div>
  );
});

export default NileTop;
