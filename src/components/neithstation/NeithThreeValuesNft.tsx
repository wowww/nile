import NeithContentTitle from '@/components/neithstation/NeithContentTitle';
import { useTranslation } from 'next-i18next';

import cn from 'classnames';

type threeDataType = {
  title: string;
  desc: string;
};

const NeithThreeValuesNft = () => {
  const { t } = useTranslation(['neithStation', 'common']);
  const threeData: threeDataType[] = [
    {
      title: t('home.threeValue.value.1.title'),
      desc: t('home.threeValue.value.1.desc'),
    },
    {
      title: t('home.threeValue.value.2.title'),
      desc: t('home.threeValue.value.2.desc'),
    },
    {
      title: t('home.threeValue.value.3.title'),
      desc: t('home.threeValue.value.3.desc'),
    },
  ];
  return (
    <div className={cn('three-value-nft')}>
      <NeithContentTitle field="Three Values of NFT" title={t('home.threeValue.title')} desc={t('home.threeValue.desc')} />
      <div className={cn('value-card-box')}>
        <ul className={cn('value-card-wrap')}>
          {threeData.map((td, i) => (
            <li key={`${i}-three-value-data`}>
              <strong className={cn('value-list-title')}>{td.title}</strong>
              <p className={cn('value-list-desc')}>{td.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NeithThreeValuesNft;
