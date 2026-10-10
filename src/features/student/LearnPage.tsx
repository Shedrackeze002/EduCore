import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronDown, Lock, PlayCircle } from 'lucide-react';
import { getCourse, lessonById } from '@engine/curriculum/index.ts';
import { useMastery, usePublications } from '@/data/hooks.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { Card, EmptyState, PageHeader, PageSpinner, ProgressRing } from '@/components/ui/index.ts';
import { MasteryBar, MasteryLegend } from '@/components/mastery/Mastery.tsx';
import { lessonMastery, masteryMap, unitMastery } from '../shared/derive.ts';
import { useStudentClass } from '../shared/useStudentClass.ts';
import { cn } from '@/lib/cn.ts';

export default function LearnPage() {
  const me = useMe();
  const { cls, isLoading } = useStudentClass();
  const pubs = usePublications(cls?.id);
  const mastery = useMastery({ studentId: me.id });
  const map = useMemo(() => masteryMap(mastery.data ?? []), [mastery.data]);
  const published = new Set((pubs.data ?? []).map((p) => p.lessonId));
  const course = cls ? getCourse(cls.courseId) : undefined;
  const [open, setOpen] = useState<string | null>(null);
  if (isLoading || pubs.isLoading) return <PageSpinner />;
  if (!cls || !course) return <EmptyState title="Join a class to see your lessons" />;
  const units = course.units.filter((u) => u.lessons.some((l) => published.has(l)));
  const current = open ?? units[units.length - 1]?.id ?? null;

  return (
    <div>
      <PageHeader title="Learn" subtitle={`${course.title} · ${published.size} of ${course.lessons.length} lessons available`} />
      <MasteryLegend className="mb-5" />
      {units.length === 0 && <EmptyState icon={<BookOpen className="h-6 w-6" />} title="No lessons yet">Your teacher hasn’t published any lessons yet.</EmptyState>}
      <div className="space-y-4">
        {units.map((u) => {
          const um = unitMastery(course.id, u.id, map);
          const isOpen = current === u.id;
          return (
            <Card key={u.id} className="overflow-hidden">
              <button type="button" onClick={() => setOpen(isOpen ? '__none__' : u.id)} className="flex w-full items-center gap-4 p-5 text-left hover:bg-surface-2/50">
                <ProgressRing value={um.percent} size={56} stroke={6} />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wide text-ink-3">Unit {u.number}</div>
                  <div className="text-lg font-semibold">{u.title}</div>
                  <MasteryBar className="mt-2 max-w-md" counts={um.counts} total={um.maxPoints / 100} />
                </div>
                <ChevronDown className={cn('h-5 w-5 text-ink-3 transition', isOpen && 'rotate-180')} />
              </button>
              {isOpen && (
                <div className="border-t border-line">
                  {u.lessons.map((lid) => {
                    const l = lessonById(lid)!;
                    const avail = published.has(lid);
                    const lm = lessonMastery(lid, map);
                    return avail ? (
                      <Link key={lid} to={`/s/learn/${lid}`} className="flex items-center gap-4 border-b border-line px-5 py-3.5 last:border-0 hover:bg-surface-2/60">
                        <span className="w-10 text-sm font-semibold text-ink-3">{l.number}</span>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium">{l.title}</div>
                          <MasteryBar className="mt-1.5 max-w-xs" counts={lm.counts} total={l.skills.length} />
                        </div>
                        <span className="hidden text-sm text-ink-3 sm:block">{lm.percent}%</span>
                        <PlayCircle className="h-5 w-5 text-brand" />
                      </Link>
                    ) : (
                      <div key={lid} className="flex items-center gap-4 border-b border-line px-5 py-3.5 text-ink-3 last:border-0">
                        <span className="w-10 text-sm font-semibold">{l.number}</span>
                        <div className="flex-1">{l.title}</div>
                        <Lock className="h-4 w-4" />
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
