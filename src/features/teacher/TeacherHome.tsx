import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { ArrowRight, GraduationCap, Plus, Users } from 'lucide-react';
import { getCourse } from '@engine/curriculum/index.ts';
import { api } from '@/data/index.ts';
import { qk, useClasses } from '@/data/hooks.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { Badge, Button, EmptyState, PageHeader, PageSpinner } from '@/components/ui/index.ts';
import { getItem } from '@/lib/storage.ts';
import { greeting } from '@/lib/dates.ts';
import { ApprovalNotice, needsApproval } from './ApprovalNotice.tsx';

const LAST_CLASS_KEY = 'educore-last-class';

export default function TeacherHome() {
  const me = useMe();
  const classes = useClasses();
  const [params] = useSearchParams();
  const list = classes.data ?? [];
  const rosters = useQueries({ queries: list.map((c) => ({ queryKey: qk.roster(c.id), queryFn: () => api().listRoster(c.id) })) });

  if (needsApproval(me)) return <ApprovalNotice me={me} />;
  if (classes.isLoading) return <PageSpinner />;
  const active = list.filter((c) => !c.archived);
  // Teachers usually work in one class: open the last one they used unless they asked for the list.
  if (!params.has('all')) {
    const last = getItem(LAST_CLASS_KEY);
    const target = active.find((c) => c.id === last) ?? (active.length === 1 ? active[0] : undefined);
    if (target) return <Navigate to={`/t/c/${target.id}`} replace />;
  }

  return (
    <div>
      <PageHeader title={`${greeting()}, ${me.fullName.split(' ')[0]}`} subtitle="Choose a class to teach, or create a new one." actions={<Button to="/t/new-class" icon={<Plus className="h-4 w-4" />}>New class</Button>} />
      {list.length === 0 ? (
        <EmptyState icon={<GraduationCap className="h-6 w-6" />} title="Create your first class" action={<Button to="/t/new-class">Create a class</Button>}>
          A class holds your students, the lessons you publish, assignments and the mastery data the AI assistant analyses.
        </EmptyState>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((c, i) => (
            <Link key={c.id} to={`/t/c/${c.id}`} className="card group flex flex-col p-5 transition hover:border-brand-300 hover:shadow-pop">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-lg font-bold text-brand-ink">{c.name.slice(0, 1)}</span>
                {c.archived ? <Badge>Archived</Badge> : <Badge tone="brand">Code {c.joinCode}</Badge>}
              </div>
              <div className="mt-4 text-lg font-semibold">{c.name}</div>
              <div className="text-sm text-ink-3">
                {c.section ? `${c.section} · ` : ''}
                {getCourse(c.courseId)?.title}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-ink-2">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-ink-3" /> {rosters[i]?.data?.length ?? '…'} students
                </span>
                <ArrowRight className="h-4 w-4 text-brand transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
          <Link to="/t/new-class" className="flex min-h-[176px] flex-col items-center justify-center rounded-2xl border border-dashed border-line-strong p-5 text-center text-ink-3 transition hover:border-brand-300 hover:text-brand">
            <Plus className="h-6 w-6" />
            <span className="mt-2 font-medium">New class</span>
          </Link>
        </div>
      )}
    </div>
  );
}
