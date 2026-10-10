import type { ReactNode } from 'react';
import { cn } from '@/lib/cn.ts';

export function StatTile({ label, value, hint, icon, className, tone = 'neutral' }: { label: ReactNode; value: ReactNode; hint?: ReactNode; icon?: ReactNode; className?: string; tone?: 'neutral' | 'good' | 'warn' | 'bad' }) {
  const ring = { neutral: '', good: 'ring-1 ring-good/25', warn: 'ring-1 ring-warn/30', bad: 'ring-1 ring-bad/25' }[tone];
  return (
    <div className={cn('card p-4', ring, className)}>
      <div className="flex items-center justify-between gap-2 text-sm text-ink-3">
        <span>{label}</span>
        {icon && <span className="text-ink-3">{icon}</span>}
      </div>
      <div className="mt-2 font-display text-[28px] font-semibold leading-none tracking-tight text-ink">{value}</div>
      {hint && <div className="mt-2 text-xs text-ink-3">{hint}</div>}
    </div>
  );
}
