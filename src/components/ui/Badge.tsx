import type { ReactNode } from 'react';
import { cn } from '@/lib/cn.ts';

export type Tone = 'neutral' | 'brand' | 'good' | 'warn' | 'bad' | 'info';

const tones: Record<Tone, string> = {
  neutral: 'bg-surface-3 text-ink-2',
  brand: 'bg-brand-100 text-brand-800',
  good: 'bg-good-soft text-good-ink',
  warn: 'bg-warn-soft text-warn-ink',
  bad: 'bg-bad-soft text-bad-ink',
  info: 'bg-info-soft text-info-ink',
};

export function Badge({ tone = 'neutral', children, className, icon }: { tone?: Tone; children: ReactNode; className?: string; icon?: ReactNode }) {
  return (
    <span className={cn('inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium', tones[tone], className)}>
      {icon}
      {children}
    </span>
  );
}

export function Dot({ tone = 'neutral' }: { tone?: Tone }) {
  const c: Record<Tone, string> = { neutral: 'bg-ink-3', brand: 'bg-brand', good: 'bg-good', warn: 'bg-warn', bad: 'bg-bad', info: 'bg-info' };
  return <span className={cn('inline-block h-2 w-2 rounded-full', c[tone])} aria-hidden="true" />;
}
