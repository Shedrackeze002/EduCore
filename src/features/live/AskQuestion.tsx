/**
 * Students' questions during a presentation. While the teacher presents a lesson to the class, a
 * banner on every student page lets a student send a question from their own device. It pops up
 * on the teacher's screen; the class sees it without the student's name unless the student
 * chooses to show it (the teacher always sees who asked).
 */
import { useState } from 'react';
import { MessageCircleQuestion, Presentation as PresentationIcon } from 'lucide-react';
import { lessonById } from '@engine/curriculum/index.ts';
import { useAskQuestion, useClassQuestions, usePresentation } from '@/data/hooks.ts';
import type { ClassQuestion, Presentation } from '@/data/types.ts';
import { Badge, Button, Checkbox, Modal, Textarea, useToast } from '@/components/ui/index.ts';
import { useStudentClass } from '@/features/shared/useStudentClass.ts';

const MAX = 300;

const STATUS: Record<ClassQuestion['status'], { label: string; tone: 'neutral' | 'good' | 'warn' }> = {
  new: { label: 'Waiting', tone: 'neutral' },
  answered: { label: 'Answered', tone: 'good' },
  skipped: { label: 'Skipped for now', tone: 'warn' },
};

export function PresentingBanner() {
  const { cls } = useStudentClass();
  const presentation = usePresentation(cls?.kind === 'teacher' ? cls.id : undefined);
  const p = presentation.data;
  const mine = useClassQuestions(p ? cls?.id : undefined, { presentedAt: p?.startedAt });
  const [open, setOpen] = useState(false);
  if (!cls || !p) return null;
  const lesson = lessonById(p.lessonId);
  const asked = (mine.data ?? []).length;
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-info/30 bg-info-soft px-4 py-3 text-info-ink" role="status">
        <PresentationIcon className="h-5 w-5 shrink-0" />
        <span className="min-w-0 flex-1 text-sm font-semibold sm:text-base">
          Your teacher is presenting {lesson ? `Lesson ${lesson.number}: ${lesson.title}` : 'a lesson'}.
          {asked > 0 && <span className="font-normal"> You asked {asked === 1 ? 'one question' : `${asked} questions`}.</span>}
        </span>
        <Button size="sm" icon={<MessageCircleQuestion className="h-4 w-4" />} onClick={() => setOpen(true)}>
          Ask a question
        </Button>
      </div>
      <AskQuestionModal open={open} onClose={() => setOpen(false)} classId={cls.id} presentation={p} mine={mine.data ?? []} />
    </>
  );
}

function AskQuestionModal({ open, onClose, classId, presentation, mine }: { open: boolean; onClose: () => void; classId: string; presentation: Presentation; mine: ClassQuestion[] }) {
  const ask = useAskQuestion(classId);
  const toast = useToast();
  const [body, setBody] = useState('');
  const [showName, setShowName] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lesson = lessonById(presentation.lessonId);

  const send = async () => {
    setError(null);
    try {
      await ask.mutateAsync({ body, anonymous: !showName });
      setBody('');
      toast({ kind: 'success', title: 'Question sent', body: 'It shows on your teacher’s screen.' });
      onClose();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Ask your teacher a question"
      description={lesson ? `About Lesson ${lesson.number}: ${lesson.title}` : undefined}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => void send()} loading={ask.isPending} disabled={!body.trim()} icon={<MessageCircleQuestion className="h-4 w-4" />}>
            Send question
          </Button>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (body.trim()) void send();
        }}
      >
        <Textarea label="Your question" value={body} onChange={(e) => setBody(e.target.value)} maxLength={MAX} rows={3} hint={`${body.length} / ${MAX}`} placeholder="What would you like your teacher to explain?" />
        <div>
          <Checkbox checked={showName} onChange={setShowName} label="Show my name to the class" />
          <p className="mt-1 pl-7 text-sm text-ink-3">{showName ? 'The class sees your first name and last initial.' : 'The class sees “A student asks”. Your teacher still sees your name.'}</p>
        </div>
        {error && <p className="rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad-ink">{error}</p>}
      </form>
      {mine.length > 0 && (
        <div className="mt-6 border-t border-line pt-4">
          <h3 className="text-sm font-semibold text-ink-2">Your questions in this lesson</h3>
          <ul className="mt-2 space-y-2">
            {mine.map((q) => (
              <li key={q.id} className="flex items-start gap-3 rounded-xl bg-surface-2 px-3 py-2 text-sm">
                <span className="min-w-0 flex-1 break-words">{q.body}</span>
                <Badge tone={STATUS[q.status].tone}>{STATUS[q.status].label}</Badge>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  );
}
