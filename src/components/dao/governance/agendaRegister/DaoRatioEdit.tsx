import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Form, Input, Radio } from 'antd';

import BgButton from '@/components/button/BgButton';
import AgendaTable from './AgendaTable';
import { useWonder } from '@/hook/useWonder';
import { fromWei } from 'web3-utils';
import { RevenueParam } from '@/types/dao/proposal.types';
import { useAtom } from 'jotai';
import { revenueParamsAtom } from '@/state/governanceAtom';

export interface AgendaModalType {
  onConfirm: Function;
}

const DaoRatioEdit = ({ onConfirm }: AgendaModalType) => {
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const [form] = Form.useForm();

  const { wonderDao } = useWonder();
  const [params, setParams] = useAtom(revenueParamsAtom);

  const ratioList: RevenueParam[] = [
    {
      id: 0,
      treasury: fromWei(wonderDao?.revenueRatio ?? '', 'ether'),
      incinerator: String(100 - Number(fromWei(wonderDao?.revenueRatio ?? '', 'ether'))),
    },
    {
      id: 1,
      treasury: '30',
      incinerator: '70',
    },
    {
      id: 2,
      treasury: '50',
      incinerator: '50',
    },
    {
      id: 3,
      treasury: '70',
      incinerator: '30',
    },
    {
      id: 4,
      treasury: '0',
      incinerator: '0',
    },
  ];

  const amountValidator = useCallback((_: any, value: string) => {
    if (!value || Number(value) > 100) {
      return Promise.reject(new Error(t('agenda.tab2.error1')));
    }
    return Promise.resolve();
  }, []);

  const onFinish = (values: any) => {
    onConfirm();
  };

  return (
    <Form name="dao-ratio-edit" layout="vertical" onFinish={onFinish} size="middle" form={form}>
      <div className={cn('agenda-cont-wrap')}>
        <div className={cn('agenda-modal-body')}>
          <p className={cn('agenda-desc')}>{t('agenda.tab2.desc')}</p>

          <AgendaTable
            className={'dao-ratio-edit-table1'}
            titleColumn={[
              { title: t('agenda.tab2.th1'), node: [t('agenda.tab2.td1'), t('agenda.tab2.td2')] },
              { title: t('agenda.tab2.th2'), node: [`${ratioList[0].treasury}%`, params?.treasury ? `${params?.treasury}%` : '-'] },
              { title: t('agenda.tab2.th3'), node: [`${ratioList[0].incinerator}%`, params?.incinerator ? `${params.incinerator}%` : '-'] },
            ]}
            children={
              <Form.Item
                name={'dao-ratio-field1'}
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
                      setParams((prev) => ({ ...prev, id: e.target.value, treasury: ratio?.treasury, incinerator: ratio?.incinerator }));
                    }}
                    value={params?.id}
                  >
                    <Radio checked={false} value={0}>
                      {t('agenda.tab2.label1')}
                    </Radio>
                    {ratioList?.slice(1, 4)?.map((item) => (
                      <>
                        {item.treasury !== ratioList[0].treasury && (
                          <Radio checked={false} value={item.id}>
                            {item.treasury}% : {item.incinerator}%
                          </Radio>
                        )}
                      </>
                    ))}
                    <Radio checked={false} value={4}>
                      <span className={cn('custom-input')}>
                        {t('agenda.tab2.label2')}
                        <span className={cn('custom-fieldset')}>
                          <span className={cn('input-outer')}>
                            <Input
                              size="small"
                              disabled={params?.id !== 4}
                              onChange={(e) => {
                                setParams((prev) => ({ ...prev, treasury: e.target.value }));
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
                                setParams((prev) => ({ ...prev, incinerator: e.target.value }));
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
            <li>{t('agenda.tab2.info1')}</li>
            <li>{t('agenda.tab2.info2')}</li>
          </ul>
        </div>
        <div className={cn('agenda-modal-footer')}>
          <BgButton
            buttonText={t('agenda.confirm')}
            color="black"
            size="lg"
            htmlType="submit"
          />
        </div>
      </div>
    </Form>
  );
};

export default DaoRatioEdit;
