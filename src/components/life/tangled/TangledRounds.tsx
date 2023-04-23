import { NileCDNLoader } from '@/utils/image/loader';
import cn from 'classnames';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { message } from 'antd';

import BgButton from '@/components/button/BgButton';

const cards = [
  '/assets/images/img/img_tangled_luxury_card_1.png',
  '/assets/images/img/img_tangled_luxury_card_2.png',
  '/assets/images/img/img_tangled_luxury_card_3.png',
  '/assets/images/img/img_tangled_luxury_card_4.png',
  '/assets/images/img/img_tangled_luxury_card_5.png',
];

const cards2 = [
  '/assets/images/img/img_tangled_luxury_card_6.png',
  '/assets/images/img/img_tangled_luxury_card_7.png',
  '/assets/images/img/img_tangled_luxury_card_8.png',
  '/assets/images/img/img_tangled_luxury_card_9.png',
  '/assets/images/img/img_tangled_luxury_card_10.png',
];

interface RoundsType {
  index?: number;
  status: string;
  releaseDate: string;
  covenantDate: string;
  neithCovenant: number;
  cards: string[];
}
const data: RoundsType[] = [
  {
    // status : on(판매 중), off(판매 예정), soldout(판매 완료)
    status: 'soldout',
    releaseDate: '2023-03-23',
    covenantDate: '2024-03-22',
    neithCovenant: 200,
    cards,
  },
  {
    status: 'soldout',
    releaseDate: '2023-04-20',
    covenantDate: '2024-03-22',
    neithCovenant: 200,
    cards: cards2,
  },
  // {
  //   status: 'off',
  //   releaseDate: '2023-04-20',
  //   covenantDate: '2024-03-22',
  //   neithCovenant: 200,
  //   cards: cards3,
  // },
];

const TangledRound = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [currentIndex, setCurrentIndex] = useState(2);

  const handlePrevClick = () => {
    // if (currentIndex < data.length || data.length <= 1) return;
    setCurrentIndex(currentIndex - 1);
    console.log('prev:', currentIndex);
  };
  const handleNextClick = () => {
    // if (currentIndex >= data.length) return;
    setCurrentIndex(currentIndex + 1);
    console.log('next:', currentIndex);
  };

  const Rounds = ({ index, status, releaseDate, covenantDate, neithCovenant, cards }: RoundsType) => {
    const { t } = useTranslation('life');
    return (
      <>
        {index === currentIndex && (
          <div className={cn('tangled-rounds')}>
            <div className={cn('tangled-round-info-wrap')}>
              {/* 23.03.29 수정: 판매 종료 off 클래스 누락 추가 */}
              {/* TODO: 판매 완료시 off 클래스 추가 부탁드립니다. */}
              <div className={cn(`tangled-round-heading ${status === 'soldout' ? 'off' : ''}`)}>
                <span>
                  {/* {t('tangled.nft.rounds.status.soldout')} */}
                  {/* {status ? t('tangled.nft.rounds.status.on') : t('tangled.nft.rounds.status.off')} */}

                  {status === 'on' && t('tangled.nft.rounds.status.on')}
                  {status === 'off' && t('tangled.nft.rounds.status.off')}
                  {status === 'soldout' && t('tangled.nft.rounds.status.soldout')}
                </span>
                <h2>{t('tangled.nft.rounds.round', { number: index })}</h2>
              </div>
              <ul className={cn('tangled-round-info')}>
                <li>
                  <span>Release Date</span>
                  <p>{releaseDate}</p>
                </li>
                <li>
                  <span>Covenant Date</span>
                  <p>{covenantDate}</p>
                </li>
                <li>
                  <span>NEITH Covenant</span>
                  <p>
                    {neithCovenant} <span>WEMIX</span>
                  </p>
                </li>
              </ul>
            </div>
            <div className={cn('tangled-round-cards')}>
              <Swiper modules={[Navigation]} slidesPerView={'auto'}>
                <ul>
                  {cards &&
                    cards.map((c, i) => (
                      <SwiperSlide key={`card-${i}`}>
                        <div className={cn('tangled-round-card-image')}>
                          <Image src={c} alt={`tangled cards ${index + 1}`} objectFit="contain" layout="fill" loader={NileCDNLoader} />
                        </div>
                      </SwiperSlide>
                    ))}
                </ul>
              </Swiper>
            </div>
            <div className={cn('tangled-show-all-cards')}>
              <BgButton
                href="/marketplace/TTPS"
                color="white"
                buttonText={`${t('tangled.nft.rounds.showAll', { number: currentIndex })}`}
                size="lg"
                type="primary"
                // onClick={() => message.info(t('tangled.main.comingsoon'))}
              />
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={cn('tangled-rounds-wrap')}>
      <div className={cn('round-swiper-buttons')}>
        <div>
          <button ref={prevRef} className={cn('round-swiper-button', 'round-prev')} onClick={handlePrevClick} disabled={currentIndex === 1}>
            <ReactSVG src={`https://nile.blob.core.windows.net/images/assets/images/icon/ico_single_arrow.svg`} />
          </button>
          <button ref={nextRef} className={cn('round-swiper-button', 'round-next')} onClick={handleNextClick} disabled={currentIndex === data.length}>
            <ReactSVG src={`https://nile.blob.core.windows.net/images/assets/images/icon/ico_single_arrow.svg`} />
          </button>
        </div>
      </div>
      {data &&
        data.map((d, i) => (
          <SwiperSlide key={'round' + i}>
            <Rounds
              index={i + 1}
              status={d.status}
              releaseDate={d.releaseDate}
              covenantDate={d.covenantDate}
              neithCovenant={d.neithCovenant}
              cards={d.cards}
            />
          </SwiperSlide>
        ))}
    </div>
  );
};

export default TangledRound;
