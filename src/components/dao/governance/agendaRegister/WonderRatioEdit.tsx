import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Form, Input, Radio, RadioChangeEvent } from 'antd';

import BgButton from '@/components/button/BgButton';
import AgendaTable from './AgendaTable';
import { useAtom } from 'jotai';
import { distributionParamsAtom } from '@/state/governanceAtom';
import { useWonder } from '@/hook/useWonder';
import { fromWei } from 'web3-utils';

export interface AgendaModalType {
  onConfirm: Function;
}

interface RatioType {
  id: number | undefined;
  burnRatio: string;
  obelisk: string;
}

const WonderRatioEdit: React.FC<AgendaModalType> = ({ onConfirm }: AgendaModalType) => {
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const [form] = Form.useForm();
  const [params, setParams] = useAtom(distributionParamsAtom);

  const { wonderDao } = useWonder();

  const ratioList: RatioType[] = [
    {
      id: 0,
      burnRatio: fromWei(wonderDao?.burnRatio ?? '', 'ether'),
      obelisk: String(100 - Number(fromWei(wonderDao?.burnRatio ?? '', 'ether'))),
    },
    {
      id: 1,
      burnRatio: '30',
      obelisk: '70',
    },
    {
      id: 2,
      burnRatio: '50',
      obelisk: '50',
    },
    {
      id: 3,
      burnRatio: '70',
      obelisk: '30',
    },
    {
      id: 4,
      burnRatio: '0',
      obelisk: '0',
    },
  ];

  const amountValidator = useCallback((_: any, value: string) => {
    if (!value || Number(value) > 100) {
      return Promise.reject(new Error(t('agenda.tab3.error1')));
    }
    return Promise.resolve();
  }, []);

  const onFinish = (values: any) => {
    onConfirm();
  };

  return (
    <Form name="wonder-ratio-edit" layout="vertical" onFinish={onFinish} size="middle" form={form}>
      <div className={cn('agenda-cont-wrap')}>
        <div className={cn('agenda-modal-body')}>
          <p className={cn('agenda-desc')}>{t('agenda.tab3.desc')}</p>
          <AgendaTable
            className={'dao-ratio-edit-table1'}
            titleColumn={[
              { title: t('agenda.tab3.th1'), node: [t('agenda.tab3.td1'), t('agenda.tab3.td2')] },
              {
                title: t('agenda.tab3.th2'),
                node: [`${ratioList[0]?.burnRatio}%`, params?.burnRatio ? `${params?.burnRatio}%` : '-'],
              },
              {
                title: t('agenda.tab3.th3'),
                node: [`${ratioList[0]?.obelisk}%`, params?.obelisk ? `${params?.obelisk}%` : '-'],
              },
            ]}
            children={
              <Form.Item
                name={'wonder-ratio-field1'}
                required
                rules={[
                  {
                    validator: amountValidator,
                  },
                ]}
              >
                <div className={cn('ratio-list')}>
                  <Radio.Group
                    name="radio-group-onchange"
                    onChange={(e) => {
                      const ratio = ratioList?.find((item) => item.id === e.target.value);
                      setParams((prev) => ({
                        ...prev,
                        id: e.target.value,
                        burnRatio: ratio?.burnRatio,
                        obelisk: ratio?.obelisk,
                      }));
                    }}
                    value={params?.id}
                  >
                    <Radio checked={false} value={0}>
                      {t('agenda.tab3.label1')}
                    </Radio>
                    {ratioList?.slice(1, 4)?.map((item) => (
                      <>
                        {item.burnRatio !== ratioList[0].burnRatio && (
                          <Radio checked={false} value={item.id}>
                            {item.burnRatio}% : {item.obelisk}%
                          </Radio>
                        )}
                      </>
                    ))}
                    <Radio checked={false} value={4}>
                      <span className={cn('custom-input')}>
                        {t('agenda.tab3.label2')}
                        <span className={cn('custom-fieldset')}>
                          <span className={cn('input-outer')}>
                            <Input
                              size="small"
                              disabled={params?.id !== 4}
                              onChange={(e) => {
                                setParams((prev) => ({ ...prev, burnRatio: e.target.value }));
                              }}
                            />
                            %
                          </span>
                          :
                          <span className={cn('input-outer')}>
                            <Input
                              size="small"
                              disabled={params?.id !== 4}
                              onChange={(e) => {
                                setParams((prev) => ({ ...prev, obelisk: e.target.value }));
                              }}
                            />
                            %
                          </span>
                        </span>
                      </span>
                    </Radio>
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />
          <ul className={cn('radio-edit-info')}>
            <li>{t('agenda.tab3.info1')}</li>
          </ul>
        </div>
        <div className={cn('agenda-modal-footer')}>
          <BgButton buttonText={t('agenda.confirm')} color="black" size="lg" htmlType="submit" />
        </div>
      </div>
    </Form>
  );
};

export default WonderRatioEdit;
