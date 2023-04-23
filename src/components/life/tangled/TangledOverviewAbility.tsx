import React from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

import TangledTitle from '@/components/life/tangled/TangledTitle';
import Image from 'next/image';
/* 23.03.29 수정: CDNLoader, ReactSVG 추가 */
import { NileCDNLoader } from '@/utils/image/loader';
import { ReactSVG } from 'react-svg';

const TangledOverviewAbility = () => {
  const { t } = useTranslation('life');

  /* 23.03.29 수정: abilityList 데이터 형태 수정 */
  const abilityList: { feature: string; info: string }[] = [
    { feature: 'game', info: '' },
    { feature: 'gift', info: t(`tangled.overview.ability.features.gift.info`) },
    { feature: 'show', info: t(`tangled.overview.ability.features.show.info`) },
    { feature: 'live', info: t(`tangled.overview.ability.features.live.info`) },
  ];

  return (
    <div className={cn('ability-wrap')}>
      <TangledTitle title={t('tangled.overview.ability.title')} desc={t('tangled.overview.ability.desc')} />
      <dl className={cn('features-wrap')}>
        {/* 23.03.29 수정: 데이터 타입 수정 */}
        {abilityList.map((v: { feature: string; info: string }) => {
          return (
            <div className={cn('items')} key={`ability-${v.feature}`}>
              <Image
                width={260}
                height={320}
                src={`/assets/images/img/img_tangled_features_${v.feature}.png`}
                alt={`features-${v.feature}`}
                loader={NileCDNLoader}
              />
              <span className={cn('status')}>{t(`tangled.overview.ability.features.${v.feature}.status`)}</span>
              <strong className={cn('name')}>{t(`tangled.overview.ability.features.${v.feature}.name`)}</strong>
              <p className={cn('text')}>{t(`tangled.overview.ability.features.${v.feature}.text`)}</p>
              {/* 23.03.29 수정: info 텍스트 추가 */}
              {v.info && (
                <p className={cn('info')}>
                  <ReactSVG wrapper="span" src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                  {v.info}
                </p>
              )}
            </div>
          );
        })}
      </dl>
    </div>
  );
};

export default React.memo(TangledOverviewAbility);
