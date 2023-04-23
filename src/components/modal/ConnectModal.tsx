import { useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';

/* 22.11.16 수정: useRouter 추가 */
import { useRouter } from 'next/router';

/* 22.11.02 수정: useTranslation 추가 */
import { useTranslation } from 'next-i18next';
import { WemixWalletQRCode } from '@components/wemix/qr';

interface ConnectModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
  // 2022.11.17 수정 : 메인넷 네트워크 설정 팝업 추가
  changeConnectFirst: () => void;
}

interface TimerProps {
  setIsTimeOut: (isTimeRemain: boolean) => void;
  timeReset: boolean;
}

// 2022.11.17 수정 : 메인넷 네트워크 설정 팝업 추가
const ConnectModal: React.FC<ConnectModalProps> = ({ isModalVisible, setIsModalVisible, changeConnectFirst }): JSX.Element => {
  /* 22.11.02 수정: useTranslation, useRouter 추가 */
  const { t } = useTranslation(['marketplace', 'common']);
  /* 22.11.16 수정: locale 추가 */
  const { locale } = useRouter();

  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [timeReset, setTimeReset] = useState<boolean>(false);

  const [expireTime, setExpireTime] = useState(0);

  // 2022.11.17 수정 : 메인넷 네트워크 설정 팝업 추가
  const onClickConnectFirst = () => {
    changeConnectFirst();
  };

  return (
    <Modal
      title={t('wallet.title', { ns: 'common' })}
      open={false}
      onCancel={() => {}}
      onOk={() => {}}
      centered={true}
      className={cn('modal-wrap', 'modal-size-lg')}
      wrapClassName={cn('header-connect-modal-wrap', 'active')}
      closeIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg" />}
      footer={null}
      width={'none'}
      transitionName=""
      /* 22.10.21 수정: maskTransitionName 속성 삭제 */
      closable={true}
      destroyOnClose={true}
      // 22.10.04 수정: forceRender 속성 삭제
    >
      <div className={cn('popup-contents')}>
        <div className={cn('wemix-wallet')}>
          <WemixWalletQRCode requestUrl={''} expireTime={expireTime} />
          <div className={cn('contents-right')}>
            {/* 22.10.20 수정: 텍스트 수정 */}
            <strong>WEMIX Wallet</strong>
            <ol className={cn('steps')}>
              <li>
                <i>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_qr_step1.svg" width={20} height={20} />
                </i>
                <strong>STEP 1</strong>
                <span>{t('wallet.step', { ns: 'common' })}</span>
              </li>
              <li>
                <i>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_qr_step2.svg" width={20} height={20} />
                </i>
                <strong>STEP 2</strong>
                <span>{t('wallet.step2', { ns: 'common' })}</span>
              </li>
              <li>
                <i>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_qr_step3.svg" width={20} height={20} />
                </i>
                <strong>STEP 3</strong>
                <span>{t('wallet.step3', { ns: 'common' })}</span>
              </li>
            </ol>
          </div>
        </div>
        <div className={cn('metamask')}>
          <button className={cn('only-sm')} onClick={() => {}}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_wemix_wallet.svg" />
            <span>WEMIX Wallet</span>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
          </button>
          <button onClick={() => {}}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_metamask_border.svg" />
            {/* 22.10.20 수정: 텍스트 수정 */}
            <span>MetaMask</span>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
          </button>
          <div className={cn('metamask-link')}>
            {/* 22.10.20 수정: 텍스트 수정 */}
            <strong>MetaMask</strong>
            {/* 22.11.16 수정: link 추가 */}
            {/* 22.11.16 수정 start: 11/17 추가 컨텐츠 */}
            <button type="button" title={t('blank', { ns: 'common' })} className={cn('only-sm')} onClick={onClickConnectFirst}>
              {t('connect.firstTime', { ns: 'common' })}
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg" width={16} height={16} />
            </button>
            {/* 22.11.16 수정 end: 11/17 추가 컨텐츠 */}
            <a
              href={`https://docs.wemix.com/v/wemixfi-${locale}/Guides/getting-started/how-to-connect-wallet${locale === 'en' ? 's' : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              title={t('blank', { ns: 'common' })}
            >
              {t('connect.how', { ns: 'common' })}
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg" width={16} height={16} />
            </a>
          </div>
          {/* 22.11.16 수정 end: 11/17 추가 컨텐츠 */}
        </div>
        {/* 22.10.20 수정: .modal-bottom 영역 삭제 */}
      </div>
    </Modal>
  );
};

const Timer: React.FC<TimerProps> = ({ setIsTimeOut, timeReset }): JSX.Element => {
  // 180 = 3m
  const defaultTime: number = 5;

  useEffect(() => {
    setSec(defaultTime);
    time.current = defaultTime;
  }, [timeReset]);
  const [sec, setSec] = useState<number>(defaultTime);
  let time: any = useRef(sec);
  const timerId: any = useRef(null);
  const timeFormat = (time: number) => {
    let m = Math.floor(time / 60).toString();
    let s = (time % 60).toString();
    if (m.length === 1) m = `0${m}`;
    if (s.length === 1) s = `0${s}`;
    return `${m}:${s}`;
  };
  useEffect(() => {
    timerId.current = setInterval(() => {
      time.current--;
      setSec(time.current);
    }, 1000);

    return () => clearInterval(timerId.current);
  }, [timeReset]);

  useEffect(() => {
    if (sec <= 0) {
      setIsTimeOut(true);
      clearInterval(timerId.current);
    }
  }, [sec]);

  return <span className="rest-time">{timeFormat(sec)}</span>;
};

export default ConnectModal;
