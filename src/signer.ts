import { utils, Signer, providers } from "ethers";
import { TypedDataDomain, TypedDataField, TypedDataSigner } from "@ethersproject/abstract-signer";
import axios from "axios";

export class Fr0ntierXWalletSigner extends Signer implements TypedDataSigner {
  private address = "";

  constructor(
    private walletBackendUrl: string,
    private walletAPIKey: string,
    private idToken: string,
    readonly provider?: providers.Provider
  ) {
    super();
  }

  async getAddress(): Promise<string> {
    if (!this.address && this.idToken) {
      const { data } = await axios.post(this.walletBackendUrl, null, {
        headers: {
          authorization: `Bearer ${this.idToken}`,
          "x-api-key": this.walletAPIKey,
        },
      });
      this.address = data.success.address;
    }
    return this.address;
  }

  async signMessage(message: utils.Bytes | string): Promise<string> {
    const { data } = await axios.post(
      `${this.walletBackendUrl}/signMessage`,
      { unsignedMessage: message },
      {
        headers: {
          authorization: `Bearer ${this.idToken}`,
          "x-api-key": this.walletAPIKey,
        },
      }
    );

    return data.signedMessage;
  }

  async _signTypedData(
    domain: TypedDataDomain,
    types: Record<string, Array<TypedDataField>>,
    value: Record<string, any>
  ): Promise<string> {
    const { data } = await axios.post(
      `${this.walletBackendUrl}/signTypedData`,
      { domain, types, value },
      {
        headers: {
          authorization: `Bearer ${this.idToken}`,
          "x-api-key": this.walletAPIKey,
        },
      }
    );

    return data.signedTypedData;
  }

  async signTransaction(transaction: providers.TransactionRequest): Promise<string> {
    const { data } = await axios.post(
      `${this.walletBackendUrl}/signTransaction`,
      { unsignedTransaction: transaction },
      {
        headers: {
          authorization: `Bearer ${this.idToken}`,
          "x-api-key": this.walletAPIKey,
        },
      }
    );

    return data.signedTransaction;
  }

  updateidToken(idToken: string) {
    this.idToken = idToken;
  }

  connect(provider: providers.Provider): Signer {
    return new Fr0ntierXWalletSigner(this.walletBackendUrl, this.walletAPIKey, this.idToken, provider);
  }
}
