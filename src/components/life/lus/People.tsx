import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Tag from '@/components/tag/Tag';

const Generation = () => {
  const { t } = useTranslation(['life', 'common']);

  return (
    <div className={cn('people-wrap')}>
      <div className={cn('people-inner')}>
        <div className={cn('people-info')}>
          <div className={cn('info-top')}>
            <Tag size="md-m">{t('lus.people.label')}</Tag>
            <h3 className={cn('people-title')}>{t('lus.people.title')}</h3>
            <p className={cn('people-desc')}>{t('lus.people.desc')}</p>
          </div>
          {/* 2.11.17 수정: 마크업 위치 수정 및 클래스명 변경 */}
          <div className={cn('people-img-wrap')}></div>
          <div className={cn('info-bottom')}>
            <h4 className={cn('people-benefit-title')}>{t('lus.people.subTitle', { num: '02' })}</h4>
            <p className={cn('people-benefit-desc')}>{t('lus.people.subDesc')}</p>
            <span className={cn('people-notice')}>{t('lus.people.notice')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generation;
