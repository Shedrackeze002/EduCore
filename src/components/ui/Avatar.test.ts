import { describe, expect, it } from 'vitest';
import { readableBackground } from './Avatar.tsx';

const contrastWithWhite = (rgb: string) => {
  const [r, g, b] = rgb.match(/\d+/g)!.map(Number);
  const f = (v: number) => ((v /= 255) <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 1.05 / (0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b) + 0.05);
};

describe('avatar colours', () => {
  it('darkens light colours until white initials are readable', () => {
    for (const c of ['#d68a00', '#0c8c4a', '#2a78d6', '#fde047', '#ffffff']) expect(contrastWithWhite(readableBackground(c))).toBeGreaterThanOrEqual(4.5);
  });
  it('leaves colours that are already dark enough unchanged', () => {
    expect(readableBackground('#6a43e3')).toBe('rgb(106 67 227)');
    expect(readableBackground('not-a-colour')).toBe('not-a-colour');
  });
});
