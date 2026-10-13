/** When EduCore's video player stops to ask a question. */
import type { Cue } from './timeline.ts';

/**
 * How far (in seconds) the playing time may drift from the clock before a change counts as a jump.
 * Checks are 0.2 s apart and the player's time follows the clock closely, so half a second
 * separates jitter from a seek (YouTube's own seek steps are 5 or 10 seconds).
 */
const DRIFT = 0.5;

/**
 * The question the video has just reached, if any: a cue between the previous check and now that
 * has not been asked yet, reached by playing rather than by jumping. Between two checks
 * `elapsed` seconds apart, playing moves the video's time by about `elapsed × rate`; a change
 * that differs from that by more than half a second is a seek, and a slow check
 * (a busy or background tab) still counts as playing.
 */
export function crossedCue(prev: number, now: number, cues: Cue[], asked: ReadonlySet<string>, elapsed: number, rate = 1): Cue | null {
  if (!(now > prev) || Math.abs(now - prev - elapsed * rate) > DRIFT) return null;
  return cues.find((c) => c.t > prev && c.t <= now && !asked.has(c.id)) ?? null;
}

/** Whether a choice or typed answer is right. Typed answers ignore spacing, case and the $ around maths. */
export function isRight(cue: Cue, answer: number | string): boolean {
  if (typeof cue.answer === 'number') return answer === cue.answer;
  const norm = (s: string) => s.toLowerCase().replace(/\s+/g, '').replace(/\$/g, '');
  return typeof answer === 'string' && norm(answer) === norm(cue.answer);
}
