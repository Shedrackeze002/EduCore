import type { ReactNode } from 'react';
import { cn } from '@/lib/cn.ts';

export function Tabs<T extends string>({ value, onChange, items, className }: { value: T; onChange: (v: T) => void; items: Array<{ value: T; label: ReactNode; count?: number }>; className?: string }) {
  return (
    <div role="tablist" className={cn('inline-flex max-w-full gap-1 overflow-x-auto rounded-xl bg-surface-2 p-1 scrollbar-thin', className)}>
      {items.map((it) => (
        <button
          key={it.value}
          role="tab"
          type="button"
          aria-selected={value === it.value}
          onClick={() => onChange(it.value)}
          className={cn(
            'inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition',
            value === it.value ? 'bg-surface text-ink shadow-card' : 'text-ink-3 hover:text-ink',
          )}
        >
          {it.label}
          {it.count !== undefined && <span className={cn('rounded-full px-1.5 text-xs', value === it.value ? 'bg-brand-100 text-brand-800' : 'bg-surface-3 text-ink-3')}>{it.count}</span>}
        </button>
      ))}
    </div>
  );
}
