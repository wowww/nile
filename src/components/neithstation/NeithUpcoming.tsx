import cn from 'classnames';
import Image from 'next/image';
import { IconLogo } from '../logo/IconLogo';
import { NileCDNLoader } from '@/utils/image/loader';
import { useTranslation } from 'next-i18next';
import { useDday } from '@/hook/useDday';
import { StaticImageData } from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import getCollections from './collectionsData';
interface UpcomingDataType {
  image: string | StaticImageData;
  type: string;
  name: string;
  /* 23.03.12 수정: covenantValue 수정 (string -> number) */
  /* 23.04.12 수정: covenantValue, covenantValueWemix null 타입 추가 */
  covenantValue: string | null;
  covenantValueWemix: string | null;
  covenantDate: string;
  items: string;
}

const NeithUpcoming = () => {
  const { t } = useTranslation('neithStation');

  const [tokenWemix, setTokenWemix] = useState<any>();

  useEffect(() => {
    axios.get(`/api/tokenInfoList`).then(({ data }) => {
      data.forEach((token: any) => {
        if (token.token_symbol === 'WEMIX') {
          setTokenWemix(token);
        }
      });
    });
  }, []);

  const getCurrentValue = useCallback(
    (value: number) => {
      return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value * tokenWemix?.price);
    },
    [tokenWemix],
  );

  /* 23.04.12 수정: collections 데이터 변수로 선언 */
  const collections = getCollections(t);

  const upcomingData: UpcomingDataType[] = [
    {
      image: '/assets/images/img/img_neith_vault_upcoming01.png',
      type: 'cone',
      name: 'City of NEITH',
      covenantValue: getCurrentValue(198000),
      covenantValueWemix: '198,000',
      /* 23.04.12 수정: 타입 단언 추가 */
      covenantDate: collections.neith.covenantDate as string,
      items: '88',
    },
    {
      image: '/assets/images/img/img_neith_vault_upcoming02.png',
      type: 'tangled',
      name: 'Tangled',
      covenantValue: getCurrentValue(10000),
      covenantValueWemix: '10,000',
      /* 23.04.12 수정: 타입 단언 추가 */
      covenantDate: collections.tangled.covenantDate as string,
      items: '50',
    },
    /* 23.04.03 수정: cora 추가 */
    {
      image: '/assets/images/img/img_neith_vault_upcoming03.png',
      type: 'cora',
      name: 'City of RA',
      covenantValue: getCurrentValue(198000),
      covenantValueWemix: '198,000',
      /* 23.04.12 수정: 타입 단언 추가 */
      covenantDate: collections.cora.covenantDate as string,
      items: '88',
    },
    /* 23.04.12 수정: bagc 추가 */
    {
      image: '/assets/images/img/img_neith_vault_upcoming04.png',
      type: 'bagc',
      name: 'BAGC',
      covenantValue: null,
      covenantValueWemix: null,
      /* 23.04.12 수정: 타입 단언 추가 */
      covenantDate: collections.bagc.covenantDate as string,
      items: '300',
    },
  ];

  return (
    <div className={cn('upcoming-wrap')}>
      <strong className={cn('section-title')}>Upcoming Covenant Date</strong>
      {/* 23.03.12 수정 start: covenantValue 소수점 표기 수정 */}
      {upcomingData.map((d, i) => {
        return (
          <div key={`upcoming-card-${i}`} className={cn('upcoming-card')}>
            <div className={cn('image-wrap')}>
              <Image src={d.image} alt="" layout="fill" objectFit="cover" loader={NileCDNLoader} />
            </div>
            <div className={cn('text-wrap')}>
              <div className={cn('name-wrap')}>
                <IconLogo type={d.type} size={36} fullType />
                <strong className={cn('name')}>{d.name}</strong>
              </div>
              <div className={cn('info-wrap')}>
                <ul className={cn('info-detail')}>
                  <li className={cn('covenant-value')}>
                    {/* 23.03.14 수정 start: 기획 변경으로 순서 변경 */}
                    <span className={cn('label')}>Collection Covenant</span>
                    <strong className={cn('text')}>
                      {/* 23.04.12 수정: null 값이 있을 수 있어 null 값처리 */}
                      {d.covenantValueWemix ? d.covenantValueWemix + '\u00a0WEMIX' : t('tba')}
                      {d.covenantValue && <span>(${d.covenantValue})</span>}
                    </strong>
                  </li>
                  <li className={cn('covenant-date')}>
                    <span className={cn('label')}>Covenant Date</span>
                    <strong className={cn('text')}>{d.covenantDate}</strong>
                  </li>
                  <li className={cn('label')}>
                    <span className={cn('label')}>Items</span>
                    <strong className={cn('text')}>{d.items}</strong>
                  </li>
                </ul>
                <div className={cn('d-day-wrap')}>
                  <GetDateDiff date={d.covenantDate} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* 23.03.12 수정 end: covenantValue 소수점 표기 수정 */}
    </div>
  );
};

const GetDateDiff = ({ date }: { date: string }) => {
  const [days, hours] = useDday(new Date(date));

  const checkTemporaryExpectedDate = () => {
    if (typeof date === 'string' && !date.includes('-')) {
      return true;
    }
  };

  const diffSlice = (date: string | number, s: number, e: number) => {
    if (checkTemporaryExpectedDate()) return 0;
    if (typeof date === 'string') {
      return date.slice(s, e);
    } else {
      return String(date).slice(s, e);
    }
  };

  return (
    <>
      <div className={cn('days')}>
        <span className={cn('label')}>DAYS</span>
        <div className={cn('countdown')}>
          <div className={cn('number')}>
            <div className={cn('up')}>
              <span>{diffSlice(days, 0, 1)}</span>
            </div>
            <div className={cn('down')}>
              <span>{diffSlice(days, 0, 1)}</span>
            </div>
          </div>
          <div className={cn('number')}>
            <div className={cn('up')}>
              <span>{diffSlice(days, 1, 2)}</span>
            </div>
            <div className={cn('down')}>
              <span>{diffSlice(days, 1, 2)}</span>
            </div>
          </div>
          <div className={cn('number')}>
            <div className={cn('up')}>
              <span>{diffSlice(days, 2, 3)}</span>
            </div>
            <div className={cn('down')}>
              <span>{diffSlice(days, 2, 3)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={cn('hours')}>
        <span className={cn('label')}>HOURS</span>
        <div className={cn('countdown')}>
          <div className={cn('number')}>
            <div className={cn('up')}>
              <span>{diffSlice(hours, 0, 1)}</span>
            </div>
            <div className={cn('down')}>
              <span>{diffSlice(hours, 0, 1)}</span>
            </div>
          </div>
          <div className={cn('number')}>
            <div className={cn('up')}>
              <span>{diffSlice(hours, 1, 2)}</span>
            </div>
            <div className={cn('down')}>
              <span>{diffSlice(hours, 1, 2)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { NeithUpcoming };
