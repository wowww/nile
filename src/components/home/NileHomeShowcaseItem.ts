import { useTranslation } from 'next-i18next';

interface NileHomeShowcaseItemType {
  type: string;
  name: string;
  imgUrl: string;
  linkUrl: string;
  date?: string;
  desc?: string;
}

const NileHomeShowcaseItem: NileHomeShowcaseItemType[] = [
  {
    type: 'wonder',
    name: 'WONDER DAO',
    // 23.02.15 수정: 이미지 최적화로 인해 확장자 변경 (png -> jpg)
    imgUrl: '/assets/images/img/daoShowcase/img_showcase_wonder.jpg',
    linkUrl: '/dao/wonder/station',
    desc: 'home.hero.showcase.desc.wonderDao',
  },
  // {
  //   type: 'arteum',
  //   name: 'ARTEUM DAO',
  //   // 23.02.15 수정: 이미지 최적화로 인해 확장자 변경 (png -> jpg)
  //   imgUrl: '/assets/images/img/daoShowcase/img_showcase_arteum.jpg',
  //   // TODO: 라이브 시 링크 수정 필요
  //   linkUrl: '/dao',
  //   desc: 'home.hero.showcase.desc.arteum',
  // },
  // {
  //   type: 'delta',
  //   name: 'DELTA DAO',
  //   // 23.02.15 수정: 이미지 최적화로 인해 확장자 변경 (png -> jpg)
  //   imgUrl: '/assets/images/img/daoShowcase/img_showcase_delta.jpg',
  //   // TODO: 라이브 시 링크 수정 필요
  //   linkUrl: '/dao',
  //   desc: 'home.hero.showcase.desc.delta',
  // },
  // {
  //   type: 'oracle',
  //   name: 'ORACLE DAO',
  //   // 23.02.15 수정: 이미지 최적화로 인해 확장자 변경 (png -> jpg)
  //   imgUrl: '/assets/images/img/daoShowcase/img_showcase_oracle.jpg',
  //   // TODO: 라이브 시 링크 수정 필요
  //   linkUrl: '/dao',
  //   desc: 'home.hero.showcase.desc.oracle',
  // },
];

export default NileHomeShowcaseItem;
