import cn from 'classnames';
import { Trans, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { NileCDNLoader } from '@/utils/image/loader';
import Image from 'next/image';

const BagcMoreAbout = () => {
  return (
    <div className={cn('bagc-more-about')}>
      <div className={cn('bagc-more-about-title-content')}>
        <div className={cn('title-wrap')}>
          <strong>More about BAGC</strong>
        </div>
        <div className={cn('bagc-content-wrap')}>
          <div className={cn('img-wrap')}>
            <Image src={'/images/img_life_bagc_overview.png'} alt="" loader={NileCDNLoader} layout="fill" objectFit="cover" />
          </div>
          <div className={cn('content-list')}>
            <ul className={cn('content-detail')}>
              <li>
                <Trans i18nKey="bagc.overView.history.1" ns="life" components={[<span className={cn('bagc-color')}></span>]} />
              </li>
              <li>
                <Trans i18nKey="bagc.overView.history.2" ns="life" components={[<span className={cn('bagc-color')}></span>]} />
              </li>
              <li>
                <Trans i18nKey="bagc.overView.history.3" ns="life" components={[<span className={cn('bagc-color')}></span>]} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagcMoreAbout;
