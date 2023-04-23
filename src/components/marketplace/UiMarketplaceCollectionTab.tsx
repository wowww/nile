import cn from 'classnames';
import { dataListItem } from '@components/marketplace/MarketplaceSubBannerInfo';
import NileCollection from '@/models/nile/marketplace/NileCollection';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { NileApiService } from '@/services/nile/api';
import MarketplaceBannerTypeCollection from '@components/marketplace/detail/MarketplaceBannerTypeCollection';
import axios from 'axios';
import marketplaceNftList from '@/mocks/marketplace/nft/list.json';

/* TODO: 탱글드 NFT 관련 더미 */
/* 23.03.21 수정: 
  - 신규 오픈 건 12개 고정에서 판매가격이 다른 신규 건은 12개, 판매가격이 동일할 경우 8개로 기획 수정
  23.04.03 수정:
  - 신규 오픈 cora는 12개입니다.
*/
const coraDummyData = [
  {
    id: 'cora-collection',
    slug: 'CORA',
    name: 'City of RA',
    status: 'NONE',
    baseUri: '',
    createdAt: '2022-11-22T10:17:14.9055',
    updatedAt: '2023-01-06T01:44:18.158992',
    registeredAt: '2023-01-06T01:44:18.158992',
    ownerName: 'CORA',
    imageUrl: 'https://nile.blob.core.windows.net/images/images/bg_market_collection_tangled.png',
    bannerImageUrl: 'https://nile.blob.core.windows.net/images/images/bg_market_collection_tangled.png',
    featuredImageUrl: 'https://nile.blob.core.windows.net/images/images/bg_market_collection_tangled.png',
    logoImageUrl: 'https://nile.blob.core.windows.net/images/assets/images/img/img_symbol_life_con_ra.png',
    address: '0x0',
    ownerAddress: '0x0',
    profile: {
      address: '0x0',
      id: '1',
      createdAt: '2022-11-17T08:25:16.052+00:00',
      updatedAt: '2022-11-28T06:21:47.667+00:00',
      nickname: 'CORA',
      nonce: 42069,
      themeIndex: 4,
      snsLinks: [],
    },
    tokens: [
      {
        id: 'cora-token-1',
        createdAt: '2022-11-22T10:20:14.81843',
        updatedAt: '2023-01-04T12:14:45.936934',
        mintedAt: '',
        collectionId: '1',
        collectionAddress: '0x0',
        name: 'CORA #1 RA',
        description: '',
        image: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_1.jpg',
        imageUrl: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_1.jpg',
        tokenId: '1',
        ownerAddress: '0x0',
        viewCount: 119,
        likeCount: 0,
        collection: {
          id: '1',
          slug: 'CORA',
          name: 'CORA',
          status: 'NONE',
          baseUri: '',
          createdAt: '2022-11-22T10:17:14.9055',
          updatedAt: '2023-01-06T01:44:18.158992',
          registeredAt: '2023-01-06T01:44:18.158992',
          ownerName: 'CORA',
          imageUrl: '/img/bg_market_collection_tangled.png',
          bannerImageUrl: '/img/bg_market_collection_tangled.png',
          featuredImageUrl: '/img/bg_market_collection_tangled.png',
          logoImageUrl: '/img/bg_market_collection_tangled.png',
          address: '0x0',
          ownerAddress: '0x0',
          profile: {
            address: '0x0',
            id: '1',
            createdAt: '2022-11-17T08:25:16.052+00:00',
            updatedAt: '2022-11-28T06:21:47.667+00:00',
            nickname: 'CORA',
            nonce: 42069,
            themeIndex: 4,
            snsLinks: [],
          },
        },
        price: '99000000000000000000',
        payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
        orderList: [
          {
            id: '1',
            tokenId: 1,
            payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
            type: 'FIXED_PRICE',
            price: '99000000000000000000',
            status: 'TO_BE_OPENED',
            startAt: '2023-03-01',
          },
        ],
      },
      {
        id: 'cora-token-2',
        createdAt: '2022-11-22T10:20:14.81843',
        updatedAt: '2023-01-04T12:14:45.936934',
        mintedAt: '',
        collectionId: '1',
        collectionAddress: '0x0',
        name: 'CORA #1 RA',
        description: '',
        image: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_2.jpg',
        imageUrl: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_2.jpg',
        tokenId: '1',
        ownerAddress: '0x0',
        viewCount: 119,
        likeCount: 0,
        collection: {
          id: '1',
          slug: 'CORA',
          name: 'CORA',
          status: 'NONE',
          baseUri: '',
          createdAt: '2022-11-22T10:17:14.9055',
          updatedAt: '2023-01-06T01:44:18.158992',
          registeredAt: '2023-01-06T01:44:18.158992',
          ownerName: 'CORA',
          imageUrl: '/img/bg_market_collection_tangled.png',
          bannerImageUrl: '/img/bg_market_collection_tangled.png',
          featuredImageUrl: '/img/bg_market_collection_tangled.png',
          logoImageUrl: '/img/bg_market_collection_tangled.png',
          address: '0x0',
          ownerAddress: '0x0',
          profile: {
            address: '0x0',
            id: '1',
            createdAt: '2022-11-17T08:25:16.052+00:00',
            updatedAt: '2022-11-28T06:21:47.667+00:00',
            nickname: 'CORA',
            nonce: 42069,
            themeIndex: 4,
            snsLinks: [],
          },
        },
        price: '99000000000000000000',
        payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
        orderList: [
          {
            id: '1',
            tokenId: 1,
            payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
            type: 'FIXED_PRICE',
            price: '99000000000000000000',
            status: 'TO_BE_OPENED',
            startAt: '2023-03-01',
          },
        ],
      },
      {
        id: 'cora-token-3',
        createdAt: '2022-11-22T10:20:14.81843',
        updatedAt: '2023-01-04T12:14:45.936934',
        mintedAt: '',
        collectionId: '1',
        collectionAddress: '0x0',
        name: 'CORA #1 RA',
        description: '',
        image: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_3.jpg',
        imageUrl: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_3.jpg',
        tokenId: '1',
        ownerAddress: '0x0',
        viewCount: 119,
        likeCount: 0,
        collection: {
          id: '1',
          slug: 'CORA',
          name: 'CORA',
          status: 'NONE',
          baseUri: '',
          createdAt: '2022-11-22T10:17:14.9055',
          updatedAt: '2023-01-06T01:44:18.158992',
          registeredAt: '2023-01-06T01:44:18.158992',
          ownerName: 'CORA',
          imageUrl: '/img/bg_market_collection_tangled.png',
          bannerImageUrl: '/img/bg_market_collection_tangled.png',
          featuredImageUrl: '/img/bg_market_collection_tangled.png',
          logoImageUrl: '/img/bg_market_collection_tangled.png',
          address: '0x0',
          ownerAddress: '0x0',
          profile: {
            address: '0x0',
            id: '1',
            createdAt: '2022-11-17T08:25:16.052+00:00',
            updatedAt: '2022-11-28T06:21:47.667+00:00',
            nickname: 'CORA',
            nonce: 42069,
            themeIndex: 4,
            snsLinks: [],
          },
        },
        price: '99000000000000000000',
        payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
        orderList: [
          {
            id: '1',
            tokenId: 1,
            payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
            type: 'FIXED_PRICE',
            price: '99000000000000000000',
            status: 'TO_BE_OPENED',
            startAt: '2023-03-01',
          },
        ],
      },
      {
        id: 'cora-token-4',
        createdAt: '2022-11-22T10:20:14.81843',
        updatedAt: '2023-01-04T12:14:45.936934',
        mintedAt: '',
        collectionId: '1',
        collectionAddress: '0x0',
        name: 'CORA #1 RA',
        description: '',
        image: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_4.jpg',
        imageUrl: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_4.jpg',
        tokenId: '1',
        ownerAddress: '0x0',
        viewCount: 119,
        likeCount: 0,
        collection: {
          id: '1',
          slug: 'CORA',
          name: 'CORA',
          status: 'NONE',
          baseUri: '',
          createdAt: '2022-11-22T10:17:14.9055',
          updatedAt: '2023-01-06T01:44:18.158992',
          registeredAt: '2023-01-06T01:44:18.158992',
          ownerName: 'CORA',
          imageUrl: '/img/bg_market_collection_tangled.png',
          bannerImageUrl: '/img/bg_market_collection_tangled.png',
          featuredImageUrl: '/img/bg_market_collection_tangled.png',
          logoImageUrl: '/img/bg_market_collection_tangled.png',
          address: '0x0',
          ownerAddress: '0x0',
          profile: {
            address: '0x0',
            id: '1',
            createdAt: '2022-11-17T08:25:16.052+00:00',
            updatedAt: '2022-11-28T06:21:47.667+00:00',
            nickname: 'CORA',
            nonce: 42069,
            themeIndex: 4,
            snsLinks: [],
          },
        },
        price: '99000000000000000000',
        payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
        orderList: [
          {
            id: '1',
            tokenId: 1,
            payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
            type: 'FIXED_PRICE',
            price: '99000000000000000000',
            status: 'TO_BE_OPENED',
            startAt: '2023-03-01',
          },
        ],
      },
      {
        id: 'cora-token-5',
        createdAt: '2022-11-22T10:20:14.81843',
        updatedAt: '2023-01-04T12:14:45.936934',
        mintedAt: '',
        collectionId: '1',
        collectionAddress: '0x0',
        name: 'CORA #1 RA',
        description: '',
        image: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_11.jpg',
        imageUrl: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_11.jpg',
        tokenId: '1',
        ownerAddress: '0x0',
        viewCount: 119,
        likeCount: 0,
        collection: {
          id: '1',
          slug: 'CORA',
          name: 'CORA',
          status: 'NONE',
          baseUri: '',
          createdAt: '2022-11-22T10:17:14.9055',
          updatedAt: '2023-01-06T01:44:18.158992',
          registeredAt: '2023-01-06T01:44:18.158992',
          ownerName: 'CORA',
          imageUrl: '/img/bg_market_collection_tangled.png',
          bannerImageUrl: '/img/bg_market_collection_tangled.png',
          featuredImageUrl: '/img/bg_market_collection_tangled.png',
          logoImageUrl: '/img/bg_market_collection_tangled.png',
          address: '0x0',
          ownerAddress: '0x0',
          profile: {
            address: '0x0',
            id: '1',
            createdAt: '2022-11-17T08:25:16.052+00:00',
            updatedAt: '2022-11-28T06:21:47.667+00:00',
            nickname: 'CORA',
            nonce: 42069,
            themeIndex: 4,
            snsLinks: [],
          },
        },
        price: '99000000000000000000',
        payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
        orderList: [
          {
            id: '1',
            tokenId: 1,
            payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
            type: 'FIXED_PRICE',
            price: '99000000000000000000',
            status: 'TO_BE_OPENED',
            startAt: '2023-03-01',
          },
        ],
      },
      {
        id: 'cora-token-6',
        createdAt: '2022-11-22T10:20:14.81843',
        updatedAt: '2023-01-04T12:14:45.936934',
        mintedAt: '',
        collectionId: '1',
        collectionAddress: '0x0',
        name: 'CORA #1 RA',
        description: '',
        image: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_12.jpg',
        imageUrl: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_12.jpg',
        tokenId: '1',
        ownerAddress: '0x0',
        viewCount: 119,
        likeCount: 0,
        collection: {
          id: '1',
          slug: 'CORA',
          name: 'CORA',
          status: 'NONE',
          baseUri: '',
          createdAt: '2022-11-22T10:17:14.9055',
          updatedAt: '2023-01-06T01:44:18.158992',
          registeredAt: '2023-01-06T01:44:18.158992',
          ownerName: 'CORA',
          imageUrl: '/img/bg_market_collection_tangled.png',
          bannerImageUrl: '/img/bg_market_collection_tangled.png',
          featuredImageUrl: '/img/bg_market_collection_tangled.png',
          logoImageUrl: '/img/bg_market_collection_tangled.png',
          address: '0x0',
          ownerAddress: '0x0',
          profile: {
            address: '0x0',
            id: '1',
            createdAt: '2022-11-17T08:25:16.052+00:00',
            updatedAt: '2022-11-28T06:21:47.667+00:00',
            nickname: 'CORA',
            nonce: 42069,
            themeIndex: 4,
            snsLinks: [],
          },
        },
        price: '99000000000000000000',
        payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
        orderList: [
          {
            id: '1',
            tokenId: 1,
            payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
            type: 'FIXED_PRICE',
            price: '99000000000000000000',
            status: 'TO_BE_OPENED',
            startAt: '2023-03-01',
          },
        ],
      },
      {
        id: 'cora-token-7',
        createdAt: '2022-11-22T10:20:14.81843',
        updatedAt: '2023-01-04T12:14:45.936934',
        mintedAt: '',
        collectionId: '1',
        collectionAddress: '0x0',
        name: 'CORA #1 RA',
        description: '',
        image: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_13.jpg',
        imageUrl: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_13.jpg',
        tokenId: '1',
        ownerAddress: '0x0',
        viewCount: 119,
        likeCount: 0,
        collection: {
          id: '1',
          slug: 'CORA',
          name: 'CORA',
          status: 'NONE',
          baseUri: '',
          createdAt: '2022-11-22T10:17:14.9055',
          updatedAt: '2023-01-06T01:44:18.158992',
          registeredAt: '2023-01-06T01:44:18.158992',
          ownerName: 'CORA',
          imageUrl: '/img/bg_market_collection_tangled.png',
          bannerImageUrl: '/img/bg_market_collection_tangled.png',
          featuredImageUrl: '/img/bg_market_collection_tangled.png',
          logoImageUrl: '/img/bg_market_collection_tangled.png',
          address: '0x0',
          ownerAddress: '0x0',
          profile: {
            address: '0x0',
            id: '1',
            createdAt: '2022-11-17T08:25:16.052+00:00',
            updatedAt: '2022-11-28T06:21:47.667+00:00',
            nickname: 'CORA',
            nonce: 42069,
            themeIndex: 4,
            snsLinks: [],
          },
        },
        price: '99000000000000000000',
        payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
        orderList: [
          {
            id: '1',
            tokenId: 1,
            payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
            type: 'FIXED_PRICE',
            price: '99000000000000000000',
            status: 'TO_BE_OPENED',
            startAt: '2023-03-01',
          },
        ],
      },
      {
        id: 'cora-token-8',
        createdAt: '2022-11-22T10:20:14.81843',
        updatedAt: '2023-01-04T12:14:45.936934',
        mintedAt: '',
        collectionId: '1',
        collectionAddress: '0x0',
        name: 'CORA #1 RA',
        description: '',
        image: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_14.jpg',
        imageUrl: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_14.jpg',
        tokenId: '1',
        ownerAddress: '0x0',
        viewCount: 119,
        likeCount: 0,
        collection: {
          id: '1',
          slug: 'CORA',
          name: 'CORA',
          status: 'NONE',
          baseUri: '',
          createdAt: '2022-11-22T10:17:14.9055',
          updatedAt: '2023-01-06T01:44:18.158992',
          registeredAt: '2023-01-06T01:44:18.158992',
          ownerName: 'CORA',
          imageUrl: '/img/bg_market_collection_tangled.png',
          bannerImageUrl: '/img/bg_market_collection_tangled.png',
          featuredImageUrl: '/img/bg_market_collection_tangled.png',
          logoImageUrl: '/img/bg_market_collection_tangled.png',
          address: '0x0',
          ownerAddress: '0x0',
          profile: {
            address: '0x0',
            id: '1',
            createdAt: '2022-11-17T08:25:16.052+00:00',
            updatedAt: '2022-11-28T06:21:47.667+00:00',
            nickname: 'CORA',
            nonce: 42069,
            themeIndex: 4,
            snsLinks: [],
          },
        },
        price: '99000000000000000000',
        payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
        orderList: [
          {
            id: '1',
            tokenId: 1,
            payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
            type: 'FIXED_PRICE',
            price: '99000000000000000000',
            status: 'TO_BE_OPENED',
            startAt: '2023-03-01',
          },
        ],
      },
      {
        id: 'cora-token-9',
        createdAt: '2022-11-22T10:20:14.81843',
        updatedAt: '2023-01-04T12:14:45.936934',
        mintedAt: '',
        collectionId: '1',
        collectionAddress: '0x0',
        name: 'CORA #1 RA',
        description: '',
        image: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_101.jpg',
        imageUrl: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_101.jpg',
        tokenId: '1',
        ownerAddress: '0x0',
        viewCount: 119,
        likeCount: 0,
        collection: {
          id: '1',
          slug: 'CORA',
          name: 'CORA',
          status: 'NONE',
          baseUri: '',
          createdAt: '2022-11-22T10:17:14.9055',
          updatedAt: '2023-01-06T01:44:18.158992',
          registeredAt: '2023-01-06T01:44:18.158992',
          ownerName: 'CORA',
          imageUrl: '/img/bg_market_collection_tangled.png',
          bannerImageUrl: '/img/bg_market_collection_tangled.png',
          featuredImageUrl: '/img/bg_market_collection_tangled.png',
          logoImageUrl: '/img/bg_market_collection_tangled.png',
          address: '0x0',
          ownerAddress: '0x0',
          profile: {
            address: '0x0',
            id: '1',
            createdAt: '2022-11-17T08:25:16.052+00:00',
            updatedAt: '2022-11-28T06:21:47.667+00:00',
            nickname: 'CORA',
            nonce: 42069,
            themeIndex: 4,
            snsLinks: [],
          },
        },
        price: '99000000000000000000',
        payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
        orderList: [
          {
            id: '1',
            tokenId: 1,
            payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
            type: 'FIXED_PRICE',
            price: '99000000000000000000',
            status: 'TO_BE_OPENED',
            startAt: '2023-03-01',
          },
        ],
      },
      {
        id: 'cora-token-10',
        createdAt: '2022-11-22T10:20:14.81843',
        updatedAt: '2023-01-04T12:14:45.936934',
        mintedAt: '',
        collectionId: '1',
        collectionAddress: '0x0',
        name: 'CORA #1 RA',
        description: '',
        image: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_102.jpg',
        imageUrl: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_102.jpg',
        tokenId: '1',
        ownerAddress: '0x0',
        viewCount: 119,
        likeCount: 0,
        collection: {
          id: '1',
          slug: 'CORA',
          name: 'CORA',
          status: 'NONE',
          baseUri: '',
          createdAt: '2022-11-22T10:17:14.9055',
          updatedAt: '2023-01-06T01:44:18.158992',
          registeredAt: '2023-01-06T01:44:18.158992',
          ownerName: 'CORA',
          imageUrl: '/img/bg_market_collection_tangled.png',
          bannerImageUrl: '/img/bg_market_collection_tangled.png',
          featuredImageUrl: '/img/bg_market_collection_tangled.png',
          logoImageUrl: '/img/bg_market_collection_tangled.png',
          address: '0x0',
          ownerAddress: '0x0',
          profile: {
            address: '0x0',
            id: '1',
            createdAt: '2022-11-17T08:25:16.052+00:00',
            updatedAt: '2022-11-28T06:21:47.667+00:00',
            nickname: 'CORA',
            nonce: 42069,
            themeIndex: 4,
            snsLinks: [],
          },
        },
        price: '99000000000000000000',
        payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
        orderList: [
          {
            id: '1',
            tokenId: 1,
            payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
            type: 'FIXED_PRICE',
            price: '99000000000000000000',
            status: 'TO_BE_OPENED',
            startAt: '2023-03-01',
          },
        ],
      },
      {
        id: 'cora-token-11',
        createdAt: '2022-11-22T10:20:14.81843',
        updatedAt: '2023-01-04T12:14:45.936934',
        mintedAt: '',
        collectionId: '1',
        collectionAddress: '0x0',
        name: 'CORA #1 RA',
        description: '',
        image: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_103.jpg',
        imageUrl: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_103.jpg',
        tokenId: '1',
        ownerAddress: '0x0',
        viewCount: 119,
        likeCount: 0,
        collection: {
          id: '1',
          slug: 'CORA',
          name: 'CORA',
          status: 'NONE',
          baseUri: '',
          createdAt: '2022-11-22T10:17:14.9055',
          updatedAt: '2023-01-06T01:44:18.158992',
          registeredAt: '2023-01-06T01:44:18.158992',
          ownerName: 'CORA',
          imageUrl: '/img/bg_market_collection_tangled.png',
          bannerImageUrl: '/img/bg_market_collection_tangled.png',
          featuredImageUrl: '/img/bg_market_collection_tangled.png',
          logoImageUrl: '/img/bg_market_collection_tangled.png',
          address: '0x0',
          ownerAddress: '0x0',
          profile: {
            address: '0x0',
            id: '1',
            createdAt: '2022-11-17T08:25:16.052+00:00',
            updatedAt: '2022-11-28T06:21:47.667+00:00',
            nickname: 'CORA',
            nonce: 42069,
            themeIndex: 4,
            snsLinks: [],
          },
        },
        price: '99000000000000000000',
        payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
        orderList: [
          {
            id: '1',
            tokenId: 1,
            payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
            type: 'FIXED_PRICE',
            price: '99000000000000000000',
            status: 'TO_BE_OPENED',
            startAt: '2023-03-01',
          },
        ],
      },
      {
        id: 'cora-token-12',
        createdAt: '2022-11-22T10:20:14.81843',
        updatedAt: '2023-01-04T12:14:45.936934',
        mintedAt: '',
        collectionId: '1',
        collectionAddress: '0x0',
        name: 'CORA #1 RA',
        description: '',
        image: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_104.jpg',
        imageUrl: 'https://nile.blob.core.windows.net/images/assets/images/img/con/cora/img_cora_104.jpg',
        tokenId: '1',
        ownerAddress: '0x0',
        viewCount: 119,
        likeCount: 0,
        collection: {
          id: '1',
          slug: 'CORA',
          name: 'CORA',
          status: 'NONE',
          baseUri: '',
          createdAt: '2022-11-22T10:17:14.9055',
          updatedAt: '2023-01-06T01:44:18.158992',
          registeredAt: '2023-01-06T01:44:18.158992',
          ownerName: 'CORA',
          imageUrl: '/img/bg_market_collection_tangled.png',
          bannerImageUrl: '/img/bg_market_collection_tangled.png',
          featuredImageUrl: '/img/bg_market_collection_tangled.png',
          logoImageUrl: '/img/bg_market_collection_tangled.png',
          address: '0x0',
          ownerAddress: '0x0',
          profile: {
            address: '0x0',
            id: '1',
            createdAt: '2022-11-17T08:25:16.052+00:00',
            updatedAt: '2022-11-28T06:21:47.667+00:00',
            nickname: 'CORA',
            nonce: 42069,
            themeIndex: 4,
            snsLinks: [],
          },
        },
        price: '99000000000000000000',
        payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
        orderList: [
          {
            id: '1',
            tokenId: 1,
            payment: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
            type: 'FIXED_PRICE',
            price: '99000000000000000000',
            status: 'TO_BE_OPENED',
            startAt: '2023-03-01',
          },
        ],
      },
    ],
  },
];

export const UiMarketPlaceCollectionTab = () => {
  const api = NileApiService();
  const [tokenWemix, setTokenWemix] = useState<any>();

  const [lus, setLus] = useState<NileCollection>();
  const [son, setSon] = useState<NileCollection>();
  const [cone, setCone] = useState<NileCollection>();
  const [tangled, setTangled] = useState<NileCollection>();
  const [cora, setCORA] = useState<NileCollection>();

  /* 23.04.03 수정: 탱글드 -> cora로 데이터 변경, cora는 12개입니다. */
  /* 23.03.21 수정: 탱글드 오픈 데이터 8개 */
  // const [tangledList]: NileCollection[] = marketplaceNftList;
  const [coraList]: NileCollection[] = coraDummyData;

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

  const subBannerInfoList: {
    [key: string]: dataListItem[];
  } = {
    nile: [
      {
        name: 'Next Auction',
        figure: '2023-03-21',
      },
      {
        name: 'Item',
        figure: '5',
      },
    ],
  };

  const sonCollection = useMemo(() => {
    if (son?.tokens) {
      const tokens = son.tokens.sort((a, b) => new Date(a?.createdAt ?? '').valueOf() - new Date(b?.createdAt ?? '').valueOf());
      return {
        ...son,
        tokens: tokens.slice(-3),
      };
    }
  }, [son]);

  const refresh = useCallback(() => {
    api.marketplace.collection
      .getItem(
        {
          slug: 'SON',
        },
        false,
      )
      .then(({ data }) => setSon(data.result?.collection))
      .catch((error) => {
        console.log(error);
      });

    api.marketplace.collection
      .getItem(
        {
          slug: 'LUS',
        },
        true,
        3,
      )
      .then(({ data }) => setLus(data.result?.collection))
      .catch((error) => {
        console.log(error);
      });

    api.marketplace.collection
      .getItem(
        {
          slug: 'CONE',
        },
        true,
        3, // 23.03.21 수정 노출 갯수 3개
      )
      .then(({ data }) => setCone(data.result?.collection))
      .catch((error) => {
        console.log(error);
      });

    api.marketplace.collection
      .getItem(
        {
          slug: 'TTPS',
        },
        true,
        3,
      )
      .then(({ data }) => setTangled(data.result?.collection))
      .catch((error) => {
        console.log(error);
      });
  }, [api]);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className={cn('marketplace-inner')}>
      {/* 23.04.03 수정: cora 추가 */}
      <MarketplaceBannerTypeCollection
        collection={coraList}
        isOpen
        customInfo={[
          { name: 'Collection Covenant', figure: '198,000 WEMIX', figureAddition: `($${getCurrentValue(198000)})` },
          { name: 'Covenant Date', figure: '2024-04-12' },
          { name: 'Items', figure: '88' },
        ]}
        aboutCollectionLink="/life/cone?nft=cora"
        newOpen
      />
      <MarketplaceBannerTypeCollection
        collection={tangled}
        isOpen
        customInfo={[
          { name: 'Collection Covenant', figure: '10,000 WEMIX', figureAddition: `($${getCurrentValue(10000)})` },
          { name: 'Covenant Date', figure: '2024-03-22' },
          { name: 'Items', figure: '50' },
        ]}
        aboutCollectionLink={{
          pathname: '/marketplace/[collectionAddressOrSlug]',
          query: { collectionAddressOrSlug: tangled?.slug },
        }}
      />
      <MarketplaceBannerTypeCollection
        collection={cone}
        isOpen
        customInfo={[
          { name: 'Collection Covenant', figure: '198,000 WEMIX', figureAddition: `($${getCurrentValue(198000)})` },
          { name: 'Covenant Date', figure: '2024-03-16' },
          { name: 'Items', figure: '88' },
        ]}
        aboutCollectionLink={{
          pathname: '/marketplace/[collectionAddressOrSlug]',
          query: { collectionAddressOrSlug: cone?.slug },
        }}
      />
      <MarketplaceBannerTypeCollection
        isOpen
        collection={sonCollection}
        customInfo={subBannerInfoList.nile}
        aboutCollectionLink={{
          pathname: '/marketplace/[collectionAddressOrSlug]',
          query: { collectionAddressOrSlug: sonCollection?.slug },
        }}
      />
      <MarketplaceBannerTypeCollection collection={lus} showStat={{ total: true, ongoing: true }} isOpen />
    </div>
  );
};
