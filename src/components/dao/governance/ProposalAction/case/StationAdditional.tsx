import { useState } from 'react';
import cn from 'classnames';
import InfoSection from '../InfoSection';
import InputUnit from '../InputUnit';
import ButtonInput from '../ButtonInput';
import { Select } from 'antd';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

const { Option } = Select;

const StationAdditional = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);

  const [nowUnit, setNowUnit] = useState<string>('');
  return (
    <>
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.10')}>
        <InputUnit unit={t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })} />
      </InfoSection>
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.14')}>
        <ButtonInput unit="Days" />
      </InfoSection>
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.15')}>
        <Select
          size="middle"
          suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
          popupClassName="select-size-md-dropdown"
          getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          placeholder={t('governance.proposal.action.cases.infoContent.24')}
          className={cn('distant-contents')}
          onChange={(v) => setNowUnit(v)}
        >
          <Option value="WEMIX">WEMIX</Option>
          <Option value="WEMIX$">WEMIX$</Option>
          <Option value="USDC">USDC</Option>
        </Select>
      </InfoSection>
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.16')}>
        <InputUnit unit="WEMIX" />
      </InfoSection>
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.17')}>
        <InputUnit unit="WEMIX" />
      </InfoSection>
      <InfoSection title={t('governance.proposal.action.cases.infoTitle.18')}>
        <InputUnit unit="WEMIX" />
      </InfoSection>
    </>
  );
};

export default StationAdditional;
