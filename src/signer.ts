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
      const { data } = await axios.post(`${this.walletBackendUrl}/account`, null, {
        headers: {
          authorization: `Bearer ${this.idToken}`,
          "x-api-key": this.walletAPIKey,
        },
      });
      this.address = data.success.ethereumAddress;
    }
    return this.address;
  }

  async signMessage(message: utils.Bytes | string): Promise<string> {
    const { data } = await axios.post(
      `${this.walletBackendUrl}/signMessage`,
      { message },
      {
        headers: {
          authorization: `Bearer ${this.idToken}`,
          "x-api-key": this.walletAPIKey,
        },
      }
    );

    return data.signature;
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

    return data.signature;
  }

  async signTransaction(transaction: providers.TransactionRequest): Promise<string> {
    const { data } = await axios.post(
      `${this.walletBackendUrl}/signTransaction`,
      { transaction },
      {
        headers: {
          authorization: `Bearer ${this.idToken}`,
          "x-api-key": this.walletAPIKey,
        },
      }
    );

    return data.signature;
  }

  updateidToken(idToken: string) {
    this.idToken = idToken;
  }

  connect(provider: providers.Provider): Signer {
    return new Fr0ntierXWalletSigner(this.walletBackendUrl, this.walletAPIKey, this.idToken, provider);
  }
}
