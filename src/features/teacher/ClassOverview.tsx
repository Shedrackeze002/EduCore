import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, ArrowRight, BookOpen, CalendarClock, ClipboardList, Copy, Megaphone, PenLine, Plus, Presentation, Target, Users } from 'lucide-react';
import { getCourse } from '@engine/curriculum/index.ts';
import { summarize } from '@engine/mastery.ts';
import { TYPE_LABEL, isQuestionType } from '@engine/assemble.ts';
import { api } from '@/data/index.ts';
import { qk, useAnnouncements, useAssignments, useClass, useInsights, useMastery, usePublications, useRoster, useSetPublished, useSubmissions } from '@/data/hooks.ts';
import type { Assignment, Profile, Submission } from '@/data/types.ts';
import { Avatar, Badge, Button, Card, CardBody, CardHeader, EmptyState, Input, PageHeader, PageSpinner, ProgressBar, StatTile, Textarea, useToast } from '@/components/ui/index.ts';
import { JoinRequestsBanner } from './JoinRequests.tsx';
import { InsightCompact } from '@/features/ai/InsightReport.tsx';
import { Markdown } from '@/components/math/Markdown.tsx';
import { dueLabel, relative } from '@/lib/dates.ts';
import { masteryMap } from '../shared/derive.ts';
import { TypeIcon } from '../shared/TypeIcon.tsx';
import { assignmentStats, pct, rosterStatus, useClassId } from './shared.tsx';

export default function ClassOverview() {
  const classId = useClassId();
  const cls = useClass(classId);
  const roster = useRoster(classId);
  const assignments = useAssignments(classId);
  const subs = useSubmissions({ classId });
  const mastery = useMastery({ classId });
  const pubs = usePublications(classId);
  const insights = useInsights(classId, null);
  const toast = useToast();

  const published = useMemo(() => new Set((pubs.data ?? []).map((p) => p.lessonId)), [pubs.data]);
  const course = cls.data ? getCourse(cls.data.courseId) : undefined;
  const taughtSkills = useMemo(() => (course?.lessons ?? []).filter((l) => published.has(l.id)).flatMap((l) => l.skills), [course, published]);

  const perStudent = useMemo(() => {
    const rows = mastery.data ?? [];
    return (roster.data ?? []).map((s) => {
      const m = summarize(taughtSkills, masteryMap(rows, s.id));
      return { student: s, taught: m.percent };
    });
  }, [mastery.data, roster.data, taughtSkills]);

  const now = new Date();
  const recentDue = (assignments.data ?? []).filter((a) => a.status === 'published' && a.dueAt && new Date(a.dueAt) < now && now.getTime() - new Date(a.dueAt).getTime() < 14 * 86_400_000);
  const completion = useMemo(() => {
    let assigned = 0;
    let done = 0;
    for (const a of recentDue) {
      const st = assignmentStats(rosterStatus(a, roster.data ?? [], subs.data ?? []));
      assigned += st.assigned;
      done += st.submitted;
    }
    return assigned ? Math.round((done / assigned) * 100) : null;
  }, [recentDue, roster.data, subs.data]);

  const toGrade = (subs.data ?? []).filter((s) => s.assignmentId && s.status !== 'in_progress' && s.pendingManual > 0);

  if (cls.isLoading || roster.isLoading) return <PageSpinner />;
  if (!cls.data) return <EmptyState title="Class not found" action={<Button to="/t?all">My classes</Button>} />;
  const c = cls.data;
  const avgTaught = perStudent.length ? Math.round(perStudent.reduce((s, x) => s + x.taught, 0) / perStudent.length) : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title={c.name}
        subtitle={
          <span className="inline-flex flex-wrap items-center gap-x-2">
            {c.section && <span>{c.section} ·</span>}
            <span>{course?.title}</span>
            <span>·</span>
            <button
              type="button"
              className="inline-flex items-center gap-1 font-medium text-brand hover:underline"
              onClick={() => {
                navigator.clipboard?.writeText(c.joinCode);
                toast({ kind: 'success', title: 'Join code copied', body: c.joinCode });
              }}
            >
              Join code {c.joinCode} <Copy className="h-3.5 w-3.5" />
            </button>
          </span>
        }
        actions={
          <>
            <Button variant="secondary" to={`/t/c/${classId}/curriculum`} icon={<BookOpen className="h-4 w-4" />}>
              Curriculum
            </Button>
            <Button to={`/t/c/${classId}/assignments/new`} icon={<Plus className="h-4 w-4" />}>
              New assignment
            </Button>
          </>
        }
      />
      <JoinRequestsBanner classId={c.id} />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Students" value={roster.data?.length ?? 0} icon={<Users className="h-4 w-4" />} hint={<Link className="text-brand hover:underline" to={`/t/c/${classId}/students`}>Manage roster</Link>} />
        <StatTile label="Mastery of taught skills" value={`${avgTaught}%`} icon={<Target className="h-4 w-4" />} hint={`${published.size} lesson${published.size === 1 ? '' : 's'} published`} />
        <StatTile label="On-time completion" value={completion === null ? '—' : `${completion}%`} icon={<CalendarClock className="h-4 w-4" />} hint="Work due in the last 14 days" tone={completion !== null && completion < 70 ? 'warn' : 'neutral'} />
        <StatTile label="To grade" value={toGrade.length} icon={<PenLine className="h-4 w-4" />} hint={toGrade.length ? <Link className="text-brand hover:underline" to={`/t/c/${classId}/submissions/${toGrade[0].id}`}>Start grading</Link> : 'All caught up'} tone={toGrade.length ? 'warn' : 'neutral'} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="min-w-0 space-y-6">
          <TeachNext classId={classId} courseId={c.courseId} published={published} />
          <AssignmentsCard classId={classId} assignments={assignments.data ?? []} roster={roster.data ?? []} subs={subs.data ?? []} />
          <AttentionCard classId={classId} perStudent={perStudent} assignments={assignments.data ?? []} subs={subs.data ?? []} />
        </div>
        <div className="min-w-0 space-y-6">
          <InsightCompact insight={insights.data?.[0]} classId={classId} link={`/t/c/${classId}/insights`} />
          <AnnouncementsCard classId={classId} />
          <ActivityCard classId={classId} subs={subs.data ?? []} roster={roster.data ?? []} assignments={assignments.data ?? []} />
        </div>
      </div>
    </div>
  );
}

function TeachNext({ classId, courseId, published }: { classId: string; courseId: string; published: Set<string> }) {
  const course = getCourse(courseId);
  const setPub = useSetPublished(classId);
  const toast = useToast();
  if (!course) return null;
  const lessons = course.lessons;
  const lastIdx = lessons.reduce((m, l, i) => (published.has(l.id) ? i : m), -1);
  const next = lessons.find((l, i) => i > lastIdx && !published.has(l.id)) ?? lessons.find((l) => !published.has(l.id));
  const last = lastIdx >= 0 ? lessons[lastIdx] : undefined;
  return (
    <Card className="overflow-hidden">
      <div className="grid md:grid-cols-2">
        {next ? (
          <div className="border-b border-line p-5 md:border-b-0 md:border-r">
            <div className="text-xs font-semibold uppercase tracking-wide text-brand-700">Teach next · Lesson {next.number}</div>
            <div className="mt-1 text-lg font-semibold leading-snug">{next.title}</div>
            <div className="mt-1 text-sm text-ink-3">
              {next.minutes} min · {next.skills.length} skills · {next.outcomes.join(', ')}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                loading={setPub.isPending}
                onClick={async () => {
                  await setPub.mutateAsync({ lessonId: next.id, published: true });
                  toast({ kind: 'success', title: `Lesson ${next.number} published`, body: 'Students can now open it from Learn.' });
                }}
              >
                Publish
              </Button>
              <Button size="sm" variant="secondary" to={`/present/${classId}/${next.id}`} icon={<Presentation className="h-4 w-4" />}>
                Present
              </Button>
              <Button size="sm" variant="ghost" to={`/t/c/${classId}/lessons/${next.id}`}>
                Preview
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-b border-line p-5 md:border-b-0 md:border-r">
            <div className="font-semibold">Every lesson is published</div>
            <p className="mt-1 text-sm text-ink-3">Use the mastery map to plan review before the final exam.</p>
          </div>
        )}
        {last ? (
          <div className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-3">Just taught · Lesson {last.number}</div>
            <div className="mt-1 text-lg font-semibold leading-snug">{last.title}</div>
            <div className="mt-1 text-sm text-ink-3">Follow up while it is fresh.</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="soft" to={`/t/c/${classId}/assignments/new?type=homework&lesson=${last.id}`}>
                Assign homework
              </Button>
              <Button size="sm" variant="ghost" to={`/t/c/${classId}/assignments/new?type=quiz&lesson=${last.id}`}>
                Quick quiz
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-5">
            <div className="font-semibold">Start with Lesson 1.1</div>
            <p className="mt-1 text-sm text-ink-3">Publish it, present it in class, then assign the follow-up homework in one click.</p>
          </div>
        )}
      </div>
    </Card>
  );
}

function AssignmentsCard({ classId, assignments, roster, subs }: { classId: string; assignments: Assignment[]; roster: Profile[]; subs: Submission[] }) {
  const now = Date.now();
  const list = assignments
    .filter((a) => a.status === 'published' && a.dueAt && Math.abs(new Date(a.dueAt).getTime() - now) < 8 * 86_400_000)
    .sort((a, b) => Math.abs(new Date(a.dueAt!).getTime() - now) - Math.abs(new Date(b.dueAt!).getTime() - now))
    .slice(0, 6)
    .sort((a, b) => a.dueAt!.localeCompare(b.dueAt!));
  return (
    <Card>
      <CardHeader title="Due this week" subtitle="Recent and upcoming deadlines" icon={<ClipboardList className="h-5 w-5" />} action={<Button size="sm" variant="ghost" to={`/t/c/${classId}/assignments`}>All assignments</Button>} />
      <CardBody className="space-y-1 pt-3">
        {list.length === 0 && <p className="py-6 text-center text-sm text-ink-3">Nothing due within a week.</p>}
        {list.map((a) => {
          const st = assignmentStats(rosterStatus(a, roster, subs));
          const due = dueLabel(a.dueAt);
          return (
            <Link key={a.id} to={`/t/c/${classId}/assignments/${a.id}`} className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-surface-2">
              <TypeIcon type={a.type} className="h-9 w-9" />
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{a.title}</div>
                <div className={due.tone === 'overdue' ? 'text-xs text-ink-3' : due.tone === 'urgent' ? 'text-xs font-medium text-warn-ink' : 'text-xs text-ink-3'}>
                  {TYPE_LABEL[a.type]} · {due.tone === 'overdue' ? `Closed ${relative(a.dueAt)}` : due.text}
                </div>
              </div>
              <div className="hidden w-32 sm:block">
                <ProgressBar value={st.assigned ? (st.submitted / st.assigned) * 100 : 0} tone={st.missing ? 'warn' : 'brand'} label="Submitted" />
                <div className="mt-1 text-xs text-ink-3">
                  {st.submitted}/{st.assigned} submitted
                </div>
              </div>
              <div className="w-12 text-right text-sm font-semibold">{isQuestionType(a.type) ? pct(st.average) : ''}</div>
            </Link>
          );
        })}
      </CardBody>
    </Card>
  );
}

function AttentionCard({ classId, perStudent, assignments, subs }: { classId: string; perStudent: Array<{ student: Profile; taught: number }>; assignments: Assignment[]; subs: Submission[] }) {
  const rows = useMemo(() => {
    const now = new Date();
    return perStudent
      .map(({ student, taught }) => {
        const missing = assignments.filter((a) => a.status === 'published' && a.dueAt && new Date(a.dueAt) < now && (a.assignedTo === 'all' || a.assignedTo.includes(student.id)) && !subs.some((s) => s.assignmentId === a.id && s.studentId === student.id && s.status !== 'in_progress')).length;
        const graded = subs.filter((s) => s.studentId === student.id && s.assignmentId && s.percent !== null && s.status !== 'in_progress');
        const avg = graded.length ? Math.round(graded.reduce((x, s) => x + (s.percent ?? 0), 0) / graded.length) : null;
        const reasons: string[] = [];
        if (missing) reasons.push(`${missing} missing`);
        if (avg !== null && avg < 60) reasons.push(`avg ${avg}%`);
        if (taught < 35) reasons.push(`${taught}% mastery`);
        const severity = missing * 2 + (avg !== null && avg < 60 ? (60 - avg) / 10 : 0) + (taught < 35 ? (35 - taught) / 10 : 0);
        return { student, reasons, severity };
      })
      .filter((r) => r.reasons.length)
      .sort((a, b) => b.severity - a.severity)
      .slice(0, 5);
  }, [perStudent, assignments, subs]);
  return (
    <Card>
      <CardHeader title="Needs attention" subtitle="Missing work, low scores or low mastery of taught skills" icon={<AlertTriangle className="h-5 w-5" />} />
      <CardBody className="space-y-1 pt-3">
        {rows.length === 0 && <p className="py-6 text-center text-sm text-ink-3">Everyone is on track.</p>}
        {rows.map((r) => (
          <Link key={r.student.id} to={`/t/c/${classId}/students/${r.student.id}`} className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-surface-2">
            <Avatar name={r.student.fullName} color={r.student.avatarColor} size={34} />
            <span className="min-w-0 flex-1 truncate font-medium">{r.student.fullName}</span>
            <span className="flex flex-wrap justify-end gap-1">
              {r.reasons.map((x) => (
                <Badge key={x} tone={x.includes('missing') ? 'bad' : 'warn'}>
                  {x}
                </Badge>
              ))}
            </span>
            <ArrowRight className="h-4 w-4 text-ink-3" />
          </Link>
        ))}
      </CardBody>
    </Card>
  );
}

function AnnouncementsCard({ classId }: { classId: string }) {
  const ann = useAnnouncements(classId);
  const qc = useQueryClient();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  return (
    <Card>
      <CardHeader title="Announcements" icon={<Megaphone className="h-5 w-5" />} action={!open && <Button size="sm" variant="soft" onClick={() => setOpen(true)}>Post</Button>} />
      <CardBody className="space-y-3 pt-3">
        {open && (
          <form
            className="space-y-2 rounded-xl border border-line p-3"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!title.trim()) return;
              setBusy(true);
              try {
                await api().postAnnouncement(classId, title.trim(), body.trim());
                await qc.invalidateQueries({ queryKey: qk.announcements(classId) });
                toast({ kind: 'success', title: 'Announcement posted', body: 'Students were notified.' });
                setTitle('');
                setBody('');
                setOpen(false);
              } catch (err) {
                toast({ kind: 'error', title: 'Could not post', body: (err as Error).message });
              } finally {
                setBusy(false);
              }
            }}
          >
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={120} />
            <Textarea placeholder="Message (Markdown and $math$ supported)" rows={3} value={body} onChange={(e) => setBody(e.target.value)} />
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" type="submit" loading={busy}>
                Post to class
              </Button>
            </div>
          </form>
        )}
        {(ann.data ?? []).length === 0 && !open && <p className="text-sm text-ink-3">Post reminders, test dates or encouragement. Students are notified instantly.</p>}
        {(ann.data ?? []).slice(0, 3).map((a) => (
          <div key={a.id} className="rounded-xl bg-surface-2/60 p-3">
            <div className="flex items-baseline justify-between gap-2">
              <div className="font-medium">{a.title}</div>
              <div className="shrink-0 text-xs text-ink-3">{relative(a.createdAt)}</div>
            </div>
            {a.body && <Markdown md={a.body} sanitize className="mt-1 text-sm text-ink-2" />}
          </div>
        ))}
      </CardBody>
    </Card>
  );
}

function ActivityCard({ classId, subs, roster, assignments }: { classId: string; subs: Submission[]; roster: Profile[]; assignments: Assignment[] }) {
  const names = new Map(roster.map((p) => [p.id, p]));
  const titles = new Map(assignments.map((a) => [a.id, a]));
  const recent = subs
    .filter((s) => s.submittedAt)
    .sort((a, b) => b.submittedAt!.localeCompare(a.submittedAt!))
    .slice(0, 7);
  return (
    <Card>
      <CardHeader title="Recent activity" />
      <CardBody className="space-y-1 pt-3">
        {recent.length === 0 && <p className="text-sm text-ink-3">Submissions will appear here as students work.</p>}
        {recent.map((s) => {
          const p = names.get(s.studentId);
          const a = s.assignmentId ? titles.get(s.assignmentId) : undefined;
          const label = a ? a.title : `Practice: ${(s.practiceSkillIds ?? []).length} skill${(s.practiceSkillIds ?? []).length === 1 ? '' : 's'}`;
          const inner = (
            <>
              <Avatar name={p?.fullName ?? '?'} color={p?.avatarColor} size={28} />
              <div className="min-w-0 flex-1 text-sm">
                <span className="font-medium">{p?.fullName.split(' ')[0] ?? 'Student'}</span> <span className="text-ink-3">{a ? 'submitted' : 'practised'}</span> <span className="text-ink-2">{label}</span>
                <div className="text-xs text-ink-3">{relative(s.submittedAt)}</div>
              </div>
              {s.percent !== null && (a ? isQuestionType(a.type) : true) && <span className="text-sm font-semibold">{Math.round(s.percent)}%</span>}
            </>
          );
          return a ? (
            <Link key={s.id} to={`/t/c/${classId}/submissions/${s.id}`} className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-surface-2">
              {inner}
            </Link>
          ) : (
            <div key={s.id} className="-mx-2 flex items-center gap-3 px-2 py-2">
              {inner}
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
}

