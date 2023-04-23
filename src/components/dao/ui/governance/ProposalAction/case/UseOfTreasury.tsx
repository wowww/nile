import { useState } from 'react';
import cn from 'classnames';
import { Select, Collapse, Input } from 'antd';
import InfoSection from '../InfoSection';
import { ReactSVG } from 'react-svg';
import ProposalDualSlider from '../ProposalDualSlider';
import ButtonInput from '../ButtonInput';
import AmountInputBox from '../AmountInputBox';
import TextInfoRow from '../TextInfoRow';
import { useTranslation } from 'next-i18next';

const { Option } = Select;
const { Panel } = Collapse;

interface Props {
  disabled?: boolean;
}

const UseOfTreasury = ({ disabled = false }: Props) => {
  const { t } = useTranslation('dao');

  const [nowUnit, setNowUnit] = useState<string>('WEMIX');

  return (
    <>
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.1')}>
        <>
          <Select
            size="middle"
            // defaultValue="lucy"
            suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
            popupClassName="select-size-md-dropdown"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            placeholder={t('governance.proposal.action.cases.infoContent.1')}
            className={cn('distant-contents')}
            disabled={disabled}
          >
            <Option value="1">Treasury 자금 사용</Option>
            <Option value="2">DAO 수익 분배 비율 변경</Option>
          </Select>
          <Collapse expandIcon={() => <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}>
            <Panel
              header={t('governance.proposal.action.cases.infoContent.2')}
              key="1"
              extra={<span>{t('governance.proposal.action.cases.infoContent.3')}</span>}
              collapsible={disabled ? 'disabled' : 'header'}
            >
              <Input placeholder={t('governance.proposal.action.cases.infoContent.32')} />
              <div className={cn('treasury-collapse-contents')}>
                <InfoSection title={t('governance.proposal.action.cases.infoTitle.5')}>
                  <ProposalDualSlider
                    category={[t('governance.proposal.action.cases.infoContent.4'), t('governance.proposal.action.cases.infoContent.5')]}
                    initValue={[40, 60]}
                    desc={t('governance.proposal.action.cases.infoContent.15')}
                  />
                </InfoSection>
                <InfoSection title={t('governance.proposal.action.cases.infoTitle.7')}>
                  <ButtonInput unit="%" />
                </InfoSection>
                <InfoSection title={t('governance.proposal.action.cases.infoTitle.6')}>
                  <ProposalDualSlider
                    category={[t('governance.proposal.action.cases.infoContent.8'), t('governance.proposal.action.cases.infoContent.9')]}
                    initValue={[50, 50]}
                    desc={t('governance.proposal.action.cases.infoContent.15')}
                  />
                </InfoSection>
              </div>
            </Panel>
          </Collapse>
          <div className={cn('business-info-box')}>
            <strong className={cn('info-title')}>{t('governance.proposal.action.cases.infoTitle.5')}</strong>
            <ul className={cn('list-type-dot')}>
              <li>
                {t('governance.proposal.action.cases.infoContent.4')} : {t('governance.proposal.action.cases.infoContent.5')} = 40% : 60%
              </li>
              <li>{t('governance.proposal.action.cases.infoContent.7')} = 3%</li>
            </ul>
            <strong className={cn('info-title')}>{t('governance.proposal.action.cases.infoTitle.6')}</strong>
            <ul className={cn('list-type-dot')}>
              <li>
                {t('governance.proposal.action.cases.infoContent.8')} : {t('governance.proposal.action.cases.infoContent.9')} = 50% : 50%
              </li>
            </ul>
          </div>
        </>
      </InfoSection>
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.2')}>
        <>
          <Select
            size="middle"
            defaultValue="WEMIX"
            suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
            popupClassName="select-size-md-dropdown"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            className={cn('distant-contents')}
            onChange={(v) => setNowUnit(v)}
            disabled={disabled}
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
          <AmountInputBox unit={nowUnit} disabled={disabled} />
          <TextInfoRow subject={`${t('governance.proposal.action.cases.infoContent.12')} {N} %`} contents="30,000 WEMIX" />
          <TextInfoRow subject={t('governance.proposal.action.cases.infoContent.30')} contents="1,000,000 WEMIX" />
          <span className={cn('date-standard')}>yyyy-mm-dd hh:mm:ss {t('governance.proposal.action.cases.infoContent.16')}</span>
        </>
      </InfoSection>
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.4')}>
        <>
          <Select
            size="middle"
            defaultValue="1"
            suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
            popupClassName="select-size-md-dropdown"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            className={cn('distant-contents')}
            disabled={disabled}
          >
            <Option value="1">Trust 지갑_01_NCP 수익보관용</Option>
            <Option value="2">Trust 지갑_02_NCP 수익보관용경</Option>
          </Select>
          <span className={cn('wallet-address')}>{t('governance.proposal.action.cases.infoContent.14')} : 0xabcdefghijklmnop1234567890abcd</span>
        </>
      </InfoSection>
      <span className={cn('bottom-desc')}>{t('governance.proposal.action.cases.bottomDesc.1')}</span>
    </>
  );
};

export default UseOfTreasury;
