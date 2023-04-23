import getCollections from '@/components/neithstation/collectionsData';
import { ConType } from '@/state/daoAtom';
import { TFunction } from 'next-i18next';

type ReleaseType = {
  date: string;
  detail: { time: string; label: string }[];
};

/* 23.04.12 수정: collections 데이터 변수로 선언 */

const collections = getCollections();

const getReleaseDate = (activeConType: ConType, t: TFunction): ReleaseType[] => {
  const data = {
    cone: [
      {
        date: collections.neith.releaseDate,
        detail: [
          {
            time: collections.neith.cityOfNile!.civic,
            label: t('civic'),
          },
          {
            time: collections.neith.cityOfNile!.rare,
            label: t('rare'),
          },
        ],
      },
      {
        date: '2023-03-17',
        detail: [
          {
            time: collections.neith.cityOfNile!.epic,
            label: t('epic'),
          },
          {
            time: collections.neith.cityOfNile!.legendary,
            label: t('legendary'),
          },
          {
            time: collections.neith.cityOfNile!.mythical,
            label: t('mythical'),
          },
        ],
      },
    ],
    cora: [
      {
        date: collections.cora.releaseDate,
        detail: [
          {
            time: collections.cora.cityOfNile!.civic,
            label: t('civic'),
          },
        ],
      },
      {
        date: '2023-04-13',
        detail: [
          {
            time: collections.cora.cityOfNile!.rare,
            label: t('rare'),
          },
          {
            time: collections.cora.cityOfNile!.epic,
            label: t('epic'),
          },
          {
            time: collections.cora.cityOfNile!.legendary,
            label: t('legendary'),
          },
          {
            time: collections.cora.cityOfNile!.mythical,
            label: t('mythical'),
          },
        ],
      },
    ],
  };

  /* 23.04.12 수정: any 단언 추가 */
  return data[activeConType] as any;
};

export default getReleaseDate;
