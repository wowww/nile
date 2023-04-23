import cn from 'classnames';
import { ReactNode } from 'react';
import TextButton from '@/components/button/TextButton';

interface DaoBoxLayoutType {
  children: ReactNode;
  className?: string;
  type?: 'full' | 'ratio';
}

interface DaoBoxType {
  children: ReactNode;
  className?: string;
}

interface DaoTitleType {
  children?: ReactNode;
  title: string | ReactNode;
  className?: string;
}

export const DaoCreateLayout = ({ children, className, type = 'full' }: DaoBoxLayoutType) => {
  return <div className={cn('dao-create-wrap', className, type)}>{children}</div>;
};

export const DaoCreateBox = ({ children, className }: DaoBoxType) => {
  return <div className={cn('dao-create-box', className)}>{children}</div>;
};

export const DaoCreateBoxInner = ({ children, className }: DaoBoxType) => {
  return <div className={cn('dao-box-inner', className)}>{children}</div>;
};

export const DaoCreateTitle = ({ children, title, className }: DaoTitleType) => {
  return (
    <div className={cn('dao-create-title', className)}>
      <div className={cn('title-wrap')}>
        <h2 className={cn('title')}>{title}</h2>
      </div>
      {children}
    </div>
  );
};
