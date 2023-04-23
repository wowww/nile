import { useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { ReactSVG } from 'react-svg';
import { useTranslation, Trans } from 'next-i18next';
import { useRouter } from 'next/router';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { Popover } from 'antd';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import StationTitle from '@/components/dao/station/recruit/StationTitle';
import useMediaQuery from '@/hook/useMediaQuery';

const DistributionMethod = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);
  const { locale } = useRouter();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const _handleImgUrl = () => {
    const size = !isMobile ? 'lg' : 'sm';
    const lang = locale === 'en' ? 'en' : 'ko';
    return `/images/img_dao_distribution_method_${lang}_${size}.png`;
  };

  return (
    <div className={cn('distribution-method-wrap')}>
      <StationTitle title={t('station.recruiting.section.1.1.imgArea.title', { type: useDaoCharacterConvert(activeDao.value) })} />
      <div className={cn('text-area')}>
        <div className={cn('img-area')}>
          <Image src={_handleImgUrl()} alt="" layout="fill" quality="100" loading="eager" objectFit="contain" loader={NileCDNLoader} />
          {isMobile && (
            <div className={cn('popup-wrap', locale === 'en' && 'en')}>
              <Popover
                overlayClassName="tooltip recruiting-img-tooltip"
                placement="topRight"
                align={{
                  offset: [3, -4],
                }}
                content={<div className={cn('tooltip-contents')}>{t('station.recruiting.section.1.1.imgArea.tooltip.1')}</div>}
              >
                <button type="button" className="hidden-tooltip-btn first"></button>
              </Popover>
              <Popover
                overlayClassName="tooltip recruiting-img-tooltip"
                placement="topRight"
                align={{
                  offset: [3, -4],
                }}
                content={
                  <div className={cn('tooltip-contents')}>
                    {t('station.recruiting.section.1.1.imgArea.tooltip.2', { type: useDaoCharacterConvert(activeDao.value) })}
                  </div>
                }
              >
                <button type="button" className="hidden-tooltip-btn second"></button>
              </Popover>
              <Popover
                overlayClassName="tooltip recruiting-img-tooltip"
                placement="topRight"
                align={{
                  offset: [3, -4],
                }}
                content={
                  <div className={cn('tooltip-contents')}>
                    {t('station.recruiting.section.1.1.imgArea.tooltip.3', { type: useDaoCharacterConvert(activeDao.value) })}
                  </div>
                }
              >
                <button type="button" className="hidden-tooltip-btn third"></button>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DistributionMethod;
