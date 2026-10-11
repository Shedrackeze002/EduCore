import { useState } from 'react';
import { School, Search } from 'lucide-react';
import { getCourse } from '@engine/curriculum/index.ts';
import { useAdminClasses } from '@/data/hooks.ts';
import { Badge, Card, EmptyState, Input, PageHeader, Skeleton } from '@/components/ui/index.ts';
import { fmtDate, relative } from '@/lib/dates.ts';
import { Pager, useDebounced } from './shared.tsx';

const LIMIT = 50;

export default function AdminClassesPage() {
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const q = useDebounced(search.trim());
  const classes = useAdminClasses({ search: q, offset });
  const rows = classes.data?.rows ?? [];

  return (
    <div>
      <PageHeader eyebrow="Admin console" title="Classes" subtitle="Every class on EduCore, most recently active first." />
      <div className="mb-4 flex justify-end">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-ink-3" />
          <Input
            aria-label="Search classes"
            placeholder="Search class or teacher"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOffset(0);
            }}
            className="[&_input]:pl-9"
          />
        </div>
      </div>
      <Card>
        {classes.isLoading ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
        ) : classes.error ? (
          <p className="m-5 rounded-xl bg-bad-soft px-4 py-3 text-bad-ink">{(classes.error as Error).message}</p>
        ) : rows.length === 0 ? (
          <EmptyState className="m-5 border-0" icon={<School className="h-6 w-6" />} title={q ? 'No classes match' : 'No classes yet'}>
            {q ? 'Try a different search.' : 'Classes appear here once a teacher creates one.'}
          </EmptyState>
        ) : (
          <ul className="divide-y divide-line" aria-label="Classes">
            {rows.map((c) => (
              <li key={c.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5 sm:px-5">
                <div className="flex min-w-0 flex-1 basis-64 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-base font-bold text-brand-ink">{c.name.slice(0, 1)}</span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="truncate font-medium text-ink">
                        {c.name}
                        {c.section ? <span className="font-normal text-ink-3"> · {c.section}</span> : null}
                      </span>
                      {c.archived && <Badge>Archived</Badge>}
                    </div>
                    <div className="truncate text-sm text-ink-3">
                      {c.teacherName} · {getCourse(c.courseId)?.title ?? c.courseId}
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 pl-[52px] text-sm text-ink-3 md:w-auto md:shrink-0 md:gap-x-5 md:pl-0">
                  <span className="tabular-nums md:w-24">
                    {c.students} student{c.students === 1 ? '' : 's'}
                  </span>
                  <span className="tabular-nums md:w-28">
                    {c.assignments} assignment{c.assignments === 1 ? '' : 's'}
                  </span>
                  <span className="md:w-32" title={`Created ${fmtDate(c.createdAt, 'MMM d, yyyy')}`}>
                    Active {relative(c.lastActivity ?? c.createdAt)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
      <Pager offset={offset} limit={LIMIT} total={classes.data?.total ?? 0} onChange={setOffset} />
    </div>
  );
}
