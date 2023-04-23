import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';
import TangledTitle from '@/components/life/tangled/TangledTitle';

interface cardProps {
  imgUrl: string;
  cardTitle: string;
  desc: string;
}

const TangledServiceStructure = () => {
  const { t } = useTranslation(['life']);
  const ServiceCard = ({ imgUrl, cardTitle, desc }: cardProps) => {
    return (
      <div className={cn('service-card')}>
        <div className={cn('img-area')}>
          <Image src={imgUrl} alt="" layout="fixed" width={50} height={50} loader={NileCDNLoader} />
        </div>
        <div className={cn('text-area')}>
          <strong>{cardTitle}</strong>
          <span>{desc}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={cn('service-structure-wrap')}>
      <TangledTitle title={t('tangled.overview.serviceStructure.title')} />
      <div className="inner">
        <div className={cn('steps', 'step1')}>
          <em className={cn('step-title')}>Create Time</em>
          <div className={cn('step-contents')}>
            <ServiceCard
              imgUrl={'/assets/images/img/img_tangled_structure1.png'}
              cardTitle="Random Live Chatting"
              desc={t('tangled.overview.serviceStructure.card.desc1')}
            />
            <ServiceCard
              imgUrl={'/assets/images/img/img_tangled_structure2.png'}
              cardTitle="Profile Rating"
              desc={t('tangled.overview.serviceStructure.card.desc2')}
            />
            <ServiceCard
              imgUrl={'/assets/images/img/img_tangled_structure3.png'}
              cardTitle="Give Feedback"
              desc={t('tangled.overview.serviceStructure.card.desc3')}
            />
          </div>
        </div>
        <div className={cn('milestone', 'earn')}>
          <span className={cn('text')}>{t('tangled.overview.serviceStructure.earn')}</span>
          <span className={cn('direction-img')}>
            <Image src={'/assets/images/img/img_tangled_arrow_p.png'} layout="fill" objectFit="contain" loader={NileCDNLoader} alt="" />
          </span>
        </div>
        <div className={cn('steps', 'step2')}>
          <em className={cn('step-title')}>Get Time</em>
          <div className={cn('step-contents')}>
            <div className={cn('time-point')}>
              <div className={cn('timepoints')}>
                <Image src={'/assets/images/img/timepoint1.png'} layout="fill" objectFit="contain" loader={NileCDNLoader} alt="" />
              </div>
              <div className="img-area">
                <Image src={'/assets/images/img/img_tangled_structure_watch.png'} layout="fill" objectFit="contain" loader={NileCDNLoader} alt="" />
              </div>
              <div className="text-area">
                <strong>TIME point</strong>
                <span>{t('tangled.overview.serviceStructure.timePoint')}</span>
              </div>
            </div>
            <div className={cn('arrows')}>
              <span className={cn('arrow-up')}>
                <Image src={'/assets/images/img/img_tangled_arrow_p.png'} layout="fill" objectFit="contain" loader={NileCDNLoader} alt="" />
              </span>
              <span className={cn('arrow-down')}>
                <Image src={'/assets/images/img/img_tangled_arrow_w.png'} layout="fill" objectFit="contain" loader={NileCDNLoader} alt="" />
              </span>
            </div>
            <ServiceCard
              imgUrl={'/assets/images/img/img_tangled_structure4.png'}
              cardTitle="TIPO"
              desc={t('tangled.overview.serviceStructure.card.desc4')}
            />
            <div className={cn('arrows')}>
              <span className={cn('arrow-up')}>
                <Image src={'/assets/images/img/img_tangled_arrow_p.png'} layout="fill" objectFit="contain" loader={NileCDNLoader} alt="" />
              </span>
              <span className={cn('arrow-down')}>
                <Image src={'/assets/images/img/img_tangled_arrow_w.png'} layout="fill" objectFit="contain" loader={NileCDNLoader} alt="" />
              </span>
            </div>
            <ServiceCard
              imgUrl={'/assets/images/img/img_tangled_structure5.png'}
              cardTitle="WEMIX$"
              desc={t('tangled.overview.serviceStructure.card.desc5')}
            />
          </div>
        </div>
        <div className={cn('milestone', 'consumption')}>
          <span className={cn('text')}>{t('tangled.overview.serviceStructure.consumption')}</span>
          <span className={cn('direction-img')}>
            <Image src={'/assets/images/img/img_tangled_arrow_w.png'} layout="fill" objectFit="contain" loader={NileCDNLoader} alt="" />
          </span>
        </div>
        <div className={cn('steps', 'step3')}>
          <em className={cn('step-title')}>Time Transaction</em>
          <div className={cn('step-contents')}>
            <ServiceCard
              imgUrl={'/assets/images/img/img_tangled_structure6.png'}
              cardTitle="Tangled Show"
              desc={t('tangled.overview.serviceStructure.card.desc6')}
            />
            <ServiceCard
              imgUrl={'/assets/images/img/img_tangled_structure7.png'}
              cardTitle="Gift"
              desc={t('tangled.overview.serviceStructure.card.desc7')}
            />
            <ServiceCard
              imgUrl={'/assets/images/img/img_tangled_structure8.png'}
              cardTitle="Make a Paid Call"
              desc={t('tangled.overview.serviceStructure.card.desc8')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TangledServiceStructure;
