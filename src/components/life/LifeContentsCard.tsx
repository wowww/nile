import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';

export interface CardPropsType {
  title: string | undefined;
  account?: string | undefined;
  resourceUrl?: string;
  content: string | undefined;
  href: string | undefined;
  tagList?: { name: string; href: string }[];
  isTargetSelf?: boolean;
}

const LifeContentsCard = ({ title, account, resourceUrl, content, href, isTargetSelf }: CardPropsType) => {
  const isImage = (url: string | undefined) => {
    switch (url?.slice(-4)) {
      case 'null':
        return undefined;
      case '.mp4':
        return (
          <span key={`sns-video-${title}`}>
            <video autoPlay loop muted playsInline disablePictureInPicture>
              <source src={url} type="video/mp4" />
            </video>
          </span>
        )
      default:
        return <Image key={`sns-img`} src={`${resourceUrl}`} alt="" layout="fill" objectFit="cover" loader={NileCDNLoader} unoptimized />
    }
  };

  return (
    <li key={`article-${title}`}>
      <a href={href} target={isTargetSelf ? '_blank' : ''} rel={isTargetSelf ? 'noopener noreferrer' : ''}>
        <div className={cn('article')}>
          {resourceUrl && (
            <div className={cn('img-wrap')}>
              {isImage(resourceUrl)}
            </div>
          )}
          <div className={cn('text-wrap')}>
            <div className={cn('article-title')}>
              <strong>{title}</strong>
              {account}
            </div>
            <div className={cn('article-desc')}>
              {content}
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};

export default LifeContentsCard;
