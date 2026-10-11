import { useState, type ReactNode } from 'react';
import { Ban, Check, CheckCircle2, Copy, KeyRound, MoreHorizontal, ShieldCheck, ShieldOff, UserCheck, X } from 'lucide-react';
import type { AdminUserRow } from '@/data/types.ts';
import { useResetPassword, useSetPlatformAdmin, useSetTeacherStatus, useSetUserDisabled } from '@/data/hooks.ts';
import { Button, Menu, MenuItem, Modal, useToast } from '@/components/ui/index.ts';
import { ConfirmDialog, type ConfirmSpec } from './shared.tsx';

/** Approve / decline, administrator access, password reset and disabling, for one account. */
export function UserActions({ u, meId }: { u: AdminUserRow; meId: string }) {
  const setStatus = useSetTeacherStatus();
  const setAdmin = useSetPlatformAdmin();
  const setDisabled = useSetUserDisabled();
  const reset = useResetPassword();
  const toast = useToast();
  const [confirm, setConfirm] = useState<ConfirmSpec | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const isMe = u.id === meId;
  const first = u.fullName.split(' ')[0];
  const pending = u.role === 'teacher' && u.teacherStatus === 'pending';

  const approve = async () => {
    try {
      await setStatus.mutateAsync({ userId: u.id, status: 'approved' });
      toast({ kind: 'success', title: `${u.fullName} can now teach on EduCore`, body: 'They have been notified.' });
    } catch (e) {
      toast({ kind: 'error', title: 'Could not approve', body: (e as Error).message });
    }
  };
  const reject = () =>
    setConfirm({
      title: `Decline ${u.fullName}?`,
      body: <>They keep their sign-in but cannot create classes. You can approve them later from this page.</>,
      confirmLabel: 'Decline',
      danger: true,
      run: () => setStatus.mutateAsync({ userId: u.id, status: 'rejected' }),
      success: `${u.fullName} was declined`,
    });

  const items: Array<{ key: string; label: string; icon: ReactNode; danger?: boolean; onClick: () => void }> = [];
  if (u.role === 'teacher' && u.teacherStatus !== 'approved') items.push({ key: 'approve', label: 'Approve as teacher', icon: <UserCheck className="h-4 w-4" />, onClick: approve });
  if (u.role === 'teacher' && u.teacherStatus !== 'rejected' && !u.platformAdmin) items.push({ key: 'reject', label: 'Decline teacher', icon: <X className="h-4 w-4" />, danger: true, onClick: reject });
  if (u.role === 'teacher' && !u.platformAdmin && !u.disabled)
    items.push({
      key: 'admin-on',
      label: 'Make administrator',
      icon: <ShieldCheck className="h-4 w-4" />,
      onClick: () =>
        setConfirm({
          title: `Make ${u.fullName} an administrator?`,
          body: <>Administrators see every school account and class, approve teachers, reset passwords and change platform settings. Every change they make is recorded in the audit log.</>,
          confirmLabel: 'Make administrator',
          run: () => setAdmin.mutateAsync({ userId: u.id, on: true }),
          success: `${u.fullName} is now an administrator`,
        }),
    });
  if (u.platformAdmin)
    items.push({
      key: 'admin-off',
      label: isMe ? 'Give up administrator access' : 'Remove administrator access',
      icon: <ShieldOff className="h-4 w-4" />,
      danger: true,
      onClick: () =>
        setConfirm({
          title: isMe ? 'Give up administrator access?' : `Remove ${first}’s administrator access?`,
          body: isMe ? <>You will leave the admin console straight away. Another administrator can give it back.</> : <>{first} keeps their teacher account and classes.</>,
          confirmLabel: 'Remove access',
          danger: true,
          run: async () => {
            await setAdmin.mutateAsync({ userId: u.id, on: false });
            if (isMe) window.location.assign(`${import.meta.env.BASE_URL}t`);
          },
          success: 'Administrator access removed',
        }),
    });
  if (!isMe)
    items.push({
      key: 'reset',
      label: 'Reset password',
      icon: <KeyRound className="h-4 w-4" />,
      onClick: () =>
        setConfirm({
          title: `Reset ${first}’s password?`,
          body: <>Their current password stops working immediately. You will see the new temporary password once, so be ready to pass it on privately.</>,
          confirmLabel: 'Reset password',
          run: async () => setPassword(await reset.mutateAsync(u.id)),
          success: 'Password reset',
        }),
    });
  if (!isMe && !u.disabled)
    items.push({
      key: 'disable',
      label: 'Disable account',
      icon: <Ban className="h-4 w-4" />,
      danger: true,
      onClick: () =>
        setConfirm({
          title: `Disable ${u.fullName}?`,
          body: (
            <>
              They will be signed out and cannot sign in again until you re-enable the account. Their {u.role === 'teacher' ? 'classes, assignments and grades' : 'submissions and grades'} are kept.
            </>
          ),
          confirmLabel: 'Disable account',
          danger: true,
          run: () => setDisabled.mutateAsync({ userId: u.id, disabled: true }),
          success: `${u.fullName} was disabled`,
        }),
    });
  if (u.disabled)
    items.push({
      key: 'enable',
      label: 'Re-enable account',
      icon: <CheckCircle2 className="h-4 w-4" />,
      onClick: () =>
        setConfirm({
          title: `Re-enable ${u.fullName}?`,
          body: <>They can sign in again with their existing password.</>,
          confirmLabel: 'Re-enable',
          run: () => setDisabled.mutateAsync({ userId: u.id, disabled: false }),
          success: `${u.fullName} can sign in again`,
        }),
    });

  return (
    <div className="flex items-center gap-1.5">
      {pending && (
        <>
          <Button size="xs" icon={<Check className="h-3.5 w-3.5" />} loading={setStatus.isPending} onClick={approve}>
            Approve
          </Button>
          <Button size="xs" variant="ghost" onClick={reject}>
            Decline
          </Button>
        </>
      )}
      {items.length > 0 && (
        <Menu
          trigger={() => (
            <button type="button" className="rounded-lg p-1.5 text-ink-3 hover:bg-surface-2 hover:text-ink" aria-label={`Actions for ${u.fullName}`}>
              <MoreHorizontal className="h-4 w-4" />
            </button>
          )}
        >
          {(close) =>
            items.map((it) => (
              <MenuItem
                key={it.key}
                icon={it.icon}
                danger={it.danger}
                onClick={() => {
                  close();
                  it.onClick();
                }}
              >
                {it.label}
              </MenuItem>
            ))
          }
        </Menu>
      )}
      <ConfirmDialog spec={confirm} onClose={() => setConfirm(null)} />
      <PasswordModal user={u} password={password} onClose={() => setPassword(null)} />
    </div>
  );
}

function PasswordModal({ user, password, onClose }: { user: AdminUserRow; password: string | null; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  if (!password) return null;
  const signIn = user.role === 'student' && user.username ? user.username : user.email;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`Sign in: ${signIn}\nTemporary password: ${password}`);
      setCopied(true);
    } catch {
      /* clipboard blocked: the password is still on screen */
    }
  };
  return (
    <Modal
      open
      onClose={onClose}
      size="sm"
      title="New temporary password"
      description="This is the only time it is shown."
      footer={
        <>
          <Button variant="secondary" icon={copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} onClick={copy}>
            {copied ? 'Copied' : 'Copy details'}
          </Button>
          <Button onClick={onClose}>Done</Button>
        </>
      }
    >
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-ink-3">Signs in with</dt>
          <dd className="mt-0.5 font-medium text-ink">{signIn}</dd>
        </div>
        <div>
          <dt className="text-ink-3">Temporary password</dt>
          <dd className="mt-1 rounded-xl bg-surface-2 px-3 py-2.5 font-mono text-lg font-semibold tracking-wide text-ink">{password}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm text-ink-3">Share it privately. {user.fullName.split(' ')[0]} can change it under Profile &amp; settings after signing in.</p>
    </Modal>
  );
}
