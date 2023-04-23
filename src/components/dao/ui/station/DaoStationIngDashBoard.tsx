/* eslint-disable react/no-unstable-nested-components */
import cn from 'classnames';
// import { useTranslation } from 'next-i18next';
import Tag from '@/components/tag/Tag';
import BgButton from '@/components/button/BgButton';
import Recruiting from '@/components/chart/Recruiting';

const DaoStationIngDashBoard = () => {
  // const { t } = useTranslation('daoStation');
  const rate = 34;

  return (
    <div className={cn('recruiting-section')}>
      <div className={cn('recruiting-section-inner')}>
        <div className={cn('recruiting-section-columns')}>
          <strong className={cn('recruiting-section-tit')}>Recruiting Now</strong>
          <div className="recruiting-chart-data">
            <strong className={cn('data-percent')}>{rate}%</strong>
            <strong className={cn('data-dollar')}>
              4,590,000
              <span className={cn('data-unit')}>WEMIX</span>
            </strong>
          </div>
          <Recruiting rate={rate} goalNum="13,500,000" />
        </div>
        <div className={cn('recruiting-section-columns')}>
          <strong className={cn('recruiting-section-tit')}>Remaining Period</strong>
          <div className={cn('remaining-period-dday')}>
            <div>
              <strong>01</strong>
              <span>DAYS</span>
            </div>
            <div>
              <strong>21</strong>
              <span>HOURS</span>
            </div>
            <div>
              <strong>32</strong>
              <span>MINUTES</span>
            </div>
            <div>
              <strong>48</strong>
              <span>SECONDS</span>
            </div>
          </div>
          <div className={cn('remaining-period-date')}>
            <span>
              <Tag size="xs" color="positive">
                OPEN
              </Tag>
              2022.09.01 11:00 AM
            </span>
            <span>
              <Tag size="xs" color="negative">
                CLOSE
              </Tag>
              2022.09.07 11:00 AM
            </span>
          </div>
        </div>
        <div className={cn('recruiting-section-columns')}>
          <BgButton buttonText="Join" color="highlight" size="lg" />
        </div>
      </div>
    </div>
  );
};

export default DaoStationIngDashBoard;
