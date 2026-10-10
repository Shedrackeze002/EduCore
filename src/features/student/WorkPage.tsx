import { useMemo, useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { useAssignments, useSubmissions } from '@/data/hooks.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { Card, EmptyState, PageHeader, PageSpinner, Tabs } from '@/components/ui/index.ts';
import { sortByDue, studentWork } from '../shared/derive.ts';
import { useStudentClass } from '../shared/useStudentClass.ts';
import { WorkRow } from './StudentHome.tsx';

type Tab = 'todo' | 'missing' | 'done';

export default function WorkPage() {
  const me = useMe();
  const { cls } = useStudentClass();
  const assignments = useAssignments(cls?.id);
  const subs = useSubmissions({ studentId: me.id });
  const [tab, setTab] = useState<Tab>('todo');
  const work = useMemo(() => studentWork(assignments.data ?? [], subs.data ?? []), [assignments.data, subs.data]);
  if (assignments.isLoading || subs.isLoading) return <PageSpinner />;
  const groups: Record<Tab, typeof work> = {
    todo: sortByDue(work.filter((w) => w.status === 'todo' || w.status === 'in_progress')),
    missing: sortByDue(work.filter((w) => w.status === 'missing' || w.status === 'upcoming_closed')),
    done: sortByDue(work.filter((w) => w.status === 'done' || w.status === 'late_done')).reverse(),
  };
  return (
    <div>
      <PageHeader title="Classwork" subtitle="Assignments, quizzes, readings and practice from your teacher." />
      <Tabs
        value={tab}
        onChange={setTab}
        className="mb-4"
        items={[
          { value: 'todo', label: 'To do', count: groups.todo.length },
          { value: 'missing', label: 'Missing', count: groups.missing.length },
          { value: 'done', label: 'Done', count: groups.done.length },
        ]}
      />
      {groups[tab].length === 0 ? (
        <EmptyState icon={<ClipboardList className="h-6 w-6" />} title={tab === 'todo' ? 'Nothing to do right now' : tab === 'missing' ? 'No missing work' : 'Nothing completed yet'} />
      ) : (
        <Card className="p-2">
          {groups[tab].map((w) => (
            <WorkRow key={w.assignment.id} w={w} />
          ))}
        </Card>
      )}
    </div>
  );
}
