import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Form, Input, Radio } from 'antd';

import BgButton from '@/components/button/BgButton';
import AgendaTable from './AgendaTable';
import OutlineButton from '@/components/button/OutlineButton';
import { marketJsonAbiAddresses } from '@/web3/abis/market';
import { useAtom, useAtomValue } from 'jotai';
import { swapParamsAtom } from '@/state/governanceAtom';
import { provider } from '@/state/nileWalletAtom';
import { daoJsonAbiAddress } from '@/web3/abis/dao';
import { fromWei } from 'web3-utils';
import { contractsAtom } from '@/state/web3Atom';

export interface AgendaModalType {
  onConfirm: Function;
}

interface TokenType {
  address: string;
  balance?: string;
  symbol: string;
}

interface TreasuryBalance {
  wemix?: string;
  wemix$?: string;
  stWemix?: string;
}

const TreasuryTokenEdit = ({ onConfirm }: AgendaModalType) => {
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const [form] = Form.useForm();

  const marketContracts = useAtomValue(contractsAtom);
  const [params, setParams] = useAtom(swapParamsAtom);

  const [balance, setBalance] = useState<TreasuryBalance>();

  useEffect(() => {
    if (!provider) return;

    provider.web3.eth.getBalance(daoJsonAbiAddress().current.Treasury).then((balance: string) => {
      setBalance((prev) => ({ ...prev, wemix: fromWei(balance, 'ether') }));
    });

    marketContracts.ERC20?.methods.balanceOf(daoJsonAbiAddress().current.Treasury).call({}, (err: any, res: any) => {
      setBalance((prev) => ({ ...prev, wemix$: fromWei(res, 'ether') }));
    });
  }, [provider]);

  const paymentList: TokenType[] = [
    {
      address: '0',
      balance: balance?.wemix,
      symbol: 'WEMIX',
    },
    {
      address: marketJsonAbiAddresses().current.ERC20,
      balance: balance?.wemix$,
      symbol: 'WEMIX$',
    },
    {
      address: '0x9B377bd7Db130E8bD2f3641E0E161cB613DA93De',
      balance: balance?.stWemix,
      symbol: 'stWEMIX',
    },
  ];

  const receiptList = [
    {
      value: '0x0000000000000000000000000000000000000000',
      label: 'WEMIX',
    },
    {
      value: marketJsonAbiAddresses().current.ERC20,
      label: 'WEMIX$',
    },
    {
      value: '0xce146236fe4e48240cd8f7d22c38c07c7a6bab0b',
      label: 'KLAY',
    },
    {
      value: '0x9B377bd7Db130E8bD2f3641E0E161cB613DA93De',
      label: 'stWEMIX',
    },
    {
      value: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      label: 'USDC',
    },
    {
      value: '0x2B58644b9f210ebB8fBF4C27066f9d1d97B03CBc',
      label: 'wRFT',
    },
    {
      value: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      label: 'USDT',
    },
    {
      value: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
      label: 'ETH',
    },
    {
      value: '0x58b40ac5cbeeea651dc5512ea81a0bc8575f04a8',
      label: 'TIPO',
    },
    {
      value: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      label: 'WBTC',
    },
    {
      value: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
      label: 'BNB',
    },
  ];

  const amountValidator = useCallback((_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error(t('agenda.tab5.error1')));
    }
    return Promise.resolve();
  }, []);

  const onFinish = (values: any) => {
    onConfirm();
  };

  return (
    <Form name="treasury-token-edit" layout="vertical" onFinish={onFinish} size="middle" form={form}>
      <div className={cn('agenda-cont-wrap')}>
        <div className={cn('agenda-modal-body')}>
          <p className={cn('agenda-desc')}>{t('agenda.tab5.desc')}</p>
          <AgendaTable
            className={'treasury-money-use-table2'}
            titleColumn={[
              {
                title: t('agenda.tab5.th1'),
                node: [<div className={cn('token-name')}>{params?.payment?.symbol ? `${params?.payment?.symbol}` : '-'}</div>],
              },
            ]}
            children={
              <Form.Item name={'token-field1'} required>
                <div className={cn('tokens-list')}>
                  <Radio.Group
                    name="radio-group-onchange1"
                    onChange={(e) => {
                      const symbol = paymentList?.find((item) => item.address === e.target.value)?.symbol;
                      setParams((prev) => ({ ...prev, payment: { address: e.target.value, symbol } }));
                    }}
                    value={params?.payment?.address}
                  >
                    {paymentList.map((v, i) => {
                      return (
                        <Radio checked={false} value={v.address} key={`radio1-${i}`}>
                          {t('agenda.tab5.td1', { coin: paymentList[i].symbol, balance: paymentList[i].balance })}
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />
          <AgendaTable
            className={'treasury-money-use-table3'}
            titleFull={t('agenda.tab5.th2')}
            children={
              <>
                {params?.payment?.address ? (
                  <Form.Item
                    name={'token-field2'}
                    required
                    rules={[
                      {
                        validator: amountValidator,
                      },
                    ]}
                  >
                    <div className={cn('token-field')}>
                      <>
                        <Input
                          size={'small'}
                          placeholder={t('agenda.tab5.placeholder2')}
                          disabled={false}
                          onChange={(e) => setParams((prev) => ({ ...prev, amount: e.target.value }))}
                        />
                        {params?.payment?.symbol}
                        <OutlineButton buttonText={t('agenda.tab5.btn1')} color="black" size="sm" onClick={() => {}} key="max" />
                      </>
                    </div>
                  </Form.Item>
                ) : (
                  <div className={cn('token-field')}>
                    <Input size={'small'} placeholder={t('agenda.tab5.placeholder1')} disabled={true} />
                  </div>
                )}
              </>
            }
          />
          <AgendaTable
            className={'treasury-money-use-table1'}
            titleColumn={[
              {
                title: t('agenda.tab5.th3'),
                node: [
                  <div className={cn('token-name')}>
                    <span className={cn('amount')}>{params?.receipt ? params?.receipt?.symbol : '-'}</span>
                    {params?.receipt && (
                      <span className={cn('exchange')}>
                        {t('agenda.tab5.exchange1', {
                          amount: '12,083,000',
                          coin: 'stWEMIX',
                        })}
                      </span>
                    )}
                  </div>,
                ],
              },
            ]}
            children={
              <Form.Item name={'token-field3'} required>
                <div className={cn('coins-list')}>
                  <Radio.Group
                    name="radio-group-onchange2"
                    onChange={(e) => {
                      const symbol = receiptList?.find((item) => item.value === e.target.value)?.label;
                      setParams((prev) => ({ ...prev, receipt: { address: e.target.value, symbol } }));
                    }}
                    value={params?.receipt?.address}
                  >
                    {receiptList.map((v, i) => {
                      return (
                        <Radio checked={false} disabled={!params?.amount} value={v.value} key={`radio2-${i}`}>
                          {v.label}
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />
          <ul className={cn('radio-edit-info')}>
            <li>{t('agenda.tab5.info1')}</li>
          </ul>
        </div>
        <div className={cn('agenda-modal-footer')}>
          <BgButton buttonText={t('agenda.confirm')} color="black" size="lg" htmlType="submit" />
        </div>
      </div>
    </Form>
  );
};

export default TreasuryTokenEdit;
