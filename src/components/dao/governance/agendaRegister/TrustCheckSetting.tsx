import React, { useCallback, useEffect, useState } from 'react';
import BgButton from '@/components/button/BgButton';
import cn from 'classnames';
import AgendaTable from './AgendaTable';
import { useTranslation } from 'next-i18next';
import Radio from 'antd/lib/radio';
import { Form, Input } from 'antd';
import { provider } from '@/state/nileWalletAtom';
import { daoAbis, daoJsonAbiAddress } from '@/web3/abis/dao';
import { BasePolicyType } from '@/types/dao/proposal.types';
import { fromWei } from 'web3-utils';
import { useSetAtom } from 'jotai';
import { governanceParamsAtom, trustCheckParamAtom } from '@/state/governanceAtom';
import { useWonder } from '@/hook/useWonder';

export interface AgendaModalType {
  onConfirm: Function;
}

const TrustCheckSetting: React.FC<AgendaModalType> = ({ onConfirm }: AgendaModalType) => {
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const [form] = Form.useForm();
  const setParams = useSetAtom(trustCheckParamAtom);
  const { wonderDao } = useWonder();

  const [basePolicy, setBasePolicy] = useState<BasePolicyType>();

  useEffect(() => {
    const contract = new provider.web3.eth.Contract(daoAbis.Governance, daoJsonAbiAddress().current.GovernanceProxy);

    contract?.methods.getPolicy(wonderDao?.daoId, 3).call(function (err: any, res: any) {
      setBasePolicy(res[0]);
    });
  }, []);

  const [deadline, setDeadline] = useState<string>();
  const [permitCutOff, setPermitCutOff] = useState<string>();

  const deadlineValidator = useCallback((_: any, value: string) => {
    if (Number(value) < 1 || Number(value) > 30) {
      return Promise.reject(new Error(t('agenda.tab1.error1')));
    }
    return Promise.resolve();
  }, []);

  const permitValidator = useCallback((_: any, value: string) => {
    if (Number(value) < 50) {
      return Promise.reject(new Error(t('agenda.tab1.error2')));
    }
    return Promise.resolve();
  }, []);

  const onFinish = (values: any) => {
    setParams({
      deadline: values?.deadline,
      permitCutOff: values?.permitCutOff,
    });
    onConfirm();
  };

  return (
    <Form name="trust-check-setting" layout="vertical" onFinish={onFinish} size="middle" form={form}>
      <div className={cn('agenda-cont-wrap')}>
        <div className={cn('agenda-modal-body')}>
          <p className={cn('agenda-desc')}>{t('agenda.tab7.desc')}</p>
          <AgendaTable
            className={'trust-check-table'}
            titleFull={t('agenda.tab7.th1')}
            titleColumn={[
              { title: ' ', node: [t('agenda.tab7.td1'), t('agenda.tab7.td2')], rowspan: true },
              {
                node: [
                  t('agenda.tab7.label3', { day: Math.floor(Number(basePolicy?.emergencyPolicy?.emergencyDeadline) / (3600 * 24)) }),
                  <div>{t('agenda.tab7.label3', { day: deadline ?? '-' })}</div>,
                ],
              },
            ]}
            children={
              <Form.Item
                className="error-case1"
                name="deadline"
                required
                rules={[
                  {
                    validator: deadlineValidator,
                  },
                ]}
              >
                <div className={cn('radio-wrap')}>
                  <Radio.Group name="deadline" onChange={(e) => setDeadline(e.target.value)} value={deadline}>
                    <Radio checked={false} value={Math.floor(Number(basePolicy?.emergencyPolicy?.emergencyDeadline) / (3600 * 24))}>
                      {t('agenda.tab7.label1')}
                    </Radio>
                    <Radio checked={false} value="1">
                      {t('agenda.tab7.label3', { day: 1 })}
                    </Radio>
                    <Radio checked={false} value="3">
                      {t('agenda.tab7.label3', { day: 3 })}
                    </Radio>
                    <Radio checked={false} value="5">
                      {t('agenda.tab7.label3', { day: 5 })}
                    </Radio>
                    <Radio checked={false} value="0">
                      {t('agenda.tab7.label4')} <Input placeholder={t('agenda.tab7.placeholder1')} disabled={deadline !== '0'} size="small" />
                      {t('agenda.tab7.label3', { day: null })}
                    </Radio>
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />
          <AgendaTable
            className={'trust-check-table'}
            titleFull={t('agenda.tab7.th2')}
            titleColumn={[
              { title: ' ', node: [t('agenda.tab7.td1'), t('agenda.tab7.td2')], rowspan: true },
              {
                node: [
                  t('agenda.tab7.label2', { percent: fromWei(basePolicy?.emergencyPolicy?.emergencyPermitCutOff ?? '', 'ether') }),
                  <div>{t('agenda.tab7.label2', { percent: permitCutOff ?? '-' })}</div>,
                ],
              },
            ]}
            children={
              <Form.Item
                className="error-case2"
                name="permitCutOff"
                required
                rules={[
                  {
                    validator: permitValidator,
                  },
                ]}
              >
                <div className={cn('radio-wrap')}>
                  <Radio.Group name="permitCutOff" onChange={(e) => setPermitCutOff(e.target.value)} value={permitCutOff}>
                    <Radio checked={false} value={fromWei(basePolicy?.emergencyPolicy?.emergencyPermitCutOff ?? '', 'ether')}>
                      {t('agenda.tab7.label1')}
                    </Radio>
                    <Radio checked={false} value="50">
                      {t('agenda.tab7.label2', { percent: 50 })}
                    </Radio>
                    <Radio checked={false} value="60">
                      {t('agenda.tab7.label2', { percent: 60 })}
                    </Radio>
                    <Radio checked={false} value="70">
                      {t('agenda.tab7.label2', { percent: 70 })}
                    </Radio>
                    <Radio checked={false} value="0">
                      {t('agenda.tab7.label5')} <Input placeholder={t('agenda.tab7.placeholder2')} disabled={permitCutOff !== '0'} size="small" />%
                    </Radio>
                  </Radio.Group>
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

export default TrustCheckSetting;
