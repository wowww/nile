import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import NeithContentTitle from './NeithContentTitle';
import { NileCDNLoader } from '@/utils/image/loader';

const Content = ({ img, title, description }: { img: string; title: string; description: string }) => {
  return (
    <li>
      <div className={cn('img')}>
        <Image src={img} alt={title} layout="fill" objectFit="contain" loader={NileCDNLoader} />
      </div>
      <div className={cn('title-description-wrap')}>
        <p className={cn('title')}>
          <strong>{title}</strong>
        </p>
        <p className={cn('description')}>{description}</p>
      </div>
    </li>
  );
};

const NeithGreatChallenge = () => {
  const { t } = useTranslation(['neithStation']);
  return (
    <>
      <NeithContentTitle field="The Great Challenge" title={t('home.challenge.title')} desc={t('home.challenge.desc')} />
      <div className={cn('great-challenge')}>
        <ul>
          <Content
            img="/assets/images/img/img_neith_covenant.png"
            title={t('greatChallenge.covenant.title')}
            description={t('greatChallenge.covenant.description')}
          />
          <Content
            img="/assets/images/img/img_neith_protocol.png"
            title={t('greatChallenge.protocol.title')}
            description={t('greatChallenge.protocol.description')}
          />
          <Content
            img="/assets/images/img/img_neith_vault.png"
            title={t('greatChallenge.vault.title')}
            description={t('greatChallenge.vault.description')}
          />
        </ul>
      </div>
    </>
  );
};
export default NeithGreatChallenge;
