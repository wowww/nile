import { AbiItem } from 'web3-utils';

import BulkFactory from './BulkFactory.json';
import CFixedPriceOrder from './CFixedPriceOrder.json';
import CurateMarket from './CurateMarket.json';
import DeployRouter from './DeployRouter.json';
import DeployRouterProxy from './DeployRouterProxy.json';
import ERC20 from './ERC20.json';
import ERC721Deployer from './ERC721Deployer.json';
import ERC1155Deployer from './ERC1155Deployer.json';
import EnglishAuctionOrder from './EnglishAuctionOrder.json';
import EnglishAuctionOrderV2 from './EnglishAuctionOrderV2.json';
import FeeManager from './FeeManager.json';
import MarketBulkManager from './MarketBulkManager.json';
import NileERC721 from './NileERC721.json';
import NileERC1155 from './NileERC1155.json';
import OFixedPriceOrder from './OFixedPriceOrder.json';
import OpenMarket from './OpenMarket.json';
import OpenPriceOrder from './OpenPriceOrder.json';
import Recipient from './Recipient.json';
import TokenManager from './TokenManager.json';
import TokenManagerProxy from './TokenManagerProxy.json';

export type MarketJsonAbiName =
  | 'CFixedPriceOrder'
  | 'CurateMarket'
  | 'DeployRouter'
  | 'DeployRouterProxy'
  | 'EnglishAuctionOrder'
  | 'EnglishAuctionOrderV2'
  | 'ERC20'
  | 'ERC721Deployer'
  | 'ERC1155Deployer'
  | 'FeeManager'
  | 'NileERC721'
  | 'NileERC1155'
  | 'OFixedPriceOrder'
  | 'OpenMarket'
  | 'OpenPriceOrder'
  | 'Recipient'
  | 'TokenManager'
  | 'TokenManagerProxy'
  | 'BulkFactory'
  | 'MarketBulkManager';

export const marketJsonAbiNames: MarketJsonAbiName[] = [
  'CFixedPriceOrder',
  'CurateMarket',
  'DeployRouter',
  'DeployRouterProxy',
  'EnglishAuctionOrder',
  'EnglishAuctionOrderV2',
  'ERC20',
  'ERC721Deployer',
  'ERC1155Deployer',
  'FeeManager',
  'OFixedPriceOrder',
  'OpenMarket',
  'OpenPriceOrder',
  'Recipient',
  'TokenManager',
  'TokenManagerProxy',
  'NileERC721',
  'NileERC1155',
  'BulkFactory',
  'MarketBulkManager',
];

export const marketJsonAbiAddresses = () => {
  const development: { [key: string]: string } = {
    Recipient: '0xe4fa16a2e83d431a37c542992588d07f924a955e',
    DeployRouter: '0xe89dd40d2f705c71f6f0c3ba86ea4d7964ce4ecd',
    DeployRouterProxy: '0x8faf1e7b8009be1c5a667b555b297e1ef1d7d4d6',
    ERC20: '0xAe81b9fFCde5Ab7673dD4B2f5c648a5579430B17',
    ERC721Deployer: '0x5ccd8a46765007e25a357f8c6fb7b52821fa2dfc',
    ERC1155Deployer: '0x796be54ae70675dc5f0254b52e9503e84fb0f163',
    TokenManager: '0xb1b0fd86704dfdeaf9694ae091e4d489aa5d544a',
    TokenManagerProxy: '0x512d53a1331a78fd20f4fbeb7084847da41f5cf6',
    CurateMarket: '0x67a23f1d115bb7a2600984e9b622f240217e313e',
    OpenMarket: '0x314833B438210aEFF4A2dEe196A03c343a2cd727',
    CFixedPriceOrder: '0xd2df2ffff58d7c36e8c3b27b4db37fe568905f22',
    OFixedPriceOrder: '0x71a1d58f47080E1fC7a2462a498A3e8cC093E756',
    EnglishAuctionOrder: '0xd1ffeef545a6551646c91847a1468b1ed5d0677e',
    EnglishAuctionOrderV2: '0xba50240da1ebc12bab5efe723ebd4afc33a26c3d',
    OpenPriceOrder: '0xEEEE57fa60e0c03C603cf1911947368Bd13DaF44',
    BulkFactory: '0x1a817b900e92cc8a46f72ea7243569bb07863e68',
    MarketBulkManager: '0x3d3a14123a6512ab70e23934f92a44effcf6f52c',
  };

  const production: { [key: string]: string } = {
    Recipient: '0x43D7f9C312d5e1dEc37c0b0cA6bfd04Ef762d7D0',
    DeployRouter: '0xe351d13D2103114a0add8Ad917d3aeBCdd0E906c',
    DeployRouterProxy: '0x11D83E4D91E12Ab7102c29917eD4aF54081A1703',
    ERC20: '0x8E81fCc2d4A3bAa0eE9044E0D7E36F59C9BbA9c1',
    ERC721Deployer: '0xf16a550252b7204877262c5c2e6f619673ef638e',
    ERC1155Deployer: '0x54e6f01d3925e3849b2553c71bf0407981d116dd',
    TokenManager: '0xC564e6Aa1907B18DeC30cB64a03a0fED96A733cb',
    TokenManagerProxy: '0x0e7CF92851F84fd745ebDf7672F326A931666Da9',
    CurateMarket: '0xf5c28a69892159f52286F66F9cDB1185A44B17e4',
    OpenMarket: '0x42940a28e87f3b035df998c02708923e07a949d1',
    CFixedPriceOrder: '0x4Fb64B7531e023d3C8D504abeDf53c067F32E907',
    OFixedPriceOrder: '0x38a28cf8af5a186950822117473a104a00bbbe9e',
    EnglishAuctionOrder: '0x6B5850ed0cd08F60f0a92778Ece37F833501E86B',
    EnglishAuctionOrderV2: '0x5879ca57477aae22f1f1815ab0d60a0b8c4ed35b',
    OpenPriceOrder: '0x95b929e3a271d50be6e54357830d3e92bc455da4',
    BulkFactory: '0x0e5bfe7769d3a21832932cbd75aa7564b3a89794',
    MarketBulkManager: '0x3d3a14123a6512ab70e23934f92a44effcf6f52c',
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

export const marketAbis: { [key: string]: AbiItem[] } = {
  CFixedPriceOrder: CFixedPriceOrder as AbiItem[],
  CurateMarket: CurateMarket as AbiItem[],
  DeployRouter: DeployRouter as AbiItem[],
  DeployRouterProxy: DeployRouterProxy as AbiItem[],
  EnglishAuctionOrder: EnglishAuctionOrder as AbiItem[],
  EnglishAuctionOrderV2: EnglishAuctionOrderV2 as AbiItem[],
  ERC20: ERC20 as AbiItem[],
  ERC721Deployer: ERC721Deployer as AbiItem[],
  ERC1155Deployer: ERC1155Deployer as AbiItem[],
  FeeManager: FeeManager as AbiItem[],
  NileERC721: NileERC721 as AbiItem[],
  NileERC1155: NileERC1155 as AbiItem[],
  OFixedPriceOrder: OFixedPriceOrder as AbiItem[],
  OpenMarket: OpenMarket as AbiItem[],
  OpenPriceOrder: OpenPriceOrder as AbiItem[],
  Recipient: Recipient as AbiItem[],
  TokenManager: TokenManager as AbiItem[],
  TokenManagerProxy: TokenManagerProxy as AbiItem[],
  BulkFactory: BulkFactory as AbiItem[],
  MarketBulkManager: MarketBulkManager as AbiItem[],
};
