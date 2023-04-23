import cn from 'classnames';
import { useTranslation } from 'next-i18next';

export type overViewDataType = {
  title: string;
  info: string;
}[];

const BagcOverview = () => {
  const { t } = useTranslation(['life', 'common']);
  const data: overViewDataType = [
    {
      title: t('bagc.overView.info.1.title'),
      info: t('bagc.overView.info.1.info'),
    },
    {
      title: t('bagc.overView.info.2.title'),
      info: t('bagc.overView.info.2.info'),
    },
    {
      title: t('bagc.overView.info.3.title'),
      info: t('bagc.overView.info.3.info'),
    },
    {
      title: t('bagc.overView.info.4.title'),
      info: t('bagc.overView.info.4.info'),
    },
  ];

  return (
    <div className={cn('bagc-overview-contain-wrap')}>
      <div className={cn('bagc-overview-wrap')}>
        <div className={cn('bagc-overview-box')}>
          <div className={cn('title-wrap')}>
            <strong>BAGC (BORED APE GOLF CLUB)</strong>
            <p>{t('bagc.overView.subTitle')}</p>
          </div>

          <div className={cn('bagc-overview-detail')}>
            {data.map((dt, i) => (
              <dl key={`overview-${i}`}>
                <dt>{dt.title}</dt>
                <dd>{dt.info}</dd>
              </dl>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagcOverview;
