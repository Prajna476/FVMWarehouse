# LIT Protocol subsystem dapp for authorization and attestation of Work Orders

We are using Lit protocol to automate signing, reading, and writing warehouse work order attestations and inventory insurance NFT data to web3 decentralized networks:

1. Lit Actions: We are using JS function bindings to enable warehouse security data operations like request a signature or a decryption.

2. Token-gate the Work Order Dashboard Page with admin and contractor personas using Lit Protocol.

1. Mint an NFT (client side)
2. Provision access to a resource (a web url) behind ownership of that NFT (client side)
3. Request a signed JWT from the Lit network to access that resource (client side)
4. Verify the signature on that JWT (server side)

The server is inside the file server.js.  The client is inside index.html

## Running

Install the packages by running "yarn install".  

Then, run "yarn start" to run within your work order dapp.
