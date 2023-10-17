import { utils, Signer, providers } from "ethers";
import { TypedDataDomain, TypedDataField, TypedDataSigner } from "@ethersproject/abstract-signer";
import axios from "axios";

export class Fr0ntierXWalletSigner extends Signer implements TypedDataSigner {
  private address = "";
  private walletBackendUrl = "https://wallet-api.fr0ntierx.store";
  private walletAPIKey = "d33359e2d0981d58f57c680dd896266dd64ab040e4a1105c519c2e2749fa47dc";

  constructor(private oidcToken: string, readonly provider?: providers.Provider) {
    super();
  }

  async getAddress(): Promise<string> {
    if (!this.address && this.oidcToken) {
      const { data } = await axios.post(this.walletBackendUrl, null, {
        headers: {
          authorization: `Bearer ${this.oidcToken}`,
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
          authorization: `Bearer ${this.oidcToken}`,
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
          authorization: `Bearer ${this.oidcToken}`,
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
          authorization: `Bearer ${this.oidcToken}`,
          "x-api-key": this.walletAPIKey,
        },
      }
    );

    return data.signedTransaction;
  }

  updateOIDCToken(oidcToken: string) {
    this.oidcToken = oidcToken;
  }

  connect(provider: providers.Provider): Signer {
    return new Fr0ntierXWalletSigner(this.oidcToken, provider);
  }
}
