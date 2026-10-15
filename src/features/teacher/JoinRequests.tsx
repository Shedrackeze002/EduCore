/**
 * Students asking to join a class. Everyone starts ticked: the teacher unticks anyone they do not
 * recognize and approves the rest in one go (or declines the ticked ones). A student who joined
 * with the class link on another device shows the student already in the class with the same
 * name; approving them as that student lets the new device carry on with the same progress.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, UserPlus, X } from 'lucide-react';
import { useDecideJoinRequests, useJoinRequests } from '@/data/hooks.ts';
import { Avatar, Button, Card, CardBody, CardHeader, useToast } from '@/components/ui/index.ts';
import { relative } from '@/lib/dates.ts';
import { cn } from '@/lib/cn.ts';

const box = 'h-[18px] w-[18px] shrink-0 accent-[rgb(var(--brand))]';

export function JoinRequestsCard({ classId }: { classId: string }) {
  const requests = useJoinRequests(classId);
  const decide = useDecideJoinRequests(classId);
  const toast = useToast();
  const [unticked, setUnticked] = useState<ReadonlySet<string>>(new Set());
  // Requests the teacher says are not the matching student already in the class.
  const [notSame, setNotSame] = useState<ReadonlySet<string>>(new Set());
  const list = requests.data ?? [];
  if (!list.length) return null;

  const ticked = list.filter((r) => !unticked.has(r.id));
  const toggle = (set: ReadonlySet<string>, id: string, on: boolean) => {
    const next = new Set(set);
    if (on) next.add(id);
    else next.delete(id);
    return next;
  };

  const act = async (approve: boolean) => {
    if (!ticked.length) return;
    try {
      await decide.mutateAsync(ticked.map((r) => ({ requestId: r.id, approve, sameAs: approve && r.match && !notSame.has(r.id) ? r.match.studentId : null })));
      setUnticked(new Set());
      const n = ticked.length;
      toast({ kind: 'success', title: approve ? (n === 1 ? 'Student let in' : `${n} students let in`) : n === 1 ? 'Request declined' : `${n} requests declined` });
    } catch (e) {
      toast({ kind: 'error', title: 'Could not update the requests', body: (e as Error).message });
    }
  };

  const all = ticked.length === list.length;
  return (
    <Card className="mb-6 border-brand-200">
      <CardHeader
        title={`${list.length} ${list.length === 1 ? 'student wants' : 'students want'} to join`}
        subtitle="Untick anyone you don’t recognize, then approve the rest. Mastery from their own study comes with them."
        icon={<UserPlus className="h-5 w-5" />}
        action={
          list.length > 1 ? (
            <label className="flex items-center gap-2 text-sm font-medium text-ink-2">
              <input type="checkbox" className={box} checked={all} onChange={(e) => setUnticked(e.target.checked ? new Set() : new Set(list.map((r) => r.id)))} />
              Select all
            </label>
          ) : undefined
        }
      />
      <CardBody className="divide-y divide-line pt-2">
        {list.map((r) => {
          const on = !unticked.has(r.id);
          return (
            <div key={r.id} className={cn('flex items-start gap-3 py-3', !on && 'opacity-60')}>
              <input type="checkbox" className={cn(box, 'mt-2.5')} checked={on} onChange={(e) => setUnticked(toggle(unticked, r.id, !e.target.checked))} aria-label={`Select ${r.fullName}`} />
              <Avatar name={r.fullName} size={36} />
              <div className="min-w-0 flex-1">
                <div className="font-medium">{r.fullName}</div>
                <div className="truncate text-xs text-ink-3">
                  {r.nameOnly ? 'Joined with the class link' : r.email} · asked {relative(r.createdAt)}
                </div>
                {r.message && <p className="mt-1 text-sm text-ink-2">“{r.message}”</p>}
                {r.match && (
                  <label className="mt-2 flex items-start gap-2 rounded-xl bg-brand-50 px-3 py-2 text-sm text-brand-800">
                    <input type="checkbox" className={cn(box, 'mt-0.5')} checked={!notSame.has(r.id)} onChange={(e) => setNotSame(toggle(notSame, r.id, !e.target.checked))} />
                    <span>
                      Same student as <strong>{r.match.fullName}</strong>, already in the class: their progress carries on on this device.
                    </span>
                  </label>
                )}
              </div>
            </div>
          );
        })}
      </CardBody>
      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-line px-5 py-3">
        <span className="mr-auto text-sm text-ink-3">
          {ticked.length} of {list.length} selected
        </span>
        <Button variant="ghost" icon={<X className="h-4 w-4" />} disabled={!ticked.length || decide.isPending} onClick={() => void act(false)}>
          Decline selected
        </Button>
        <Button icon={<Check className="h-4 w-4" />} disabled={!ticked.length} loading={decide.isPending} onClick={() => void act(true)}>
          {all && list.length > 1 ? `Approve all ${list.length}` : `Approve ${ticked.length === 1 ? '1 student' : `${ticked.length} students`}`}
        </Button>
      </div>
    </Card>
  );
}

/** A one-line reminder on the class overview. */
export function JoinRequestsBanner({ classId }: { classId: string }) {
  const requests = useJoinRequests(classId);
  const n = requests.data?.length ?? 0;
  if (!n) return null;
  return (
    <Link to={`/t/c/${classId}/students`} className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800 hover:bg-brand-100">
      <UserPlus className="h-5 w-5 shrink-0" />
      <span className="flex-1">
        {n} {n === 1 ? 'student is' : 'students are'} waiting for you to approve their request to join.
      </span>
      <span className="font-semibold">Review</span>
    </Link>
  );
}
