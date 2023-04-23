import { useEffect, useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { useTranslation } from 'next-i18next';

interface Props {
  name: string;
  src: string;
}

export type cardDataType = {
  name: string;
  src: string;
};

const ConCivicCard = ({ name, src }: Props) => {
  const { t } = useTranslation('life');

  return (
    <div className={cn('con-civic-card')}>
      <div className={cn('image-area')}>
        <Image src={src} alt={name} layout="fill" loading="lazy" objectFit="contain" loader={NileCDNLoader} />
      </div>
      <p className={cn('character-info')}>
        {name}
        <span className={cn('character-grade')}>Civic</span>
      </p>
    </div>
  );
};

export default ConCivicCard;
