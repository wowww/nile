import { Table, Avatar, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ReactSVG } from 'react-svg';
import cn from 'classnames';
import { Trans, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import QuorumInfo, { GovernanceCaseType } from './QuorumInfo';
import OutlineButton from '@/components/button/OutlineButton';
import Empty from '@/components/empty/Empty';
import BgButton from '@/components/button/BgButton';

import { VoterTableItemType } from '@/components/dao/governance/ProposalVoters';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';
import { wonderProposalAtom } from '@/state/governanceAtom';

import { daoContractsAtom, ZERO_ADDRESS } from '@/state/web3Atom';
import { fromWei, toWei } from 'web3-utils';
import { VoteType } from '@/types/dao/proposal.types';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { daoAbis, daoJsonAbiAddress } from '@/web3/abis/dao';
import { TOKEN_MAX_APPROVE_AMOUNT, waitForReceipt } from '@utils/web3Utils';
import { TransactionReceipt } from 'web3-core';
import { useWonder } from '@/hook/useWonder';
import { WalletModalType } from '@/types/modal.types';
import { marketJsonAbiAddresses } from '@/web3/abis/market';
import ButtonControlArea from '@components/dao/governance/detail/ButtonControlArea';
import { useDaoCharacterConvert } from '@/hook/useCharacterConverter';

const DaoGovernanceVotersModal = dynamic(() => import('@components/modal/DaoGovernanceVotersModal'), { ssr: false });

interface Props {
  type: GovernanceCaseType;
}

const TableData: VoterTableItemType[] = Array.from({ length: 9 }, (_, index) => {
  return {
    voter: {
      profileImg: '',
      name: '0xabcd...abcd',
    },
    vote: index % 3 ? 'against' : 'for',
    amount: 1000000000000.1234,
    date: new Date(2015, 1, 3, 14, 12, 11).getTime(),
  };
});

const GovernanceVote = ({ type = 'temperature' }: Props) => {
  const { t } = useTranslation(['dao', 'common']);
  const { locale } = useRouter();
  const activeDao = useAtomValue(daoThemeAtom);
  const imgRoot = 'https://nile.blob.core.windows.net/images/assets/images/icon/';

  // 상태 제어 state
  // 공통 사용
  const [connectWallet, setConnectWallet] = useState<boolean>(true); // 지갑연결 상태
  const [participationPeriod, setParticipationPeriod] = useState<boolean>(true); // 참여기간 상태 (진행 true, 종료 false)
  const [writer, setWriter] = useState<boolean>(true); // 작성자 여부 (작성자 true, 참여자&미참여자 false)
  const [passed, setPassed] = useState<boolean>(false); // 가결 상태 (가결 true, 부결 false)
  const [proceed, setProceed] = useState<boolean>(false); // proceed 전, 후 (후 true, 전 false)
  // type: temperature
  const [clickAgreeButton, setClickAgreeButton] = useState<boolean>(false); // temperature 공감 상태 (공감, 비공감 둘다 false일땐 미참여 상태)
  const [clickAgainstButton, setClickAgainstButton] = useState<boolean>(false); //  temperature 비공감 상태 (공감, 비공감 둘다 false일땐 미참여 상태)
  const [rejectedCause, setRejectedCause] = useState<boolean>(false); // 부결된 이유 (비공감우세 true, 정족수미달 false)
  // type: consensus, governance
  const [isAgree, setIsAgree] = useState<boolean>(false); // 투표 찬성 상태 (투표 찬성,반대 둘다 false일땐 미참여 상태)
  const [isAgainst, setIsAgainst] = useState<boolean>(false); // 투표 반대 상태 (투표 찬성,반대 둘다 false일땐 미참여 상태)
  const [counting, setCounting] = useState<boolean>(true); // counting 전, 후 (후 true, 전 false)
  const [execution, setExecution] = useState<boolean>(true); // execution 전, 후 (후 true, 전 false)
  const [reclaimComplete, setReclaimComplete] = useState<boolean>(false); // g.WONDER 회수하기 전 후 (후 true, 전 false)
  const [otherTextAgenda, setOtherTextAgenda] = useState<boolean>(true); // 기타 텍스트 안건 (있는경우 true, 없는경우 false)
  const [immediateApproval, setImmediateApproval] = useState<boolean>(true); // 즉시가결 여부 (즉시가결 true, 즉시가결아님 false)
  const [underPriceCondition, setUnderPriceCondition] = useState<boolean>(false); // 가격조건미달로 인한 부결 (true, false)
  const [underQuorumCondition, setUnderQuorumCondition] = useState<boolean>(false); // 정족수조건미달로 인한 부결 (true, false)
  const [immediateRejection, setImmediateRejection] = useState<boolean>(true); // 과반수 이상 반대로 즉시부결 (true, false)
  const [votingCapacity, setVotingCapacity] = useState<boolean>(true); // 투표 가능 수량 (있음 true, 없음 false)

  const [isVotePopup, setIsVotePopup] = useState(false);

  // graph dummy data
  const voteTotalInfo = {
    currentQuorum: 80000,
    targetQuorum: 100000,
    agreeRate: 60,
    againstRate: 40,
    agreeGwdr: 50634749,
    againstGwdr: 50637749,
    agreeUser: 100,
    againstUser: 99,
  };
  // table data
  const MembersTableColumns: ColumnsType<MembersTableDataType> = [
    {
      title: t('vote.GovernanceVote.voter'),
      dataIndex: 'members',
      key: 'members',
      align: 'center',
      width: 100,
      render: (_, { member, profileImgUrl, memberLink }) => (
        <Link href={memberLink}>
          {/* 23.03.29 수정: hover 효과 변경으로 인한 클래스 추가 */}
          <a className={cn('member-link')}>
            <Avatar
              className={cn('user-image')}
              size={20}
              style={profileImgUrl !== undefined ? { backgroundImage: `url(${profileImgUrl})` } : {}}
            ></Avatar>
            <span>{member}</span>
          </a>
        </Link>
      ),
    },
    {
      title: t('vote.GovernanceVote.voterAmount'),
      dataIndex: 'amountVotes',
      key: 'amountVotes',
      align: 'center',
      width: 100,
      render: (_, { amountVotes }) => (
        <p>
          {amountVotes}M<span>{t(`amountUnit.${activeDao.value}.unit2`)}</span>
        </p>
      ),
    },
    {
      title: t('vote.GovernanceVote.vote'),
      dataIndex: 'vote',
      key: 'vote',
      align: 'center',
      width: 100,
      render: (_, { vote }) => <span>{vote}</span>,
    },
  ];
  interface MembersTableDataType {
    member: string;
    profileImgUrl: string;
    amountVotes: number;
    vote: string;
    memberLink: string;
  }
  const MembersTableData: MembersTableDataType[] = [
    {
      member: '0xabcd...abcd',
      profileImgUrl: 'https://picsum.photos/32/32/?image=1',
      amountVotes: 1.7,
      vote: t('vote.GovernanceVote.agreement'),
      memberLink: '/',
    },
    {
      member: '0xabcd...abcd',
      profileImgUrl: 'https://picsum.photos/32/32/?image=1',
      amountVotes: 1.7,
      vote: t('vote.GovernanceVote.opposite'),
      memberLink: '/',
    },
    {
      member: '0xabcd...abcd',
      profileImgUrl: 'https://picsum.photos/32/32/?image=1',
      amountVotes: 1.7,
      vote: t('vote.GovernanceVote.agreement'),
      memberLink: '/',
    },
    {
      member: '0xabcd...abcd',
      profileImgUrl: 'https://picsum.photos/32/32/?image=1',
      amountVotes: 1.7,
      vote: t('vote.GovernanceVote.agreement'),
      memberLink: '/',
    },
    {
      member: '0xabcd...abcd',
      profileImgUrl: 'https://picsum.photos/32/32/?image=1',
      amountVotes: 1.7,
      vote: t('vote.GovernanceVote.agreement'),
      memberLink: '/',
    },
  ];
  const [tableDummy, setTableDummy] = useState<MembersTableDataType[]>(MembersTableData);

  // agreeAgainstButton
  const agreeAgainstButton = (event: any, state: any, isClick: boolean) => {
    event.preventDefault();
    if (state === 'agree') {
      if (isClick === true) {
        setClickAgreeButton(false);
        message.info({ content: t('vote.GovernanceVote.agreeCancel'), key: 'toast' });
      } else {
        if (clickAgainstButton === true) {
          setClickAgainstButton(false);
        }
        setClickAgreeButton(true);
        message.info({ content: t('vote.GovernanceVote.agreeSelect'), key: 'toast' });
      }
    } else {
      if (isClick === true) {
        setClickAgainstButton(false);
        message.info({ content: t('vote.GovernanceVote.disagreeCancel'), key: 'toast' });
      } else {
        if (clickAgreeButton === true) {
          setClickAgreeButton(false);
        }
        setClickAgainstButton(true);
        message.info({ content: t('vote.GovernanceVote.disagreeSelect'), key: 'toast' });
      }
    }
  };

  /* 23.04.06 수정: NumberChange 투표가능수량 소수점 4자리 까지 표기 변경 */
  const NumberChange = (value: Number) => {
    let parts = value.toFixed(4).split('.');
    let result = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
    return result;
  };

  return (
    <div className={cn('wrap-governance-vote', locale)}>
      <ButtonControlArea />
      {/* temperature: 참여기간 / consensus, governance: 투표기간, 투표가능수량 */}
      <div className={cn('wrap-vote-state')}>
        <div className={cn('vote-info')}>
          {type === 'temperature' ? (
            // type === 'temperature'
            <>
              <>
                {participationPeriod ? (
                  // 참여 기간
                  <strong className={cn('title')}>{t('vote.GovernanceVote.participationDuration')}</strong>
                ) : (
                  // 참여 기간 종료
                  <>
                    {passed ? (
                      // 가결
                      <p className={cn('passed-state')}>{t('vote.GovernanceVote.approved')}</p>
                    ) : (
                      // 부결 (부결이유 rejectedCause로 제어)
                      <p className={cn('passed-state')}>
                        {rejectedCause ? t('vote.GovernanceVote.disagreePreponderance') : t('vote.GovernanceVote.rejectionQuorum')}
                      </p>
                    )}
                  </>
                )}
                <p className={cn('date')}>
                  2022-07-01 ~ 2022-07-10
                  {participationPeriod && (
                    <span>
                      2{t('vote.GovernanceVote.day')} 21{t('vote.GovernanceVote.time')} {t('vote.GovernanceVote.remain')}
                    </span>
                  )}
                </p>
              </>

              <div className={cn('participation-state', connectWallet && 'connected')}>
                {connectWallet ? (
                  // 지갑 연결 후
                  <>
                    {/* 23.03.30 수정: 다국어 적용 */}
                    <p>{participationPeriod ? t('vote.GovernanceVote.myParticipating') : t('vote.GovernanceVote.myParticipatingResult')}</p>
                    {clickAgreeButton ? (
                      <div className={cn('participation')}>
                        <ReactSVG src={`${imgRoot}ico_dao_vote_check.svg`} />
                        {t('vote.GovernanceVote.agree')}
                      </div>
                    ) : clickAgainstButton ? (
                      <div className={cn('participation')}>
                        <ReactSVG src={`${imgRoot}ico_dao_vote_check.svg`} />
                        {t('vote.GovernanceVote.disagree')}
                      </div>
                    ) : (
                      <div>{t('vote.GovernanceVote.notParticipating')}</div>
                    )}
                  </>
                ) : (
                  // 지갑 연결 전
                  <>{t('vote.GovernanceVote.connectWallet1')}</>
                )}
              </div>
            </>
          ) : (
            // type === 'consensus', 'governance'
            <>
              <>
                {participationPeriod ? (
                  // 참여 기간
                  <strong className={cn('title')}>{t('vote.GovernanceVote.voteDuration')}</strong>
                ) : (
                  // 참여 기간 종료
                  <>
                    {!counting ? (
                      // counting 전
                      <p className={cn('passed-state')}>{t('vote.GovernanceVote.finishedVoteDuration')}</p>
                    ) : (
                      // counting 후
                      <>
                        {passed ? (
                          // 가결 (가결, 즉시가결 immediateApproval로 제어)
                          <>
                            <p className={cn('passed-state')}>
                              {immediateApproval ? (
                                <Trans
                                  i18nKey="vote.GovernanceVote.majorityInFavor"
                                  ns="dao"
                                  values={{
                                    word: '(2023-07-10)',
                                  }}
                                >
                                  <span></span>
                                </Trans>
                              ) : (
                                t('vote.GovernanceVote.approved')
                              )}
                            </p>
                            <p className={cn('passed-state')}></p>
                          </>
                        ) : (
                          // 부결 (부결이유 underPriceCondition, underQuorumCondition, immediateRejection로 제어)
                          <>
                            <p className={cn('passed-state')}>
                              {underPriceCondition && t('vote.GovernanceVote.underPriceCondition')}
                              {underQuorumCondition && t('vote.GovernanceVote.underQuorumCondition')}
                              {immediateRejection && (
                                <Trans
                                  i18nKey="vote.GovernanceVote.immediateRejection"
                                  ns="dao"
                                  values={{
                                    word: '(2023-07-10)',
                                  }}
                                >
                                  <span></span>
                                </Trans>
                              )}
                            </p>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}

                <p className={cn('date')}>
                  2022-07-01 ~ 2022-07-10
                  {participationPeriod && (
                    <span>
                      {/* 23.04.11 수정: 영문 표기 관련 - 1일 1시간인 경우 1day 1hour left - 2일 21시간인 경우 2days 2hours left로 표기 되어야 합니다. day2, time2가 s 붙은 다국어입니다. */}
                      {/* 1{t('vote.GovernanceVote.day')} 1{t('vote.GovernanceVote.time')} {t('vote.GovernanceVote.remain')} */}2
                      {t('vote.GovernanceVote.day2')} 21{t('vote.GovernanceVote.time2')} {t('vote.GovernanceVote.remain')}
                    </span>
                  )}
                </p>
              </>

              <div className={cn('participation-state')}>
                {connectWallet ? (
                  <>
                    <p>
                      {t('vote.GovernanceVote.myVote')}
                      <span> {participationPeriod ? t('vote.GovernanceVote.state') : t('vote.GovernanceVote.result')}</span>
                    </p>{' '}
                    {isAgree ? (
                      <div className={cn('participation')}>
                        <ReactSVG src={`${imgRoot}ico_dao_vote_o.svg`} />
                        {t('vote.GovernanceVote.agreement')}
                      </div>
                    ) : isAgainst ? (
                      <div className={cn('participation')}>
                        <ReactSVG src={`${imgRoot}ico_dao_vote_x.svg`} />
                        {t('vote.GovernanceVote.opposite')}
                      </div>
                    ) : (
                      <div>{t('vote.GovernanceVote.npolledVote')}</div>
                    )}
                  </>
                ) : (
                  <>{t('vote.GovernanceVote.connectWallet2')}</>
                )}
              </div>
              {participationPeriod && (
                <>
                  <div className={cn('title-voting-capacity')}>
                    <strong className={cn('title')}>{t('vote.GovernanceVote.numberVotesAvailable')}</strong>
                    <em className={cn('voting-capacity')}>
                      {votingCapacity ? `${NumberChange(3500.1533)}` : '0'} <span>{t(`amountUnit.${activeDao.value}.unit2`)}</span>
                    </em>
                  </div>
                  {/* 23.04.06 수정: 투표가능 수량 소수점 4자리까지 표현 변경 */}
                  {votingCapacity ? (
                    // 투표 가능수량 있는 경우
                    <dl>
                      <dt>{t('vote.GovernanceVote.TotalHoldingQuantity')}</dt>
                      <dd>
                        {NumberChange(3500)} {t(`amountUnit.${activeDao.value}.unit2`)}
                      </dd>
                      <dt>{t('vote.GovernanceVote.numberVotesOtherAgenda')}</dt>
                      <dd>
                        {NumberChange(0)} {t(`amountUnit.${activeDao.value}.unit2`)}
                      </dd>
                      <dt>{t('vote.GovernanceVote.numberVotesAgenda')}</dt>
                      <dd>
                        {NumberChange(0)} {t(`amountUnit.${activeDao.value}.unit2`)}
                      </dd>
                    </dl>
                  ) : (
                    // 투표 가능수량 없는 경우
                    <ul className={cn('vote-info-list')}>
                      {/* 23.04.06 수정: 다국어 영역 수정 */}
                      <li>{t('vote.GovernanceVote.nogType', { type: useDaoCharacterConvert(activeDao.value) })}</li>
                    </ul>
                  )}
                  {type === 'governance' && <p className={cn('governance-vote-info')}>{t('vote.GovernanceVote.governanceVoteInfo')}</p>}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {/* temperature: 참여현황 / consensus, governance: 투표현황, 투표자 */}
      <div className={cn('wrap-vote-state')}>
        <div className={cn('vote-state')}>
          <div className={cn('title-wrap')}>
            <strong className={cn('title')}>
              {type === 'temperature' ? t('vote.GovernanceVote.participationStatus') : t('vote.GovernanceVote.voteStatus')}
            </strong>
            <p className={cn('total-vote-info')}>
              {t('vote.GovernanceVote.total1')}
              <em> {type === 'temperature' ? t('vote.GovernanceVote.participant') : t('vote.GovernanceVote.voter')} </em>
              {`${voteTotalInfo.agreeUser + voteTotalInfo.againstUser}`}
              {t('vote.GovernanceVote.person')}
              <span>(50,634,749 {t(`amountUnit.${activeDao.value}.unit2`)})</span>
            </p>
          </div>
          <div className={cn('quorum-info-list')}>
            <QuorumInfo
              type={type}
              currentQuorum={voteTotalInfo.currentQuorum}
              targetQuorum={voteTotalInfo.targetQuorum}
              agreeRate={voteTotalInfo.agreeRate}
              againstRate={voteTotalInfo.againstRate}
              agreeGwdr={voteTotalInfo.agreeGwdr}
              againstGwdr={voteTotalInfo.againstGwdr}
              agreeUser={voteTotalInfo.agreeUser}
              againstUser={voteTotalInfo.againstUser}
            />
            {type === 'temperature' ? (
              <ul className={cn('vote-info-list')}>
                <li>
                  <Trans
                    i18nKey="vote.GovernanceVote.voteInfoList1"
                    ns="dao"
                    values={{
                      word: t('vote.GovernanceVote.voteInfoList1word'),
                    }}
                  >
                    <span></span>
                  </Trans>
                </li>
                <li>
                  <Trans
                    i18nKey="vote.GovernanceVote.voteInfoList2"
                    ns="dao"
                    values={{
                      word: t('vote.GovernanceVote.voteInfoList2word'),
                    }}
                  >
                    <span></span>
                  </Trans>
                </li>
              </ul>
            ) : (
              <ul className={cn('vote-info-list')}>
                <li>
                  <Trans
                    i18nKey="vote.GovernanceVote.voteInfoList3"
                    ns="dao"
                    values={{
                      word1: `${
                        type === 'consensus' ? t('vote.GovernanceVote.voteInfoList3word1_1') : t('vote.GovernanceVote.voteInfoList3word2_1')
                      }`,
                      word2: `${
                        type === 'consensus' ? t('vote.GovernanceVote.voteInfoList3word1_2') : t('vote.GovernanceVote.voteInfoList3word2_2')
                      }`,
                    }}
                  >
                    <span></span>
                  </Trans>
                </li>
                <li>{t('vote.GovernanceVote.voteInfoList4')}</li>
              </ul>
            )}
          </div>
        </div>
      </div>
      {/* 23.04.05 수정: 투표자 구분 디자인 적용 */}
      <div className={cn('wrap-vote-state', 'last')}>
        {type !== 'temperature' && (
          <div className={cn('vote-user')}>
            <strong className={cn('title')}>{t('vote.GovernanceVote.voter')} </strong>
            <div className={cn('user-info')}>
              <p>
                {t('vote.GovernanceVote.total2')} {`${voteTotalInfo.agreeUser + voteTotalInfo.againstUser}`}, {t('vote.GovernanceVote.agreement')}{' '}
                {voteTotalInfo.agreeUser}, {t('vote.GovernanceVote.opposite')} {voteTotalInfo.againstUser}
              </p>
              <OutlineButton buttonText={t('vote.GovernanceVote.detailView')} color="gray" size="xs" onClick={() => setIsVotePopup(true)} />
            </div>
            <div className={cn('governance-members')}>
              {!tableDummy || tableDummy.length === 0 ? (
                <Empty subText={t('vote.GovernanceVote.noVoter')} />
              ) : (
                <React.Fragment>
                  <Table
                    className={cn('table-type-lg', 'dao-members-table')}
                    columns={MembersTableColumns}
                    dataSource={tableDummy}
                    pagination={false}
                  />
                </React.Fragment>
              )}
            </div>
          </div>
        )}
      </div>
      <DaoGovernanceVotersModal isOpen={isVotePopup} setIsOpen={setIsVotePopup} data={TableData} />
    </div>
  );
};

export default GovernanceVote;
