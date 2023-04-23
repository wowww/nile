import React, { useCallback, useState } from 'react';
import BgButton from '@/components/button/BgButton';
import cn from 'classnames';
import AgendaTable from './AgendaTable';
import { DatePicker, Form, Input, Radio } from 'antd';
import { useTranslation } from 'next-i18next';
import moment, { Moment } from 'moment';
import { useAtom } from 'jotai';
import { reopenParamsAtom } from '@/state/governanceAtom';
import { toWei } from 'web3-utils';

export interface AgendaModalType {
  onConfirm: Function;
}

interface RadioType {
  id?: number;
  value?: string;
  label?: string;
}

const StationReOpen: React.FC<AgendaModalType> = ({ onConfirm }: AgendaModalType) => {
  const [increaseValue, setIncreaseValue] = useState('');
  const [tokenValue, setTokenValue] = useState<number>();
  const [form] = Form.useForm();
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });

  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD hh:mm A';
  const disabledDate = (current: Moment) => {
    return current < moment().subtract(1, 'day').endOf('day');
  };

  const [params, setParams] = useAtom(reopenParamsAtom);
  const [minEnterAmount, setMinEnterAmount] = useState<RadioType>();
  const [unit, setUnit] = useState<RadioType>();

  const options: RadioType[] = [
    {
      id: 1,
      value: toWei('1', 'ether'),
      label: '1 WEMIX',
    },
    {
      id: 2,
      value: toWei('10', 'ether'),
      label: '10 WEMIX',
    },
    {
      id: 3,
      value: toWei('100', 'ether'),
      label: '100 WEMIX',
    },
    {
      id: 4,
      value: '',
      label: 'WEMIX',
    },
  ];

  const amountValidator = useCallback(
    (_: any, value: string) => {
      // Error Case1 : 금액 입력 필요
      if (_.field === 'station-re-field2' && !value) {
        return Promise.reject(new Error(t('agenda.tab6.error1')));
      }
      // Error Case2 : 수량 입력 필요
      if (_.field !== 'station-re-field2' && !value) {
        return Promise.reject(new Error(t('agenda.tab6.error2')));
      }
      return Promise.resolve();
    },
    [t],
  );

  const onFinish = (values: any) => {
    setParams({
      period: 432000,
      purposeAmount: values?.purposeAmount,
      addMintAmount: values?.addMintAmount,
      minEnterAmount: values?.minEnterAmount?.replace('WEMIX', '').trim(),
      unit: values?.unit?.replace('WEMIX', '').trim(),
    });
    onConfirm();
  };

  return (
    <Form name="station-re-open" layout="vertical" onFinish={onFinish} size="middle" form={form}>
      <div className={cn('agenda-cont-wrap')}>
        <div className={cn('agenda-modal-body')}>
          <p className={cn('agenda-desc')}>{t('agenda.tab6.desc')}</p>
          <AgendaTable
            className={'station-reopen-table'}
            titleColumn={[{ title: t('agenda.tab6.th1') }]}
            children={
              <Form.Item className="error-case1" name={'station-re-field1'} required>
                <>
                  <div className={cn('recruitment-period-wrap')}>
                    <RangePicker
                      className="date-picker"
                      showTime={{ format: 'HH:mm A' }}
                      format={dateFormat}
                      separator="~"
                      // defaultValue={[moment(`${startTime}, 11:00`, dateFormat), moment(`${endTime}, 11:00`, dateFormat)]}
                      monthCellRender={(date) => date.format('MMM')}
                      allowClear={false}
                      disabledDate={disabledDate}
                    />
                  </div>
                  <span className={cn('station-reopen-desc')}>{t('agenda.tab6.desc1')}</span>
                </>
              </Form.Item>
            }
          />
          <AgendaTable
            className={'station-reopen-table2'}
            titleFull={t('agenda.tab6.th2')}
            children={
              <>
                <div className={cn('token-field')}>
                  <Form.Item
                    className="error-case1"
                    name="purposeAmount"
                    required
                    rules={[
                      {
                        validator: amountValidator,
                      },
                    ]}
                  >
                    <Input size={'small'} placeholder={t('agenda.tab1.placeholder2')} disabled={false} />
                  </Form.Item>
                  WEMIX
                </div>
                <span className={cn('station-reopen-desc')}>{t('agenda.tab6.desc2')}</span>
              </>
            }
          />
          <AgendaTable
            className={'station-reopen-table2'}
            titleFull={t('agenda.tab6.th3')}
            children={
              <>
                <div className={cn('token-field')}>
                  <Form.Item
                    className="error-case1"
                    name="addMintAmount"
                    required
                    rules={[
                      {
                        validator: amountValidator,
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      size={'small'}
                      placeholder={t('agenda.tab6.placeholder1')}
                      disabled={false}
                      onChange={(e) => {
                        setTokenValue(Number(e.target.value));
                      }}
                    />
                  </Form.Item>
                  WDR
                </div>
                <span className={cn('token-value')}>
                  ($
                  {!tokenValue
                    ? Number(0).toFixed(2)
                    : Number(tokenValue)
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  )
                </span>
              </>
            }
          />
          <AgendaTable
            className={'station-reopen-table3'}
            titleColumn={[
              {
                title: t('agenda.tab6.th4'),
                node: [<div className={cn('token-name')}>{minEnterAmount?.label ?? '-'}</div>],
              },
            ]}
            children={
              <Form.Item
                className="error-case2"
                name="minEnterAmount"
                required
                rules={[
                  {
                    validator: amountValidator,
                  },
                ]}
              >
                <div className={cn('tokens-list')}>
                  <div className={cn('radio-wrap')}>
                    <Radio.Group
                      name={'station-reopen'}
                      onChange={(e) => {
                        const amount = options?.find((item) => item.label === e.target.value);
                        setMinEnterAmount({ ...amount });
                      }}
                    >
                      {options?.map((item) => (
                        <Radio checked={false} value={item.label}>
                          {item?.label}
                          {item.id === 4 && (
                            <>
                              {t('agenda.tab6.label1')}
                              <Input
                                placeholder={t('agenda.tab6.placeholder1')}
                                disabled={minEnterAmount?.id !== 4}
                                size="small"
                                onChange={(e) =>
                                  setMinEnterAmount({
                                    id: 4,
                                    label: `${e.target.value} WEMIX`,
                                    value: e.target.value,
                                  })
                                }
                              />
                              &nbsp;WEMIX
                            </>
                          )}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                </div>
              </Form.Item>
            }
          />
          <AgendaTable
            className={'station-reopen-table3'}
            titleColumn={[
              {
                title: t('agenda.tab6.th5'),
                node: [<div className={cn('token-name')}>{unit?.label ?? '-'}</div>],
              },
            ]}
            children={
              <Form.Item
                className="error-case2"
                name="unit"
                required
                rules={[
                  {
                    validator: amountValidator,
                  },
                ]}
              >
                <div className={cn('tokens-list')}>
                  <div className={cn('radio-wrap')}>
                    <Radio.Group
                      name={'station-reopen'}
                      onChange={(e) => {
                        const amount = options?.find((item) => item.label === e.target.value);
                        setUnit({ ...amount });
                      }}
                    >
                      {options?.map((item) => (
                        <Radio checked={false} value={item.label}>
                          {item?.label}
                          {item.id === 4 && (
                            <>
                              {t('agenda.tab6.label1')}
                              <Input
                                placeholder={t('agenda.tab6.placeholder1')}
                                disabled={unit?.id !== 4}
                                size="small"
                                onChange={(e) =>
                                  setUnit({
                                    id: 4,
                                    label: `${e.target.value} WEMIX`,
                                    value: e.target.value,
                                  })
                                }
                              />
                              &nbsp;WEMIX
                            </>
                          )}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                </div>
              </Form.Item>
            }
          />
        </div>
        <div className={cn('agenda-modal-footer')}>
          <BgButton buttonText={t('agenda.confirm')} color="black" size="lg" htmlType="submit" />
        </div>
      </div>
    </Form>
  );
};

export default StationReOpen;
