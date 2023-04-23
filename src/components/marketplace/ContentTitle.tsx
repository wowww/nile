import React, { ReactNode } from 'react';
import cn from 'classnames';
// 22.11.02 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
/* 22.11.10 수정: 링크 수정 */
import Link from 'next/link';

interface Props {
  title?: string;
  titleSize?: 'md' | 'sm' | 'xs';
  serif?: boolean;
  href?: string;
  desc?: string | ReactNode;
  newWindow?: boolean;
}

const ContentTitle: React.FC<Props> = ({ title, titleSize = 'sm', serif = false, href, desc, newWindow = false }): JSX.Element => {
  // 22.11.02 수정: useTranslation 추가
  const { t } = useTranslation('common');

  const newWindowAttribute = {
    ...(newWindow && { target: '_blank', rel: 'noopener noreferrer' }),
  };
  return (
    <div className={cn('content-title', serif && 'serif')}>
      <h2 className={cn('title-text', titleSize)}>{title}</h2>
      {/* 22.11.10 수정 start: 링크 수정 */}
      {href && (
        <Link href={href} passHref>
          <a href={href} {...newWindowAttribute}>
            {t('gotoLink')}
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
          </a>
        </Link>
      )}
      {/* 22.11.10 수정 end: 링크 수정 */}
      {desc && <p>{desc}</p>}
    </div>
  );
};

export default ContentTitle;
