import cn from 'classnames';

interface Prop {
  field: string;
  title: string;
  desc?: string;
}

const NeithContentTitle = ({ field, title, desc }: Prop) => {
  return (
    <div className={cn('neith-title-wrap')}>
      <strong className={cn('field')}>{field}</strong>
      <h2 className={cn('title')}>{title}</h2>
      {desc && <p className={cn('desc')}>{desc}</p>}
    </div>
  );
};

export default NeithContentTitle;
