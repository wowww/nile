import { useEffect, useMemo } from 'react';
import QRCode from 'qrcode.react';
import { useCountdown } from '@/hook/useCountdown';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import dayjs from 'dayjs';

export type WemixAuthProps = {
  requestUrl: string;
  expireTime?: number;
  onRefresh?: () => void;
};

export const DEFAULT_EXPIRE_TIME = 180;

export const WemixWalletQRCode = ({ requestUrl, expireTime, onRefresh }: WemixAuthProps) => {
  const { remainTime, refresh } = useCountdown({ seconds: expireTime || DEFAULT_EXPIRE_TIME, onRefresh });

  const refreshable = useMemo(() => {
    return remainTime <= 0;
  }, [remainTime]);

  useEffect(() => {
    refresh();
  }, [requestUrl, expireTime, refresh]);

  const remainTimeText = useMemo(() => {
    if (remainTime <= 0) return <span className={cn('expired')}>Expired</span>;
    return (
      <span>
        {/*Time left: <span className="rest-time">{dayjs().startOf('day').seconds(remainTime).format('m:ss')}</span>*/}
      </span>
    );
  }, [remainTime]);

  return (
    <div className={cn('contents-left')}>
      {/* 22.11.17 수정: 문구 삭제 */}
      <div className={cn('qr-img', { timeout: refreshable })}>
        <QRCode
          size={200}
          value={requestUrl}
          // imageSettings={{
          //   width: 48,
          //   height: 48,
          //   excavate: true,
          //   src: NileCDNLoader({ src: '/icons/common/logo/ico_logo_wallet_wemix.svg' }),
          // }}
        />
        {refreshable && (
          <div className={cn('btn-wrap')}>
            <button className={cn('refresh-btn')} onClick={refresh}>
              <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_qr_refresh.svg' />
            </button>
          </div>
        )}
      </div>
      {remainTimeText}
    </div>
  );
};

WemixWalletQRCode.defaultProps = {
  expireTime: DEFAULT_EXPIRE_TIME,
  onRefresh: undefined,
};
