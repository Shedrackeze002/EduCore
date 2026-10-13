/**
 * Teachers suggest a change to one section of a lesson. The editor shows the section's Markdown
 * with a live preview; an administrator reviews the suggestion before every class sees it.
 */
import { useMemo, useState } from 'react';
import { CheckCircle2, Clock, Send, Undo2, XCircle } from 'lucide-react';
import { skillInfo } from '@engine/curriculum/index.ts';
import { validateSection } from '@/content/edits.ts';
import { parseLesson } from '@/content/lessonParser.ts';
import { useMyLessonEdits, useSuggestLessonEdit, useWithdrawLessonEdit } from '@/data/hooks.ts';
import type { LessonEdit } from '@/data/types.ts';
import { Badge, Button, Card, CardBody, CardHeader, Input, Modal, useToast } from '@/components/ui/index.ts';
import { relative } from '@/lib/dates.ts';
import { BlockView } from './LessonBlocks.tsx';

export interface SectionSource {
  title: string;
  text: string;
  baseHash: string;
  edited: boolean;
}

const skillExists = (id: string) => !!skillInfo(id);

export function SuggestEditModal({ lessonId, source, onClose }: { lessonId: string; source: SectionSource | null; onClose: () => void }) {
  return source ? <Editor key={source.baseHash} lessonId={lessonId} source={source} onClose={onClose} /> : null;
}

function Editor({ lessonId, source, onClose }: { lessonId: string; source: SectionSource; onClose: () => void }) {
  const [markdown, setMarkdown] = useState(source.text);
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const send = useSuggestLessonEdit(lessonId);
  const toast = useToast();
  const problem = useMemo(() => validateSection(markdown, skillExists), [markdown]);
  const blocks = useMemo(() => (problem ? null : parseLesson(markdown).sections[0]), [markdown, problem]);
  const changed = markdown.trim() !== source.text.trim();

  const submit = async () => {
    setError(null);
    try {
      await send.mutateAsync({ lessonId, sectionTitle: blocks?.title ?? source.title, baseHash: source.baseHash, original: source.text, markdown, reason });
      toast({ kind: 'success', title: 'Suggestion sent', body: 'An administrator will review it. You will get a notification when it is decided.' });
      onClose();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      size="xl"
      title={`Suggest an edit: ${source.title}`}
      description="Change the section's Markdown on the left; the preview on the right shows it as students will see it. Once an administrator approves it, every class sees the new version."
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit} loading={send.isPending} disabled={!!problem || !changed} icon={<Send className="h-4 w-4" />}>
            Send for review
          </Button>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="edit-md" className="label mb-0">
            Section Markdown
          </label>
          <textarea id="edit-md" value={markdown} onChange={(e) => setMarkdown(e.target.value)} spellCheck className="input min-h-[22rem] flex-1 resize-y font-mono text-[13px] leading-relaxed" />
          <p className="text-xs text-ink-3">
            Keep the <code>## </code> heading on the first line. Maths goes between <code>$…$</code>; write <code>\$</code> for money. Blocks such as <code>:::tip</code> end with <code>:::</code>.
          </p>
        </div>
        <div className="min-w-0">
          <div className="label">Preview</div>
          <div className="max-h-[28rem] space-y-4 overflow-y-auto rounded-2xl border border-line bg-canvas p-4" aria-label="Preview of the suggested section">
            {problem ? (
              <p className="rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad-ink">{problem}</p>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{blocks!.title}</h2>
                {blocks!.blocks.map((b, i) => (
                  <BlockView key={i} block={b} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <Input label="Why this change? (optional)" value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} placeholder="For example: students mixed up the two formulas." className="mt-4" />
      {error && <p className="mt-3 rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad-ink">{error}</p>}
    </Modal>
  );
}

const STATUS: Record<LessonEdit['status'], { label: string; tone: 'info' | 'good' | 'bad' | 'neutral'; icon: typeof Clock }> = {
  pending: { label: 'Waiting for review', tone: 'info', icon: Clock },
  approved: { label: 'Live', tone: 'good', icon: CheckCircle2 },
  declined: { label: 'Not accepted', tone: 'bad', icon: XCircle },
  withdrawn: { label: 'Withdrawn', tone: 'neutral', icon: Undo2 },
  replaced: { label: 'Replaced by a newer edit', tone: 'neutral', icon: CheckCircle2 },
  reverted: { label: 'Removed', tone: 'neutral', icon: Undo2 },
};

/** The teacher's suggestions for this lesson and where they stand. */
export function MyLessonEdits({ lessonId }: { lessonId: string }) {
  const mine = useMyLessonEdits(lessonId);
  const withdraw = useWithdrawLessonEdit(lessonId);
  const list = mine.data ?? [];
  if (!list.length) return null;
  return (
    <Card>
      <CardHeader title="Your suggested edits" subtitle="Suggestions for this lesson and where they stand." />
      <CardBody className="pt-2">
        <ul className="divide-y divide-line" aria-label="Your suggested edits">
          {list.map((e) => {
            const st = STATUS[e.status];
            return (
              <li key={e.id} className="py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <st.icon className="h-4 w-4 text-ink-3" />
                  <span className="min-w-0 flex-1 font-medium">{e.sectionTitle}</span>
                  <span className="text-xs text-ink-3">{relative(e.createdAt)}</span>
                  <Badge tone={st.tone}>{st.label}</Badge>
                  {e.status === 'pending' && (
                    <Button size="xs" variant="ghost" loading={withdraw.isPending} onClick={() => withdraw.mutate(e.id)}>
                      Withdraw
                    </Button>
                  )}
                </div>
                {e.adminNote && <p className="mt-1 pl-6 text-sm text-ink-2">{e.adminNote}</p>}
              </li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  );
}
