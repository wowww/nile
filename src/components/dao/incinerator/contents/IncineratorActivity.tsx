import cn from 'classnames';
import { Popover, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import IconAmount from '@images/icon/ico_amount.svg';
import IconPurchase from '@images/icon/ico_purchase.svg';
import IconTableFilter from '@public/icons/ico_table_filter.svg';
import IconArrow from '@images/icon/ico_arrow_16.svg';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';
import { isArray } from 'lodash';
import IconInfo from '@images/icon/ico_info.svg';
import { daoThemeAtom } from '@/state/daoAtom';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

const { Option } = Select;
interface IncineratorTableDataType {
  key?: string;
  date: string;
  status: string;
  amount: string | string[];
  unit: string | string[];
  from?: string;
  to?: string;
  type: string;
}

export const IncineratorActivity = () => {
//   const { t } = useTranslation('dao');
//   const [size, setSize] = useState('lg');
//
//   const selectList = [
//     t('trust.activity.select.0'),
//     'WONDER DAO_NCP Investment',
//     'WONDER DAO 1',
//     'WONDER DAO 2',
//     'WONDER DAO 3',
//     'WONDER DAO 4',
//     'WONDER DAO 5',
//     'WONDER DAO 6',
//     'WONDER DAO 7',
//     'WONDER DAO 8',
//   ];
//
//   const [openFilter, setOpenFilter] = useState<boolean>(false);
//   const [openFilter2, setOpenFilter2] = useState<boolean>(false);
//   const [openFilter3, setOpenFilter3] = useState<boolean>(false);
//   const [openFilter4, setOpenFilter4] = useState<boolean>(false);
//   const [openFilter5, setOpenFilter5] = useState<boolean>(false);
//   const [selectValue, setSelectValue] = useState<string>(selectList[0]);
//
//   // pagination 사용시 필요한 부분 Start
//   const [activatePagination, setPaginationActivate] = useState(1);
//
//   const onChange = (page: number, pageSize: number) => {
//     // 현재 active 된 페이지 체크
//     setPaginationActivate(page);
//   };
//   // pagination 사용시 필요한 부분 End
//
//   /* 23.02.21 수정: 함수명 변경 */
//   const [daoIncineratorData, setDaoIncineratorData] = useState<IncineratorTableDataType[] | any>();
//   // 테이블 더보기 숫자 스테이트
//   const [showNumber, setShowNumber] = useState(5);
//
//   const offset = useAtomValue(windowResizeAtom);
//   const activeDao = useAtomValue(daoThemeAtom);
//
//   // 필터 함수
//   const filterHandler = (keydata: any) => {
//     let AllBtn = document.querySelectorAll('.filter-custom button');
//     let elBtn = keydata.target;
//     let keyCol = keydata.target.dataset.col;
//     let ActiveCol: (string | number)[] = [];
//     let ActiveName: (string | number)[] = [];
//
//     // 클릭한 필터가 선택된 상태라면
//     if (elBtn.className === 'active') {
//       // 선택을 지운다
//       elBtn.classList.remove('active');
//     } else {
//       // 클릭한 필터가 처음 선택한 필터라면  (선택된 상태 x)
//       AllBtn.forEach((el: any) => {
//         // 해당 컬럼을 찾는다
//         if (el.dataset.col === keyCol) {
//           // 해당 컬럼에 모든필터 선택을 푼다
//           el.classList.remove('active');
//         }
//       });
//       // 해당값만 필터를 선택
//       elBtn.classList.add('active');
//     }
//
//     // 선택된 필터를 찾는다
//     let ActiveBtn: any = document.querySelectorAll('.filter-custom button.active');
//
//     // 선택된 필터의 컬럼값과 값을 찾고 변수에 담아준다
//     for (let i = 0; i < ActiveBtn.length; i++) {
//       ActiveCol[i] = ActiveBtn[i].dataset.col;
//       ActiveName[i] = ActiveBtn[i].name;
//     }
//
//     // 변수에 담은 필터값(컬럼, 값)을 필터 시켜준다
//     let newArray = daoIncinerator.filter((el: any) => {
//       return (
//         el[ActiveCol[0]] === ActiveName[0] &&
//         el[ActiveCol[1]] === ActiveName[1] &&
//         el[ActiveCol[2]] === ActiveName[2] &&
//         el[ActiveCol[3]] === ActiveName[3] &&
//         el[ActiveCol[4]] === ActiveName[4]
//       );
//     });
//
//     closeDropDown();
//     /* 23.02.21 수정: 함수명 변경 */
//     setDaoIncineratorData(newArray);
//   };
//
//   const showMore = () => {
//     if (daoIncineratorData?.length > 4 && daoIncineratorData?.length > showNumber) {
//       return (
//         <div className={cn('show-more-btn')}>
//           <button type="button">
//             {t('daoActivityTable.table.showBtn')} <IconArrow />
//           </button>
//         </div>
//       );
//     } else {
//       return false;
//     }
//   };
//
//   const closeDropDown = () => {
//     setOpenFilter(false);
//     setOpenFilter2(false);
//     setOpenFilter3(false);
//     setOpenFilter4(false);
//     setOpenFilter5(false);
//   };
//
//   const onChangeSelect = (value: string) => {
//     setSelectValue(value);
//   };
//
//   const daoIncinerator: IncineratorTableDataType[] = [
//     {
//       key: '1',
//       date: '2022-07-01 12:00:00',
//       /**
//        * 입금: daoActivityTable.table.td1,
//        * 출금: daoActivityTable.table.td2,
//        * 매입: daoActivityTable.table.td3,
//        * 출금(소각): daoActivityTable.table.td4,
//        */
//       status: t('daoActivityTable.table.td1'),
//       amount: '5,000,000.0000',
//       unit: 'WEMIX',
//       from: 'Trust',
//       to: 'Incinerator',
//       type: 'inflow',
//     },
//     {
//       key: '2',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td3'),
//       amount: ['2,000,000.0000', '2,400.0000'],
//       /* 23.02.23 수정: WDR 티커 단위 다국어 처리 */
//       unit: ['WEMIX', t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })],
//       from: 'Incinerator',
//       /* 23.02.20 수정: 메뉴명 변경 */
//       to: 'WEMIX.Fi',
//       type: 'purchase',
//     },
//     {
//       key: '3',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td4'),
//       amount: '5,000,000.0000',
//       /* 23.02.23 수정: WDR 티커 단위 다국어 처리 */
//       unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
//       from: 'Incinerator',
//       to: 'Burn',
//       type: 'burn',
//     },
//     {
//       key: '4',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td2'),
//       amount: '5,000,000.0000',
//       /* 23.02.23 수정: WDR 티커 단위 다국어 처리 */
//       unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
//       from: 'Incinerator',
//       to: 'Obelisk',
//       type: 'outflow',
//     },
//     {
//       key: '5',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td1'),
//       amount: '5,000,000.0000',
//       unit: 'WEMIX',
//       from: 'Trust',
//       to: 'Incinerator',
//       type: 'inflow',
//     },
//     {
//       key: '6',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td3'),
//       amount: ['2,000,000.0000', '2,400.0000'],
//       unit: ['WEMIX'],
//       from: 'Incinerator',
//       /* 23.02.20 수정: 메뉴명 변경 */
//       to: 'WEMIX.Fi',
//       type: 'purchase',
//     },
//     {
//       key: '7',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td4'),
//       amount: '5,000,000.0000',
//       /* 23.02.23 수정: WDR 티커 단위 다국어 처리 */
//       unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
//       from: 'Incinerator',
//       to: 'Burn',
//       type: 'burn',
//     },
//     {
//       key: '8',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td2'),
//       amount: '5,000,000.0000',
//       /* 23.02.23 수정: WDR 티커 단위 다국어 처리 */
//       unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
//       from: 'Incinerator',
//       to: 'Obelisk',
//       type: 'outflow',
//     },
//     {
//       key: '9',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td1'),
//       amount: '5,000,000.0000',
//       unit: 'WEMIX',
//       from: 'Trust',
//       to: 'Incinerator',
//       type: 'inflow',
//     },
//     {
//       key: '10',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td3'),
//       amount: ['2,000,000.0000', '2,400.0000'],
//       unit: ['WEMIX', t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })],
//       from: 'Incinerator',
//       /* 23.02.20 수정: 메뉴명 변경 */
//       to: 'WEMIX.Fi',
//       type: 'purchase',
//     },
//     {
//       key: '11',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td4'),
//       amount: '5,000,000.0000',
//       /* 23.02.23 수정: WDR 티커 단위 다국어 처리 */
//       unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
//       from: 'Incinerator',
//       to: 'Burn',
//       type: 'burn',
//     },
//     {
//       key: '12',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td2'),
//       amount: '5,000,000.0000',
//       /* 23.02.23 수정: WDR 티커 단위 다국어 처리 */
//       unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
//       from: 'Incinerator',
//       to: 'Obelisk',
//       type: 'outflow',
//     },
//     {
//       key: '13',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td1'),
//       amount: '5,000,000.0000',
//       unit: 'WEMIX',
//       from: 'Trust',
//       to: 'Incinerator',
//       type: 'inflow',
//     },
//     {
//       key: '14',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td3'),
//       amount: ['2,000,000.0000', '2,400.0000'],
//       /* 23.02.23 수정: WDR 티커 단위 다국어 처리 */
//       unit: ['WEMIX', t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })],
//       from: 'Incinerator',
//       /* 23.02.20 수정: 메뉴명 변경 */
//       to: 'WEMIX.Fi',
//       type: 'purchase',
//     },
//     {
//       key: '15',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td4'),
//       amount: '5,000,000.0000',
//       /* 23.02.23 수정: WDR 티커 단위 다국어 처리 */
//       unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
//       from: 'Incinerator',
//       to: 'Burn',
//       type: 'burn',
//     },
//     {
//       key: '16',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td2'),
//       amount: '5,000,000.0000',
//       unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
//       from: 'Incinerator',
//       to: 'Obelisk',
//       type: 'outflow',
//     },
//     {
//       key: '17',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td1'),
//       amount: '5,000,000.0000',
//       unit: 'WEMIX',
//       from: 'Trust',
//       to: 'Incinerator',
//       type: 'inflow',
//     },
//     {
//       key: '18',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td3'),
//       amount: ['2,000,000.0000', '2,400.0000'],
//       /* 23.02.23 수정: WDR 티커 단위 다국어 처리 */
//       unit: ['WEMIX', t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` })],
//       from: 'Incinerator',
//       /* 23.02.20 수정: 메뉴명 변경 */
//       to: 'WEMIX.Fi',
//       type: 'purchase',
//     },
//     {
//       key: '19',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td4'),
//       amount: '5,000,000.0000',
//       unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
//       from: 'Incinerator',
//       to: 'Burn',
//       type: 'burn',
//     },
//     {
//       key: '20',
//       date: '2022-07-01 12:00:00',
//       status: t('daoActivityTable.table.td2'),
//       amount: '5,000,000.0000',
//       /* 23.02.23 수정: WDR 티커 단위 다국어 처리 */
//       unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
//       from: 'Incinerator',
//       to: 'Obelisk',
//       type: 'outflow',
//     },
//   ];
//   const DaoFilterColumns: ColumnsType<IncineratorTableDataType> = [
//     {
//       title: t('daoActivityTable.table.th1'),
//       dataIndex: 'date',
//       key: 'date',
//       width: size === 'lg' ? '206px' : '85px',
//       align: 'center',
//       sorter: (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf(),
//     },
//     {
//       title: t('daoActivityTable.table.th2'),
//       dataIndex: 'status',
//       key: 'status',
//       width: size === 'lg' ? '206px' : '85px',
//       align: 'right',
//       render: (_, { type, status }) => {
//         return (
//           <span className={cn('amount-td', type === 'outflow' || type === 'burn' ? 'outflow' : '')}>
//             {type === 'purchase' ? <IconPurchase /> : <IconAmount />}
//             {status}
//           </span>
//         );
//       },
//       filterIcon: (filtered) => <IconTableFilter />,
//       filterDropdownOpen: openFilter,
//       onFilterDropdownOpenChange: () => {
//         setOpenFilter(!openFilter);
//       },
//       filterDropdown: () => (
//         <div className={cn('filter-custom')}>
//           <ul>
//             <li>
//               <button type="button" name="Inflow" data-col="status" onClick={filterHandler}>
//                 {/* 23.02.21 수정: 다국어 처리 수정 */}
//                 {t('daoActivityTable.table.td1')}
//               </button>
//             </li>
//             <li>
//               <button type="button" name="Outflow" data-col="status" onClick={filterHandler}>
//                 {/* 23.02.21 수정: 다국어 처리 수정 */}
//                 {t('daoActivityTable.table.td3')}
//               </button>
//             </li>
//             <li>
//               <button type="button" name="Inflow" data-col="status" onClick={filterHandler}>
//                 {/* 23.02.21 수정: 다국어 처리 수정 */}
//                 {t('daoActivityTable.table.td2')}
//               </button>
//             </li>
//             <li>
//               {/* 23.02.21 수정: name 값 수정 */}
//               <button type="button" name="Outflow(Burn)" data-col="status" onClick={filterHandler}>
//                 {/* 23.02.21 수정: 다국어 처리 수정 */}
//                 {t('daoActivityTable.table.td4')}
//               </button>
//             </li>
//           </ul>
//         </div>
//       ),
//     },
//     {
//       title: t('daoActivityTable.table.th3'),
//       dataIndex: ['amount', 'unit'],
//       key: 'amount',
//       width: size === 'lg' ? '206px' : '147px',
//       align: 'right',
//       render: (_, { type, amount, unit }) => {
//         if (type === 'purchase') {
//           return (
//             <div className={cn('purchase-amount-cell')}>
//               <span className={cn('amount-td')}>
//                 <IconAmount /> {isArray(amount) && amount[0]} {unit[0]}
//               </span>
//               <span className={cn('amount-td', 'outflow')}>
//                 <IconAmount /> {isArray(amount) && amount[1]} {unit[1]}
//               </span>
//             </div>
//           );
//         } else {
//           return (
//             <div className={cn('purchase-amount-cell')}>
//               <span className={cn('amount-td', type === 'outflow' || type === 'burn' ? 'outflow' : '')}>
//                 <IconAmount /> {amount} {unit}
//               </span>
//             </div>
//           );
//         }
//       },
//     },
//     {
//       title: t('daoActivityTable.table.th4'),
//       dataIndex: 'from',
//       key: 'from',
//       width: size === 'lg' ? '206px' : '85px',
//       align: 'center',
//       filterIcon: (filtered) => <IconTableFilter />,
//       filterDropdownOpen: openFilter2,
//       onFilterDropdownOpenChange: () => {
//         setOpenFilter2(!openFilter2);
//       },
//       filterDropdown: () => (
//         <div className={cn('filter-custom')}>
//           <ul>
//             <li>
//               <button type="button" name="Trust" data-col="from" onClick={filterHandler}>
//                 Trust
//               </button>
//             </li>
//             <li>
//               {/* 23.02.21 수정: name 값 수정 */}
//               <button type="button" name="Incinerator" data-col="from" onClick={filterHandler}>
//                 Incinerator
//               </button>
//             </li>
//           </ul>
//         </div>
//       ),
//     },
//     {
//       title: t('daoActivityTable.table.th5'),
//       dataIndex: 'to',
//       key: 'to',
//       width: size === 'lg' ? '206px' : '85px',
//       align: 'center',
//       filterIcon: (filtered) => <IconTableFilter />,
//       filterDropdownOpen: openFilter3,
//       onFilterDropdownOpenChange: () => {
//         setOpenFilter3(!openFilter3);
//       },
//       filterDropdown: () => (
//         <div className={cn('filter-custom')}>
//           <ul>
//             <li>
//               {/* 23.02.20 수정: name 값 변경 */}
//               <button type="button" name="Incinerator" data-col="to" onClick={filterHandler}>
//                 Incinerator
//               </button>
//             </li>
//             <li>
//               {/* 23.02.20 수정: name 값 변경 */}
//               <button type="button" name="WEMIX.Fi" data-col="to" onClick={filterHandler}>
//                 WEMIX.Fi
//               </button>
//             </li>
//             <li>
//               {/* 23.02.20 수정: 메뉴명 변경 */}
//               <button type="button" name="Obelisk" data-col="to" onClick={filterHandler}>
//                 Obelisk
//               </button>
//             </li>
//             <li>
//               {/* 23.02.20 수정: name 값 변경 */}
//               <button type="button" name="button" data-col="to" onClick={filterHandler}>
//                 Burn
//               </button>
//             </li>
//           </ul>
//         </div>
//       ),
//     },
//   ];
//
//   useEffect(() => {
//     /* 23.02.21 수정: 함수명 변경 */
//     setDaoIncineratorData(daoIncinerator);
//   }, []);
//
//   useEffect(() => {
//     if (offset.width >= 768 && offset.width <= 1279) {
//       setSize('md');
//     } else if (offset.width < 768) {
//       setSize('sm');
//     } else {
//       setSize('lg');
//     }
//   }, [offset.width]);
//
//   return (
//     <div className={cn('dao-table-wrap')}>
//       <div className={cn('table-top-wrap')}>
//         <Select
//           size="middle"
//           defaultValue={selectValue}
//           className={cn('incinerator-table-select')}
//           suffixIcon={<IconArrow />}
//           popupClassName="select-size-md-dropdown"
//           getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
//           // drop down list 높이값 필요 시 조절
//           listHeight={400}
//           onChange={onChangeSelect}
//         >
//           {selectList.map((el, index) => {
//             return (
//               <Option value={el} key={el + index}>
//                 {el}
//               </Option>
//             );
//           })}
//         </Select>
//         {selectValue !== selectList[0] && (
//           <div className={cn('table-tooltip-wrap')}>
//             <span className={cn('table-tooltip')}>{t('incinerator.tooltip.title')}</span>
//             <Popover
//               overlayClassName="tooltip"
//               placement="topRight"
//               content={
//                 <div className={cn('tooltip-contents')}>
//                   <ul className={cn('tooltip-list-wrap')}>
//                     <li>
//                       <dl className={cn('defined-list-wrap')}>
//                         <dt>{t('incinerator.tooltip.desc.list.0', { type: useDaoCharacterConvert(activeDao.value) })}</dt>
//                         <dd>
//                           <strong>50%</strong>
//                         </dd>
//                       </dl>
//                     </li>
//                     <li>
//                       <dl className={cn('defined-list-wrap')}>
//                         <dt>{t('incinerator.tooltip.desc.list.1')}</dt>
//                         <dd>
//                           <strong>50%</strong>
//                         </dd>
//                       </dl>
//                     </li>
//                   </ul>
//                   <p className={cn('text', 'depth')}>{t('incinerator.tooltip.desc.text')}</p>
//                 </div>
//               }
//               trigger="click"
//               getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
//             >
//               <button type="button">
//                 <IconInfo />
//               </button>
//             </Popover>
//           </div>
//         )}
//       </div>
//       <Table
//         className={cn('table-type-lg')}
//         pagination={false}
//         columns={DaoFilterColumns}
//         /* 23.02.21 수정: state 변경 */
//         dataSource={daoIncineratorData}
//         scroll={size === 'sm' ? { x: 680 } : undefined}
//       />
//       {showMore()}
//     </div>
//   );
return <></>;
};
export default IncineratorActivity;