import cn from 'classnames';
import SnkrzTitle from '@/components/life/snkrz/SnkrzTitle';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { ReactSVG } from 'react-svg';

const SnkrzTokenomics = () => {
  const { t } = useTranslation(['life', 'common']);
  const systemList = t(`snkrz.tokenomics.tokenSystem.list`, { returnObjects: true });

  return (
    <div className={cn('life-snkrz-inner tokenomics')}>
      <section className={cn('section')}>
        <SnkrzTitle title={'Introducing SNKR2 TOKENOMICS'} />
        <div className={cn('youtube-video')}>
          <iframe
            className={cn('video-control')}
            width="100%"
            height="100%"
            src={'https://www.youtube.com/embed/NYy4gGnfm_E?rel=0'}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <section className={cn('bg-section')}>
        <div className={cn('bg-section-inner')}>
          <SnkrzTitle title={t('snkrz.tokenomics.tokenSystem.title')} />
          <ol className={cn('token-system-list')}>
            {Object.keys(systemList).map((list, index) => {
              return (
                <li key={`system-list-${index}`} data-count={index + 1}>
                  <div className={cn('inner')}>
                    <div className={cn('text-content')}>
                      <strong>{t(`snkrz.tokenomics.tokenSystem.list.${index}.title`)}</strong>
                      {!(index === 2) && <div className={cn('desc')}>{t(`snkrz.tokenomics.tokenSystem.list.${index}.desc`)}</div>}
                    </div>
                    <div className={cn('img')}>
                      <Image
                        src={`/assets/images/img/img_life_snkrz_token_system_0${index + 1}.png`}
                        layout="fill"
                        objectFit="cover"
                        loader={NileCDNLoader}
                        alt=""
                      />
                    </div>
                  </div>
                  {!(index === 5) && (
                    <span className={cn('line-arrow')}>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_line.svg" />
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
};

export default SnkrzTokenomics;
