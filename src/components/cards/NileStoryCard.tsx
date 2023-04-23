import { useCallback, useEffect, useRef } from 'react';
import cn from 'classnames';
import Image from 'next/image';
/* 22.11.09 수정: Chip -> Tag로 교체 */
import Tag from '@/components/tag/Tag';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';

import { useInView } from 'react-intersection-observer';

interface Props {
  image?: string;
  videoUrl?: string;
  tags?: string[];
  title?: string;
  content?: string;
  link?: string;
  date?: string;
  work?: string;
  info?: string;
  creator?: string;
  columnist?: string;
}

const NileStoryCard = ({ image, videoUrl, tags, title, content, link, date, work, info, creator, columnist }: Props) => {
  const { t } = useTranslation('nile');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 1 });
  const setRefs = useCallback(
    (node: any) => {
      videoRef.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

  useEffect(() => {
    if (inView) {
      if (videoRef.current) {
        videoRef.current?.play();
      }
    } else {
      if (videoRef.current) {
        videoRef.current?.pause();
      }
    }
  }, [inView]);

  return (
    <Link href={link ?? ''}>
      <a className={cn('story-card')}>
        <div className={cn('thumbnail')}>
          {image ? (
            /* 23.02.08 수정: 비율 관련 이슈 수정 */
            // <Image src={image} layout="fill" alt="" objectFit="contain" loader={NileCDNLoader} />
            <Image src={image} alt="" width="0" height="0" sizes="100vw" className="w-full h-auto" loader={NileCDNLoader} />
          ) : (
            <span className={cn('video-wrap')}>
              <video autoPlay loop muted playsInline disablePictureInPicture ref={setRefs}>
                <source src={videoUrl} type="video/mp4" />
              </video>
            </span>
          )}
        </div>
        <div className={cn('text-area')}>
          <div>
            {tags?.map((item, idx) => (
              <Tag size="s" key={`${item}-${idx}`}>
                {t(item)}
              </Tag>
            ))}
          </div>
          {title && <h3 className={cn('card-title')}>{t(title)}</h3>}
          {content && <p className={cn('content')}>{t(content)}</p>}
          <div className={cn('bottom-info')}>
            <div className={cn('writer-wrap')}>
              {columnist && (
                <span className={cn('person')}>
                  <span className={cn('category')}>Columnist</span>
                  <span className={cn('name')}>{t(columnist)}</span>
                </span>
              )}
              {creator && (
                <span className={cn('person')}>
                  <span className={cn('category')}>Creator</span>
                  <span className={cn('name')}>{t(creator)}</span>
                </span>
              )}
            </div>
            <span className={cn('date')}>{date}</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default NileStoryCard;
