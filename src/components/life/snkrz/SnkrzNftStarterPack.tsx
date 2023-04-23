import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import SnkrzTitle from './SnkrzTitle';
import Chip from '@/components/tag/Chip';

const SnkrzNftStarterPack = () => {
  const { t } = useTranslation(['life', 'common']);

  return (
    <section className={cn('section')}>
      <div className={cn('nft-starter-pack-wrap')}>
        <SnkrzTitle title="SNKR2 Starter Pack NFT" desc={t('snkrz.nft.starterPack.subTitle')} />
        <ul className={cn('card-wrap')}>
          <li className={cn('card')}>
            <Chip size="md" bg>
              {t('snkrz.nft.starterPack.card1.tag')}
            </Chip>
            <div className={cn('discount-wrap')}>
              <span className={cn('value')}>644 WEMIX$</span>
              <span className={cn('discount')}>{t('snkrz.nft.starterPack.card1.discount', { value: 50 })}</span>
            </div>
            <strong className={cn('text-cont')}>330 WEMIX$</strong>
          </li>
          <li className={cn('card')}>
            <Chip size="md" bg>
              {t('snkrz.nft.starterPack.card2.tag')}
            </Chip>
            <strong className={cn('text-cont')}>100 NFTs / Fixed Price</strong>
          </li>
          <li className={cn('card')}>
            <Chip size="md" bg>
              {t('snkrz.nft.starterPack.card3.tag')}
            </Chip>
            <strong className={cn('text-cont')}>2023.04.27</strong>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SnkrzNftStarterPack;
