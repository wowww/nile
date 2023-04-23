import cn from 'classnames';
import { Select } from 'antd';
import InfoSection from '../InfoSection';
import { ReactSVG } from 'react-svg';
import ProposalDualSlider from '../ProposalDualSlider';
import { useTranslation } from 'next-i18next';

const { Option } = Select;

const ChangePurchaseDao = () => {
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
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.6')}>
        <ProposalDualSlider
          category={[t('governance.proposal.action.cases.infoContent.8'), t('governance.proposal.action.cases.infoContent.9')]}
          initValue={[50, 50]}
          desc={t('governance.proposal.action.cases.infoContent.15')}
        />
      </InfoSection>
    </>
  );
};

export default ChangePurchaseDao;
