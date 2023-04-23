import { useState } from 'react';
import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Tag from '@/components/tag/Tag';
import PaginationCustom from '@/components/button/PaginationCustom';

interface DaoNoticeDataType {
  key?: string;
  title: string;
  date: string;
  isNew: boolean;
  hasAttachment: boolean;
}

const DaoNotice = () => {
  const { t } = useTranslation();

  const [activatePagination, setPaginationActivate] = useState(1);

  const onChange = (page: number, pageSize: number) => {
    setPaginationActivate(page);
  };

  const daoNotice: DaoNoticeDataType[] = [
    // {
    //   key: '1',
    //   title: 'Trust 신규 투자에 관한 DAO Maker 공지사항',
    //   date: '2023-04-01 13:30',
    //   isNew: true,
    //   hasAttachment: false,
    // },
    // {
    //   key: '2',
    //   title: 'Trust 신규 투자에 관한 DAO Maker 공지사항',
    //   date: '2023-04-01 13:30',
    //   isNew: true,
    //   hasAttachment: false,
    // },
    // {
    //   key: '3',
    //   title: 'Trust 신규 투자에 관한 DAO Maker 공지사항',
    //   date: '2023-04-01 13:30',
    //   isNew: false,
    //   hasAttachment: false,
    // },
    // {
    //   key: '4',
    //   title: 'Trust 신규 투자에 관한 DAO Maker 공지사항',
    //   date: '2023-04-01 13:30',
    //   isNew: false,
    //   hasAttachment: false,
    // },
    // {
    //   key: '5',
    //   title:
    //     'Trust 신규 투자에 관한 DAO Maker 공지사항Trust 신규 투자에 관한 DAO Maker 공지사항Trust 신규 투자에 관한 DAO Maker 공지사항Trust 신규 투자에 관한 DAO Maker 공지사항Trust 신규 투자에 관한 DAO Maker 공지사항Trust 신규 투자에 관한 DAO Maker 공지사항Trust 신규 투자에 관한 DAO Maker 공지사항Trust 신규 투자에 관한 DAO Maker 공지사항Trust 신규 투자에 관한 DAO Maker 공지사항Trust 신규 투자에 관한 DAO Maker 공지사항',
    //   date: '2023-04-01 13:30',
    //   isNew: true,
    //   hasAttachment: false,
    // },
  ];

  return (
    <div className={cn('notice-list-wrap')}>
      <ul className={cn('notice-list-inner')}>
        {daoNotice.map((list, index) => (
          <li className={cn('notice-title-wrap')} key={list.key}>
            {list.isNew && (
              <Tag size="s" color="dark-gray">
                NEW
              </Tag>
            )}
            <Link href={`/dao/wonder/trust/notice/${list.key}`}>
              <a className={cn('title')}>{list.title}</a>
            </Link>
            <div className={cn('date-wrap')}>
              <span className={cn('date')}>{list.date}</span>
              {list.hasAttachment && (
                <ReactSVG className={cn('attachment')} src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_attachment.svg" />
              )}
            </div>
          </li>
        ))}
      </ul>
      <PaginationCustom defaultCurrent={1} defaultPageSize={10} total={100} onChange={onChange} activate={activatePagination} />
    </div>
  );
};

export default DaoNotice;
