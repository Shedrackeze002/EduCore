import type { ReactNode } from 'react';
import type { PlaneFigure as PlaneSpec, PlaneLine, PlaneSegment } from '@engine/types.ts';
import { texToText } from '@/lib/texText.ts';
import { clipLine, COLOR, lineThroughPoints, planeGeom, type PlaneGeom } from './plane.ts';

function fmtTick(v: number): string {
  const s = Math.abs(v) >= 1000 ? `${Math.round(v)}` : `${Math.round(v * 100) / 100}`;
  return s.replace('-', '−');
}

/** A plane with no interior grid lines is a drawing canvas (angles, shapes), not a graph: no axes or frame. */
function isDrawing(g: PlaneGeom, hideTickLabels?: boolean): boolean {
  return !!hideTickLabels && g.xTicks.length <= 2 && g.yTicks.length <= 2;
}

/** Grid, axes and tick labels. Shared by figures and the interactive graph input. */
export function PlaneGrid({ g, hideTickLabels, hideAxes }: { g: PlaneGeom; hideTickLabels?: boolean; hideAxes?: boolean }) {
  const { grid, toX, toY } = g;
  const x0 = toX(grid.xMin);
  const x1 = toX(grid.xMax);
  const y0 = toY(grid.yMax);
  const y1 = toY(grid.yMin);
  const ax = toY(g.axisX);
  const ay = toX(g.axisY);
  const canvas = isDrawing(g, hideTickLabels);
  const axes = !hideAxes && !canvas;
  return (
    <g>
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="rgb(var(--surface))" />
      {!canvas && g.xTicks.map((t) => (
        <line key={`gx${t}`} x1={toX(t)} x2={toX(t)} y1={y0} y2={y1} stroke="rgb(var(--line))" strokeWidth={1} />
      ))}
      {!canvas && g.yTicks.map((t) => (
        <line key={`gy${t}`} y1={toY(t)} y2={toY(t)} x1={x0} x2={x1} stroke="rgb(var(--line))" strokeWidth={1} />
      ))}
      {axes && <line x1={x0} x2={x1} y1={ax} y2={ax} stroke="rgb(var(--ink-3))" strokeWidth={1.4} />}
      {axes && <line y1={y0} y2={y1} x1={ay} x2={ay} stroke="rgb(var(--ink-3))" strokeWidth={1.4} />}
      {!hideTickLabels &&
        g.xTicks.map((t, i) =>
          t === g.axisY && g.axisY === 0 && g.axisX === 0 && grid.yMin < 0 ? null : i % g.xLabelEvery === 0 ? (
            <text key={`tx${t}`} x={toX(t)} y={Math.min(ax + 14, y1 + 14)} fontSize={10.5} textAnchor="middle" className="fig-muted">
              {fmtTick(t)}
            </text>
          ) : null,
        )}
      {!hideTickLabels &&
        g.yTicks.map((t, i) =>
          t === g.axisX && g.axisX === 0 && grid.xMin < 0 ? null : i % g.yLabelEvery === 0 ? (
            <text key={`ty${t}`} x={Math.max(ay - 6, x0 - 6)} y={toY(t) + 3.5} fontSize={10.5} textAnchor="end" className="fig-muted">
              {fmtTick(t)}
            </text>
          ) : null,
        )}
      {grid.xLabel && (
        <text x={(x0 + x1) / 2} y={y1 + 34} fontSize={12} textAnchor="middle" fontWeight={500}>
          {grid.xLabel}
        </text>
      )}
      {grid.yLabel && (
        <text x={14} y={(y0 + y1) / 2} fontSize={12} textAnchor="middle" fontWeight={500} transform={`rotate(-90 14 ${(y0 + y1) / 2})`}>
          {grid.yLabel}
        </text>
      )}
    </g>
  );
}

function Arrowhead({ x, y, angle, color }: { x: number; y: number; angle: number; color: string }) {
  const s = 8;
  const a1 = angle + Math.PI * 0.85;
  const a2 = angle - Math.PI * 0.85;
  return <path d={`M${x},${y} L${x + s * Math.cos(a1)},${y + s * Math.sin(a1)} L${x + s * Math.cos(a2)},${y + s * Math.sin(a2)} Z`} fill={color} />;
}

function LineMark({ l, g, idx }: { l: PlaneLine; g: PlaneGeom; idx: number }) {
  const line = l.line ?? (l.through ? lineThroughPoints(l.through[0], l.through[1]) : null);
  if (!line) return null;
  const seg = clipLine(line, g.grid);
  if (!seg) return null;
  const color = COLOR[l.color ?? 'brand'];
  const [p, q] = seg;
  const lx = g.toX(q[0]);
  const ly = g.toY(q[1]);
  return (
    <g>
      <line x1={g.toX(p[0])} y1={g.toY(p[1])} x2={lx} y2={ly} stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeDasharray={l.dashed ? '7 6' : undefined} />
      {l.label && (
        <text x={Math.min(lx, g.W - g.padR - 4)} y={Math.max(g.padT + 12, Math.min(ly + (idx % 2 ? 16 : -8), g.H - g.padB - 6))} fontSize={12} textAnchor="end" fontWeight={600} style={{ fill: color }}>
          {texToText(l.label)}
        </text>
      )}
    </g>
  );
}

function SegmentMark({ s, g }: { s: PlaneSegment; g: PlaneGeom }) {
  const color = COLOR[s.color ?? 'brand'];
  const x1 = g.toX(s.from[0]);
  const y1 = g.toY(s.from[1]);
  const x2 = g.toX(s.to[0]);
  const y2 = g.toY(s.to[1]);
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const dot = (x: number, y: number, open: boolean) => <circle cx={x} cy={y} r={4.5} fill={open ? 'rgb(var(--surface))' : color} stroke={color} strokeWidth={2} />;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.4} strokeDasharray={s.dashed ? '6 5' : undefined} strokeLinecap="round" />
      {s.arrowEnd && <Arrowhead x={x2} y={y2} angle={ang} color={color} />}
      {s.arrowStart && <Arrowhead x={x1} y={y1} angle={ang + Math.PI} color={color} />}
      {s.closedStart && dot(x1, y1, false)}
      {s.openStart && dot(x1, y1, true)}
      {s.closedEnd && dot(x2, y2, false)}
      {s.openEnd && dot(x2, y2, true)}
    </g>
  );
}

export function PlaneFigure({ fig, children, width = 380 }: { fig: PlaneSpec; children?: ReactNode; width?: number }) {
  const g = planeGeom(fig.grid, width);
  const poly = fig.polylines ?? [];
  const drawing = !!fig.hideAxes || isDrawing(g, fig.hideTickLabels);
  return (
    <svg viewBox={`0 0 ${g.W} ${g.H}`} className="figure-svg h-auto w-full" role="img" aria-label={fig.caption ?? (drawing ? 'Diagram' : 'Coordinate graph')}>
      <PlaneGrid g={g} hideTickLabels={fig.hideTickLabels} hideAxes={fig.hideAxes} />
      {poly.map((pl, i) => (
        <polyline
          key={`pl${i}`}
          points={pl.points.map(([x, y]) => `${g.toX(x)},${g.toY(y)}`).join(' ')}
          fill="none"
          stroke={COLOR[pl.color ?? 'brand']}
          strokeWidth={2.4}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
      {fig.segmentLabels &&
        poly[0] &&
        fig.segmentLabels.map((lab, i) => {
          const a = poly[0].points[i];
          const b = poly[0].points[i + 1];
          if (!a || !b) return null;
          const mx = (g.toX(a[0]) + g.toX(b[0])) / 2;
          const my = (g.toY(a[1]) + g.toY(b[1])) / 2;
          return (
            <g key={`sl${i}`}>
              <circle cx={mx} cy={my - 14} r={10} fill="rgb(var(--surface))" stroke="rgb(var(--line-strong))" />
              <text x={mx} y={my - 10} fontSize={11.5} fontWeight={700} textAnchor="middle">
                {lab}
              </text>
            </g>
          );
        })}
      {fig.riseRun && (
        <g>
          <line x1={g.toX(fig.riseRun.from[0])} y1={g.toY(fig.riseRun.from[1])} x2={g.toX(fig.riseRun.to[0])} y2={g.toY(fig.riseRun.from[1])} stroke={COLOR.accent} strokeWidth={2} strokeDasharray="5 4" />
          <line x1={g.toX(fig.riseRun.to[0])} y1={g.toY(fig.riseRun.from[1])} x2={g.toX(fig.riseRun.to[0])} y2={g.toY(fig.riseRun.to[1])} stroke={COLOR.accent} strokeWidth={2} strokeDasharray="5 4" />
          <text x={(g.toX(fig.riseRun.from[0]) + g.toX(fig.riseRun.to[0])) / 2} y={g.toY(fig.riseRun.from[1]) + (fig.riseRun.to[1] > fig.riseRun.from[1] ? 16 : -8)} fontSize={11.5} textAnchor="middle" style={{ fill: 'rgb(var(--accent))' }} fontWeight={600}>
            run {fig.riseRun.to[0] - fig.riseRun.from[0]}
          </text>
          <text x={g.toX(fig.riseRun.to[0]) + 6} y={(g.toY(fig.riseRun.from[1]) + g.toY(fig.riseRun.to[1])) / 2 + 4} fontSize={11.5} style={{ fill: 'rgb(var(--accent))' }} fontWeight={600}>
            rise {fig.riseRun.to[1] - fig.riseRun.from[1]}
          </text>
        </g>
      )}
      {(fig.lines ?? []).map((l, i) => (
        <LineMark key={`l${i}`} l={l} g={g} idx={i} />
      ))}
      {(fig.segments ?? []).map((s, i) => (
        <SegmentMark key={`s${i}`} s={s} g={g} />
      ))}
      {(fig.points ?? []).map((p, i) => {
        const color = COLOR[p.color ?? 'brand'];
        const x = g.toX(p.x);
        const y = g.toY(p.y);
        return (
          <g key={`p${i}`}>
            <circle cx={x} cy={y} r={p.color === 'muted' ? 4 : 5} fill={p.open ? 'rgb(var(--surface))' : color} stroke={p.color === 'muted' ? 'rgb(var(--surface))' : color} strokeWidth={p.color === 'muted' ? 1.5 : 2} />
            {p.label && (
              <text x={x + 8} y={y - 8} fontSize={12} fontWeight={600} stroke="rgb(var(--surface))" strokeWidth={3} paintOrder="stroke">
                {texToText(p.label)}
              </text>
            )}
          </g>
        );
      })}
      {children}
    </svg>
  );
}
