# Fr0ntierX Wallet SDK

The `@frontierx/wallet-sdk`` offers a straightforward method for integrating the FrontierX Wallet API into web applications that use [ethers.js](https://docs.ethers.org/v5/). This SDK includes a custom signer, enabling the signing of messages and transactions using the FrontierX Wallet.

## Installation

To install the Wallet SDK use the following command for `npm`:

```bash
npm install @fr0ntierx/wallet-sdk
```

or for `yarn`:

```bash
yarn add @fr0ntierx/wallet-sdk
```

## Usage

### Initialization

Before you can sign messages and transactions, you need to initialize a `Fr0ntierXWalletSigner` object. You will need to following parameters:

- Wallet API URL: the URL of the wallet instace you want to use
- Wallet API Key: your wallet API key
- ID token: a valid ID token created from a whitelisted OAuth client associated with the API key
- (optional) Ethers provider: an ethers provider for interaction with the blockchain

```javascript
import { Fr0ntierXWalletSigner } from "@fr0ntierx/wallet-sdk";

const signer = new Fr0ntierXWalletSigner("https://wallet-api-dev.fr0ntierx.xyz", "demo", idToken);
```

### Updating the OIDC Token

If the ID token of the user expires, you can update itL

```javascript
signer.updateOIDCToken(newIdToken);
```

### Getting Address

Retrieve the address associated with the current ID token.

```javascript
const address = await signer.getAddress();
console.log(address);
```

### Signing a Message

Sign a message using the user's Fr0ntierX Wallet.

```javascript
const message = "Hello, Fr0ntierX!";
const signedMessage = await signer.signMessage(message);
console.log(signedMessage);
```

### Signing Typed Data

Sign typed data using the user's Fr0ntierX Wallet.

```javascript
const domain = {}; // your domain data
const types = {}; // your type data
const value = {}; // the data to be signed

const signedTypedData = await signer._signTypedData(domain, types, value);
console.log(signedTypedData);
```

### Signing a Transaction

Sign a transaction using the user's Fr0ntierX Wallet.

```javascript
const transaction = {
  to: "0x...", // recipient address
  value: ethers.utils.parseEther("1.0"), // 1 ether
  // ... other transaction data
};

const signedTransaction = await signer.signTransaction(transaction);
console.log(signedTransaction);
```

## Contributions

We welcome contributions from the community. If you have any suggestions, bug reports, or feature requests, please [open an issue](https://github.com/fr0ntierx/wallet-sdk/issues) on our GitHub repository.

## License

This project is licensed under the MIT License.
