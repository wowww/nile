import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Form, Input, Radio, RadioChangeEvent } from 'antd';

import BgButton from '@/components/button/BgButton';
import AgendaTable from './AgendaTable';

export interface AgendaModalType {
  onConfirm: Function;
}

interface RadioListType {
  value: number | undefined;
  treasury: string;
  incinerator: string;
}

const DaoRatioEdit: React.FC<AgendaModalType> = ({ onConfirm }: AgendaModalType) => {
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const [form] = Form.useForm();

  const [before, setBefore] = useState<RadioListType>({
    value: undefined,
    treasury: '30',
    incinerator: '70',
  });
  const radioList: RadioListType[] = [
    {
      value: 0,
      treasury: before.treasury,
      incinerator: before.incinerator,
    },
    {
      value: 1,
      treasury: '30',
      incinerator: '70',
    },
    {
      value: 2,
      treasury: '50',
      incinerator: '50',
    },
    {
      value: 3,
      treasury: '70',
      incinerator: '30',
    },
    {
      value: 4,
      treasury: '0',
      incinerator: '0',
    },
  ];
  const [selected, setSelected] = useState<number | null>(null);
  const [treasury, setTreasury] = useState<string | null>(null);
  const [incinerator, setIncinerator] = useState<string | null>(null);

  const handleChangeRadio = (e: RadioChangeEvent) => {
    setSelected(e.target.value);
    if (e.target.value === 0) {
      setTreasury(before.treasury);
      setIncinerator(before.incinerator);
      return;
    }
    if (e.target.value === 4) {
      setTreasury('');
      setIncinerator('');
      return;
    }
    setTreasury(radioList[e.target.value].treasury);
    setIncinerator(radioList[e.target.value].incinerator);
  };

  const amountValidator = useCallback((_: any, value: string) => {
    if (!value || Number(value) > 100) {
      return Promise.reject(new Error(t('agenda.tab2.error1')));
    }
    return Promise.resolve();
  }, []);

  const onFinish = (values: any) => {
    // setTermAgreement({
    //   birthAt: values.birthDate,
    //   zipCode: values.zipCode ?? undefined,
    //   agreement: true,
    // });
    confirmForm();
  };

  const confirmForm = () => {
    // if (termsCheck) {
    //   onSuccess?.();
    //   setIsOpen(false);
    // } else {
    //   setDisAgreeOpen(true);
    // }
  };
  return (
    <div className={cn('agenda-cont-wrap')}>
      <div className={cn('agenda-modal-body')}>
        <p className={cn('agenda-desc')}>{t('agenda.tab2.desc')}</p>
        <Form name="dao-ratio-edit" layout="vertical" onFinish={onFinish} size="middle" form={form}>
          <AgendaTable
            className={'dao-ratio-edit-table1'}
            titleColumn={[
              { title: t('agenda.tab2.th1'), node: [t('agenda.tab2.td1'), t('agenda.tab2.td2')] },
              { title: t('agenda.tab2.th2'), node: [`${before?.treasury}%`, treasury ? `${treasury}%` : '-'] },
              { title: t('agenda.tab2.th3'), node: [`${before?.incinerator}%`, incinerator ? `${incinerator}%` : '-'] },
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
                      handleChangeRadio(e);
                    }}
                    value={selected}
                  >
                    <Radio checked={false} value={0}>
                      {t('agenda.tab2.label1')}
                    </Radio>
                    {before.treasury !== '30' && before.incinerator !== '70' && (
                      <Radio checked={false} value={1}>
                        30% : 70%
                      </Radio>
                    )}
                    {before.treasury !== '50' && before.incinerator !== '50' && (
                      <Radio checked={false} value={2}>
                        50% : 50%
                      </Radio>
                    )}
                    {before.treasury !== '70' && before.incinerator !== '30' && (
                      <Radio checked={false} value={3}>
                        70% : 30%
                      </Radio>
                    )}
                    <Radio checked={false} value={4}>
                      <span className={cn('custom-input')}>
                        {t('agenda.tab2.label2')}
                        <span className={cn('custom-fieldset')}>
                          <span className={cn('input-outer')}>
                            <Input
                              size="small"
                              disabled={selected !== 4}
                              value={selected !== 4 ? '' : treasury || ''}
                              onChange={(e) => {
                                const changeValue = e.target.value;
                                const diffValue = String(100 - Number(changeValue));
                                if (Number(changeValue) > 100) {
                                  setTreasury('0');
                                  return;
                                }
                                setTreasury(changeValue);
                                setIncinerator(diffValue);
                              }}
                            />
                            %
                          </span>
                          :
                          <span className={cn('input-outer')}>
                            <Input
                              size="small"
                              disabled={selected !== 4}
                              value={selected !== 4 ? '' : incinerator || ''}
                              onChange={(e) => {
                                const changeValue = e.target.value;
                                const diffValue = String(100 - Number(changeValue));
                                if (Number(e.target.value) > 100) {
                                  setIncinerator('0');
                                  return;
                                }
                                setIncinerator(changeValue);
                                setTreasury(diffValue);
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

export default DaoRatioEdit;
