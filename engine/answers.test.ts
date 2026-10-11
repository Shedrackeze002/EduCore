import { describe, expect, it } from 'vitest';
import { answerMarkdown } from './answers.ts';

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
    expect(answerMarkdown(num(1.5), { suffix: 'h' })).toBe('$1\\tfrac{1}{2}$ h');
  });
});
