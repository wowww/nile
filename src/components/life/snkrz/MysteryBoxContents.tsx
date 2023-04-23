import { useState } from 'react';
import { Trans, useTranslation } from 'next-i18next';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Autoplay } from 'swiper';
import 'swiper/css/effect-fade';

import cn from 'classnames';
import { NileCDNLoader } from '@utils/image/loader';
import Tag from '@/components/tag/Tag';

interface Props {
  title: string;
  imgUrl: string;
  item?: { imgUrl: string }[];
  innerList?: string;
  imgSwiper?: string[];
}

const MysteryBoxContents = () => {
  const { t } = useTranslation(['life', 'common']);
  const mysteryBoxInnerList = t(`snkrz.nft.mystery.list.3.innerList.list`, { returnObjects: true });

  const [swiperClassName, setSwiperClassName] = useState('first-slide');

  const mysteryBoxContents: Props[] = [
    {
      title: 'Normal Shoe Box 3ea',
      imgUrl: '/assets/images/img/img_life_snkrz_01',
      imgSwiper: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
      item: [
        { imgUrl: '/assets/images/img/img_snkrz_mystery1_1.jpg' },
        { imgUrl: '/assets/images/img/img_snkrz_mystery1_2.jpg' },
        { imgUrl: '/assets/images/img/img_snkrz_mystery1_3.jpg' },
        { imgUrl: '/assets/images/img/img_snkrz_mystery1_4.jpg' },
        { imgUrl: '/assets/images/img/img_snkrz_mystery1_5.jpg' },
      ],
    },
    {
      title: 'NILE Edition Epic Skin',
      imgUrl: '/assets/images/img/img_life_snkrz_02.png',
    },
    {
      title: 'Rare Random Skin Box 3ea',
      imgUrl: '/assets/images/img/img_life_snkrz_03.png',
      item: [
        { imgUrl: '/assets/images/img/img_snkrz_mystery2_1.jpg' },
        { imgUrl: '/assets/images/img/img_snkrz_mystery2_2.jpg' },
        { imgUrl: '/assets/images/img/img_snkrz_mystery2_3.jpg' },
        { imgUrl: '/assets/images/img/img_snkrz_mystery2_4.jpg' },
        { imgUrl: '/assets/images/img/img_snkrz_mystery2_5.jpg' },
      ],
    },
    {
      title: 'Tool Set',
      imgUrl: '/assets/images/img/img_life_snkrz_04.png',
      innerList: mysteryBoxInnerList,
    },
  ];
  return (
    <div className={cn('mystery-contents-wrap')}>
      <ul className="contents-list-wrap">
        {mysteryBoxContents.map((item, index) => {
          return (
            <li key={`list${index}`} className={cn('list')}>
              <div className={cn('list-img-wrap', item.imgSwiper && 'img-swiper')}>
                {item.imgSwiper ? (
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    modules={[EffectFade, Autoplay]}
                    effect="fade"
                    loop={true}
                    speed={500}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    allowTouchMove={false}
                  >
                    {item.imgSwiper.map((list, imgIndex) => {
                      return (
                        <SwiperSlide key={`img-item${imgIndex}`}>
                          <div className={cn('img-wrap')}>
                            <Image
                              src={imgIndex < 9 ? `${item.imgUrl}_0${imgIndex + 1}.png` : `${item.imgUrl}_${imgIndex + 1}.png`}
                              alt=""
                              layout="fill"
                              quality="100"
                              loading="eager"
                              loader={NileCDNLoader}
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                ) : (
                  <Image src={item.imgUrl} alt="" layout="fill" quality="100" loading="eager" loader={NileCDNLoader} />
                )}
              </div>
              <div className={cn('content-inner')}>
                <div className={cn('inner')}>
                  <Tag size="s" bg color="snkrz">
                    Item {index + 1}
                  </Tag>
                  <h4 className={cn('item-title')}>{item.title}</h4>

                  <p className={cn('item-desc')}>
                    {index === 1 ? (
                      <Trans
                        i18nKey={`snkrz.nft.mystery.list.${index}.desc`}
                        ns="life"
                        values={{
                          strong: t(`snkrz.nft.mystery.list.${index}.strong`),
                        }}
                      >
                        <strong></strong>
                      </Trans>
                    ) : (
                      t(`snkrz.nft.mystery.list.${index}.desc`)
                    )}
                  </p>
                  {item.innerList && (
                    <div className={cn('inner-list')}>
                      <strong className={cn('title')}>{t('snkrz.nft.mystery.list.3.innerList.title')}</strong>
                      <ul className={cn('list-dot')}>
                        {Object.keys(item.innerList).map((list, innerIndex) => {
                          return <li key={`inner-list-${innerIndex}`}>{t(`snkrz.nft.mystery.list.3.innerList.list.${innerIndex}`)}</li>;
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {item.item && (
                <div className={cn('item-slide-wrap', swiperClassName)}>
                  <Swiper
                    slidesPerView={5}
                    spaceBetween={10}
                    onSlideChange={(swiper: SwiperCore) => {
                      if (swiper.isBeginning) {
                        setSwiperClassName('first-slide');
                      } else if (swiper.isEnd) {
                        setSwiperClassName('last-slide');
                      } else {
                        setSwiperClassName('');
                      }
                    }}
                    breakpoints={{
                      360: {
                        slidesPerView: 3.3,
                        spaceBetween: 12,
                      },
                      768: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                      },
                    }}
                  >
                    {item.item.map((slideItem, slideIndex) => {
                      return (
                        <SwiperSlide key={`slide-item${slideIndex}`}>
                          <div className={cn('img-wrap')}>
                            <Image src={slideItem.imgUrl} alt="" layout="fill" quality="100" loading="eager" loader={NileCDNLoader} />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MysteryBoxContents;
