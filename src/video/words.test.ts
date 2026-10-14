import { describe, expect, it } from 'vitest';
import { normalise, speechText, wer } from './words.ts';

describe('normalise', () => {
  it('reads numbers in words and digits the same way', () => {
    expect(normalise('Theta is thirty-two degrees, and the side is fifteen centimetres.')).toEqual(normalise('Theta is 32 degrees, and the side is 15 centimeters.'));
    expect(normalise('about nine point four cm')).toEqual(['about', '9.4', 'centimetres']);
    expect(normalise('It is 1,200 metres.')).toEqual(['it', 'is', '1200', 'metres']);
    expect(normalise('one hundred')).toEqual(['100']);
    expect(normalise('three quarters, or five twelfths')).toEqual(normalise('3/4, or 5/12'));
    expect(normalise('eight over six')).toEqual(normalise('8/6'));
  });

  it('allows for homophones and spelled-out side names', () => {
    expect(normalise('the sine ratio')).toEqual(normalise('the sign ratio'));
    expect(normalise('In triangle A B C, A C is eight.')).toEqual(normalise('In triangle ABC, AC is 8.'));
    expect(normalise('multiply by x, then')).toEqual(['multiply', 'by', 'x', 'then']);
    expect(normalise('x one equals sixty, and d two')).toEqual(normalise('X1 equals 60, and d2'));
    expect(normalise('Remember SOH CAH TOA. SOH: sine.')).toEqual(normalise('Remember so-katoa. So, sign.'));
  });
});

describe('speechText', () => {
  it('says a lone capital A as the letter, unless it is the article starting a sentence', () => {
    expect(speechText('So tan A equals six over eight, and angle A is acute.')).toBe('So tan Eh equals six over eight, and angle Eh is acute.');
    expect(speechText('In triangle A B C, A C is eight.')).toBe('In triangle Eh B C, Eh C is eight.');
    expect(speechText('A ramp rises. A six metre ladder. A C is eight.')).toBe('A ramp rises. A six metre ladder. Eh C is eight.');
    expect(speechText('The answer is A.')).toBe('The answer is Eh.');
    expect(speechText('A cat and a dog, Ann and AB.')).toBe('A cat and a dog, Ann and AB.');
  });

  it('says SOH CAH TOA as words, not letters', () => {
    expect(speechText('Remember them with SOH CAH TOA.')).toBe('Remember them with soh-cah-toa.');
    expect(speechText('SOH: sine. CAH: cosine. TOA: tangent.')).toBe('Soh: sine. Cah: cosine. Toa: tangent.');
  });

  it('respells words the voice says wrongly, and splits sizes written with hyphens', () => {
    expect(speechText('Paid biweekly, Mei gets 26 cheques. Biweekly pay.')).toBe('Paid bi-weekly, Mei gets 26 cheques. Bi-weekly pay.');
    expect(speechText('Deci means one tenth, and decimal is a word.')).toBe('Dessy means one tenth, and decimal is a word.');
    expect(speechText('An eight-by-twelve print and a two-by-four.')).toBe('An eight by twelve print and a two by four.');
  });
});

describe('wer', () => {
  it('counts word edits against the length of what was meant', () => {
    expect(wer(['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd'])).toBe(0);
    expect(wer(['a', 'b', 'c', 'd'], ['a', 'x', 'c'])).toBe(0.5);
    expect(wer([], ['a'])).toBe(0);
  });
});
