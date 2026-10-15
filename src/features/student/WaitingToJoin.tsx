/**
 * A student who joined with the class link and is not in a class yet: they wait for the teacher.
 * The page checks every few seconds. When the teacher lets them in, the class opens; when the
 * teacher says they are a student already in the class (back on a new device), this device takes
 * over that student's account and carries on with their progress.
 */
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Clock, LogOut, PartyPopper, XCircle } from 'lucide-react';
import { api } from '@/data/index.ts';
import { qk, useMyJoinRequests } from '@/data/hooks.ts';
import { useAuth, useMe } from '@/features/auth/AuthProvider.tsx';
import { Button, Card } from '@/components/ui/index.ts';

export function WaitingToJoin() {
  const me = useMe();
  const { signOut, setUser } = useAuth();
  const qc = useQueryClient();
  const requests = useMyJoinRequests(true, 8000);
  const [error, setError] = useState<string | null>(null);
  const claiming = useRef(false);
  const list = requests.data ?? [];
  const linked = list.find((r) => r.linked);
  const approved = list.find((r) => r.status === 'approved' && !r.linked);
  const pending = list.find((r) => r.status === 'pending');
  const declined = !pending && !approved && !linked ? list.find((r) => r.status === 'declined') : undefined;

  // Matched to a student already in the class: take over that account and carry on as that student.
  useEffect(() => {
    if (!linked || claiming.current) return;
    claiming.current = true;
    api()
      .claimMatchedAccount()
      .then(async (p) => {
        if (!p) {
          claiming.current = false;
          return;
        }
        setUser(p);
        await qc.invalidateQueries();
      })
      .catch((e: Error) => {
        claiming.current = false;
        setError(e.message);
      });
  }, [linked, qc, setUser]);

  // Let in as a new student: the class list now has the class.
  useEffect(() => {
    if (approved) void qc.invalidateQueries({ queryKey: qk.classes });
  }, [approved, qc]);

  const first = me.fullName.split(' ')[0];
  const Icon = declined ? XCircle : linked || approved ? PartyPopper : Clock;
  return (
    <div className="mx-auto max-w-xl py-10">
      <Card className="p-8 text-center">
        <Icon className="mx-auto h-12 w-12 text-brand" />
        <h1 className="mt-4 text-2xl font-semibold">
          {linked ? `Welcome back, ${first}!` : approved ? `You’re in, ${first}!` : declined ? 'Your request was declined' : pending ? `Waiting for ${pending.teacherName ?? 'your teacher'}` : `Hi, ${first}`}
        </h1>
        <p className="mt-2 text-ink-2">
          {linked || approved
            ? 'Opening your class…'
            : declined
              ? `${declined.teacherName ?? 'Your teacher'} did not let this name into ${declined.className}. Check the class link and your name with your teacher.`
              : pending
                ? `You asked to join ${pending.className} as ${me.fullName}. This page opens your class as soon as your teacher lets you in.`
                : 'Open the class link from your teacher to join a class.'}
        </p>
        {error && <p className="mt-4 rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad-ink">{error}</p>}
        <div className="mt-6 text-sm text-ink-3">
          Not {first}?{' '}
          <Button
            variant="ghost"
            size="sm"
            icon={<LogOut className="h-4 w-4" />}
            onClick={async () => {
              if (window.confirm(`Sign ${me.fullName} out of this device? To come back, open the class link and type your name again.`)) await signOut();
            }}
          >
            Switch student
          </Button>
        </div>
      </Card>
    </div>
  );
}
