import { describe, expect, it } from 'vitest';
import { hasInk, hitStroke, inkCommit, inkDoc, inkRedo, inkUndo, parsePages, pointerPressure, StrokeBuilder, widthAt, type Stroke } from './ink.ts';

const line = (x1: number, y1: number, x2: number, y2: number): Stroke => ({ tool: 'pen', color: 'ink', size: 6, points: [x1, y1, 0.5, x2, y2, 0.5] });

describe('ink', () => {
  it('records points, skipping ones too close together and smoothing pressure', () => {
    const b = new StrokeBuilder('pen', 'blue', 6);
    expect(b.add(10, 10, 0.2)).toBe(true);
    expect(b.add(10.3, 10.2, 0.9)).toBe(false);
    expect(b.add(20, 10, 1)).toBe(true);
    const p = b.stroke.points;
    expect(p).toHaveLength(6);
    expect(p[2]).toBe(0.2);
    // 0.2 * 0.6 + 1 * 0.4: a sudden press does not jump straight to full width.
    expect(p[5]).toBeCloseTo(0.52, 5);
  });

  it('uses real pressure only for a pen', () => {
    expect(pointerPressure('pen', 0.8)).toBe(0.8);
    expect(pointerPressure('pen', 0)).toBe(0.5);
    expect(pointerPressure('mouse', 1)).toBe(0.5);
    expect(pointerPressure('touch', 0.1)).toBe(0.5);
  });

  it('draws firmer pen strokes wider, and highlighters wide and even', () => {
    const pen = { tool: 'pen' as const, size: 6 };
    expect(widthAt(pen, 1)).toBeGreaterThan(widthAt(pen, 0.5));
    expect(widthAt(pen, 0.5)).toBeGreaterThan(widthAt(pen, 0.1));
    expect(widthAt({ tool: 'highlighter', size: 6 }, 0.1)).toBe(widthAt({ tool: 'highlighter', size: 6 }, 1));
  });

  it('erases a stroke only when the eraser touches it', () => {
    const s = line(0, 0, 100, 0);
    expect(hitStroke(s, 50, 5, 4)).toBe(true);
    expect(hitStroke(s, 50, 30, 4)).toBe(false);
    expect(hitStroke(s, 120, 0, 4)).toBe(false);
    expect(hitStroke({ ...s, points: [5, 5, 0.5] }, 7, 7, 2)).toBe(true);
  });

  it('undoes and redoes, and a new stroke clears the redo history', () => {
    const a = line(0, 0, 10, 10);
    const b = line(0, 10, 10, 0);
    let d = inkCommit(inkCommit(inkDoc(), [a]), [a, b]);
    d = inkUndo(d);
    expect(d.strokes).toEqual([a]);
    d = inkRedo(d);
    expect(d.strokes).toEqual([a, b]);
    d = inkCommit(inkUndo(d), []);
    expect(d.future).toHaveLength(0);
    expect(inkUndo(inkUndo(inkUndo(d))).strokes).toEqual([]);
  });

  it('keeps only well-formed strokes from saved data', () => {
    const pages = parsePages([
      { background: 'grid', strokes: [line(0, 0, 1, 1), { tool: 'laser', color: 'gold', size: 999, points: [1, 2, 0.5] }, { points: [1, 2] }, { points: [1, 'x', 3] }, null] },
      { background: 'wallpaper' },
      'nonsense',
    ]);
    expect(pages).toHaveLength(2);
    expect(pages[0].background).toBe('grid');
    expect(pages[0].strokes).toHaveLength(2);
    expect(pages[0].strokes[1]).toEqual({ tool: 'pen', color: 'ink', size: 6, points: [1, 2, 0.5] });
    expect(pages[1]).toEqual({ background: 'plain', strokes: [] });
    expect(parsePages({ pages: [] })).toEqual([]);
    expect(hasInk(pages)).toBe(true);
    expect(hasInk([pages[1]])).toBe(false);
  });
});
