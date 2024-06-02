# Galadriel for enabling incident summarization, Fraud detection and insurance inventory issues 

We are using Galadriel to develop an AI agent for incident summarization during supply chain management and logistics services and for managing fraud detection and insurance inventory management at the warehouse location. This enables incident management and early stage detection of goods and equipment insurance issues in case of an incident.

Demos at https://drive.google.com/drive/u/1/folders/1X3lQ12CRuyswVenF53UZakYcl86UbxQk

Workflow and Core Objectives for building Warehouse AI agents on Galadriel devnet:

Decentralized platform for warehouse and logistics incident reporting and summarization by employees and contractors.

Community-driven approach to improving warehouse safety 

Integration of advanced technologies for incident summarization, detection and prevention.

Smart incentivization using QR code dapp, EtherCalc.


## Development

### Running Locally

1. Install NodeJS >=18.
2. Clone the repository.
3. Install dependencies with `npm install`.
4. Copy `.env.example` to `.env.local` and update environment variables.  
Edit .env.local
`NEXT_PUBLIC_NETWORK` "local" defaults to `http://localhost:8545/`  
and anything else uses `https://devnet.galadriel.com/` as the RPC url  
The default contract address is Galadriel devnet contract address
5. Start the application using `npm run dev`.
6. Visit `http://localhost:3001` in your browser.

