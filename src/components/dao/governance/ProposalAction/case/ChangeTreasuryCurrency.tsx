import { useState } from 'react';
import cn from 'classnames';
import { Select } from 'antd';
import InfoSection from '../InfoSection';
import { ReactSVG } from 'react-svg';
import AmountInputBox from '../AmountInputBox';
import TextInfoRow from '../TextInfoRow';
import { useTranslation } from 'next-i18next';

const { Option } = Select;

const ChangeTreasuryCurrency = () => {
  const { t } = useTranslation('dao');

  const [nowUnit, setNowUnit] = useState<string>('WEMIX');
  const [nowChangeUnit, setNowChangeUnit] = useState<string>('WEMIX');
  return (
    <>
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.8')}>
        <>
          <Select
            size="middle"
            defaultValue="WEMIX"
            suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
            popupClassName="select-size-md-dropdown"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            className={cn('distant-contents')}
            onChange={(v) => setNowUnit(v)}
          >
            <Option value="WEMIX">WEMIX</Option>
            <Option value="WEMIX$">WEMIX$</Option>
            <Option value="USDC">USDC</Option>
          </Select>
          <TextInfoRow subject={t('governance.proposal.action.cases.infoContent.11')} contents="1,000,000 WEMIX" />
        </>
      </InfoSection>
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.9')}>
        <>
          <Select
            size="middle"
            defaultValue="WEMIX"
            suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
            popupClassName="select-size-md-dropdown"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            className={cn('distant-contents')}
            onChange={(v) => setNowChangeUnit(v)}
          >
            <Option value="WEMIX">WEMIX</Option>
            <Option value="WEMIX$">WEMIX$</Option>
            <Option value="USDC">USDC</Option>
          </Select>
          <TextInfoRow subject={t('governance.proposal.action.cases.infoContent.11')} contents="1,000,000 WEMIX" />
        </>
      </InfoSection>
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.3')}>
        <>
          <AmountInputBox unit={nowUnit} />
          <TextInfoRow
            subject={t('governance.proposal.action.cases.infoContent.19')}
            contents="0 WEMIX"
            desc={`${t('governance.proposal.action.cases.infoContent.21')} 0.25%`}
          />
          <TextInfoRow subject={t('governance.proposal.action.cases.infoContent.20')} contents="0 WEMIX" />
          <span className={cn('date-standard')}>yyyy-mm-dd hh:mm:ss {t('governance.proposal.action.cases.infoContent.16')}</span>
        </>
      </InfoSection>
      <span className={cn('bottom-desc')}>{t('governance.proposal.action.cases.bottomDesc.3')}</span>
    </>
  );
};

export default ChangeTreasuryCurrency;
