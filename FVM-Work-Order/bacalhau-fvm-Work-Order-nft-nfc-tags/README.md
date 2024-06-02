# Warehouse Equipment NFT on the Filecoin Virtual Machine (FVM / FEVM) 

We are developing a Warehouse Equipment NFT and a Service/Repair Work Order NFT for preventive maintenance at the warehouse on the Filecoin Virtual Machine (FVM / FEVM) with Bacalhau Stable Diffusion.
We are extending the #buildwithbacalhau resources to create an NFT for the Warehouse Equipment cad file on the Filecoin Virtual Machine (FVM / FEVM) with Bacalhau Stable Diffusion. This enables us to share and delegate a Work Order NFT on the FVM, enable decentralized NFT-based voting system for contract work by warehouse service providers, Votes are uploaded to IPFS/FVM with the most recent vote linking to one before. 



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

