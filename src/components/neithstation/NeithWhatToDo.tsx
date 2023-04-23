import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import NeithContentTitle from './NeithContentTitle';
import { ReactSVG } from 'react-svg';

const NeithWhatToDo = () => {
  const { t } = useTranslation('neithStation');

  return (
    <div className={cn('what-to-do')}>
      <NeithContentTitle field="What to do" title={t('home.whatToDo.title')} />
      <div className={cn('contents')}>
        <div className={cn('part')}>
          <div className={cn('img-area')}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_neith_station_wtd1.svg" width={140} height={140} />
          </div>
          <strong>{t('home.whatToDo.subTitle1')}</strong>
          <p>{t('home.whatToDo.desc1')}</p>
        </div>
        <div className={cn('part')}>
          <div className={cn('img-area')}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_neith_station_wtd2.svg" width={140} height={140} />
          </div>
          <strong>{t('home.whatToDo.subTitle2')}</strong>
          <p>{t('home.whatToDo.desc2')}</p>
        </div>
      </div>
    </div>
  );
};

export default NeithWhatToDo;
