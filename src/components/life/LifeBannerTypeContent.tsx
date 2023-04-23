import React, { ReactNode } from 'react';
import cn from 'classnames';
import useWindowResize from '@/hook/useWindowResize';
import { windowResizeAtom } from '@/state/windowAtom';
// 22.11.02 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';

// 22.11.09 수정: TextButton 추가
import TextButton from '@/components/button/TextButton';
import SquareTag from '@/components/tag/SquareTag';
import BgButton from '@/components/button/BgButton';
// 22.11.09 수정: message 추가
import { message } from 'antd';
import { useAtomValue } from 'jotai';
import LifeStripBanner from './LifeStripBanner';

export interface ContentPropsType {
  tagText: string;
  tagColor?: string;
  title: string;
  desc: string;
  // 22.11.09 수정 start: props 추가
  unfoldingSoon?: string;
  buttonDisabled?: boolean;
  // 22.11.09 수정 end: props 추가
  buttonLink: string;
  target?: string;
  metadata: { name: string; amount: string }[];
  classNames?: string;
  /* 22.11.22 수정: props 추가 */
  buttonText?: string;
  stripBannerContent?: {
    logoUrl: string;
    desc: string | ReactNode;
    linkText: string;
    link: string;
  };
}

const LifeBannerTypeContent: React.FC<ContentPropsType> = ({
  tagText,
  title,
  desc,
  unfoldingSoon,
  buttonDisabled,
  buttonLink,
  target = '_self',
  metadata,
  classNames,
  tagColor,
  /* 22.11.22 수정: props 추가 */
  buttonText,
  stripBannerContent,
}) => {
  const resizeEvtInit = useWindowResize();
  const offset = useAtomValue(windowResizeAtom);
  // 22.11.02 수정: useTranslation 추가
  const { t } = useTranslation('life');

  return (
    <div className={cn('life-banner-type-content', classNames)}>
      <div className={cn('content-inner')}>
        {/* 22.11.09 수정: bg-wrap 추가 */}
        <div className={cn('bg-wrap')}></div>
        <SquareTag color={tagColor}>{tagText}</SquareTag>
        <h3 className={cn('title')}>{title}</h3>
        <p className={cn('desc')}>{desc}</p>
        <div className={cn('btn-wrap')}>
          {/* 22.11.09 수정 start: 버튼 케이스 추가 props 상태 추가, 토스트 팝업 중복 생성 방지 코드로 수정 */}
          {offset.width < 768 ? (
            <TextButton
              type={buttonDisabled ? 'primary' : 'default'}
              /* 22.11.22 수정: 조건부 속성 추가 */
              buttonText={buttonText ? buttonText : t('home.nft.button')}
              iconValue="line-arrow"
              gapSpacing="lg"
              size="md"
              href={buttonDisabled && buttonLink ? undefined : buttonLink}
              onClick={buttonDisabled && buttonLink && unfoldingSoon ? () => message.info({ content: unfoldingSoon, key: 'toast' }) : undefined}
            />
          ) : (
            <BgButton
              type={buttonDisabled ? 'primary' : 'default'}
              /* 22.11.22 수정: 조건부 속성 추가 */
              buttonText={buttonText ? buttonText : t('home.nft.button')}
              color={'white'}
              size="md"
              href={buttonDisabled && buttonLink ? undefined : buttonLink}
              target={buttonDisabled && target ? undefined : target}
              onClick={buttonDisabled && unfoldingSoon ? () => message.info({ content: unfoldingSoon, key: 'toast' }) : undefined}
            />
          )}
          {/* 22.11.09 수정 end: 버튼 케이스 추가 props 상태 추가 */}
        </div>
        {/* <dl className={cn('metadata')}>
          {metadata.map((item, index) => {
            return (
              <div key={index}>
                <dt>{item.name}</dt>
                <dd>{item.amount}</dd>
              </div>
            );
          })}
        </dl> */}
      </div>
      {stripBannerContent && <LifeStripBanner stripBannerContent={stripBannerContent} />}
    </div>
  );
};

export default LifeBannerTypeContent;
