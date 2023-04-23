import NileCollection from '@/models/nile/marketplace/NileCollection';
import NileNft, { NileNftToken } from '@/models/nile/marketplace/NileNft';

export type MyPageTabPros = {
  tabKey: string;
  currentTabKey: string;
  onChange?: () => void;
};

export type MyPageActivityItemType = {
  key: string;
  id: string;
  hash: string;
  timestamp: string;
  type: string;
  from?: string;
  to?: string;
  collectionAddress?: string;
  tokenId: number;
  orderId?: number;
  orderIndex?: number;
  price?: string;
  payment?: string;
  collection?: NileCollection;
  token?: NileNftToken;
  covenant?: boolean;
};

export type MyAssets = {
  total: number;
  daoPrice: number;
  daoCount: number;
  nftPrice: string;
  nftCount: number;
};

// 23.03.11 수정: 퍼블 확인용 데이터
export const tableDummyData = [
  {
    key: '1',
    id: 'string',
    hash: 'string',
    timestamp: 'string',
    type: 'FIXED_PRICE_REGISTERED',
    isNft: true,
    covenant: true,
    from: 'from 임시값',
    to: 'to 임시값',
    collectionAddress: 'string',
    tokenId: 'number',
    orderId: 'number',
    orderIndex: 'number',
    price: 'string',
    payment: 'string',
    // collection?: NileCollection;
    token: {
      //  id: '1' , // 토큰 ID(DB 관리용 UUID)
      createdAt: '1', // 토큰 생성 일자
      updatedAt: '1', // 토큰 변경 일자
      mintedAt: 'string', // 토큰 민팅 일자
      collectionId: 'string', // 컬렉션 ID(DB 관리용)
      collectionAddress: 'string', // 컬렉션 주소(컨트랙트 주소)
      name: 'name', // 토큰 이름, 민팅시 설정
      description: 'description', // 토큰 설명, 메타데이터에 존재
      image: '/assets/images/img/con/cone/img_cone_1.jpg',
      imageUrl: '/assets/images/img/con/cone/img_cone_1.jpg', // 작품이 사진 형태일 때의 URL
      videoUrl: 'string', // 작품이 영상 형태일 때의 URL
      tokenId: 'string', // 토큰 ID(민팅시 발급되는 ID)
      uri: 'string', // 메타데이터 URI
      unitFormat: 'string',
      status: 'open', // 상태
      price: '100000',
      payment: 'string',
      viewCount: 10,
      likeCount: 10,
      contractAddress: 'string',
      // collection: NileCollection;
      ownerAddress: 'string', // 소유자 주소
      // owner: NileUserAccount; // 소유자 정보, 소유자 주소로 조회해야 함
      ownerName: 'string',
      orderType: 'string',
      available: true, // NFT 판매중 여부, true: 판매 가능 / false: 판매 불가능
      // orderStatus: string | NileOrderStatusType;
      orderStartAt: 'string',
      orderEndAt: 'string',
      // orderList: NileNftOrder[];
      // offerList: NileNftOrder[];
      // profile: NileUserAccount;
    },
  },

  {
    key: '1',
    id: 'string',
    hash: 'string',
    timestamp: 'string',
    type: 'FIXED_PRICE_REGISTERED',
    isNft: true,
    covenant: true,
    from: 'from 임시값',
    to: 'to 임시값',
    collectionAddress: 'string',
    tokenId: 'number',
    orderId: 'number',
    orderIndex: 'number',
    price: 'string',
    payment: 'string',
    // collection?: NileCollection;
    token: {
      //  id: '1' , // 토큰 ID(DB 관리용 UUID)
      createdAt: '1', // 토큰 생성 일자
      updatedAt: '1', // 토큰 변경 일자
      mintedAt: 'string', // 토큰 민팅 일자
      collectionId: 'string', // 컬렉션 ID(DB 관리용)
      collectionAddress: 'string', // 컬렉션 주소(컨트랙트 주소)
      name: 'name name nam enam enam ename namename', // 토큰 이름, 민팅시 설정
      description: 'description', // 토큰 설명, 메타데이터에 존재
      image: '/assets/images/img/con/cone/img_cone_1.jpg',
      imageUrl: '/assets/images/img/con/cone/img_cone_1.jpg', // 작품이 사진 형태일 때의 URL
      videoUrl: 'string', // 작품이 영상 형태일 때의 URL
      tokenId: 'string', // 토큰 ID(민팅시 발급되는 ID)
      uri: 'string', // 메타데이터 URI
      unitFormat: 'string',
      status: 'open', // 상태
      price: '100000',
      payment: 'string',
      viewCount: 10,
      likeCount: 10,
      contractAddress: 'string',
      // collection: NileCollection;
      ownerAddress: 'string', // 소유자 주소
      // owner: NileUserAccount; // 소유자 정보, 소유자 주소로 조회해야 함
      ownerName: 'string',
      orderType: 'string',
      available: true, // NFT 판매중 여부, true: 판매 가능 / false: 판매 불가능
      // orderStatus: string | NileOrderStatusType;
      orderStartAt: 'string',
      orderEndAt: 'string',
      // orderList: NileNftOrder[];
      // offerList: NileNftOrder[];
      // profile: NileUserAccount;
    },
  },
];
