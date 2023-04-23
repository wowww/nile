import cn from 'classnames';
import { Table, Avatar } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import ProfileModal from '@/components/modal/ProfileModal';
import { useTranslation } from 'next-i18next';
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
import Empty from '@/components/empty/Empty';
import PaginationCustom from '@/components/button/PaginationCustom';
import React from 'react';
import useMediaQuery from '@/hook/useMediaQuery';
import TextButton from '@/components/button/TextButton';
/* 23.04.10 수정: useDaoCharacterConvert 추가 */
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

interface MembersTableDataType {
  member: string;
  profileImgUrl: string;
  ranking: number;
  amountVotes: number;
  vote: number;
  proposal: number;
  discussion: number;
}

const MembersTable = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [activatePagination, setPaginationActivate] = useState(1);

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isLg = useMediaQuery('(max-width: 1023px)');
  const isPC = useMediaQuery('(min-width: 1440px)');

  const onChange = (page: number, pageSize: number) => {
    // 현재 active 된 페이지 체크
    setPaginationActivate(page);
  };

  const countColumnWidth = !isPC && !isLg ? 508 / 3 : 605 / 3;

  useEffect(() => {
    if (isModal) {
      document.body.classList.add('not-lock');
    } else {
      document.body.classList.remove('not-lock', 'lock');
      document.documentElement.style.removeProperty('--scroll');
    }
  }, [isModal]);
  const MembersTableColumns: ColumnsType<MembersTableDataType> = [
    {
      title: '',
      dataIndex: 'ranking',
      key: 'ranking',
      align: 'center',
      width: 44,
      render: (_, { ranking }, index) => <span>{index + 1}</span>,
      fixed: 'left',
    },
    {
      title: t('governance.membersTable.column.1'),
      dataIndex: 'members',
      key: 'members',
      align: 'center',
      width: 124,
      render: (_, { member, profileImgUrl }) => (
        <button
          className={cn('member-cell')}
          onClick={() => {
            setIsModal(true);
          }}
        >
          <Avatar className={cn('user-image')} size={20} style={profileImgUrl !== undefined ? { backgroundImage: `url(${profileImgUrl})` } : {}}>
            <span className={cn('a11y')}>프로필 열기</span>
          </Avatar>
          {/* 23.03.29 수정: hover 효과 변경으로 인한 클래스 추가 */}
          <span className={cn('wallet-address')}>{member}</span>
        </button>
      ),
      fixed: 'left',
    },
    {
      /* 23.04.10 수정: title 다국어 type 추가 */
      title: t('governance.membersTable.column.2', { type: useDaoCharacterConvert(activeDao.value) }),
      dataIndex: 'amountVotes',
      key: 'amountVotes',
      align: 'right',
      width: 260,
      sortDirections: ['descend', 'descend', 'descend'],
      render: (_, { amountVotes }) => (
        <span>
          {Number(amountVotes)
            .toFixed(3)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
          {t('unit2', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })}
        </span>
      ),
      sorter: (a, b) => (a.amountVotes ?? 0) - (b.amountVotes ?? 0),
      defaultSortOrder: 'descend',
    },
    {
      title: t('governance.membersTable.column.3'),
      dataIndex: 'vote',
      key: 'vote',
      align: 'center',
      width: countColumnWidth,
      sortDirections: ['descend', 'descend', 'descend'],
      render: (_, { vote }) => <span>{vote}</span>,
      sorter: (a, b) => (a.vote ?? 0) - (b.vote ?? 0),
    },
    {
      title: t('governance.membersTable.column.4'),
      dataIndex: 'proposal',
      key: 'proposal',
      align: 'center',
      width: countColumnWidth,
      sortDirections: ['descend', 'descend', 'descend'],
      render: (_, { proposal }) => <span>{proposal}</span>,
      sorter: (a, b) => (a.proposal ?? 0) - (b.proposal ?? 0),
    },
    {
      title: t('governance.membersTable.column.5'),
      dataIndex: 'discussion',
      key: 'discussion',
      align: 'center',
      width: countColumnWidth,
      sortDirections: ['descend', 'descend', 'descend'],
      render: (_, { discussion }) => <span>{discussion}</span>,
      sorter: (a, b) => (a.discussion ?? 0) - (b.discussion ?? 0),
    },
  ];

  const MembersTableData: MembersTableDataType[] = [
    {
      member: '0xabcd...abcd',
      profileImgUrl: 'https://picsum.photos/32/32/?image=1',
      ranking: 1,
      amountVotes: 1.7,
      vote: 40,
      proposal: 1,
      discussion: 1,
    },
  ];

  // UI 테스트용 더미 데이터 생성 로직
  const [tableDummy, setTableDummy] = useState<MembersTableDataType[]>([]);
  useEffect(() => {
    let temp = [] as MembersTableDataType[];
    const dummy = {
      member: '0xabcd...abcd',
      profileImgUrl: 'https://picsum.photos/32/32/?image=1',
      ranking: 1,
      amountVotes: 10000000,
      vote: 40,
      proposal: 1,
      discussion: 1,
      key: '',
    };
    for (let i = 0; i < 20; i++) {
      dummy.ranking = i + 1;
      dummy.vote = i + 40;
      dummy.key = `${'key' + i}`;
      temp.push({ ...dummy });
    }
    /* 23.03.14 수정: 주석 처리시 empty 케이스 / 주석 해제시 전체 멤버는 들어간 더미데이터 갯수 */
    setTableDummy([...temp]);
  }, []);

  return (
    <div className={cn('governance-members')}>
      <strong className={cn('title')}>{t('governance.membersTable.title')}</strong>
      <div className={cn('dao-members-table-desc-row')}>
        <span>
          <span className={cn('info-name')}>{t('governance.membersTable.total')}</span>
          <span className={cn('figure')}>{tableDummy.length}</span>
        </span>
        <span className={cn('date')}>
          {t('governance.membersTable.date')}: {'2022-07-01'}
        </span>
      </div>

      {!tableDummy || tableDummy.length === 0 ? (
        <Empty subText={t('governance.membersTable.emptyMembers')} />
      ) : (
        <React.Fragment>
          <Table
            className={cn('table-type-lg', 'dao-members-table')}
            columns={MembersTableColumns}
            dataSource={tableDummy}
            pagination={false}
            scroll={isLg ? { x: 1033 } : {}}
          />
          <div className={cn('dao-table-more-btn-wrap')}>
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
          </div>
        </React.Fragment>
      )}
      {isModal && (
        <ProfileModal
          isOpen={isModal}
          setIsOpen={setIsModal}
          nileUser={{
            nickname: 'Polaris Liu',
            address: '0x65b2...1413',
            img: 'https://joeschmoe.io/api/v1/random',
          }}
        />
      )}
    </div>
  );
};

export default MembersTable;
