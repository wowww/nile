import React, { useMemo, ReactNode } from 'react';
import cn from 'classnames';
import { Button } from 'antd';
import { uuid } from 'uuidv4';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ReactSVG } from 'react-svg';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Popover = dynamic(() => import('antd/lib/popover'), { ssr: false });
const imgRoot = 'https://nile.blob.core.windows.net/images/assets/images/icon';

interface buttonPropsType {
  onClick?: () => void;
  /* 22.12.28 수정: buttonText 타입 추가 */
  buttonText: string | ReactNode;
  block?: boolean;
  color: string;
  size: string;
  // size: "table-xs" | "xs" | "sm" | "md" | "lg" | "lg-f" | "xl" | "full";
  disabled?: boolean;
  iconType?: boolean; // iconType 일 경우 true
  iconValue?: string; // icon name
  align?: boolean; // space-between 일 경우 true
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined; // link 타입일 경우 link 타입 추가
  href?: string; // link 타입일 경우에만 추가
  target?: string; // link 타입이고 새창열림일 경우 추가
  hasTooltip?: boolean; // 툴팁 여부
  tooltipPlace?: any; // 툴팁 방향 컨트롤 필요 시
  /* 22.12.28 수정: tooltipHtml props 추가 */
  tooltipHtml?: string | ReactNode;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  tooltipClassName?: string;
}

const BgButton: React.FC<buttonPropsType> = ({
  onClick,
  buttonText,
  block,
  color,
  size,
  iconType,
  iconValue,
  align,
  disabled,
  type,
  href,
  target,
  hasTooltip,
  /* 22.12.28 수정: tooltipHtml props 추가 */
  tooltipHtml,
  tooltipPlace,
  tooltipClassName,
  htmlType,
}) => {
  const { t } = useTranslation(['common']);
  const key = uuid();
  const { locale } = useRouter();

  const localeValue = useMemo(() => (locale === 'ko' ? `/${locale}` : ''), [locale]);

  const linkOption = {
    onClick: onClick,
    key: key,
    className: cn(`ant-btn btn btn-bg bg-${color} btn-${size}`, type),
    title: target === '_blank' ? t('blank') : undefined,
    target: target,
  };

  const buttonOption = {
    onClick: onClick,
    block: block,
    className: cn(`btn btn-bg bg-${color} btn-${size}`),
    disabled: disabled,
    type: type,
    target: target,
    key: key,
    title: target === '_blank' ? t('blank') : undefined,
    htmlType: htmlType,
  };

  return (
    <>
      {hasTooltip ? (
        <>
          <Popover
            overlayClassName={`tooltip ${tooltipClassName ? tooltipClassName : undefined}`}
            placement={tooltipPlace}
            /* 22.12.28 수정: tooltipHtml props 추가 */
            content={<div className={cn('tooltip-contents')}>{tooltipHtml ? tooltipHtml : 'Unfolding Soon'}</div>}
            trigger="click"
            open={true}
          >
            {href ? (
              /* 23.02.03 수정 start: Popover 렌더링 시 클래스 바인딩 오류로 Fragment 추가 */
              <>
                <Link href={target === '_blank' ? href : localeValue + href} passHref>
                  <a {...linkOption}>
                    <span>
                      <ButtonIcon iconType={iconType} buttonText={buttonText} iconValue={iconValue} align={align} />
                    </span>
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Button {...buttonOption}>
                  <ButtonIcon iconType={iconType} buttonText={buttonText} iconValue={iconValue} align={align} />
                </Button>
              </>
              /* 23.02.03 수정 end: Popover 렌더링 시 클래스 바인딩 오류로 Fragment 추가 */
            )}
          </Popover>
        </>
      ) : (
        <>
          {!disabled && href ? (
            <Link href={target === '_blank' ? href : localeValue + href} passHref>
              <a {...linkOption}>
                <span>
                  <ButtonIcon iconType={iconType} buttonText={buttonText} iconValue={iconValue} align={align} />
                </span>
              </a>
            </Link>
          ) : (
            <Button {...buttonOption}>
              <ButtonIcon iconType={iconType} buttonText={buttonText} iconValue={iconValue} align={align} />
            </Button>
          )}
        </>
      )}
    </>
  );
};

const ButtonIcon = ({
  iconType,
  buttonText,
  iconValue,
  align,
}: {
  iconType?: boolean;
  buttonText: string | ReactNode;
  iconValue?: string;
  align?: boolean;
}) => {
  return (
    <>
      {!iconType ? (
        buttonText
      ) : (
        <span className={cn('btn-inner', align && 'space-between')}>
          {!align && iconValue && <ReactSVG src={`${imgRoot}/ico_${iconValue}.svg`} />}
          <span>{buttonText}</span>
          {align && iconValue && <ReactSVG src={`${imgRoot}/ico_${iconValue}.svg`} />}
        </span>
      )}
    </>
  );
};

export default BgButton;
