/** Picks a student at random, with a spinning-name animation, for a class question. */
import { useEffect, useRef, useState } from 'react';
import { Shuffle, X } from 'lucide-react';
import type { Profile } from '@/data/types.ts';
import { cn } from '@/lib/cn.ts';

export function StudentPicker({ open, onClose, students, onPicked }: { open: boolean; onClose: () => void; students: Profile[]; onPicked: () => void }) {
  const [name, setName] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [noRepeat, setNoRepeat] = useState(true);
  const picked = useRef(new Set<string>());
  const timer = useRef<number>(0);

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open, onClose]);

  if (!open) return null;
  const pool = students.filter((s) => !noRepeat || !picked.current.has(s.id));
  const spin = () => {
    if (spinning || !students.length) return;
    let choices = pool;
    if (!choices.length) {
      picked.current.clear();
      choices = students;
    }
    const winner = choices[Math.floor(Math.random() * choices.length)];
    setSpinning(true);
    let k = 0;
    const steps = 18;
    const step = () => {
      k++;
      if (k >= steps) {
        setName(winner.fullName);
        picked.current.add(winner.id);
        setSpinning(false);
        onPicked();
        return;
      }
      setName(students[Math.floor(Math.random() * students.length)].fullName);
      // Slows down like a wheel coming to rest.
      timer.current = window.setTimeout(step, 40 + k * k * 0.9);
    };
    step();
  };

  return (
    <div className="fixed inset-0 z-[57] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Pick a student">
      <div className="w-full max-w-xl rounded-3xl border border-line bg-surface p-6 text-center shadow-pop motion-safe:animate-pop">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-700">
            <Shuffle className="h-4 w-4" /> Pick a student
          </div>
          <button type="button" className="rounded-lg p-2 text-ink-2 hover:bg-surface-2" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="my-8 flex min-h-[96px] items-center justify-center">
          {students.length === 0 ? (
            <p className="text-ink-3">No students in this class yet.</p>
          ) : name ? (
            <div key={spinning ? name : `final-${name}`} className={cn('font-display text-5xl font-semibold sm:text-6xl', spinning ? 'text-ink-3' : 'text-brand-800 fx-pop build-in')} aria-live="polite">
              {name}
            </div>
          ) : (
            <p className="text-lg text-ink-3">Who will answer? Spin to choose.</p>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={spin} disabled={spinning || !students.length} className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand px-6 text-base font-semibold text-brand-ink hover:bg-brand-700 disabled:opacity-50">
            <Shuffle className="h-5 w-5" /> {name ? 'Pick again' : 'Spin'}
          </button>
          <label className="inline-flex items-center gap-2 text-sm text-ink-2">
            <input type="checkbox" checked={noRepeat} onChange={(e) => setNoRepeat(e.target.checked)} className="h-4 w-4 accent-[rgb(var(--brand))]" />
            Don’t pick the same student twice
          </label>
        </div>
        {noRepeat && students.length > 0 && <p className="mt-3 text-xs text-ink-3">{pool.length} of {students.length} not picked yet</p>}
      </div>
    </div>
  );
}
