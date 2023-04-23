import cn from 'classnames';

const LifeKariTitle = ({
  smallTitle = undefined,
  largeTitle,
  align = 'left',
}: {
  smallTitle?: string;
  largeTitle: string;
  align: 'left' | 'center';
}) => {
  return (
    <h3 className={cn('kari-title-wrap', `align-${align}`)}>
      {smallTitle !== undefined && <span className={cn('section-division-title')}>{smallTitle}</span>}
      <span className={cn('title')}>{largeTitle}</span>
    </h3>
  );
};

export { LifeKariTitle };
