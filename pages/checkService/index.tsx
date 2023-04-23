import cn from 'classnames';
import Image from 'next/image';
import OutlineButton from '@/components/button/OutlineButton';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';

export const NileInspection = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <div className={cn('page-not-found-wrap inspection')}>
      <div className={cn('page-not-found')}>
        <div className={cn('image-wrap')}>
          <Image src='/assets/images/img/img_inspection.png' alt="page not found image" layout="fill" objectFit="contain" loader={NileCDNLoader} />
        </div>
        <section>
          <h2>{t('Inspection.title')}</h2>
          <p>{t('Inspection.desc')}yyyy-mm-dd hh ~ yyyy-mm-dd hh</p>
        </section>
        <OutlineButton buttonText={t('Inspection.btn')} color="black" size="lg" onClick={() => router.push('/')} />
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default NileInspection;
