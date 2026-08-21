import {NativeModules} from 'react-native';

/**
 * Aperture startup marks — a vendored, dependency-free emitter for the
 * `ApertureMark|1|{json}` wire protocol.
 *
 * Each call drops one structured line into logcat that Aperture ingests as an
 * exact, source-attributed timeline milestone — the JS moments a black-box read
 * can only infer (rehydrate complete, "usable"), named and tied to source.
 *
 * This is the protocol emitted by hand rather than the `@aperture/mark` package,
 * so it adds no dependency. It routes through the native `ApertureMark` module
 * (see ApertureMarkModule.java) because `console.*` is stripped from release; if
 * the native module is somehow absent it silently no-ops rather than throwing.
 * The module only emits — the OS log call stamps the line, on the same clock as
 * everything else Aperture reads. Android only for now (iOS has no module yet).
 */

const Native = NativeModules.ApertureMark as
  | {emit(line: string): void; reportFullyDrawn(): void}
  | undefined;

type Category =
  | 'process'
  | 'window'
  | 'native'
  | 'framework'
  | 'app'
  | 'storage'
  | 'network'
  | 'gc'
  | 'system'
  | 'diagnostic';

export interface MarkInput {
  /** Stable id — the key Aperture dedupes and diffs on. */
  id: string;
  /** Human label for the track. */
  label: string;
  /** Lane it belongs in; defaults to 'app' on ingest. */
  category?: Category;
  /** A span the app already measured, ms — a labelled metric, not a timeline position. */
  durationMs?: number;
  /** Where it's emitted; `symbol` is a literal Aperture verifies against the checkout. */
  source?: {file: string; symbol?: string; pkg?: string};
  /** One line on what this milestone means. */
  meaning?: string;
}

/**
 * Build the wire line in the schema's field order (id, label, category,
 * durationMs, source, meaning), omitting unset fields, then emit it. Field order
 * matters — it must match the Aperture conformance goldens byte for byte.
 */
export function mark(input: MarkInput): void {
  const m: Record<string, unknown> = {id: input.id, label: input.label};
  if (input.category !== undefined) m.category = input.category;
  if (input.durationMs !== undefined) m.durationMs = input.durationMs;
  if (input.source !== undefined) m.source = input.source;
  if (input.meaning !== undefined) m.meaning = input.meaning;
  Native?.emit(`ApertureMark|1|${JSON.stringify(m)}`);
}

/**
 * Emit a "usable" mark AND tell the platform the app is fully drawn. The app
 * owns the definition of "usable" — call this once, from the moment the home
 * screen is mounted, state is rehydrated, and cached content is painted (NOT at
 * first frame, and NOT after a network refresh — that would measure the backend,
 * not the app).
 */
export function reportUsable(input: MarkInput): void {
  mark(input);
  Native?.reportFullyDrawn();
}
