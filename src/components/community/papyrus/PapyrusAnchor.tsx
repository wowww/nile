import React from 'react';
import cn from 'classnames';
/* 22.11.02 수정: 다국어 추가 */
import { useTranslation } from 'next-i18next';
/* 22.11.10 수정: 버튼 마크업 수정 */
import TextButton from '@/components/button/TextButton';

const PapyrusAnchor = () => {
  const { t } = useTranslation('community');
  const anchorData = [
    {
      title: t('papyrus.title-5'),
      desc: t('papyrus.text-5'),
      link: '/dao' /* 22.11.10 수정: 링크 수정 */,
      linkName: t('card.link', { link: 'DAO' }),
    },
    {
      title: t('papyrus.title-6'),
      desc: t('papyrus.text-6'),
      link: 'https://wemix.fi/',
      linkName: t('card.link', { link: 'WEMIX.Fi' }),
      target: '_blank',
    },
    {
      title: t('papyrus.title-7'),
      desc: t('papyrus.text-7'),
      link: '/marketplace/',
      linkName: t('card.link', { link: 'Marketplace' }),
    },
  ];
  return (
    <>
      <h2 className={cn('anchor-title')}>{t('papyrus.title-4')}</h2>
      <p className="anchor-desc">{t('papyrus.text-4')}</p>
      <ul className={cn('anchor-list')}>
        {anchorData.map((anchor, index) => {
          return (
            /* 22.11.10 수정 start: 공통 코드로 수정 */
            <li key={'anchor' + index}>
              <h3 className="anchor-detail-title">{anchor.title}</h3>
              <p className="anchor-detail-desc">{anchor.desc}</p>
              {anchor.target !== '_blank' ? (
                <TextButton buttonText={anchor.linkName} iconValue="line-arrow" gapSpacing="lg" size="md" href={anchor.link} />
              ) : (
                <TextButton buttonText={anchor.linkName} iconValue="line-arrow" gapSpacing="lg" size="md" href={anchor.link} target="_blank" />
              )}
            </li>
            /* 22.11.10 수정 end: 공통 코드로 수정 */
          );
        })}
      </ul>
    </>
  );
};

export default PapyrusAnchor;
