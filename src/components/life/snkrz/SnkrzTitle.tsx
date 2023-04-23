import { ReactNode } from 'react';

interface Props {
  title: string;
  desc?: string | ReactNode;
}

const SnkrzTitle = ({ title, desc }: Props) => {
  return (
    <div className="snkrz-title">
      <h2>{title}</h2>
      {desc && typeof desc === 'string' ? <p>{desc}</p> : desc}
    </div>
  );
};

export default SnkrzTitle;
