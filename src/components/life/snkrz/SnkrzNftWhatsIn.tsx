import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import SnkrzTitle from '@components/life/snkrz/SnkrzTitle';
import BgButton from '@components/button/BgButton';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { message } from 'antd';

const SnkrzNftWhatsIn = () => {
  const { t } = useTranslation(['life', 'common']);

  return (
    <div className={cn('nft-whats-in-wrap')}>
      <SnkrzTitle title={t('snkrz.nft.whatsIn.title')} />
      <div className={'nft-whats-in-banner'}>
        <div className={cn('inner')}>
          <div className={cn('nft-whats-in-banner-content')}>
            <p className={'nft-whats-in-banner-desc'}>{t('snkrz.nft.whatsIn.desc')}</p>
            <BgButton buttonText={t('common:goToCollection')} color={'white'} size={'lg'}
                      href={'/marketplace/SNKRZ'}
              // onClick={() => message.info({ content: t('comingSoon1'), key: 'toast' })}
            />
          </div>
        </div>
        <div className={cn('img-wrap')}>
          <Image src='/assets/images/img/img_starterpack.png' alt='' layout='fill' quality='100' loading='eager'
                 loader={NileCDNLoader} />
        </div>
      </div>
    </div>
  );
};

export default SnkrzNftWhatsIn;
