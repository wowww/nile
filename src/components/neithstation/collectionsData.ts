import { TFunction } from 'next-i18next';

type CollectionReleaseDate = {
  releaseDate: string | undefined;
  covenantDate: string | undefined;
};

type CityOfNileReleaseTime = {
  cityOfNile?: {
    civic: string;
    rare: string;
    epic: string;
    legendary: string;
    mythical: string;
  };
};

/* 23.04.12 수정: bagc 타입 추가 */
type Collection = 'neith' | 'cora' | 'tangled' | 'bagc';

const getCollections = (t?: TFunction) => {
  const collections: Record<Collection, CollectionReleaseDate & CityOfNileReleaseTime> = {
    neith: {
      releaseDate: '2023-03-16',
      covenantDate: '2024-03-16',
      cityOfNile: {
        civic: '12:00',
        rare: '18:00',
        epic: '12:00',
        legendary: '15:00',
        mythical: '18:00',
      },
    },
    cora: {
      releaseDate: '2023-04-12',
      covenantDate: '2024-04-12',
      cityOfNile: {
        civic: '16:00',
        rare: '10:00',
        epic: '16:00',
        legendary: '17:00',
        mythical: '18:00',
      },
    },
    tangled: {
      releaseDate: '2023-04-20',
      covenantDate: '2024-03-22',
    },
    /* 23.04.12 수정: bagc 데이터 추가 */
    bagc: {
      releaseDate: t && t('vault.upcomingCovenant.bagc.releaseDate'),
      covenantDate: t && t('vault.upcomingCovenant.bagc.covenantDate'),
    },
  };

  return collections;
};

export type { CollectionReleaseDate, CityOfNileReleaseTime };
export default getCollections;
