import React, { useEffect, useState, ReactNode } from 'react';
import cn from 'classnames';
import { Button } from 'antd';
import { uuid } from 'uuidv4';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { ReactSVG } from 'react-svg';
import dynamic from 'next/dynamic';
import { UrlObject } from 'url';
import useMediaQuery from '@/hook/useMediaQuery';

const Popover = dynamic(() => import('antd/lib/popover'), { ssr: false });
const imgRoot = 'https://nile.blob.core.windows.net/images/assets/images/icon';

interface buttonPropsType {
  onClick?: () => void;
  buttonText: string;
  block?: boolean;
  color: string;
  size: string;
  disabled?: boolean;
  iconType?: boolean; // iconType 일 경우 true
  /* 23.03.06 수정: iconValue Type 수정*/
  iconValue?: string; // icon name
  align?: boolean; // space-between 일 경우 true
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined; // link 타입일 경우 link 타입 추가
  href?: string | UrlObject; // link 타입일 경우에만 추가
  target?: string; // link 타입이고 새창열림일 경우 추가
  hasTooltip?: boolean; // 툴팁 여부
  tooltipPlace?: any; // 툴팁 방향 컨트롤 필요 시
  tooltipClassName?: string; // 툴팁 제어 클래스 필요 시
}

const OutlineButton: React.FC<buttonPropsType> = ({
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
  tooltipPlace = 'bottom',
  tooltipClassName,
}) => {
  const { t } = useTranslation(['common']);
  const key = uuid();
  const [isOpenTooltip, setOpenToolTip] = useState(false);

  const linkOption = {
    onClick: onClick,
    /* 23.03.11 수정: disabled props 추가 */
    className: cn(`ant-btn btn btn-outline outline-${color} btn-${size}`, { block, disabled }),
    disabled: disabled,
    target: target,
    title: target === '_blank' ? t('blank') : undefined,
  };

  const buttonOption = {
    onClick: onClick,
    block: block,
    className: cn(`btn btn-outline outline-${color} btn-${size} `),
    disabled: disabled,
    type: type,
    key: key,
    title: target === '_blank' ? t('blank') : undefined,
  };
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1279px)');

  const handleOpenTooltip = (newOpen: boolean) => {
    if (!isMobile && isTablet) {
      setOpenToolTip(true);
    } else if (isMobile) {
      setOpenToolTip(true);
    } else {
      if (event?.currentTarget === document) {
        setOpenToolTip(true);
        return;
      }
      setOpenToolTip(newOpen);
    }
  };

  useEffect(() => {
    if (!isMobile && isTablet) {
      setOpenToolTip(true);
    } else if (isMobile) {
      setOpenToolTip(true);
    } else {
      setOpenToolTip(false);
    }
  }, [isMobile, isTablet]);

  return (
    <>
      {hasTooltip ? (
        <Popover
          overlayClassName={`tooltip ${tooltipClassName ? tooltipClassName : undefined}`}
          placement={tooltipPlace}
          content={<div className={cn('tooltip-contents')}>Unfolding Soon</div>}
          trigger="click"
          open={isOpenTooltip}
          onOpenChange={handleOpenTooltip}
        >
          {href ? (
            <Link href={href} key={key} passHref={target === '_blank'}>
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
        </Popover>
      ) : href ? (
        <Link href={href} key={key} passHref={target === '_blank'}>
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
  // iconValue와 img file name이 맞지 않는 경우 케이스 추가 필요
  const viewIcon = () => {
    switch (iconValue) {
      case 'papyrus': // Papyrus icon
        return 'papyrus2';
      case 'twitterColor': // twitter color icon
        return 'twitter_color';
      case 'instaColor': // twitter color icon
        return 'insta_color';
      case 'line-arrow': // line-arrow color icon
        return 'arrow_16';
      case 'copy':
        return 'copy_link';
      /* 23.02.14 수정: youtubeColor 아이콘 유형 추가 */
      case 'youtubeColor':
        return 'youtube2';
      /* 23.02.28 수정: add telegram icon */
      case 'telegram':
        return 'telegram2';
      /* 23.04.03 수정: add discord icon */
      case 'discord':
        return 'discord_lnb';
      case 'metamask':
        return 'metamask2';
      default:
        return iconValue;
    }
  };
  return (
    <>
      {!iconType ? (
        <span>{buttonText}</span>
      ) : (
        <span className={cn('btn-inner', align && 'space-between')}>
          {!align && iconValue && <ReactSVG src={`${imgRoot}/ico_${viewIcon()}.svg`} />}
          <span>{buttonText}</span>
          {align && iconValue && <ReactSVG src={`${imgRoot}/ico_${viewIcon()}.svg`} />}
        </span>
      )}
    </>
  );
};

export default OutlineButton;
