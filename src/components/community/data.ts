import { StaticImageData } from 'next/image';

type Member = {
  avatar: string;
  name: string;
};

export interface CommunityCardData {
  join: boolean;
  type: {
    name: string;
    status?: boolean;
  };
  thumbnail: string | StaticImageData;
  tags: Array<string>;
  title: string;
  description: string;
  members: Member[];
  latest: {
    value: number;
    format: string;
  };
  marketCap: number;
  token?: string;
}

export interface CommunityPopupData {
  contents: string;
  link: string;
  qr: string;
}

export interface OfficialCardData {
  id: number;
  thumbnail: string | StaticImageData;
  logo: string;
  title: string;
  description: string;
  official: boolean;
  memberCnt: string;
  talksCnt: string;
  popup: CommunityPopupData;
}

export const cardDatas: CommunityCardData[] = [
  {
    join: false,
    type: {
      name: 'nft',
    },
    thumbnail: '/assets/images/img/img_community_thumbnail_stroy.png',
    tags: ['Art', 'NFT', 'Collectibles'],
    title: 'Sights of NILE(SON)',
    description: 'Sights of NILE(SON)',
    members: [
      { avatar: '/temp/@temp_community_members.png', name: 'hello' },
      { avatar: '/temp/@temp_community_members.png', name: 'world' },
      { avatar: '/temp/@temp_community_members.png', name: 'pxd' },
      { avatar: '/temp/@temp_community_members.png', name: 'wemix' },
    ],
    latest: {
      value: 3,
      format: 'months ago',
    },
    marketCap: 1923000,
  },
  {
    join: false,
    type: {
      name: 'nft',
    },
    thumbnail: '/assets/images/img/img_community_thumbnail_nft.png',
    tags: ['NFT', 'Pixel Art'],
    title: 'London Underground Station(LUS) 264 Genesis',
    description: 'London Underground Station(LUS) 264 Genesis',
    members: [
      { avatar: '/temp/@temp_community_members.png', name: 'hello' },
      { avatar: '/temp/@temp_community_members.png', name: 'world' },
      { avatar: '/temp/@temp_community_members.png', name: 'pxd' },
      { avatar: '/temp/@temp_community_members.png', name: 'wemix' },
    ],
    latest: {
      value: 1,
      format: 'hours ago',
    },
    marketCap: 1923000,
  },
  {
    join: false,
    type: {
      name: 'nft',
    },
    thumbnail: '/assets/images/img/img_community_thumbnail_tangled.png',
    tags: ['Life', 'NFT', 'Talk to Earn'],
    title: 'Tangled',
    description: `Tangled`,
    members: [
      { avatar: '/temp/@temp_community_members.png', name: 'hello' },
      { avatar: '/temp/@temp_community_members.png', name: 'world' },
      { avatar: '/temp/@temp_community_members.png', name: 'pxd' },
      { avatar: '/temp/@temp_community_members.png', name: 'wemix' },
    ],
    latest: {
      value: 2,
      format: 'weeks ago',
    },
    marketCap: 1923000,
  },
  {
    join: true,
    type: {
      name: 'dao',
      status: true,
    },
    thumbnail: '/assets/images/img/img_community_thumbnail_dao.png',
    tags: ['DAO', 'Protocol DAO'],
    title: 'WONDER DAO Members',
    description: 'WONDER',
    members: [
      { avatar: '/temp/@temp_community_members.png', name: 'hello' },
      { avatar: '/temp/@temp_community_members.png', name: 'world' },
      { avatar: '/temp/@temp_community_members.png', name: 'pxd' },
      { avatar: '/temp/@temp_community_members.png', name: 'wemix' },
    ],
    latest: {
      value: 59,
      format: 'minutes ago',
    },
    marketCap: 1923000,
  },
];

export const officialDatas: OfficialCardData[] = [
  {
    id: 0,
    thumbnail: '/assets/images/img/official/bg_tipo.svg',
    official: true,
    logo: '/assets/images/icon/token/ico_tipo.svg',
    title: 'TIPO Token Official',
    description:
      'TIPO Token의 공식 채널입니다. TIPO를 보유한 멤버라면 누구나 참여할 수 있습니다. TIPO는 Web3 소셜 라이브 채팅 플랫폼 Tangled의 유틸리티 토큰이자, 참여자의 Tangled 기여도에 따라 소셜 생태계 내의 지위와 영향력을 누릴 수 있도록 설계된 SocialFi 토큰입니다.',
    memberCnt: '0',
    talksCnt: '0',
    popup: {
      contents: 'TIPO Token의 공식 채널입니다. TIPO를 보유한 멤버라면 누구나 참여할 수 있습니다. TIPO는 Web3 소셜 라이브 채팅 플랫폼 Tangled의 유틸리티 토큰이자, 참여자의 Tangled 기여도에 따라 소셜 생태계 내의 지위와 영향력을 누릴 수 있도록 설계된 SocialFi 토큰입니다.',
      link: 'https://appstore.com/download...',
      qr: 'https://nile.blob.core.windows.net/images/assets/images/icon/ico_community_qrcode.svg'
    }
  },
  {
    id: 1,
    thumbnail: '/assets/images/img/official/bg_son.svg',
    official: true,
    logo: '/assets/images/icon/daotokens/ico_son.svg',
    title: 'Sights of NILE(SON) Official',
    description:
      'Sights of NILE의 공식 채널입니다.Sights of NILE(SON) NFT를 보유한 멤버라면 누구나 참여할 수 있습니다. SON은 NILE에서 발행하는 ‘Story3.0’ 아티클 칼럼의 일러스트 삽화를 NFT로 발행하는 프로젝트입니다. 블록체인에 관한 다양한 트렌드와 견해를 크리에이터의 영감 어린 시각으로 선보입니다.',
    memberCnt: '0',
    talksCnt: '0',
    popup: {
      contents: 'London Underground Station의 공식 채널입니다. \nLUS를 보유한 멤버라면 누구나 참여할 수 있습니다. LUS는 런던의 264개 역을 픽셀 아트로 표현한 작업입니다. 2013년 Kings Cross 역에서 시작해 2017년 Paddington 역까지 약 5년 동안 진행된 장기 프로젝트입니다.',
      link: 'https://appstore.com/download...',
      qr: 'https://nile.blob.core.windows.net/images/assets/images/icon/ico_community_qrcode.svg'
    }
  },
  {
    id:2,
    thumbnail: '/assets/images/img/official/bg_lus.svg',
    official: true,
    logo: '/assets/images/icon/daotokens/ico_lus.svg',
    title: 'London Underground Station(LUS) 264 Genesis Official',
    description:
      "London Underground Station(LUS) 264 Genesis NFT 홀더를 위한 공간입니다. LUS를 보유한 멤버라면 누구나 참여할 수 있습니다. LUS는 런던의 264개 역을 픽셀 아트로 표현한 작업입니다. 2013년 King's Cross 역에서 시작해 2017년 Paddington 역까지 약 5년 동안 진행된 장기 프로젝트입니다.",
    memberCnt: '0',
    talksCnt: '0',
    popup: {
      contents: 'London Underground Station의 공식 채널입니다. \nLUS를 보유한 멤버라면 누구나 참여할 수 있습니다. LUS는 런던의 264개 역을 픽셀 아트로 표현한 작업입니다. 2013년 Kings Cross 역에서 시작해 2017년 Paddington 역까지 약 5년 동안 진행된 장기 프로젝트입니다.',
      link: 'https://appstore.com/download...',
      qr: 'https://nile.blob.core.windows.net/images/assets/images/icon/ico_community_qrcode.svg'
    }
  },
  {
    id: 3,
    thumbnail: '/assets/images/img/official/bg_con.svg',
    official: true,
    logo: '/assets/images/icon/daotokens/ico_con.svg',
    title: 'City of NEITH',
    description: 'City of NEITH 프로젝트의 NFT 홀더를 위한 공간입니다.',
    memberCnt: '0',
    talksCnt: '0',
    popup: {
      contents: 'London Underground Station의 공식 채널입니다. \nLUS를 보유한 멤버라면 누구나 참여할 수 있습니다. LUS는 런던의 264개 역을 픽셀 아트로 표현한 작업입니다. 2013년 Kings Cross 역에서 시작해 2017년 Paddington 역까지 약 5년 동안 진행된 장기 프로젝트입니다.',
      link: 'https://appstore.com/download...',
      qr: 'https://nile.blob.core.windows.net/images/assets/images/icon/ico_community_qrcode.svg'
    }
  },
];
