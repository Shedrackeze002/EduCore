import { Check, ShieldCheck, UserCheck, UserPlus } from 'lucide-react';
import type { PlatformSettings } from '@/data/types.ts';
import { useAdminSettings, useAdminUsers, useSaveAdminSettings } from '@/data/hooks.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { Avatar, Card, CardBody, CardHeader, PageHeader, PageSpinner, useToast } from '@/components/ui/index.ts';
import { cn } from '@/lib/cn.ts';
import { relative } from '@/lib/dates.ts';
import { UserActions } from './UserActions.tsx';

const MODES: Array<{ value: PlatformSettings['teacherSignup']; title: string; body: string; icon: typeof UserCheck; recommended?: boolean }> = [
  {
    value: 'approval',
    title: 'Approve new teachers',
    body: 'Anyone can sign up as a teacher, but they cannot create classes until an administrator approves them. Administrators are notified of each request.',
    icon: UserCheck,
    recommended: true,
  },
  {
    value: 'open',
    title: 'Open sign-up',
    body: 'New teachers can create classes straight away. Useful for a pilot where you know everyone who has the link.',
    icon: UserPlus,
  },
];

export default function AdminSettingsPage() {
  const me = useMe();
  const settings = useAdminSettings();
  const save = useSaveAdminSettings();
  const admins = useAdminUsers({ status: 'admin', limit: 50 });
  const toast = useToast();

  if (settings.isLoading) return <PageSpinner />;
  const mode = settings.data?.teacherSignup ?? 'approval';

  const choose = async (value: PlatformSettings['teacherSignup']) => {
    if (value === mode) return;
    try {
      await save.mutateAsync({ teacherSignup: value });
      toast({ kind: 'success', title: value === 'approval' ? 'New teachers now need approval' : 'Teacher sign-up is open' });
    } catch (e) {
      toast({ kind: 'error', title: 'Could not save', body: (e as Error).message });
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader eyebrow="Admin console" title="Platform settings" subtitle="Rules that apply to every school account. Changes are recorded in the audit log." />
      <Card>
        <CardHeader title="Teacher sign-up" subtitle="Students always join through a class code or an account their teacher creates." />
        <CardBody>
          <div role="radiogroup" aria-label="Teacher sign-up" className="grid gap-3 sm:grid-cols-2">
            {MODES.map((m) => {
              const on = m.value === mode;
              return (
                <button
                  key={m.value}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  disabled={save.isPending}
                  onClick={() => choose(m.value)}
                  className={cn('relative rounded-2xl border p-4 text-left transition', on ? 'border-brand bg-brand-50/60 ring-1 ring-brand' : 'border-line hover:border-brand-300 hover:bg-surface-2')}
                >
                  <div className="flex items-center gap-2">
                    <m.icon className={cn('h-5 w-5', on ? 'text-brand' : 'text-ink-3')} />
                    <span className="font-semibold text-ink">{m.title}</span>
                    {m.recommended && <span className="text-xs text-ink-3">(recommended)</span>}
                    {on && <Check className="ml-auto h-4 w-4 text-brand" />}
                  </div>
                  <p className="mt-2 text-sm text-ink-3">{m.body}</p>
                </button>
              );
            })}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Administrators"
          subtitle="Make another teacher an administrator from the Users page. Gradileo always keeps at least one."
        />
        <CardBody className="pt-3">
          <ul className="divide-y divide-line">
            {(admins.data?.rows ?? []).map((u) => (
              <li key={u.id} className="flex items-center gap-3 py-3">
                <Avatar name={u.fullName} color={u.avatarColor} size={36} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-ink">
                    {u.fullName} {u.id === me.id && <span className="text-xs font-normal text-ink-3">(you)</span>}
                  </div>
                  <div className="truncate text-sm text-ink-3">
                    {u.email}
                    {u.lastSignInAt ? ` · active ${relative(u.lastSignInAt)}` : ''}
                  </div>
                </div>
                <UserActions u={u} meId={me.id} />
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
