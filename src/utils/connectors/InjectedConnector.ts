import { InjectedConnector } from '@web3-react/injected-connector';
import SupportChains from './support-chains.json';

export const injected = new InjectedConnector({
  supportedChainIds: SupportChains
    .map(({ chainId }) => chainId),
});
