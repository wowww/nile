import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';

interface Props {
  data: {
    profileImg: string;
    name: string;
    career: string[];
  };
  borderImg?: boolean;
}

const ColumnistInfo: React.FC<Props> = ({ data, borderImg }) => {
  return (
    <div className={cn('columnist-info-wrap')}>
      <div className={cn('profile-img-wrap', borderImg && 'border')}>
        <Image src={data.profileImg} layout="fill" loader={NileCDNLoader} alt="" />
      </div>
      <dl className={cn('name-wrap')}>
        <dt>Columnist</dt>
        <dd>{data.name}</dd>
      </dl>
      <ul className={cn('career-wrap')}>
        {data.career.map((el, index) => (
          <li key={el + index}>{el}</li>
        ))}
      </ul>
    </div>
  );
};

export default ColumnistInfo;
