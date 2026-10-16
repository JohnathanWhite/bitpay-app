import {LastPurchaseData} from '../../../store/buy-crypto/buy-crypto.models';

/**
 * Wallet id from the last purchase, or undefined when the caller asked for a different coin.
 * A coin requested by a deeplink or chart outranks the last purchase.
 */
export const getLastPurchaseWalletIdForRequest = (
  lastPurchaseData: LastPurchaseData | undefined,
  requestedCoin?: string,
  requestedChain?: string,
): string | undefined => {
  if (!requestedCoin) {
    return lastPurchaseData?.walletId;
  }
  const matchesRequest =
    lastPurchaseData?.coin?.toLowerCase() === requestedCoin.toLowerCase() &&
    (!requestedChain ||
      lastPurchaseData?.chain?.toLowerCase() === requestedChain.toLowerCase());
  return matchesRequest ? lastPurchaseData?.walletId : undefined;
};
