import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';
import Image from 'next/image';
import { LifeKariTitle } from '@/components/life/kari/LifeKariTitle';

const imgNum = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

const LifeKariUniverse = () => {
  const { t } = useTranslation('life');
  const speechBubbleList = t('kari.universe.speechBubble', { returnObjects: true });
  return (
    <div className={cn('kari-section', 'kari-universe-wrap')}>
      <LifeKariTitle smallTitle="Universe" largeTitle="Story of Ari & Kari" align="center" />
      <div className={cn('universe-image-wrap')}>
        <div className={cn('speech-bubble-wrap')}>
          {Object.keys(speechBubbleList).map((list, index) => (
            <p key={`altar-list-${index}`} className={cn('speech-bubble')}>
              <span className={cn('text-wrap')}>
                <span className={cn('text')}>{t(`kari.universe.speechBubble.${index}`)}</span>
              </span>
            </p>
          ))}
        </div>
        <div className={cn('img')}>
          <Image src={`/assets/images/img/img_kari_universe_visual.gif`} layout="fill" alt="" loader={NileCDNLoader} />
        </div>
        <div className={cn('universe-desc')}>{t('kari.universe.desc')}</div>
      </div>
      <div className={cn('image-list')}>
        <div className={cn('list-inner')}>
          {imgNum.map((num, index) => (
            <div className={cn('img-wrap')} key={`kari-img-${num}`}>
              <Image src={`/assets/images/img/img_kari_0${num}.png`} layout="fill" alt="" loader={NileCDNLoader} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { LifeKariUniverse };
