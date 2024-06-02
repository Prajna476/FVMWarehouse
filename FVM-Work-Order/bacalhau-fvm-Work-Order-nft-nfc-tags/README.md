# Work Order NFT on the Filecoin Virtual Machine (FVM / FEVM) 

We are extending the #buildwithbacalhau resources to develop a Work Order NFT on the Filecoin Virtual Machine (FVM / FEVM) with Bacalhau Stable Diffusion.

Contracts found under /pages/api/hardhat

Requirements:
.env with an NFT.Storage API key & wallet private key for deployments
node

Deploy the contract by running

```npx hardhat run pages/api/hardhat/deploy/deployBacalhauFRC721.ts --network filecoinHyperspace ```

Quick Start
- clone
- npm install
- add a .env file with the needed env variables (see .env.example)
- npm run dev

Reference: 
 [@DeveloperAlly](https://twitter.com/DeveloperAlly)

