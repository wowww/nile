import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import NeithContentTitle from '@/components/neithstation/NeithContentTitle';
/* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
import useMediaQuery from '@/hook/useMediaQuery';

const NeithHowTo: React.FC = () => {
  const { t } = useTranslation('neithStation');
  /* 23.03.24 수정: 기존 windowResizeAtom -> useMediaQuery로 변경 */
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <section className={cn('how-to-wrap')}>
      <div className={cn('how-to-inner')}>
        <NeithContentTitle field="How to" title={t('home.howTo.title')} />
        <div className={cn('journey')}>
          <ol>
            <li>
              <strong className={cn('subject')}>{t('home.howTo.journey.0.subject')}</strong>
              <ul className={cn('steps')}>
                <li>{t('home.howTo.journey.0.item.0')}</li>
                <li>{t('home.howTo.journey.0.item.1')}</li>
                <li>{t('home.howTo.journey.0.item.2')}</li>
              </ul>
            </li>
            <li>
              <strong className={cn('subject')}>{t('home.howTo.journey.1.subject')}</strong>
              <p className={cn('desc')}>{t('home.howTo.journey.1.desc')}</p>
            </li>
            <li>
              <strong className={cn('subject')}>{t('home.howTo.journey.2.subject')}</strong>
              <p className={cn('desc')}>{t('home.howTo.journey.2.desc')}</p>
            </li>
          </ol>
        </div>
        <div className={cn('covenant-date')}>
          <div className={cn('stemp')}>
            <Image
              src="/assets/images/img/img_neith_howto_stamp.png"
              alt=""
              width={isMobile ? 152 : 172}
              height={isMobile ? 152 : 172}
              loader={NileCDNLoader}
            />
          </div>

          <strong className={cn('subject')}>{t('home.howTo.covenantDate.subject')}</strong>
          <p className={cn('desc')}>{t('home.howTo.covenantDate.desc')}</p>
          <p className={cn('sub-desc')}>{t('home.howTo.covenantDate.sub')}</p>
        </div>
      </div>
    </section>
  );
};

export default NeithHowTo;
