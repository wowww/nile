import { useEffect, useState, forwardRef } from 'react';
import { windowResizeAtom } from '@/state/windowAtom';
import cn from 'classnames';
import { useAtomValue } from 'jotai';
import { Trans, useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import { NileCDNLoader } from '@/utils/image/loader';

import BgButton from '@/components/button/BgButton';
import OutlineButton from '@/components/button/OutlineButton';
import TextButton from '@/components/button/TextButton';
// import Reward from '@/components/chart/Reward';
import Tag from '@/components/tag/Tag';
import { useRouter } from 'next/router';

// components
import ItemArea from '../StationCheckMore/ItemArea';
import ControlArea from '../StationCheckMore/ControlArea';

type Props = {
  station?: boolean;
  ongoing?: boolean;
  participate?: {
    amount: string;
    percent: number;
  };
  chartData: ChartProps;
  isEnd?: boolean;
  joinAmount?: number; // 유저 스테이션 참여 토큰양
  list?: boolean; // 다오 홈 DAO List 영역 표현 방식으로 지정
};

type ChartProps = {
  goalNum: number;
  currentNum: number;
  // rate: number;
  participateNum: number;
};

type PeriodProps = {
  year?: string;
  quarter?: string;
  date?: string;
  hour?: string;
  minute?: string;
};

const DaoStationCheckMore = forwardRef<HTMLDivElement, Props>(
  ({ station, ongoing, participate, chartData, isEnd = false, joinAmount, list }, ref) => {
    const { t } = useTranslation('daoHome');
    const offset = useAtomValue(windowResizeAtom);
    const { locale } = useRouter();
    const [remainingPeriod, setRemainingPeriod] = useState<PeriodProps | undefined>({});
    const [logoResolution, setLogoResolution] = useState('pc');

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
    }, [locale, ongoing]);

    useEffect(() => {
      if (offset.width >= 1280) {
        setLogoResolution('pc');
      } else if (offset.width >= 768) {
        setLogoResolution('tablet');
      } else {
        setLogoResolution('mobile');
      }
    }, [offset.width]);

    return (
      <div className={cn('check-item-wrap', 'station-check')}>
        <div className={cn('check-item', 'about')} ref={ref}>
          <div className={cn('logo-wrap')}>
            <Image src={`/assets/images/img/img_daostation_wonder_${logoResolution}.png`} alt="" layout="fill" quality="100" loader={NileCDNLoader} />
          </div>
          <div className={cn('box-wrap')}>
            <div className={cn('title-wrap')}>
              <h3 className={cn('title')}>{t('check.about.title')}</h3>
              <p className={cn('desc')}>{t('check.about.desc')}</p>
              <TextButton buttonText={t('check.about.btn1')} iconValue="line-arrow" gapSpacing="lg" size="md" />
            </div>
            <ItemArea ongoing={ongoing} isEnd={isEnd} chartData={chartData} station={station} />
            <ControlArea joinAmount={joinAmount} ongoing={ongoing} isEnd={isEnd} participate={participate} list={list} chartData={chartData} />
          </div>
        </div>
        <div className={cn('check-item', 'reward')}>
          <div className={cn('title-wrap')}>
            <h3 className={cn('title')}>{t('check.reward.title')}</h3>
            <p className={cn('desc')}>{t('check.reward.desc')}</p>
          </div>
          <div className={cn('list-wrapper')}>
            <ul className={cn('list-wrap')}>
              <li>
                <span className={cn('img-wrap')}>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_reward_step1.svg" />
                </span>
                <span className={cn('text-wrap')}>
                  <strong className={cn('name')}>{t('check.reward.item.0.name')}</strong>
                </span>
              </li>
              <li>
                <span className={cn('arrow')}>
                  {offset.width >= 768 ? (
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_reward_arrow.svg" />
                  ) : (
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_reward_arrow_mobile.svg" />
                  )}
                </span>
                <span className={cn('img-wrap')}>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_reward_step2.svg" />
                </span>
                <span className={cn('text-wrap')}>
                  <strong className={cn('name')}>{t('check.reward.item.1.name')}</strong>
                </span>
              </li>
              <li>
                <span className={cn('arrow')}>
                  {offset.width >= 768 ? (
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_reward_arrow.svg" />
                  ) : (
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_reward_arrow_mobile.svg" />
                  )}
                </span>
                <span className={cn('img-wrap')}>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_reward_step3.svg" />
                </span>
                <span className={cn('text-wrap')}>
                  <strong className={cn('name')}>{t('check.reward.item.2.name')}</strong>
                </span>
              </li>
              <li>
                <span className={cn('arrow')}>
                  {offset.width >= 768 ? (
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_reward_arrow.svg" />
                  ) : (
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_reward_arrow_mobile.svg" />
                  )}
                </span>
                <span className={cn('img-wrap')}>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_reward_step4.svg" />
                </span>
                <span className={cn('text-wrap')}>
                  <strong className={cn('name')}>{t('check.reward.item.3.name')}</strong>
                </span>
              </li>
              <li>
                <span className={cn('arrow')}>
                  {offset.width >= 768 ? (
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_reward_arrow.svg" />
                  ) : (
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_reward_arrow_mobile.svg" />
                  )}
                </span>
                <span className={cn('img-wrap')}>
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/daostation/ico_reward_step5.svg" />
                </span>
                <span className={cn('text-wrap')}>
                  <strong className={cn('name')}>{t('check.reward.item.4.name')}</strong>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
);

export default DaoStationCheckMore;
