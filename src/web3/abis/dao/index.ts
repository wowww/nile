import * as process from 'process';
import ContractFactory from './ContractFactory_Abi.json';

import DaoRouter from './DAORouter_Abi.json';
import DistributionSpell from './DistributionSpell_Abi.json';
import FundRouter from './FundRouter_Abi.json';
import Governance from './Governance_Abi.json';
import GovernanceProxy from './GovernanceProxy_Abi.json';
import GovernanceSpell from './GovernanceSpell_Abi.json';
import Incinerator from './Incinerator_Abi.json';
import LiquidationSpell from './LiquidationSpell_Abi.json';
import MelterRegistry from './MelterRegistry_Abi.json';
import Payment from './Payment_Abi.json';
import PteRegistry from './PteRegistry_Abi.json';
import RelocateSpell from './RelocateSpell_Abi.json';
import ReOpen from './ReOpen_Abi.json';
import ReopenSpell from './ReopenSpell_Abi.json';
import RevenueSpell from './RevenueSpell_Abi.json';
import SpellRegistry from './SpellRegistry_Abi.json';
import StakingPool from './StakingPool_Abi.json';
import StakingPoolProxy from './StakingPoolProxy_Abi.json';
import Station from './Station_Abi.json';
import SwapSpell from './SwapSpell_Abi.json';
import Treasury from './Treasury_Abi.json';
import TreasurySpell from './TreasurySpell_Abi.json';
import Trust from './Trust_Abi.json';
import TextSpell from './TextSpell_Abi.json';
import VRF from './VRF_Abi.json';
import WeswapRouter from './IWeswapRouter_Abi.json';
import WWemix from './IWWEMIX_Abi.json';
import DaoToken from './DAOToken_Abi.json';
import GovernanceToken from './GovernanceToken_Abi.json';

import { AbiItem } from 'web3-utils';

export type DaoJsonAbiName =
  | 'FundRouter'
  | 'DaoRouter'
  | 'ContractFactory'
  | 'SpellRegistry'
  | 'PteRegistry'
  | 'MelterRegistry'
  | 'Payment'
  | 'Incinerator'
  | 'Station'
  | 'StakingPool'
  | 'StakingPoolProxy'
  | 'Governance'
  | 'GovernanceProxy'
  | 'Treasury'
  | 'Trust'
  | 'ReOpen'
  | 'TreasurySpell'
  | 'LiquidationSpell'
  | 'DistributionSpell'
  | 'RevenueSpell'
  | 'GovernanceSpell'
  | 'ReopenSpell'
  | 'SwapSpell'
  | 'RelocateSpell'
  | 'TextSpell'
  | 'VRF'
  | 'WeswapRouter'
  | 'WWemix';

export const daoJsonAbiNames = [
  'FundRouter',
  'DaoRouter',
  'ContractFactory',
  'SpellRegistry',
  'PteRegistry',
  'MelterRegistry',
  'Payment',
  'Incinerator',
  'Station',
  'StakingPool',
  'StakingPoolProxy',
  'Governance',
  'GovernanceProxy',
  'Treasury',
  'Trust',
  'ReOpen',
  'TreasurySpell',
  'LiquidationSpell',
  'DistributionSpell',
  'RevenueSpell',
  'GovernanceSpell',
  'ReopenSpell',
  'SwapSpell',
  'RelocateSpell',
  'TextSpell',
  'VRF',
  'WeswapRouter',
  'WWemix',
];

export const daoJsonAbiAddress = () => {
  const development: { [key: string]: string } = {
    FundRouter: '0x7a4156cb14f4b21f84e493864c0e69db5cbe39d2',
    DaoRouter: '0xbf70238738cf7c9f490fa5987cf8ca4ce8f7378f',
    ContractFactory: '0x9b37048b024c0dd8d6a21acffafcec30f2513ab8',
    SpellRegistry: '0x06a9a93b02116ffcd221dbf2876b632b64ba711e',
    PteRegistry: '0xfa7848b1847a1c5e431dd6ff4c94496c1ed32b47',
    MelterRegistry: '0x22beae815552f7dc7cab2ca2499e9e5fb0a973bf',
    Payment: '0xfde297a8beb1f4287ba16016fb8d2779d10e52d6',
    Incinerator: '0xe77d908708a07b22229e8750c614ba204e3900de',
    Station: '0xd1181dc010d664a87b7d6794fb543ef096f3b290',
    StakingPool: '0x8dce547187eccb94c5eaebe37ed2debf436f918a',
    StakingPoolProxy: '0x0b1f82e4374050725a5938946a9baea8f05cfa89',
    Governance: '0x1b37ee8db6d9058f93a0cea1d4de740e8b5bb1bf',
    GovernanceProxy: '0x03125c3b44b1a2c4660481f3285257ac7977a92f',
    Treasury: '0xa1adf0664498df385ed5d82985688805919a7ca5',
    Trust: '0x4825640be0c7db656f81dd8694fff7ecaad39815',
    ReOpen: '0xe4690a15c22859dfb00504ac76d8f05c09987002',
    TreasurySpell: '0xb924a22561301170133e3ab38532b68b21cc8411',
    LiquidationSpell: '0x03ee094f0f5f48c9843463cf1fc2d17a62b57198',
    DistributionSpell: '0x11a03f44df2bd5d70bc36b039612ea2b6f85aabe',
    RevenueSpell: '0x5b961587c853985efd3d5c88e9dd8a0ec0a6433a',
    GovernanceSpell: '0x2696682b252087a9117413bfd35508b5e5ee4171',
    ReopenSpell: '0xcfd4fbc7cafe9be1aff0922c5863ef9ef4998e36',
    SwapSpell: '0xd06d0f4d83f6e7ccb4599d0ef16f1db1272fe0eb',
    RelocateSpell: '0x8868c4140d6d2760c4987a9ab75ada6c904d350a',
    TextSpell: '0xbf81070b9e9f9ce3e31efe75334742091d61ee1a',
    // Support
    VRF: '0xab0c8b9d39e946a3bc6cb3af5fcaa47ef2af90d4',
    WeswapRouter: '0xe9086c38a7cf49d3b8547e3d9e085a5f0050701d',
    WWemix: '0x244c72ab61f11dd44bfa4aaf11e2efd89ca789fe',
    WemixDollar: '0xae81b9ffcde5ab7673dd4b2f5c648a5579430b17',
  };

  const production: { [key: string]: string } = {
    FundRouter: '0x4c2db3aa29234a8cd3d2cd38ee7bdf715dd4b462',
    DaoRouter: '0x5fa1ffe85970c5c728a62530fe3e9e97c5d1a257',
    ContractFactory: '0xa66584ad71e60fd759fcf7affbe81a1fbd0030c2',
    SpellRegistry: '0x904eeb17352c1243d3c1fc44b7564ba579a74b2f',
    PteRegistry: '0xfdb56af8348d0fa5869da207b0586f889a1951a4',
    MelterRegistry: '0x255d243516d03b893ecaf9bf95a3bbe51803e9da',
    Payment: '0x908277c8ca2f91d75bfbe0fe68bf16d541f87adf',
    Incinerator: '0x3e7f78be29b511dee0fba105bffc3d2870cdc03b',
    Station: '0x53bd04a9782c7af338a4e4b664986cf7d10314bd',
    StakingPool: '0xbce169234b05531192b1cddd2159e7b6dc94f473',
    StakingPoolProxy: '0x54613305c8b492043a0fdbe7a1d1db06651c85d0',
    Governance: '0x6a63b569f6d80b8a934a6621bab6922c07089ab7',
    GovernanceProxy: '0xf5c891e5ce7a39b5ede9a540d417e7eb0d06ad9f',
    Treasury: '0x73ae8c140ec5df0a8d52195a94fdec3560047109',
    Trust: '0x9de5adf21dcd8c3a0465db5b5744c23cae4c08b7',
    ReOpen: '0x9a74f7dab393f2ef8088af7713a3d2459cbec7fe',
    TreasurySpell: '0xf102e19eadfcfa5984c571b8f42b8b48140c94e9',
    LiquidationSpell: '0x9265e39bc93db5037edf3a22b60cb6a167fa5a3f',
    DistributionSpell: '0xe6d18275192e6b91fff029b0ddc6a4fa12791328',
    RevenueSpell: '0xc4f9665baec61aaf523291fd62b1682dc705ecc2',
    GovernanceSpell: '0x7d79a32bf8df891dc1295acf933121d210a35013',
    ReopenSpell: '0x7a1edae38564358cab6808b89d93023ba951eb08',
    SwapSpell: '0xb502475ae2a29935dbd894945351979f5a94a5f5',
    RelocateSpell: '0x00eb64975b608bf39b7f5793816665d63a504034',
    TextSpell: '0xab3b6c4b7ce4297acf66ed8470fa1fe1b0e15efb',
    // Support
    VRF: '0x9b34c974a9799728f68ff4916159a7d9dde621fc',
    WeswapRouter: '0x80a5A916FB355A8758f0a3e47891dc288DAC2665',
    WWemix: '0x7D72b22a74A216Af4a002a1095C8C707d6eC1C5f',
    WemixDollar: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
  };

  const current: { [key: string]: string } = {
    development,
    production,
  }[(process.env.NEXT_PUBLIC_ENV_PROFILE as 'development' | 'production') ?? 'production'];

  return {
    development,
    production,
    current,
  };
};

export const daoAbis: { [key: string]: AbiItem[] } = {
  FundRouter: FundRouter as AbiItem[],
  DaoRouter: DaoRouter as AbiItem[],
  ContractFactory: ContractFactory as AbiItem[],
  SpellRegistry: SpellRegistry as AbiItem[],
  PteRegistry: PteRegistry as AbiItem[],
  MelterRegistry: MelterRegistry as AbiItem[],
  Payment: Payment as AbiItem[],
  Incinerator: Incinerator as AbiItem[],
  Station: Station as AbiItem[],
  StakingPool: StakingPool as AbiItem[],
  StakingPoolProxy: StakingPoolProxy as AbiItem[],
  Governance: Governance as AbiItem[],
  GovernanceProxy: GovernanceProxy as AbiItem[],
  Treasury: Treasury as AbiItem[],
  Trust: Trust as AbiItem[],
  ReOpen: ReOpen as AbiItem[],
  TreasurySpell: TreasurySpell as AbiItem[],
  LiquidationSpell: LiquidationSpell as AbiItem[],
  DistributionSpell: DistributionSpell as AbiItem[],
  RevenueSpell: RevenueSpell as AbiItem[],
  GovernanceSpell: GovernanceSpell as AbiItem[],
  ReopenSpell: ReopenSpell as AbiItem[],
  SwapSpell: SwapSpell as AbiItem[],
  RelocateSpell: RelocateSpell as AbiItem[],
  TextSpell: TextSpell as AbiItem[],
  VRF: VRF as AbiItem[],
  WeswapRouter: WeswapRouter as AbiItem[],
  WWemix: WWemix as AbiItem[],
  DaoToken: DaoToken as AbiItem[],
  GovernanceToken: DaoToken as AbiItem[],
};
