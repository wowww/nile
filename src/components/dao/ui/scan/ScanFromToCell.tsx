import { useState, useEffect, ReactElement } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { Avatar, Popover } from 'antd';

import { DaoScanTableButton } from '@/components/button/DaoScanTableButton';
import useMediaQuery from '@/hook/useMediaQuery';

export interface DataProps {
  key: string;
  hash?: {
    buttonName: string;
    buttonLink: string;
  };
  shortAge?: string;
  age: string;
  from: {
    buttonName?: string;
    buttonNameShort?: string;
    buttonLink: string;
    detailInfo?: string;
    linkType?: string | undefined;
    profileImgUrl?: string;
  };
  to: {
    buttonName?: string;
    buttonNameShort?: string;
    buttonLink: string;
    detailInfo?: string;
    linkType?: string | undefined;
    profileImgUrl?: string;
  };
  contract?: boolean;
  value: {
    num: number;
    unit: string;
  };
  fee: string;
}
interface Props {
  buttonLink?: string;
  buttonText?: string;
  buttonTextShort?: string;
  contract?: boolean;
  detailInfo?: string;
  profileImgUrl?: string;
  type?: 'from' | 'to' | 'hash';
}

const daoList: {
  [key: string]: string;
} = { Station: 'station', Treasury: 'treasury', Trust: 'trust', Incinerator: 'incinerator', Obelisk: 'stakingpool', Governance: 'governance' };

const ScanFromToCell = ({ buttonLink, buttonText, buttonTextShort, contract, detailInfo, profileImgUrl, type }: Props): ReactElement => {
  const [iconName, setIconName] = useState('Station');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const avatarUserType = profileImgUrl && {
    style: {
      background: `url(${profileImgUrl})`,
    },
  };

  useEffect(() => {
    if (buttonText && Object.keys(daoList).includes(buttonText)) {
      setIconName(buttonText);
    }
  }, [buttonText]);
  return (
    <div className={cn('dao-scan-table-button-wrap', type)}>
      {/* 프로토콜 or 유저인 경우 */}
      {((buttonText && Object.keys(daoList).includes(buttonText)) || typeof profileImgUrl === 'string') && (
        <div className={cn('img-area')}>
          {typeof profileImgUrl === 'string' && <Avatar size={20} className={cn('user-image')} {...avatarUserType} />}
          {buttonText && Object.keys(daoList).includes(buttonText) && (
            <>
              {/* 23.03.30 수정: 이미지 컬러로 교체 */}
              <ReactSVG src={`https://nile.blob.core.windows.net/images/assets/images/img/img_dao_${daoList[iconName]}_color.svg`} />
            </>
          )}
        </div>
      )}
      {isDesktop && type !== 'hash' ? (
        <div className={cn('tooltip-wrap')}>
          {/* 23.03.29 수정: 툴팁 방향 고정 */}
          <Popover
            overlayClassName="tooltip"
            placement="top"
            content={
              <div className={cn('tooltip-contents')}>
                {buttonText && <span className={cn('button-text')}>{buttonText}</span>}
                {detailInfo && <span className={cn('detail-info')}>{detailInfo}</span>}
              </div>
            }
            trigger="hover"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            autoAdjustOverflow={false}
          >
            <div className={cn('dao-scan-btn')}>
              {<DaoScanTableButton buttonText={buttonText ? buttonText : buttonTextShort} type="link" link={buttonLink} />}
            </div>
          </Popover>
        </div>
      ) : (
        <DaoScanTableButton buttonText={buttonText ? buttonText : buttonTextShort} type="link" link={buttonLink} />
      )}
      {type === 'to' && contract && (
        <span className={cn('icon-contract')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_copy_clipboard.svg" />
        </span>
      )}
    </div>
  );
};

export { ScanFromToCell };
