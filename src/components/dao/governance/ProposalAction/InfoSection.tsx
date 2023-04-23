import cn from 'classnames';

interface Props {
  title: string;
  children: JSX.Element;
}

const InfoSection = ({ title, children }: Props) => {
  return (
    <div className={cn('proposal-action-info-section')}>
      <strong className={cn('info-section-title')}>{title}</strong>
      <div className={cn('info-section-contents')}>{children}</div>
    </div>
  );
};

export default InfoSection;
