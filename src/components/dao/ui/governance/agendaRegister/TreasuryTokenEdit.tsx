import React, { useState, useCallback, useMemo } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Form, Input, Radio, RadioChangeEvent } from 'antd';

import BgButton from '@/components/button/BgButton';
import AgendaTable from './AgendaTable';
import OutlineButton from '@/components/button/OutlineButton';
export interface AgendaModalType {
  onConfirm: Function;
}

interface radioListType {
  value: number;
  balance: string;
  coin: string;
}

interface radioList2Type {
  value: number;
  label: string;
}

const TreasuryTokenEdit: React.FC<AgendaModalType> = ({ onConfirm }: AgendaModalType) => {
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const [form] = Form.useForm();

  const radioList1: radioListType[] = [
    {
      value: 0,
      balance: `12,094.123456789123456789`,
      coin: 'WEMIX',
    },
    {
      value: 1,
      balance: `12,094.123456789123456789`,
      coin: 'WEMIX$',
    },
    {
      value: 2,
      balance: `12,094.123456789123456789`,
      coin: 'stWEMIX',
    },
  ];

  const radioList2: radioList2Type[] = [
    {
      value: 0,
      label: 'WEMIX',
    },
    {
      value: 1,
      label: 'WEMIX$',
    },
    {
      value: 2,
      label: 'KLAY',
    },
    {
      value: 3,
      label: 'stWEMIX',
    },
    {
      value: 4,
      label: 'USDC',
    },
    {
      value: 5,
      label: 'wRFT',
    },
    {
      value: 6,
      label: 'USDT',
    },
    {
      value: 7,
      label: 'ETH',
    },
    {
      value: 8,
      label: 'TIPO',
    },
    {
      value: 9,
      label: 'WBTC',
    },
    {
      value: 10,
      label: 'BNB',
    },
  ];

  const [value1, setValue1] = useState<radioListType | null>(null);
  const [value2, setValue2] = useState<radioList2Type | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChangeRadio = (e: RadioChangeEvent, i: number) => {
    if (i === 1) setValue1(radioList1[e.target.value]);
    if (i === 2) setValue2(radioList2[e.target.value]);
  };

  const amountValidator = useCallback((_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error(t('agenda.tab5.error1')));
    }
    return Promise.resolve();
  }, []);

  const onFinish = (values: any) => {
    confirmForm();
  };

  const confirmForm = () => {};

  return (
    <div className={cn('agenda-cont-wrap')}>
      <div className={cn('agenda-modal-body')}>
        <p className={cn('agenda-desc')}>{t('agenda.tab5.desc')}</p>
        <Form name="treasury-token-edit" layout="vertical" onFinish={onFinish} size="middle" form={form}>
          <AgendaTable
            className={'treasury-money-use-table2'}
            titleColumn={[
              {
                title: t('agenda.tab5.th1'),
                node: [<div className={cn('token-name')}>{value1 ? `${value1.coin}` : '-'}</div>],
              },
            ]}
            children={
              <Form.Item name={'token-field1'} required>
                <div className={cn('tokens-list')}>
                  <Radio.Group
                    name="radio-group-onchange1"
                    onChange={(e) => {
                      handleChangeRadio(e, 1);
                    }}
                    value={value1?.value}
                  >
                    {radioList1.map((v, i) => {
                      return (
                        <Radio checked={false} value={v.value} key={`radio1-${i}`}>
                          {t('agenda.tab5.td1', { coin: radioList1[i].coin, balance: radioList1[i].balance })}
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
                {value1 ? (
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
                        <Input size={'small'} placeholder={t('agenda.tab5.placeholder2')} disabled={false} />
                        {value1.coin}
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
                    <span className={cn('amount')}>{value2 ? value2.label : '-'}</span>
                    {value2 && <span className={cn('exchange')}>{t('agenda.tab5.exchange1', { amount: '12,083,000', coin: 'stWEMIX' })}</span>}
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
                      handleChangeRadio(e, 2);
                    }}
                    value={value2?.value}
                  >
                    {radioList2.map((v, i) => {
                      return (
                        <Radio checked={false} disabled={value1 ? false : true} value={v.value} key={`radio2-${i}`}>
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
        </Form>
      </div>
      <div className={cn('agenda-modal-footer')}>
        {/* 23.03.27 수정: 버튼 컬러 정의 수정 반영 */}
        <BgButton
          buttonText={t('agenda.confirm')}
          color="black"
          size="lg"
          onClick={() => {
            onConfirm();
          }}
        />
      </div>
    </div>
  );
};

export default TreasuryTokenEdit;
