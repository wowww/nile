import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import BgButton from '@/components/button/BgButton';
import cn from 'classnames';
import AgendaTable from './AgendaTable';
import { useTranslation } from 'next-i18next';
import { title } from 'process';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';
import { Form, Input } from 'antd';

export interface AgendaModalType {
  onConfirm: Function;
}

type VoteType = {
  type: 'vote' | 'approve';
  setValue: Dispatch<SetStateAction<string>>;
};

const RadioMenu = ({ type, setValue }: VoteType) => {
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const [selected, setSelected] = useState<string | null>(null);
  const handleChangeRadio = (e: RadioChangeEvent) => {
    setSelected(e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className={cn('radio-wrap')}>
      <Radio.Group
        name={`trust-check-${type}`}
        onChange={(e) => {
          handleChangeRadio(e);
        }}
        value={selected}
      >
        <Radio checked={false} value={'-'}>
          {t('agenda.tab7.label1')}
        </Radio>
        <Radio checked={false} value={(type === 'vote' && '1') || (type === 'approve' && '50%')}>
          {type === 'vote' && t('agenda.tab7.label3', { day: 1 })}
          {type === 'approve' && t('agenda.tab7.label2', { percent: 50 })}
        </Radio>
        <Radio checked={false} value={(type === 'vote' && '3') || (type === 'approve' && '60%')}>
          {type === 'vote' && t('agenda.tab7.label3', { day: 3 })}
          {type === 'approve' && t('agenda.tab7.label2', { percent: 60 })}
        </Radio>
        <Radio checked={false} value={(type === 'vote' && '5') || (type === 'approve' && '70%')}>
          {type === 'vote' && t('agenda.tab7.label3', { day: 5 })}
          {type === 'approve' && t('agenda.tab7.label2', { percent: 70 })}
        </Radio>
        <Radio checked={false} value={(type === 'vote' && '0') || (type === 'approve' && '0')}>
          {type === 'vote' && (
            <>
              {t('agenda.tab7.label4')} <Input placeholder={t('agenda.tab7.placeholder1')} disabled={selected === '0' ? false : true} size="small" />
              {t('agenda.tab7.label3', { day: null })}
            </>
          )}
          {type === 'approve' && (
            <>
              {t('agenda.tab7.label5')} <Input placeholder={t('agenda.tab7.placeholder2')} disabled={selected === '0' ? false : true} size="small" />%
            </>
          )}
        </Radio>
      </Radio.Group>
    </div>
  );
};

const TrustCheckSetting: React.FC<AgendaModalType> = ({ onConfirm }: AgendaModalType) => {
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const [form] = Form.useForm();

  const [voteValue, setVoteValue] = useState<string>('');
  const [approveValue, setApproveValue] = useState<string>('');

  const amountValidator = useCallback((_: any, value: string) => {
    // Error Case1 : 1이상 30이하의 숫자 입력 필요
    // if (Number(value) < 1 || Number(value) > 30) {
    return Promise.reject(new Error(t('agenda.tab1.error1')));
    // }
    // Error Case2 : 50 이상의 숫자 입력 필요
    if (Number(value) < 50) {
      return Promise.reject(new Error(t('agenda.tab1.error2')));
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
        <p className={cn('agenda-desc')}>{t('agenda.tab7.desc')}</p>
        <Form name="trust-check-setting" layout="vertical" onFinish={onFinish} size="middle" form={form}>
          <AgendaTable
            className={'trust-check-table'}
            titleFull={t('agenda.tab7.th1')}
            titleColumn={[
              { title: ' ', node: [t('agenda.tab7.td1'), t('agenda.tab7.td2')], rowspan: true },
              {
                node: [t('agenda.tab7.label3', { day: 1 }), <div>{voteValue == '-' ? '-' : t('agenda.tab7.label3', { day: voteValue })}</div>],
              },
            ]}
            children={
              <Form.Item
                className="error-case1"
                name={'trust-check-field1'}
                required
                rules={[
                  {
                    validator: amountValidator,
                  },
                ]}
              >
                <RadioMenu type={'vote'} setValue={setVoteValue} />
              </Form.Item>
            }
          />
          <AgendaTable
            className={'trust-check-table'}
            titleFull={t('agenda.tab7.th2')}
            titleColumn={[
              { title: ' ', node: [t('agenda.tab7.td1'), t('agenda.tab7.td2')], rowspan: true },
              { node: [t('agenda.tab7.label2', { percent: 50 }), <div>{!approveValue ? '-' : approveValue}</div>] },
            ]}
            children={
              <Form.Item
                className="error-case2"
                name={'trust-check-field2'}
                required
                rules={[
                  {
                    validator: amountValidator,
                  },
                ]}
              >
                <RadioMenu type={'approve'} setValue={setApproveValue} />
              </Form.Item>
            }
          />
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

export default TrustCheckSetting;
