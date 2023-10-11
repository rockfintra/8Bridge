import { w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createClient } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { bscTestnet ,sepolia} from 'wagmi/chains'

export const chains = [sepolia,bscTestnet]
export const projectId = 'bf9397e41bf0ab99a492296a2957db54'

const { provider } = configureChains(chains, [infuraProvider({ apiKey: '833e6bd4860b416abc509843d803d2f3' }),w3mProvider({ projectId })])
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  provider,
})
