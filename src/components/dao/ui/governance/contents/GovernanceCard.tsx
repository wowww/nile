import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { Avatar } from 'antd';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import QuorumInfo, { GovernanceCaseType, QuorumType } from '../QuorumInfo';
import { consensusStatus, governanceStatus, temperatureStatus } from './data';
import useMediaQuery from '@/hook/useMediaQuery';
import Link from 'next/link';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

import OutlineButton from '@/components/button/OutlineButton';
import ProfileModal from '@/components/modal/ProfileModal';
import Tag from '@/components/tag/Tag';
import BgButton from '@/components/button/BgButton';
import GovernanceCommentView from '@/components/dao/ui/governance/contents/GovernanceCommentView';
import { ReactSVG } from 'react-svg';

type GovernanceStatus = {
  participants: boolean;
  quorum: boolean;
};

type GovernanceStatusContextType = [GovernanceStatus, Dispatch<SetStateAction<GovernanceStatus>>];

export const GovernanceStatusContext = createContext<GovernanceStatusContextType>([
  {
    participants: false,
    quorum: false,
  },
  () => {},
]);

const StatusStore = Object.freeze({
  temperature: temperatureStatus,
  consensus: consensusStatus,
  governance: governanceStatus,
});

interface GovernanceCardType {
  index?: number;
  type: GovernanceCaseType;
  title: string;
  description: string;
  author: {
    thumbnail: string | null;
    address: string;
  };
  date: {
    start: string;
    end: string;
  };
  views: number;
  commentCount: number;
  trustCheck?: boolean;
}

const getStatusLine = (
  index: number,
  type: GovernanceCaseType,
  status: {
    participants: boolean;
    quorum: boolean;
  },
): boolean => {
  if (type === 'temperature') {
    if (
      StatusStore[type] &&
      StatusStore[type][index as number].ended &&
      StatusStore[type][index as number].me &&
      !StatusStore[type][index as number].proceedDone &&
      status.participants &&
      status.quorum
    )
      return true;
  }
  if (type === 'consensus') {
    if (
      StatusStore[type] &&
      StatusStore[type][index as number].ended &&
      StatusStore[type][index as number].me &&
      !StatusStore[type][index as number].counting
    )
      return true;
    if (
      StatusStore[type] &&
      StatusStore[type][index as number].ended &&
      StatusStore[type][index as number].me &&
      StatusStore[type][index as number].counting &&
      status.participants &&
      status.quorum
    )
      return true;
  }
  if (type === 'governance') {
    if (
      StatusStore[type] &&
      StatusStore[type][index as number].ended &&
      StatusStore[type][index as number].me &&
      !StatusStore[type][index as number].execution &&
      status.participants &&
      status.quorum
    )
      return true;
  }
  return false;
};

const getStatusText = (index: number, type: GovernanceCaseType, participantsStatus: boolean, quorumStatus: boolean): string => {
  const { t } = useTranslation('dao');
  const dateText = `2${t('governance.remainTimeDay')} 21${t('governance.remainTimeHour')} ${t('governance.remainTime')}`;
  const approvalText = `${t('governance.proposal.cardStatus.bePassed', { text: '' })}`;
  const endVotingText = `${t('governance.proposal.cardStatus.endOfVote')}`;
  const quorumRejectionText = `${t('governance.proposal.cardStatus.lackOfQuorum')}`;
  const ended = StatusStore[type] && StatusStore[type][index as number].ended;

  // 정족수 미달
  const isQuorumLack = (ended: boolean): boolean => {
    return ended && !quorumStatus && participantsStatus;
  };
  // 비공감, 반대 우세
  const isDisagreeSuperior = (ended: boolean): boolean => {
    return ended && quorumStatus && !participantsStatus;
  };

  // 즉시 가결
  const isImmediateAgree = (ended: boolean, immediate: boolean): boolean => {
    return ended && participantsStatus && immediate;
  };

  if (type === 'temperature') {
    if (ended && participantsStatus && quorumStatus) return approvalText;
    if (isDisagreeSuperior(ended)) return `${t('governance.proposal.cardStatus.noEmpathyPredominance')}`;
    if (isQuorumLack(ended)) return quorumRejectionText;
  }

  if (type === 'consensus') {
    const counting = StatusStore[type] && StatusStore[type][index as number].counting;
    const immediate = StatusStore[type] && StatusStore[type][index as number].immediate;
    // 투표 완료
    if (ended && !counting) return endVotingText;
    if (ended && participantsStatus && quorumStatus) return approvalText;
    // 23.03.24 삭제
    // if (ended && !counting && participantsStatus && quorumStatus) return approvalText;
    // if (ended && counting && quorumStatus && participantsStatus) return `${t('governance.proposal.cardStatus.bePassed', { text: '(2023-07-10)' })}`;

    // 즉시 가결, 즉시 부결, 가결, 부결
    if (!immediate) {
      if (isQuorumLack(ended)) return quorumRejectionText;
      if (isDisagreeSuperior(ended)) return `${t('governance.proposal.cardStatus.againstPredominance')}`;
    } else {
      if (isImmediateAgree(ended, immediate as boolean)) return `${t('governance.proposal.cardStatus.majorityInFavor', { text: '(2023-07-10)' })} `;
      if (!isImmediateAgree(ended, immediate as boolean)) return `${t('governance.proposal.cardStatus.majorityInAgainst', { text: '(2023-07-10)' })}`;
    }
  }
  if (type === 'governance') {
    const execution = StatusStore[type] && StatusStore[type][index as number].execution;
    const immediate = StatusStore[type] && StatusStore[type][index as number].immediate;
    // 투표 완료
    if (ended && !execution) return endVotingText;
    if (ended && execution && participantsStatus && quorumStatus && !immediate) return approvalText;

    // 즉시 가결, 즉시 부결, 가결, 부결
    if (!immediate) {
      if (isQuorumLack(ended)) return quorumRejectionText;
      if (isDisagreeSuperior(ended)) return `${t('governance.proposal.cardStatus.againstPredominance')}`;
    } else {
      if (isImmediateAgree(ended, immediate as boolean)) return `${t('governance.proposal.cardStatus.majorityInFavor', { text: '(2023-07-10)' })}`;
      if (!isImmediateAgree(ended, immediate as boolean)) return `${t('governance.proposal.cardStatus.majorityInAgainst', { text: '(2023-07-10)' })}`;
    }
  }
  return dateText;
};

const GovernanceCard = ({
  index,
  type,
  title,
  description,
  author,
  date,
  views,
  commentCount,
  currentQuorum,
  targetQuorum,
  againstGwdr,
  againstRate,
  againstUser,
  agreeGwdr,
  agreeRate,
  agreeUser,
  trustCheck,
}: GovernanceCardType & QuorumType) => {
  const [status, setStatus] = useState({
    participants: false,
    quorum: false,
  });
  const activeDao = useAtomValue(daoThemeAtom);
  const [isModal, setIsModal] = useState<boolean>(false);

  const GovernanceProceedButton = () => {
    const isMobile = useMediaQuery('(max-width: 767px)');

    if (type === 'temperature') {
      return (
        <>
          {StatusStore[type] &&
            StatusStore[type][index as number].ended &&
            StatusStore[type][index as number].me &&
            !StatusStore[type][index as number].proceedDone &&
            status.participants &&
            status.quorum && (
              <div className={cn('proceed')}>
                {/* 23.03.30 수정: 검수 / 모바일 디자인 변경 - block={isMobile} 제거 */}
                <BgButton buttonText="Proceed" color="highlight" size="sm" />
              </div>
            )}
          {StatusStore[type] &&
            StatusStore[type][index as number].ended &&
            !StatusStore[type][index as number].me &&
            !StatusStore[type][index as number].proceedDone &&
            status.participants &&
            status.quorum && (
              <div className={cn('proceed')}>
                {/* 23.03.30 수정: 검수 / 모바일 디자인 변경 - block={isMobile} 제거 */}
                <OutlineButton buttonText={`${t('governance.proposal.buttonText.waitProceed')} `} color="highlight" size="sm" disabled />
              </div>
            )}
          {StatusStore[type] &&
            StatusStore[type][index as number].ended &&
            StatusStore[type][index as number].proceedDone &&
            status.participants &&
            status.quorum && (
              <div className={cn('proceed')}>
                {/* 23.03.30 수정: 검수 / 모바일 디자인 변경 - block={isMobile} 제거 */}
                <BgButton
                  buttonText={
                    <>
                      {t('governance.proposal.buttonText.consensusCheck', { text: '(2023-04-01)' })}
                      <span className={cn('icon-wrap')}>
                        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_single_arrow.svg" />
                      </span>
                    </>
                  }
                  color="soft"
                  size="sm"
                  href={`/dao/ui/${activeDao.value}/governance/check`}
                />
              </div>
            )}
        </>
      );
    }
    if (type === 'consensus') {
      return (
        <>
          {StatusStore[type] &&
            StatusStore[type][index as number].ended &&
            StatusStore[type][index as number].me &&
            !StatusStore[type][index as number].counting && (
              <div className={cn('proceed')}>
                {/* 23.03.30 수정: 검수 / 모바일 디자인 변경 - block={isMobile} 제거 */}
                <BgButton buttonText="Counting" color="highlight" size="sm" />
              </div>
            )}
          {StatusStore[type] &&
            StatusStore[type][index as number].ended &&
            StatusStore[type][index as number].me &&
            StatusStore[type][index as number].counting &&
            status.participants &&
            status.quorum && (
              <div className={cn('proceed')}>
                {/* 23.03.30 수정: 검수 / 모바일 디자인 변경 - block={isMobile} 제거 */}
                <BgButton buttonText="Proceed" color="highlight" size="sm" />
              </div>
            )}
          {StatusStore[type] &&
            !StatusStore[type][index as number].approved &&
            StatusStore[type][index as number].ended &&
            !StatusStore[type][index as number].me &&
            StatusStore[type][index as number].counting &&
            status.participants &&
            status.quorum && (
              <div className={cn('proceed')}>
                {/* 23.03.30 수정: 검수 / 모바일 디자인 변경 - block={isMobile} 제거 */}
                <OutlineButton buttonText={`${t('governance.proposal.buttonText.waitProceed')} `} color="highlight" size="sm" disabled />
              </div>
            )}
          {StatusStore[type] && StatusStore[type][index as number].approved && (
            <div className={cn('proceed')}>
              {/* 23.03.30 수정: 검수 / 모바일 디자인 변경 - block={isMobile} 제거 */}
              <BgButton
                buttonText={
                  <>
                    {t('governance.proposal.buttonText.governanceCheck', { text: '(2023-04-01)' })}
                    <span className={cn('icon-wrap')}>
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_single_arrow.svg" />
                    </span>
                  </>
                }
                color="soft"
                size="sm"
                disabled
                href={`/dao/ui/${activeDao.value}/governance/check`}
              />
            </div>
          )}
        </>
      );
    }
    if (type === 'governance') {
      return (
        <>
          {StatusStore[type] &&
            StatusStore[type][index as number].ended &&
            StatusStore[type][index as number].me &&
            !StatusStore[type][index as number].execution &&
            status.participants &&
            status.quorum && (
              <div className={cn('proceed')}>
                {/* 23.03.30 수정: 검수 / 모바일 디자인 변경 - block={isMobile} 제거 */}
                <BgButton buttonText="Execution" color="highlight" size="sm" />
              </div>
            )}
          {StatusStore[type] &&
            StatusStore[type][index as number].ended &&
            StatusStore[type][index as number].execution &&
            status.participants &&
            status.quorum && (
              <div className={cn('proceed')}>
                {/* 23.03.30 수정: 검수 / 모바일 디자인 변경 - block={isMobile} 제거 */}
                <OutlineButton
                  buttonText={`${
                    StatusStore[type][index as number].etc
                      ? t('governance.proposal.buttonText.etcApproval', {
                          text: '2023-04-01 10:30',
                        })
                      : t('governance.proposal.buttonText.onChained', {
                          text: '2023-04-01 10:30',
                        })
                  }`}
                  color="highlight"
                  size="sm"
                  disabled
                />
              </div>
            )}
        </>
      );
    }
    return <></>;
  };

  const GovernanceTags = () => {
    const PrimaryTag = () => {
      if (type === 'governance') {
        return (
          <>
            {StatusStore[type] && StatusStore[type][index as number].execution && status.participants && status.quorum && (
              <Tag size="xs" type="primary" bg>
                Executed
              </Tag>
            )}
            {StatusStore[type] && StatusStore[type][index as number].execution && (!status.quorum || !status.participants) && (
              <Tag size="xs" color="light-gray">
                Rejected
              </Tag>
            )}

            {StatusStore[type] && !StatusStore[type][index as number].execution && (
              <Tag size="xs" color="black">
                Active
              </Tag>
            )}
          </>
        );
      }
      if (type === 'consensus') {
        return (
          <>
            {StatusStore[type] &&
              StatusStore[type][index as number].ended &&
              StatusStore[type][index as number].counting &&
              StatusStore[type][index as number].approved && (
                <Tag size="xs" color="black">
                  Passed
                </Tag>
              )}
            {StatusStore[type] &&
              StatusStore[type][index as number].ended &&
              StatusStore[type][index as number].counting &&
              !StatusStore[type][index as number].active &&
              (!status.participants || !status.quorum) && (
                <Tag size="xs" color="light-gray">
                  Rejected
                </Tag>
              )}
            {StatusStore[type] && !StatusStore[type][index as number].approved && StatusStore[type][index as number].active && (
              <Tag size="xs" color="black">
                Active
              </Tag>
            )}
          </>
        );
      }
      return (
        <>
          {StatusStore[type] && StatusStore[type][index as number].approved && status.participants && status.quorum && (
            <Tag size="xs" border="black">
              Passed
            </Tag>
          )}
          {StatusStore[type] &&
            !StatusStore[type][index as number].approved &&
            StatusStore[type][index as number].proceedDone &&
            (!status.participants || !status.quorum) && (
              <Tag size="xs" color="light-gray">
                Rejected
              </Tag>
            )}
          {StatusStore[type] && !StatusStore[type][index as number].approved && !StatusStore[type][index as number].proceedDone && (
            <Tag size="xs" border="black">
              Active
            </Tag>
          )}
        </>
      );
    };
    return (
      <ul>
        <li>
          <PrimaryTag />
        </li>
        {trustCheck && (
          <li>
            <Tag type="primary" size="sm" border="white-gray">
              Trust Check
            </Tag>
          </li>
        )}
        {StatusStore[type] && StatusStore[type][index as number].me && (
          <li>
            <Tag type="primary" size="sm" border="white-gray">
              My Proposal
            </Tag>
          </li>
        )}
        {StatusStore[type] && StatusStore[type][index as number].voted && (
          <li>
            <Tag type="primary" size="sm" border="white-gray">
              {type === 'temperature' ? (
                'Participated'
              ) : (
                <>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_check.svg" />
                  Voted
                </>
              )}
            </Tag>
          </li>
        )}
      </ul>
    );
  };
  const { t } = useTranslation(['dao', 'common']);

  return (
    <GovernanceStatusContext.Provider value={[status, setStatus]}>
      <div className={cn('governance-card', { 'my-agenda': getStatusLine(index as number, type, status), 'trust-check': trustCheck })}>
        <div className={cn('top')}>
          <div className={cn('governance-content-info')}>
            <div className="content-info">
              <span className={cn('tags')}>
                <GovernanceTags />
              </span>
              <Link href={`/dao/ui/${activeDao.value}/governance/check`}>
                <a className={cn('content-info-link')}>
                  <div className={cn('title')}>
                    {trustCheck && (
                      <span className={cn('trust-icon')}>
                        <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_trust_flag.svg" />
                      </span>
                    )}
                    <strong>{title}</strong>
                  </div>
                  <p className={cn('description')}>{description}</p>
                </a>
              </Link>
              <div className={cn('thumb-address')}>
                <button
                  onClick={() => {
                    setIsModal(true);
                  }}
                >
                  {author.thumbnail ? (
                    <Avatar className={cn('user-image')} size={20} style={{ backgroundImage: author.thumbnail }} />
                  ) : (
                    <Avatar className={cn('user-image type1')} size={20} />
                  )}
                  <span className={cn('address')}>{author.address}</span>
                </button>
              </div>
              <GovernanceProceedButton />
            </div>
          </div>
          <Link href={`/dao/ui/${activeDao.value}/governance/check`}>
            <a className={cn('governance-content-visual')}>
              <QuorumInfo
                type={type}
                currentQuorum={currentQuorum}
                targetQuorum={targetQuorum}
                agreeRate={agreeRate}
                againstRate={againstRate}
                agreeGwdr={agreeGwdr}
                againstGwdr={againstGwdr}
                agreeUser={agreeUser}
                againstUser={againstUser}
                trustCheck={trustCheck}
              />
            </a>
          </Link>
        </div>
        <div className={cn('bottom')}>
          <div className={cn('date-status')}>
            <dl className={cn('date')}>
              <dt>{type === 'temperature' ? `${t('governance.proposal.participationPeriod')}` : `${t('governance.votingPeriod')}`}</dt>
              <dd>
                {date.start} ~ {date.end}
              </dd>
            </dl>
            <div className={cn('status')}>{getStatusText(index as number, type, status.participants, status.quorum)}</div>
          </div>
          <GovernanceCommentView
            comment={{ count: commentCount, href: `/dao/ui/${activeDao.value}/governance/check#comment`, link: true }}
            view={views}
          />
        </div>
      </div>
      {/* 프로필 팝업 */}
      {/* 23.04.07 수정: isModal statement 삭제 */}

      <ProfileModal
        isOpen={isModal}
        setIsOpen={setIsModal}
        profile={{
          name: 'Polaris Liu',
          address: '0x65b2...1413',
          url: 'https://joeschmoe.io/api/v1/random',
        }}
      />
    </GovernanceStatusContext.Provider>
  );
};

export type { GovernanceCardType };
export default GovernanceCard;
