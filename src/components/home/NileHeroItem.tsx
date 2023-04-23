import { NileCDNLoader } from '@/utils/image/loader';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  className?: string;
  link: string;
  targetBlank?: boolean;
  imgUrl: string;
  imgUrlMobile?: string | null;
  name: string;
  desc: string;
  neithBadge?: boolean;
}

const NileHeroItem = ({ className = '', link, targetBlank = false, imgUrl, imgUrlMobile = null, name, desc, neithBadge = false }: Props) => {
  return (
    <div className={cn('nile-hero-item', className)}>
      <Link href={link} target={targetBlank ? '_blank' : '_self'}>
        <a className={cn('item-wrap')}>
          <div className={cn('contents-wrap')}>
            <div className={cn('img-wrap')}>
              <span className={cn('pc')}>
                <Image src={imgUrl} alt="" layout="fill" objectFit="cover" loader={NileCDNLoader} priority />
              </span>
              {imgUrlMobile && (
                <span className={cn('mobile')}>
                  <Image src={imgUrlMobile} alt="" layout="fill" objectFit="cover" loader={NileCDNLoader} priority />
                </span>
              )}
              {neithBadge && (
                <div className={cn('badge-wrap')}>
                  <Image src="/assets/images/img/img_neith_nft_badge.png" alt="NEITH NFT" layout="fill" objectFit="contain" loader={NileCDNLoader} />
                </div>
              )}
            </div>
            <div
              className={cn('info-wrap has-logo-contents', {
                desc: desc,
              })}
            >
              <div>
                <p className={cn('info-title')}>{name}</p>
                <div className={cn('info-bottom')}>
                  <p className={cn('info-desc')}>{desc}</p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default NileHeroItem;
