import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';

// dao works list item
import HowDao1 from '../recruit/HowDao1';
import HowDao2 from '../recruit//HowDao2';
import HowDao3 from '../recruit//HowDao3';
import HowDao4 from '../recruit//HowDao4';
import DistributionMethod from '@/components/dao/ui/station/recruit/DistributionMethod';

interface Props {
  isAdditional?: boolean;
}

const HowDaoWorks = ({ isAdditional = false }: Props) => {
  const { t } = useTranslation('dao');
  const offset = useAtomValue(windowResizeAtom);
  const size = offset.width > 767 ? 'lg' : 'sm';

  return (
    <div className={cn('dao-works-wrap')}>
      <ul className={cn('work-list')}>
        <HowDao1 />
        <HowDao2 />
        <HowDao3 />
        {!isAdditional && (
          <li className={cn('distribution-method-item')}>
            <DistributionMethod />
          </li>
        )}
        <HowDao4 />
      </ul>
      <div className={cn('reward-flow-img-area')}>
        <div className={cn('text-area')}>
          <strong className={cn('text-area-title')}>{t('station.recruiting.section.2.4.title')}</strong>
          <p className={cn('text-paragraph')}>{t('station.recruiting.section.2.4.desc')}</p>
        </div>
        <div className={cn('img-area')}>
          <Image
            src={`/images/img_dao_reward_flow_${size}.png`}
            alt=""
            layout="fill"
            quality="100"
            loading="eager"
            objectFit="contain"
            loader={NileCDNLoader}
          />
        </div>
        <ul className={cn('desc-list')}>
          <li>{t('station.recruiting.section.2.4.list.1')}</li>
        </ul>
      </div>
    </div>
  );
};

export default HowDaoWorks;
