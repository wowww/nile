import cn from 'classnames';
import { ReactSVG } from 'react-svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

//props로 받아올 데이터 타입
type valueType = {
  type: 'increase' | 'decrease';
  volume: string;
};

export type dataType = {
  title: string;
  volume: string;
  week: valueType;
  month: valueType;
};

const ScanTransaction = () => {
  //transaction 데이터
  const TransactionData: dataType[] = [
    {
      title: 'Transaction Volume',
      volume: '$ 0',
      week: {
        type: 'increase',
        volume: '$0',
      },
      month: {
        type: 'increase',
        volume: '$0',
      },
    },
    {
      title: 'Total Treasury',
      volume: '$ 0',
      week: {
        type: 'decrease',
        volume: '-$0',
      },
      month: {
        type: 'increase',
        volume: '$0',
      },
    },
    {
      title: 'Governance Token Holders',
      volume: '0',
      week: {
        type: 'increase',
        volume: '+0' /* 23.04.05 수정: increase의 volumn에는 + 추가 */,
      },
      month: {
        type: 'decrease',
        volume: '-' /* 23.04.05 수정: 값이 없는 경우(Empty Case)는 하이픈 표기 */,
      },
    },
    {
      title: 'Voters & Proposal Makers',
      volume: '0',
      week: {
        type: 'decrease',
        volume: '-0',
      },
      month: {
        type: 'increase',
        volume: '+0' /* 23.04.05 수정: increase의 volumn에는 + 추가 */,
      },
    },
  ];

  return (
    <div className={cn('transaction-card-wrap')}>
      <Swiper
        modules={[Pagination]}
        className={cn('transaction-card')}
        breakpoints={{
          320: {
            slidesPerView: 'auto',
            spaceBetween: 8,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 0,
            centeredSlides: false,
          },
          1439: {
            slidesPerView: 4,
            spaceBetween: 16,
            centeredSlides: false,
          },
        }}
        pagination={{
          clickable: true,
        }}
      >
        {TransactionData.map((t: any, i: number) => (
          <SwiperSlide key={`${t}-${i}`}>
            <div className={cn('title-wrap')}>
              <strong>{t.title}</strong>
              <div className={cn('volume-wrap')}>
                {t.volume.includes('$') ? (
                  <>
                    <span className={cn('dollar')}>$</span>
                    <span className={cn('dollar-volume')}>{t.volume.replace('$', '')}</span>
                  </>
                ) : (
                  <span className={cn('dollar-volume')}>{t.volume}</span>
                )}
              </div>
            </div>
            <div className={cn('week-wrap')}>
              <div className={cn('week-detail')}>
                <strong>1 WEEK</strong>
                <div className={cn('detail-info')}>
                  {/* 23.04.05 수정: 화살표 대신 +,-로 상승/하강 표기 */}
                  {/* 23.04.05 수정: 값이 없는 경우(empty case)에는 empty 클래스 추가 */}
                  {/* 23.03.30 수정: 검수 - 화살표 아이콘 삭제 */}
                  {t.week.volume.includes('$') ? (
                    <>
                      <span className={cn('type')}>{t.week.type === 'decrease' ? '-' : '+'}</span>
                      <span className={cn('dollar')}>$</span>
                      <span className={cn('volume', t.week.volume === '-' && 'empty')}>{t.week.volume.replace('$', '').replace('-', '')}</span>
                    </>
                  ) : (
                    <span className={cn('volume', t.week.volume === '-' && 'empty')}>{t.week.volume}</span>
                  )}
                </div>
              </div>
              <div className={cn('week-detail')}>
                <strong>1 MONTH</strong>
                <div className={cn('detail-info')}>
                  {/* 23.04.05 수정: 화살표 대신 +,-로 상승/하강 표기 */}
                  {/* 23.04.05 수정: 값이 없는 경우(empty case)에는 empty 클래스 추가 */}
                  {/* 23.03.30 수정: 검수 - 화살표 아이콘 삭제 */}
                  {t.month.volume.includes('$') ? (
                    <>
                      <span className={cn('type')}>{t.month.type === 'decrease' ? '-' : '+'}</span>
                      <span className={cn('dollar')}>$</span>
                      <span className={cn('volume', t.month.volume === '-' && 'empty')}>{t.month.volume.replace('$', '').replace('-', '')}</span>
                    </>
                  ) : (
                    <span className={cn('volume', t.month.volume === '-' && 'empty')}>{t.month.volume}</span>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ScanTransaction;
