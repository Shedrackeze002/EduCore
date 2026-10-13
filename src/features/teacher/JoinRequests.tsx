/** Students asking to join a class that asks for approval: the teacher approves or declines. */
import { Link } from 'react-router-dom';
import { Check, UserPlus, X } from 'lucide-react';
import { useDecideJoinRequest, useJoinRequests } from '@/data/hooks.ts';
import { Avatar, Button, Card, CardBody, CardHeader, useToast } from '@/components/ui/index.ts';
import { relative } from '@/lib/dates.ts';

export function JoinRequestsCard({ classId }: { classId: string }) {
  const requests = useJoinRequests(classId);
  const decide = useDecideJoinRequest(classId);
  const toast = useToast();
  const list = requests.data ?? [];
  if (!list.length) return null;

  const act = async (ids: string[], approve: boolean) => {
    try {
      for (const requestId of ids) await decide.mutateAsync({ requestId, approve });
      toast({ kind: 'success', title: approve ? (ids.length === 1 ? 'Student added to the class' : `${ids.length} students added to the class`) : 'Request declined' });
    } catch (e) {
      toast({ kind: 'error', title: 'Could not update the request', body: (e as Error).message });
    }
  };

  return (
    <Card className="mb-6 border-brand-200">
      <CardHeader
        title={`${list.length} ${list.length === 1 ? 'student wants' : 'students want'} to join`}
        subtitle="They used the class code. Approve the students you know; mastery from their own study comes with them."
        icon={<UserPlus className="h-5 w-5" />}
        action={
          list.length > 1 ? (
            <Button size="sm" variant="soft" icon={<Check className="h-4 w-4" />} loading={decide.isPending} onClick={() => act(list.map((r) => r.id), true)}>
              Approve all
            </Button>
          ) : undefined
        }
      />
      <CardBody className="divide-y divide-line pt-2">
        {list.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center gap-3 py-3">
            <Avatar name={r.fullName} size={36} />
            <div className="min-w-0 flex-1">
              <div className="font-medium">{r.fullName}</div>
              <div className="truncate text-xs text-ink-3">
                {r.email ? `${r.email} · ` : ''}asked {relative(r.createdAt)}
              </div>
              {r.message && <p className="mt-1 text-sm text-ink-2">“{r.message}”</p>}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" icon={<X className="h-4 w-4" />} disabled={decide.isPending} onClick={() => act([r.id], false)} aria-label={`Decline ${r.fullName}`}>
                Decline
              </Button>
              <Button size="sm" icon={<Check className="h-4 w-4" />} disabled={decide.isPending} onClick={() => act([r.id], true)} aria-label={`Approve ${r.fullName}`}>
                Approve
              </Button>
            </div>
          </div>
        ))}
      </CardBody>
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
