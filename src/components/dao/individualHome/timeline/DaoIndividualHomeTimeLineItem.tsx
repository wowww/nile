import cn from 'classnames';
import Tag from '@components/tag/Tag';
import OutlineButton from '@components/button/OutlineButton';
import { NileDaoTimeline } from '@/types/dao/daohome.types';

interface DaoIndividualHomeTimeLineItemProps {
  item?: NileDaoTimeline;
}

const DaoIndividualHomeTimeLineItem = ({ item }: DaoIndividualHomeTimeLineItemProps) => {
  return (
    <div className={cn('timeline-wrap')}>
      <div className={cn('timeline-tit-wrap')}>
        <strong className={cn('timeline-tit')}>{item?.type}</strong>
        <span className={cn('timeline-date')}>{item?.time}</span>
        {item?.isNew && (
          <Tag size="xs" color="positive">
            NEW
          </Tag>
        )}
      </div>
      <div className={cn('timeline-content')}>
        <p className={cn('timeline-desc')}>{item?.desc}</p>
        {item?.listTypeDesc !== undefined && (
          <ul className={cn('list-type-dot')}>
            {item.listTypeDesc.map((item, index) => {
              return (
                <li key={index}>
                  {item.desc}
                  {item.hasInnerList && (
                    <ul className={cn('list-type-dot')}>
                      {item.innerList?.map((item, index) => {
                        return <li key={index}>{item}</li>;
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {item?.link !== undefined && <OutlineButton buttonText={item.linkText as string} size="sm" color="highlight" />}
      </div>
    </div>
  );
};

export default DaoIndividualHomeTimeLineItem;
