/**
 * Narration text: how a line is said (`speechText`), and comparing it with what a speech recogniser
 * heard: both are reduced to plain words, with numbers as digits, so "thirty-two" and "32" match.
 * Used by the build's narration and pronunciation check.
 */

/**
 * The text the voice reads. A capital A on its own is the letter (a vertex, as in "tan A" or
 * "triangle A B C"), which the voice would read as the article "a", so it is spelled as it sounds;
 * an A that starts a sentence and is followed by a lower-case word ("A ramp is…") is the article.
 */
export function speechText(say: string): string {
  return say.replace(/\bA\b/g, (m, at: number) => {
    const sentenceStart = /(^|[.!?]\s+)$/.test(say.slice(0, at));
    const nextWord = /^\s+([a-z])/.test(say.slice(at + 1));
    return sentenceStart && nextWord ? m : 'Eh';
  });
}

const SMALL: Record<string, number> = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
};
const TENS: Record<string, number> = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
/** "three quarters" is 3 over 4. */
const PARTS: Record<string, number> = { half: 2, halves: 2, third: 3, thirds: 3, quarter: 4, quarters: 4, fourth: 4, fourths: 4, fifth: 5, fifths: 5, sixth: 6, sixths: 6, seventh: 7, sevenths: 7, eighth: 8, eighths: 8, ninth: 9, ninths: 9, tenth: 10, tenths: 10, twelfth: 12, twelfths: 12 };
const SAME: Record<string, string> = {
  sign: 'sine', signs: 'sines', cosign: 'cosine', centimeters: 'centimetres', centimeter: 'centimetre', meters: 'metres', meter: 'metre',
  kilometers: 'kilometres', cm: 'centimetres', m: 'metres', km: 'kilometres', degree: 'degrees', '°': 'degrees', okay: 'ok', percent: '%',
};

/** Lower case, no punctuation, numbers as digits, single letters joined ("a c" → "ac"). */
export function normalise(text: string): string[] {
  const raw = text
    .toLowerCase()
    .replace(/(\d),(\d{3})/g, '$1$2')
    .replace(/\//g, ' over ')
    .replace(/[-–—]/g, ' ')
    .replace(/[^a-z0-9.%°' ]/g, ' ')
    .replace(/\.(?!\d)/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => SAME[w] ?? w);
  const out: string[] = [];
  let num: number | null = null;
  const flush = () => {
    if (num !== null) out.push(String(num));
    num = null;
  };
  for (let i = 0; i < raw.length; i++) {
    const w = raw[i];
    if (w in SMALL || w in TENS) {
      const v = SMALL[w] ?? TENS[w];
      num = num !== null && num % 10 === 0 && num >= 20 && v < 10 ? num + v : (flush(), v);
      continue;
    }
    if (w === 'hundred' && num !== null) {
      num *= 100;
      continue;
    }
    if (w === 'point' && num !== null && i + 1 < raw.length && raw[i + 1] in SMALL) {
      let s = `${num}.`;
      while (i + 1 < raw.length && raw[i + 1] in SMALL && SMALL[raw[i + 1]] < 10) s += SMALL[raw[++i]];
      out.push(s);
      num = null;
      continue;
    }
    if (w in PARTS && num !== null) {
      out.push(String(num), 'over', String(PARTS[w]));
      num = null;
      continue;
    }
    flush();
    out.push(w);
  }
  flush();
  // "a c" → "ac", so spelled-out side names match however Whisper writes them.
  const joined: string[] = [];
  let run = false;
  for (const w of out) {
    const letter = w.length === 1 && /[a-z]/.test(w);
    if (letter && run && w !== 'a') joined[joined.length - 1] += w;
    else {
      joined.push(w);
      run = letter;
    }
  }
  return joined;
}

/** Word error rate between what was meant and what was heard. */
export function wer(meant: string[], heard: string[]): number {
  const d = Array.from({ length: meant.length + 1 }, (_, i) => [i, ...Array<number>(heard.length).fill(0)]);
  for (let j = 1; j <= heard.length; j++) d[0][j] = j;
  for (let i = 1; i <= meant.length; i++) {
    for (let j = 1; j <= heard.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (meant[i - 1] === heard[j - 1] ? 0 : 1));
    }
  }
  return meant.length ? d[meant.length][heard.length] / meant.length : 0;
}
