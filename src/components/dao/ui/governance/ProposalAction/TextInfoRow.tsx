import cn from 'classnames';

interface Props {
  subject: string;
  contents: string;
  desc?: string;
}

const TextInfoRow = ({ subject, contents, desc }: Props) => {
  return (
    <div className={cn('text-info-row')}>
      <div className={cn('subject-area')}>
        <strong className={cn('subject')}>{subject}</strong>
        {desc && <span className={cn('subject-desc')}>{desc}</span>}
      </div>
      <span className={cn('info-contents')}>{contents}</span>
    </div>
  );
};

export default TextInfoRow;
