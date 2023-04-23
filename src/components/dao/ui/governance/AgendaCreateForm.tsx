import { ReactElement } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { Form, Input } from 'antd';

interface Props {}

const AgendaCreateForm = ({}: Props): ReactElement => {
  const { t } = useTranslation(['dao']);

  return (
    <div className={cn('agenda-create-form-wrap')}>
      <Form>
        <Form.Item>
          <Input.TextArea placeholder={t('governance.createProposal.titlePlaceholder')} className={cn('input-title')} />
        </Form.Item>
        <Form.Item>
          {/* 23.03.27 수정: textarea 관련 기획 정의 수정 byte 추가 */}
          <Input.TextArea
            showCount={{
              formatter: (info: { value: string; count: number; maxLength?: number }) =>
                `${info.count.toLocaleString().padStart(1, '0')}/${info.maxLength} byte`,
            }}
            maxLength={30000}
            placeholder={t('governance.createProposal.contentPlaceholder')}
            className={cn('input-detail')}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AgendaCreateForm;
