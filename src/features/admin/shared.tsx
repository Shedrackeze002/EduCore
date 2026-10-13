import { useEffect, useState, type ReactNode } from 'react';
import { Ban, Clock3, ShieldCheck, XCircle } from 'lucide-react';
import type { AdminUserRow } from '@/data/types.ts';
import { Badge, Button, Modal, useToast } from '@/components/ui/index.ts';

export function useDebounced<T>(value: T, ms = 300): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

export function UserStatusBadges({ u }: { u: Pick<AdminUserRow, 'platformAdmin' | 'teacherStatus' | 'disabled' | 'role'> }) {
  return (
    <>
      {u.platformAdmin && (
        <Badge tone="info" icon={<ShieldCheck className="h-3 w-3" />}>
          Admin
        </Badge>
      )}
      {u.disabled && (
        <Badge tone="bad" icon={<Ban className="h-3 w-3" />}>
          Disabled
        </Badge>
      )}
      {u.role === 'teacher' && u.teacherStatus === 'pending' && (
        <Badge tone="warn" icon={<Clock3 className="h-3 w-3" />}>
          Awaiting approval
        </Badge>
      )}
      {u.role === 'teacher' && u.teacherStatus === 'rejected' && (
        <Badge tone="bad" icon={<XCircle className="h-3 w-3" />}>
          Not approved
        </Badge>
      )}
    </>
  );
}

export interface ConfirmSpec {
  title: string;
  body: ReactNode;
  confirmLabel: string;
  danger?: boolean;
  run: () => Promise<unknown>;
  success: string;
}

/** A confirmation step for changes that affect someone else's access. */
export function ConfirmDialog({ spec, onClose }: { spec: ConfirmSpec | null; onClose: () => void }) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  if (!spec) return null;
  const go = async () => {
    setBusy(true);
    try {
      await spec.run();
      toast({ kind: 'success', title: spec.success });
      onClose();
    } catch (e) {
      toast({ kind: 'error', title: 'That did not work', body: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };
  return (
    <Modal
      open
      onClose={onClose}
      size="sm"
      title={spec.title}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant={spec.danger ? 'danger' : 'primary'} loading={busy} onClick={go}>
            {spec.confirmLabel}
          </Button>
        </>
      }
    >
      <div className="text-[15px] text-ink-2">{spec.body}</div>
    </Modal>
  );
}

export function Pager({ offset, limit, total, onChange }: { offset: number; limit: number; total: number; onChange: (offset: number) => void }) {
  if (total <= limit) return null;
  const from = offset + 1;
  const to = Math.min(offset + limit, total);
  return (
    <div className="mt-4 flex items-center justify-between gap-3 text-sm text-ink-3">
      <span>
        {from}–{to} of {total}
      </span>
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" disabled={offset === 0} onClick={() => onChange(Math.max(0, offset - limit))}>
          Previous
        </Button>
        <Button size="sm" variant="secondary" disabled={to >= total} onClick={() => onChange(offset + limit)}>
          Next
        </Button>
      </div>
    </div>
  );
}

const ACTIONS: Record<string, string> = {
  teacher_approved: 'approved the teacher account of',
  teacher_rejected: 'declined the teacher account of',
  teacher_pending: 'moved back to awaiting approval:',
  admin_granted: 'made an administrator:',
  admin_revoked: 'removed administrator access from',
  user_disabled: 'disabled the account of',
  user_enabled: 're-enabled the account of',
  password_reset: 'reset the password of',
  setting_changed: 'changed a platform setting',
  course_request_approved: 'planned a course request from',
  course_request_declined: 'declined a course request from',
  course_request_done: 'marked as built a course request from',
  course_request_new: 'reopened a course request from',
  lesson_edit_approved: 'approved a lesson edit by',
  lesson_edit_declined: 'declined a lesson edit by',
  lesson_edit_reverted: 'reverted a lesson edit by',
};

const SETTING_VALUES: Record<string, string> = { open: 'open sign-up', approval: 'approval required' };

/** "Shedrack Eze approved the teacher account of Jane Doe" */
export function describeAudit(e: { action: string; actorName: string | null; targetName: string | null; details: Record<string, unknown> }): string {
  const actor = e.actorName ?? 'Someone';
  const verb = ACTIONS[e.action] ?? e.action.replace(/_/g, ' ');
  if (e.action === 'setting_changed') {
    const to = String(e.details.to ?? '');
    return `${actor} set teacher sign-up to ${SETTING_VALUES[to] ?? to}`;
  }
  const what = typeof e.details.title === 'string' ? ` (${e.details.title})` : typeof e.details.section === 'string' ? ` (${e.details.section})` : '';
  return `${actor} ${verb} ${e.targetName ?? 'a deleted user'}${what}`;
}

export function auditTone(action: string): 'good' | 'bad' | 'info' | 'warn' | 'neutral' {
  if (action === 'teacher_approved' || action === 'user_enabled' || action === 'course_request_done') return 'good';
  if (action === 'course_request_approved') return 'info';
  if (action === 'lesson_edit_approved') return 'good';
  if (action === 'lesson_edit_declined' || action === 'lesson_edit_reverted') return 'bad';
  if (action === 'course_request_declined') return 'bad';
  if (action === 'teacher_rejected' || action === 'user_disabled' || action === 'admin_revoked') return 'bad';
  if (action === 'admin_granted') return 'info';
  if (action === 'password_reset') return 'warn';
  return 'neutral';
}
