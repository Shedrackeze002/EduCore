import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CalendarClock, Flame, Megaphone, PlayCircle, Sparkles, Target } from 'lucide-react';
import { lessonById, getCourse } from '@engine/curriculum/index.ts';
import { analyzeStudent, buildStudentContext } from '@engine/ai/index.ts';
import { TYPE_LABEL } from '@engine/assemble.ts';
import { useAnnouncements, useAssignments, useEvents, useMastery, usePublications, useSubmissions } from '@/data/hooks.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { Badge, Button, Card, CardBody, CardHeader, EmptyState, PageSpinner, ProgressRing } from '@/components/ui/index.ts';
import { MasteryChip } from '@/components/mastery/Mastery.tsx';
import { Markdown } from '@/components/math/Markdown.tsx';
import { dueLabel, greeting, relative } from '@/lib/dates.ts';
import { courseMastery, masteryMap, recommendedSkills, skillLabel, sortByDue, studentWork, type StudentWork } from '../shared/derive.ts';
import { useStudentClass } from '../shared/useStudentClass.ts';
import { TypeIcon } from '../shared/TypeIcon.tsx';
import { cn } from '@/lib/cn.ts';

export default function StudentHome() {
  const me = useMe();
  const { cls, isLoading } = useStudentClass();
  const assignments = useAssignments(cls?.id);
  const subs = useSubmissions({ studentId: me.id });
  const mastery = useMastery({ studentId: me.id });
  const pubs = usePublications(cls?.id);
  const events = useEvents(cls?.id, me.id, 30);
  const ann = useAnnouncements(cls?.id);

  const work = useMemo(() => studentWork(assignments.data ?? [], subs.data ?? []), [assignments.data, subs.data]);
  const map = useMemo(() => masteryMap(mastery.data ?? []), [mastery.data]);
  const todo = sortByDue(work.filter((w) => w.status === 'todo' || w.status === 'in_progress' || w.status === 'missing'));
  const missing = todo.filter((w) => w.status === 'missing');
  const upcoming = todo.filter((w) => w.status !== 'missing');
  const next = upcoming[0] ?? missing[0];
  const published = (pubs.data ?? []).sort((a, b) => a.publishedAt.localeCompare(b.publishedAt)).map((p) => p.lessonId);
  const recs = recommendedSkills(published, map, 4);
  const course = cls ? getCourse(cls.courseId) : undefined;
  const cm = cls ? courseMastery(cls.courseId, map) : null;
  const latestLesson = published.length ? lessonById(published[published.length - 1]) : undefined;

  const coach = useMemo(() => {
    if (!cls || !mastery.data || !events.data) return null;
    const ctx = buildStudentContext(
      {
        courseId: cls.courseId,
        className: cls.name,
        students: [{ id: me.id, name: me.fullName }],
        taughtLessonIds: published,
        mastery: mastery.data,
        events: events.data.map((e) => ({ studentId: e.studentId, skillId: e.skillId, correct: e.correct, assisted: e.assisted, at: e.at, prompt: e.prompt, answer: e.answer, expected: e.expected })),
        assignments: (assignments.data ?? []).map((a) => ({ id: a.id, title: a.title, type: a.type, dueAt: a.dueAt, assignedTo: a.assignedTo, status: a.status })),
        submissions: (subs.data ?? []).filter((s) => s.assignmentId).map((s) => ({ assignmentId: s.assignmentId!, studentId: s.studentId, status: s.status, submittedAt: s.submittedAt, percent: s.percent })),
      },
      me.id,
    );
    return analyzeStudent(ctx);
  }, [cls, mastery.data, events.data, assignments.data, subs.data, published, me.id, me.fullName]);

  const activeDays = useMemo(() => {
    const days = new Set((events.data ?? []).filter((e) => Date.now() - new Date(e.at).getTime() < 7 * 86_400_000).map((e) => e.at.slice(0, 10)));
    return days.size;
  }, [events.data]);

  if (isLoading) return <PageSpinner />;
  if (!cls)
    return (
      <EmptyState icon={<BookOpen className="h-6 w-6" />} title="Join your class to get started" action={<Button to="/s/join">Enter a class code</Button>}>
        Your teacher will give you a 6-character class code.
      </EmptyState>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold sm:text-[28px]">
          {greeting()}, {me.fullName.split(' ')[0]}
        </h1>
        <p className="text-ink-3">
          {cls.name}
          {cls.section ? ` · ${cls.section}` : ''} · {course?.title}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        {next ? <UpNext w={next} /> : <AllDone />}
        <Card className="flex items-center gap-5 p-5">
          <ProgressRing value={cm?.percent ?? 0} size={96} stroke={9} sublabel="mastery" />
          <div className="min-w-0 flex-1">
            <div className="text-sm text-ink-3">Course mastery</div>
            <div className="mt-1 text-sm text-ink-2">
              <strong className="text-ink">{cm?.counts.mastered ?? 0}</strong> mastered · <strong className="text-ink">{cm?.counts.proficient ?? 0}</strong> proficient · <strong className="text-ink">{cm?.counts.familiar ?? 0}</strong> familiar
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <Flame className={cn('h-4 w-4', activeDays ? 'text-accent' : 'text-ink-3')} style={{ color: activeDays ? 'rgb(var(--accent))' : undefined }} />
              <span className="text-ink-2">
                Practised on <strong>{activeDays}</strong> of the last 7 days
              </span>
            </div>
            <Link to="/s/progress" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
              See my progress <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="min-w-0 space-y-6">
          <Card>
            <CardHeader title="To do" subtitle={`${upcoming.length} upcoming${missing.length ? ` · ${missing.length} missing` : ''}`} icon={<CalendarClock className="h-5 w-5" />} action={<Button variant="ghost" size="sm" to="/s/work">View all</Button>} />
            <CardBody className="space-y-2 pt-4">
              {todo.length === 0 && <p className="py-6 text-center text-sm text-ink-3">Nothing due. Great time to practise a skill!</p>}
              {todo.slice(0, 6).map((w) => (
                <WorkRow key={w.assignment.id} w={w} />
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Recommended practice" subtitle="Short, focused sets build mastery fastest." icon={<Target className="h-5 w-5" />} />
            <CardBody className="grid gap-3 pt-4 sm:grid-cols-2">
              {recs.length === 0 && <p className="text-sm text-ink-3">When your teacher publishes lessons, recommended skills appear here.</p>}
              {recs.map((r) => (
                <Link key={r.skillId} to={`/s/practice?skills=${r.skillId}`} className="group rounded-2xl border border-line p-4 transition hover:border-brand-300 hover:bg-brand-50/40">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-ink">{skillLabel(r.skillId)}</div>
                    <PlayCircle className="h-5 w-5 shrink-0 text-brand opacity-70 group-hover:opacity-100" />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <MasteryChip level={r.level} />
                    <span className="text-xs text-ink-3">{r.reason === 'weak' ? 'Needs practice' : r.reason === 'review' ? 'Review due' : 'Not started'}</span>
                  </div>
                </Link>
              ))}
            </CardBody>
          </Card>
        </div>

        <div className="min-w-0 space-y-6">
          {coach?.studentNote && (
            <Card className="border-brand-200 bg-gradient-to-br from-brand-50 to-surface">
              <CardBody>
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-800">
                  <Sparkles className="h-4 w-4" /> Your study coach
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{coach.studentNote}</p>
                {coach.strengths.length > 0 && (
                  <div className="mt-3 text-sm text-ink-3">
                    Strongest: <span className="font-medium text-ink-2">{coach.strengths.slice(0, 2).map((s) => skillLabel(s.skillId ?? '')).join(', ')}</span>
                  </div>
                )}
              </CardBody>
            </Card>
          )}
          {latestLesson && (
            <Card>
              <CardHeader title="Continue learning" icon={<BookOpen className="h-5 w-5" />} />
              <CardBody className="pt-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-ink-3">Lesson {latestLesson.number}</div>
                <div className="mt-1 font-semibold">{latestLesson.title}</div>
                <Button className="mt-4" variant="soft" to={`/s/learn/${latestLesson.id}`}>
                  Open lesson <ArrowRight className="h-4 w-4" />
                </Button>
              </CardBody>
            </Card>
          )}
          <Card>
            <CardHeader title="Announcements" icon={<Megaphone className="h-5 w-5" />} />
            <CardBody className="space-y-4 pt-4">
              {(ann.data ?? []).length === 0 && <p className="text-sm text-ink-3">No announcements yet.</p>}
              {(ann.data ?? []).slice(0, 3).map((a) => (
                <div key={a.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="font-medium">{a.title}</div>
                    <div className="shrink-0 text-xs text-ink-3">{relative(a.createdAt)}</div>
                  </div>
                  <Markdown md={a.body} className="mt-1 text-sm text-ink-2" sanitize />
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function UpNext({ w }: { w: StudentWork }) {
  const due = dueLabel(w.assignment.dueAt);
  return (
    <div className="relative overflow-hidden rounded-2xl bg-brand-900 p-6 text-white shadow-pop">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/40 blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-2 text-sm text-white/75">
          <Badge tone={due.tone === 'overdue' ? 'bad' : due.tone === 'urgent' ? 'warn' : 'brand'}>{w.status === 'missing' ? 'Missing' : due.text}</Badge>
          <span>{TYPE_LABEL[w.assignment.type]}</span>
        </div>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-snug">{w.assignment.title}</h2>
        {w.assignment.instructions && <p className="mt-2 line-clamp-2 max-w-xl text-white/80">{w.assignment.instructions}</p>}
        <Link to={`/s/work/${w.assignment.id}`} className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 font-semibold text-brand-900 hover:bg-brand-50">
          {w.status === 'in_progress' ? 'Continue' : 'Start'} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function AllDone() {
  return (
    <div className="rounded-2xl border border-good/30 bg-good-soft/50 p-6">
      <div className="font-display text-2xl font-semibold">You’re all caught up 🎉</div>
      <p className="mt-2 text-ink-2">No assignments due. Practise a recommended skill below to keep your mastery growing.</p>
    </div>
  );
}

export function WorkRow({ w }: { w: StudentWork }) {
  const due = dueLabel(w.assignment.dueAt);
  return (
    <Link to={`/s/work/${w.assignment.id}`} className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-surface-2">
      <TypeIcon type={w.assignment.type} />
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">{w.assignment.title}</div>
        <div className={cn('text-xs', due.tone === 'overdue' ? 'text-bad-ink' : due.tone === 'urgent' ? 'text-warn-ink' : 'text-ink-3')}>
          {TYPE_LABEL[w.assignment.type]} · {due.text}
        </div>
      </div>
      {w.status === 'missing' ? <Badge tone="bad">Missing</Badge> : w.status === 'in_progress' ? <Badge tone="info">In progress</Badge> : w.status === 'done' || w.status === 'late_done' ? <Badge tone="good">Done</Badge> : null}
    </Link>
  );
}
