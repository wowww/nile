import { ReactElement } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { Form, Input } from 'antd';

interface Props {
  contentsPlaceholder: string;
  contentsLimit?: number;
  titleLimit?: number; // 제목 글자 수 제한
  className?: string | string[];
}

const ArticleCreateForm = ({ contentsPlaceholder, contentsLimit = 30000, titleLimit, className }: Props): ReactElement => {
  const { t } = useTranslation(['dao']);

  return (
    <div className={cn('article-create-form-wrap', className)}>
      <Form>
        <Form.Item>
          <Input.TextArea placeholder={t('governance.createProposal.titlePlaceholder')} className={cn('input-title')} />
        </Form.Item>
        <Form.Item>
          <Input.TextArea
            showCount={{
              formatter: (info: { value: string; count: number; maxLength?: number }) =>
                `${info.count.toLocaleString()}/${info.maxLength} byte`,
            }}
            maxLength={contentsLimit}
            placeholder={contentsPlaceholder}
            className={cn('input-detail')}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ArticleCreateForm;
