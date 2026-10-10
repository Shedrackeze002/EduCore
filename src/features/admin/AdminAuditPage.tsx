import { ScrollText } from 'lucide-react';
import { useAdminAudit } from '@/data/hooks.ts';
import { Card, Dot, EmptyState, PageHeader, Skeleton } from '@/components/ui/index.ts';
import { fmtDateTime, relative } from '@/lib/dates.ts';
import { auditTone, describeAudit } from './shared.tsx';

export default function AdminAuditPage() {
  const audit = useAdminAudit(300);
  const rows = audit.data ?? [];
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader eyebrow="Admin console" title="Audit log" subtitle="Every approval, access change, password reset and setting change, newest first." />
      <Card>
        {audit.isLoading ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-10" />
            ))}
          </div>
        ) : audit.error ? (
          <p className="m-5 rounded-xl bg-bad-soft px-4 py-3 text-bad-ink">{(audit.error as Error).message}</p>
        ) : rows.length === 0 ? (
          <EmptyState className="m-5 border-0" icon={<ScrollText className="h-6 w-6" />} title="Nothing recorded yet">
            Changes made from the admin console appear here.
          </EmptyState>
        ) : (
          <ol className="divide-y divide-line" aria-label="Audit log">
            {rows.map((e) => (
              <li key={e.id} className="flex items-start gap-3 px-4 py-3 sm:px-5">
                <span className="mt-2">
                  <Dot tone={auditTone(e.action)} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] text-ink">{describeAudit(e)}</div>
                  <div className="text-sm text-ink-3" title={fmtDateTime(e.createdAt)}>
                    {relative(e.createdAt)} · {fmtDateTime(e.createdAt)}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </Card>
    </div>
  );
}
