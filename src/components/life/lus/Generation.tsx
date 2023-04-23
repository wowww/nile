import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { windowResizeAtom } from '@/state/windowAtom';

import Tag from '@/components/tag/Tag';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { useAtomValue } from 'jotai';

const Generation = () => {
  const [size, setSize] = useState('');
  const offset = useAtomValue(windowResizeAtom);

  const { t } = useTranslation(['life', 'common']);

  const windowWidthCheck = () => {
    if (offset.width >= 768 && offset.width <= 1279) {
      setSize('md');
    } else if (offset.width < 768) {
      setSize('sm');
    } else {
      setSize('lg');
    }
  };

  // resize 시
  useEffect(() => {
    if (offset.width === 0) {
      return;
    }
    windowWidthCheck();
  }, [offset.width]);

  return (
    /* 22.11.17 수정: id 추가 */
    <div className={cn('generation-wrap')} id="lus_benefit">
      <div className={cn('generation-inner')}>
        <div className={cn('generation-info')}>
          <div className={cn('info-top')}>
            <Tag size="md-m">{t('lus.generation.label')}</Tag>
            <h3 className={cn('generation-title')}>{t('lus.generation.title')}</h3>
            <p className={cn('generation-desc')}>{t('lus.generation.desc')}</p>
          </div>
          <div className={cn('info-bottom')}>
            <h4 className={cn('generation-benefit-title')}>{t('lus.generation.subTitle', { num: '01' })}</h4>
            <p className={cn('generation-benefit-desc')}>{t('lus.generation.subDesc')}</p>
          </div>
        </div>
      </div>

      <div className={cn('generation-responsive-bg')}>
        {size === 'md' ? (
          <Image src={`/images/lus/bg_generation_responsive_md.png`} alt="" width={768} height={509} layout="responsive" className={cn('md')} loader={NileCDNLoader} />
        ) : (
          <Image src={`/images/lus/bg_generation_responsive_sm.png`} alt="" width={360} height={358} layout="responsive" className={cn('sm')} loader={NileCDNLoader} />
        )}
      </div>
    </div>
  );
};

export default Generation;
