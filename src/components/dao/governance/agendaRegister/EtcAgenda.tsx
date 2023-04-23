import React from 'react';
import BgButton from '@/components/button/BgButton';
import cn from 'classnames';
import AgendaTable from './AgendaTable';
import { useTranslation } from 'next-i18next';
import { Form } from 'antd';
import { useAtom } from 'jotai';
import { textParamAtom } from '@/state/governanceAtom';

export interface AgendaModalType {
  onConfirm: Function;
}

const EtcAgenda: React.FC<AgendaModalType> = ({ onConfirm }: AgendaModalType) => {
  const [form] = Form.useForm();
  const { t } = useTranslation('dao', { keyPrefix: 'governance' });
  const [param, setParam] = useAtom(textParamAtom);

  const onFinish = (values: any) => {
    onConfirm();
  };

  return (
    <Form name="etc-agenda" layout="vertical" onFinish={onFinish} size="middle" form={form}>
      <div className={cn('agenda-cont-wrap')}>
        <div className={cn('agenda-modal-body')}>
          <p className={cn('agenda-desc')}>{t('agenda.tab8.desc')}</p>
          <AgendaTable
            titleColumn={[{ title: t('agenda.tab8.th1') }]}
            children={
              <Form.Item name={'etc-field1'} required>
                <div className={cn('etc-box-wrap')}>
                  <textarea
                    className={cn('text-box')}
                    maxLength={512}
                    placeholder={t('agenda.tab8.placeholder1')}
                    onChange={(e) => setParam(e.target.value)}
                  />
                  <span className={cn('text-length')}>{param?.length}/512 byte</span>
                </div>
              </Form.Item>
            }
          />
          <span className={cn('etc-agenda-desc')}>{t('agenda.tab8.desc1')}</span>
        </div>
        <div className={cn('agenda-modal-footer')}>
          <BgButton
            buttonText={t('agenda.confirm')}
            color="highlight"
            size="lg"
            htmlType="submit"
          />
        </div>
      </div>
    </Form>
  );
};

export default EtcAgenda;
