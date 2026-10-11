/** Single-series column chart of new accounts per week, with hover details and a table view. */
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import type { AdminOverview } from '@/data/types.ts';

function niceMax(n: number): number {
  if (n <= 4) return 4;
  const step = Math.pow(10, Math.floor(Math.log10(n)));
  for (const m of [1, 2, 2.5, 5, 10]) if (m * step >= n) return m * step;
  return 10 * step;
}

export function SignupsChart({ weeks }: { weeks: AdminOverview['signupsByWeek'] }) {
  const [hover, setHover] = useState<number | null>(null);
  const data = weeks.map((w) => ({ ...w, total: w.teachers + w.students, label: format(parseISO(w.week), 'MMM d') }));
  const max = niceMax(Math.max(0, ...data.map((d) => d.total)));
  const peak = data.reduce((best, d, i) => (d.total > data[best].total ? i : best), 0);
  const W = 560;
  const H = 190;
  const padL = 30;
  const padT = 16;
  const padB = 24;
  const plotH = H - padT - padB;
  const bw = (W - padL) / Math.max(1, data.length);
  const y = (v: number) => padT + plotH * (1 - v / max);
  const labelled = new Set([peak, data.length - 1]);
  const h = hover !== null ? data[hover] : null;

  return (
    <div>
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="figure-svg h-auto w-full"
          role="img"
          aria-label={`New accounts per week for the last ${data.length} weeks: ${data.map((d) => `${d.label} ${d.total}`).join(', ')}`}
          onMouseLeave={() => setHover(null)}
        >
          {[0, max / 2, max].map((t) => (
            <g key={t}>
              <line x1={padL} x2={W} y1={y(t)} y2={y(t)} stroke="rgb(var(--line))" />
              <text x={padL - 6} y={y(t) + 3.5} fontSize={10} textAnchor="end" className="fig-muted">
                {t}
              </text>
            </g>
          ))}
          {data.map((d, i) => {
            const x = padL + i * bw + bw * 0.2;
            const w = bw * 0.6;
            const top = y(d.total);
            const r = Math.min(4, w / 2, y(0) - top);
            return (
              <g key={d.week} onMouseEnter={() => setHover(i)}>
                <rect x={padL + i * bw} y={padT} width={bw} height={plotH} fill="transparent" />
                {d.total > 0 && (
                  <path
                    d={`M${x},${y(0)} V${top + r} Q${x},${top} ${x + r},${top} H${x + w - r} Q${x + w},${top} ${x + w},${top + r} V${y(0)} Z`}
                    fill="rgb(var(--series-1))"
                    opacity={hover === null || hover === i ? 1 : 0.5}
                  />
                )}
                {labelled.has(i) && d.total > 0 && (
                  <text x={x + w / 2} y={top - 5} fontSize={10.5} textAnchor="middle" fontWeight={600}>
                    {d.total}
                  </text>
                )}
                {i % 2 === data.length % 2 && (
                  <text x={x + w / 2} y={H - 6} fontSize={10} textAnchor="middle" className="fig-muted">
                    {d.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        {h && (
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs shadow-pop">
            <div className="font-semibold text-ink">Week of {h.label}</div>
            <div className="text-ink-2">
              {h.total} new · {h.teachers} teacher{h.teachers === 1 ? '' : 's'}, {h.students} student{h.students === 1 ? '' : 's'}
            </div>
          </div>
        )}
      </div>
      <details className="mt-2 text-sm">
        <summary className="cursor-pointer text-ink-3 hover:text-ink">Show as a table</summary>
        <table className="mt-2 w-full text-left text-sm">
          <thead className="text-ink-3">
            <tr>
              <th className="py-1 font-medium">Week of</th>
              <th className="py-1 text-right font-medium">Teachers</th>
              <th className="py-1 text-right font-medium">Students</th>
              <th className="py-1 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.week} className="border-t border-line">
                <td className="py-1">{d.label}</td>
                <td className="py-1 text-right tabular-nums">{d.teachers}</td>
                <td className="py-1 text-right tabular-nums">{d.students}</td>
                <td className="py-1 text-right font-medium tabular-nums">{d.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
