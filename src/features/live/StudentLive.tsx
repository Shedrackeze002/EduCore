/** The page where a student answers the teacher's live class question. */
import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Radio, Send, XCircle } from 'lucide-react';
import { getSkill, skillInfo } from '@engine/curriculum/index.ts';
import { gradeItem } from '@engine/grade.ts';
import { useLiveAnswers, useLiveQuestion, useSubmitLiveAnswer } from '@/data/hooks.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { useStudentClass } from '@/features/shared/useStudentClass.ts';
import { Button, Card, CardBody, EmptyState, PageHeader, PageSpinner } from '@/components/ui/index.ts';
import { QuestionView, SolutionPanel } from '@/components/question/QuestionView.tsx';
import { useSkillsReady } from '@/lib/useSkills.ts';
import { cn } from '@/lib/cn.ts';

export default function LiveAnswerPage() {
  const { cls, isLoading } = useStudentClass();
  const me = useMe();
  const live = useLiveQuestion(cls?.id);
  const q = live.data ?? null;
  const loaded = useSkillsReady(q ? [q.skillId] : []);
  const skill = q && loaded === 'ready' ? getSkill(q.skillId) : undefined;
  const item = useMemo(() => (q && skill ? skill.generate(q.seed, q.difficulty) : undefined), [q, skill]);
  const mine = useLiveAnswers(q?.id);
  const myAnswer = (mine.data ?? []).find((a) => a.studentId === me.id);
  const submit = useSubmitLiveAnswer(cls?.id);
  const [responses, setResponses] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Start from the answer already sent (or a blank one for a new question).
  useEffect(() => {
    setResponses(myAnswer?.responses ?? []);
    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id, myAnswer?.answeredAt]);

  if (isLoading || live.isLoading) return <PageSpinner />;
  const header = <PageHeader title="Class question" subtitle={cls ? cls.name : undefined} />;
  if (!q) {
    return (
      <div>
        {header}
        <EmptyState icon={<Radio className="h-6 w-6" />} title="No question right now">
          When your teacher asks the class a question during a lesson, it appears here and at the top of every page.
        </EmptyState>
      </div>
    );
  }
  if (!item) return <PageSpinner label="Loading the question…" />;

  const open = q.status === 'open';
  const result = !open && myAnswer ? gradeItem(item, myAnswer.responses) : null;
  const changed = JSON.stringify(responses) !== JSON.stringify(myAnswer?.responses ?? []);
  const send = async () => {
    setError(null);
    try {
      await submit.mutateAsync({ questionId: q.id, responses: item.parts.map((_, i) => responses[i] ?? '') });
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      {header}
      <Card>
        <CardBody className="space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide">
            <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1', open ? 'bg-bad-soft text-bad-ink' : 'bg-surface-2 text-ink-2')}>
              {open && <span className="h-2 w-2 animate-pulse rounded-full bg-bad" />}
              {open ? 'Live' : 'Closed'}
            </span>
            <span className="text-brand-700">{skillInfo(q.skillId)?.name}</span>
          </div>
          <QuestionView item={item} responses={open ? responses : (myAnswer?.responses ?? [])} onChange={(r) => open && setResponses(r)} locked={!open} result={result} showAnswers={!open} onEnter={open ? send : undefined} />
          {open ? (
            <div className="flex flex-wrap items-center gap-3">
              <Button icon={<Send className="h-4 w-4" />} onClick={send} loading={submit.isPending} disabled={!responses.some((r) => r?.trim()) || (!!myAnswer && !changed)}>
                {myAnswer ? 'Change my answer' : 'Send answer'}
              </Button>
              {myAnswer && !changed && (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-good-ink">
                  <CheckCircle2 className="h-4 w-4" /> Answer sent. You can change it until your teacher shows the results.
                </span>
              )}
            </div>
          ) : (
            <div className={cn('flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold', !myAnswer ? 'bg-surface-2 text-ink-2' : result?.correct ? 'bg-good-soft text-good-ink' : 'bg-bad-soft text-bad-ink')}>
              {!myAnswer ? null : result?.correct ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              {!myAnswer ? 'This question is closed. Here is the solution.' : result?.correct ? 'Correct — well done!' : 'Not quite. Look at the solution below.'}
            </div>
          )}
          {error && <p className="text-sm font-medium text-bad-ink">{error}</p>}
          {!open && <SolutionPanel item={item} />}
        </CardBody>
      </Card>
    </div>
  );
}
