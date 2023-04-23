import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';

import BgButton from '@components/button/BgButton';

const NileDocsBanner = () => {
  const { t, i18n } = useTranslation(['nile', 'common']);

  return (
    <div className={cn('nile-content nile-docs-banner')}>
      <div className={cn('title-wrap')}>
        <h2 className={cn('title')}>
          NFT is
          <br />
          Life Evolution
        </h2>
        <p className={cn('desc')}>{t('home.docsBanner.desc')}</p>
      </div>
      <div className={cn('btn-wrap')}>
        <BgButton
          buttonText={t('home.docsBanner.btn')}
          color="black"
          size="md"
          href={`https://docs.wemix.com/v/nile-${i18n.language === 'ko' ? 'ko' : 'en'}/`}
          target="_blank"
        />
      </div>
      <div className={cn('img-wrap')}>
        <Image src={'/assets/images/img/img_nile_docs.png'} alt="" layout="fill" loader={NileCDNLoader} />
      </div>
    </div>
  );
};

export default NileDocsBanner;
