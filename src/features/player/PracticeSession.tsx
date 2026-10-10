/**
 * Adaptive, self-directed practice. Questions interleave the chosen skills, adjust
 * difficulty from the student's estimated mastery, and give instant feedback.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowRight, Check, Eye, Flag, Flame, Sparkles, Target, TrendingUp, X } from 'lucide-react';
import { itemFromRef, nextAdaptiveRef, type StoredResponse } from '@engine/assemble.ts';
import { gradeItem, type ItemResult } from '@engine/grade.ts';
import { applyObservation, DEFAULT_BKT, emptySkillState, LEVEL_LABEL, type SkillState } from '@engine/mastery.ts';
import { freshSeed } from '@engine/rng.ts';
import { getSkill } from '@engine/curriculum/index.ts';
import type { ItemRef } from '@engine/types.ts';
import { api } from '@/data/index.ts';
import { useMastery } from '@/data/hooks.ts';
import type { Submission } from '@/data/types.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { FocusShell } from '@/components/layout/AppShell.tsx';
import { Button, PageSpinner, useToast } from '@/components/ui/index.ts';
import { HintPanel, QuestionView, SolutionPanel } from '@/components/question/QuestionView.tsx';
import { MasterySwatch } from '@/components/mastery/Mastery.tsx';
import { useStudentClass } from '../shared/useStudentClass.ts';
import { cn } from '@/lib/cn.ts';

const GOAL_STREAK = 5;
const MAX_QUESTIONS = 25;

export default function PracticeSession() {
  const [params] = useSearchParams();
  const skillIds = useMemo(() => (params.get('skills') ?? '').split(',').filter((s) => getSkill(s)), [params]);
  const me = useMe();
  const { cls } = useStudentClass();
  const mastery = useMastery({ studentId: me.id });
  const [sub, setSub] = useState<Submission | null>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!cls || started.current || !skillIds.length) return;
    started.current = true;
    api().startPractice(cls.id, skillIds).then(setSub);
  }, [cls, skillIds]);
  if (!skillIds.length) return <PageSpinner label="No skills selected." />;
  if (!sub || mastery.isLoading) return <PageSpinner label="Getting your practice ready…" />;
  const initial = new Map<string, SkillState>((mastery.data ?? []).filter((m) => skillIds.includes(m.skillId)).map((m) => [m.skillId, m]));
  return <Session sub={sub} skillIds={skillIds} initial={initial} />;
}

function Session({ sub, skillIds, initial }: { sub: Submission; skillIds: string[]; initial: Map<string, SkillState> }) {
  const navigate = useNavigate();
  const toast = useToast();
  const qc = useQueryClient();
  const [states, setStates] = useState(initial);
  const [items, setItems] = useState<ItemRef[]>([]);
  const [responses, setResponses] = useState<Record<number, StoredResponse>>({});
  const [result, setResult] = useState<ItemResult | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [history, setHistory] = useState<boolean[]>([]);
  const [finishing, setFinishing] = useState(false);
  const [summary, setSummary] = useState<Submission | null>(null);
  const turn = useRef(0);

  const pickNext = (st: Map<string, SkillState>, hist: boolean[]): ItemRef => {
    // Interleave: rotate through skills, favouring the weakest.
    const order = [...skillIds].sort((a, b) => (st.get(a)?.pKnown ?? 0) - (st.get(b)?.pKnown ?? 0));
    const skillId = skillIds.length === 1 ? skillIds[0] : turn.current % 3 === 2 ? order[order.length - 1] : order[turn.current % Math.min(2, order.length)];
    turn.current++;
    return nextAdaptiveRef(skillId, st.get(skillId), freshSeed(), hist);
  };

  useEffect(() => {
    if (items.length === 0) setItems([pickNext(states, [])]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const idx = items.length - 1;
  const ref = items[idx];
  const item = useMemo(() => (ref ? itemFromRef(ref, { sections: [], custom: [] }, 'practice') : null), [ref]);
  const resp = responses[idx] ?? { answers: [], hintsUsed: 0 };
  const streak = useMemo(() => {
    let s = 0;
    for (let i = history.length - 1; i >= 0 && history[i]; i--) s++;
    return s;
  }, [history]);

  const finish = async (finalItems = items, finalResponses = responses) => {
    setFinishing(true);
    try {
      // Only submit questions that were actually answered.
      const keep = finalItems.map((_, i) => i).filter((i) => finalResponses[i]?.checked);
      const its = keep.map((i) => finalItems[i]);
      const rs: Record<number, StoredResponse> = {};
      keep.forEach((i, k) => (rs[k] = finalResponses[i]));
      if (!its.length) {
        navigate(-1);
        return;
      }
      const done = await api().submit(sub.id, { responses: rs, items: its });
      await qc.invalidateQueries({ queryKey: ['mastery'] });
      await qc.invalidateQueries({ queryKey: ['submissions'] });
      setSummary(done);
    } catch (e) {
      toast({ kind: 'error', title: 'Could not save practice', body: (e as Error).message });
    } finally {
      setFinishing(false);
    }
  };

  if (summary) return <Summary sub={summary} skillIds={skillIds} />;
  if (!item || !ref || 'custom' in ref) return <PageSpinner />;

  const check = () => {
    const r = gradeItem(item, resp.answers);
    setResult(r);
    if (r.parts.some((p) => p.invalid) && !r.correct) return;
    const assisted = resp.hintsUsed > 0;
    const def = getSkill(ref.skillId)!;
    const params = DEFAULT_BKT[def.format];
    const next = new Map(states);
    next.set(ref.skillId, applyObservation(states.get(ref.skillId) ?? emptySkillState(ref.skillId, params), { correct: r.correct, assisted, sessionId: sub.id, at: new Date().toISOString() }, params));
    setStates(next);
    setHistory((h) => [...h, r.correct && !assisted]);
    setResponses((x) => ({ ...x, [idx]: { ...resp, checked: true, at: new Date().toISOString() } }));
  };

  const checked = !!responses[idx]?.checked;
  const nextQ = () => {
    if (items.length >= MAX_QUESTIONS) {
      void finish();
      return;
    }
    setItems((xs) => [...xs, pickNext(states, history)]);
    setResult(null);
    setRevealed(false);
  };
  const reachedGoal = streak >= GOAL_STREAK;

  return (
    <FocusShell>
      <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center gap-3 px-4">
          <button type="button" onClick={() => finish()} className="rounded-lg p-2 text-ink-2 hover:bg-surface-2" aria-label="Finish practice">
            <X className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">Practice: {skillIds.map((s) => getSkill(s)?.name).join(', ')}</div>
            <div className="text-xs text-ink-3">Question {items.length} · goal: {GOAL_STREAK} in a row</div>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl bg-surface-2 px-3 py-1.5 text-sm font-semibold" title="Correct answers in a row">
            <Flame className="h-4 w-4" style={{ color: streak ? 'rgb(var(--accent))' : undefined }} /> {streak}
          </div>
          <Button size="sm" variant="secondary" icon={<Flag className="h-4 w-4" />} loading={finishing} onClick={() => finish()}>
            Finish
          </Button>
        </div>
        <div className="mx-auto flex max-w-4xl flex-wrap gap-3 px-4 pb-2.5">
          {skillIds.map((s) => {
            const st = states.get(s) ?? emptySkillState(s);
            return (
              <div key={s} className="flex min-w-[180px] flex-1 items-center gap-2 text-xs">
                <MasterySwatch level={st.level} />
                <span className="truncate text-ink-2">{getSkill(s)?.name}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3">
                  <div className="h-full rounded-full bg-m3 transition-[width] duration-500" style={{ width: `${Math.round(st.pKnown * 100)}%` }} />
                </div>
                <span className="w-16 text-right text-ink-3">{LEVEL_LABEL[st.level]}</span>
              </div>
            );
          })}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-32 pt-6">
        {reachedGoal && (
          <div className="mb-4 flex animate-pop items-center gap-3 rounded-2xl border border-good/30 bg-good-soft p-4">
            <Sparkles className="h-5 w-5 text-good" />
            <div className="flex-1 text-sm">
              <strong>{GOAL_STREAK} in a row!</strong> You can finish now, or keep going to strengthen your mastery.
            </div>
            <Button size="sm" onClick={() => finish()} loading={finishing}>
              Finish
            </Button>
          </div>
        )}
        <div className="card p-5 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-3">
            <Target className="h-4 w-4" /> {getSkill(ref.skillId)?.name}
            <span className="rounded-md bg-surface-2 px-1.5 py-0.5 normal-case tracking-normal">{['', 'Warm-up', 'Core', 'Challenge'][ref.difficulty]}</span>
          </div>
          <QuestionView
            key={idx}
            item={item}
            responses={resp.answers}
            onChange={(answers) => !checked && setResponses((x) => ({ ...x, [idx]: { ...resp, answers } }))}
            result={result}
            locked={checked}
            showAnswers={checked && revealed}
            onEnter={() => (!checked ? check() : nextQ())}
            autoFocus
          />
          <div className="mt-5 space-y-3">
            {!checked && <HintPanel hints={item.hints} used={resp.hintsUsed} onReveal={() => setResponses((x) => ({ ...x, [idx]: { ...resp, hintsUsed: resp.hintsUsed + 1 } }))} />}
            {checked && result && (
              <div className={cn('flex animate-pop items-center gap-2 rounded-xl px-4 py-3 font-semibold', result.correct ? 'bg-good-soft text-good-ink' : 'bg-bad-soft text-bad-ink')}>
                {result.correct ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                {result.correct ? 'Correct!' : 'Not quite — read the worked solution, then try the next one.'}
              </div>
            )}
            {checked && !revealed && (
              <Button variant="secondary" size="sm" icon={<Eye className="h-4 w-4" />} onClick={() => setRevealed(true)}>
                {result?.correct ? 'See the worked solution' : 'Show worked solution'}
              </Button>
            )}
            {checked && revealed && <SolutionPanel item={item} />}
          </div>
        </div>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-end gap-3 px-4 py-3">
          {!checked ? (
            <Button size="lg" onClick={check} disabled={!resp.answers.some((a) => a && a.trim())}>
              Check answer
            </Button>
          ) : (
            <Button size="lg" onClick={nextQ}>
              Next question <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </footer>
    </FocusShell>
  );
}

function Summary({ sub, skillIds }: { sub: Submission; skillIds: string[] }) {
  const navigate = useNavigate();
  const correct = Math.round(sub.score ?? 0);
  const total = sub.maxScore ?? 0;
  return (
    <FocusShell>
      <div className="mx-auto max-w-xl px-4 py-14">
        <div className="card p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-good-soft text-good">
            <TrendingUp className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold">Practice saved</h1>
          <p className="mt-1 text-ink-3">
            You answered {correct} of {total} correctly.
          </p>
          <div className="mt-6 space-y-2 text-left">
            {skillIds.map((s) => {
              const ch = sub.masteryChanges?.find((c) => c.skillId === s);
              return (
                <div key={s} className="flex items-center gap-3 rounded-xl bg-surface-2 px-3 py-2.5 text-sm">
                  <span className="min-w-0 flex-1 truncate font-medium">{getSkill(s)?.name}</span>
                  {ch ? (
                    <span className="flex items-center gap-1.5">
                      <MasterySwatch level={ch.before as never} />
                      <ArrowRight className="h-3.5 w-3.5 text-ink-3" />
                      <MasterySwatch level={ch.after as never} />
                      <span className="font-medium">{LEVEL_LABEL[ch.after as keyof typeof LEVEL_LABEL]}</span>
                    </span>
                  ) : (
                    <span className="text-ink-3">No change</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button variant="secondary" onClick={() => navigate('/s/progress')}>
              My progress
            </Button>
            <Button onClick={() => navigate('/s')}>Back to home</Button>
          </div>
        </div>
      </div>
    </FocusShell>
  );
}
