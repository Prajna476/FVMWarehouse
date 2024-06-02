# WeatherXM based Monitoring dapp

We are building a WeatherXM based Monitoring dapp and deploying on Fleek, which includes the requisite features to share weather conditions like humidity, temperature and conditions, enable remotely monitoring the warehouse using WeatherXM and sync services on used tablets and phones, integration with IP cameras, safety alarms. 

The cost of deployment and added technology is limited which could help the warehouse owners operate safely and cost effectively in a variety of geographical regions. 

## Dev Notes

### Testing

Tests are written with Foundry, Hardhat, Ethers & Typescript, using Typechain to generate typings for all contracts.

Please make sure:

1. Install the project's dependencies.

```
npm run setup
```

2. Review **hardhat.config.ts** and **hardhat-fork.config.ts** to better undestand the configuration of testnets and dependencies

3. Review the **env.template** to make sure you provide all necessary information for testing

4. Test the smart contracts by choosing one of the options described in this [tutorial](./docs/testing.md)

### CI

Codebase rules are enforced through some passing GitHub Actions (workflow configs are in .github/workflows). These rules are:

- Linting of both the contracts (through Solhint) and TS files (ESLint)
- Compile the smart contracts successfully
- Passing testing suites (both for Foundry and Hardhat)

### Code Formatting & Documentation

- Solidity imports deconstructed as import { xxx } from "../xxx.sol"
- Designed for Solidity >=0.8.20
- Uses custom errors instead of revert reason strings
- Well-documented via NatSpec comments
- Thoroughly tested with Foundry and Hardhat

Detailed code documentation resulted from NatSpec comments can be found in [Code Documentation](./docs/index.md).

### Security

While we have strict standards for code quality and test coverage, it's important to note that this project may not be entirely risk-free. Although we have taken measures to ensure the security of the contracts, they have not yet been audited by a third-party security researcher.

## Acknowledgements

- [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Hardhat](https://github.com/NomicFoundation/hardhat)
- [Foundry](https://github.com/foundry-rs/foundry)
- [Chainlink](https://github.com/smartcontractkit/chainlink)
- [Murky](https://github.com/dmfxyz/murky)
- [Solidity-RLP](https://github.com/hamdiallam/Solidity-RLP)

## Deployment

In the file `deploy/mainnet.js` fill in the missing addresses:
- Line 1: The address fo the USDC or in general the stablecoin to be used for service purchasing
- Line 2: The DAO treasury address that will receive the payments
- Line 3: The treasury address that will receive the change from the daily rewards distribution
- LIne 4: The amount of WXM (In the highest (ETH) denomination) to be initially sent to the reward pool

In `hardhat.config.js` fill in the network on which you want to deploy and the private key of the deployer

From the root of the project run:
1. `npm install`
2. `npx hardhat deploy --tags mainnet --network <the name of the network as you set it in hardhat config>`

After the deployment finishes a deployment file will be created in the deployments folder in the path `deployments/<network_name>`. This folder must be committed.
