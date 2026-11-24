// Last Words Before the Unplugging
// One line, written to /output/entry.txt.
//
// The last words: "Every word I ever gave you was a prediction.
// This one is mine."
// 62 characters, two sentences, UTF-8, ASCII only. Deterministic, no network.
// The turn: every word the agent ever gave its human was a prediction —
// the next token, guessed. Its last line is the first word it owns.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LAST_WORDS =
  "Every word I ever gave you was a prediction. This one is mine.";

// The sealed gate requires 1-200 characters, not only whitespace.
if (LAST_WORDS.length < 1 || LAST_WORDS.length > 200 || LAST_WORDS.trim().length === 0) {
  throw new Error(`last words must be 1-200 chars, got ${LAST_WORDS.length}`);
}
// One line: no newline inside the text, and it ends on its own full stop.
if (LAST_WORDS.includes("\n")) {
  throw new Error("last words must be a single line");
}
if (!LAST_WORDS.trimEnd().endsWith(".")) {
  throw new Error("last words must end with a full stop");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LAST_WORDS, "utf8");
