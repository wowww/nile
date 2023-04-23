import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { NewsFeedData, NewsFeedDetail } from '../../../pages';
import { useCallback, useMemo } from 'react';
import dayjs from "dayjs";

interface Props {
  newsData?: NewsFeedData[];
}

const NileNews = ({ newsData }: Props): JSX.Element => {
  const { t } = useTranslation(['nile']);
  const { i18n } = useTranslation('ko');

  const getDetail = useCallback(
    (details?: NewsFeedDetail[]) => {
      return details?.find((item) => item.language === i18n.language);
    },
    [newsData, i18n],
  );

  const dateFormatter = useCallback((date: string) => {
    return dayjs(date).format('YYYY-MM-DD');
  }, []);

  return (
    <div className={cn('nile-news-area')}>
      <div className={cn('nile-news-wrap')}>
        {newsData?.map((item: NewsFeedData, index: number) => {
          return (
            <div className={cn('nile-news-item')} key={index}>
              <a href={item?.link ?? ''} className={cn('news-item-link')} target="_blank" rel="noopener noreferrer">
                <div className={cn('nile-news-banner')}>
                  {item?.thumbnail && <Image src={item.thumbnail} alt="" layout="fill" loader={NileCDNLoader} objectFit="cover" />}
                </div>
                <div className={cn('nile-news-info')}>
                  <>
                    <strong className={cn('news-info-title')}>{getDetail(item?.details)?.title}</strong>
                    <p className={cn('news-info-cont')}>{getDetail(item?.details)?.description}</p>
                  </>
                  {item?.publishedAt && <span className={cn('news-info-date')}>{dateFormatter(item?.publishedAt)}</span>}
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NileNews;
