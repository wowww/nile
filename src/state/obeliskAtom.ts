import { atom } from 'jotai';
import { wonderDaoAtom } from '@/state/daoAtom';
import { nileWalletAtom, provider } from '@/state/nileWalletAtom';
import { daoAbis, daoJsonAbiAddress } from '@/web3/abis/dao';
import { ObeliskBalance, ObeliskUserInfos } from '@/types/dao/obelisk.types';
import { fromWei, toWei } from 'web3-utils';

export const wonderDaoStakingPoolUserInfoAtom = atom<ObeliskUserInfos | undefined>(undefined);
export const wonderDaoStakingPoolSwapAmountAtom = atom<string | undefined>(undefined);

export const refreshWonderDaoStakingPoolUserInfoAtom = atom(null, (get, set, update) => {
  const daoId = get(wonderDaoAtom)?.daoId;
  const nileWallet = get(nileWalletAtom);

  if (!daoId || !nileWallet) return;

  const contract = new provider.web3.eth.Contract(daoAbis.StakingPool, daoJsonAbiAddress().current.StakingPoolProxy);

  contract?.methods.userInfos(daoId, nileWallet).call((err: any, res: any) => {
    set(wonderDaoStakingPoolUserInfoAtom, {
      lastStakeBlock: res.lastStakeBlock,
      stakedAmount: res.stakedAmount,
      totalStakedAmount: res.totalStakedAmount,
      totalUnstakedAmount: res.totalUnstakedAmount,
      unstakeableTime: res.unstakeableTime,
    });
  });
});

export const refreshWonderDaoStakingPoolSwapAmountAtom = atom(null, (get, set, update) => {
  const daoId = get(wonderDaoAtom)?.daoId;
  const nileWallet = get(nileWalletAtom);

  if (!daoId || !nileWallet) return;

  const contract = new provider.web3.eth.Contract(daoAbis.StakingPool, daoJsonAbiAddress().current.StakingPoolProxy);

  contract?.methods.calSwapAmount(daoId, 0, toWei('1', 'ether')).call(function (err: any, res: any) {
    set(wonderDaoStakingPoolSwapAmountAtom, fromWei(String(res ?? ""), 'ether'));
  });
});

export const wonderObeliskBalanceAtom = atom<ObeliskBalance | undefined>(undefined);

export const refreshWonderObeliskBalanceAtom = atom(null, async (get, set, update) => {
  const nileWallet = get(nileWalletAtom);
  const wonderDao = get(wonderDaoAtom);

  if (!wonderDao?.daoId) return;
  if (!nileWallet || !wonderDao?.dtAddress || !wonderDao?.gtAddress) return;

  const wonderContract = new provider.web3.eth.Contract(daoAbis.DaoToken, wonderDao?.dtAddress);
  const gWonderContract = new provider.web3.eth.Contract(daoAbis.DaoToken, wonderDao?.gtAddress);

  const wonder = await wonderContract?.methods.balanceOf(nileWallet).call();
  const gWonder = await gWonderContract?.methods.balanceOf(nileWallet).call();

  const obeliskContract = new provider.web3.eth.Contract(daoAbis.StakingPool, daoJsonAbiAddress().current.StakingPoolProxy);

  const stakedWonder = await obeliskContract?.methods.getStakeAmount(wonderDao?.daoId, nileWallet).call();

  set(wonderObeliskBalanceAtom, {
    stakedWonder: fromWei(stakedWonder, 'ether'),
    wonder: fromWei(wonder, 'ether'),
    gWonder: fromWei(gWonder, 'ether'),
  })
})

