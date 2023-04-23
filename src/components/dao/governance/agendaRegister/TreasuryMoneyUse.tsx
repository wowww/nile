import React, { useCallback, useEffect } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Form, Input, Radio, RadioChangeEvent } from 'antd';

import BgButton from '@/components/button/BgButton';
import AgendaTable from './AgendaTable';
import OutlineButton from '@/components/button/OutlineButton';
import { marketJsonAbiAddresses } from '@/web3/abis/market';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { treasuryParamsAtom } from '@/state/governanceAtom';
import { refreshTreasuryBalanceAtom, treasuryTokenListAtom } from '@/state/treasuryAtom';

export interface AgendaModalType {
  onConfirm: Function;
}

interface ReceiverType {
  address: string;
  name: string;
}

interface TokenType {
  address: string;
  balance?: string;
  symbol: string;
}

const TreasuryMoneyUse: React.FC<AgendaModalType> = ({ onConfirm }: AgendaModalType) => {
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const [form] = Form.useForm();

  const [params, setParams] = useAtom(treasuryParamsAtom);

  const treasuryBalance = useAtomValue(treasuryTokenListAtom);
  const refreshTreasuryBalance = useSetAtom(refreshTreasuryBalanceAtom);

  useEffect(() => {
    refreshTreasuryBalance();
  }, []);

  const receiverList: ReceiverType[] = [
    {
      address: '0x15494BD09c6BE6dED79ae7b90666c6cA269e3633',
      name: t('agenda.tab1.td1'),
    },
    {
      address: '0x25494BD09c6BE6dED79ae7b90666c6cA269e3633',
      name: t('agenda.tab1.td2'),
    },
  ];

  const tokenList: TokenType[] = [
    {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'WEMIX',
    },
    {
      address: marketJsonAbiAddresses().current.ERC20,
      symbol: 'WEMIX$',
    },
    {
      address: '0x9B377bd7Db130E8bD2f3641E0E161cB613DA93De',
      symbol: 'stWEMIX',
    },
  ];

  useEffect(() => {
    console.log("balance >>> ", treasuryBalance)
  }, [treasuryBalance])

  const amountValidator = useCallback((_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error(t('agenda.tab1.error1')));
    }
    if (value.match(/[^0-9]/g)) {
      return Promise.reject(new Error(t('agenda.tab1.error1')));
    }
    return Promise.resolve();
  }, []);

  const onFinish = (values: any) => {
    onConfirm();
  };

  const receiverOnChange = useCallback((e: RadioChangeEvent) => {
    const name = receiverList?.find((item) => item.address === e.target.value)?.name;
    setParams((prev) => ({ ...prev, receiver: { address: e.target.value, name } }));
  }, []);

  const fundAddrOnChange = useCallback((e: RadioChangeEvent) => {
    const symbol = tokenList?.find((item) => item.address === e.target.value)?.symbol;
    setParams((prev) => ({ ...prev, fundAddr: { address: e.target.value, symbol } }));
  }, []);

  return (
    <Form name='treasury-money-use' layout='vertical' onFinish={onFinish} size='middle' form={form}>
      <div className={cn('agenda-cont-wrap')}>
        <div className={cn('agenda-modal-body')}>
          <p className={cn('agenda-desc')}>{t('agenda.tab1.desc')}</p>

          <AgendaTable
            className={'treasury-money-use-table1'}
            titleColumn={[
              {
                title: t('agenda.tab1.th1'),
                node: [<div className={cn('token-name')}>{params?.receiver?.name ?? '-'}</div>],
              },
            ]}
            children={
              <div className={cn('tokens-list')}>
                <Form.Item name="receiver" required>
                  <Radio.Group name="radio-group-onchange1" onChange={receiverOnChange}>
                    {receiverList.map((v, i) => {
                      return (
                        <Radio value={v.address} key={`radio1-${i}`}>
                          {v.name}
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </Form.Item>
              </div>
            }
          />
          <AgendaTable
            className={'treasury-money-use-table2'}
            titleColumn={[
              {
                title: t('agenda.tab1.th2'),
                node: [<div className={cn('token-name')}>{params?.fundAddr?.symbol ?? '-'}</div>],
              },
            ]}
            children={
              <div className={cn('tokens-list')}>
                <Form.Item name='fundAddr' required>
                  <Radio.Group
                    name='radio-group-onchange2'
                    onChange={fundAddrOnChange}
                    value={params?.fundAddr}
                  >
                    {tokenList.map((v, i) => {
                      return (
                        <Radio checked={false} value={v.address} key={`radio2-${i}`}>
                          {t('agenda.tab1.td3', { coin: tokenList[i].symbol, balance: treasuryBalance?.find((item) => item.address === v.address)?.balance ?? 0 })}
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </Form.Item>
              </div>
            }
          />
          <AgendaTable
            className={'treasury-money-use-table3'}
            titleFull={t('agenda.tab1.th3')}
            children={
              <>
                {params?.fundAddr ? (
                  <Form.Item
                    name='amount'
                    required
                    rules={[
                      {
                        validator: amountValidator,
                      },
                    ]}
                  >
                    <div className={cn('token-field')}>
                      <Input placeholder={t('agenda.tab1.placeholder2')} disabled={false}
                             onChange={(e) => setParams((prev) => ({ ...prev, amount: e.target.value }))} />
                      {params?.fundAddr?.symbol}
                      <OutlineButton buttonText={t('agenda.tab1.btn1')} color='black' size='sm' onClick={() => {
                      }} key='max' />
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
        </div>
        <div className={cn('agenda-modal-footer')}>
          <BgButton buttonText={t('agenda.confirm')} color='black' size='lg' htmlType='submit' />
        </div>
      </div>
    </Form>
  );
};

export default TreasuryMoneyUse;
