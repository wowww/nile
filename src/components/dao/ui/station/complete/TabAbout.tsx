import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import useMediaQuery from '@/hook/useMediaQuery';

import ParticipantProcedure from './ParticipantProcedure';
import DistributionMethod from '@/components/dao/ui/station/recruit/DistributionMethod';
import ParticipateInfo from '@/components/dao/ui/station/complete/ParticipateInfo';

interface Props {
  isAdditional: boolean;
}

const TabAbout = ({ isAdditional }: Props) => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const { locale } = useRouter();

  const _handleImgUrl = () => {
    const size = !isMobile ? 'lg' : 'sm';
    const lang = locale === 'en' ? 'en' : 'ko';
    return `/images/img_dao_distribution_method_${lang}_${size}.png`;
  };

  return (
    <>
      {isAdditional && <ParticipateInfo />}
      <ParticipantProcedure isAdditional={isAdditional} />
      <div className={cn('station-tab-content-section')}>
        <DistributionMethod />
      </div>
    </>
  );
};

export default TabAbout;
