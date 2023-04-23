// @ts-ignore
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';
import QRCode from 'qrcode';
import { EthereumRpcError } from 'eth-rpc-errors';
import detectEthereumProvider from '@metamask/detect-provider';
import { useEffect, useRef, useState } from 'react';
import { message, Modal } from 'antd';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { createRoot, Root } from 'react-dom/client';
import Image from 'next/image';
import { walletConnect } from '@utils/web3Utils';
import { NileApiService } from '@/services/nile/api';
import { isAndroid, isMobile } from 'react-device-detect';
import { hexToNumber, numberToHex } from 'web3-utils';

interface ProviderOptions {
  chainName: string;
  chainId: number;
  rpcUrl: string;
  blockExplorerUrl: string;
  nativeCurrencyName: string;
  nativeCurrencySymbol: string;
  nativeCurrencyDecimals: number;
}

export const WEMIX_OPTIONS: ProviderOptions = {
  chainName: 'WEMIX 3.0',
  chainId: 1111,
  rpcUrl: 'https://api.wemix.com',
  blockExplorerUrl: 'https://explorer.wemix.com',
  nativeCurrencyName: 'WEMIX',
  nativeCurrencySymbol: 'WEMIX',
  nativeCurrencyDecimals: 18,
};

export const WEMIX_TESTNET_OPTIONS: ProviderOptions = {
  chainName: 'WEMIX 3.0 Testnet',
  chainId: 1112,
  rpcUrl: 'https://api.test.wemix.com',
  blockExplorerUrl: 'https://microscope.test.wemix.com',
  nativeCurrencyName: 'WEMIX',
  nativeCurrencySymbol: 'WEMIX',
  nativeCurrencyDecimals: 18,
};

export type ClientMeta = any | null | undefined;

export class WemixProvider {
  private options: ProviderOptions;
  public web3: Web3;
  public httpWeb3: Web3;
  private metaMaskProvider: any;
  public walletConnectProvider?: WalletConnectProvider;
  private modalRoot: Root | null = null;
  private api: any;

  // callback
  public disconnectCallback?: (code: number, reason: string) => void;
  public accountsChangedCallback?: (accounts: string[]) => void;
  public chainChangeCallback?: (chainId: number) => void;

  private disconnectTimer?: NodeJS.Timeout;

  public currentAddress?: string;

  public t: any;
  public locale: any;

  constructor(options: ProviderOptions = WEMIX_TESTNET_OPTIONS) {
    this.options = options;

    this.web3 = new Web3(this.options.rpcUrl);
    this.httpWeb3 = new Web3(this.options.rpcUrl);
    this.api = NileApiService();
  }

  public getOptions(): ProviderOptions {
    return this.options;
  }

  public async reconnect() {
    if (typeof window !== 'undefined') {
      // wallet reconnect
      if (localStorage.getItem('walletconnect')) {
        try {
          this.walletConnectProvider = this.initWalletConnect();
          await this.walletConnectProvider.enable();
          this.setWalletConnectProvider();
        } catch (e) {
          localStorage.removeItem('walletconnect');
        }

        return;
      }

      // metamask reconnect
      this.detectMetaMaskProvider().then(() => {
        if (this.metaMaskProvider?.isConnected()) {
          var chainId = numberToHex(this.options.chainId);
          if (this.metaMaskProvider.chainId === chainId) {
            this.connectMetaMask(true);
          }
        }
      });
    }
  }

  private onDisconnect(code: number, reason: string) {
    if (this.disconnectCallback) {
      if (this.disconnectTimer) {
        return;
      }

      // WalletConnect 의 겨우 disconnect event가 두번 와서 예외처리
      const callback = this.disconnectCallback;
      this.disconnectTimer = setTimeout(() => {
        this.disconnectTimer = undefined;
        callback(code, reason);
      }, 100);
    }
  }

  private async onChainChanged(chainId: number | string) {
    if (typeof chainId === 'string') {
      chainId = hexToNumber(chainId);
    }
    if (chainId !== this.options.chainId) {
      await this.disconnect();

      if (process.env.NEXT_PUBLIC_ENV_PROFILE === 'development') {
        message.info('WEMIX Testnet 네트워크로 설정 후 지갑 연결이 가능합니다.');
      } else {
        message.info('WEMIX Mainnet 네트워크로 설정 후 지갑 연결이 가능합니다.');
      }

      return;
    }
    if (this.chainChangeCallback) {
      this.chainChangeCallback(chainId);
    }
  }

  private onAccountsChanged(accounts: string[]) {
    // there is not accounts, returns undefined
    if (accounts === undefined) {
      this.disconnect();
      return;
    }
    if (accounts.length > 0) {
      this.currentAddress = accounts[0];
    }
    if (this.accountsChangedCallback) {
      this.accountsChangedCallback(accounts);
    }
  }

  public getProviderMeta(): ClientMeta {
    if (this.web3.currentProvider === this.metaMaskProvider) {
      return {
        description: 'MetaMask Browser Extension',
        url: 'https://metamask.io',
        icons: ['https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg'],
        name: 'MetaMask',
      };
    } else {
      if (this.walletConnectProvider?.wc.peerMeta) {
        if (this.walletConnectProvider?.wc.peerMeta.name.toLowerCase().search('wemix') >= 0) {
          return {
            description: 'WEMIX Wallet',
            url: 'https://wemix.com',
            icons: ['/resource/images/icons/icon_wallet.svg'],
            name: 'WEMIX Wallet',
          };
        }
        return this.walletConnectProvider?.wc.peerMeta;
      }
    }
  }

  public isCurrentMetaMaskProvider() {
    return this.metaMaskProvider != null;
  }

  initWalletConnect(): WalletConnectProvider {
    const wtOptions: any = {
      rpc: {},
      qrcode: false,
      chainId: this.options.chainId,
    };
    wtOptions.rpc[this.options.chainId] = this.options.rpcUrl;

    return new WalletConnectProvider(wtOptions);
  }

  async connectWC(toMetaMask: boolean = false, qrCallback?: (url: string) => void) {
    this.disconnect();

    this.walletConnectProvider = this.initWalletConnect();

    this.walletConnectProvider.connector.on('display_uri', async (err, payload) => {
      if (err) {
        // TODO error
        return;
      }
      const uri = payload.params[0];
      if (!toMetaMask) {
        // QRCODE 노출
        const url = await QRCode.toDataURL(uri, {
          errorCorrectionLevel: 'H',
          margin: 0,
        });
        if (qrCallback) {
          qrCallback(url);
        } else {
          this.showQrCode(url);
        }
      }
    });

    try {
      await this.walletConnectProvider.enable();

      if (this.walletConnectProvider.chainId !== this.options.chainId) {
        this.disconnect();
        if (process.env.NEXT_PUBLIC_ENV_PROFILE === 'development') {
          message.info('WEMIX Testnet 네트워크로 설정 후 지갑 연결이 가능합니다.');
        } else {
          message.info('WEMIX Mainnet 네트워크로 설정 후 지갑 연결이 가능합니다.');
        }
        return;
      }
      // this.walletConnectProvider.on("disconnect", this.onDisconnect.bind(this));
      // this.walletConnectProvider.on(
      //   "chainChanged",
      //   this.onChainChanged.bind(this),
      // );
      // this.walletConnectProvider.on(
      //   "accountsChanged",
      //   this.onAccountsChanged.bind(this),
      // );
    } catch (e) {
      console.log(e);
    }

    // this.web3.setProvider(this.walletConnectProvider as any);

    // this.onAccountsChanged(this.walletConnectProvider.accounts);
    this.setWalletConnectProvider();
  }

  async disconnect() {
    window.localStorage.removeItem('walletconnect');

    if (this.walletConnectProvider?.connected) {
      await this.walletConnectProvider.disconnect();
      this.walletConnectProvider = undefined;
    }

    if (this.metaMaskProvider) {
      if (this.disconnectCallback) {
        this.disconnectCallback(1000, '');
      }
      this.metaMaskProvider.removeAllListeners('disconnect');
      this.metaMaskProvider.removeAllListeners('chainChanged');
      this.metaMaskProvider.removeAllListeners('accountsChanged');

      this.metaMaskProvider = null;
    }

    this.web3.setProvider(this.options.rpcUrl);
  }

  async detectMetaMaskProvider() {
    this.metaMaskProvider = await detectEthereumProvider({
      mustBeMetaMask: true,
    });

    // when Metamask does not exist
    if (this.metaMaskProvider === null) {
      console.error('Metamask not found.');
      return;
    }

    const chainId = await this.metaMaskProvider.request({ method: 'eth_chainId' });

    // only MetaMask
    if (this.metaMaskProvider.providers) {
      this.metaMaskProvider.providers.forEach((p: any) => {
        if (p.isMetaMask) {
          this.metaMaskProvider = p;
        }
      });
    }
  }

  connectMetamaskMobile() {
    const dappUrl = window.location.href.split('//')[1].split('/')[0];
    const metamaskAppDeepLink = `https://metamask.app.link/dapp/${dappUrl}`;
    window.open(metamaskAppDeepLink, '_self');
  }

  async connectMetaMask(reuse: boolean = false) {
    if (!reuse) {
      this.disconnect();

      await this.detectMetaMaskProvider();
    }

    var accounts;
    try {
      accounts = await this.metaMaskProvider.request({
        method: 'eth_requestAccounts',
        params: [],
      });
    } catch (e) {
      console.log('metamask connect error', e);
      if (e instanceof EthereumRpcError) {
        if (e.code === -32002) {
        }
        return;
      }
    }

    var chainId = numberToHex(this.options.chainId);
    if (this.metaMaskProvider && this.metaMaskProvider.chainId !== chainId) {
      try {
        await this.metaMaskProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId,
            },
          ],
        });
      } catch (swithError) {
        if ((swithError as any).code === 4902) {
          try {
            await this.metaMaskProvider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId,
                  chainName: this.options.chainName,
                  rpcUrls: [this.options.rpcUrl],
                  blockExplorerUrls: [this.options.blockExplorerUrl],
                  nativeCurrency: {
                    name: this.options.nativeCurrencyName,
                    decimals: this.options.nativeCurrencyDecimals,
                    symbol: this.options.nativeCurrencySymbol,
                  },
                },
              ],
            });
          } catch (addError) {
            // TODO error
            return;
          }
        } else {
          // TODO ERROR
          return;
        }
      }
    }

    if (this.metaMaskProvider) {
      this.metaMaskProvider.on('disconnect', this.onDisconnect.bind(this));
      this.metaMaskProvider.on('chainChanged', this.onChainChanged.bind(this));
      this.metaMaskProvider.on('accountsChanged', this.onAccountsChanged.bind(this));
    }

    this.web3.setProvider(this.metaMaskProvider);

    this.onAccountsChanged(accounts);
  }

  public async connect() {
    await this.connectWC();
    this.closeModal();
  }

  public async connectWalletConnectMobile(isMetaMask: boolean = false, callback: (url: string) => void) {
    this.disconnect();

    this.walletConnectProvider = this.initWalletConnect();

    this.walletConnectProvider.connector.on('display_uri', async (err, payload) => {
      if (err) {
        return;
      }
      const uri = payload.params[0];
      if (isMetaMask) {
        // MetaMask
        callback(`https://metamask.app.link/wc?uri=${encodeURIComponent(uri)}`);
      } else {
        const link = `https://wallet.test.wemix.com/wc?uri=${encodeURIComponent(uri)}`;
        callback(
          `https://wemixwallet.page.link?link=${encodeURIComponent(
            link,
          )}&apn=com.wemixfoundation.wemixwallet&ibi=com.wemixfoundation.wemixwallet&isi=1628230003`,
        );
      }
    });

    try {
      await this.walletConnectProvider.enable();
    } catch (e) {
      console.log(e);
    }

    this.setWalletConnectProvider();
  }

  private setWalletConnectProvider() {
    if (this.walletConnectProvider?.chainId !== this.options.chainId) {
      this.disconnect();
      return;
    }
    this.walletConnectProvider.on('disconnect', this.onDisconnect.bind(this));
    this.walletConnectProvider.on('chainChanged', this.onChainChanged.bind(this));
    this.walletConnectProvider.on('accountsChanged', this.onAccountsChanged.bind(this));
    this.web3.setProvider(this.walletConnectProvider as any);

    this.onAccountsChanged(this.walletConnectProvider.accounts);
  }

  public getWallAppOpenUri(): string | undefined {
    if (this.walletConnectProvider) {
      if (this.walletConnectProvider.wc.peerMeta?.name.toLocaleLowerCase() === 'metamask') {
        return 'https://metamask.app.link';
      } else {
        const link = `https://walletapi.wemix.com/open`;
        return `https://wemixwallet.page.link?link=${encodeURIComponent(
          link,
        )}&apn=com.wemixfoundation.wemixwallet&ibi=com.wemixfoundation.wemixwallet&isi=1628230003`;
      }
    }
  }

  private getModalRoot() {
    if (this.modalRoot) {
      return this.modalRoot;
    } else {
      let root = document.createElement('div');
      root.id = 'wallet-connect-modal';
      document.body.appendChild(root);
      return (this.modalRoot = createRoot(root));
    }
  }

  public closeModal() {
    if (this.modalRoot) {
      this.modalRoot?.unmount();
      this.modalRoot = null;
    }
  }

  private async showQrCode(url: string) {
    var el = this.getModalRoot();

    var switchMetaMask = async () => {
      this.disconnect();
      this.closeModal();
      await this.connectMetaMask();
    };

    el?.render(<ConnectWemixModal provider={this} url={url} switchWallet={switchMetaMask} t={this.t}
                                  locale={this.locale} />);
  }
}

interface ConnectWemixModalProps {
  provider: WemixProvider;
  url: string;
  switchWallet: () => void;
  t: any;
  locale: any;
}

const ConnectWemixModal: React.FC<ConnectWemixModalProps> = ({
                                                               provider,
                                                               url,
                                                               switchWallet,
                                                               t,
                                                               locale,
                                                             }): JSX.Element => {
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [qrUrl, setQrUrl] = useState(url);
  const [refresh, doRefresh] = useState(0);

  return (
    <Modal
      title={t('wallet.title', { ns: 'common' })}
      open={true}
      onCancel={() => {
        // provider.walletConnectProvider?.disconnect();
        provider.closeModal();
      }}
      centered={true}
      className={cn('modal-wrap', 'modal-size-lg')}
      wrapClassName={cn('header-connect-modal-wrap', 'active')}
      closeIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg" />}
      footer={null}
      width={'none'}
      transitionName=""
      closable={true}
      destroyOnClose={true}
    >
      <div className={cn('popup-contents')}>
        <div className={cn('wemix-wallet')}>
          <div className={cn('contents-left')}>
            <div className={cn('qr-img', { timeout: isTimeOut })}>
              <Image src={qrUrl} layout={`fill`} alt="" />
              {isTimeOut && (
                <div className={cn('btn-wrap')}>
                  <button className={cn('refresh-btn')}>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_qr_refresh.svg" />
                  </button>
                </div>
              )}
            </div>
            {isTimeOut && <span className={cn('expired')}>Expired</span>}
            {!isTimeOut && (
              <span>
                Time left:{' '}
                <span className="rest-time">
                  <Timer setIsTimeOut={setIsTimeOut} refresh={refresh} />
                </span>
              </span>
            )}
          </div>
          <div className={cn('contents-right')}>
            <strong>WEMIX Wallet</strong>
            <ol className={cn('steps')}>
              <li>
                <i>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_qr_step1.svg"
                            width={20} height={20} />
                </i>
                <strong>STEP 1</strong>
                <span>{t('wallet.step', { ns: 'common' })}</span>
              </li>
              <li>
                <i>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_qr_step2.svg"
                            width={20} height={20} />
                </i>
                <strong>STEP 2</strong>
                <span>{t('wallet.step2', { ns: 'common' })}</span>
              </li>
              <li>
                <i>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_qr_step3.svg"
                            width={20} height={20} />
                </i>
                <strong>STEP 3</strong>
                <span>{t('wallet.step3', { ns: 'common' })}</span>
              </li>
            </ol>
          </div>
        </div>
        <div className={cn('metamask')}>
          <button
            className={cn('only-sm')}
            onClick={() => {
              walletConnect(true, false);
            }}
          >
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_wemix_wallet.svg" />
            <span>WEMIX Wallet</span>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
          </button>
          {!isAndroid && (
            <button onClick={() => (isMobile ? walletConnect(true, true) : switchWallet())}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_metamask_border.svg" />
              <span>MetaMask</span>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_24.svg" />
            </button>
          )}
          <div className={cn('metamask-link')}>
            <strong>MetaMask</strong>
            <a
              href={locale === 'en' ? 'https://docs.wemix.com/v/nile-en/guides/getting-started' : 'https://docs.wemix.com/v/nile-ko/undefined-1/nile'}
              target="_blank"
              rel="noopener noreferrer"
              title={t('blank', { ns: 'common' })}
            >
              {t('connect.how', { ns: 'common' })}
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg" width={16}
                        height={16} />
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};

interface TimerProps {
  setIsTimeOut: (isTimeRemain: boolean) => void;
  refresh: number;
}

const Timer: React.FC<TimerProps> = ({ setIsTimeOut, refresh }): JSX.Element => {
  const [sec, setSec] = useState<number>(180);
  const time: any = useRef(180);
  const timerId: any = useRef(null);
  const timeFormat = (time: number) => {
    let m = Math.floor(time / 60).toString();
    let s = (time % 60).toString();
    if (m.length === 1) m = `0${m}`;
    if (s.length === 1) s = `0${s}`;
    return `${m}:${s}`;
  };

  useEffect(() => {
    setSec(180);
    time.current = 180;
    timerId.current = setInterval(() => {
      time.current--;
      setSec(time.current);
    }, 1000);

    return () => clearInterval(timerId.current);
  }, [refresh]);

  useEffect(() => {
    if (sec <= 0) {
      setIsTimeOut(true);
      clearInterval(timerId.current);
    }
  }, [sec]);

  return <span className="rest-time">{timeFormat(sec)}</span>;
};
