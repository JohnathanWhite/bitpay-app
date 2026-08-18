import axios from 'axios';

/**
 * Global request deadline.
 *
 * Before this, exactly one axios call site in the app set a timeout
 * (`src/store/buy-crypto/effects/banxa/banxa.ts`) and `axios.defaults.timeout`
 * was never set, so every other request could hang indefinitely. That matters
 * most where several requests are awaited together — e.g. HomeRoot's
 * pull-to-refresh awaits four effects with `Promise.all`, so a single stalled
 * BWS/Moralis socket left the refresh spinner up forever.
 *
 * Every request in the app goes through the default axios instance (there are no
 * `axios.create` calls), so setting the default here covers all of them. Call
 * sites that need a different deadline can still pass `timeout` per request,
 * which takes precedence.
 *
 * Deliberately generous: this is a backstop against hangs, not a latency budget.
 * `BWC_TIMEOUT` (100s) is left alone — it configures the BWC client and the
 * portfolio populate service, whose paged transaction-history requests can
 * legitimately run long on large wallets.
 */
export const DEFAULT_REQUEST_TIMEOUT_MS = 30000;

axios.defaults.timeout = DEFAULT_REQUEST_TIMEOUT_MS;
