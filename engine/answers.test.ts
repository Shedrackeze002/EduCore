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
  it('writes point coordinates as short decimals or exact fractions', () => {
    expect(answerMarkdown({ kind: 'point', x: 3, y: 5 / 11 })).toBe('$(3,\\ \\frac{5}{11})$');
    expect(answerMarkdown({ kind: 'point', x: -2.5, y: 0.25 })).toBe('$(-2.5,\\ 0.25)$');
    expect(canonicalResponse({ kind: 'point', x: -1 / 3, y: 4 })).toBe('(-1/3, 4)');
  });
  it('shows exact forms for multiples of pi and radicals', () => {
    expect(answerMarkdown({ kind: 'numeric', value: (5 * Math.PI) / 6 })).toBe('$\\frac{5\\pi}{6}$');
    expect(answerMarkdown({ kind: 'numeric', value: Math.sqrt(3) / 2 })).toBe('$\\frac{\\sqrt{3}}{2}$');
    expect(canonicalResponse({ kind: 'numeric', value: (-2 * Math.sqrt(3)) / 3 })).toBe('-2sqrt(3)/3');
    expect(canonicalResponse({ kind: 'numeric', value: 0.9659258262890683, exact: '(sqrt(6) + sqrt(2))/4' })).toBe('(sqrt(6) + sqrt(2))/4');
    expect(answerMarkdown({ kind: 'numbers', values: [Math.PI / 6, (5 * Math.PI) / 6] })).toBe('$\\frac{\\pi}{6}$ and $\\frac{5\\pi}{6}$');
  });
  it('follows the display a generator asks for', () => {
    expect(answerMarkdown({ ...num(1.2), display: 'fraction' }, { suffix: 'km' })).toBe('$1\\tfrac{1}{5}$ km');
    expect(answerMarkdown({ ...num(0.6), display: 'decimal' })).toBe('$0.6$');
    expect(answerMarkdown({ ...num(1 / 3), display: 'decimal' })).toBe('$\\frac{1}{3}$');
  });
});
