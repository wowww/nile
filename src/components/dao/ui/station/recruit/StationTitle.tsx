import cn from 'classnames';

import { ReactNode } from 'react';

interface TitleProps {
  title: string;
  desc?: string;
  button?: ReactNode;
}

const StationTitle = ({ title, desc, button }: TitleProps) => {
  return (
    <div className={cn('station-title-wrap')}>
      <div className={cn('title-inner')}>
        <strong className={cn('title')}>{title}</strong>
        {desc && <p className={cn('desc')}>{desc}</p>}
      </div>
    </div>
  );
};

export default StationTitle;
