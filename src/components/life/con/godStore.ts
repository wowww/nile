import { ConType } from '@/state/daoAtom';
import { God } from './conStore';

type GodStoreType = {
  gods: God[];
  pharaohs: God[];
};

const coneGodsPharaohs: GodStoreType = {
  gods: [
    {
      grade: 'Mythical',
      name: 'CONE #1 NEITH',
      date: '2024-03-16',
      value: 100000,
      tagGroup: ['Gold, Lion-shaped', 'Gold Silk Klaft', 'Majestic', 'Sacred Pattern'],
    },
    {
      grade: 'Legendary',
      name: 'CONE #2 ATUM',
      date: '2024-03-16',
      value: 50000,
      tagGroup: ['Gold Pschent', 'Majestic', 'Gold Pattern', 'Solemn Yellow'],
    },
    {
      grade: 'Epic',
      name: 'CONE #3 APOPHIS',
      date: '2024-03-16',
      value: 10000,
      tagGroup: ['Silver, Snake-shaped', 'Silver, Patterned Klaft', 'Majestic', 'Silver Pattern'],
    },
    {
      grade: 'Epic',
      name: 'CONE #4 KHNUM',
      date: '2024-03-16',
      value: 10000,
      tagGroup: ['Silver, Sheep-shaped', 'Silver, Striped Klaft', 'Majestic', 'Silver Pattern'],
    },
  ],
  pharaohs: [
    {
      grade: 'Rare',
      name: 'CONE #11 PHARAOH',
      date: '2024-03-16',
      value: 5000,
      tagGroup: ['Gold&Bronze Crown', 'Smile', 'Blue', 'Gold, Flower-shaped'],
    },
    {
      grade: 'Rare',
      name: 'CONE #12 PHARAOH',
      date: '2024-03-16',
      value: 5000,
      tagGroup: ['Bang&Bobbed cut', 'Ash-gray', 'Gold & Sapphire Diadem', 'Smile'],
    },
    {
      grade: 'Rare',
      name: 'CONE #13 PHARAOH',
      date: '2024-03-16',
      value: 5000,
      tagGroup: ['Pharaoh Klaft', 'Smile', 'Light Blue', 'Silver & Aquamarine'],
    },
    {
      grade: 'Rare',
      name: 'CONE #14 PHARAOH',
      date: '2024-03-16',
      value: 5000,
      tagGroup: ['Braids', 'Brown', 'Gold & Ruby Diadem', 'Exciting'],
    },
  ],
};

const coraGodsPharaohs: GodStoreType = {
  gods: [
    {
      grade: 'Mythical',
      name: 'CORA #1 RA',
      date: '2024-04-12',
      value: 100000,
      tagGroup: ['Gold, Bird-shaped', 'Gold, Feather-shaped Klaft', 'Majestic'],
    },
    {
      grade: 'Legendary',
      name: 'CORA #2 AMUN',
      date: '2024-04-12',
      value: 50000,
      tagGroup: ['Gold Amun Crown', 'Majestic', 'Gold Pattern / Gold&Blue Fake Beard'],
    },
    {
      grade: 'Epic',
      name: 'CORA #3 MUT',
      date: '2024-04-12',
      value: 10000,
      tagGroup: ['Silver, Bald eagle-shaped', 'Silver,Feather-shaped Klaft', 'Majestic'],
    },
    {
      grade: 'Epic',
      name: 'CORA #4 SOPDU',
      date: '2024-04-12',
      value: 10000,
      tagGroup: ['Silver Amun Crown  / Silver Trinket', 'Silver,Feather-shaped Klaft'],
    },
  ],
  pharaohs: [
    {
      grade: 'Rare',
      name: 'CORA #11 PHARAOH',
      date: '2024-04-12',
      value: 5000,
      tagGroup: ['Pharaoh Klaft', 'Expressionless', 'Blue', 'Gold&Ruby'],
    },
    {
      grade: 'Rare',
      name: 'CORA #12 PHARAOH',
      date: '2024-04-12',
      value: 5000,
      tagGroup: ['Bang&Middle cut', 'Brown', 'Gold&Red Diadem with Ruby'],
    },
    {
      grade: 'Rare',
      name: 'CORA #13 PHARAOH',
      date: '2024-04-12',
      value: 5000,
      tagGroup: ['Gold&Cobra Crown', 'Excited', 'Brown', 'Gold'],
    },
    {
      grade: 'Rare',
      name: 'CORA #14 PHARAOH',
      date: '2024-04-12',
      value: 5000,
      tagGroup: ['Bang&Middle perm', 'Light Brown'],
    },
  ],
};
const godStore = new Map<ConType, Record<'gods' | 'pharaohs', God[]>>();

godStore.set('cone', coneGodsPharaohs);
godStore.set('cora', coraGodsPharaohs);

export default godStore;
