/**
 * Teachers' suggested lesson edits. The administrator compares each suggestion with the section
 * it changes, previews it, and approves or declines it; approved edits apply to every class and
 * can be reverted at any time.
 */
import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Check, Eye, FilePenLine, GitCompare, Undo2, X } from 'lucide-react';
import { courseOfLesson, lessonById } from '@engine/curriculum/index.ts';
import { loadLessonSource } from '@/content/index.ts';
import { diffLines, splitLesson, validateSection } from '@/content/edits.ts';
import { parseLesson } from '@/content/lessonParser.ts';
import { useAdminDecideLessonEdit, useAdminLessonEdits } from '@/data/hooks.ts';
import type { LessonEdit, LessonEditStatus } from '@/data/types.ts';
import { Badge, Button, Card, EmptyState, PageHeader, Skeleton, Tabs, Textarea, useToast } from '@/components/ui/index.ts';
import { BlockView } from '@/features/lessons/LessonBlocks.tsx';
import { relative } from '@/lib/dates.ts';
import { cn } from '@/lib/cn.ts';

type Filter = LessonEditStatus | 'all';

const TABS: Array<{ value: Filter; label: string }> = [
  { value: 'pending', label: 'Waiting' },
  { value: 'approved', label: 'Live' },
  { value: 'declined', label: 'Declined' },
  { value: 'all', label: 'All' },
];

const STATUS: Record<LessonEditStatus, { label: string; tone: 'info' | 'good' | 'bad' | 'neutral' }> = {
  pending: { label: 'Waiting', tone: 'info' },
  approved: { label: 'Live', tone: 'good' },
  declined: { label: 'Declined', tone: 'bad' },
  withdrawn: { label: 'Withdrawn', tone: 'neutral' },
  replaced: { label: 'Replaced', tone: 'neutral' },
  reverted: { label: 'Reverted', tone: 'neutral' },
};

export default function AdminEditsPage() {
  const [filter, setFilter] = useState<Filter>('pending');
  const edits = useAdminLessonEdits(filter === 'all' ? undefined : filter);
  const rows = edits.data ?? [];
  return (
    <div>
      <PageHeader eyebrow="Admin console" title="Lesson edits" subtitle="Changes teachers suggested to lessons. Approved edits apply to every class, on top of the lesson files, and can be reverted." />
      <Tabs className="mb-4" value={filter} onChange={setFilter} items={TABS} />
      {edits.isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 2 }, (_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : edits.error ? (
        <p className="rounded-xl bg-bad-soft px-4 py-3 text-bad-ink">{(edits.error as Error).message}</p>
      ) : rows.length === 0 ? (
        <EmptyState icon={<FilePenLine className="h-6 w-6" />} title={filter === 'pending' ? 'No suggestions waiting' : 'Nothing here'}>
          {filter === 'pending' ? 'Suggestions appear here when a teacher proposes a change on a lesson page.' : 'Try another tab.'}
        </EmptyState>
      ) : (
        <ul className="space-y-4" aria-label="Lesson edits">
          {rows.map((e) => (
            <EditItem key={e.id} e={e} />
          ))}
        </ul>
      )}
    </div>
  );
}

/** Whether the lesson file still has the section the edit was made from. */
function useStillApplies(e: LessonEdit): boolean | null {
  const [applies, setApplies] = useState<boolean | null>(null);
  useEffect(() => {
    let alive = true;
    loadLessonSource(e.lessonId)
      .then((raw) => alive && setApplies(!!raw && splitLesson(raw).sections.some((s) => s.hash === e.baseHash)))
      .catch(() => alive && setApplies(null));
    return () => {
      alive = false;
    };
  }, [e.lessonId, e.baseHash]);
  return applies;
}

function EditItem({ e }: { e: LessonEdit }) {
  const decide = useAdminDecideLessonEdit();
  const toast = useToast();
  const [view, setView] = useState<'changes' | 'preview'>('changes');
  const [declining, setDeclining] = useState(false);
  const [note, setNote] = useState('');
  const applies = useStillApplies(e);
  const meta = lessonById(e.lessonId);
  const course = courseOfLesson(e.lessonId);
  const diff = useMemo(() => diffLines(e.original, e.markdown), [e.original, e.markdown]);
  const problem = useMemo(() => validateSection(e.markdown), [e.markdown]);
  const section = useMemo(() => (problem ? null : parseLesson(e.markdown).sections[0]), [e.markdown, problem]);
  const st = STATUS[e.status];

  const act = async (status: 'approved' | 'declined' | 'reverted', done: string) => {
    try {
      await decide.mutateAsync({ id: e.id, status, note: status === 'declined' ? note : null });
      toast({ kind: 'success', title: done });
    } catch (err) {
      toast({ kind: 'error', title: 'Could not update the edit', body: (err as Error).message });
    }
  };

  return (
    <li>
      <Card className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[17px] font-semibold">{e.sectionTitle}</span>
          <Badge tone={st.tone}>{st.label}</Badge>
        </div>
        <div className="mt-0.5 text-sm text-ink-3">
          {course?.shortTitle} · Lesson {meta?.number} {meta?.title} · suggested by {e.author?.name ?? 'a teacher'} {relative(e.createdAt)}
        </div>
        {e.reason && <p className="mt-2 text-[15px] text-ink-2">“{e.reason}”</p>}
        {applies === false && (e.status === 'pending' || e.status === 'approved') && (
          <p className="mt-3 flex gap-2 rounded-xl bg-warn-soft px-3 py-2 text-sm text-warn-ink">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            The lesson file has changed since this suggestion, so it no longer applies. Ask the teacher to suggest it again on the current lesson.
          </p>
        )}
        {problem && <p className="mt-3 rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad-ink">This suggestion cannot be shown: {problem}</p>}

        <div className="mt-3 inline-flex gap-1 rounded-xl bg-surface-2 p-1" role="tablist" aria-label="View">
          {(
            [
              ['changes', 'Changes', GitCompare],
              ['preview', 'Preview', Eye],
            ] as const
          ).map(([v, label, Icon]) => (
            <button key={v} type="button" role="tab" aria-selected={view === v} onClick={() => setView(v)} className={cn('inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-sm font-medium', view === v ? 'bg-surface text-ink shadow-card' : 'text-ink-3 hover:text-ink')}>
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {view === 'changes' ? (
          <pre className="mt-3 max-h-96 overflow-auto rounded-xl border border-line bg-canvas p-3 text-[13px] leading-relaxed" aria-label="Changes">
            {diff.map((d, i) => (
              <div key={i} className={cn('whitespace-pre-wrap px-2', d.kind === 'added' && 'bg-good-soft text-good-ink', d.kind === 'removed' && 'bg-bad-soft text-bad-ink line-through decoration-bad/40')}>
                <span className="mr-2 select-none opacity-60">{d.kind === 'added' ? '+' : d.kind === 'removed' ? '−' : ' '}</span>
                {d.text || ' '}
              </div>
            ))}
          </pre>
        ) : (
          <div className="mt-3 max-h-[32rem] space-y-4 overflow-y-auto rounded-xl border border-line bg-canvas p-4" aria-label="Preview">
            {section ? (
              <>
                <h2 className="text-xl font-semibold">{section.title}</h2>
                {section.blocks.map((b, i) => (
                  <BlockView key={i} block={b} />
                ))}
              </>
            ) : (
              <p className="text-sm text-ink-3">No preview.</p>
            )}
          </div>
        )}

        {e.adminNote && !declining && <p className="mt-3 rounded-xl bg-surface-2 px-3 py-2 text-sm text-ink-2">Note to the teacher: {e.adminNote}</p>}

        {e.status === 'pending' && !declining && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Button icon={<Check className="h-4 w-4" />} loading={decide.isPending} disabled={!!problem || applies === false} onClick={() => act('approved', 'Edit approved. Every class now sees it.')}>
              Approve
            </Button>
            <Button variant="ghost" icon={<X className="h-4 w-4" />} onClick={() => setDeclining(true)}>
              Decline
            </Button>
          </div>
        )}
        {declining && (
          <div className="mt-4 space-y-2">
            <Textarea label="Note to the teacher (optional)" value={note} onChange={(ev) => setNote(ev.target.value)} maxLength={1000} rows={2} />
            <div className="flex gap-2">
              <Button variant="danger" loading={decide.isPending} onClick={async () => { await act('declined', 'Suggestion declined'); setDeclining(false); }}>
                Decline suggestion
              </Button>
              <Button variant="ghost" onClick={() => setDeclining(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
        {e.status === 'approved' && (
          <div className="mt-4">
            <Button variant="secondary" icon={<Undo2 className="h-4 w-4" />} loading={decide.isPending} onClick={() => window.confirm('Revert this edit? Every class goes back to the original section.') && act('reverted', 'Edit reverted')}>
              Revert to the original
            </Button>
          </div>
        )}
      </Card>
    </li>
  );
}
