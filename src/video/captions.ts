/**
 * Captions from the narration: each line is split into captions of at most two short lines, timed
 * in proportion to their length, and written as WebVTT (for the web) and SRT (for YouTube).
 */
import type { TimedLine } from './timeline.ts';

export interface Caption {
  start: number;
  end: number;
  text: string;
}

const MAX_LINE = 42;

/** Splits text into chunks of at most `max` characters at word boundaries, preferring sentence breaks. */
export function chunk(text: string, max = MAX_LINE * 2): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const out: string[] = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    // Start a new caption after a sentence ends once this one is reasonably long.
    if (next.length > max || (cur.length > max * 0.55 && /[.!?;:]$/.test(cur))) {
      if (cur) out.push(cur);
      cur = w;
    } else cur = next;
  }
  if (cur) out.push(cur);
  return out;
}

/** Breaks a caption into two balanced lines when it is too long for one. */
export function wrap(text: string): string {
  if (text.length <= MAX_LINE) return text;
  const words = text.split(' ');
  let best = text;
  let score = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' ');
    const b = words.slice(i).join(' ');
    const s = Math.max(a.length, b.length);
    if (s < score) {
      score = s;
      best = `${a}\n${b}`;
    }
  }
  return best;
}

export function captions(lines: TimedLine[]): Caption[] {
  const out: Caption[] = [];
  for (const l of lines) {
    const parts = chunk(l.caption);
    const total = parts.reduce((n, p) => n + p.length, 0) || 1;
    let t = l.start;
    for (const p of parts) {
      const d = ((l.end - l.start) * p.length) / total;
      out.push({ start: t, end: t + d, text: wrap(p) });
      t += d;
    }
  }
  return out;
}

const stamp = (t: number, sep: '.' | ',') => {
  const ms = Math.round(t * 1000);
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor(ms / 60_000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  const pad = (n: number, w = 2) => String(n).padStart(w, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}${sep}${pad(ms % 1000, 3)}`;
};

export function toVtt(cs: Caption[]): string {
  return `WEBVTT\n\n${cs.map((c, i) => `${i + 1}\n${stamp(c.start, '.')} --> ${stamp(c.end, '.')}\n${c.text}\n`).join('\n')}`;
}

export function toSrt(cs: Caption[]): string {
  return cs.map((c, i) => `${i + 1}\n${stamp(c.start, ',')} --> ${stamp(c.end, ',')}\n${c.text}\n`).join('\n');
}
