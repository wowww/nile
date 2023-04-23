import cn from 'classnames';
import Image from 'next/image';
import SquareTag from '@/components/tag/SquareTag';
import TextButton from '@/components/button/TextButton';
import { useTranslation } from 'next-i18next';
import { ChoiceData } from '../../../pages';
import { NileCDNLoader } from '@utils/image/loader';
import NileCollection from '@/models/nile/marketplace/NileCollection';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NileApiService } from '@/services/nile/api';
/* 23.03.11 수정: 버튼 스타일 변경으로 인한 컴포넌트 추가 */
import OutlineButton from '../button/OutlineButton';
/* 23.03.22 수정: 마켓플레이스 바로가기 버튼 추가 */
import BgButton from '../button/BgButton';
import { message } from 'antd';

interface NilePickProps {
  pickData?: ChoiceData[];
}

const NilePick = ({ pickData }: NilePickProps) => {
  const { t } = useTranslation('nile');
  const router = useRouter();
  const api = NileApiService();

  const [lus, setLus] = useState<NileCollection>();

  useEffect(() => {
    api.marketplace.collection
      .getItem(
        {
          slug: 'LUS',
        },
        true,
        2,
      )
      .then(({ data }) => setLus(data.result?.collection))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClickLink = (link?: string) => {
    if (link) {
      router.push(link).then(() => {
        // nothing
      });
    }
  };

  return (
    <div className={cn('pick-card-wrap')}>
      {pickData && (
        <ul className={cn('pick-card-list')}>
          {pickData.map((item: ChoiceData) => (
            /* 23.02.08 수정: 디자인 변경에 따른 풀사이즈(큰타입) 제거 */
            <li key={item?.pickTitle} className={cn('card-list', 'box')}>
              {/* {item?.additionLink ? (
                <>
                  <div className={cn('card-top')}>
                    <div className={cn('img-block')}>
                      <div className={cn('tag-wrap')}>{item?.tag && <SquareTag>{t(item.tag)}</SquareTag>}</div>
                      <div className={cn('img-wrap')}>
                        {item?.image && (
                          <Image src={item.image} alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
                        )}
                      </div>
                    </div>
                    <div className={cn('info-block')}>
                      {item?.pickTitle && <span className={cn('product-name')}>{t(item.pickTitle)}</span>}
                      {item?.pickDescription && <strong className={cn('product-desc')}>{t(item.pickDescription)}</strong>}
                      <div className={cn('link-block')}>
                        {item?.buttonType?.map((buttonItem, bIdx) => {
                          if (buttonItem.link)
                            return (
                              <TextButton
                                key={`button-type${bIdx}`}
                                buttonText={t(buttonItem?.buttonText ?? '')}
                                iconValue="line-arrow"
                                href={buttonItem.link}
                                gapSpacing="lg"
                                size="md"
                              />
                            );
                        })}
                      </div>
                    </div>
                  </div> */}
              {/*<ul className={cn('pick-addition-list')}>*/}
              {/*  {lus?.tokens?.map((item) => (*/}
              {/*    <NileChoiceAdditionItem nft={item} key={item?.id} />*/}
              {/*  ))}*/}
              {/*</ul>*/}
              {/* </>
              ) : ( */}
              {/* 23.02.09 수정: 온클릭 이벤트 위치 변경 */}
              <div className={cn('card-top link')}>
                <div className={cn('img-block')}>
                  {/* 23.03.12 수정: tag 노출 조건 변경 */}
                  {item?.tag && (
                    <div className={cn('tag-wrap')}>
                      <SquareTag>{t(item.tag)}</SquareTag>
                    </div>
                  )}
                  <div className={cn('img-wrap')}>
                    {item?.image && (
                      <Image src={item.image} alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
                    )}
                  </div>
                </div>
                <div className={cn('info-block')}>
                  {item?.pickTitle && <span className={cn('product-name')}>{t(item.pickTitle)}</span>}
                  {item?.pickDescription && <strong className={cn('product-desc')}>{t(item.pickDescription)}</strong>}
                  <div className={cn('link-block')}>
                    {' '}
                    {item?.buttonType?.map((buttonItem, bIdx) => {
                      if (buttonItem.link)
                        return (
                          /* 23.03.11 수정: 버튼 스타일 변경 */
                          /* 23.03.22 수정: 
                            - marketplace 진입 버튼 추가 
                            - src/mocks/home/choice.json 목업 데이터에 버튼 데이터/marketOpen 구분 데이터 추가
                            - marketOpen 전에는 마켓플레이스 바로가기 버튼 토스트 팝업 처리
                            - TODO: src/mocks/home/choice.json에 tangled 마켓 오픈 시 URL 확인 필요!
                          */
                          <>
                            {bIdx === 0 ? (
                              <OutlineButton
                                key={`button-type${bIdx}`}
                                color="black"
                                buttonText={t(buttonItem?.buttonText ?? '', { ns: 'common' })}
                                size="md"
                                onClick={() => onClickLink(item?.additionLink ? undefined : item?.buttonType?.at(bIdx)?.link)}
                              />
                            ) : (
                              <OutlineButton
                                key={`button-type${bIdx}`}
                                color="black"
                                buttonText={t(buttonItem?.buttonText ?? '', { ns: 'common', name: 'Marketplace' })}
                                size="md"
                                /* 23.03.24 수정: 주석 삭제, 토스트 팝업 복구 */
                                type={!item?.marketOpen ? 'primary' : undefined}
                                onClick={() =>
                                  item?.marketOpen
                                    ? onClickLink(item?.additionLink ? undefined : item?.buttonType?.at(bIdx)?.link)
                                    : message.info({ content: t('comingsoon', { ns: 'common' }), key: 'toast' })
                                }
                              />
                            )}
                          </>
                        );
                    })}
                  </div>
                </div>
              </div>
              {/* 23.02.08 수정: 디자인 변경에 따른 풀사이즈(큰타입) 제거 */}
              {/* )} */}
            </li>
          ))}
        </ul>
      )}
      {/* <div className={cn('control-wrap')}>
        <OutlineButton buttonText={t('viewMore')} color="black" size="md" iconType iconValue="line-arrow" align />
      </div> */}
    </div>
  );
};

export default NilePick;
