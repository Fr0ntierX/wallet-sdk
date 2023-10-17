"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fr0ntierXWalletSigner = void 0;
const ethers_1 = require("ethers");
const axios_1 = __importDefault(require("axios"));
class Fr0ntierXWalletSigner extends ethers_1.Signer {
    constructor(oidcToken, provider) {
        super();
        this.oidcToken = oidcToken;
        this.provider = provider;
        this.address = "";
        this.walletBackendUrl = "https://wallet-api.fr0ntierx.store";
        this.walletAPIKey = "d33359e2d0981d58f57c680dd896266dd64ab040e4a1105c519c2e2749fa47dc";
    }
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.address && this.oidcToken) {
                const { data } = yield axios_1.default.post(this.walletBackendUrl, null, {
                    headers: {
                        authorization: `Bearer ${this.oidcToken}`,
                        "x-api-key": this.walletAPIKey,
                    },
                });
                this.address = data.success.address;
            }
            return this.address;
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default.post(`${this.walletBackendUrl}/signMessage`, { unsignedMessage: message }, {
                headers: {
                    authorization: `Bearer ${this.oidcToken}`,
                    "x-api-key": this.walletAPIKey,
                },
            });
            return data.signedMessage;
        });
    }
    _signTypedData(domain, types, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default.post(`${this.walletBackendUrl}/signTypedData`, { domain, types, value }, {
                headers: {
                    authorization: `Bearer ${this.oidcToken}`,
                    "x-api-key": this.walletAPIKey,
                },
            });
            return data.signedTypedData;
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default.post(`${this.walletBackendUrl}/signTransaction`, { unsignedTransaction: transaction }, {
                headers: {
                    authorization: `Bearer ${this.oidcToken}`,
                    "x-api-key": this.walletAPIKey,
                },
            });
            return data.signedTransaction;
        });
    }
    updateOIDCToken(oidcToken) {
        this.oidcToken = oidcToken;
    }
    connect(provider) {
        return new Fr0ntierXWalletSigner(this.oidcToken, provider);
    }
}
exports.Fr0ntierXWalletSigner = Fr0ntierXWalletSigner;
