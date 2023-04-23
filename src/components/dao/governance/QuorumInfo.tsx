import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import useMediaQuery from '@/hook/useMediaQuery';
import { useAtomValue } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

const SemiCirclePieChart = dynamic(() => import('@/components/chart/SemiCirclePieChart'), { ssr: false });

type QuorumType = Props;

type GovernanceCaseType = 'temperature' | 'consensus' | 'governance';

interface Props {
  type: GovernanceCaseType;
  currentQuorum: number;
  targetQuorum: number;
  agreeRate: number;
  againstRate: number;
  agreeGwdr: number;
  againstGwdr: number;
  agreeUser: number;
  againstUser: number;
  trustCheck?: true;
}

const COMPLETE_CONDITION: Record<GovernanceCaseType, number> = {
  temperature: 5,
  consensus: 10,
  governance: 20,
};

const getParticipantsStatus = (agreeRate: number, againstRate: number) => {
  if (agreeRate > againstRate) return true;
  if (agreeRate === againstRate) return true;
  return false;
};

const isQuorumComplete = (type: GovernanceCaseType, currentQuorum: number, targetQuorum: number): boolean => {
  const calc = (currentQuorum / targetQuorum) * 100;
  if (calc >= COMPLETE_CONDITION[type]) return true;
  return false;
};

const getQuorumRate = (type: GovernanceCaseType, currentQuorum: number, targetQuorum: number) => {
  const attainment = (targetQuorum / 100) * COMPLETE_CONDITION[type];
  return (currentQuorum / attainment) * 100;
};

const QuorumInfo = ({
  type,
  currentQuorum,
  targetQuorum,
  agreeRate,
  againstRate,
  agreeGwdr,
  againstGwdr,
  agreeUser,
  againstUser,
  trustCheck,
}: Props) => {
  const { t } = useTranslation('dao');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isDaoTablet = useMediaQuery('(max-width: 1023px)');
  // const [_, setStatus] = useContext(GovernanceStatusContext);
  const activeDao = useAtomValue(daoThemeAtom);

  useEffect(() => {
    // setStatus({
    //   participants: getParticipantsStatus(agreeRate, againstRate),
    //   quorum: isQuorumComplete(type, currentQuorum, targetQuorum),
    // });
  }, []);

  const QuorumCondition = () => {
    return (
      <div className={cn('quorum-condition-wrap')}>
        <div className={cn('progress-bar')}>
          <div className={cn('rate-gauge')} style={{ width: `${getQuorumRate(type, currentQuorum, targetQuorum)}%` }}></div>
        </div>
        <p className={cn('condition-info')}>
          {t('governance.proposal.quorumCondition')}
          <strong>
            {isQuorumComplete(type, currentQuorum, targetQuorum) ? `${t('governance.proposal.attain')}` : `${t('governance.proposal.unattained')}`}
          </strong>
          <span>
            ({currentQuorum.toLocaleString()} {t(`amountUnit.${activeDao.value}.unit2`)} / {targetQuorum.toLocaleString()}{' '}
            {t(`amountUnit.${activeDao.value}.unit2`)})
          </span>
        </p>
      </div>
    );
  };

  return (
    <div className={cn('quorum-info-wrap')}>
      <div className={cn('vote-displayer')}>
        <div className="chart">
          <SemiCirclePieChart
            data={[
              { value: agreeRate, category: 'For' },
              { value: againstRate, category: 'Against' },
            ]}
          />
        </div>
        <div className={cn('factor agree')}>
          <strong>
            <span className={cn('icon')}>
              <Image
                src="/assets/images/icon/ico_agree.png"
                alt=""
                loader={NileCDNLoader}
                width={isDaoTablet ? 12 : 16}
                height={isDaoTablet ? 12 : 16}
              />
            </span>
            {type === 'temperature' ? `${t('governance.proposal.empathy')}` : `${t('governance.proposal.for')}`}
          </strong>
          <em>{agreeRate}%</em>
          <p className={cn('detail')}>
            {/* 23.04.07 수정: 4/6 DAO 영문 번역 이슈로 인한 그래프 영역 수정(공통) */}
            <span className={cn('exchange')}>
              {agreeGwdr.toLocaleString()} {t(`amountUnit.${activeDao.value}.unit2`)}
              <br />({agreeUser}
              {t('governance.proposal.person')})
            </span>
          </p>
        </div>
        <div className={cn('factor against')}>
          <strong>
            {type === 'temperature' ? `${t('governance.proposal.noempathy')}` : `${t('governance.proposal.against')}`}
            <span className={cn('icon')}>
              <Image
                src="/assets/images/icon/ico_against.png"
                alt=""
                loader={NileCDNLoader}
                width={isDaoTablet ? 12 : 16}
                height={isDaoTablet ? 12 : 16}
              />
            </span>
          </strong>
          <em>{againstRate}%</em>
          <p className={cn('detail')}>
            {/* 23.04.07 수정: 4/6 DAO 영문 번역 이슈로 인한 그래프 영역 수정(공통) */}
            <span className={cn('exchange')}>
              {againstGwdr.toLocaleString()} {t(`amountUnit.${activeDao.value}.unit2`)}
              <br />({againstUser}
              {t('governance.proposal.person')})
            </span>
          </p>
        </div>
      </div>
      {!trustCheck && <QuorumCondition />}
    </div>
  );
};

export type { QuorumType, GovernanceCaseType };
export default QuorumInfo;
