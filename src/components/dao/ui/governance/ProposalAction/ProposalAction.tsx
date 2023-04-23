// TODO : 삭제 예정
import { useState } from 'react';
import cn from 'classnames';
import { Select, Popover } from 'antd';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';

// action case
import UseOfTreasury from './case/UseOfTreasury';
import ChangeDAORevenueDistributionRatio from './case/ChangeDAORevenueDistributionRatio';
import ChangePurchaseDao from './case/ChangePurchaseDao';
import ChangeTreasuryCurrency from './case/ChangeTreasuryCurrency';
import ChangeProposalProgress from './case/ChangeProposalProgress';
import StationAdditional from './case/StationAdditional';
import ChangeWallet from './case/ChangeWallet';

const { Option } = Select;

const ProposalAction = () => {
  const { t } = useTranslation('dao');

  const [nowSelected, setNowSelected] = useState<string>('0');

  const ActionContents = () => {
    switch (nowSelected) {
      case '1':
        return <UseOfTreasury />;
      case '2':
        return <ChangeDAORevenueDistributionRatio />;
      case '3':
        return <ChangePurchaseDao />;
      case '4':
        return <ChangeTreasuryCurrency />;
      case '5':
        return <ChangeProposalProgress />;
      case '6':
        return <StationAdditional />;
      case '7':
        return <ChangeWallet />;
      default:
        return null;
    }
  };

  return (
    <div className={cn('proposal-action-wrap')}>
      <div className={cn('selector-wrap')}>
        <Select
          size="middle"
          // defaultValue="lucy"
          suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
          popupClassName="select-size-md-dropdown"
          getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          placeholder={t('governance.proposal.action.cases.dropdown.default')}
          className={cn('distant-contents', 'proposal-action-main-slider')}
          onChange={(v) => setNowSelected(v)}
        >
          <Option value="1">{t('governance.proposal.action.cases.dropdown.1')}</Option>
          <Option value="2">{t('governance.proposal.action.cases.dropdown.2')}</Option>
          <Option value="3">{t('governance.proposal.action.cases.dropdown.3')}</Option>
          <Option value="4">{t('governance.proposal.action.cases.dropdown.4')}</Option>
          <Option value="5">{t('governance.proposal.action.cases.dropdown.5')}</Option>
          <Option value="6">{t('governance.proposal.action.cases.dropdown.6')}</Option>
          <Option value="7">{t('governance.proposal.action.cases.dropdown.7')}</Option>
        </Select>
        <Popover
          overlayClassName="tooltip"
          placement="bottomRight"
          /* 23.03.20 수정: console에 i18next::translator: missingKey en dao governance.proposal.action.cases.popover.0 governance.proposal.action.cases.popover.0 에러로 인해 조건 추가 */
          content={
            nowSelected !== '0' && <div className={cn('tooltip-contents')}>{t('governance.proposal.action.cases.popover.' + nowSelected)}</div>
          }
          trigger="hover"
          getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          className={cn('proposal-tooltip', nowSelected === '0' && 'disabled')}
          arrowPointAtCenter
        >
          <button type="button">
            <span className={cn('a11y')}>tooltip</span>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
          </button>
        </Popover>
      </div>
      {nowSelected !== '0' && <div className={cn('proposal-action-contents-wrap')}>{ActionContents()}</div>}
    </div>
  );
};

export default ProposalAction;
