/** Geometry helpers for coordinate-plane figures and the interactive graph input. */
import type { GridSpec, Line } from '@engine/types.ts';

export interface PlaneGeom {
  W: number;
  H: number;
  padL: number;
  padR: number;
  padT: number;
  padB: number;
  grid: GridSpec;
  xStep: number;
  yStep: number;
  toX: (x: number) => number;
  toY: (y: number) => number;
  fromX: (px: number) => number;
  fromY: (py: number) => number;
  xTicks: number[];
  yTicks: number[];
  xLabelEvery: number;
  yLabelEvery: number;
  axisX: number; // data y where the x-axis is drawn
  axisY: number; // data x where the y-axis is drawn
}

function ticks(min: number, max: number, step: number): number[] {
  const out: number[] = [];
  const start = Math.ceil(min / step - 1e-9) * step;
  for (let v = start; v <= max + 1e-9; v += step) out.push(Math.round(v * 1e6) / 1e6);
  return out;
}

export function planeGeom(grid: GridSpec, width = 380): PlaneGeom {
  const xStep = grid.xStep ?? grid.step ?? 1;
  const yStep = grid.yStep ?? grid.step ?? 1;
  const xr = grid.xMax - grid.xMin;
  const yr = grid.yMax - grid.yMin;
  const hasXLabel = !!grid.xLabel;
  const hasYLabel = !!grid.yLabel;
  const padL = hasYLabel ? 52 : 26;
  const padR = 14;
  const padT = 14;
  const padB = hasXLabel ? 44 : 26;
  const plotW = width - padL - padR;
  // Square cells when both axes use the same scale; otherwise a pleasant aspect ratio.
  const square = xStep === yStep && xr / xStep <= 24 && yr / yStep <= 24;
  const plotH = square ? (plotW * yr) / xr : Math.min(plotW * 0.72, 300);
  const H = plotH + padT + padB;
  const toX = (x: number) => padL + ((x - grid.xMin) / xr) * plotW;
  const toY = (y: number) => padT + ((grid.yMax - y) / yr) * plotH;
  const fromX = (px: number) => grid.xMin + ((px - padL) / plotW) * xr;
  const fromY = (py: number) => grid.yMax - ((py - padT) / plotH) * yr;
  const xTicks = ticks(grid.xMin, grid.xMax, xStep);
  const yTicks = ticks(grid.yMin, grid.yMax, yStep);
  const xLabelEvery = Math.max(1, Math.ceil(xTicks.length / 12));
  const yLabelEvery = Math.max(1, Math.ceil(yTicks.length / 12));
  const axisX = grid.yMin <= 0 && grid.yMax >= 0 ? 0 : grid.yMin;
  const axisY = grid.xMin <= 0 && grid.xMax >= 0 ? 0 : grid.xMin;
  return { W: width, H, padL, padR, padT, padB, grid, xStep, yStep, toX, toY, fromX, fromY, xTicks, yTicks, xLabelEvery, yLabelEvery, axisX, axisY };
}

/** Clip the infinite line Ax + By + C = 0 to the grid box; returns two data-space points or null. */
export function clipLine(l: Line, g: GridSpec): [[number, number], [number, number]] | null {
  const pts: Array<[number, number]> = [];
  const { xMin, xMax, yMin, yMax } = g;
  if (Math.abs(l.B) > 1e-12) {
    for (const x of [xMin, xMax]) {
      const y = (-l.C - l.A * x) / l.B;
      if (y >= yMin - 1e-9 && y <= yMax + 1e-9) pts.push([x, y]);
    }
  }
  if (Math.abs(l.A) > 1e-12) {
    for (const y of [yMin, yMax]) {
      const x = (-l.C - l.B * y) / l.A;
      if (x >= xMin - 1e-9 && x <= xMax + 1e-9) pts.push([x, y]);
    }
  }
  const uniq: Array<[number, number]> = [];
  for (const p of pts) if (!uniq.some((q) => Math.abs(q[0] - p[0]) < 1e-9 && Math.abs(q[1] - p[1]) < 1e-9)) uniq.push(p);
  if (uniq.length < 2) return null;
  uniq.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return [uniq[0], uniq[uniq.length - 1]];
}

export function lineThroughPoints(p: [number, number], q: [number, number]): Line {
  return { A: q[1] - p[1], B: -(q[0] - p[0]), C: (q[0] - p[0]) * p[1] - (q[1] - p[1]) * p[0] };
}

export const COLOR = {
  brand: 'rgb(var(--series-1))',
  accent: 'rgb(var(--accent))',
  muted: 'rgb(var(--ink-3))',
};
