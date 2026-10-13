import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, KeyRound, XCircle } from 'lucide-react';
import { getCourse } from '@engine/curriculum/index.ts';
import { useMyJoinRequests, useRequestToJoin } from '@/data/hooks.ts';
import type { JoinResult, MyJoinRequest } from '@/data/types.ts';
import { Badge, Button, Card, Input, PageHeader, Textarea, useToast } from '@/components/ui/index.ts';
import { relative } from '@/lib/dates.ts';
import { chooseStudentClass } from '../shared/useStudentClass.ts';

export default function JoinClassPage() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<JoinResult | null>(null);
  const join = useRequestToJoin();
  const navigate = useNavigate();
  const toast = useToast();
  return (
    <div className="mx-auto max-w-lg">
      <PageHeader title="Join a class" subtitle="Enter the class code from your teacher. Anything you studied on your own comes with you." />
      {sent ? (
        <Card className="p-6 text-center">
          <Clock className="mx-auto h-10 w-10 text-brand" />
          <h2 className="mt-3 text-lg font-semibold">Request sent</h2>
          <p className="mt-1 text-ink-2">
            {sent.teacherName ?? 'Your teacher'} will approve your request to join <strong>{sent.className}</strong>. You will get a notification, and the class will appear in your course list.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button variant="secondary" onClick={() => setSent(null)}>
              Join another class
            </Button>
            <Button to="/s">Back to home</Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6">
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              try {
                const r = await join.mutateAsync({ code, message });
                if (r.status === 'pending') {
                  setSent(r);
                  setCode('');
                  setMessage('');
                  return;
                }
                chooseStudentClass(r.classId);
                toast({ kind: 'success', title: `You joined ${r.className}` });
                navigate('/s');
              } catch (err) {
                setError((err as Error).message);
              }
            }}
          >
            <Input label="Class code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="MATH10" maxLength={8} required className="[&_input]:h-14 [&_input]:text-center [&_input]:font-mono [&_input]:text-2xl [&_input]:uppercase [&_input]:tracking-[0.4em]" />
            <Textarea label="Note for your teacher (optional)" hint="Some classes ask the teacher to approve new students. A short note, such as your block or period, helps them." value={message} onChange={(e) => setMessage(e.target.value)} maxLength={300} rows={2} />
            {error && <p className="rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad-ink">{error}</p>}
            <Button type="submit" className="w-full" size="lg" loading={join.isPending} icon={<KeyRound className="h-5 w-5" />}>
              Join class
            </Button>
          </form>
        </Card>
      )}
      <MyRequests />
    </div>
  );
}

const STATUS: Record<MyJoinRequest['status'], { label: string; tone: 'info' | 'good' | 'bad'; icon: typeof Clock }> = {
  pending: { label: 'Waiting for approval', tone: 'info', icon: Clock },
  approved: { label: 'Approved', tone: 'good', icon: CheckCircle2 },
  declined: { label: 'Declined', tone: 'bad', icon: XCircle },
};

/** The student's requests to join classes, newest first. */
export function MyRequests({ pendingOnly = false, className = 'mt-6' }: { pendingOnly?: boolean; className?: string }) {
  const requests = useMyJoinRequests();
  const list = (requests.data ?? []).filter((r) => !pendingOnly || r.status === 'pending');
  if (!list.length) return null;
  return (
    <Card className={className}>
      <div className="border-b border-line px-5 py-3 text-sm font-semibold">{pendingOnly ? 'Waiting for your teacher' : 'Your requests'}</div>
      <ul className="divide-y divide-line" aria-label="Your requests to join classes">
        {list.map((r) => {
          const st = STATUS[r.status];
          return (
            <li key={r.id} className="flex items-center gap-3 px-5 py-3">
              <st.icon className="h-5 w-5 shrink-0 text-ink-3" />
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">
                  {r.className}
                  {r.section ? ` · ${r.section}` : ''}
                </div>
                <div className="truncate text-xs text-ink-3">
                  {[r.teacherName, getCourse(r.courseId)?.shortTitle !== r.className && getCourse(r.courseId)?.shortTitle, `asked ${relative(r.createdAt)}`].filter(Boolean).join(' · ')}
                </div>
              </div>
              <Badge tone={st.tone}>{st.label}</Badge>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
