import { describe, expect, it } from 'vitest';
import { normalise, wer } from './words.ts';

describe('normalise', () => {
  it('reads numbers in words and digits the same way', () => {
    expect(normalise('Theta is thirty-two degrees, and the side is fifteen centimetres.')).toEqual(normalise('Theta is 32 degrees, and the side is 15 centimeters.'));
    expect(normalise('about nine point four cm')).toEqual(['about', '9.4', 'centimetres']);
    expect(normalise('It is 1,200 metres.')).toEqual(['it', 'is', '1200', 'metres']);
    expect(normalise('one hundred')).toEqual(['100']);
  });

  it('allows for homophones and spelled-out side names', () => {
    expect(normalise('the sine ratio')).toEqual(normalise('the sign ratio'));
    expect(normalise('In triangle A B C, A C is eight.')).toEqual(normalise('In triangle ABC, AC is 8.'));
    expect(normalise('multiply by x, then')).toEqual(['multiply', 'by', 'x', 'then']);
  });
});

describe('wer', () => {
  it('counts word edits against the length of what was meant', () => {
    expect(wer(['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd'])).toBe(0);
    expect(wer(['a', 'b', 'c', 'd'], ['a', 'x', 'c'])).toBe(0.5);
    expect(wer([], ['a'])).toBe(0);
  });
});
