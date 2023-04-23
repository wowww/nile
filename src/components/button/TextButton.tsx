/* eslint-disable react/require-default-props */
import React, { ReactNode } from 'react';
import cn from 'classnames';
import { Button } from 'antd';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactSVG } from 'react-svg';
import { uuid } from 'uuidv4';

interface buttonPropsType {
  onClick?: () => void;
  buttonText: string | ReactNode;
  iconValue?: string; // icon type
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined; // link 타입일 경우 link 타입 추가
  href?: string; // link 타입일 경우에만 추가
  target?: string; // link 타입이고 새창열림일 경우 추가
  prefix?: boolean; // 아이콘이 앞에 있는 경우
  gapSpacing?: 'lg' | 'md' | 'sm' | undefined; // 버튼 텍스트 사이 간격 (default: md) lg: 8px, md: 4px, sm: 2px
  size: string;
  direction?: 'right' | 'left' | 'top' | 'bottom' | undefined; // arrow 방향
}

const TextButton: React.FC<buttonPropsType> = ({
  onClick,
  buttonText,
  iconValue,
  href,
  prefix,
  gapSpacing = 'md',
  size,
  type,
  target,
  direction = 'right',
}) => {
  const { t } = useTranslation(['common']);
  // 22.11.09 수정: 라우트 연결 추가
  const { locale } = useRouter();
  const key = uuid();
  /* 23.04.05 수정: arrow XL 케이스/svg 추가 */
  const viewIcon = () => {
    switch (iconValue) {
      case 'line-arrow': // info icon
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_right.svg" />;
      case 'arrow': // info icon
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />;
      case 'arrow-xl': // info icon
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_single_arrow.svg" />;
      case 'scroll': // Papyrus icon
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_scroll.svg" />;
      case 'link': // link icon
        return <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg" />;
      default:
        return false;
    }
  };

  const localeValue = locale === 'ko' ? `/${locale}` : '';

  return (
    <>
      {href ? (
        <Link href={target === '_blank' ? href : { pathname: localeValue + href }} key={key} passHref={target === '_blank'}>
          <a
            onClick={onClick}
            className={cn(
              `ant-btn btn btn-text btn-spacing-${gapSpacing} ${size}`,
              iconValue !== undefined ? `btn-icon-${iconValue}` : '',
              iconValue === 'arrow' ? `arrow-dir-${direction}` : '',
              iconValue === 'link' ? `link-dir-${direction}` : '',
              type,
            )}
            target={target}
            title={target === '_blank' ? t('blank') : undefined}
          >
            {iconValue && prefix && viewIcon()}
            <span>{buttonText}</span>
            {!prefix && viewIcon()}
          </a>
        </Link>
      ) : (
        <Button
          onClick={onClick}
          className={cn(
            `btn btn-text btn-spacing-${gapSpacing} ${size}`,
            iconValue !== undefined ? `btn-icon-${iconValue}` : '',
            iconValue === 'arrow' ? `arrow-dir-${direction}` : '',
            iconValue === 'link' ? `link-dir-${direction}` : '',
          )}
          type={type}
          key={key}
          title={target === '_blank' ? t('blank') : undefined}
        >
          {iconValue && prefix && viewIcon()}
          <span>{buttonText}</span>
          {!prefix && viewIcon()}
        </Button>
      )}
    </>
  );
};
export default TextButton;
