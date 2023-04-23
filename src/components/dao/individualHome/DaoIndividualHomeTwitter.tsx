import cn from 'classnames';
import { Avatar } from 'antd';

interface DaoIndividualHomeTwitterType {
  data: DaoIndividualHomeTwitterData;

}
export interface DaoIndividualHomeTwitterData {
  link: string;
  author: string;
  authorImg: string;
  desc: string;
  tags: string[];
}

const DaoIndividualHomeTwitter = ({ data }: DaoIndividualHomeTwitterType) => {
  return (
    <a href={data.link} target="_blank" rel="noopener noreferrer" className={cn('dao-twitter-wrap')}>
      <div className={cn('twitter-container')}>
        <p>{data.desc}</p>
        <div className={cn('twitter-tag')}>
          {data.tags.map((tag: string, index: number) => (
            <span key={`tag-list-${index}`}>#{tag}</span>
          ))}
        </div>
      </div>
      <div className={cn('twitter-author')}>
        <Avatar size={28} style={{backgroundImage: `url(${data.authorImg})`}}/>
        <span>{data.author}</span>
      </div>
    </a>
  );
};

export default DaoIndividualHomeTwitter;
