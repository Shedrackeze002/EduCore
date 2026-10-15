/**
 * Joining a class by link with just a name. A student opens the teacher's link, types a first and
 * last name, and waits for the teacher; nothing else is asked (no email, username or password).
 * This device keeps them signed in. A student already signed in joins with one press, and a
 * shared device lets the next student switch.
 */
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Info, LogOut, Users } from 'lucide-react';
import { useClassForJoin, useJoinWithName, useRequestToJoin } from '@/data/hooks.ts';
import { cleanNamePart } from '@/lib/names.ts';
import { Button, Input, PageSpinner } from '@/components/ui/index.ts';
import { useAuth } from './AuthProvider.tsx';
import { AuthLayout } from './AuthLayout.tsx';

export default function JoinWithNamePage() {
  const { code = '' } = useParams();
  const { user, loading, signOut, setUser } = useAuth();
  const cls = useClassForJoin(code);
  const join = useJoinWithName();
  const requestToJoin = useRequestToJoin();
  const navigate = useNavigate();
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (loading || cls.isLoading) return <PageSpinner />;
  if (!cls.data) {
    return (
      <AuthLayout title="Class link not found" subtitle="This class link is not valid, or the class has closed.">
        <p className="text-ink-2">Ask your teacher for the class link again.</p>
        <p className="mt-6 text-center text-sm text-ink-3">
          <Link to="/" className="font-semibold text-brand hover:underline">
            Go to Gradileo
          </Link>
        </p>
      </AuthLayout>
    );
  }
  const { className, teacherName } = cls.data;
  const subtitle = teacherName ? `${teacherName}’s class` : 'Join your teacher’s class';

  const switchStudent = async () => {
    if (user?.nameOnly && !window.confirm(`Sign ${user.fullName} out of this device? To come back, they open the class link and type their name again.`)) return;
    await signOut();
  };

  if (user) {
    return (
      <AuthLayout title={`Join ${className}`} subtitle={subtitle}>
        {user.role === 'student' ? (
          <div className="space-y-4">
            <p className="text-ink-2">
              You are signed in as <strong>{user.fullName}</strong>.
            </p>
            {error && <p className="rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad-ink">{error}</p>}
            <Button
              className="w-full"
              size="lg"
              loading={requestToJoin.isPending}
              onClick={async () => {
                setError(null);
                try {
                  await requestToJoin.mutateAsync({ code });
                  navigate('/s');
                } catch (e) {
                  setError((e as Error).message);
                }
              }}
            >
              Join {className}
            </Button>
          </div>
        ) : (
          <p className="text-ink-2">You are signed in as a teacher. Sign out to join this class as a student.</p>
        )}
        <p className="mt-6 text-center text-sm text-ink-3">
          Not {user.fullName}?{' '}
          <button type="button" className="inline-flex items-center gap-1 font-semibold text-brand hover:underline" onClick={() => void switchStudent()}>
            <LogOut className="h-3.5 w-3.5" /> Switch student
          </button>
        </p>
      </AuthLayout>
    );
  }

  const submit = async () => {
    setError(null);
    const f = cleanNamePart(first, 'first name');
    const l = cleanNamePart(last, 'last name');
    if ('error' in f) return setError(f.error);
    if ('error' in l) return setError(l.error);
    try {
      const { profile } = await join.mutateAsync({ code, firstName: f.value, lastName: l.value });
      // Known to the app before the page changes, so the student area does not send them to sign in.
      setUser(profile);
      navigate('/s');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <AuthLayout title={`Join ${className}`} subtitle={subtitle}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="First name" value={first} onChange={(e) => setFirst(e.target.value)} required maxLength={40} autoComplete="given-name" autoFocus />
          <Input label="Last name" value={last} onChange={(e) => setLast(e.target.value)} required maxLength={40} autoComplete="family-name" />
        </div>
        <p className="flex gap-2 rounded-xl bg-info-soft px-3 py-2.5 text-sm text-info-ink">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          That is all we need. {teacherName ?? 'Your teacher'} will let you in, and this device will remember you next time.
        </p>
        {error && <p className="rounded-xl bg-bad-soft px-3 py-2 text-sm text-bad-ink">{error}</p>}
        <Button type="submit" className="w-full" size="lg" loading={join.isPending} icon={<Users className="h-4 w-4" />}>
          Join class
        </Button>
        <p className="text-center text-xs text-ink-3">
          By joining, you agree to the{' '}
          <Link to="/terms" className="text-brand hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-brand hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
      <p className="mt-6 text-center text-sm text-ink-3">
        Already have a Gradileo account?{' '}
        <Link to={`/login?next=${encodeURIComponent(`/join/${code}`)}`} className="font-semibold text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
