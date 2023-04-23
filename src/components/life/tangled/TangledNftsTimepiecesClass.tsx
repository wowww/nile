import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { ReactSVG } from 'react-svg';
import { Trans, useTranslation } from 'next-i18next';

import TangledTitle from '@/components/life/tangled/TangledTitle';

const TimeClassCard = ({ img, title, desc, ratio }: { img: string; title: string; desc: string; ratio: number }) => {
  const { t } = useTranslation('life');
  return (
    <div className={cn('time-class-card')}>
      <div className={cn('time-class-card-thumbnail')}>
        <div>
          <Image src={img} alt={title} objectFit="contain" layout="fill" loader={NileCDNLoader} />
        </div>
      </div>
      <div className={cn('time-class-card-info')}>
        <p className={cn('time-class-card-info-title')}>
          <strong>{title}</strong>
        </p>
        <p className={cn('time-class-card-info-desc')}>{desc}</p>
        <span className={cn('time-class-card-info-ratio')}>* {t('tangled.nft.timepiecesClass.cardRatio', { number: ratio })}</span>
      </div>
    </div>
  );
};

const Probability = ({ index }: { index: number }) => {
  const { t } = useTranslation('life');
  const InfoText = () =>
    <span>
      {/* {t('tangled.nft.timepiecesClass.cardProbability')} */}
      <Trans
          i18nKey={'tangled.nft.timepiecesClass.cardProbability'}
          ns="life"
        >
          <span></span>
      </Trans>
    </span>;
  return (
    <>
      <div className={cn('time-class-probability', 'time-class-probability-lg')}>
        <ReactSVG src={`https://nile.blob.core.windows.net/images/assets/images/img/img_tangled_probability_${index}_lg.svg`} />
        <InfoText />
      </div>
      <div className={cn('time-class-probability', 'time-class-probability-md')}>
        <ReactSVG src={`https://nile.blob.core.windows.net/images/assets/images/img/img_tangled_probability_${index}_md.svg`} />
        <InfoText />
      </div>
    </>
  );
};

const TangledTimeClass = () => {
  const { t } = useTranslation('life');
  return (
    <div className={cn('tangled-time-class', 'life-tangled-inner')}>
      <TangledTitle title={t('tangled.nft.timepiecesClass.title')} desc={t('tangled.nft.timepiecesClass.desc')} />
      <ul className={cn('time-class-cards')}>
        <li>
          <TimeClassCard
            img="/assets/images/img/img_tangled_luxury.png"
            title={t('tangled.nft.timepiecesClass.cards.luxury.title')}
            desc={t('tangled.nft.timepiecesClass.cards.luxury.desc')}
            ratio={74}
          />
        </li>
        <li>
          <Probability index={1} />
        </li>
        <li>
          <TimeClassCard
            img="/assets/images/img/img_tangled_highend.png"
            title={t('tangled.nft.timepiecesClass.cards.highEnd.title')}
            desc={t('tangled.nft.timepiecesClass.cards.highEnd.desc')}
            ratio={25}
          />
        </li>
        <li>
          <Probability index={2} />
        </li>
        <li>
          <TimeClassCard
            img="/assets/images/img/img_tangled_zenith.png"
            title={t('tangled.nft.timepiecesClass.cards.zenith.title')}
            desc={t('tangled.nft.timepiecesClass.cards.zenith.desc')}
            ratio={1}
          />
        </li>
      </ul>
      <div className={cn('time-class-info-wrap')}>
        <ul className={cn('time-class-info')}>
          <li>
            <ReactSVG src={`https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg`} />
            <p>{t('tangled.nft.timepiecesClass.classInfo.0')}</p>
          </li>
          <li>
            <ReactSVG src={`https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg`} />
            <p>{t('tangled.nft.timepiecesClass.classInfo.1')}</p>
          </li>
          <li>
            <ReactSVG src={`https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg`} />
            <p>{t('tangled.nft.timepiecesClass.classInfo.2')}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TangledTimeClass;
