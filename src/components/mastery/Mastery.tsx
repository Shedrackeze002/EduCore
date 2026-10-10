/** Mastery display components. Levels use a validated single-hue ordinal ramp (m1–m4) plus a neutral "not started". */
import { LEVEL_LABEL, LEVELS, type MasteryLevel } from '@engine/mastery.ts';
import { cn } from '@/lib/cn.ts';

export const LEVEL_BG: Record<MasteryLevel, string> = {
  not_started: 'bg-m0',
  attempted: 'bg-m1',
  familiar: 'bg-m2',
  proficient: 'bg-m3',
  mastered: 'bg-m4',
};

export function MasterySwatch({ level, className, title }: { level: MasteryLevel; className?: string; title?: string }) {
  return (
    <span
      className={cn('inline-block h-4 w-4 shrink-0 rounded-[5px]', LEVEL_BG[level], level === 'not_started' && 'ring-1 ring-inset ring-line-strong', className)}
      title={title ?? LEVEL_LABEL[level]}
      aria-label={LEVEL_LABEL[level]}
    />
  );
}

export function MasteryChip({ level, className }: { level: MasteryLevel; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-2 py-0.5 text-xs font-medium text-ink-2', className)}>
      <MasterySwatch level={level} className="h-2.5 w-2.5 rounded-[3px]" />
      {LEVEL_LABEL[level]}
    </span>
  );
}

export function MasteryLegend({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-3', className)}>
      {LEVELS.map((l) => (
        <span key={l} className="inline-flex items-center gap-1.5">
          <MasterySwatch level={l} className="h-3 w-3" />
          {LEVEL_LABEL[l]}
        </span>
      ))}
    </div>
  );
}

/** A stacked bar of level counts (with 2px surface gaps between segments). */
export function MasteryBar({ counts, total, className, showLabels }: { counts: Record<MasteryLevel, number>; total: number; className?: string; showLabels?: boolean }) {
  const order: MasteryLevel[] = ['mastered', 'proficient', 'familiar', 'attempted', 'not_started'];
  return (
    <div className={className}>
      <div className="flex h-3 w-full gap-[2px] overflow-hidden rounded-full" role="img" aria-label={order.map((l) => `${LEVEL_LABEL[l]}: ${counts[l]}`).join(', ')}>
        {order.map((l) =>
          counts[l] > 0 ? (
            <div key={l} className={cn('h-full first:rounded-l-full last:rounded-r-full', LEVEL_BG[l])} style={{ width: `${(counts[l] / Math.max(1, total)) * 100}%` }} title={`${LEVEL_LABEL[l]}: ${counts[l]}`} />
          ) : null,
        )}
      </div>
      {showLabels && (
        <div className="mt-1.5 flex flex-wrap gap-x-3 text-xs text-ink-3">
          {order
            .filter((l) => counts[l] > 0)
            .map((l) => (
              <span key={l}>
                {counts[l]} {LEVEL_LABEL[l].toLowerCase()}
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
