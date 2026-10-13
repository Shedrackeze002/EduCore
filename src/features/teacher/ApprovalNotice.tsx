import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Clock3, LogOut, RefreshCcw, XCircle } from 'lucide-react';
import { api } from '@/data/index.ts';
import { qk } from '@/data/hooks.ts';
import type { Profile } from '@/data/types.ts';
import { useAuth } from '@/features/auth/AuthProvider.tsx';
import { Button, Card } from '@/components/ui/index.ts';

/** True when this teacher cannot create classes yet (self sign-up waiting for an administrator). */
export const needsApproval = (p: Profile) => p.role === 'teacher' && !!p.teacherStatus && p.teacherStatus !== 'approved';

/** Shown instead of the class list until an administrator approves the account. Checks back every 30 seconds. */
export function ApprovalNotice({ me }: { me: Profile }) {
  const { setUser, signOut } = useAuth();
  const navigate = useNavigate();
  const fresh = useQuery({ queryKey: qk.profile(me.id), queryFn: () => api().getProfile(me.id), refetchInterval: 30_000 });
  useEffect(() => {
    if (fresh.data && fresh.data.teacherStatus !== me.teacherStatus) setUser(fresh.data);
  }, [fresh.data, me.teacherStatus, setUser]);

  const rejected = me.teacherStatus === 'rejected';
  const Icon = rejected ? XCircle : Clock3;
  return (
    <div className="mx-auto max-w-xl py-6 sm:py-12">
      <Card className="p-6 text-center sm:p-8">
        <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${rejected ? 'bg-bad-soft text-bad-ink' : 'bg-warn-soft text-warn-ink'}`}>
          <Icon className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-xl font-semibold text-ink sm:text-2xl">{rejected ? 'Your teacher account was not approved' : 'Your teacher account is waiting for approval'}</h1>
        <p className="mx-auto mt-2 max-w-md text-[15px] text-ink-3">
          {rejected ? (
            <>If you think this is a mistake, contact your school’s Gradileo administrator and ask them to approve {me.email}.</>
          ) : (
            <>
              A Gradileo administrator reviews every new teacher account before it can create classes. You will get a notification here as soon as {me.email} is approved, and this page updates on its own.
            </>
          )}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {!rejected && (
            <Button variant="secondary" icon={<RefreshCcw className="h-4 w-4" />} loading={fresh.isFetching} onClick={() => fresh.refetch()}>
              Check again
            </Button>
          )}
          <Button
            variant="ghost"
            icon={<LogOut className="h-4 w-4" />}
            onClick={async () => {
              await signOut();
              navigate('/login');
            }}
          >
            Sign out
          </Button>
        </div>
      </Card>
    </div>
  );
}
