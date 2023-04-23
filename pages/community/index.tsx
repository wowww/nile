import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CommunityHero from '@/components/community/CommunityHero';
import UpcomingChannels from '@/components/community/UpcomingChannels';
import OfficialChannels from '@/components/community/OfficialChannels';
import { StaticImageData } from 'next/image';

type Member = {
  avatar: string;
  name: string;
};

export interface CommunityCardData {
  join: boolean;
  type: {
    name: string;
    status?: boolean;
  };
  thumbnail: string | StaticImageData;
  tags: Array<string>;
  title: string;
  description: string;
  members: Member[];
  latest: {
    value: number;
    format: string;
  };
  marketCap: number;
  token?: string;
}

const Community = () => {
  return (
    <>
      <Helmet>
        <title>Community &gt; NILE</title>
      </Helmet>
      <div className={cn('community-wrap')}>
        <div className={cn('community-banner')}>
          <CommunityHero />
        </div>
        <OfficialChannels />
        <UpcomingChannels />
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['community', 'common'])),
    },
  };
};

export default Community;
