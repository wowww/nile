import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import BgButton from '@/components/button/BgButton';
import Tag from '@/components/tag/Chip';
import { CSSProperties, ReactNode, useState } from 'react';

export interface SectionPropsType {
  contentsType: 'twitter' | 'article';
  /* 23.03.11 수정: tagText 배열로 변경 */
  tagText: { type: 'neith' | 'general'; text: string }[];
  classNames: string;
  title: string;
  content: string;
  snsList?: { name: string; url: string }[];
  /* 23.04.12 수정: 버튼 target props 추가 */
  /* 23.03.11 수정: 버튼 리스트로 받도록 수정 */
  buttonList: { buttonText: string; buttonLink: string; target?: string }[];
  backgroundImage: string;
  isDarkType?: boolean;
  children?: ReactNode;
  /* 23.04.13 수정: backgroundColor props 추가 */
  backgroundColor?: string;
}

const LifeContentsSection = ({
  contentsType,
  tagText,
  classNames,
  title,
  content,
  snsList,
  backgroundImage,
  isDarkType = false,
  children,
  buttonList,
  /* 23.04.13 수정: backgroundColor props 추가 */
  backgroundColor,
}: SectionPropsType) => {
  const { t } = useTranslation('life');

  /* 23.04.13 수정: backgroundColor props 추가 */
  const style = () => {
    let bgStyle;
    if (backgroundImage) bgStyle = { backgroundImage: `url(${backgroundImage})` };
    if (backgroundColor) bgStyle = { ...bgStyle, backgroundColor: backgroundColor };
    return bgStyle;
  };
  const [bgStyle, setBgStyle] = useState(style);

  const viewIcon = (iconValue: string) => {
    switch (iconValue) {
      case 'homepage':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_homepage.svg" />;
      case 'twitter':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_twitter.svg" />;
      case 'instagram':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_instagram.svg" />;
      case 'youtube':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_youtube.svg" />;
      case 'discord':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_discord.svg" />;
      /* 23.04.13 수정: gitbook 추가 */
      case 'gitbook':
        return <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_gitbook.svg" />;
      default:
        return false;
    }
  };

  return (
    <div
      className={cn(
        'life-twitter-type-content',
        classNames,
        isDarkType ? 'dark-type' : '',
        !snsList ? 'non-sns' : '',
        contentsType === 'article' ? 'article-type' : 'twitter-type',
      )}
      style={bgStyle as CSSProperties}
    >
      <div className={cn('content-inner')}>
        <div className={cn('content-top')}>
          <div className={cn('text-wrap')}>
            <div className={cn('tag-wrap')}>
              {/* 23.03.11 수정: 태그 리스트로 받도록 수정 */}
              <div className={cn('tag-box')}>
                {tagText.map((item) =>
                  item.type === 'neith' ? (
                    <Tag key={`tag-${item.text}`} size="lg" type={item.type}>
                      {item.text}
                    </Tag>
                  ) : (
                    <Tag key={`tag-${item.text}`} size="lg">
                      {item.text}
                    </Tag>
                  ),
                )}
              </div>
              {snsList && (
                <ul className={cn('sns-wrap')}>
                  {snsList.map((item, index) => {
                    return (
                      <li key={`link${index}`}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" title={t('blank', { ns: 'common' })}>
                          {viewIcon(item.name)}
                          <span className={cn('a11y')}>{item.name}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <h3 className={cn('title')}>{title}</h3>
            <p className={cn('desc')}>{content}</p>
          </div>
          <div className={cn('btn-wrap')}>
            {/* 23.04.12 수정: 버튼 target props 추가 */}
            {/* 23.03.11 수정: 버튼 리스트로 받도록 수정 */}
            {buttonList.map((item, index) => (
              /* 23.04.13 수정: target 추가 */
              <BgButton buttonText={item.buttonText} size="md" color="white" href={item.buttonLink} key={`btn-${index}`} target={item.target} />
            ))}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default LifeContentsSection;
