import React, { ReactNode } from 'react';
import cn from 'classnames';

interface tagPropsType {
  color?: string;
  children: ReactNode
}

const SquareTag: React.FC<tagPropsType> = ({ children, color }) => {
  return <span className={cn(`square-tag `, color !== undefined && `square-tag-${color}`)}>{children}</span>;
};
export default SquareTag;
