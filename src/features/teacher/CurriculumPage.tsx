import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ClipboardPlus, Eye, GraduationCap, Presentation } from 'lucide-react';
import { getCourse } from '@engine/curriculum/index.ts';
import { summarize, type SkillState } from '@engine/mastery.ts';
import type { AssignmentType } from '@engine/assemble.ts';
import { useClass, useMastery, usePublications, useRoster, useSetPublished } from '@/data/hooks.ts';
import { Badge, Button, Card, Menu, PageHeader, PageSpinner, Switch, useToast } from '@/components/ui/index.ts';
import { TypeIcon } from '../shared/TypeIcon.tsx';
import { masteryMap } from '../shared/derive.ts';
import { useClassId } from './shared.tsx';
import { cn } from '@/lib/cn.ts';

const QUICK: Array<{ type: AssignmentType; label: string; hint: string }> = [
  { type: 'lesson', label: 'Lesson reading', hint: 'Read the lesson and try the checks' },
  { type: 'practice', label: 'Practice', hint: 'Adaptive practice on every skill' },
  { type: 'classwork', label: 'Classwork', hint: 'In-class set with instant feedback' },
  { type: 'homework', label: 'Homework', hint: 'Mixed difficulty, 3 attempts' },
  { type: 'quiz', label: 'Quiz', hint: 'Timed, results after submit' },
];

export function IconLink({ to, label, children }: { to: string; label: string; children: React.ReactNode }) {
  return (
    <Link to={to} aria-label={label} title={label} className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-ink-2 transition hover:bg-surface-2 hover:text-ink">
      {children}
    </Link>
  );
}

export function AssignMenu({ classId, lessonId, label = 'Assign' }: { classId: string; lessonId: string; label?: string }) {
  return (
    <Menu
      trigger={() => (
        <Button size="sm" variant="soft" icon={<ClipboardPlus className="h-4 w-4" />}>
          {label}
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
      )}
    >
      {(close) =>
        QUICK.map((q) => (
          <Link key={q.type} to={`/t/c/${classId}/assignments/new?type=${q.type}&lesson=${lessonId}`} onClick={close} className="flex items-center gap-3 rounded-lg px-2.5 py-2 hover:bg-surface-2">
            <TypeIcon type={q.type} className="h-8 w-8" />
            <span>
              <span className="block text-sm font-medium">{q.label}</span>
              <span className="block text-xs text-ink-3">{q.hint}</span>
            </span>
          </Link>
        ))
      }
    </Menu>
  );
}

export default function CurriculumPage() {
  const classId = useClassId();
  const cls = useClass(classId);
  const pubs = usePublications(classId);
  const roster = useRoster(classId);
  const mastery = useMastery({ classId });
  const setPub = useSetPublished(classId);
  const toast = useToast();
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const published = useMemo(() => new Map((pubs.data ?? []).map((p) => [p.lessonId, p.publishedAt])), [pubs.data]);
  const maps = useMemo(() => (roster.data ?? []).map((s) => masteryMap(mastery.data ?? [], s.id)), [roster.data, mastery.data]);
  const classPct = (skills: string[]) => (maps.length ? Math.round(maps.reduce((s, m: Map<string, SkillState>) => s + summarize(skills, m).percent, 0) / maps.length) : 0);

  if (cls.isLoading || pubs.isLoading) return <PageSpinner />;
  const course = cls.data ? getCourse(cls.data.courseId) : undefined;
  if (!course) return null;

  async function toggle(lessonId: string, on: boolean) {
    await setPub.mutateAsync({ lessonId, published: on });
  }
  async function setUnit(lessons: string[], on: boolean) {
    for (const l of lessons) if (published.has(l) !== on) await setPub.mutateAsync({ lessonId: l, published: on });
    toast({ kind: 'success', title: on ? 'Unit published' : 'Unit hidden from students' });
  }

  return (
    <div>
      <PageHeader title="Curriculum" subtitle={`${course.title}: publish each lesson when you teach it. Students only see published lessons.`} />
      <div className="space-y-5">
        {course.units.map((u) => {
          const pubCount = u.lessons.filter((l) => published.has(l)).length;
          const isCollapsed = collapsed.has(u.id);
          const unitSkills = u.lessons.flatMap((l) => course.lessons.find((x) => x.id === l)?.skills ?? []);
          return (
            <Card key={u.id} className="overflow-hidden">
              <div className="flex flex-wrap items-start gap-4 p-5">
                <button
                  type="button"
                  aria-expanded={!isCollapsed}
                  onClick={() => setCollapsed((s) => (s.has(u.id) ? new Set([...s].filter((x) => x !== u.id)) : new Set([...s, u.id])))}
                  className="flex min-w-0 flex-1 items-start gap-3 text-left"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-display text-lg font-semibold text-brand-700">{u.number}</span>
                  <span className="min-w-0">
                    <span className="block text-lg font-semibold">{u.title}</span>
                    <span className="mt-0.5 block text-sm text-ink-3">{u.description}</span>
                    <span className="mt-2 flex flex-wrap items-center gap-1.5">
                      {u.outcomes.map((o) => (
                        <span key={o} className="rounded-md bg-surface-2 px-1.5 py-0.5 text-xs font-semibold text-ink-2" title={course.outcomes.find((x) => x.code === o)?.text}>
                          {o}
                        </span>
                      ))}
                      <Badge tone={pubCount === u.lessons.length ? 'good' : pubCount ? 'brand' : 'neutral'}>
                        {pubCount}/{u.lessons.length} published
                      </Badge>
                      {pubCount > 0 && <span className="text-xs text-ink-3">· class mastery {classPct(unitSkills)}%</span>}
                    </span>
                  </span>
                  <ChevronDown className={cn('mt-3 h-5 w-5 shrink-0 text-ink-3 transition', isCollapsed && '-rotate-90')} />
                </button>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="secondary" onClick={() => setUnit(u.lessons, pubCount < u.lessons.length)} loading={setPub.isPending}>
                    {pubCount < u.lessons.length ? 'Publish all' : 'Hide all'}
                  </Button>
                  <Button size="sm" variant="soft" icon={<GraduationCap className="h-4 w-4" />} to={`/t/c/${classId}/assignments/new?type=exam&unit=${u.id}`}>
                    Unit test
                  </Button>
                </div>
              </div>
              {!isCollapsed && (
                <div className="border-t border-line">
                  {u.lessons.map((lid) => {
                    const l = course.lessons.find((x) => x.id === lid)!;
                    const on = published.has(lid);
                    return (
                      <div key={lid} className={cn('flex flex-wrap items-center gap-3 border-b border-line px-5 py-3 last:border-0 sm:flex-nowrap', !on && 'bg-surface-2/30')}>
                        <span className="w-10 shrink-0 font-display text-sm font-semibold text-ink-3">{l.number}</span>
                        <Link to={`/t/c/${classId}/lessons/${lid}`} className="min-w-0 flex-1 basis-60 hover:text-brand">
                          <span className="block font-medium">{l.title}</span>
                          <span className="block text-xs text-ink-3">
                            {l.minutes} min · {l.skills.length} skills · {l.outcomes.join(', ')}
                            {on && ` · class mastery ${classPct(l.skills)}%`}
                          </span>
                        </Link>
                        <div className="flex items-center gap-1">
                          <IconLink to={`/t/c/${classId}/lessons/${lid}`} label="Preview lesson">
                            <Eye className="h-[18px] w-[18px]" />
                          </IconLink>
                          <IconLink to={`/present/${classId}/${lid}`} label="Present to class">
                            <Presentation className="h-[18px] w-[18px]" />
                          </IconLink>
                          <AssignMenu classId={classId} lessonId={lid} />
                        </div>
                        <div className="w-28 shrink-0">
                          <Switch checked={on} onChange={(v) => toggle(lid, v)} label={<span className="text-sm">{on ? 'Published' : 'Hidden'}</span>} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
