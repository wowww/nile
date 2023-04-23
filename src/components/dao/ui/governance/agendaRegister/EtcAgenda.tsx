import React, { useState, useCallback } from 'react';
import BgButton from '@/components/button/BgButton';
import cn from 'classnames';
import AgendaTable from './AgendaTable';
import { useTranslation } from 'next-i18next';
import { Form } from 'antd';

export interface AgendaModalType {
  onConfirm: Function;
}

const EtcAgenda: React.FC<AgendaModalType> = ({ onConfirm }: AgendaModalType) => {
  const [text, setText] = useState<string>('');
  const [form] = Form.useForm();
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });

  const onFinish = (values: any) => {
    confirmForm();
  };

  const confirmForm = () => {};

  return (
    <div className={cn('agenda-cont-wrap')}>
      <div className={cn('agenda-modal-body')}>
        <p className={cn('agenda-desc')}>{t('agenda.tab8.desc')}</p>
        <Form name="etc-agenda" layout="vertical" onFinish={onFinish} size="middle" form={form}>
          <AgendaTable
            titleColumn={[{ title: t('agenda.tab8.th1') }]}
            children={
              <Form.Item name={'etc-field1'} required>
                <div className={cn('etc-box-wrap')}>
                  <textarea
                    className={cn('text-box')}
                    maxLength={512}
                    placeholder={t('agenda.tab8.placeholder1')}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  />
                  {/* 23.03.27 수정: textarea 관련 기획 정의 수정 byte 띄어쓰기 추가 */}
                  <span className={cn('text-length')}>{text.length}/512 byte</span>
                </div>
              </Form.Item>
            }
          />
          <span className={cn('etc-agenda-desc')}>{t('agenda.tab8.desc1')}</span>
        </Form>
      </div>
      <div className={cn('agenda-modal-footer')}>
        <BgButton
          buttonText={t('agenda.confirm')}
          color="highlight"
          size="lg"
          onClick={() => {
            onConfirm();
          }}
        />
      </div>
    </div>
  );
};

export default EtcAgenda;
