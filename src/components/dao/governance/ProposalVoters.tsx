import { useState, useEffect } from 'react';
import cn from 'classnames';

import { Table, Avatar } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';
import { ReactSVG } from 'react-svg';
import useMediaQuery from '@/hook/useMediaQuery';

import Empty from '@/components/empty/Empty';
import ProfileModal from '@/components/modal/ProfileModal';

interface Props {
  type: 'page' | 'popup';
  voteUnit: string;
  data: VoterTableItemType[];
}

export interface VoterTableItemType {
  voter: {
    profileImg: string | undefined;
    name: string;
  };
  vote: 'for' | 'against';
  amount: number;
  date?: number;
}

const ProposalVoters = ({ type, voteUnit, data }: Props) => {
  const { t } = useTranslation('dao');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  // daoTreasuryData 필터된 데이터
  const [daoTreasuryData, setDaoTreasuryData] = useState<any>();

  const filterHandler = (keydata: any) => {
    let AllBtn = document.querySelectorAll('.filter-custom button');
    let elBtn = keydata.target;
    let keyCol = keydata.target.dataset.col;
    let ActiveCol: (string | number)[] = [];
    let ActiveName: (string | number)[] = [];

    // 선택한 필터가 전체 라면 걍 닫힘 체크 유지
    if (elBtn.name === 'all' && elBtn.className === 'active') {
      closeDropDown();
      return false;
    }

    // 클릭한 필터가 선택된 상태라면
    if (elBtn.className === 'active') {
      // 선택을 지운다
      elBtn.classList.remove('active');
    } else {
      // 클릭한 필터가 처음 선택한 필터라면  (선택된 상태 x)
      AllBtn.forEach((el: any) => {
        // 해당 컬럼을 찾는다
        if (el.dataset.col === keyCol) {
          // 해당 컬럼에 모든필터 선택을 푼다
          el.classList.remove('active');
        }
      });
      // 해당값만 필터를 선택
      elBtn.classList.add('active');
    }

    // 선택된 필터를 찾는다
    let ActiveBtn: any = document.querySelectorAll('.filter-custom button.active');

    // 선택된 필터의 컬럼값과 값을 찾고 변수에 담아준다
    for (let i = 0; i < ActiveBtn.length; i++) {
      ActiveCol[i] = ActiveBtn[i].dataset.col;
      ActiveName[i] = ActiveBtn[i].name;
    }

    // 변수에 담은 필터값(컬럼, 값)을 필터 시켜준다

    let newArray = data.filter((el: any) => {
      if (ActiveName[0] === 'all') {
        return el;
      } else {
        return el[ActiveCol[0]] === ActiveName[0];
      }
    });

    closeDropDown();
    setDaoTreasuryData(newArray);
  };

  const closeDropDown = () => {
    setOpenFilter(false);
  };

  const TableColumns: ColumnsType<VoterTableItemType> = [
    {
      title: t('governance.proposal.voterTable.th.1'),
      dataIndex: 'voter',
      key: 'voter',
      align: 'center',
      width: isMobile ? 128 : '25%',
      render: (_, { voter }) => (
        <button
          type="button"
          className={cn('user-wrap')}
          onClick={() => {
            setIsModal(true);
          }}
        >
          <Avatar className={cn('user-image')} size={28} style={{ backgroundImage: `url(${voter.profileImg})` }}>
            <span className={cn('a11y')}>프로필 열기</span>
          </Avatar>
          <span className={cn('user-id')}>{voter.name}</span>
        </button>
      ),
    },
    {
      title: t('governance.proposal.voterTable.th.3'),
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      width: isMobile ? 210 : '25%',
      sorter: (a, b) => (a.amount ?? 0) - (b.amount ?? 0),
      render: (_, { amount }) => (
        <div className={cn('figure-wrap', type)}>
          <span className={cn('figure')}>{amount}</span>
          <span className={cn('unit')}>{voteUnit}</span>
        </div>
      ),
    },
    {
      title: t('governance.proposal.voterTable.th.2'),
      dataIndex: 'vote',
      key: 'vote',
      align: 'center',
      width: isMobile ? 128 : '25%',
      filterIcon: (filtered) => <ReactSVG src="https://nile.blob.core.windows.net/images/icons/ico_table_filter.svg" />,
      filterDropdownOpen: openFilter,
      onFilterDropdownOpenChange: () => {
        setOpenFilter(!openFilter);
      },
      filterDropdown: () => (
        <div className={cn('filter-custom')}>
          <ul>
            <li>
              <button type="button" name="all" data-col="vote" className={'active'} onClick={filterHandler}>
                {t('governance.proposal.entire')}
              </button>
            </li>
            <li>
              <button type="button" name="for" data-col="vote" onClick={filterHandler}>
                {t('governance.proposal.for')}
              </button>
            </li>
            <li>
              <button type="button" name="against" data-col="vote" onClick={filterHandler}>
                {t('governance.proposal.against')}
              </button>
            </li>
          </ul>
        </div>
      ),
      render: (_, { vote }) => <span>{t('governance.proposal.' + vote)}</span>,
    },
    {
      title: t('governance.proposal.voterTable.th.4'),
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      width: isMobile ? 128 : '25%',
      sorter: (a, b) => (a.date ?? 0) - (b.date ?? 0),
      render: (_, { date }) => <span>{dayjs.utc(date).local().format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];

  return (
    <div className={cn('proposal-voters-wrap', type)}>
      <Table
        className={cn('table-type-lg')}
        columns={TableColumns}
        dataSource={daoTreasuryData ? daoTreasuryData : data}
        pagination={type === 'page' && false}
        scroll={{ x: isMobile ? 594 : undefined }}
        locale={{
          emptyText: <Empty iconType="filter" subText={t('governance.proposal.voterTable.empty')} />,
        }}
      />
      <ProfileModal
        isOpen={isModal}
        setIsOpen={setIsModal}
        nileUser={{
          nickname: 'Polaris Liu',
          address: '0x65b2...1413',
          url: 'https://joeschmoe.io/api/v1/random',
        }}
      />
    </div>
  );
};

export default ProposalVoters;
