import { describe, expect, it } from 'vitest';
import { fmt, fmtFixed } from './numbers.ts';

describe('number formatting', () => {
  it('trims trailing zeros after the decimal point only', () => {
    expect(fmt(2.5, 2)).toBe('2.5');
    expect(fmt(100, 2)).toBe('100');
    expect(fmt(90, 0)).toBe('90');
    expect(fmt(1500, 0)).toBe('1500');
    expect(fmt(-0.0001, 2)).toBe('0');
    expect(fmtFixed(2.5, 2)).toBe('2.50');
  });
});
