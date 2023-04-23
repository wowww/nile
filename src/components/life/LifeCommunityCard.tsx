import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';

interface obj {
  image: string;
  title: string;
  cont: string;
}

interface Props {
  data: obj[];
}

const LifeCommunityCard = ({ data }: Props) => {
  return (
    <div className={cn('life-community')}>
      {data.map((item, index) => {
        return (
          <div className={cn('life-community-card')} key={index}>
            <div className={cn('community-img-area')}>
              <Image src={item.image} alt="" layout="fill" loader={NileCDNLoader} objectFit="cover" />
            </div>
            <div className={cn('community-text-area')}>
              <strong className={'community-title'}>{item.title}</strong>
              <p className={'community-cont'}>{item.cont}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LifeCommunityCard;
