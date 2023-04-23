import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Form, Input, Radio } from 'antd';

import BgButton from '@/components/button/BgButton';
import AgendaTable from './AgendaTable';
import { useAtom, useSetAtom } from 'jotai';
import { governanceParamsAtom } from '@/state/governanceAtom';
import { useWonder } from '@/hook/useWonder';
import { fromWei, toWei } from 'web3-utils';
import { provider } from '@/state/nileWalletAtom';
import { daoAbis, daoJsonAbiAddress } from '@/web3/abis/dao';
import { SubPolicyType } from '@/types/dao/proposal.types';

export interface AgendaModalType {
  onConfirm: Function;
}

interface SpellType {
  value: number;
  label: string;
}

interface Check {
  consensus?: string;
  governance?: string;
}

const GovernanceSetting: React.FC<AgendaModalType> = ({ onConfirm }: AgendaModalType) => {
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const [form] = Form.useForm();
  const setParams = useSetAtom(governanceParamsAtom);
  const { wonderDao } = useWonder();
  const [subPolicy, setSubPolicy] = useState<SubPolicyType[]>();

  const [spellType, setSpellType] = useState<number>();
  const [baseRatio, setBaseRatio] = useState<number>();
  const [deadline, setDeadline] = useState<Check>();
  const [quorum, setQuorum] = useState<Check>();
  const [permitCutOff, setPermitCutOff] = useState<Check>();

  const spellTypeList: SpellType[] = [
    {
      value: 0,
      label: t('agenda.item.1'),
    },
    {
      value: 3,
      label: t('agenda.item.2'),
    },
    {
      value: 2,
      label: t('agenda.item.3'),
    },
    {
      value: 4,
      label: t('agenda.item.4'),
    },
    {
      value: 6,
      label: t('agenda.item.5'),
    },
    {
      value: 5,
      label: t('agenda.item.6'),
    },
    {
      value: 7,
      label: t('agenda.item.8'),
    },
  ];

  const baseRatioList = [
    { id: 1, value: fromWei(wonderDao?.baseRatio ?? '', 'ether'), label: 'keep' },
    { id: 2, value: '0.01', label: '0.01' },
    { id: 3, value: '0.1', label: '0.1' },
    { id: 4, value: '1', label: '1' },
    { id: 5, value: '', label: 'custom' },
  ];

  const deadlineList = useCallback(
    (idx: number) => {
      return [
        { id: 1, value: subPolicy?.[idx]?.deadLine, label: 'keep' },
        { id: 2, value: '1', label: '1' },
        { id: 3, value: '3', label: '3' },
        { id: 4, value: '5', label: '5' },
        { id: 5, value: '0', label: 'custom' },
      ];
    },
    [subPolicy],
  );

  const quorumList = useCallback(
    (idx: number) => {
      return [
        { id: 1, value: subPolicy?.[idx]?.quorum, label: 'keep' },
        { id: 2, value: '5', label: '5' },
        { id: 3, value: '10', label: '10' },
        { id: 4, value: '15', label: '15' },
        { id: 5, value: '0', label: 'custom' },
      ];
    },
    [subPolicy],
  );

  const permitCutOffList = useCallback(
    (idx: number) => {
      return [
        { id: 1, value: subPolicy?.[idx]?.permitCutOff, label: 'keep' },
        { id: 2, value: '50', label: '50' },
        { id: 3, value: '60', label: '60' },
        { id: 4, value: '70', label: '70' },
        { id: 5, value: '0', label: 'custom' },
      ];
    },
    [subPolicy],
  );

  const percentValidator = useCallback((_: any, value: string) => {
    if (!value || Number(value) <= 0 || Number(value) > 100) {
      return Promise.reject(new Error(t('agenda.tab4.error1')));
    }
    return Promise.resolve();
  }, []);

  const dateValidator = useCallback((_: any, value: string) => {
    if (!value || Number(value) <= 0 || Number(value) > 30) {
      return Promise.reject(new Error(t('agenda.tab4.error2')));
    }
    return Promise.resolve();
  }, []);

  useEffect(() => {
    if (wonderDao?.daoId && spellType) {
      const contract = new provider.web3.eth.Contract(daoAbis.Governance, daoJsonAbiAddress().current.GovernanceProxy);

      contract?.methods.getPolicy(wonderDao?.daoId, spellType).call(function(err: any, res: any) {
        console.log('policy >> ', res);
        setSubPolicy(res[1]);
      });
    }
  }, [wonderDao, spellType]);

  const onFinish = (values: any) => {
    setParams({
      spellType: {
        label: spellTypeList?.find((item) => item?.value === Number(values.spellType))?.label,
        value: values.spellType,
      },
      baseRatio: {
        label: baseRatioList?.find((item) => item?.value === values.baseRatio)?.label,
        value: values.baseRatio,
      },
      subPolicy: {
        consensus: {
          permitCutOff: values.consensusPermitCutOff,
          quorum: values.consensusQuorum,
          deadline: {
            value: values.consensusDeadline,
            label: deadlineList(0)?.find((item) => item?.value === values.consensusDeadline)?.label,
          },
        },
        governance: {
          permitCutOff: values.governancePermitCutOff,
          quorum: values.governanceQuorum,
          deadline: {
            value: values.governanceDeadline,
            label: deadlineList(1)?.find((item) => item?.value === values.governanceDeadline)?.label,
          },
        },
      },
    });
    onConfirm();
  };

  return (
    <Form name='gov-setting' layout='vertical' onFinish={onFinish} size='middle' form={form}>
      <div className={cn('agenda-cont-wrap')}>
        <div className={cn('agenda-modal-body')}>
          <p className={cn('agenda-desc')}>{t('agenda.tab4.desc')}</p>
          <AgendaTable
            className={'gov-setting-table'}
            titleColumn={[
              {
                title: t('agenda.tab4.th1'),
                node: [<div
                  className={cn('set-val1')}>{spellTypeList?.find((item) => item.value === spellType)?.label ?? '-'}</div>],
              },
            ]}
            children={
              <Form.Item name='spellType' required>
                <div className={cn('gov-set-list1')}>
                  <Radio.Group name='radio-group-onchange' onChange={(e) => setSpellType(e.target.value)}
                               value={spellType}>
                    {spellTypeList.map((v: SpellType, i: number) => {
                      return (
                        <Radio checked={false} value={v.value} key={`radiogroup1-${i}`}>
                          {v.label}
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />

          <AgendaTable
            className={'gov-setting-table'}
            titleFull={t('agenda.tab4.th2')}
            titleColumn={[
              { title: ' ', node: [t('agenda.tab4.td1'), t('agenda.tab4.td2')], rowspan: true },
              {
                node: [`${baseRatioList[0]?.value}%`, `${form.getFieldsValue()?.baseRatio ?? '-'}%`],
              },
            ]}
            children={
              <Form.Item
                className='error-case1'
                name='baseRatio'
                required
                rules={[
                  {
                    validator: percentValidator,
                  },
                ]}
              >
                <div className={cn('gov-set-list2')}>
                  <Radio.Group name='radio-group-onchange' onChange={(e) => setBaseRatio(e.target.value)}
                               value={baseRatio}>
                    {baseRatioList.map((item, i: number) => {
                      return (
                        <>
                          {fromWei(wonderDao?.baseRatio ?? '', 'ether') !== item.label && (
                            <Radio checked={false} value={item.value} key={`radiogroup2-${i}`}>
                              {i === 0 && t('agenda.tab4.label1')}
                              {i > 0 && i < 4 && t('agenda.tab4.label2', { percent: item.label })}
                              {i === 4 && (
                                <span className={cn('custom-input')}>
                                  {t('agenda.tab4.label4')}
                                  <span className={cn('custom-fieldset')}>
                                    <span className={cn('input-outer')}>
                                      <Input size='small' disabled={!!baseRatio} />%
                                    </span>
                                  </span>
                                </span>
                              )}
                            </Radio>
                          )}
                        </>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />

          {/* 투표 기간 */}
          <AgendaTable
            className={'gov-setting-table'}
            titleFull={t('agenda.tab4.th3')}
            titleColumn={[
              { title: t('agenda.tab4.th4'), node: [t('agenda.tab4.td1'), t('agenda.tab4.td2')], rowspan: true },
              {
                node: [
                  t('agenda.tab4.label3', { day: `${deadlineList(0)?.[0]?.value ?? ''}` }),
                  t('agenda.tab4.label3', { day: `${form.getFieldsValue()?.consensusDeadline ?? ''}` }),
                ],
              },
            ]}
            children={
              <Form.Item
                className='error-case2'
                name='consensusDeadline'
                required
                rules={[
                  {
                    validator: dateValidator,
                  },
                ]}
              >
                <div className={cn('gov-set-list2')}>
                  <Radio.Group
                    name='radio-group-onchange'
                    onChange={(e) => setDeadline((prev) => ({ ...prev, consensus: e.target.value }))}
                    value={deadline?.consensus}
                  >
                    {deadlineList(0)?.map((item, i: number) => {
                      return (
                        <Radio checked={false} value={item?.value} key={`radiogroup3-${i}`}>
                          <div className={cn('')}>
                            {i === 0 && t('agenda.tab4.label1')}
                            {i > 0 && i < 4 && t('agenda.tab4.label3', { day: item.label })}
                            {i === 4 && (
                              <span className={cn('custom-input')}>
                                {t('agenda.tab4.label5')}
                                <span className={cn('custom-fieldset')}>
                                  <span className={cn('input-outer')}>
                                    <Input size='small'
                                           disabled={deadlineList(0)?.find((item) => item?.value === deadline?.consensus)?.id !== 5} />
                                    {/* 23.04.09 수정: 공백 제거 */}
                                    {t('agenda.tab4.label3', { day: '' })}
                                  </span>
                                </span>
                              </span>
                            )}
                          </div>
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />
          <AgendaTable
            className={'gov-setting-table sub-table'}
            titleColumn={[
              { title: t('agenda.tab4.th5'), node: [t('agenda.tab4.td1'), t('agenda.tab4.td2')], rowspan: true },
              {
                node: [
                  t('agenda.tab4.label3', { day: `${deadlineList(1)?.[0]?.value ?? ''}` }),
                  t('agenda.tab4.label3', { day: `${form.getFieldsValue()?.governanceDeadline ?? '-'}` }),
                ],
              },
            ]}
            children={
              <Form.Item
                className='error-case2'
                name='governanceDeadline'
                required
                rules={[
                  {
                    validator: dateValidator,
                  },
                ]}
              >
                <div className={cn('gov-set-list2')}>
                  <Radio.Group
                    name='radio-group-onchange'
                    onChange={(e) => setDeadline((prev) => ({ ...prev, governance: e.target.value }))}
                    value={deadline?.governance}
                  >
                    {deadlineList(1).map((item, i: number) => {
                      return (
                        <Radio checked={false} value={item?.value} key={`radiogroup4-${i}`}>
                          <div className={cn('')}>
                            {i === 0 && t('agenda.tab4.label1')}
                            {i > 0 && i < 4 && t('agenda.tab4.label3', { day: item.label })}
                            {i === 4 && (
                              <span className={cn('custom-input')}>
                                {t('agenda.tab4.label5')}
                                <span className={cn('custom-fieldset')}>
                                  <span className={cn('input-outer')}>
                                    <Input size='small'
                                           disabled={deadlineList(1)?.find((item) => item.value === deadline?.governance)?.id !== 5} />%
                                  </span>
                                </span>
                              </span>
                            )}
                          </div>
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />

          {/*  /!* 정족수 *!/*/}
          <AgendaTable
            className={'gov-setting-table'}
            titleFull={
              <>
                {t('agenda.tab4.th6')}
                <span className={cn('sub')}>{t('agenda.tab4.th7')}</span>
              </>
            }
            titleColumn={[
              { title: t('agenda.tab4.th4'), node: [t('agenda.tab4.td1'), t('agenda.tab4.td2')], rowspan: true },
              { node: [`${quorumList(0)?.[0]?.value}%`, `${form.getFieldsValue()?.consensusQuorum ?? '-'}%`] },
            ]}
            children={
              <Form.Item
                className='error-case1'
                name='consensusQuorum'
                required
                rules={[
                  {
                    validator: percentValidator,
                  },
                ]}
              >
                <div className={cn('gov-set-list2')}>
                  <Radio.Group
                    name='radio-group-onchange'
                    onChange={(e) => setQuorum((prev) => ({ ...prev, consensus: e.target.value }))}
                    value={quorum?.consensus}
                  >
                    {quorumList(0)?.map((item, i: number) => {
                      return (
                        <Radio checked={false} value={item.value} key={`radiogroup5-${i}`}>
                          <div className={cn('')}>
                            {i === 0 && t('agenda.tab4.label1')}
                            {i > 0 && i < 4 && t('agenda.tab4.label2', { percent: item.label })}
                            {i === 4 && (
                              <span className={cn('custom-input')}>
                                {t('agenda.tab4.label4')}
                                <span className={cn('custom-fieldset')}>
                                  <span className={cn('input-outer')}>
                                    <Input size='small'
                                           disabled={quorumList(0)?.find((item) => item.value === quorum?.consensus)?.id !== 5} />%
                                  </span>
                                </span>
                              </span>
                            )}
                          </div>
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />
          <AgendaTable
            className={'gov-setting-table sub-table'}
            titleColumn={[
              { title: t('agenda.tab4.th5'), node: [t('agenda.tab4.td1'), t('agenda.tab4.td2')], rowspan: true },
              { node: [`${quorumList(1)?.[0]?.value}%`, `${form.getFieldsValue()?.governanceQuorum ?? '-'}%`] },
            ]}
            children={
              <Form.Item
                className='error-case1'
                name='governanceQuorum'
                required
                rules={[
                  {
                    validator: percentValidator,
                  },
                ]}
              >
                <div className={cn('gov-set-list2')}>
                  <Radio.Group
                    name='radio-group-onchange'
                    onChange={(e) => setQuorum((prev) => ({ ...prev, governance: e.target.value }))}
                    value={quorum?.governance}
                  >
                    {quorumList(1)?.map((item, i: number) => {
                      return (
                        <Radio checked={false} value={item.value} key={`radiogroup6-${i}`}>
                          <div className={cn('')}>
                            {i === 0 && t('agenda.tab4.label1')}
                            {i > 0 && i < 4 && t('agenda.tab4.label2', { percent: item.label })}
                            {i === 4 && (
                              <span className={cn('custom-input')}>
                                {t('agenda.tab4.label4')}
                                <span className={cn('custom-fieldset')}>
                                  <span className={cn('input-outer')}>
                                    <Input
                                      size='small'
                                      placeholder={t('agenda.tab4.placeholder1')}
                                      disabled={quorumList(1)?.find((item) => item.value === quorum?.governance)?.id !== 5}
                                    />
                                    %
                                  </span>
                                </span>
                              </span>
                            )}
                          </div>
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />

          {/*  /!* 가결조건 *!/*/}
          <AgendaTable
            className={'gov-setting-table'}
            titleFull={
              <>
                {t('agenda.tab4.th8')}
                <span className={cn('sub')}>{t('agenda.tab4.th9')}</span>
              </>
            }
            titleColumn={[
              { title: t('agenda.tab4.th4'), node: [t('agenda.tab4.td1'), t('agenda.tab4.td2')], rowspan: true },
              {
                node: [
                  t('agenda.tab4.label2', { percent: `${permitCutOffList(0)?.[0]?.value}` }),
                  `${form.getFieldsValue()?.consensusPermitCutOff ?? '-'}%`,
                ],
              },
            ]}
            children={
              <Form.Item
                className='error-case1'
                name='consensusPermitCutOff'
                required
                rules={[
                  {
                    validator: percentValidator,
                  },
                ]}
              >
                <div className={cn('gov-set-list2')}>
                  <Radio.Group
                    name='radio-group-onchange'
                    onChange={(e) => setPermitCutOff((prev) => ({ ...prev, consensus: e.target.value }))}
                    value={permitCutOff?.consensus}
                  >
                    {permitCutOffList(0)?.map((item, i: number) => {
                      return (
                        <Radio checked={false} value={item.value} key={`radiogroup7-${i}`}>
                          <div className={cn('')}>
                            {i === 0 && t('agenda.tab4.label1')}
                            {i > 0 && i < 4 && t('agenda.tab4.label2', { percent: item.label })}
                            {i === 4 && (
                              <span className={cn('custom-input')}>
                                {t('agenda.tab4.label4')}
                                <span className={cn('custom-fieldset')}>
                                  <span className={cn('input-outer')}>
                                    <Input
                                      size='small'
                                      placeholder={t('agenda.tab4.placeholder2')}
                                      disabled={permitCutOffList(0)?.find((item) => item.value === permitCutOff?.consensus)?.id !== 5}
                                    />
                                    %
                                  </span>
                                </span>
                              </span>
                            )}
                          </div>
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
            }
          />
          <AgendaTable
            className={'gov-setting-table sub-table'}
            titleColumn={[
              { title: t('agenda.tab4.th5'), node: [t('agenda.tab4.td1'), t('agenda.tab4.td2')], rowspan: true },
              {
                node: [
                  t('agenda.tab4.label2', { percent: `${permitCutOffList(1)?.[0]?.value}` }),
                  `${form.getFieldsValue()?.governancePermitCutOff ?? '-'}%`,
                ],
              },
            ]}
            children={
              <Form.Item
                className='error-case1'
                name='governancePermitCutOff'
                required
                rules={[
                  {
                    validator: percentValidator,
                  },
                ]}
              >
                <div className={cn('gov-set-list2')}>
                  <Radio.Group
                    name='radio-group-onchange'
                    onChange={(e) => setPermitCutOff((prev) => ({ ...prev, governance: e.target.value }))}
                    value={permitCutOff?.governance}
                  >
                    {permitCutOffList(1)?.map((item, i: number) => {
                      return (
                        <Radio checked={false} value={item.value} key={`radiogroup8-${i}`}>
                          <div className={cn('')}>
                            {i === 0 && t('agenda.tab4.label1')}
                            {i > 0 && i < 4 && t('agenda.tab4.label2', { percent: item.label })}
                            {i === 4 && (
                              <span className={cn('custom-input')}>
                                {t('agenda.tab4.label4')}
                                <span className={cn('custom-fieldset')}>
                                  <span className={cn('input-outer')}>
                                    <Input
                                      size='small'
                                      placeholder={t('agenda.tab4.placeholder2')}
                                      disabled={permitCutOffList(1)?.find((item) => item.value === permitCutOff?.governance)?.id !== 5}
                                    />
                                    %
                                  </span>
                                </span>
                              </span>
                            )}
                          </div>
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </Form.Item>
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

export default GovernanceSetting;
