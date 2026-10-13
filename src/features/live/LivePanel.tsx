/**
 * A live question on a "Your turn" slide: the question as students see it on their devices, and
 * the class's results as they come in. Results are anonymous, so they are safe to project.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, RefreshCw, Radio, Square, Undo2, Users } from 'lucide-react';
import { getSkill, skillInfo } from '@engine/curriculum/index.ts';
import { answerMarkdown } from '@engine/answers.ts';
import { Markdown } from '@/components/math/Markdown.tsx';
import { QuestionView } from '@/components/question/QuestionView.tsx';
import { useLiveAnswers } from '@/data/hooks.ts';
import { demoApi } from '@/data/index.ts';
import type { LiveQuestion } from '@/data/types.ts';
import { useSkillsReady } from '@/lib/useSkills.ts';
import { cn } from '@/lib/cn.ts';
import { liveResults } from './results.ts';

interface Props {
  question: LiveQuestion;
  classSize: number;
  onShowResults: () => void;
  onAskAgain: () => void;
  onEnd: () => void;
  /** Called once when the results show that most of the class got it right. */
  onGreat?: () => void;
  busy?: boolean;
}

const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);

export function LivePanel({ question, classSize, onShowResults, onAskAgain, onEnd, onGreat, busy }: Props) {
  const open = question.status === 'open';
  const loaded = useSkillsReady([question.skillId]);
  const skill = loaded === 'ready' ? getSkill(question.skillId) : undefined;
  const item = useMemo(() => skill?.generate(question.seed, question.difficulty), [skill, question.seed, question.difficulty]);
  const answers = useLiveAnswers(question.id, open);
  const results = useMemo(() => (item ? liveResults(item, answers.data ?? []) : null), [item, answers.data]);
  const [simulating, setSimulating] = useState(false);
  const demo = demoApi();
  const cheered = useRef<string | null>(null);
  useEffect(() => {
    if (open || !results || !results.gradable || results.answered === 0 || cheered.current === question.id) return;
    if (results.correct / results.answered >= 0.8) {
      cheered.current = question.id;
      onGreat?.();
    }
  }, [open, results, question.id, onGreat]);

  if (!item || !results) return <div className="h-[420px] animate-pulse rounded-[28px] bg-surface-2" aria-label="Loading the live question" />;
  const answered = results.answered;
  const btn = 'inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-2xl px-6 py-3.5 text-[22px] font-semibold disabled:opacity-50';

  const total = open || !results.gradable ? classSize : answered;
  const big = open || !results.gradable ? answered : results.correct;
  const bar = pct(big, total);

  return (
    <div className="space-y-6">
      {/* The question as the students see it, laid out like a "Your turn" slide. */}
      <div className="deck-check" style={{ zoom: 1.4 }}>
        <div className="rounded-2xl border-2 border-line bg-surface p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-3">
            <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5', open ? 'bg-bad-soft text-bad-ink' : 'bg-surface-2 text-ink-2')}>
              {open ? <span className="h-2 w-2 animate-pulse rounded-full bg-bad" /> : <Square className="h-3 w-3" />}
              {open ? 'Live on students’ devices' : 'Closed'}
            </span>
            <span className="truncate">{skillInfo(question.skillId)?.name}</span>
          </div>
          <QuestionView item={item} responses={[]} onChange={() => undefined} locked showAnswers={!open} />
          <div>
            {!open && results.gradable && (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-good-soft px-3 py-2 text-[15px]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-good" />
                <div className="min-w-0">
                  <span className="font-semibold">Answer: </span>
                  {item.parts.map((p, i) => (
                    <span key={i} className="mr-3 inline-block">
                      {item.parts.length > 1 && <span className="mr-1 text-ink-3">{String.fromCharCode(97 + i)})</span>}
                      <Markdown md={answerMarkdown(p.answer, p)} inline />
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* The class's results: anonymous, so safe to project. */}
      <div className="grid grid-cols-[300px_minmax(0,1fr)_auto] items-center gap-10 rounded-[28px] bg-surface-2 px-9 py-7">
        <div>
          <div className="flex items-end gap-3">
            <span className="font-display text-[88px] font-semibold leading-none tabular-nums" aria-live="polite">
              {big}
            </span>
            <span className="pb-2 text-[24px] leading-tight text-ink-2">
              of {total}
              <br />
              {open || !results.gradable ? 'answered' : `correct · ${bar}%`}
            </span>
          </div>
          <div className="mt-4 h-4 overflow-hidden rounded-full bg-surface-3">
            <div className={cn('h-full rounded-full transition-[width] duration-500', open || !results.gradable ? 'bg-brand' : 'bg-good')} style={{ width: `${bar}%` }} />
          </div>
        </div>

        <div className="min-w-0">
          {open ? (
            <div className="flex items-start gap-4 text-[24px] leading-snug text-ink-2">
              <Users className="mt-1 h-8 w-8 shrink-0 text-brand" />
              <p>The question is on every student’s EduCore screen. Answers can change until the results are shown.</p>
            </div>
          ) : results.choices ? (
            <div className="space-y-2.5" aria-label="Answers by choice">
              {results.choices.map((c) => (
                <div key={c.id} className="flex items-center gap-4 text-[22px]">
                  <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold', c.correct ? 'bg-good text-white' : 'bg-surface-3 text-ink-2')}>{c.letter}</span>
                  <div className="h-8 flex-1 overflow-hidden rounded-xl bg-surface-3">
                    <div className={cn('h-full rounded-xl', c.correct ? 'bg-good' : 'bg-ink-3/50')} style={{ width: `${pct(c.count, answered)}%` }} />
                  </div>
                  <span className="w-28 text-right tabular-nums text-ink-2">
                    {c.count} · {pct(c.count, answered)}%
                  </span>
                </div>
              ))}
            </div>
          ) : results.wrong.length ? (
            <div>
              <div className="mb-2 text-[18px] font-semibold uppercase tracking-[0.14em] text-ink-3">Common wrong answers</div>
              <div className="flex flex-wrap gap-3">
                {results.wrong.slice(0, 5).map((w) => (
                  <span key={w.text} className="inline-flex max-w-full items-center gap-3 rounded-xl bg-surface px-4 py-2 text-[22px]">
                    <span className="min-w-0 truncate font-mono">{w.text}</span>
                    <span className="shrink-0 tabular-nums text-ink-3">× {w.count}</span>
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-[24px] text-ink-2">{answered ? 'Everyone who answered got it right.' : 'No answers came in.'}</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {open ? (
            <>
              <button type="button" onClick={onShowResults} disabled={busy} className={cn(btn, 'bg-brand text-brand-ink hover:bg-brand-700')}>
                <Square className="h-6 w-6" /> Stop and show results
              </button>
              {demo && (
                <button
                  type="button"
                  disabled={simulating}
                  onClick={async () => {
                    setSimulating(true);
                    try {
                      await demo.simulateLiveAnswers(question.id);
                    } finally {
                      setSimulating(false);
                    }
                  }}
                  className={cn(btn, 'border-2 border-line-strong bg-surface text-ink hover:bg-surface-2')}
                >
                  <Radio className="h-6 w-6" /> Add the sample class’s answers
                </button>
              )}
            </>
          ) : (
            <>
              <button type="button" onClick={onAskAgain} disabled={busy} className={cn(btn, 'bg-brand text-brand-ink hover:bg-brand-700')}>
                <RefreshCw className="h-6 w-6" /> Ask a similar question
              </button>
              <button type="button" onClick={onEnd} className={cn(btn, 'border-2 border-line-strong bg-surface text-ink hover:bg-surface-2')}>
                <Undo2 className="h-6 w-6" /> Back to the slide
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
