/**
 * Students' questions in present mode: each new question pops up over the slide to answer or skip,
 * "Answer" shows it large while the teacher answers, and the "Questions" slide before the end lists
 * everything the class asked. A student who kept their name off the class's screen shows as
 * "A student"; the teacher sees names on the lesson page.
 */
import { useEffect } from 'react';
import { CheckCircle2, ChevronDown, MessageCircleQuestion, SkipForward, X } from 'lucide-react';
import type { ClassQuestion } from '@/data/types.ts';
import { screenName } from '@/lib/names.ts';
import { cn } from '@/lib/cn.ts';

/** Who asked, as the class's screen shows it. */
export const askedBy = (q: ClassQuestion) => (q.anonymous || !q.studentName ? 'A student asks' : `${screenName(q.studentName)} asks`);

/** The "Questions" slide's body, in slide pixels. */
export function QuestionsSlideBody({ questions, onAnswer }: { questions: ClassQuestion[]; onAnswer: (q: ClassQuestion) => void }) {
  const two = questions.length > 3;
  return (
    <ul className={cn('grid gap-6', two && 'grid-cols-2')}>
      {questions.map((q, i) => {
        const answered = q.status === 'answered';
        return (
          <li key={q.id} className={cn('build-in fx-rise flex flex-col gap-4 rounded-[28px] border-2 px-9 py-7', answered ? 'border-good/30 bg-good-soft/50' : 'border-line bg-surface')} style={{ animationDelay: `${i * 90}ms` }}>
            <div className="flex items-center justify-between gap-4 text-[22px] font-semibold">
              <span className="text-ink-3">{askedBy(q)}</span>
              {answered ? (
                <span className="inline-flex items-center gap-2 text-good">
                  <CheckCircle2 className="h-7 w-7" /> Answered
                </span>
              ) : (
                <button type="button" onClick={() => onAnswer(q)} className="rounded-xl bg-brand px-5 py-2 text-[20px] text-brand-ink hover:bg-brand-700">
                  {q.status === 'skipped' ? 'Answer now' : 'Answer'}
                </button>
              )}
            </div>
            <p className={cn('break-words font-display leading-snug', two ? 'text-[30px]' : 'text-[36px]', answered && 'text-ink-2')}>{q.body}</p>
          </li>
        );
      })}
    </ul>
  );
}

/** The newest waiting question, over the corner of the slide. */
export function QuestionPopup({ question, waiting, onAnswer, onSkip, onLater }: { question: ClassQuestion; waiting: number; onAnswer: () => void; onSkip: () => void; onLater: () => void }) {
  return (
    <div className="fixed bottom-[84px] right-4 z-40 w-[min(440px,calc(100vw-2rem))] animate-[fx-rise_0.35s_ease-out] rounded-2xl border border-line bg-surface p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]" role="alertdialog" aria-label="A question from the class">
      <div className="flex items-center gap-2 text-sm font-semibold text-info-ink">
        <MessageCircleQuestion className="h-5 w-5" />
        <span className="flex-1">{askedBy(question)}</span>
        {waiting > 1 && <span className="rounded-full bg-info-soft px-2 py-0.5 text-xs">1 of {waiting}</span>}
        <button type="button" onClick={onLater} className="rounded-lg p-1 text-ink-3 hover:bg-surface-2" aria-label="Later" title="Later">
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-2 max-h-40 overflow-y-auto break-words text-lg leading-snug text-ink">{question.body}</p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={onAnswer} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 font-semibold text-brand-ink hover:bg-brand-700">
          <MessageCircleQuestion className="h-5 w-5" /> Answer
        </button>
        <button type="button" onClick={onSkip} className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-semibold text-ink-2 ring-1 ring-line-strong hover:bg-surface-2">
          <SkipForward className="h-5 w-5" /> Skip
        </button>
      </div>
    </div>
  );
}

/** The question large on the screen while the teacher answers it. */
export function AnsweringView({ question, onDone }: { question: ClassQuestion; onDone: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault();
        onDone();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDone]);
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0d0f18]/90 p-6" role="dialog" aria-modal="true" aria-label="Answering a question from the class">
      <div className="relative w-full max-w-5xl rounded-[32px] bg-surface px-10 py-12 shadow-2xl sm:px-16">
        <button type="button" onClick={onDone} className="absolute right-5 top-5 rounded-lg p-2 text-ink-3 hover:bg-surface-2" aria-label="Close">
          <X className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-3 text-xl font-semibold text-info-ink sm:text-2xl">
          <MessageCircleQuestion className="h-8 w-8" /> {askedBy(question)}
        </div>
        <p className="mt-6 break-words font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl">{question.body}</p>
        <div className="mt-10 flex justify-end">
          <button type="button" onClick={onDone} autoFocus className="rounded-2xl bg-brand px-8 py-3 text-lg font-semibold text-brand-ink hover:bg-brand-700">
            Back to the slide
          </button>
        </div>
      </div>
    </div>
  );
}
