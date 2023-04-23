import cn from 'classnames';
import Image from 'next/image';
import OutlineButton from '@/components/button/OutlineButton';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';
import FaqAccordion from '@/components/faq/FaqAccordion';

const LifeNileOverView = () => {
  const router = useRouter();
  const { t } = useTranslation(['life', 'common']);

  const faqData = [
    {
      question: t('nile.overview.FAQ.q1.title'),
      answer: t('nile.overview.FAQ.q1.desc'),
    },
    {
      question: t('nile.overview.FAQ.q2.title'),
      answer: t('nile.overview.FAQ.q2.desc'),
    },
    {
      question: t('nile.overview.FAQ.q3.title'),
      answer: t('nile.overview.FAQ.q3.desc'),
    },
    {
      question: t('nile.overview.FAQ.q4.title'),
      answer: t('nile.overview.FAQ.q4.desc'),
    },
  ];

  return (
    <div className={cn('life-overview-wrap')}>
      <div className={cn('life-overview-web3')}>
        <h3 className={cn('web3-title')}>
          <div className="icon-area">
            <Image src="/assets/images/img/ico_life_web3_key.png" alt="" layout="fill" objectFit="contain" loader={NileCDNLoader} />
          </div>
          {t('nile.overview.key.title')}
        </h3>
        <strong className={cn('web3-sub-title')}>{t('nile.overview.key.subtitle')}</strong>
        <p className={cn('life-overview-desc')}>{t('nile.overview.key.desc')}</p>
      </div>
      <div className={cn('life-overview-content')}>
        <div className={cn('life-overview-creators')}>
          <div className={cn('creators-text-area')}>
            <strong className="creators-sub-title">{t('nile.overview.cont1.subtitle')}</strong>
            <h3 className={cn('creators-title')}>{t('nile.overview.cont1.title')}</h3>
            <p className={cn('life-overview-desc')}>{t('nile.overview.cont1.desc')}</p>
          </div>
          <div className={cn('creators-img-area')}>
            <Image src={`/images/img_life_overview_creator.svg`} width={418} height={252} alt="" loader={NileCDNLoader} />
          </div>
        </div>
        <div className={cn('life-overview-community')}>
          <div className={cn('community-img-area')}>
            <Image src={`/images/img_life_overview_community.svg`} width={444} height={324} alt="" loader={NileCDNLoader} />
          </div>
          <div className={cn('community-text-area')}>
            <strong className="community-sub-title">{t('nile.overview.cont2.subtitle')}</strong>
            <h3 className={cn('community-title')}>{t('nile.overview.cont2.title')} </h3>
            <p className={cn('life-overview-desc')}>{t('nile.overview.cont2.desc')}</p>
          </div>
        </div>
      </div>
      <div className={cn('life-overview-space')}>
        {/* 22.11.24 수정 start: 영상대신 이미지 교체로 마크업 수정 */}
        <div className={cn('bg-star-wrap')}></div>
        {/* 22.11.24 수정 end: 영상대신 이미지 교체로 마크업 수정 */}
        <div className={cn('overview-space-text')}>
          <strong className={cn('overview-space-desc')}>{t('nile.overview.space.desc')}</strong>
          <OutlineButton buttonText={t('nile.overview.space.btn')} color="white" size="md" onClick={() => router.push('/nile/story')} />
        </div>
        <Image src="/assets/images/img/bg_life_who_next.png" alt="" layout="fill" objectFit="cover" loader={NileCDNLoader} />
      </div>
      <div className={cn('life-overview-faq')}>
        <div className={cn('overview-faq-wrap')}>
          <h3 className={cn('overview-faq-title')}>{t('nile.overview.FAQ.title')}</h3>
          <FaqAccordion data={faqData} />
        </div>
      </div>
    </div>
  );
};
export default LifeNileOverView;
