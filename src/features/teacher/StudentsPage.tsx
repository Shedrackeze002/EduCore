import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpDown, Copy, Download, KeyRound, MoreHorizontal, Printer, Search, Trash2, UserPlus, UserRound } from 'lucide-react';
import { getCourse } from '@engine/curriculum/index.ts';
import { summarize } from '@engine/mastery.ts';
import { api } from '@/data/index.ts';
import { useQueryClient } from '@tanstack/react-query';
import { qk, useAssignments, useClass, useEvents, useMastery, usePublications, useRoster, useSubmissions } from '@/data/hooks.ts';
import type { ClassRoom, NewStudentCredential } from '@/data/types.ts';
import { Avatar, Badge, Button, EmptyState, IconButton, Menu, MenuItem, Modal, PageHeader, PageSpinner, ProgressBar, Tabs, Textarea, useToast } from '@/components/ui/index.ts';
import { relative } from '@/lib/dates.ts';
import { cn } from '@/lib/cn.ts';
import { downloadText, masteryMap, toCsv } from '../shared/derive.ts';
import { pct, scoreCell, useClassId } from './shared.tsx';
import { JoinRequestsCard } from './JoinRequests.tsx';

type Sort = 'name' | 'mastery' | 'average' | 'missing' | 'active';

export function joinLink(code: string): string {
  return `${window.location.origin}${import.meta.env.BASE_URL}signup?code=${encodeURIComponent(code)}`;
}

export default function StudentsPage() {
  const classId = useClassId();
  const cls = useClass(classId);
  const roster = useRoster(classId);
  const mastery = useMastery({ classId });
  const pubs = usePublications(classId);
  const assignments = useAssignments(classId);
  const subs = useSubmissions({ classId });
  const events = useEvents(classId, undefined, 60);
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<Sort>('name');
  const [adding, setAdding] = useState(false);
  const qc = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();

  const rows = useMemo(() => {
    const course = cls.data ? getCourse(cls.data.courseId) : undefined;
    const published = new Set((pubs.data ?? []).map((p) => p.lessonId));
    const taught = (course?.lessons ?? []).filter((l) => published.has(l.id)).flatMap((l) => l.skills);
    const now = new Date();
    const due = (assignments.data ?? []).filter((a) => a.status === 'published' && a.dueAt && new Date(a.dueAt) < now);
    return (roster.data ?? []).map((s) => {
      const mine = (subs.data ?? []).filter((x) => x.studentId === s.id && x.status !== 'in_progress');
      const assignedDue = due.filter((a) => a.assignedTo === 'all' || a.assignedTo.includes(s.id));
      const done = assignedDue.filter((a) => mine.some((x) => x.assignmentId === a.id)).length;
      const scored = mine.filter((x) => x.assignmentId && x.percent !== null);
      const avg = scored.length ? Math.round(scored.reduce((t, x) => t + (x.percent ?? 0), 0) / scored.length) : null;
      const last = [...(events.data ?? []).filter((e) => e.studentId === s.id).map((e) => e.at), ...mine.map((x) => x.submittedAt ?? '')].sort().pop() || null;
      const m = summarize(taught, masteryMap(mastery.data ?? [], s.id));
      return { s, mastery: m.percent, counts: m.counts, total: taught.length, done, due: assignedDue.length, missing: assignedDue.length - done, avg, last };
    });
  }, [cls.data, pubs.data, assignments.data, roster.data, subs.data, events.data, mastery.data]);

  const list = rows
    .filter((r) => !q || r.s.fullName.toLowerCase().includes(q.toLowerCase()) || (r.s.username ?? '').includes(q.toLowerCase()))
    .sort((a, b) => {
      switch (sort) {
        case 'mastery':
          return a.mastery - b.mastery;
        case 'average':
          return (a.avg ?? -1) - (b.avg ?? -1);
        case 'missing':
          return b.missing - a.missing;
        case 'active':
          return (a.last ?? '').localeCompare(b.last ?? '');
        default:
          return a.s.fullName.localeCompare(b.s.fullName);
      }
    });

  if (roster.isLoading || !cls.data) return <PageSpinner />;
  const SortBtn = ({ k, children }: { k: Sort; children: React.ReactNode }) => (
    <button type="button" onClick={() => setSort(k)} className={cn('inline-flex items-center gap-1 font-semibold', sort === k ? 'text-ink' : 'text-ink-3 hover:text-ink')}>
      {children}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );

  return (
    <div>
      <PageHeader
        title="Students"
        subtitle={`${roster.data?.length ?? 0} students in ${cls.data.name}. Mastery is measured on the skills of published lessons.`}
        actions={
          <Button icon={<UserPlus className="h-4 w-4" />} onClick={() => setAdding(true)}>
            Add students
          </Button>
        }
      />
      <JoinRequestsCard classId={classId} />
      {(roster.data ?? []).length === 0 ? (
        <EmptyState icon={<UserRound className="h-6 w-6" />} title="No students yet" action={<Button onClick={() => setAdding(true)}>Add students</Button>}>
          Create accounts for your students in one step, or share the class code <strong className="font-mono">{cls.data.joinCode}</strong> so they can sign up and join.
        </EmptyState>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
              <input className="input h-10 w-60 pl-9" placeholder="Search by name or username" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search students" />
            </div>
            <span className="text-sm text-ink-3">
              Class code <strong className="font-mono text-ink">{cls.data.joinCode}</strong>
            </span>
          </div>
          <div className="card overflow-hidden">
            <div className="table-wrap">
              <table className="w-full text-sm">
                <thead className="border-b border-line bg-surface-2/60 text-left text-xs">
                  <tr>
                    <th className="px-4 py-2.5">
                      <SortBtn k="name">Student</SortBtn>
                    </th>
                    <th className="px-3 py-2.5">
                      <SortBtn k="mastery">Mastery (taught)</SortBtn>
                    </th>
                    <th className="px-3 py-2.5 text-right">
                      <SortBtn k="average">Average</SortBtn>
                    </th>
                    <th className="hidden px-3 py-2.5 md:table-cell">
                      <SortBtn k="missing">Completed</SortBtn>
                    </th>
                    <th className="hidden px-3 py-2.5 lg:table-cell">
                      <SortBtn k="active">Last active</SortBtn>
                    </th>
                    <th className="w-12" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {list.map((r) => (
                    <tr key={r.s.id} className="hover:bg-surface-2/40">
                      <td className="px-4 py-2.5">
                        <Link to={`/t/c/${classId}/students/${r.s.id}`} className="flex items-center gap-2.5 hover:text-brand">
                          <Avatar name={r.s.fullName} color={r.s.avatarColor} size={32} />
                          <span>
                            <span className="block font-medium">{r.s.fullName}</span>
                            <span className="block text-xs text-ink-3">{r.s.username ?? r.s.email}</span>
                          </span>
                        </Link>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <ProgressBar value={r.mastery} className="w-24" label={`${r.mastery}% mastery`} />
                          <span className="w-9 text-right font-medium">{r.mastery}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-right">{r.avg !== null ? <span className={cn('rounded-md px-2 py-0.5 font-semibold', scoreCell(r.avg))}>{pct(r.avg)}</span> : <span className="text-ink-3">—</span>}</td>
                      <td className="hidden px-3 py-2.5 md:table-cell">
                        <span className="text-ink-2">
                          {r.done}/{r.due}
                        </span>
                        {r.missing > 0 && (
                          <Badge tone="bad" className="ml-2">
                            {r.missing} missing
                          </Badge>
                        )}
                      </td>
                      <td className="hidden px-3 py-2.5 text-ink-2 lg:table-cell">{r.last ? relative(r.last) : 'Never'}</td>
                      <td className="px-2 py-2.5">
                        <Menu
                          trigger={() => (
                            <IconButton label={`Actions for ${r.s.fullName}`}>
                              <MoreHorizontal className="h-5 w-5" />
                            </IconButton>
                          )}
                        >
                          {(close) => (
                            <>
                              <MenuItem
                                icon={<UserRound className="h-4 w-4" />}
                                onClick={() => {
                                  close();
                                  navigate(`/t/c/${classId}/students/${r.s.id}`);
                                }}
                              >
                                View profile
                              </MenuItem>
                              <MenuItem
                                danger
                                icon={<Trash2 className="h-4 w-4" />}
                                onClick={async () => {
                                  close();
                                  if (!window.confirm(`Remove ${r.s.fullName} from ${cls.data!.name}? Their account and past work are kept.`)) return;
                                  await api().removeStudent(classId, r.s.id);
                                  await qc.invalidateQueries({ queryKey: qk.roster(classId) });
                                  toast({ kind: 'success', title: `${r.s.fullName} removed from the class` });
                                }}
                              >
                                Remove from class
                              </MenuItem>
                            </>
                          )}
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {adding && <AddStudentsModal cls={cls.data} onClose={() => setAdding(false)} />}
    </div>
  );
}

function AddStudentsModal({ cls, onClose }: { cls: ClassRoom; onClose: () => void }) {
  const [tab, setTab] = useState<'create' | 'code'>('create');
  const [names, setNames] = useState('');
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState<NewStudentCredential[] | null>(null);
  const qc = useQueryClient();
  const toast = useToast();
  const list = names
    .split(/\n|,|;/)
    .map((n) => n.trim())
    .filter(Boolean);
  const link = joinLink(cls.joinCode);

  async function create() {
    setBusy(true);
    try {
      const out = await api().createStudentAccounts(cls.id, list);
      setCreated(out);
      await qc.invalidateQueries({ queryKey: qk.roster(cls.id) });
      toast({ kind: 'success', title: `${out.length} account${out.length === 1 ? '' : 's'} created` });
    } catch (e) {
      toast({ kind: 'error', title: 'Could not create accounts', body: (e as Error).message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      title="Add students"
      footer={
        created ? (
          <>
            <Button variant="secondary" icon={<Download className="h-4 w-4" />} onClick={() => downloadText(`${cls.name}-logins.csv`, toCsv([['Name', 'Username', 'Temporary password'], ...created.map((c) => [c.fullName, c.username, c.password])]))}>
              Download CSV
            </Button>
            <Button variant="secondary" icon={<Printer className="h-4 w-4" />} onClick={() => printCards(cls, created)}>
              Print login cards
            </Button>
            <Button onClick={onClose}>Done</Button>
          </>
        ) : tab === 'create' ? (
          <>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={!list.length} loading={busy} onClick={create}>
              Create {list.length || ''} account{list.length === 1 ? '' : 's'}
            </Button>
          </>
        ) : (
          <Button onClick={onClose}>Done</Button>
        )
      }
    >
      {created ? (
        <div className="space-y-3">
          <div className="flex items-start gap-2 rounded-xl bg-warn-soft p-3 text-sm text-warn-ink">
            <KeyRound className="mt-0.5 h-4 w-4 shrink-0" />
            Save or print these now: passwords are shown only once. Students sign in with their username and can change their password in Settings.
          </div>
          <div className="table-wrap rounded-xl border border-line">
            <table className="w-full text-sm">
              <thead className="bg-surface-2/60 text-left text-xs text-ink-3">
                <tr>
                  <th className="px-3 py-2 font-semibold">Name</th>
                  <th className="px-3 py-2 font-semibold">Username</th>
                  <th className="px-3 py-2 font-semibold">Password</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {created.map((c) => (
                  <tr key={c.username}>
                    <td className="px-3 py-2">{c.fullName}</td>
                    <td className="px-3 py-2 font-mono">{c.username}</td>
                    <td className="px-3 py-2 font-mono">{c.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { value: 'create', label: 'Create accounts' },
              { value: 'code', label: 'Share class code' },
            ]}
          />
          {tab === 'create' ? (
            <>
              <p className="text-sm text-ink-3">Paste names from your class list, one per line. Gradileo creates a username and a temporary password for each student, with no email needed.</p>
              <Textarea rows={8} value={names} onChange={(e) => setNames(e.target.value)} placeholder={'Amara Okafor\nLiam Chen\nSofia Martinez'} aria-label="Student names" />
              {list.length > 0 && <div className="text-xs text-ink-3">{list.length} student{list.length === 1 ? '' : 's'} will be added.</div>}
            </>
          ) : (
            <div className="space-y-4 text-center">
              <p className="text-sm text-ink-3">Students create their own account and join with this code.</p>
              <div className="font-mono text-5xl font-bold tracking-[0.3em] text-brand-800">{cls.joinCode}</div>
              <div className="flex items-center gap-2 rounded-xl border border-line bg-surface-2/60 p-2 text-left text-sm">
                <span className="min-w-0 flex-1 truncate px-1 font-mono text-xs">{link}</span>
                <Button
                  size="sm"
                  variant="secondary"
                  icon={<Copy className="h-4 w-4" />}
                  onClick={() => {
                    navigator.clipboard?.writeText(link);
                    toast({ kind: 'success', title: 'Join link copied' });
                  }}
                >
                  Copy link
                </Button>
              </div>
              <p className="text-xs text-ink-3">You can change the code in Class settings if it is shared too widely.</p>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function printCards(cls: ClassRoom, creds: NewStudentCredential[]) {
  const url = `${window.location.origin}${import.meta.env.BASE_URL}login`;
  const cards = creds
    .map(
      (c) => `<div class="card"><div class="brand">Gradileo · ${esc(cls.name)}</div><div class="name">${esc(c.fullName)}</div>
      <div class="row"><span>Username</span><b>${esc(c.username)}</b></div><div class="row"><span>Password</span><b>${esc(c.password)}</b></div>
      <div class="url">Sign in at ${esc(url)}</div></div>`,
    )
    .join('');
  const w = window.open('', '_blank', 'width=900,height=700');
  if (!w) return;
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Login cards · ${esc(cls.name)}</title><style>
    body{font-family:system-ui,-apple-system,Segoe UI,sans-serif;margin:24px;color:#14161f}
    .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
    .card{border:1.5px dashed #8b8fa3;border-radius:12px;padding:14px 16px;break-inside:avoid}
    .brand{font-size:11px;font-weight:700;color:#6a43e3;text-transform:uppercase;letter-spacing:.06em}
    .name{font-size:18px;font-weight:700;margin:6px 0 10px}
    .row{display:flex;justify-content:space-between;font-size:14px;padding:3px 0}.row b{font-family:ui-monospace,Menlo,monospace}
    .url{margin-top:10px;font-size:11px;color:#5b6070}
  </style></head><body><div class="grid">${cards}</div><script>window.onload=()=>window.print()</script></body></html>`);
  w.document.close();
}
