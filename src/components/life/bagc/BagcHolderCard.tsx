import { NileCDNLoader } from '@/utils/image/loader';
import cn from 'classnames';
import Image from 'next/image';

type cardDataType = {
  cardData: HolderCardType;
};
export type HolderCardType = {
  title: string;
  desc: string;
  image: string;
};

const BagcHolderCard = ({ cardData }: cardDataType) => {
  return (
    <div className={cn('bagc-holder-card')}>
      <div className={cn('holder-img-wrap')}>
        <Image src={cardData.image} alt={''} layout="fill" quality="100" objectFit="cover" loader={NileCDNLoader} />
      </div>
      <div className={cn('bagc-holder-detail')}>
        <strong>{cardData.title}</strong>
        <p>{cardData.desc}</p>
      </div>
    </div>
  );
};

export default BagcHolderCard;
