import { describe, expect, it } from 'vitest';
import { answerMarkdown, canonicalResponse } from './answers.ts';

describe('answerMarkdown', () => {
  const num = (value: number) => ({ kind: 'numeric' as const, value });
  it('shows a measured amount as a mixed number with its unit', () => {
    expect(answerMarkdown(num(17 / 3), { suffix: 'cups' })).toBe('$5\\tfrac{2}{3}$ cups');
    expect(answerMarkdown(num(35 / 16), { suffix: 'in' })).toBe('$2\\tfrac{3}{16}$ in');
    expect(answerMarkdown(num(3 / 4), { suffix: 'cup' })).toBe('$\\frac{3}{4}$ cup');
  });
  it('keeps improper fractions for plain numbers and writes long terminating fractions as decimals', () => {
    expect(answerMarkdown(num(7 / 2))).toBe('$\\frac{7}{2}$');
    expect(answerMarkdown(num(621 / 50))).toBe('$12.42$');
    expect(answerMarkdown(num(-2 / 3))).toBe('$-\\frac{2}{3}$');
  });
  it('writes metric amounts, percents and times as decimals', () => {
    expect(answerMarkdown(num(8.4), { suffix: 'cm' })).toBe('$8.4$ cm');
    expect(answerMarkdown(num(3.5), { suffix: 'cm' })).toBe('$3.5$ cm');
    expect(answerMarkdown(num(55.7), { suffix: '%' })).toBe('$55.7$ %');
    expect(answerMarkdown(num(1.5), { suffix: 'h' })).toBe('$1.5$ h');
    expect(answerMarkdown(num(75.25), { suffix: 'ft²' })).toBe('$75.25$ ft²');
    expect(answerMarkdown(num(18.6), { suffix: 'ft' })).toBe('$18.6$ ft');
    expect(canonicalResponse(num(8.4), { suffix: 'cm' })).toBe('8.4');
    expect(canonicalResponse(num(8.4))).toBe('42/5');
  });
  it('follows the display a generator asks for', () => {
    expect(answerMarkdown({ ...num(1.2), display: 'fraction' }, { suffix: 'km' })).toBe('$1\\tfrac{1}{5}$ km');
    expect(answerMarkdown({ ...num(0.6), display: 'decimal' })).toBe('$0.6$');
    expect(answerMarkdown({ ...num(1 / 3), display: 'decimal' })).toBe('$\\frac{1}{3}$');
  });
});
