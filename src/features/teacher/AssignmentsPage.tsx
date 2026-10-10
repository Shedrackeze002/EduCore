import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Copy, MoreHorizontal, Pencil, Plus, Search, Sparkles, Trash2 } from 'lucide-react';
import { TYPE_LABEL, isQuestionType, type AssignmentType } from '@engine/assemble.ts';
import { useAssignments, useDeleteAssignment, useRoster, useSaveAssignment, useSubmissions } from '@/data/hooks.ts';
import type { Assignment } from '@/data/types.ts';
import { Badge, Button, EmptyState, IconButton, Menu, MenuItem, PageHeader, PageSpinner, ProgressBar, Select, Tabs, useToast } from '@/components/ui/index.ts';
import { dueLabel, fmtDateTime } from '@/lib/dates.ts';
import { itemCount } from '../shared/derive.ts';
import { TypeIcon } from '../shared/TypeIcon.tsx';
import { assignmentStats, pct, rosterStatus, useClassId } from './shared.tsx';
import { cn } from '@/lib/cn.ts';

type View = 'active' | 'past' | 'drafts' | 'all';

export default function AssignmentsPage() {
  const classId = useClassId();
  const assignments = useAssignments(classId);
  const roster = useRoster(classId);
  const subs = useSubmissions({ classId });
  const [view, setView] = useState<View>('active');
  const [type, setType] = useState<AssignmentType | ''>('');
  const [q, setQ] = useState('');

  const now = new Date();
  const all = assignments.data ?? [];
  const isPast = (a: Assignment) => a.status === 'published' && !!a.dueAt && new Date(a.dueAt) < now;
  const groups: Record<View, Assignment[]> = {
    active: all.filter((a) => a.status === 'published' && !isPast(a)),
    past: all.filter(isPast),
    drafts: all.filter((a) => a.status === 'draft'),
    all,
  };
  const list = groups[view]
    .filter((a) => !type || a.type === type)
    .filter((a) => !q || a.title.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (view === 'past' ? (b.dueAt ?? '').localeCompare(a.dueAt ?? '') : (a.dueAt ?? '9999').localeCompare(b.dueAt ?? '9999')));

  const rows = useMemo(() => list.map((a) => ({ a, st: assignmentStats(rosterStatus(a, roster.data ?? [], subs.data ?? [])) })), [list, roster.data, subs.data]);

  if (assignments.isLoading) return <PageSpinner />;
  return (
    <div>
      <PageHeader title="Assignments" subtitle="Lessons, readings, videos, practice, classwork, homework, quizzes and exams." actions={<Button to={`/t/c/${classId}/assignments/new`} icon={<Plus className="h-4 w-4" />}>New assignment</Button>} />
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Tabs
          value={view}
          onChange={setView}
          items={[
            { value: 'active', label: 'Active', count: groups.active.length },
            { value: 'past', label: 'Past due', count: groups.past.length },
            { value: 'drafts', label: 'Drafts', count: groups.drafts.length },
            { value: 'all', label: 'All', count: groups.all.length },
          ]}
        />
        <div className="flex gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
            <input className="input h-10 w-48 pl-9" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search assignments" />
          </div>
          <Select value={type} onChange={(e) => setType(e.target.value as AssignmentType | '')} aria-label="Filter by type" className="w-40">
            <option value="">All types</option>
            {(Object.keys(TYPE_LABEL) as AssignmentType[]).map((t) => (
              <option key={t} value={t}>
                {TYPE_LABEL[t]}
              </option>
            ))}
          </Select>
        </div>
      </div>
      {rows.length === 0 ? (
        <EmptyState title={view === 'drafts' ? 'No drafts' : 'No assignments here yet'} action={<Button to={`/t/c/${classId}/assignments/new`}>Create an assignment</Button>}>
          Tip: open a lesson in Curriculum and use “Assign” to create follow-up work in one click.
        </EmptyState>
      ) : (
        <div className="card divide-y divide-line overflow-hidden">
          {rows.map(({ a, st }) => (
            <AssignmentRow key={a.id} a={a} st={st} classId={classId} />
          ))}
        </div>
      )}
    </div>
  );
}

function AssignmentRow({ a, st, classId }: { a: Assignment; st: ReturnType<typeof assignmentStats>; classId: string }) {
  const del = useDeleteAssignment(classId);
  const save = useSaveAssignment(classId);
  const navigate = useNavigate();
  const toast = useToast();
  const due = dueLabel(a.dueAt);
  const n = itemCount(a);
  return (
    <div className="flex flex-wrap items-center gap-3 px-4 py-3.5 hover:bg-surface-2/50 sm:flex-nowrap sm:px-5">
      <TypeIcon type={a.type} />
      <Link to={a.status === 'draft' ? `/t/c/${classId}/assignments/${a.id}/edit` : `/t/c/${classId}/assignments/${a.id}`} className="min-w-0 flex-1 basis-56">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate font-medium">{a.title}</span>
          {a.status === 'draft' && <Badge>Draft</Badge>}
          {a.createdBy === 'ai' && (
            <Badge tone="brand" icon={<Sparkles className="h-3 w-3" />}>
              AI suggested
            </Badge>
          )}
        </div>
        <div className="mt-0.5 text-xs text-ink-3">
          {TYPE_LABEL[a.type]}
          {n > 0 && ` · ${n} question${n === 1 ? '' : 's'}`} · {a.assignedTo === 'all' ? 'Whole class' : `${a.assignedTo.length} student${a.assignedTo.length === 1 ? '' : 's'}`} ·{' '}
          <span className={cn(a.status === 'published' && due.tone === 'urgent' && 'font-medium text-warn-ink')} title={fmtDateTime(a.dueAt)}>
            {a.dueAt ? due.text : 'No due date'}
          </span>
        </div>
      </Link>
      {a.status === 'published' && (
        <>
          <div className="w-32">
            <ProgressBar value={st.assigned ? (st.submitted / st.assigned) * 100 : 0} tone={st.missing ? 'warn' : 'brand'} label="Submitted" />
            <div className="mt-1 flex justify-between text-xs text-ink-3">
              <span>
                {st.submitted}/{st.assigned}
              </span>
              {st.needsGrading > 0 && <span className="font-medium text-warn-ink">{st.needsGrading} to grade</span>}
              {!st.needsGrading && st.missing > 0 && <span className="text-bad-ink">{st.missing} missing</span>}
            </div>
          </div>
          <div className="w-14 text-right">
            <div className="font-display text-lg font-semibold">{isQuestionType(a.type) ? pct(st.average) : ''}</div>
            {isQuestionType(a.type) && <div className="text-[11px] text-ink-3">avg</div>}
          </div>
        </>
      )}
      <Menu
        trigger={() => (
          <IconButton label="More actions">
            <MoreHorizontal className="h-5 w-5" />
          </IconButton>
        )}
      >
        {(close) => (
          <>
            <MenuItem
              icon={<Pencil className="h-4 w-4" />}
              onClick={() => {
                close();
                navigate(`/t/c/${classId}/assignments/${a.id}/edit`);
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              icon={<Copy className="h-4 w-4" />}
              onClick={async () => {
                close();
                const copy = await save.mutateAsync({
                  classId,
                  title: `${a.title} (copy)`,
                  type: a.type,
                  instructions: a.instructions,
                  content: a.content,
                  settings: a.settings,
                  allowLate: a.allowLate,
                  reminderHours: a.reminderHours,
                  assignedTo: a.assignedTo,
                });
                toast({ kind: 'success', title: 'Duplicated as a draft' });
                navigate(`/t/c/${classId}/assignments/${copy.id}/edit`);
              }}
            >
              Duplicate
            </MenuItem>
            <MenuItem
              danger
              icon={<Trash2 className="h-4 w-4" />}
              onClick={async () => {
                close();
                if (!window.confirm(`Delete “${a.title}”? Student submissions for it will also be deleted.`)) return;
                await del.mutateAsync(a.id);
                toast({ kind: 'success', title: 'Assignment deleted' });
              }}
            >
              Delete
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
}


