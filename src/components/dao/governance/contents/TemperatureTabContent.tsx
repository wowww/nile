import React, { Dispatch, SetStateAction, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import RadioTab from '@components/tokens/RadioTab';
import { Radio, RadioChangeEvent, Select, Switch } from 'antd';
import { temperatureData } from './data';
import TextButton from '@/components/button/TextButton';
import GovernanceCard from './GovernanceCard';
import { ReactSVG } from 'react-svg';
import useMediaQuery from '@/hook/useMediaQuery';
import OutlineButton from '@/components/button/OutlineButton';
import ModalLayout from '@/components/modal/ModalLayout';
import BgButton from '@/components/button/BgButton';
import { useWonder } from '@/hook/useWonder';

export type selectType = {
  value: string;
  label: React.ReactNode;
};

export type chipsListType = {
  chipsList: {
    name: string;
    value: string;
    count: number;
  }[];
  type: string;
};

type sortFilter = {
  type: string;
};

const TemperatureTabContent = ({ chipsList, type }: chipsListType) => {
  const { t } = useTranslation(['dao', 'common']);
  const { wonderProposals } = useWonder();

  return (
    <>
      <ChipsFilter chipsList={chipsList} type={type} />
      <div className={cn('content-wrap')}>
        <div className={cn('governance-contents')}>
          {wonderProposals &&
            wonderProposals.map((proposal, i) => (
              <React.Fragment key={proposal?.id + i}>
                <GovernanceCard views={0} commentCount={0} proposal={proposal} />
              </React.Fragment>
            ))}

          {temperatureData && (
            <TextButton
              buttonText={t('governance.membersTable.showMore')}
              size={'sm'}
              type={'text'}
              direction={'bottom'}
              iconValue={'arrow'}
              onClick={() => {
                return;
              }}
            />
          )}

          {!temperatureData && <GovernanceEmpty />}
        </div>
      </div>
    </>
  );
};

export const ChipsFilter = ({ chipsList, type }: chipsListType) => {
  const { t } = useTranslation(['dao', 'common']);
  const [isFilterModal, setFilterModal] = useState(false);
  const isDaoTablet = useMediaQuery('(max-width: 1023px)');
  const [nowTab, setNowTab] = useState<string>('all');

  const btnListSm: selectType[] = [];

  const setBtnListSm = () => {
    return chipsList.forEach((value, index) => {
      btnListSm[index] = {
        value: value.value,
        label: `${value.name} (${value.count})`,
      };
    });
  };

  if (chipsList.length !== 0 && chipsList !== undefined) setBtnListSm();
  return (
    <div className="content-filters">
      {!isDaoTablet ? (
        <div className="content-radio-group">
          <RadioTab btnList={chipsList} nowTab={nowTab} setNowTab={setNowTab} chipSize="sm" />
        </div>
      ) : (
        <>
          {/* 23.03.30 수정: select, outlinebutton 사이즈 변경 sm -> basic, sm -> md */}
          <Select
            defaultValue={btnListSm[0]}
            suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
            popupClassName="select-size-sm-dropdown"
            placement="bottomRight"
            dropdownMatchSelectWidth={false}
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            options={btnListSm}
          />
          <OutlineButton
            color="highlight"
            buttonText={t('governance.filters')}
            size="md"
            iconType={true}
            iconValue={'filter'}
            align={true}
            onClick={() => setFilterModal(true)}
          />
          <FilterModal isFilterModal={isFilterModal} setFilterModal={setFilterModal} />
        </>
      )}
      {!isDaoTablet && <SortFilter type={type} />}
    </div>
  );
};

// sorting
export const SortFilter = ({ type }: sortFilter) => {
  const { t } = useTranslation(['dao', 'common']);
  const options = [
    { value: 'all', label: `${t('governance.agenda.item.0')}` },
    { value: '1', label: `${t('governance.agenda.item.1')}` },
    { value: '2', label: `${t('governance.agenda.item.2')}` },
    { value: '3', label: `${t('governance.agenda.item.3')}` },
    { value: '4', label: `${t('governance.agenda.item.4')}` },
    { value: '5', label: `${t('governance.agenda.item.5')}` },
    { value: '6', label: `${t('governance.agenda.item.6')}` },
    { value: '7', label: `${t('governance.agenda.item.7')}` },
    { value: '8', label: `${t('governance.agenda.item.8')}` },
  ];
  const govOptions = options.concat({ value: '9', label: `${t('governance.agenda.item.9')}` });

  return (
    <div className="content-select-group">
      <Select
        defaultValue="all"
        suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
        popupClassName="select-size-sm-dropdown"
        placement="bottomRight"
        dropdownMatchSelectWidth={false}
        getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
        options={type === 'governance' ? govOptions : options}
      />
      <Select
        defaultValue="latest"
        suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
        popupClassName="select-size-sm-dropdown"
        placement="bottomRight"
        dropdownMatchSelectWidth={false}
        getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
        options={[
          { value: 'latest', label: `${t('governance.proposal.dropdown2.option1')}` },
          { value: 'endImminent', label: `${t('governance.proposal.dropdown2.option2')}` },
          {
            value: 'participationToken',
            label: type === 'temperature' ? `${t('governance.proposal.dropdown2.option3')}` : `${t('governance.proposal.dropdown2.option4')}`,
          },
        ]}
      />
    </div>
  );
};

// 필터 팝업
export const FilterModal = ({ isFilterModal, setFilterModal }: { isFilterModal: boolean; setFilterModal: Dispatch<SetStateAction<boolean>> }) => {
  const { t } = useTranslation(['dao', 'common']);
  const governanceCategoryList = t('governance.agenda.item', { returnObjects: true });
  const governanceAlignList = t('governance.proposal.dropdown2', { returnObjects: true });
  const [radioValue1, setRadioValue1] = useState(0);
  const [radioValue2, setRadioValue2] = useState(0);
  const onChangeRadio1 = (e: RadioChangeEvent) => {
    setRadioValue1(e.target.value);
  };
  const onChangeRadio2 = (e: RadioChangeEvent) => {
    setRadioValue2(e.target.value);
  };
  return (
    <ModalLayout
      isOpen={isFilterModal}
      setIsOpen={setFilterModal}
      title={t('governance.filters')}
      size="md"
      footer={true}
      destroyOnClose={true}
      footerContent={[
        <BgButton
          buttonText={t('governance.filter.apply')}
          color="highlight"
          size="full"
          key="Okay"
          onClick={() => {
            setFilterModal(false);
          }}
        />,
      ]}
    >
      <ul className={cn('governance-filter-modal-content')}>
        <li className={cn('list')}>
          <div className={cn('title')}>
            <strong>{t('governance.viewMyAgenda')}</strong>
            <Switch />
          </div>
        </li>
        <li className={cn('list')}>
          <div className={cn('title')}>
            <strong>{t('governance.filter.category')}</strong>
          </div>

          <Radio.Group className={cn('governance-filter-inner-list')} name="radio-group" onChange={onChangeRadio1} value={radioValue1}>
            {Object.keys(governanceCategoryList).map((category, index) => (
              <Radio value={index} children={t(`governance.agenda.item.${index}`)} key={`category-radio-${index}`} />
            ))}
          </Radio.Group>
        </li>
        <li className={cn('list')}>
          <div className={cn('title')}>
            <strong>{t('governance.filter.align')}</strong>
          </div>

          <Radio.Group className={cn('governance-filter-inner-list')} name="radio-group" onChange={onChangeRadio2} value={radioValue2}>
            {Object.keys(governanceAlignList).map((align, index) => (
              <Radio value={index} children={t(`governance.proposal.dropdown2.option${index + 1}`)} key={`align-radio-${index}`} />
            ))}
          </Radio.Group>
        </li>
      </ul>
    </ModalLayout>
  );
};

// empty 케이스
export const GovernanceEmpty = () => {
  const { t } = useTranslation(['dao', 'common']);
  return (
    <div className={cn('empty')}>
      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_empty.svg" />
      <p>{t('governance.noOffer')}</p>
    </div>
  );
};

export default TemperatureTabContent;
