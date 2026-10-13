/** A banner on every student page while the teacher has a live question open for the class. */
import { Link, useLocation } from 'react-router-dom';
import { useLiveAnswers, useLiveQuestion } from '@/data/hooks.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { useStudentClass } from '@/features/shared/useStudentClass.ts';
import { cn } from '@/lib/cn.ts';

export function LiveBanner() {
  const { cls } = useStudentClass();
  const me = useMe();
  const live = useLiveQuestion(cls?.id);
  const q = live.data?.status === 'open' ? live.data : null;
  const mine = useLiveAnswers(q?.id);
  const { pathname } = useLocation();
  if (!q || pathname === '/s/live') return null;
  const answered = (mine.data ?? []).some((a) => a.studentId === me.id);
  return (
    <Link
      to="/s/live"
      className={cn('mb-6 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-card transition hover:brightness-105', answered ? 'border border-line bg-surface text-ink-2' : 'bg-brand text-brand-ink')}
    >
      <span className="relative flex h-3 w-3 shrink-0">
        {!answered && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />}
        <span className={cn('relative inline-flex h-3 w-3 rounded-full', answered ? 'bg-good' : 'bg-white')} />
      </span>
      <span className="min-w-0 flex-1 text-sm font-semibold sm:text-base">{answered ? 'Answer sent. You can change it until your teacher shows the results.' : 'Your teacher asked the class a question.'}</span>
      <span className={cn('shrink-0 rounded-xl px-3 py-1.5 text-sm font-semibold', answered ? 'bg-surface-2' : 'bg-white/20')}>{answered ? 'View' : 'Answer now'}</span>
    </Link>
  );
}
