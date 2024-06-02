import 'hardhat-preprocessor';
import '@nomicfoundation/hardhat-toolbox';
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-gas-reporter';
import 'hardhat-deploy';
import '@typechain/hardhat';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-solhint';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-network-helpers';
import 'solidity-docgen';
import envConfig from './config';
import * as fs from 'node:fs';

function getRemappings() {
  return fs
    .readFileSync('remappings.txt', 'utf8')
    .split('\n')
    .filter(Boolean) // remove empty lines
    .map((line: any) => line.trim().split('='));
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const compilerConfig = (version: string) => ({
  version,
  settings: {
    evmVersion: 'shanghai',
    optimizer: {
      enabled: true,
      runs: 5000
    },
    outputSelection: {
      '*': {
        SavingsContract: ['storageLayout']
      }
    }
  }
});

const hardhatConfig: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: false,
      initialBaseFeePerGas: 0
    },
    arbitrumSepolia: {
      chainId: 421614,
      url: 'https://sepolia-rollup.arbitrum.io/rpc',
      accounts: []
    },
    arbitrum: {
      chainId: 42161,
      url: 'https://arb1.arbitrum.io/rpc',
      accounts: []
    }
  },
  solidity: {
    compilers: [{ ...compilerConfig('0.8.20')},{...compilerConfig('0.8.25') }]
  },
  preprocess: {
    eachLine: () => ({
      transform: (line: string) => {
        if (line.match(/^\s*import /i)) {
          for (const [from, to] of getRemappings()) {
            if (line.includes(from)) {
              line = line.replace(from, to);
              break;
            }
          }
        }
        return line;
      }
    })
  },
  paths: {
    sources: './src',
    tests: './test',
    cache: './cache_hardhat',
    artifacts: './artifacts'
  },
  gasReporter: {
    enabled: true,
    coinmarketcap: envConfig.COINMARKETCAP_API,
    currency: 'USD',
    noColors: true,
    showTimeSpent: true,
    showMethodSig: true,
    outputFile: 'gas-report.txt'
    //token: "MATIC"
  },
  typechain: {
    outDir: 'types/generated',
    target: 'ethers-v5'
  },
  mocha: {
    timeout: 120e3, // 120s
    retries: 1
  }
};

export default hardhatConfig;
