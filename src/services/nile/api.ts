import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import https from 'https';

import homeStories from '@/mocks/home/story.json';
import homeBanners from '@/mocks/home/banners.json';
import homeChoice from '@/mocks/home/choice.json';
import lifeArticles from '@/mocks/life/articles.json';
import lifeCategories from '@/mocks/life/categories.json';
import marketplaceCategories from '@/mocks/marketplace/categories.json';
import marketplacePriceRanks from '@/mocks/marketplace/rank/price.json';
import marketplaceTransactionRanks from '@/mocks/marketplace/rank/transaction.json';
import communityDaoList from '@/mocks/community/dao/list.json';
import myHistories from '@/mocks/mypage/history.json';
import myFavorites from '@/mocks/mypage/history.json';
import daoDiscuss from '@/mocks/dao/discuss.json';
import daoAgora from '@/mocks/dao/agora.json';
import activity from '@/mocks/dao/activity.json';
import tableData from '@/mocks/dao/stationTableData.json';
import treasuryFund from '@/mocks/dao/treasuryFund.json';
import treasurtActivity from '@/mocks/dao/treasuryActivity.json';

import { AuthToken, defaultAuthToken } from '@/state/accountAtom';
import { Enter } from '@/types/dao/dao.types';

export enum MarketNftItemStatusType {
  NONE = 'NONE',
  AUCTION_LIVE_BEFORE_BID = 'AUCTION_LIVE_BEFORE_BID',
  AUCTION_LIVE_ONGOING = 'AUCTION_LIVE_ONGOING',
  COMPLETE = 'COMPLETE',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  CANCELED = 'CANCELED',
}

type profile = {
  nickname: string;
  description: string;
  url: string;
  themeIndex?: number;
  displayAsset: string;
  img?: string;
};

export const NileApiService = () => {
  const server = axios.create({
    // baseURL: 'https://api.nile.io',
    baseURL: process.env.NEXT_PUBLIC_ENV_NILE_API || 'https://api.dev.nile.io',
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
    withCredentials: true,
  });

  server.interceptors.request.use((request) => {
    // console.log('request', request);
    if (typeof window !== 'undefined') {
      let item = localStorage.getItem('authTokenAtom');

      if (item == null || item == 'undefined') {
        item = JSON.stringify(defaultAuthToken);
      }

      const authToken = JSON.parse(item) as AuthToken;
      if (authToken.accessToken) {
        if (!request.headers) {
          // request.headers = {};
        }

        if (request.url !== '/user/refresh') {
          request.headers.Authorization = `Bearer ${authToken.accessToken}`;
        }
      }
    }

    return request;
  });

  server.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      try {
        console.log(error);
        const originalRequest = error.config as AxiosRequestConfig<any>;
        const { response: errResponse } = error;
        const { data: errData } = errResponse as AxiosResponse<any>;
        if (originalRequest?.url !== '/user/refresh') {
          if (errResponse?.status === 401 && errData?.code === 40102) {
            console.log('token expired');
            let item = localStorage.getItem('authTokenAtom');

            if (item == null || item == 'undefined') {
              item = JSON.stringify(defaultAuthToken);
            }

            const authToken = JSON.parse(item) as AuthToken;

            if (authToken.refreshToken) {
              return user
                .refresh(authToken.refreshToken)
                .then(async ({ data }) => {
                  console.log(data);

                  localStorage.setItem(
                    'authTokenAtom',
                    JSON.stringify({
                      accessToken: data.accessToken,
                      refreshToken: authToken.refreshToken,
                    }),
                  );

                  return server(originalRequest);
                })
                .catch((e) => {
                  localStorage.removeItem('authTokenAtom');
                });
            }
            return Promise.reject();
          }
        } else {
          localStorage.removeItem('authTokenAtom');
          return Promise.reject();
        }
      } catch {
        localStorage.removeItem('authTokenAtom');
        return Promise.reject();
      }
    },
  );

  const home = {
    footprints: async () => server.get('/marketplace/footprints'),
    story: {
      getList: async () => homeStories,
    },
    newsfeed: {
      getList: async (size: number) =>
        server.get('https://api.dev.nile.io/social/medium', {
          params: {
            size,
          },
        }),
    },
    choice: {
      getList: async () => homeChoice,
    },
    banner: {
      getList: async () => homeBanners,
    },
  };

  const life = {
    article: {
      getList: async () => lifeArticles,
    },
    category: {
      getList: async () => lifeCategories,
    },
  };

  const marketplace = {
    activity: {
      getLiveList: async () => server.get('/marketplace/activities'),
    },
    banner: {
      getList: async () => axios.get('https://api.dev.nile.io/marketplace/banner'),
    },
    collection: {
      getList: async () => server.get('/marketplace/collections'),
      getItem: async (
        collectionAddressOrSlug: {
          slug?: string;
          address?: string;
        },
        shuffle?: boolean,
        size?: number,
        onAuction?: boolean,
      ) =>
        server.get('/marketplace/collection', {
          params: {
            ...collectionAddressOrSlug,
            shuffle,
            size,
            onAuction,
          },
        }),
      getCategories: async () =>
        server.get('/marketplace/categories', {
          params: {
            page: 1,
            size: 20,
            includeCollection: true,
          },
        }),
      getTokens: async (
        collectionAddressOrSlug: {
          slug?: string;
          address?: string;
        },
        page?: number,
        size?: number,
      ) =>
        server.get('/marketplace/collection/tokens', {
          params: {
            ...collectionAddressOrSlug,
            page,
            size,
          },
        }),
      getOrderStat: async (slug: string) =>
        server.get('/marketplace/collection/order-stat', {
          params: {
            slug,
          },
        }),
      getPriceStat: async (slug: string) =>
        server.get('/marketplace/collection/price-stat', {
          params: {
            slug,
          },
        }),
      share: async (collectionAddress: string) => server.post('/marketplace/collection/share', { collectionAddress }),
      getTraits: async (address: string) => server.get('/marketplace/collection/traits', { params: { address } }),
    },
    nft: {
      getList: async (page?: number, size?: number, slug?: string, sort?: string, status?: string[]) => {
        const params = new URLSearchParams();
        if (page !== undefined) {
          params.append('page', String(page));
        }
        if (size !== undefined) {
          params.append('size', String(size));
        }
        if (slug !== undefined) {
          params.append('slug', slug);
        }
        if (sort !== undefined) {
          params.append('sort', sort);
        }
        if (status !== undefined) {
          status.forEach((value) => {
            params.append('orderStatus', value);
          });
        }

        return server.get('/marketplace/tokens', { params });
      },
      getOrderList: async (page?: number, size?: number, sort?: string, status?: string[], type?: string[], slug?: string) => {
        const params = new URLSearchParams();
        if (page !== undefined) {
          params.append('page', String(page));
        }
        if (size !== undefined) {
          params.append('size', String(size));
        }

        if (status !== undefined) {
          status.forEach((value) => {
            params.append('status', value);
          });
        }

        if (type !== undefined) {
          type.forEach((value) => {
            params.append('type', value);
          });
        }

        if (slug) {
          params.append('slug', slug);
        }

        if (sort) {
          const sortArray = sort.split('|');
          sortArray.forEach((item) => {
            params.append('sort', item);
          });
        }

        return server.get('/marketplace/orders', { params });
      },
      getItem: async (params: { collectionSlug?: string; collectionAddress?: string; tokenId: number }) =>
        server.get(`/marketplace/token`, { params }),
      getTransactionHistory: async (params: { collectionAddress?: string; tokenId: number | string | undefined }) =>
        server.get(`/marketplace/token/transactions`, { params }),
      getPriceHistory: async (params: { collectionAddress?: string; tokenId: number | string | undefined }) =>
        server.get(`/marketplace/token/prices`, { params }),
      getRecentlySoldList: async () => server.get(`/marketplace/orders/recently-sold`),
      share: async (collectionAddress: string, tokenId: number) =>
        server.post('/marketplace/token/share', {
          collectionAddress,
          tokenId,
        }),
      view: async (collectionAddress: string, tokenId: number) =>
        server.post('/marketplace/token/view', {
          collectionAddress,
          tokenId,
        }),
    },
    category: {
      getList: async () => marketplaceCategories,
      // server.get('/marketplace/categories', {
      //   params: {
      //     // TODO
      //     page: 1,
      //     size: 10,
      //   }
      // })
    },
    rank: {
      price: {
        getList: async () => marketplacePriceRanks,
      },
      transaction: {
        getList: async () => marketplaceTransactionRanks,
      },
      getList: async () => [],
    },
  };

  const social = {
    twitter: {
      fetchTweets: async (twitterUserName: string) => server.get(`/social/twitter/${twitterUserName}`),
    },
  };

  const community = {
    dao: {
      getList: async () => communityDaoList,
    },
  };

  const user = {
    guest: async () => server.get('/user/guest', { withCredentials: true }),
    login: async (walletAddress: string, signature: string) =>
      server.post('/user/login', {
        walletAddress,
        signature,
      }),
    refresh: async (refreshToken: string) => server.post('/user/refresh', { refreshToken }),
    signup: async (walletAddress: string) => server.post('/user/account', { walletAddress }),
    account: {
      getUserInfo: async (walletAddress: string) =>
        server.get(`/user/account`, {
          params: {
            address: walletAddress,
          },
        }),
      getProfiles: async (addresses: string[]) => {
        const params = new URLSearchParams();
        addresses.forEach((address) => params.append('addresses', address));
        return server.get(`/user/profiles`, { params: params});
      },
      updateUserInfo: async (id: string, userInfo: profile) => server.put(`/user/account/${id}`, { ...userInfo }),
      validNickName: async (value: string) =>
        server.get(`/user/account/valid-nickname`, {
          params: {
            nickname: value,
          },
        }),
    },
  };

  const mypage = {
    activity: {
      getList: async (page: number, size: number, walletAddress: string) =>
        server.get('/marketplace/my/activities', {
          params: {
            page,
            size,
            walletAddress,
          },
        }),
    },
    history: {
      getList: async () => myHistories,
    },
    favorite: {
      getList: async () => myFavorites,
    },
    collection: {
      getList: async (page: number, size: number, walletAddress?: string) =>
        server.get('/marketplace/my/collections', {
          params: {
            page,
            size,
            walletAddress,
          },
        }),
    },
    nft: {
      getList: async (walletAddress: string, page?: number, size?: number) =>
        server.get('/marketplace/my/tokens', {
          params: {
            page,
            size,
            walletAddress,
          },
        }),
      getOrderList: async (walletAddress: string, page?: number, size?: number) =>
        server.get('/marketplace/my/orders', {
          params: {
            page,
            size,
            walletAddress,
          },
        }),
      getOfferList: async (walletAddress: string, page?: number, size?: number) =>
        server.get('/marketplace/my/offers', {
          params: {
            walletAddress,
            page,
            size,
          },
        }),
      getTransactionHistory: async (walletAddress: string) => server.get(`/marketplace/my/transactions`, { params: { walletAddress } }),

      getPrice: async (walletAddress: string) => server.get(`/marketplace/my/assets`, { params: { walletAddress } }),
    },
  };

  const dao = {
    dao: {
      getItem: async (daoId: number) => server.get('/dao/dao', { params: { daoId } }),
    },
    station: {
      getItem: async (daoId: number) => server.get(`/dao/dao/station/${daoId}`),
      getTableData: async (currentPage: number, number: number) => tableData,
      postEnter: async (body: Enter) => server.post('/dao/station/enter', { ...body }),
      history: {
        getList: async (daoId: number) => server.get('/dao/station/information/records', { params: { daoId } }),
        getMyList: async (daoId: number, address: string) =>
          server.get('/dao/station/information/users', {
            params: {
              daoId,
              memberAddress: address,
            },
          }),
      },
      member: {
        getList: async (daoId: number, reOpenId?: number, page?: number, size?: number) =>
          server.get('/dao/station/members', {
            params: {
              daoId,
              reOpenId: reOpenId ?? 0,
              page,
              size,
            },
          }),
      },
      enter: {
        getRank: async (daoId: number, amount: string, address: string) =>
          server.get('/dao/station/percent-rank', {
            params: {
              daoId,
              amount,
              address,
            },
          }),
      },
    },
    discuss: {
      getList: async () => daoDiscuss,
    },
    agora: {
      getList: async () => daoAgora,
    },
    stat: {
      fetchViewCount: async (path: string) => server.get(`/dao/stat/page/view`, { params: { path } }),
      postViewHistory: async (path: string) => server.post('/dao/stat/page/view', { path }),
    },
    treasury: {
      fund: {
        getList: async () => treasuryFund,
      },
    },
    activity: {
      obelisk: {
        getList: async () => activity,
      },
      treasury: {
        getList: async () => treasurtActivity,
      },
      incinerator: {
        getList: async () => activity,
      },
      trust: {
        getList: async () => activity,
      },
    },
    governance: {
      proposal: {
        getItem: async (daoId: number, proposalId: string) => server.get(`/dao/governance/proposal/${daoId}/${proposalId}`),
        getList: async (daoId: number) => server.get(`/dao/governance/proposal/${daoId}`),
      },
    },
  };

  return {
    home,
    life,
    marketplace,
    community,
    user,
    mypage,
    dao,
    social,
  };
};
