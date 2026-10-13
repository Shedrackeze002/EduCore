import { describe, expect, it } from 'vitest';
import { crossedCue, isRight } from './cues.ts';
import type { Cue } from './timeline.ts';

const cues: Cue[] = [
  { id: 'v:q1', t: 30, prompt: 'Q1', choices: ['a', 'b'], answer: 1 },
  { id: 'v:q2', t: 90, prompt: 'Q2', answer: '$x = 4$' },
];

describe('crossedCue', () => {
  it('stops at a question reached in normal playback, once', () => {
    expect(crossedCue(29.8, 30.05, cues, new Set())?.id).toBe('v:q1');
    expect(crossedCue(29.8, 30.05, cues, new Set(['v:q1']))).toBeNull();
    expect(crossedCue(30.05, 30.3, cues, new Set())).toBeNull();
    expect(crossedCue(89.9, 90, cues, new Set())?.id).toBe('v:q2');
  });

  it('does not stop when the viewer jumps past a question or goes back', () => {
    expect(crossedCue(10, 60, cues, new Set())).toBeNull();
    expect(crossedCue(31, 29, cues, new Set())).toBeNull();
  });
});

describe('isRight', () => {
  it('checks choices and typed answers', () => {
    expect(isRight(cues[0], 1)).toBe(true);
    expect(isRight(cues[0], 0)).toBe(false);
    expect(isRight(cues[1], 'x=4')).toBe(true);
    expect(isRight(cues[1], 'x = 5')).toBe(false);
  });
});
