import React, { useState, useCallback, useMemo, useEffect } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Form, Input, Radio, RadioChangeEvent } from 'antd';

import BgButton from '@/components/button/BgButton';
import AgendaTable from './AgendaTable';
import OutlineButton from '@/components/button/OutlineButton';
import { marketJsonAbiAddresses } from '@/web3/abis/market';
import { useAtomValue } from 'jotai';
import { contractsAtom, daoContractsAtom } from '@/state/web3Atom';
import {nileWalletAtom, provider} from '@/state/nileWalletAtom';
import { daoJsonAbiAddress } from '@/web3/abis/dao';

export interface AgendaModalType {
  onConfirm: Function;
}

interface ReceiverType {
  address: string;
  name: string;
}

interface TokenType {
  address: string;
  balance: string;
  symbol: string;
}

interface TreasuryBalance {
  wemix?: number;
  wemix$?: number;
  stWemix?: number;
}

const TreasuryMoneyUse: React.FC<AgendaModalType> = ({ onConfirm }: AgendaModalType) => {
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const [form] = Form.useForm();
  const [balance, setBalance] = useState<TreasuryBalance>();
  const marketContracts = useAtomValue(contractsAtom);
  const daoContracts = useAtomValue(daoContractsAtom);
  const nileWallet = useAtomValue(nileWalletAtom)

  const ReceiverList: ReceiverType[] = [
    {
      address: '0x0000000000000000',
      name: t('agenda.tab1.td1'),
    },
    {
      address: '0x0000000000000001',
      name: t('agenda.tab1.td2'),
    },
  ];

  const TokenList: TokenType[] = [
    {
      address: '0',
      balance: `12,094.123456789123456789`,
      symbol: 'WEMIX',
    },
    {
      address: marketJsonAbiAddresses().current.ERC20,
      balance: `12,094.123456789123456789`,
      symbol: 'WEMIX$',
    },
    {
      address: '0x9B377bd7Db130E8bD2f3641E0E161cB613DA93De',
      balance: `12,094.123456789123456789`,
      symbol: 'stWEMIX',
    },
  ];

  useEffect(() => {
    // provider.web3.eth.getBalance(nileWalletAtomleWallet).then((balance) => {
    //   const wemixBalance = balance;
    //   console.log('balance >>> ', balance);
      // setBalance((prev) => ({...prev, wemix: res}))
    // });
    // ERC20?.methods.balanceOf(nileWalletAddress).call({}, (err: any, res: any) => {
    //   callback(token, key, res);
    // });
  }, []);

  const [wallet, setWallet] = useState<ReceiverType | null>(null);
  const [selected, setSelected] = useState<TokenType | null>(null);

  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChangeRadio = (e: RadioChangeEvent, i: number) => {
    if (i === 1) setWallet(ReceiverList[e.target.value]);
    if (i === 2) setSelected(TokenList[e.target.value]);
  };

  const amountValidator = useCallback((_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error(t('agenda.tab1.error1')));
    }
    return Promise.resolve();
  }, []);

  const onFinish = (values: any) => {
    onConfirm();
  };

  return (
    <div className={cn('agenda-cont-wrap')}>
      <div className={cn('agenda-modal-body')}>
        <p className={cn('agenda-desc')}>{t('agenda.tab1.desc')}</p>
        <Form name="treasury-money-use" layout="vertical" onFinish={onFinish} size="middle" form={form}>
          <AgendaTable
            className={'treasury-money-use-table1'}
            titleColumn={[
              {
                title: t('agenda.tab1.th1'),
                node: [<div className={cn('token-name')}>{wallet ? wallet.name : '-'}</div>],
              },
            ]}
            children={
              <Form.Item name={'money-use-field1'} required>
                <div className={cn('tokens-list')}>
                  <Radio.Group
                    name="radio-group-onchange1"
                    onChange={(e) => {
                      handleChangeRadio(e, 1);
                    }}
                    value={wallet?.address}
                  >
                    {ReceiverList.map((v, i) => {
                      return (
                        <Radio checked={false} value={v.address} key={`radio1-${i}`}>
                          {v.name}
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />
          <AgendaTable
            className={'treasury-money-use-table2'}
            titleColumn={[
              {
                title: t('agenda.tab1.th2'),
                node: [<div className={cn('token-name')}>{selected ? `${selected.symbol}` : '-'}</div>],
              },
            ]}
            children={
              <Form.Item name={'money-use-field2'} required>
                <div className={cn('tokens-list')}>
                  <Radio.Group
                    name="radio-group-onchange2"
                    onChange={(e) => {
                      handleChangeRadio(e, 2);
                    }}
                    value={selected?.address}
                  >
                    {TokenList.map((v, i) => {
                      return (
                        <Radio checked={false} value={v.address} key={`radio2-${i}`}>
                          {t('agenda.tab1.td3', { coin: TokenList[i].symbol, balance: TokenList[i].balance })}
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
            titleFull={t('agenda.tab1.th3')}
            children={
              <>
                {selected ? (
                  <Form.Item
                    name={'money-use-field3'}
                    required
                    rules={[
                      {
                        validator: amountValidator,
                      },
                    ]}
                  >
                    <div className={cn('token-field')}>
                      <>
                        <Input placeholder={t('agenda.tab1.placeholder2')} disabled={false} />
                        {selected.symbol}
                        <OutlineButton buttonText={t('agenda.tab1.btn1')} color="black" size="sm" onClick={() => {}} key="max" />
                      </>
                    </div>
                  </Form.Item>
                ) : (
                  <div className={cn('token-field')}>
                    <Input size={'small'} placeholder={t('agenda.tab1.placeholder1')} disabled={true} />
                  </div>
                )}
              </>
            }
          />
        </Form>
      </div>
      <div className={cn('agenda-modal-footer')}>
        {/* 23.03.27 수정: 버튼 컬러 정의 수정 반영 */}
        <BgButton buttonText={t('agenda.confirm')} color="black" size="lg" htmlType="submit" disabled={!isValid} />
      </div>
    </div>
  );
};

export default TreasuryMoneyUse;
