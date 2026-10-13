import { describe, expect, it } from 'vitest';
import { crossedCues, isRight } from './cues.ts';
import type { Cue } from './timeline.ts';

const cues: Cue[] = [
  { id: 'v:q1', t: 30, prompt: 'Q1', choices: ['a', 'b'], answer: 1 },
  { id: 'v:q2', t: 90, prompt: 'Q2', answer: '$x = 4$' },
];

const ids = (list: Cue[]) => list.map((c) => c.id);

describe('crossedCues', () => {
  it('stops at a question reached by playing, once', () => {
    expect(ids(crossedCues(29.8, 30.05, cues, new Set(), 0.25))).toEqual(['v:q1']);
    expect(crossedCues(29.8, 30.05, cues, new Set(['v:q1']), 0.25)).toEqual([]);
    expect(crossedCues(30.05, 30.3, cues, new Set(), 0.25)).toEqual([]);
    expect(ids(crossedCues(89.9, 90, cues, new Set(), 0.1))).toEqual(['v:q2']);
  });

  it('allows for the playback rate and for slow checks', () => {
    expect(ids(crossedCues(29.6, 30.1, cues, new Set(), 0.25, 2))).toEqual(['v:q1']);
    // A background tab checks rarely, but the video kept playing.
    expect(ids(crossedCues(20, 35, cues, new Set(), 15))).toEqual(['v:q1']);
  });

  it('returns every question a slow check passed, in order, so none is skipped', () => {
    const late: Cue = { id: 'v:q0', t: 25, prompt: 'Q0', answer: '1' };
    expect(ids(crossedCues(20, 95, [...cues, late], new Set(), 75))).toEqual(['v:q0', 'v:q1', 'v:q2']);
    expect(ids(crossedCues(20, 95, [...cues, late], new Set(['v:q1']), 75))).toEqual(['v:q0', 'v:q2']);
  });

  it('does not stop when the viewer jumps past a question, even a little, or goes back', () => {
    expect(crossedCues(10, 60, cues, new Set(), 0.2)).toEqual([]);
    expect(crossedCues(29, 31.5, cues, new Set(), 0.2)).toEqual([]);
    expect(crossedCues(29.6, 30.4, cues, new Set(), 0.0)).toEqual([]);
    expect(crossedCues(29.5, 30.5, cues, new Set(), 0.2)).toEqual([]);
    expect(crossedCues(31, 29, cues, new Set(), 0.2)).toEqual([]);
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
