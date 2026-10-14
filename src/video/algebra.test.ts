import { describe, expect, it } from 'vitest';
import { areaModel, X } from './algebra.ts';
import { itemPoints } from './script.ts';

const table = areaModel({ top: ['x', '-6'], side: ['x', '-6'], cells: [['x^2', '-6x'], ['-6x', '36']] });
const tiles = areaModel({ name: 't', top: ['x', '2'], side: ['x', '3'], cells: [['x^2', '2x'], ['3x', '6']], tiles: true });
const item = (part: typeof table, id: string) => part.items.find((i) => i.id === id);

describe('area model', () => {
  it.each([
    ['as a table', table],
    ['as algebra tiles', tiles],
  ])('uses only its own points and unique ids %s', (_, part) => {
    const ids = part.items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const i of part.items) for (const p of itemPoints(i)) expect(part.points).toHaveProperty([p]);
  });

  it('colours each cell by its product', () => {
    expect(item(table, 'fill0-0')).toMatchObject({ tone: 'adj' });
    expect(item(table, 'fill0-1')).toMatchObject({ tone: 'bad' });
    expect(item(table, 'fill1-1')).toMatchObject({ tone: 'opp' });
    expect(item(tiles, 't-fill1-0')).toMatchObject({ tone: 'good' });
  });

  it('draws algebra tiles to scale, one tile per unit', () => {
    // x is X long and 2 is two units, so the rectangle is X + 2 wide and X + 3 tall.
    expect(tiles.points['t-C']).toEqual([X + 2, -(X + 3)]);
    // The 3 by 2 cell holds six unit tiles: one line down between its columns, two across between its rows.
    expect(tiles.items.filter((i) => i.group === 't-c1-1' && i.kind === 'line')).toHaveLength(3);
    // The x by x cell is a single tile.
    expect(tiles.items.filter((i) => i.group === 't-c0-0' && i.kind === 'line')).toHaveLength(0);
  });

  it('labels the factors along the top and down the side', () => {
    expect(item(table, 'top1')).toMatchObject({ tex: '-6', group: 'top' });
    expect(item(table, 'side0')).toMatchObject({ tex: 'x', group: 'side', place: 'left' });
  });
});
