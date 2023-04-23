import cn from 'classnames';
import { Modal } from 'antd';

import BgButton from '@components/button/BgButton';
import DaoStakeModalBanner from '@/components/modal/DaoStakeModalBanner';
import { Trans, useTranslation } from 'next-i18next';
import { IconLogo } from '@components/logo/IconLogo';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import Tag from '@components/tag/Tag';
import { ReactSVG } from 'react-svg';
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import lottieCongratulations from '@/assets/lottie/lottie_congratulations.json';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { TimeFormat, utcToLocal } from '@utils/formatter/time';
import { useWonder } from '@/hook/useWonder';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Function;
  type: string;
  title: string;
  desc: string;
}

const DaoStationCompleteModal = ({ isOpen, setIsOpen, desc }: ModalProps) => {
  const { t } = useTranslation(['dao', 'common']);
  const bgLottie = useRef<any>(null);
  const activeDao = useAtomValue(daoThemeAtom);

  const { wonderDao } = useWonder();

  const onCancel = () => {
    Modal.destroyAll();
    setIsOpen(false);
  };

  useEffect(() => {
    const lottieLoad = lottie.loadAnimation({
      container: bgLottie.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottieCongratulations,
    });

    return () => {
      lottieLoad.destroy();
    };
  }, []);

  return (
    <Modal
      wrapClassName={'step4'}
      className={cn('dao-station-modal')}
      open={isOpen}
      onCancel={onCancel}
      centered={true}
      destroyOnClose={true}
      width={'none'}
      footer={false}
    >
      <DaoStakeModalBanner desc={desc} />
      <div className={cn('contents-block')}>
        <div className={cn('modal-body')}>
          <div className={cn('modal-body-inner')}>
            <div className={cn('step4-wrap')}>
              <div ref={bgLottie} className={cn('lottie-wrap')}></div>
              <div className={cn('contents-wrap')}>
                <div className={cn('contents-top')}>
                  <IconLogo type="wonder" size={62} fullType />
                  <strong className={cn('title')}>
                    {t('station.participationProcess.title3', { type: useDaoCharacterConvert(activeDao.value) })}
                  </strong>
                  <div className={cn('date-wrap')}>
                    <Tag size="s" color="primary">
                      OPEN
                    </Tag>
                    <span className={cn('date')}>{utcToLocal(wonderDao?.endAt, TimeFormat.STANDARD_WITHOUT_SECOND)}</span>
                  </div>
                </div>
                <div className={cn('contents-bottom')}>
                  <strong className={cn('title')}>
                    <Trans i18nKey="station.participationProcess.completeMessage1" ns="dao">
                      <span></span>
                    </Trans>
                  </strong>
                  <ul>
                    <li>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_union.svg" />
                      <p className={cn('desc')}>
                        {t('station.participationProcess.completeMessage2', { type: useDaoCharacterConvert(activeDao.value) })}
                      </p>
                    </li>
                    <li>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_wemix_wallet_32.svg" />
                      <p className={cn('desc')}>{t('station.participationProcess.completeMessage3')}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cn('modal-footer')}>
          <BgButton buttonText={t('station.participationProcess.checkIt')} size="md" color="black" onClick={() => onCancel()} />
        </div>
      </div>
    </Modal>
  );
};

export default DaoStationCompleteModal;
