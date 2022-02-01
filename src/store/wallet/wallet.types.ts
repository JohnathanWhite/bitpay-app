import {ExchangeRate, Key, PriceHistory, Token} from './wallet.models';
import {ReceiveAddressConfig} from '../../navigation/wallet/components/ReceiveAddress';

export enum WalletActionTypes {
  SET_WALLET_TERMS_ACCEPTED = 'WALLET/SET_WALLET_TERMS_ACCEPTED',
  SUCCESS_WALLET_STORE_INIT = 'WALLET/SUCCESS_WALLET_STORE_INIT',
  FAILED_WALLET_STORE_INIT = 'WALLET/FAILED_WALLET_STORE_INIT',
  SUCCESS_CREATE_KEY = 'WALLET/SUCCESS_CREATE_KEY',
  FAILED_CREATE_KEY = 'WALLET/FAILED_CREATE_KEY',
  SUCCESS_IMPORT = 'WALLET/SUCCESS_IMPORT',
  FAILED_IMPORT = 'WALLET/FAILED_IMPORT',
  SET_BACKUP_COMPLETE = 'WALLET/SET_BACKUP_COMPLETE',
  SUCCESS_GET_RATES = 'WALLET/SUCCESS_GET_RATES',
  FAILED_GET_RATES = 'WALLET/FAILED_GET_RATES',
  SUCCESS_GET_PRICE_HISTORY = 'WALLET/SUCCESS_GET_PRICE_HISTORY',
  FAILED_GET_PRICE_HISTORY = 'WALLET/FAILED_GET_PRICE_HISTORY',
  UPDATE_WALLET_BALANCE = 'WALLET/UPDATE_WALLET_BALANCE',
  DELETE_KEY = 'WALLET/DELETE_KEY',
  SUCCESS_ENCRYPT_OR_DECRYPT_PASSWORD = 'WALLET/SUCCESS_ENCRYPT_OR_DECRYPT_PASSWORD',
  SUCCESS_GET_TOKEN_OPTIONS = 'WALLET/SUCCESS_GET_TOKEN_OPTIONS',
  FAILED_GET_TOKEN_OPTIONS = 'WALLET/FAILED_GET_TOKEN_OPTIONS',
  SUCCESS_ADD_WALLET = 'WALLET/SUCCESS_ADD_WALLET',
  FAILED_ADD_WALLET = 'WALLET/FAILED_ADD_WALLET',
}

interface successWalletStoreInit {
  type: typeof WalletActionTypes.SUCCESS_WALLET_STORE_INIT;
}

interface failedWalletStoreInit {
  type: typeof WalletActionTypes.FAILED_WALLET_STORE_INIT;
}

interface successCreateKey {
  type: typeof WalletActionTypes.SUCCESS_CREATE_KEY;
  payload: {
    key: Key;
  };
}

interface failedCreateKey {
  type: typeof WalletActionTypes.FAILED_CREATE_KEY;
}

interface successAddWallet {
  type: typeof WalletActionTypes.SUCCESS_ADD_WALLET;
  payload: {
    key: Key;
  };
}

interface failedAddWallet {
  type: typeof WalletActionTypes.FAILED_ADD_WALLET;
}

interface successImport {
  type: typeof WalletActionTypes.SUCCESS_IMPORT;
  payload: {
    key: Key;
  };
}

interface failedImport {
  type: typeof WalletActionTypes.FAILED_IMPORT;
}

interface setBackupComplete {
  type: typeof WalletActionTypes.SET_BACKUP_COMPLETE;
  payload: string;
}

interface successGetRates {
  type: typeof WalletActionTypes.SUCCESS_GET_RATES;
  payload: {
    rates: {[key in string]: Array<ExchangeRate>};
  };
}

interface failedGetRates {
  type: typeof WalletActionTypes.FAILED_GET_RATES;
}

interface successGetPriceHistory {
  type: typeof WalletActionTypes.SUCCESS_GET_PRICE_HISTORY;
  payload: Array<PriceHistory>;
}

interface failedGetPriceHistory {
  type: typeof WalletActionTypes.FAILED_GET_PRICE_HISTORY;
}

interface updateWalletBalance {
  type: typeof WalletActionTypes.UPDATE_WALLET_BALANCE;
  payload: {
    keyId: string;
    walletId: string;
    balance: number;
  };
}

interface successEncryptOrDecryptPassword {
  type: typeof WalletActionTypes.SUCCESS_ENCRYPT_OR_DECRYPT_PASSWORD;
  payload: {
    key: Key;
  };
}

interface deleteKey {
  type: typeof WalletActionTypes.DELETE_KEY;
  payload: {
    keyId: string;
  };
}

interface successGetTokenOptions {
  type: typeof WalletActionTypes.SUCCESS_GET_TOKEN_OPTIONS;
  payload: {[key in string]: Token};
}

interface failedGetTokenOptions {
  type: typeof WalletActionTypes.FAILED_GET_TOKEN_OPTIONS;
}

interface setWalletTermsAccepted {
  type: typeof WalletActionTypes.SET_WALLET_TERMS_ACCEPTED;
}

export type WalletActionType =
  | successWalletStoreInit
  | failedWalletStoreInit
  | successCreateKey
  | failedCreateKey
  | successAddWallet
  | failedAddWallet
  | successImport
  | failedImport
  | setBackupComplete
  | successGetRates
  | failedGetRates
  | successGetPriceHistory
  | failedGetPriceHistory
  | updateWalletBalance
  | deleteKey
  | successEncryptOrDecryptPassword
  | successGetTokenOptions
  | failedGetTokenOptions
  | setWalletTermsAccepted;
