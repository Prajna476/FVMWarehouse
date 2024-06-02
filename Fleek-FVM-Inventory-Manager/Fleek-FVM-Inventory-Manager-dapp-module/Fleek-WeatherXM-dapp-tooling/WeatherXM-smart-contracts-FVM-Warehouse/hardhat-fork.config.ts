import hardhatConfig from './hardhat.config';
import envConfig from './config';

export default {
  ...hardhatConfig,
  networks: {
    ...hardhatConfig.networks,
    hardhat: {
      allowUnlimitedContractSize: false,
      blockGasLimit: 20000000,
      forking: {
        url: `https://arb-sepolia.g.alchemy.com/v2/${envConfig.ALCHEMY_API_KEY}`,
        blockNumber: 36949713
      }
    }
  }
};
