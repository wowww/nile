import { ReactNode } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';

interface StripBannerProps {
  stripBannerContent: {
    logoUrl: string;
    desc: string | ReactNode;
    linkText: string;
    link: string;
  };
}

const LifeStripBanner = ({ stripBannerContent }: StripBannerProps) => {
  return (
    <div className={cn('life-strip-banner')}>
      <p className={cn('strip-desc')}>
        <i className={cn('strip-logo')}>
          <Image src={stripBannerContent.logoUrl} alt="" layout="fill" loader={NileCDNLoader} />
        </i>
        {stripBannerContent.desc}
      </p>
      <Link href={stripBannerContent.link}>
        <a className={cn('strip-link')}>
          <span className={cn('link-text')}>{stripBannerContent.linkText}</span>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
        </a>
      </Link>
    </div>
  );
};

export default LifeStripBanner;
