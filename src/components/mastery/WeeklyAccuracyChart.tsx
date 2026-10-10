/** Single-series column chart of weekly accuracy, with hover tooltips and a text summary. */
import { useMemo, useState } from 'react';
import { startOfWeek, format, subWeeks } from 'date-fns';
import type { SkillEvent } from '@/data/types.ts';

export function WeeklyAccuracyChart({ events, weeks = 6 }: { events: SkillEvent[]; weeks?: number }) {
  const data = useMemo(() => {
    const now = new Date();
    const buckets = Array.from({ length: weeks }, (_, i) => {
      const start = startOfWeek(subWeeks(now, weeks - 1 - i), { weekStartsOn: 1 });
      return { start, label: format(start, 'MMM d'), total: 0, correct: 0 };
    });
    for (const e of events) {
      const t = new Date(e.at).getTime();
      for (let i = buckets.length - 1; i >= 0; i--) {
        if (t >= buckets[i].start.getTime()) {
          buckets[i].total++;
          if (e.correct && !e.assisted) buckets[i].correct++;
          break;
        }
      }
    }
    return buckets.map((b) => ({ ...b, pct: b.total ? Math.round((b.correct / b.total) * 100) : null }));
  }, [events, weeks]);
  const [hover, setHover] = useState<number | null>(null);
  const W = 420;
  const H = 170;
  const padL = 30;
  const padB = 24;
  const plotH = H - padB - 12;
  const bw = (W - padL) / data.length;
  const y = (p: number) => 12 + plotH * (1 - p / 100);
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="figure-svg h-auto w-full" role="img" aria-label={`Weekly accuracy: ${data.map((d) => `${d.label} ${d.pct ?? 'no'}${d.pct !== null ? '%' : ' data'}`).join(', ')}`}>
        {[0, 50, 100].map((t) => (
          <g key={t}>
            <line x1={padL} x2={W} y1={y(t)} y2={y(t)} stroke="rgb(var(--line))" />
            <text x={padL - 6} y={y(t) + 3.5} fontSize={10} textAnchor="end" className="fig-muted">
              {t}%
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const x = padL + i * bw + bw * 0.22;
          const w = bw * 0.56;
          const top = d.pct === null ? y(0) : y(d.pct);
          return (
            <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              <rect x={padL + i * bw} y={12} width={bw} height={plotH} fill="transparent" />
              {d.pct !== null && <path d={`M${x},${y(0)} V${top + 4} Q${x},${top} ${x + 4},${top} H${x + w - 4} Q${x + w},${top} ${x + w},${top + 4} V${y(0)} Z`} fill="rgb(var(--series-1))" opacity={hover === null || hover === i ? 1 : 0.55} />}
              {d.pct !== null && (
                <text x={x + w / 2} y={top - 5} fontSize={10.5} textAnchor="middle" fontWeight={600}>
                  {d.pct}%
                </text>
              )}
              <text x={x + w / 2} y={H - 6} fontSize={10} textAnchor="middle" className="fig-muted">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs shadow-pop">
          Week of {data[hover].label}: {data[hover].total ? `${data[hover].correct}/${data[hover].total} correct without hints` : 'no practice'}
        </div>
      )}
    </div>
  );
}
