import { ConType } from '@/state/daoAtom';
import { useTranslation } from 'next-i18next';
import godStore from './godStore';

type God = {
  grade: 'Mythical' | 'Legendary' | 'Epic' | 'Rare';
  name: string;
  date: string;
  value: number;
  tagGroup: string[];
  desc?: string;
  image?: string;
};

type Civic = {
  name: string;
  image: string;
};

const setConStore = (
  type: ConType,
): {
  gods: God[];
  pharaohs: God[];
  civics: Civic[];
} => {
  if (!type) throw new Error('데이터 타입이 없습니다.');

  const { t } = useTranslation('life');

  const PATH = '/assets/images/img/con/';

  const getImagePath = (type: ConType, i: number, pharaohs: boolean = false) => {
    const startIndex = pharaohs ? 11 : 1;
    return PATH + `${type}/img_${type}_${startIndex + i}.jpg`;
  };

  const setCivics = (type: ConType) => {
    const result = [];
    for (let i = 0; i < 80; i++) {
      let count = 100 + i + 1;
      result.push({
        name: `${type} #${count} CIVIC`,
        image: PATH + `${type}/img_${type}_${type}.jpg`,
      });
    }
    return result;
  };

  return {
    gods: godStore.get(type)!.gods.map((cg, i) => ({
      ...cg,
      desc: t(`godsCard.${type}.${i + 1}`),
      image: getImagePath(type, i),
    })),
    pharaohs: godStore.get(type)!.pharaohs.map((cp, i) => ({ ...cp, image: getImagePath(type, i, true) })),
    civics: setCivics(type),
  };
};

const conStore = new Map<ConType, Record<'gods' | 'pharaohs', God[]>>();

/**
 *
 * useTranslation을 불러오기 위해 함수로 감싸서 store를 리턴합니다.
 * @returns conStore
 */

const getConStore = () => {
  conStore.set('cone', setConStore('cone'));
  conStore.set('cora', setConStore('cora'));
  return conStore;
};

export type { God, Civic };
export { getConStore };
