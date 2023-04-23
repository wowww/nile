import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import OutlineButton from '@/components/button/OutlineButton';
import { useRouter } from 'next/router';
import Tag from '@/components/tag/Tag';

const SnkrzOverviewIntroduction = () => {
  const { locale } = useRouter();

  const { t } = useTranslation('life', { keyPrefix: 'snkrz.overview.introduction' });

  return (
    <section className="introduction">
      <div className="introduction-top">
        <div className="text-wrap">
          <div className="title-wrap">
            <div className="title-wrap-top">
              <strong className="title">{t('head.title')}</strong>
              <OutlineButton buttonText={t('head.button')} color="black" size="sm" href="https://thesnkrz.gitbook.io/en" target="_blank" />
            </div>
            <p className="desc">{t('head.desc')}</p>
          </div>
          <div className="point-wrap">
            <div className="point">
              <Tag bg color="snkrz" size="s">
                {t('point.1.num')}
              </Tag>
              <dl>
                <dt className="title">{t('point.1.title')}</dt>
                <dd className="desc">{t('point.1.desc')}</dd>
              </dl>
            </div>
            <div className="point">
              <Tag bg color="snkrz" size="s">
                {t('point.2.num')}
              </Tag>
              <dl>
                <dt className="title">{t('point.2.title')}</dt>
                <dd className="desc">{t('point.2.desc')}</dd>
              </dl>
            </div>
            <div className="point">
              <Tag bg color="snkrz" size="s">
                {t('point.3.num')}
              </Tag>
              <dl>
                <dt className="title">{t('point.3.title')}</dt>
                <dd className="desc">{t('point.3.desc')}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="img">
          <Image
            src={`/assets/images/img/img_snkerz_overview_intro_${locale === 'ko' ? 'kor' : 'eng'}.png`}
            alt="app running"
            layout="fill"
            objectFit="contain"
            loader={NileCDNLoader}
          />
        </div>
      </div>
      <div className="introduction-bottom">
        <div className="img">
          <Image
            src="/assets/images/img/img_snkerz_overview_tokenomics2.png"
            alt="tokenomic"
            layout="fill"
            objectFit="contain"
            loader={NileCDNLoader}
          />
        </div>
      </div>
    </section>
  );
};

export default SnkrzOverviewIntroduction;
