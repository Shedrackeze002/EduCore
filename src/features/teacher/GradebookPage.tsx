import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Download, Scale } from 'lucide-react';
import { TYPE_LABEL, isQuestionType, type AssignmentType } from '@engine/assemble.ts';
import { useAssignments, useRoster, useSubmissions } from '@/data/hooks.ts';
import type { Assignment, Profile } from '@/data/types.ts';
import { Avatar, Button, Card, CardBody, Checkbox, EmptyState, Modal, PageHeader, PageSpinner, Tabs } from '@/components/ui/index.ts';
import { fmtDate } from '@/lib/dates.ts';
import { getItem, setItem } from '@/lib/storage.ts';
import { cn } from '@/lib/cn.ts';
import { downloadText, toCsv } from '../shared/derive.ts';
import { TypeIcon } from '../shared/TypeIcon.tsx';
import { rosterStatus, scoreCell, useClassId, type RosterRow } from './shared.tsx';

type Weights = Partial<Record<AssignmentType, number>>;
const DEFAULT_WEIGHTS: Weights = { exam: 40, quiz: 25, homework: 20, classwork: 10, practice: 5 };
const GRADED: AssignmentType[] = ['exam', 'quiz', 'homework', 'classwork', 'practice'];

interface GbPrefs {
  weighted: boolean;
  missingZero: boolean;
  weights: Weights;
}

function loadPrefs(classId: string): GbPrefs {
  try {
    const raw = getItem(`educore-gradebook-${classId}`);
    if (raw) return { weighted: false, missingZero: false, weights: DEFAULT_WEIGHTS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return { weighted: false, missingZero: false, weights: DEFAULT_WEIGHTS };
}

/** Score that counts for the student's average, or null when it should be ignored. */
function counted(r: RosterRow | undefined, missingZero: boolean): number | null {
  if (!r) return null;
  if (r.best && r.best.percent !== null && r.status !== 'needs_grading') return r.best.percent;
  if (r.status === 'missing' && missingZero) return 0;
  return null;
}

export default function GradebookPage() {
  const classId = useClassId();
  const roster = useRoster(classId);
  const assignments = useAssignments(classId);
  const subs = useSubmissions({ classId });
  const [scope, setScope] = useState<'graded' | 'all'>('graded');
  const [prefs, setPrefsState] = useState<GbPrefs>(() => loadPrefs(classId));
  const [editWeights, setEditWeights] = useState(false);
  const setPrefs = (p: GbPrefs) => {
    setPrefsState(p);
    setItem(`educore-gradebook-${classId}`, JSON.stringify(p));
  };

  const cols = useMemo(
    () =>
      (assignments.data ?? [])
        .filter((a) => a.status === 'published' && (scope === 'all' || isQuestionType(a.type)))
        .sort((a, b) => (a.dueAt ?? a.publishedAt ?? '').localeCompare(b.dueAt ?? b.publishedAt ?? '')),
    [assignments.data, scope],
  );
  const grid = useMemo(() => {
    const m = new Map<string, Map<string, RosterRow>>();
    for (const a of cols) {
      const rows = rosterStatus(a, roster.data ?? [], subs.data ?? []);
      m.set(a.id, new Map(rows.map((r) => [r.student.id, r])));
    }
    return m;
  }, [cols, roster.data, subs.data]);

  const studentAvg = (s: Profile): number | null => {
    const graded = cols.filter((a) => isQuestionType(a.type));
    if (!prefs.weighted) {
      const xs = graded.map((a) => counted(grid.get(a.id)?.get(s.id), prefs.missingZero)).filter((x): x is number => x !== null);
      return xs.length ? Math.round(xs.reduce((t, x) => t + x, 0) / xs.length) : null;
    }
    let wsum = 0;
    let total = 0;
    for (const t of GRADED) {
      const w = prefs.weights[t] ?? 0;
      if (!w) continue;
      const xs = graded.filter((a) => a.type === t).map((a) => counted(grid.get(a.id)?.get(s.id), prefs.missingZero)).filter((x): x is number => x !== null);
      if (!xs.length) continue;
      total += (xs.reduce((a, b) => a + b, 0) / xs.length) * w;
      wsum += w;
    }
    return wsum ? Math.round(total / wsum) : null;
  };
  const colAvg = (a: Assignment): number | null => {
    const xs = [...(grid.get(a.id)?.values() ?? [])].map((r) => counted(r, false)).filter((x): x is number => x !== null);
    return xs.length ? Math.round(xs.reduce((t, x) => t + x, 0) / xs.length) : null;
  };

  function exportCsv() {
    const header = ['Student', 'Username', ...cols.map((a) => `${a.title} (${TYPE_LABEL[a.type]})`), prefs.weighted ? 'Weighted average' : 'Average'];
    const lines = (roster.data ?? []).map((s) => [
      s.fullName,
      s.username ?? s.email,
      ...cols.map((a) => {
        const r = grid.get(a.id)?.get(s.id);
        if (!r) return 'n/a';
        if (!isQuestionType(a.type)) return r.best ? 'complete' : r.status === 'missing' ? 'missing' : '';
        if (r.best?.percent !== null && r.best?.percent !== undefined) return Math.round(r.best.percent);
        return r.status === 'missing' ? 'missing' : '';
      }),
      studentAvg(s),
    ]);
    downloadText(`gradebook-${new Date().toISOString().slice(0, 10)}.csv`, toCsv([header, ...lines]));
  }

  if (roster.isLoading || assignments.isLoading) return <PageSpinner />;
  const students = roster.data ?? [];

  return (
    <div>
      <PageHeader
        title="Gradebook"
        subtitle="Best attempt for each assignment. Click any score to review the work."
        actions={
          <>
            <Button variant="secondary" icon={<Scale className="h-4 w-4" />} onClick={() => setEditWeights(true)}>
              {prefs.weighted ? 'Weighted' : 'Weighting'}
            </Button>
            <Button variant="secondary" icon={<Download className="h-4 w-4" />} onClick={exportCsv} disabled={!cols.length}>
              Export CSV
            </Button>
          </>
        }
      />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Tabs
          value={scope}
          onChange={setScope}
          items={[
            { value: 'graded', label: 'Graded work' },
            { value: 'all', label: 'Everything' },
          ]}
        />
        <Legend />
      </div>
      {cols.length === 0 || students.length === 0 ? (
        <EmptyState title="Nothing to show yet">Published assignments and enrolled students appear here.</EmptyState>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 min-w-[200px] border-b border-r border-line bg-surface px-4 py-3 text-left text-xs font-semibold text-ink-3">Student</th>
                  <th className="min-w-[88px] border-b border-r border-line bg-surface-2/70 px-2 py-3 text-center text-xs font-semibold">{prefs.weighted ? 'Weighted' : 'Average'}</th>
                  {cols.map((a) => (
                    <th key={a.id} className="w-[96px] min-w-[96px] border-b border-line px-1.5 py-2 align-bottom font-normal">
                      <Link to={`/t/c/${classId}/assignments/${a.id}`} className="flex flex-col items-center gap-1 rounded-lg p-1 text-center hover:bg-surface-2" title={a.title}>
                        <TypeIcon type={a.type} className="h-7 w-7 [&_svg]:h-4 [&_svg]:w-4" />
                        <span className="line-clamp-2 text-[11px] font-medium leading-tight text-ink">{a.title}</span>
                        <span className="text-[10px] text-ink-3">{a.dueAt ? fmtDate(a.dueAt) : TYPE_LABEL[a.type]}</span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s) => {
                  const avg = studentAvg(s);
                  return (
                    <tr key={s.id} className="group">
                      <td className="sticky left-0 z-10 border-b border-r border-line bg-surface px-4 py-2 group-hover:bg-surface-2">
                        <Link to={`/t/c/${classId}/students/${s.id}`} className="flex items-center gap-2 font-medium hover:text-brand">
                          <Avatar name={s.fullName} color={s.avatarColor} size={26} />
                          <span className="truncate">{s.fullName}</span>
                        </Link>
                      </td>
                      <td className="border-b border-r border-line bg-surface-2/40 px-2 py-2 text-center">
                        <span className={cn('inline-block min-w-[3rem] rounded-md px-1.5 py-0.5 font-semibold', scoreCell(avg))}>{avg === null ? '—' : `${avg}%`}</span>
                      </td>
                      {cols.map((a) => (
                        <td key={a.id} className="border-b border-line px-1.5 py-1.5 text-center">
                          <Cell a={a} r={grid.get(a.id)?.get(s.id)} classId={classId} />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td className="sticky left-0 z-10 border-r border-line bg-surface-2 px-4 py-2.5 text-xs font-semibold text-ink-3">Class average</td>
                  <td className="border-r border-line bg-surface-2" />
                  {cols.map((a) => {
                    const v = colAvg(a);
                    return (
                      <td key={a.id} className="bg-surface-2 px-1.5 py-2.5 text-center text-xs font-semibold">
                        {isQuestionType(a.type) ? (v === null ? '—' : `${v}%`) : ''}
                      </td>
                    );
                  })}
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      )}
      {editWeights && <WeightsModal prefs={prefs} onSave={setPrefs} onClose={() => setEditWeights(false)} />}
    </div>
  );
}

function Cell({ a, r, classId }: { a: Assignment; r: RosterRow | undefined; classId: string }) {
  if (!r) return <span className="text-ink-3/50" title="Not assigned">·</span>;
  const href = r.best ? `/t/c/${classId}/submissions/${r.best.id}` : `/t/c/${classId}/assignments/${a.id}`;
  let content: React.ReactNode;
  let cls = '';
  let title = '';
  if (r.status === 'needs_grading') {
    content = 'Grade';
    cls = 'bg-warn-soft text-warn-ink';
    title = 'Written responses need grading';
  } else if (r.best) {
    if (!isQuestionType(a.type)) {
      content = <Check className="mx-auto h-4 w-4" />;
      cls = 'text-good-ink';
      title = 'Complete';
    } else {
      content = `${Math.round(r.best.percent ?? 0)}`;
      cls = scoreCell(r.best.percent);
      title = `${Math.round(r.best.percent ?? 0)}%${r.best.late ? ' (late)' : ''}${r.attempts > 1 ? `, best of ${r.attempts}` : ''}`;
    }
  } else if (r.status === 'missing') {
    content = 'M';
    cls = 'bg-bad-soft text-bad-ink';
    title = 'Missing';
  } else if (r.status === 'in_progress') {
    content = '…';
    cls = 'text-info-ink';
    title = 'In progress';
  } else {
    content = '';
    title = 'Not started';
  }
  return (
    <Link to={href} title={title} className={cn('relative block h-8 rounded-md text-[13px] font-semibold leading-8 transition hover:ring-2 hover:ring-brand/30', cls)}>
      {content}
      {r.best?.late && <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-warn" aria-label="late" />}
    </Link>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-ink-3">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-3 w-3 rounded bg-good-soft ring-1 ring-good/30" /> 80+
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-3 w-3 rounded bg-warn-soft ring-1 ring-warn/30" /> 60–79
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-3 w-3 rounded bg-bad-soft ring-1 ring-bad/30" /> below 60
      </span>
      <span>
        <b className="text-bad-ink">M</b> missing
      </span>
      <span>
        <b className="text-info-ink">…</b> in progress
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-warn" /> late
      </span>
    </div>
  );
}

function WeightsModal({ prefs, onSave, onClose }: { prefs: GbPrefs; onSave: (p: GbPrefs) => void; onClose: () => void }) {
  const [p, setP] = useState(prefs);
  const total = GRADED.reduce((s, t) => s + (p.weights[t] ?? 0), 0);
  return (
    <Modal
      open
      onClose={onClose}
      size="sm"
      title="Averages"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(p);
              onClose();
            }}
          >
            Save
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Checkbox checked={p.weighted} onChange={(weighted) => setP({ ...p, weighted })} label="Weight by category" />
        {p.weighted && (
          <Card>
            <CardBody className="space-y-2 p-4">
              {GRADED.map((t) => (
                <label key={t} className="flex items-center justify-between gap-3 text-sm">
                  <span>{TYPE_LABEL[t]}</span>
                  <span className="flex items-center gap-1">
                    <input type="number" min={0} max={100} className="input h-9 w-20 py-0 text-right" value={p.weights[t] ?? 0} onChange={(e) => setP({ ...p, weights: { ...p.weights, [t]: Math.max(0, Math.min(100, Number(e.target.value) || 0)) } })} />%
                  </span>
                </label>
              ))}
              <div className={cn('pt-1 text-right text-xs', total === 100 ? 'text-ink-3' : 'text-warn-ink')}>Total {total}%{total !== 100 && ' (weights are rescaled to the categories a student has scores in)'}</div>
            </CardBody>
          </Card>
        )}
        <Checkbox checked={p.missingZero} onChange={(missingZero) => setP({ ...p, missingZero })} label="Count missing work as 0%" />
        <p className="text-xs text-ink-3">These settings are saved in this browser and also apply to the CSV export.</p>
      </div>
    </Modal>
  );
}
