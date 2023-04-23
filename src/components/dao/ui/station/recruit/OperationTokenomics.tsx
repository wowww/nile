import cn from 'classnames';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { useAtomValue } from 'jotai';
import { NileCDNLoader } from '@/utils/image/loader';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { daoThemeAtom } from '@/state/daoAtom';

import TokenFlowInfo from '@components/dao/ui/station/recruit/TokenFlowInfo';
import StationTitle from '@components/dao/ui/station/recruit/StationTitle';

import useMediaQuery from '@/hook/useMediaQuery';

const OperationTokenomics = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const size = !isMobile ? 'lg' : 'sm';

  return (
    <div className={cn('operation-tokenomics-wrap')}>
      <StationTitle title="Tokenomics" desc={t('station.recruiting.tokenomics.desc', { type: useDaoCharacterConvert(activeDao.value) })} />
      <div className={cn('check-item-wrap')}>
        <TokenFlowInfo />
        <div className={cn('reward-flow-img-area')}>
          <div className={cn('text-area')}>
            <strong className={cn('text-area-title')}>
              {t('station.recruiting.tokenomics.algorism.title', { type: useDaoCharacterConvert(activeDao.value) })}
            </strong>
            <p className={cn('text-paragraph')}>
              {t('station.recruiting.tokenomics.algorism.desc', { type: useDaoCharacterConvert(activeDao.value) })}
            </p>
          </div>
          <div className={cn('img-area')}>
            <Image
              src={`/images/img_dao_reward_flow_${size}.jpg`}
              alt=""
              layout="fill"
              quality="100"
              loading="eager"
              objectFit="contain"
              loader={NileCDNLoader}
            />
          </div>
          <ul className={cn('desc-list')}>
            <li>{t('station.recruiting.tokenomics.algorism.guide')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OperationTokenomics;
