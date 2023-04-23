import cn from 'classnames';
import { Select, Input } from 'antd';
import InfoSection from '../InfoSection';
import { ReactSVG } from 'react-svg';
import ProposalDualSlider from '../ProposalDualSlider';
import ButtonInput from '../ButtonInput';
import { useTranslation } from 'next-i18next';

const { Option } = Select;
const ChangeDAORevenueDistributionRatio = () => {
  const { t } = useTranslation('dao');

  return (
    <>
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.1')}>
        <Select
          size="middle"
          suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
          popupClassName="select-size-md-dropdown"
          getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          placeholder={t('governance.proposal.action.cases.infoContent.1')}
          className={cn('distant-contents')}
        >
          <Option value="1">Treasury 자금 사용</Option>
          <Option value="2">DAO 수익 분배 비율 변경</Option>
        </Select>
      </InfoSection>
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.5')}>
        <ProposalDualSlider
          category={[t('governance.proposal.action.cases.infoContent.4'), t('governance.proposal.action.cases.infoContent.5')]}
          initValue={[40, 60]}
          desc={t('governance.proposal.action.cases.infoContent.15')}
        />
      </InfoSection>
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.7')}>
        <div className={cn('change-button-input-row')}>
          <div className={cn('before')}>
            <span className={cn('change-desc')}>{t('governance.proposal.action.cases.infoContent.17')}</span>
            <Input value={'3%'} disabled />
          </div>
          <div className={cn('arrow-icon')}></div>
          <div className={cn('after')}>
            <span className={cn('change-desc')}>{t('governance.proposal.action.cases.infoContent.18')}</span>
            <ButtonInput unit="%" />
          </div>
        </div>
      </InfoSection>
      <span className={cn('bottom-desc')}>{t('governance.proposal.action.cases.bottomDesc.2')}</span>
    </>
  );
};

export default ChangeDAORevenueDistributionRatio;
