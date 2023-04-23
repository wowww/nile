import React from 'react';
import { useTranslation } from 'next-i18next';

import cn from 'classnames';

import TangledTitle from '@/components/life/tangled/TangledTitle';

interface TangledNftsTimepiecesType {
  key: string;
  val: string | React.ReactNode;
}

const TangledNftsTimepieces: () => JSX.Element = () => {
  const { t } = useTranslation(['life', 'common']);

  const timepiecesItems: TangledNftsTimepiecesType[] = [
    { key: t('tangled.nft.timepieces.items.0.key'), val: t('tangled.nft.timepieces.items.0.val') },
    { key: t('tangled.nft.timepieces.items.1.key'), val: t('tangled.nft.timepieces.items.1.val') },
    { key: t('tangled.nft.timepieces.items.2.key'), val: t('tangled.nft.timepieces.items.2.val') },
  ];

  return (
    <div className={cn('tangled-timepiece', 'life-tangled-inner')}>
      <TangledTitle title={t('tangled.nft.timepieces.title')} desc={t('tangled.nft.timepieces.desc')} />
      <dl className={cn('nfts-timepieces-wrap')}>
        {timepiecesItems.map((v: TangledNftsTimepiecesType) => {
          return (
            <div className={cn('items')} key={`items-${v.key}`}>
              <dt>{v.key}</dt>
              <dd>{v.val}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
};

export default React.memo(TangledNftsTimepieces);
