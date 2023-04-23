import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import DaoStationCheckMore from '@components/dao/ui/station/DaoStationCheckMore';
import { useTranslation } from 'next-i18next';
import RecruitMarqueeBanner, { RecruitMarqueeBannerItemType } from './RecruitMarqueeBanner';

interface Props {
  setIsFloatingBar: (isFloatingBar: boolean) => void;
}

const RecruitingTop = ({ setIsFloatingBar }: Props) => {
  const { t } = useTranslation('dao');

  const ref = useRef<HTMLDivElement>(null);

  const [y, setY] = useState<number | undefined>();

  const getPosition = () => {
    const y = ref.current?.getBoundingClientRect().top;
    const height = ref.current?.clientHeight;
    if (y && height) {
      setY(y + height);
    }
  };

  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', getPosition);
    return () => {
      window.removeEventListener('scroll', getPosition);
    };
  }, []);

  useEffect(() => {
    if (y && y < 0) {
      setIsFloatingBar(true);
    } else {
      setIsFloatingBar(false);
    }
  }, [y]);

  const TempBannerItem: RecruitMarqueeBannerItemType[] = [
    {
      name: '0x34fd...df67',
      figure: 1200,
    },
    {
      name: '0x34fd...df61',
      text: '안녕하세용',
      figure: 1200,
    },
    {
      name: '0x34fd...df62',
      figure: 1200,
    },
    {
      name: '0x34fd...df63',
      figure: 1200,
    },
    {
      name: '0x34fd...df64',
      text: '열심히 활동하겠읍니다!',
      figure: 1200,
    },
    {
      name: '0x34fd...df65',
      figure: 1200,
    },
    {
      name: '0x34fd...df66',
      figure: 1200,
    },
    {
      name: '0x34fd...df68',
      figure: 1200,
    },
    {
      name: '0x34fd...df69',
      figure: 1200,
    },
    {
      name: '0x34fd...df60',
      figure: 1200,
      tag: t('station.recruiting.banner.tag', { n: 100 }),
    },
  ];

  return (
    <div className={cn('recruiting-top-wrap')}>
      <div className={cn('inner-wrap')}>
        <div className={cn('recruiting-title-wrap')}>
          <h2 className={cn('title')}>{t('station.recruiting.checkMore.title')}</h2>
        </div>
        <DaoStationCheckMore
          station
          chartData={{
            goalNum: 1500010,
            currentNum: 1000000,
            // rate: 0,
            participateNum: 0,
          }}
          ongoing={false}
          ref={ref}
        />
      </div>
      <RecruitMarqueeBanner itemList={TempBannerItem} loopTimes={3} />
    </div>
  );
};

export default RecruitingTop;
