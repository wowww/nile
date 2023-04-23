import { useState } from 'react';
import cn from 'classnames';
import InfoSection from '../InfoSection';
import { Select, Collapse, Input, Checkbox } from 'antd';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';

const { Option } = Select;
const { Panel } = Collapse;

const ChangeWallet = () => {
  const { t } = useTranslation('dao');

  const [nowWallet, setNowWallet] = useState<string>('');
  const [isDelete, setIsDelete] = useState<boolean>(false);
  return (
    <>
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.15')}>
        <>
          <Select
            size="middle"
            suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
            popupClassName="select-size-md-dropdown"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            placeholder={t('governance.proposal.action.cases.infoContent.25')}
            className={cn('distant-contents')}
            onChange={(v) => setNowWallet(v)}
          >
            <Option value="Trust 지갑_01_NCP 수익보관용">Trust 지갑_01_NCP 수익보관용</Option>
            <Option value="Trust 지갑_02_신규 사업 추가">Trust 지갑_02_신규 사업 추가</Option>
            <Option value="Trust 지갑_03_신규 사업 추가">Trust 지갑_03_신규 사업 추가</Option>
          </Select>
          <Collapse
            expandIcon={() => <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
            className={cn('add-wallet-collapse')}
          >
            <Panel
              header={t('governance.proposal.action.cases.infoContent.26')}
              key="1"
              extra={<span>{t('governance.proposal.action.cases.infoContent.27')}</span>}
            >
              <InfoSection title={t('governance.proposal.action.cases.infoTitle.20')}>
                <Input placeholder={t('governance.proposal.action.cases.infoContent.29')} />
              </InfoSection>
              <InfoSection title={t('governance.proposal.action.cases.infoTitle.21')}>
                <Input placeholder={t('governance.proposal.action.cases.infoContent.29')} />
              </InfoSection>
              <InfoSection title={t('governance.proposal.action.cases.infoTitle.22')}>
                <Input value={'YYYY-MM-DD'} disabled />
              </InfoSection>
            </Panel>
          </Collapse>
        </>
      </InfoSection>
      {nowWallet !== '' && (
        <>
          <InfoSection title={t('governance.proposal.action.cases.infoTitle.20')}>
            <Input value={nowWallet} disabled={isDelete} />
          </InfoSection>
          <InfoSection title={t('governance.proposal.action.cases.infoTitle.21')}>
            <Input value={'0xabcdefghijklmnop1234567890abcd'} disabled={isDelete} />
          </InfoSection>
          <InfoSection title={t('governance.proposal.action.cases.infoTitle.22')}>
            <Input value={'YYYY-MM-DD'} disabled />
          </InfoSection>
          <InfoSection title={t('governance.proposal.action.cases.infoTitle.23')}>
            <Input value={'YYYY-MM-DD'} disabled />
          </InfoSection>
          <Checkbox defaultChecked={false} onChange={(v) => setIsDelete(v.target.checked)}>
            {t('governance.proposal.action.cases.infoContent.28')}
          </Checkbox>
        </>
      )}
    </>
  );
};

export default ChangeWallet;
