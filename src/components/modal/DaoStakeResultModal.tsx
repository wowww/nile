import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Modal } from 'antd';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { useAtomValue } from 'jotai';

// components
import BgButton from '@/components/button/BgButton';
import Tag from '@/components/tag/Tag';
import { IconLogo } from '@/components/logo/IconLogo';
import { daoThemeAtom } from '@/state/daoAtom';

// images
import { ReactSVG } from 'react-svg';

interface Props {
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
  disabled?: boolean;
  type: string;
  title: string;
  desc: string;
  // 최초 staking or 추가 staking 상태
  state: 'stake' | 'add';
  // stake or unstake 상태
  kind: 'add' | 'unstake';
}

const DaoStakeResultModal: React.FC<Props> = ({ isModal, setIsModal, type, title, desc, state, kind }) => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);

  const onCancel = () => {
    Modal.destroyAll();
    setIsModal(false);
  };

  return (
    <Modal
      wrapClassName="dao-stake-modal result"
      className={cn('dao-station-modal')}
      open={isModal}
      onCancel={onCancel}
      centered={true}
      destroyOnClose={true}
      width={'none'}
      closeIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_close.svg" />}
      footer={false}
    >
      <div className={cn('banner-block')}>
        <div className={cn('text-block')}>
          <IconLogo type={type} size={50} fullType />
          <h2 className={cn('title')}>{title}</h2>
          <p className={cn('desc')}>{desc}</p>
        </div>
        <div className={cn('img-block')}>
          <Image src={`/images/bg_showcase_${type}.svg`} layout="fill" loader={NileCDNLoader} alt="" />
        </div>
      </div>
      <div className={cn('contents-block')}>
        <div className={cn('modal-header')}>
          <h3 className={cn('title')}>{state === 'stake' ? t('stakingPool.modal.stake') : t('stakingPool.modal.managingStake')}</h3>
        </div>
        <div className={cn('modal-body')}>
          <div className={cn('dao-stake-modal-inner')}>
            <div className={cn('summary')}>
              <div>
                <div className={cn('summary-header')}>
                  <strong>{kind === 'add' ? t('stakingPool.modal.complete1') : t('stakingPool.modal.complete2')}</strong>
                </div>
                <div className={cn('summary-info')}>
                  <div className={cn('info-row')}>
                    <Tag size="s" color="primary">
                      {kind === 'add' ? 'Stake' : 'Unstake'}
                    </Tag>
                    <span className={cn('figure')}>
                      9,999,999.0000
                      <span className={cn('unit')}>
                        {t(`${kind === 'add' ? 'unit1' : 'unit2'}`, { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}
                      </span>
                    </span>
                  </div>
                  <div className={cn('info-row')}>
                    <Tag size="s" color="dark-gray">
                      {kind === 'add' ? t('stakingPool.modal.get') : t('stakingPool.modal.get')}
                    </Tag>
                    <span className={cn('figure')}>
                      999,999,999.0000
                      <span className={cn('unit')}>
                        {t(`${kind === 'add' ? 'unit2' : 'unit1'}`, { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className={cn('user-dt-info')}>
                <div className={cn('info-box')}>
                  <span>{t('stakingPool.modal.box.3')}</span>
                  <ul>
                    <li>5,230.0000 {t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}</li>
                  </ul>
                </div>
                {kind === 'add' && (
                  <div className={cn('info-box')}>
                    <span>{t('stakingPool.modal.box.11')}</span>
                    <ul>
                      <li>2023-11-01 12:00:03</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={cn('modal-footer')}>
          <BgButton
            buttonText={t('stakingPool.modal.btn.2')}
            color="black"
            size="md"
            onClick={() => {
              setIsModal(false);
            }}
            key="approve"
          />
        </div>
      </div>
    </Modal>
  );
};

export default DaoStakeResultModal;
