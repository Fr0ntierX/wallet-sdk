# Fr0ntierX Wallet SDK

The `@fr0ntierx/wallet-sdk` provides an easy way to integrate the Fr0ntierX Wallet into your web applications. This SDK includes a custom signer that allows users to sign messages and transactions using their Fr0ntierX Wallet.

## Installation

You can install the `@fr0ntierx/wallet-sdk` using npm:

```bash
npm install @fr0ntierx/wallet-sdk
```

Or using yarn:

```bash
yarn add @fr0ntierx/wallet-sdk
```

## Usage

### Initialization

First, you need to initialize the `Fr0ntierXWalletSigner` with the OIDC token and an optional provider.

```javascript
import { Fr0ntierXWalletSigner } from "@fr0ntierx/wallet-sdk";

const oidcToken = "YOUR_OIDC_TOKEN";
const signer = new Fr0ntierXWalletSigner(oidcToken);
```

### Getting Address

Retrieve the address associated with the current OIDC token.

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

### Updating the OIDC Token

You can update the OIDC token if needed:

```javascript
const newOidcToken = "YOUR_NEW_OIDC_TOKEN";
signer.updateOIDCToken(newOidcToken);
```

## Contributions

We welcome contributions from the community. If you have any suggestions, bug reports, or feature requests, please [open an issue](https://github.com/fr0ntierx/wallet-sdk/issues) on our GitHub repository.

## License

This project is licensed under the MIT License.
