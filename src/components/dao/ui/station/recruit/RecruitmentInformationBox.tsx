import cn from 'classnames';

export interface BoxProps {
  subject: string;
  contents: string;
  unit?: string;
  subInfo?: string;
}

const RecruitmentInformationBox = ({ subject, contents, unit, subInfo }: BoxProps) => {
  return (
    <li>
      <strong className={cn('subject')}>{subject}</strong>
      <span className={cn('box-contents')}>
        <span className={cn('main-contents')}>{contents}</span> {unit && <span className={cn('unit')}>{unit}</span>}
      </span>
      {subInfo && <span className={cn('sub-info')}>{subInfo}</span>}
    </li>
  );
};

export default RecruitmentInformationBox;
