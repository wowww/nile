import { Address } from '@/models/nile/contract/NileContract';
import NileCollection from '@/models/nile/marketplace/NileCollection';
import NileUserAccount from '@/models/nile/user/NileUserAccount';

type NileNft = {
  token: NileNftToken;
  orderList?: NileNftOrder[];
  metadata?: NileNftMetadata;
};

export type NileNftToken = {
  id?: string; // 토큰 ID(DB 관리용 UUID)
  createdAt?: string; // 토큰 생성 일자
  updatedAt?: string; // 토큰 변경 일자
  mintedAt?: string; // 토큰 민팅 일자
  collectionId?: string; // 컬렉션 ID(DB 관리용)
  collectionAddress?: string; // 컬렉션 주소(컨트랙트 주소)
  name?: string; // 토큰 이름, 민팅시 설정
  description?: string; // 토큰 설명, 메타데이터에 존재
  image?: string;
  imageUrl?: string; // 작품이 사진 형태일 때의 URL
  videoUrl?: string; // 작품이 영상 형태일 때의 URL
  tokenId?: string; // 토큰 ID(민팅시 발급되는 ID)
  uri?: string; // 메타데이터 URI
  unitFormat?: string;
  status?: string | NileNftTokenStatusType; // 상태
  price?: string;
  payment?: string;
  viewCount?: number;
  likeCount?: number;
  contractAddress?: string;
  collection?: NileCollection;
  ownerAddress?: string; // 소유자 주소
  owner?: NileUserAccount; // 소유자 정보, 소유자 주소로 조회해야 함
  ownerName?: string;
  orderType?: string;
  available?: boolean; // NFT 판매중 여부, true: 판매 가능 / false: 판매 불가능
  orderStatus?: string | NileOrderStatusType;
  orderStartAt?: string;
  orderEndAt?: string;
  orderList?: NileNftOrder[];
  offerList?: NileNftOrder[];
  profile?: NileUserAccount;
};

export type NileNftOrder = {
  id?: string; // UUID
  tokenId: number; // NFT 토큰 ID, 컨트랙트의 토큰 ID와 일치
  orderId?: number; // 주문 ID, 결제와 정산에서 사용
  round?: number;
  type?: NileOrderType | string;
  orderIndex?: number;
  status?: string;
  orderAmount?: number; // 주문 수량: 단건 거래: 1, 다중 거래: n
  totalSoldAmount?: number;
  creator?: Address;
  collectionAddress?: Address;
  payment?: Address;
  price?: string;
  timestamp?: string;
  startAt?: string; // 주문 시작 시간, UTC
  endAt?: string; // 주문 종료 시간, UTC
  completedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  biddingList?: NileBidding[];
  profile?: NileUserAccount;
}

export enum NileNftOrderRound {
  FIRST = 0, // 1차 판매
  SECOND = 1, // 2차 판매
}

export type NileBidding = {
  id?: string // UUID
  createdAt?: string;
  updatedAt?: string;
  tokenOrderId: string;
  orderIndex: number;
  address?: Address;
  status: string;
  received: boolean;
  receivedAt?: string;
  nickname?: string;
  price: string;
  timestamp: string;
  profile?: NileUserAccount;
}

// 토큰 상태
export enum NileNftTokenStatusType {
  NOT_FOR_SALE = 'NOT_FOR_SALE',
  NONE = 'NONE',
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

// 주문 종류(판매/구매 방식)
export enum NileOrderType {
  NONE = 'NONE',
  AUCTION = 'AUCTION',
  FIXED_PRICE = 'FIXED_PRICE',
  OPEN_PRICE = 'OPEN_PRICE',
}

// 주문 상태
export enum NileOrderStatusType {
  NONE = 'NONE', // 판매 대기
  TO_BE_OPENED = 'TO_BE_OPENED', // 판매 시작 전
  OPEN = 'OPEN', // 판매중
  CLOSE = 'CLOSE', // 판매 종료
  COMPLETE = 'COMPLETE', // 판매 완료
  CANCELED = 'CANCELED', // 판매 취소

  AUCTION_TO_BE_OPENED = 'AUCTION_TO_BE_OPENED',
  AUCTION_OPEN = 'AUCTION_OPEN',
  AUCTION_COMPLETE = 'AUCTION_COMPLETE',
  AUCTION_COMPLETE_RECEIVED = 'AUCTION_COMPLETE_RECEIVED',
  AUCTION_CANCELED = 'AUCTION_CANCELED',
  FIXED_PRICE_OPEN = 'FIXED_PRICE_OPEN',
  FIXED_PRICE_COMPLETE = 'FIXED_PRICE_COMPLETE',
  FIXED_PRICE_CANCELED = 'FIXED_PRICE_CANCELED',
  OPEN_PRICE_OPEN = 'OPEN_PRICE_OPEN',
  OPEN_PRICE_COMPLETE = 'OPEN_PRICE_COMPLETE',
  OPEN_PRICE_EXPIRED = 'OPEN_PRICE_EXPIRED',
  OPEN_PRICE_CANCELED = 'OPEN_PRICE_CANCELED',
}

// 응찰(비딩) 상태
export enum NileBiddingStatusType {
  OPEN = 'OPEN', // 최상위 입찰
  FAILURE = 'FAILURE', // 상위 응찰 존재 / 환불 필요
  CLOSE = 'CLOSE', // 환불 완료
}

export type NileNftMetadata = {
  id: number;
  name: {
    language: string;
    value: string;
  }[];
  description: {
    language: string;
    value: string;
  }[];
  image: string;
  externalLink: string;
  backgroundColor: string;
  attributes: {
    type: string;
    value: any[];
  }[];
}

export default NileNft;
