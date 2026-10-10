/** Interactive coordinate grid: tap to place points, drag to move them. */
import { useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import type { GridSpec } from '@engine/types.ts';
import { parseGraphResponse } from '@engine/grade.ts';
import { PlaneGrid } from '@/components/figures/PlaneFigure.tsx';
import { clipLine, lineThroughPoints, planeGeom } from '@/components/figures/plane.ts';
import { cn } from '@/lib/cn.ts';

type Pt = [number, number];

export function GraphInput({
  grid,
  mode,
  maxPoints,
  value,
  onChange,
  disabled,
  status,
  solutionLine,
}: {
  grid: GridSpec;
  mode: 'line' | 'points';
  maxPoints?: number;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  status?: 'correct' | 'incorrect' | null;
  /** When reviewing, draw the correct line for comparison. */
  solutionLine?: { A: number; B: number; C: number } | null;
}) {
  const g = planeGeom(grid, 380);
  const svgRef = useRef<SVGSVGElement>(null);
  const [drag, setDrag] = useState<number | null>(null);
  const points: Pt[] = parseGraphResponse(value) ?? [];
  const limit = mode === 'line' ? 2 : maxPoints ?? 10;
  const step = grid.step ?? 1;

  const toData = (e: React.PointerEvent): Pt | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const m = svg.getScreenCTM();
    if (!m) return null;
    const p = pt.matrixTransform(m.inverse());
    const x = Math.round(g.fromX(p.x) / step) * step;
    const y = Math.round(g.fromY(p.y) / step) * step;
    if (x < grid.xMin || x > grid.xMax || y < grid.yMin || y > grid.yMax) return null;
    return [x, y];
  };

  const set = (pts: Pt[]) => onChange(JSON.stringify(pts));

  const onDown = (e: React.PointerEvent) => {
    if (disabled) return;
    const p = toData(e);
    if (!p) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    const near = points.findIndex((q) => Math.abs(q[0] - p[0]) <= step * 0.5 && Math.abs(q[1] - p[1]) <= step * 0.5);
    if (near >= 0) {
      if (mode === 'points' && e.detail >= 2) {
        set(points.filter((_, i) => i !== near));
        return;
      }
      setDrag(near);
      return;
    }
    if (points.length < limit) {
      set([...points, p]);
      setDrag(points.length);
    } else {
      // Replace the closest point.
      let best = 0;
      let bd = Infinity;
      points.forEach((q, i) => {
        const d = Math.hypot(q[0] - p[0], q[1] - p[1]);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      const next = points.slice();
      next[best] = p;
      set(next);
      setDrag(best);
    }
  };

  const onMove = (e: React.PointerEvent) => {
    if (drag === null || disabled) return;
    const p = toData(e);
    if (!p) return;
    const q = points[drag];
    if (q && q[0] === p[0] && q[1] === p[1]) return;
    const next = points.slice();
    next[drag] = p;
    set(next);
  };

  const line = mode === 'line' && points.length === 2 && (points[0][0] !== points[1][0] || points[0][1] !== points[1][1]) ? clipLine(lineThroughPoints(points[0], points[1]), grid) : null;
  const sol = solutionLine ? clipLine(solutionLine, grid) : null;
  const color = status === 'correct' ? 'rgb(var(--good))' : status === 'incorrect' ? 'rgb(var(--bad))' : 'rgb(var(--series-1))';

  return (
    <div className={cn('rounded-2xl border bg-surface p-2', status === 'correct' ? 'border-good' : status === 'incorrect' ? 'border-bad' : 'border-line')}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${g.W} ${g.H}`}
        className={cn('figure-svg h-auto w-full touch-none select-none', !disabled && 'cursor-crosshair')}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={() => setDrag(null)}
        onPointerLeave={() => setDrag(null)}
        role="application"
        aria-label={mode === 'line' ? 'Graph: place two points to draw a line' : 'Graph: place points'}
      >
        <PlaneGrid g={g} />
        {sol && <line x1={g.toX(sol[0][0])} y1={g.toY(sol[0][1])} x2={g.toX(sol[1][0])} y2={g.toY(sol[1][1])} stroke="rgb(var(--good))" strokeWidth={2.2} strokeDasharray="6 5" />}
        {line && <line x1={g.toX(line[0][0])} y1={g.toY(line[0][1])} x2={g.toX(line[1][0])} y2={g.toY(line[1][1])} stroke={color} strokeWidth={2.6} />}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={g.toX(p[0])} cy={g.toY(p[1])} r={11} fill={color} opacity={0.15} />
            <circle cx={g.toX(p[0])} cy={g.toY(p[1])} r={6} fill={color} stroke="rgb(var(--surface))" strokeWidth={2} />
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-1 text-xs text-ink-3">
        <span>
          {points.length === 0
            ? mode === 'line'
              ? 'Tap the grid to place two points.'
              : 'Tap the grid to plot points. Double-tap a point to remove it.'
            : points.map((p) => `(${p[0]}, ${p[1]})`).join('  ')}
        </span>
        {!disabled && points.length > 0 && (
          <button type="button" onClick={() => set([])} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 font-medium text-ink-2 hover:bg-surface-2">
            <RotateCcw className="h-3.5 w-3.5" /> Clear
          </button>
        )}
      </div>
    </div>
  );
}
