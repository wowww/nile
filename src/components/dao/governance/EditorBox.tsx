import { ReactNode } from 'react';
import { Input } from 'antd';
import cn from 'classnames';

type inputProps = {
  text: string;
  placeholder: string;
};
type EditorBoxProps = {
  title: inputProps;
  content: inputProps;
  children?: ReactNode;
  maxLength?: number;
};
const EditorBox = ({ title, content, maxLength = 30000, children }: EditorBoxProps) => {
  return (
    <div className={cn('edit-box-wrap')}>
      <div className={cn('edit-header-wrap')}>
        <div className={cn('input-wrap')}>
          <Input size="large" defaultValue={title.text} placeholder={title.placeholder} />
        </div>
      </div>
      <Input.TextArea
        defaultValue={content.text}
        showCount={{
          formatter: (info: { value: string; count: number; maxLength?: number }) =>
            `${info.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} / ${
              info.maxLength !== undefined && info.maxLength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }`,
        }}
        maxLength={maxLength}
        placeholder={content.placeholder}
      />
      {children}
    </div>
  );
};

export default EditorBox;
