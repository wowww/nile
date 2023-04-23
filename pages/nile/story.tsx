import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import ContentTitle from '@/components/marketplace/ContentTitle';
import NileStoryCard from '@/components/cards/NileStoryCard';
import { NileApiService } from '@/services/nile/api';
import { useEffect, useState } from 'react';

export interface StoryData {
  id: number;
  image?: string;
  videoUrl?: string;
  tags?: string[];
  title?: string;
  content?: string;
  link?: string;
  date?: string;
  work?: string;
  info?: string;
  columnist?: string;
  creator?: string;
}

const Story = () => {
  const { t } = useTranslation('nile');
  const api = NileApiService();

  const [stories, setStories] = useState<StoryData[]>();

  useEffect(() => {
    api.home.story
      .getList()
      .then((data) => setStories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Helmet>
        <title>Nile's Story &gt; NILE</title>
      </Helmet>
      <div className={cn('nile-story-wrap')}>
        <ContentTitle title={t('home.story.title')} titleSize="md" serif desc={t('home.story.notice')} />
        <div className={cn('article-count')}>
          {stories?.length} {t('home.story.unit')}
        </div>
        <div className={cn('story-card-wrap', 'column')}>
          {stories?.map((item) => (
            <NileStoryCard
              image={item.image}
              videoUrl={item.videoUrl}
              tags={item.tags}
              title={item.title}
              content={item.content}
              link={item.link}
              date={item.date}
              work={item.work}
              info={item.info}
              key={`${item.title}-${item.id}`}
              columnist={item.columnist}
              creator={item.creator}
            />
          ))}
        </div>
        <div className={cn('coming-soon-announce')}>
          <strong>What’s Next?</strong>
          <span> {t('home.story.next')}</span>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'nile'])),
    },
  };
};

export default Story;
