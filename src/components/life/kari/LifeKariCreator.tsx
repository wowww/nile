import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import { NileCDNLoader } from '@utils/image/loader';
import Image from 'next/image';
import { LifeKariTitle } from '@/components/life/kari/LifeKariTitle';

const LifeKariCreator = () => {
  const { t } = useTranslation('life');
  return (
    <div className={cn('kari-section', 'kari-creator-wrap')}>
      <div className={cn('inner')}>
        <LifeKariTitle largeTitle="Creator" align="left" />
        <div className={cn('text-content')}>
          <div className={cn('creator-info speech-bubble')}>
            <div className={cn('creator-sns text-wrap')}>
              <div className={cn('text')}>
                <div className={cn('creator-img')}>
                  <Image src={`/assets/images/img/img_kari_creator.png`} alt="" layout="fill" loader={NileCDNLoader} />
                </div>
                <div className={cn('sns-wrap')}>
                  <strong>Doonbo</strong>
                  <div className={cn('sns-list')}>
                    <Link href="https://twitter.com/Ari_Project_10k">
                      <a target="_blank">
                        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_twitter.svg" />
                      </a>
                    </Link>
                    <Link href="https://discord.com/invite/cBpSsMzWcB">
                      <a target="_blank">
                        <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_discord.svg" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cn('desc')}>{t('kari.creator.desc')}</div>
        </div>
      </div>
    </div>
  );
};

export { LifeKariCreator };
