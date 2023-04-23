import { atom } from 'jotai';
import { DaoMenu, NileDao, PageInfo, PageMeta, StationInfo, StationLog } from '@/types/dao/dao.types';
import { NileApiService } from '@/services/nile/api';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import { RealTimeInfo, UserInfo } from '@/types/contract.types';
import { daoContractsAtom } from '@/state/web3Atom';
import { fromWei } from 'web3-utils';

export type DaoTheme = {
  value: string;
};

export type ConType = 'cone' | 'cora';

export const daoThemeAtom = atom<DaoTheme>({ value: 'wonder' });

export const daoHeaderAtom = atom(false);

export const daoVisibleMenuAtom = atom(true);

export const setFullPageAllowScrolling = atom(false);

export const setSwiperActiveIdxState = atom(0);

export const setSwiperDirectionState = atom('uo');

export const daoAtom = atom<NileDao>({});

export const daoHomeProtocolLottiePlay = atom(false);

export const daoSelectedMenu = atom<DaoMenu>('Home');

export const conTypeAtom = atom<ConType>('cone');

export const wonderDaoAtom = atom<NileDao | null>(null);

export const wonderStationAtom = atom<StationInfo[] | undefined>(undefined);

export const wonderStationRealTimeInfoAtom = atom<RealTimeInfo | undefined>(undefined);

export const wonderStationUserInfoAtom = atom<UserInfo | undefined>(undefined);

export const wonderStationMembersAtom = atom<StationLog[] | undefined>(undefined);

export const refreshWonderDaoAtom = atom(null, (get, set, update) => {
  const api = NileApiService();
  return api.dao.dao
    .getItem(Number(process.env.NEXT_PUBLIC_ENV_NILE_WONDER_DAO_ID))
    .then(({ data }) => {
      set(wonderDaoAtom, data.data);
    })
    .catch(() => {
      set(wonderDaoAtom, null);
    });
});

export const refreshWonderStationsAtom = atom(null, (get, set, update) => {
  const api = NileApiService();
  const daoId = get(wonderDaoAtom)?.daoId;

  if (!daoId) return;

  return api.dao.station
    .getItem(daoId)
    .then(({ data }) => {
      set(wonderStationAtom, data.result);
    })
    .catch(() => {
      set(wonderStationAtom, []);
    });
});

export const refreshWonderStationRealTimeInfoAtom = atom(null, (get, set, update) => {
  const daoId = get(wonderDaoAtom)?.daoId;
  const daoContracts = get(daoContractsAtom);

  if (!daoId || !daoContracts) return;

  daoContracts.Station?.methods.getRealTimeInfo(daoId).call(function (err: any, res: any) {
    set(wonderStationRealTimeInfoAtom, {
      ...res,
      totalEnterAmount: fromWei(res?.totalEnterAmount ?? '0', 'ether'),
      totalRefundAmount: fromWei(res?.totalRefundAmount ?? '0', 'ether'),
      totalRemainAmount: fromWei(res?.totalRemainAmount ?? '0', 'ether'),
    });
  });
});

export const refreshWonderStationUserInfoAtom = atom(null, (get, set, update) => {
  const daoId = get(wonderDaoAtom)?.daoId;
  const daoContracts = get(daoContractsAtom);
  const nileWallet = get(nileWalletAtom);

  if (!daoId || !daoContracts || !nileWallet) return;

  daoContracts.Station?.methods.getUserInfo(daoId, nileWallet).call(function (err: any, res: any) {
    set(wonderStationUserInfoAtom, {
      ...res,
      amount: fromWei(res?.amount ?? '0', 'ether'),
    });
  });
});

export const refreshWonderStationMembersAtom = atom(null, (get, set, update) => {
  const api = NileApiService();
  const daoId = get(wonderDaoAtom)?.daoId;
  const reopenId = get(wonderStationAtom)?.at(0)?.reOpenId;
  const pageInfo = get(stationMembersPageAtom);

  if (!daoId) return;

  api.dao.station.member
    .getList(daoId, reopenId, pageInfo?.page ?? 1, pageInfo?.size ?? 5)
    .then(async ({ data }) => {
      const profileResponse = await api.user.account.getProfiles(data.data.items.map((item: any) => item.address));

      console.log(profileResponse);

      if (profileResponse.data) {
        data.data.items.forEach((item: any) => {
          const profile = profileResponse.data.results.find((profile: any) => profile.address.toLowerCase() === item.address.toLowerCase());

          if (profile) {
            item.nickname = profile.nickname;
            item.profileImage = profile.img;
          }
        });
      }

      set(wonderStationMembersAtom, data.data.items);
      set(stationMembersPageMetaAtom, data.data.meta);
    })
    .catch((err) => set(wonderStationMembersAtom, []));
});

export const stationMembersPageAtom = atom<PageInfo | undefined>(undefined);
export const stationMembersPageMetaAtom = atom<PageMeta | undefined>(undefined);

// 23.04.18 추가
export const showDaoBottomPopup = atom<boolean>(false);
