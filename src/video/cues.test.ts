import { describe, expect, it } from 'vitest';
import { crossedCue, isRight } from './cues.ts';
import type { Cue } from './timeline.ts';

const cues: Cue[] = [
  { id: 'v:q1', t: 30, prompt: 'Q1', choices: ['a', 'b'], answer: 1 },
  { id: 'v:q2', t: 90, prompt: 'Q2', answer: '$x = 4$' },
];

describe('crossedCue', () => {
  it('stops at a question reached by playing, once', () => {
    expect(crossedCue(29.8, 30.05, cues, new Set(), 0.25)?.id).toBe('v:q1');
    expect(crossedCue(29.8, 30.05, cues, new Set(['v:q1']), 0.25)).toBeNull();
    expect(crossedCue(30.05, 30.3, cues, new Set(), 0.25)).toBeNull();
    expect(crossedCue(89.9, 90, cues, new Set(), 0.1)?.id).toBe('v:q2');
  });

  it('allows for the playback rate and for slow checks', () => {
    expect(crossedCue(29.6, 30.1, cues, new Set(), 0.25, 2)?.id).toBe('v:q1');
    // A background tab checks rarely, but the video kept playing.
    expect(crossedCue(20, 35, cues, new Set(), 15)?.id).toBe('v:q1');
  });

  it('does not stop when the viewer jumps past a question, even a little, or goes back', () => {
    expect(crossedCue(10, 60, cues, new Set(), 0.2)).toBeNull();
    expect(crossedCue(29, 31.5, cues, new Set(), 0.2)).toBeNull();
    expect(crossedCue(31, 29, cues, new Set(), 0.2)).toBeNull();
  });
});

describe('isRight', () => {
  it('checks choices and typed answers', () => {
    expect(isRight(cues[0], 1)).toBe(true);
    expect(isRight(cues[0], 0)).toBe(false);
    expect(isRight(cues[1], 'x=4')).toBe(true);
    expect(isRight(cues[1], 'X = 4')).toBe(true);
    expect(isRight(cues[1], 'x = 5')).toBe(false);
  });

  it('keeps operators in typed answers', () => {
    expect(isRight({ id: 'v:q3', t: 1, prompt: 'Q3', answer: '23' }, '2*3')).toBe(false);
  });
});
