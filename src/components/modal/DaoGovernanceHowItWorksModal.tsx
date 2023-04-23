import { ReactElement, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';
import { ReactSVG } from 'react-svg';

const ModalLayout = dynamic(() => import('@components/modal/ModalLayout'), { ssr: false });

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DaoGovernanceHowItWorksModal = ({ isOpen, setIsOpen }: Props): ReactElement => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);
  const [steps, setSteps] = useState([1, 2, 3]);
  const [stepLists, setStepLists] = useState([1, 2, 3]);

  return (
    <ModalLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="lg"
      title={t('howItWorksModal.title')}
      footer={false}
      destroyOnClose={true}
      wrapClassName="dao-governance-how-it-works-modal"
      className="title-line"
    >
      <div className={cn('dao-governance-how-it-works')}>
        <div className={cn('content')}>
          <>
            <p className={cn('content-text')}>{t('howItWorksModal.content', { type: useDaoCharacterConvert(activeDao.value) })}</p>
            {/* {contentSteps} */}
            <ul className={cn('steps-wrap')}>
              {steps.map((d, i) => (
                <li key={`step-${i}`} className={cn('step')}>
                  <div className={cn('title-wrap')}>
                    <div className={cn('chips')}>
                      <div className={cn('bg')}>
                        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/bg_step_chips.svg" />
                      </div>
                      <div className={cn('text')}>
                        Step <span>0{d}</span>
                      </div>
                    </div>
                    <strong className={cn('title')}>{t(`howItWorksModal.step.${d}.title`)}</strong>
                  </div>
                  <div className={cn('desc-wrap')}>
                    <p className={cn('desc')}>{t(`howItWorksModal.step.${d}.desc`)}</p>
                    <ol>
                      {stepLists.map((data, index) => (
                        // TODO: 피그마 상에서 Step3의 투표기간이 Tb에서만 3일로 기재돼있는데 기획서에서 5일이라 우선 5일로 처리
                        <li key={`howitstep-${index}`}>
                          {t(`howItWorksModal.step.${d}.list.${index}`, { type: `g.${useDaoCharacterConvert(activeDao.value)}` })}
                        </li>
                      ))}
                    </ol>
                  </div>
                </li>
              ))}
            </ul>
          </>
        </div>
      </div>
    </ModalLayout>
  );
};

export default DaoGovernanceHowItWorksModal;
