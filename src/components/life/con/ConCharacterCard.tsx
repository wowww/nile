import Image from 'next/image';
import Tag from '@/components/tag/Tag';
import cn from 'classnames';
import { NileCDNLoader } from '@/utils/image/loader';
import { God } from './conStore';

/* 23.04.04 수정: cardContentDataType interface 삭제 */

interface cardDataType {
  cardType: 'god' | 'pharaoh';
  /* 23.04.04 수정: cardData 타입 수정 */
  cardData: God;
}

const ConCharacterCard = ({ cardType, cardData }: cardDataType) => {
  return (
    <>
      <div className={cn('life-con-card-wrap', cardType)}>
        <div className={cn('con-image-area')}>
          {/* 23.04.04 수정: string 단언 추가 */}
          <Image src={cardData.image as string} alt={cardData.name} loading="lazy" layout="fill" objectFit="contain" loader={NileCDNLoader} />
        </div>
        <div className={cn('con-detail-wrap')}>
          <span className={cn('character-grade')}>{cardData.grade}</span>
          <strong className={cn('character-name')}>{cardData.name}</strong>
          <dl className={cn('detail-info')}>
            <div className={cn('info-date')}>
              <dt className={cn('info-title')}>Covenant Date</dt>
              <dd className={cn('info-value')}>{cardData.date}</dd>
            </div>
            <div className={cn('info-covenant')}>
              <dt className={cn('info-title')}>NEITH Covenant</dt>
              <dd className={cn('info-value')}>
                {Number(cardData.value)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                <span className={cn('unit')}>WEMIX</span>
              </dd>
            </div>
          </dl>
        </div>
        <div className={cn('con-detail-bottom-wrap')}>
          <div className={cn('tag-wrap')}>
            {cardData.tagGroup.map((tag, i) => (
              <Tag size={'sm'} border={cardType === 'pharaoh' && 'white-gray'} type={cardType === 'god' && 'neith'} key={`${tag}-${i}`}>
                {tag}
              </Tag>
            ))}
          </div>
          {cardData.desc && <p className={cn('con-desc')}>{cardData.desc}</p>}
        </div>
      </div>
    </>
  );
};

export default ConCharacterCard;
