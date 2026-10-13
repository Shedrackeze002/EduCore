/** When EduCore's video player stops to ask a question. */
import type { Cue } from './timeline.ts';

/** Longer than this between two checks of the playing time means the viewer jumped (seeked). */
const MAX_STEP = 2;

/**
 * The question the video has just reached, if any: a cue between the previous check and now,
 * during normal playback (not a jump), that has not been asked yet.
 */
export function crossedCue(prev: number, now: number, cues: Cue[], asked: ReadonlySet<string>): Cue | null {
  if (!(now > prev) || now - prev > MAX_STEP) return null;
  return cues.find((c) => c.t > prev && c.t <= now && !asked.has(c.id)) ?? null;
}

/** Whether a choice or typed answer is right. */
export function isRight(cue: Cue, answer: number | string): boolean {
  if (typeof cue.answer === 'number') return answer === cue.answer;
  const norm = (s: string) => s.toLowerCase().replace(/[\s$*\\{}]/g, '');
  return typeof answer === 'string' && norm(answer) === norm(cue.answer);
}
