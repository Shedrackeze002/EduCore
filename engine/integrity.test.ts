import { describe, expect, it } from 'vitest';
import { cleanIntegrity, exitCount, exitsLeft, isLocked, mergeIntegrity, mustSubmit } from './integrity.ts';

const ev = (kind: 'tab' | 'fullscreen' | 'camera', n = 1) => Array.from({ length: n }, (_, i) => ({ at: `2026-10-13T10:0${i}:00Z`, kind }));

describe('exam mode records', () => {
  it('cleans whatever is stored or sent', () => {
    expect(cleanIntegrity(null)).toEqual({ blurCount: 0 });
    expect(cleanIntegrity({ blurCount: 2.7, events: [{ at: 'x', kind: 'tab' }, { at: 1, kind: 'tab' }, { at: 'y', kind: 'hack' }], extraExits: -3, autoSubmitted: 'yes' })).toEqual({ blurCount: 2, events: [{ at: 'x', kind: 'tab' }] });
  });

  it('never loses exits and keeps the teacher’s allowance', () => {
    const stored = { blurCount: 3, events: ev('tab', 3), extraExits: 3 };
    const merged = mergeIntegrity(stored, { blurCount: 1, events: ev('tab', 1), extraExits: 99 });
    expect(merged.blurCount).toBe(3);
    expect(exitCount(merged)).toBe(3);
    expect(merged.extraExits).toBe(3);
    expect(mergeIntegrity(stored, { blurCount: 4, events: [...ev('tab', 3), ...ev('fullscreen')] }).events).toHaveLength(4);
  });

  it('locks or submits at the limit, and an unlock allows more exits', () => {
    const lock = { lockdown: true, maxExits: 2, onMaxExits: 'lock' as const };
    expect(exitsLeft(lock, { blurCount: 0, events: ev('tab') })).toBe(1);
    expect(isLocked(lock, { blurCount: 0, events: [...ev('tab'), ...ev('fullscreen')] })).toBe(true);
    expect(isLocked(lock, { blurCount: 0, events: [...ev('tab'), ...ev('fullscreen')], extraExits: 2 })).toBe(false);
    expect(isLocked(lock, { blurCount: 0, events: ev('camera', 5) })).toBe(false);
    expect(mustSubmit({ ...lock, onMaxExits: 'submit' }, { blurCount: 0, events: ev('tab', 2) })).toBe(true);
    expect(exitsLeft({ lockdown: true, maxExits: null }, { blurCount: 0, events: ev('tab', 9) })).toBeNull();
    expect(isLocked({ lockdown: false, maxExits: 1 }, { blurCount: 0, events: ev('tab', 9) })).toBe(false);
  });
});
