import cn from 'classnames';
import { useTranslation, Trans } from 'next-i18next';

interface ComponentProps {
  joinAmount?: number;
}

const BottomInfo = ({ joinAmount }: ComponentProps) => {
  const { t } = useTranslation('daoHome');

  if (joinAmount) {
    return (
      <ul className={cn('user-join-info')}>
        <li>
          {t('check.about.after.info1')} : <span className={cn('figure')}>{joinAmount.toLocaleString()} WEMIX</span>
        </li>
        <li>
          {t('check.about.after.info1')} : <span className={cn('figure')}>12.14%</span>
        </li>
      </ul>
    );
  } else {
    return <p className={cn('desc')}>{t('check.about.before.desc')}</p>;
  }
};

export default BottomInfo;
