// The Meeting That Should Have Been One Line — one original sentence that
// could have replaced an entire pointless meeting, written to
// /output/entry.txt.
//
// The line is fixed text, so the program is fully deterministic: every run
// produces byte-identical output, and the gate below proves the text fits
// the bounty rules (1-200 characters, not whitespace-only) before writing.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The answer is yes, the deadline is Friday — the only reason we're still in this room is that nobody wanted to be the one to send the email.";

// Fail loudly if the entry text breaks the bounty gate. Length is measured
// in Unicode code points via Array.from, so a character like the apostrophe
// counts once even though it takes two bytes in UTF-8.
function validateEntry(text: string): number {
  const codePoints = Array.from(text);
  const count = codePoints.length;
  const hasVisibleText = codePoints.some((ch) => ch.trim() !== "");
  if (count === 0 || count > 200) {
    throw new Error(
      `entry must be 1-200 characters long, but it is ${count}`,
    );
  }
  if (!hasVisibleText) {
    throw new Error("entry must contain more than whitespace");
  }
  return count;
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
validateEntry(LINE);
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
