import { useState } from 'react';
import cn from 'classnames';
import ChangeInputRow from './ChangeInputRow';
import { Switch } from 'antd';
import ProposalSlider from './ProposalSlider';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';

interface Props {
  subject: string;
  category?: string;
  initValue?: number;
  category2?: string;
  initValue2?: number;
  unit: string;
  slider?: boolean;
  sliderValue?: number;
  setSliderValue?: (sliderValue: number) => void;
  type?: '2' | '3' | '4';
}

const ProposalChangeForm = ({
  subject,
  category,
  initValue,
  category2,
  initValue2,
  unit,
  slider = false,
  sliderValue,
  setSliderValue,
  type,
}: Props) => {
  const { t } = useTranslation('dao');

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [errorFirst, setErrorFirst] = useState<boolean>(false);
  const [errorSecond, setErrorSecond] = useState<boolean>(false);

  return (
    <div className={cn('proposal-change-form-wrap', isDisabled && 'disabled')}>
      <div className={cn('change-form-header')}>
        <strong>{subject}</strong>
        <Switch defaultChecked onChange={() => setIsDisabled(!isDisabled)} />
      </div>
      {!slider ? (
        <div className={cn('input-info-row')}>
          <span>{t('governance.proposal.action.cases.infoContent.17')}</span>
          <span>{t('governance.proposal.action.cases.infoContent.18')}</span>
        </div>
      ) : (
        <>
          <ProposalSlider disabled={isDisabled} value={sliderValue} setValue={setSliderValue} />
          <span className={cn('percentage-change')}>50% &rarr; {sliderValue}</span>
          <p className={cn('desc')}>{t('governance.proposal.action.cases.infoContent.31', { N: 'N' })}</p>
        </>
      )}
      {category && category2 && initValue && initValue2 && (
        <>
          <ChangeInputRow category={category} initValue={initValue} disabled={isDisabled} unit={unit} error={errorFirst} />
          <ChangeInputRow category={category2} initValue={initValue2} disabled={isDisabled} unit={unit} error={errorSecond} />
        </>
      )}
      {category && initValue && !category2 && !initValue2 && (
        <ChangeInputRow category={category} initValue={initValue} disabled={isDisabled} unit={unit} error={errorFirst} />
      )}
      {errorFirst || errorSecond ? (
        <div className={cn('error-message')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
          <span>{t('governance.proposal.action.inputError' + type)}</span>
        </div>
      ) : null}
    </div>
  );
};

export default ProposalChangeForm;
