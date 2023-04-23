import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useTranslation, Trans } from 'next-i18next';
import Reward from '@/components/chart/Reward';
import { useRouter } from 'next/router';
import Tag from '@/components/tag/Tag';
import OutlineButton from '@/components/button/OutlineButton';

interface ComponentProps {
  ongoing?: boolean;
  isEnd?: boolean;
  chartData?: ChartProps;
  station?: boolean;
}

type PeriodProps = {
  year?: string;
  quarter?: string;
  date?: string;
  hour?: string;
  minute?: string;
};

type ChartProps = {
  goalNum: number;
  currentNum: number;
  participateNum: number;
};

const ItemArea = ({ ongoing, isEnd, chartData, station }: ComponentProps) => {
  const { t } = useTranslation('daoHome');

  const [remainingPeriod, setRemainingPeriod] = useState<PeriodProps | undefined>({});
  const { locale } = useRouter();

  useEffect(() => {
    // 임시데이터
    if (ongoing) {
      setRemainingPeriod({
        date: '7',
        hour: '22',
        minute: '11',
      });
    } else {
      if (locale === 'en') {
        setRemainingPeriod({
          year: '2023',
          quarter: 'First',
        });
      } else {
        setRemainingPeriod({
          year: '2023',
          quarter: '1',
        });
      }
    }
  }, [ongoing, locale]);

  const periodUnit = () => {
    // 시작 전
    if (!ongoing && !isEnd) {
      return (
        <Trans
          i18nKey={'check.about.subdesc1'}
          ns="daoHome"
          values={{
            period:
              locale === 'ko'
                ? `${remainingPeriod?.year}${t('check.about.year')} ${remainingPeriod?.quarter}${t('check.about.quarter')}`
                : `${t('check.about.quarter')} ${remainingPeriod?.quarter} ${t('check.about.year')} ${remainingPeriod?.year}`,
          }}
        >
          <strong></strong>
        </Trans>
      );
    } else if (ongoing && !isEnd) {
      // 진행 중
      return (
        <Trans
          i18nKey={'check.about.subdesc2'}
          ns="daoHome"
          values={{
            period: `${remainingPeriod?.date}${t('check.about.date')} ${remainingPeriod?.hour}${t('check.about.hour')} ${remainingPeriod?.minute}${t(
              'check.about.minute',
            )}`,
          }}
        >
          <strong></strong>
        </Trans>
      );
    } else if (isEnd) {
      // 모집 종료
      return (
        <Trans i18nKey={'check.about.subdesc3'} ns="daoHome" values={{}}>
          <strong></strong>
        </Trans>
      );
    }

    return <span>there's something wrong...</span>;
  };

  return (
    <div className={cn('station-recruit-item-wrap')}>
      {isEnd && chartData && !station && chartData.currentNum >= chartData.goalNum ? (
        <div className={cn('recruit-complete')}>
          <strong className={cn('complete-title')}>{t('check.about.subdesc4')}</strong>
          <p className={cn('desc')}>{t('check.about.subdesc5')}</p>
          <OutlineButton buttonText={t('check.about.subdescBtn')} color="black" size="sm" />
        </div>
      ) : (
        chartData && (
          <>
            <div className={cn('period-wrap')}>
              <p className={cn('period')}>{periodUnit()}</p>
              <div className={cn('caption-wrap')}>
                {/* 모집전, 모집중 - 참여전, 모집중 - 참여후에 따라 문구 변경 */}
                {ongoing || isEnd ? (
                  <div className={cn('progress')}>
                    <div className={cn('inner')}>
                      <Tag size="xs" color="positive">
                        OPEN
                      </Tag>
                      <p className={cn('caption')}>2022.09.01 11:00</p>
                    </div>
                    <div className={cn('inner')}>
                      <Tag size="xs" color="negative">
                        CLOSE
                      </Tag>
                      <p className={cn('caption')}> 2022.09.07 11:00</p>
                    </div>
                  </div>
                ) : (
                  <div className={cn('preview')}>
                    <div className={cn('inner')}>
                      <Tag size="xs" color="positive">
                        SOON
                      </Tag>
                      <p className={cn('caption')}>{t('check.about.caption')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={cn('data-wrap')}>
              <div className={cn('chart-wrap')}>
                <Reward
                  // currentNum={chartData.currentNum}
                  // goalNum={chartData.goalNum}
                  participate={chartData.participateNum}
                  ongoing={ongoing}
                  isEnd={isEnd}
                />
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default ItemArea;
