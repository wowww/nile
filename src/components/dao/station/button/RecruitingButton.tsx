import BgButton from '@components/button/BgButton';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DaoStationModal from '@components/modal/daostation/DaoStationModal';
import { useTranslation } from 'next-i18next';
import { useAtomValue, useSetAtom } from 'jotai';
import { useLayoutResize } from '@utils/layout';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { useWonder } from '@/hook/useWonder';
import { refreshWonderStationMembersAtom, refreshWonderStationRealTimeInfoAtom, refreshWonderStationUserInfoAtom } from '@/state/daoAtom';

interface RecruitingButtonProps {
  disabled?: boolean;
  isSub?: boolean;
}

const RecruitingButton = ({ disabled, isSub }: RecruitingButtonProps) => {
  const { t } = useTranslation(['dao', 'common']);
  const nileWallet = useAtomValue(nileWalletAtom);

  const { wonderStations, wonderStationUserInfo } = useWonder();
  const { isMobile } = useLayoutResize();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const refreshWonderStationRealTimeInfo = useSetAtom(refreshWonderStationRealTimeInfoAtom);
  const refreshWonderStationsUserInfo = useSetAtom(refreshWonderStationUserInfoAtom);
  const refreshWonderStationMembers = useSetAtom(refreshWonderStationMembersAtom);

  const refresh = () => {
    refreshWonderStationRealTimeInfo();
    refreshWonderStationsUserInfo();
    setTimeout(() => refreshWonderStationMembers(), 5000);
  };

  const connectWallet = useCallback(() => {
    provider.connect().then(() => {
      provider.closeModal();
    });
  }, [nileWallet]);

  const buttonText = useMemo(() => {
    if (wonderStations && wonderStations?.length === 0) {
      return 'Station Opens Soon';
    }
    if (wonderStationUserInfo?.status === '1' && nileWallet) {
      return t('station.recruitCondition.condition.btnAddParticipant');
    }
    return t('station.recruitCondition.condition.btnParticipant');
  }, [wonderStationUserInfo, t, wonderStations, nileWallet]);

  useEffect(() => {
    if (!isOpen) {
      refresh();
    }
  }, [isOpen]);

  return (
    <>
      <BgButton
        buttonText={buttonText}
        color={isSub ? 'highlight' : 'white'}
        size={'lg'} /* 23.04.19 수정: 버튼 사이즈 pc, tablet 에서도 lg로 적용 */
        disabled={disabled}
        onClick={() => {
          if (nileWallet) {
            setIsOpen(true);
          } else {
            connectWallet();
          }
        }}
        block
      />
      <DaoStationModal isOpen={isOpen} setIsOpen={setIsOpen} desc={t('station.participationProcess.bannerText', { ns: 'dao' })} />
    </>
  );
};

export default RecruitingButton;
