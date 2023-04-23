import { ReactElement, useState } from 'react';
import cn from 'classnames';
import { useTranslation, Trans } from 'next-i18next';
import { Timeline } from 'antd';

import OutlineButton from '@/components/button/OutlineButton';
import Tag from '@/components/tag/Tag';
import { ReactSVG } from 'react-svg';
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtomValue } from 'jotai';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

interface protocolListProps {
  name: string;
  img: ReactElement;
  amount?: string;
  newCount?: number;
}

interface timelineListProps {
  type: string;
  time: string;
  desc: ReactElement | string;
  listTypeDesc?: { hasInnerList?: boolean; desc: string; innerList?: string[] }[];
  link?: string;
  linkText?: string;
  isNew?: boolean;
}

const DaoIndividualHomeTimeline = () => {
  const { t } = useTranslation('dao');
  const activeDao = useAtomValue(daoThemeAtom);

  const [isProtocol, setProtocol] = useState<string>('all');

  const protocolList: protocolListProps[] = [
    {
      name: 'Station',
      newCount: 12,
      img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_station.svg" />,
    },
    {
      name: 'Treasury',
      newCount: 12,
      img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_treasury.svg" />,
      amount: '120,293,482',
    },
    {
      name: 'Obelisk',
      newCount: 12,
      img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_staking_pool.svg" />,
    },
    {
      name: 'Governance',
      newCount: 12,
      img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_governance.svg" />,
    },
    {
      name: 'Trust',
      newCount: 12,
      img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_trust.svg" />,
    },
    {
      name: 'Incinerator',
      newCount: 12,
      img: <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_incinerator.svg" />,
    },
  ];

  const protocolListTotalCount = protocolList.reduce((previousValue: number, currentValue: protocolListProps): number => {
    if (currentValue.newCount) {
      return previousValue + currentValue.newCount;
    } else {
      return previousValue + 0;
    }
  }, 0);

  // timeline 더미 데이터 (기획서 데이터)
  const timelineList: timelineListProps[] = [
    // NOTE: Station case
    {
      type: 'Station',
      time: '2022-07-01 13:30:04',
      desc: t('individualHome.timeline.stationDesc1', { type: useDaoCharacterConvert(activeDao.value) }),
      link: '/',
      linkText: t('individualHome.timeline.stationButton'),
      isNew: true,
    },
    {
      type: 'Station',
      time: '2022-07-01 13:30:04',
      desc: t('individualHome.timeline.stationDesc2'),
      listTypeDesc: [
        {
          hasInnerList: false,
          desc: t('individualHome.timeline.stationDesc3', { startPeriod: '2022-07-01 13:00', endPeriod: '2022-07-01 13:00', day: '7' }),
        },
      ],
      link: '/',
      linkText: t('individualHome.timeline.stationButton'),
      isNew: true,
    },
    {
      type: 'Station',
      time: '2022-07-01 13:30:04',
      desc: t('individualHome.timeline.stationDesc4', { n: '100,000' }),
      link: '/',
      linkText: t('individualHome.timeline.stationButton'),
      isNew: true,
    },
    {
      type: 'Station',
      time: '2022-07-01 13:30:04',
      desc: t('individualHome.timeline.stationDesc5', { type: useDaoCharacterConvert(activeDao.value) }),
      link: '/',
      linkText: t('individualHome.timeline.stationButton'),
      isNew: true,
    },
    {
      type: 'Station',
      time: '2022-07-01 13:30:04',
      desc: t('individualHome.timeline.stationDesc6'),
      link: '/',
      linkText: t('individualHome.timeline.stationButton'),
      isNew: true,
    },

    // NOTE: Treasury case
    /*
      - [전송대상], [유입대상]  표기 방식
        - Protocol, 지갑명이 지정되어 있을 경우 : 해당 명칭 표기
        - 별도 명칭이 지정되어 있지 않을 경우 : 지갑주소를 그대로 표기
    */
    {
      type: 'Treasury',
      time: '2022-07-01 13:30:04',
      desc: (
        <Trans
          i18nKey={'individualHome.timeline.treasuryDesc1'}
          ns="dao"
          values={{
            wallet: 'wallet address',
            n: '100,000',
          }}
        >
          <strong className={cn('bold')}></strong>
        </Trans>
      ),
      isNew: true,
    },
    {
      type: 'Treasury',
      time: '2022-07-01 13:30:04',
      desc: (
        <Trans
          i18nKey={'individualHome.timeline.treasuryDesc2'}
          ns="dao"
          values={{
            wallet: 'wallet address',
            n: '100,000',
          }}
        >
          <strong className={cn('bold')}></strong>
        </Trans>
      ),
    },

    // NOTE: Trust case
    {
      type: 'Trust',
      time: '2022-07-01 13:30:04',
      desc: (
        <Trans
          i18nKey={'individualHome.timeline.trustDesc1'}
          ns="dao"
          values={{
            wallet: 'wallet address',
            n: '100,000',
          }}
        >
          <strong className={cn('bold')}></strong>
        </Trans>
      ),
    },
    {
      type: 'Trust',
      time: '2022-07-01 13:30:04',
      desc: (
        <Trans
          i18nKey={'individualHome.timeline.trustDesc2'}
          ns="dao"
          values={{
            wallet: 'wallet address',
            n: '100,000',
          }}
        >
          <strong className={cn('bold')}></strong>
        </Trans>
      ),
    },
    {
      type: 'Trust',
      time: '2022-07-01 13:30:04',
      desc: t('individualHome.timeline.trustDesc3'),
      link: '/',
      linkText: t('individualHome.timeline.trustNoticeButton'),
    },
    {
      type: 'Trust',
      time: '2022-07-01 13:30:04',
      desc: t('individualHome.timeline.trustDesc4', { amount: '1,500,000.0000 ', unit: 'WEMIX', businessName: '[사업이름]' }),
      listTypeDesc: [
        {
          desc: t('individualHome.timeline.trustDesc5', { n1: 30, n2: 70 }),
        },
        {
          desc: t('individualHome.timeline.trustDesc6', { n1: 28, n2: 72 }),
        },
      ],
      isNew: true,
    },

    // NOTE: Incinerator case
    {
      type: 'Incinerator',
      time: '2022-07-01 13:30:04',
      desc: (
        <Trans
          i18nKey={'individualHome.timeline.incineratorDesc1'}
          ns="dao"
          values={{
            n: '100,000',
            unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
          }}
        >
          <strong className={cn('bold')}></strong>
        </Trans>
      ),
    },
    {
      type: 'Incinerator',
      time: '2022-07-01 13:30:04',
      desc: t('individualHome.timeline.incineratorDesc2'),
    },
    {
      type: 'Incinerator',
      time: '2022-07-01 13:30:04',
      desc: t('individualHome.timeline.incineratorDesc3', { type: useDaoCharacterConvert(activeDao.value) }),
      listTypeDesc: [
        {
          desc: t('individualHome.timeline.incineratorDesc4', { n1: 30, n2: 70 }),
        },
        {
          desc: t('individualHome.timeline.incineratorDesc5', { n1: 28, n2: 72 }),
        },
      ],
      isNew: true,
    },

    // NOTE: Obelisk case
    {
      type: 'Obelisk',
      time: '2022-07-01 13:30:04',
      desc: (
        <Trans
          i18nKey={'individualHome.timeline.obeliskDesc1'}
          ns="dao"
          values={{
            n: '100,000',
            unit: t('unit1', { ns: 'dao', keyPrefix: `amountUnit.${activeDao.value}` }),
          }}
        >
          <strong className={cn('bold')}></strong>
        </Trans>
      ),
      isNew: true,
    },

    // NOTE: Governance case
    // 신규 안건 등록
    {
      type: 'Governance',
      time: '2022-07-01 13:30:04',
      link: '/',
      linkText: t('individualHome.timeline.agendaButton'),
      desc: t('individualHome.timeline.governanceDesc1'),
      listTypeDesc: [
        {
          desc: t('individualHome.timeline.agenda', { text: t('individualHome.timeline.agendaText.1') }),
        },
      ],
    },
    {
      type: 'Governance',
      time: '2022-07-01 13:30:04',
      link: '/',
      linkText: t('individualHome.timeline.agendaButton'),
      desc: t('individualHome.timeline.governanceDesc2'),
      listTypeDesc: [
        {
          desc: t('individualHome.timeline.agenda', { text: t('individualHome.timeline.agendaText.1') }),
        },
      ],
    },
    {
      type: 'Governance',
      time: '2022-07-01 13:30:04',
      link: '/',
      linkText: t('individualHome.timeline.agendaButton'),
      desc: t('individualHome.timeline.governanceDesc3'),
      listTypeDesc: [
        {
          desc: t('individualHome.timeline.agenda', { text: t('individualHome.timeline.agendaText.1') }),
        },
      ],
    },
    {
      type: 'Governance',
      time: '2022-07-01 13:30:04',
      link: '/',
      linkText: t('individualHome.timeline.agendaButton'),
      desc: t('individualHome.timeline.governanceDesc4'),
      listTypeDesc: [
        {
          desc: t('individualHome.timeline.agenda', { text: t('individualHome.timeline.agendaText.1') }),
        },
      ],
    },
    // Governance Check 관련 변동 사항
    {
      type: 'Governance',
      time: '2022-07-01 13:30:04',
      link: '/',
      linkText: t('individualHome.timeline.agendaButton'),
      desc: t('individualHome.timeline.governanceDesc5'),
      listTypeDesc: [
        {
          desc: t('individualHome.timeline.agenda', { text: t('individualHome.timeline.agendaText.1') }),
        },
      ],
    },
    {
      type: 'Governance',
      time: '2022-07-01 13:30:04',
      link: '/',
      linkText: t('individualHome.timeline.agendaButton'),
      desc: t('individualHome.timeline.governanceDesc6'),
      listTypeDesc: [
        {
          desc: t('individualHome.timeline.agenda', { text: t('individualHome.timeline.agendaText.1') }),
        },
      ],
    },
    {
      type: 'Governance',
      time: '2022-07-01 13:30:04',
      link: '/',
      linkText: t('individualHome.timeline.agendaButton'),
      desc: t('individualHome.timeline.governanceDesc7'),
      listTypeDesc: [
        {
          desc: t('individualHome.timeline.agenda', { text: t('individualHome.timeline.agendaText.1') }),
        },
      ],
    },
    // Trust Check 관련 변동 사항
    {
      type: 'Governance',
      time: '2022-07-01 13:30:04',
      link: '/',
      linkText: t('individualHome.timeline.agendaButton'),
      desc: t('individualHome.timeline.governanceDesc8'),
      listTypeDesc: [
        {
          desc: t('individualHome.timeline.agenda', { text: t('individualHome.timeline.agendaText.1') }),
        },
      ],
    },
    {
      type: 'Governance',
      time: '2022-07-01 13:30:04',
      link: '/',
      linkText: t('individualHome.timeline.agendaButton'),
      desc: t('individualHome.timeline.governanceDesc9'),
      listTypeDesc: [
        {
          desc: t('individualHome.timeline.agenda', { text: t('individualHome.timeline.agendaText.1') }),
        },
      ],
    },
  ];
  const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLButtonElement;
    console.log(target.value);
    if (isProtocol === target.value) {
      setProtocol('all');
    } else {
      setProtocol(target.value);
    }
  };

  return (
    <div className={cn('dao-box-wrap full dao-timeline')}>
      <div className={cn('dao-box')}>
        <div className={cn('title-wrap')}>
          <div className={cn('inner-wrap')}>
            <h2 className={cn('title')}>What’s new in {useDaoCharacterConvert(activeDao.value)}</h2>
          </div>
          <OutlineButton
            buttonText={`${useDaoCharacterConvert(activeDao.value) as string} Scan`}
            color="gray"
            size="sm"
            iconType={true}
            iconValue="line-arrow"
            align={true}
            href={'/dao/wonder/wonderscan'}
          />
        </div>
        <div className={cn('dao-timeline-wrap')}>
          <ul className={cn('protocol-list')}>
            <li className={cn('protocol-item', 'all', isProtocol === 'all' && 'active')}>
              <button type="button" value="all" onClick={handleButton}>
                <strong className={cn('label-title')}>
                  <span className={cn('protocol-name')}>All</span>
                  <Tag size="s" type="primary">
                    {protocolListTotalCount}
                  </Tag>
                </strong>
              </button>
            </li>
            {protocolList.map((item) => (
              <li
                key={item.name}
                className={cn(
                  'protocol-item',
                  item.name.split(' ').join('-').toLocaleLowerCase(),
                  isProtocol === item.name.split(' ').join('-').toLocaleLowerCase() && 'active',
                  item.name === 'Treasury' && 'protocol-item-lg',
                  (item.name === 'Trust' || item.name === 'Incinerator') && 'protocol-item-md',
                )}
              >
                <button type="button" value={item.name.split(' ').join('-').toLocaleLowerCase()} onClick={handleButton}>
                  <strong className={cn('label-title')}>
                    <span className={cn('protocol-name')}>{item.name}</span>
                    {item.newCount && (
                      <Tag size="s" type="primary">
                        {item.newCount}
                      </Tag>
                    )}
                  </strong>
                  {/* {item.amount && (
                    <div className={cn('amount-wrap')}>
                      <span className={cn('unit')}>$</span>
                      <span className={cn('amount')}>{item.amount}</span>
                    </div>
                  )} */}
                  {item.img}
                </button>
              </li>
            ))}
          </ul>
          <div className={cn('timeline')}>
            <Timeline>
              {timelineList.map((item, index) => {
                return (
                  <Timeline.Item key={item.type + index}>
                    <div className={cn('timeline-wrap')}>
                      <div className={cn('timeline-tit-wrap')}>
                        <div className={cn('tit-inner')}>
                          <strong className={cn('timeline-tit')}>{item.type}</strong>
                          {item.isNew && (
                            <Tag size="xs" color="black">
                              NEW
                            </Tag>
                          )}
                        </div>
                        <span className={cn('timeline-date')}>{item.time}</span>
                      </div>
                      <div className={cn('timeline-content')}>
                        <p className={cn('timeline-desc')}>{item.desc}</p>
                        {item.listTypeDesc !== undefined && (
                          <ul className={cn('list-type-dot')}>
                            {item.listTypeDesc.map((item, index) => {
                              return (
                                <li key={index}>
                                  {item.desc}
                                  {item.hasInnerList && (
                                    <ul className={cn('list-type-dot')}>
                                      {item.innerList?.map((item, index) => {
                                        return <li key={index}>{item}</li>;
                                      })}
                                    </ul>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                        {item.link !== undefined && <OutlineButton buttonText={item.linkText as string} size="sm" color="highlight" />}
                      </div>
                    </div>
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </div>
        </div>
      </div>
      {/* 23.03.30 수정: 모바일에서 버튼 위치 수정 */}
      <div className={cn('mobile-scan-btn')}>
        <div className={cn('more-btn-st-wrap')}>
          <OutlineButton
            buttonText={`${useDaoCharacterConvert(activeDao.value) as string} Scan`}
            color="gray"
            size="sm"
            iconType={true}
            iconValue="line-arrow"
            align={true}
            href={'/wonderscan'}
          />
        </div>
      </div>
    </div>
  );
};

export default DaoIndividualHomeTimeline;
