import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Bell, BellRing, CalendarClock, CheckCheck, ClipboardCheck, Megaphone, ShieldCheck, Sparkles, Upload } from 'lucide-react';
import { api } from '@/data/index.ts';
import { qk, useMarkRead, useNotifications } from '@/data/hooks.ts';
import type { AppNotification, NotificationKind } from '@/data/types.ts';
import { Menu, useToast } from '@/components/ui/index.ts';
import { relative } from '@/lib/dates.ts';
import { cn } from '@/lib/cn.ts';

export const NOTIF_ICON: Record<NotificationKind, typeof Bell> = {
  assignment: ClipboardCheck,
  reminder: CalendarClock,
  graded: CheckCheck,
  announcement: Megaphone,
  insight: Sparkles,
  overdue: CalendarClock,
  submission: Upload,
  admin: ShieldCheck,
};

/** Listens for live notifications: toast + optional browser notification. Also runs the demo scheduler. */
export function NotificationsBridge() {
  const qc = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();
  const navRef = useRef(navigate);
  navRef.current = navigate;
  useEffect(() => {
    const off = api().subscribeNotifications((n: AppNotification) => {
      qc.invalidateQueries({ queryKey: qk.notifications });
      if (n.kind === 'submission') qc.invalidateQueries({ queryKey: ['submissions'] });
      if (n.kind === 'assignment') qc.invalidateQueries({ queryKey: ['assignments'] });
      // Joins and join requests arrive as announcements: refresh class lists and requests.
      if (n.kind === 'announcement') {
        qc.invalidateQueries({ queryKey: qk.classes });
        qc.invalidateQueries({ queryKey: qk.myJoinRequests });
        qc.invalidateQueries({ queryKey: ['joinRequests'] });
        qc.invalidateQueries({ queryKey: ['roster'] });
        qc.invalidateQueries({ queryKey: qk.myCourseRequests });
        qc.invalidateQueries({ queryKey: ['myLessonEdits'] });
        qc.invalidateQueries({ queryKey: ['lessonEdits'] });
      }
      if (n.kind === 'admin') qc.invalidateQueries({ queryKey: qk.admin });
      toast({ kind: 'info', title: n.title, body: n.body, action: n.link ? { label: 'Open', onClick: () => navRef.current(n.link!) } : undefined });
      try {
        if ('Notification' in window && Notification.permission === 'granted' && document.visibilityState !== 'visible') {
          const bn = new Notification(n.title, { body: n.body, icon: `${import.meta.env.BASE_URL}favicon.svg`, tag: n.id });
          bn.onclick = () => {
            window.focus();
            if (n.link) navRef.current(n.link);
          };
        }
      } catch {
        /* notifications unsupported */
      }
    });
    // The demo backend has no server, so the browser runs the reminder scheduler.
    const run = () => api().runScheduledJobs().catch(() => undefined);
    run();
    const t = setInterval(run, 60_000);
    return () => {
      off();
      clearInterval(t);
    };
  }, [qc, toast]);
  return null;
}

export function NotificationBell() {
  const { data = [] } = useNotifications();
  const markRead = useMarkRead();
  const unread = data.filter((n) => !n.readAt).length;
  const navigate = useNavigate();
  return (
    <Menu
      className="w-[min(92vw,380px)] p-0"
      trigger={() => (
        <button type="button" className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-2 hover:bg-surface-2 hover:text-ink" aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}>
          {unread ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
          {unread > 0 && <span className="absolute right-1.5 top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-bad px-1 text-[10px] font-bold text-white">{unread > 9 ? '9+' : unread}</span>}
        </button>
      )}
    >
      {(close) => (
        <div>
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div className="font-semibold">Notifications</div>
            {unread > 0 && (
              <button type="button" className="text-sm font-medium text-brand hover:underline" onClick={() => markRead.mutate('all')}>
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-[60vh] overflow-y-auto p-1.5">
            {data.length === 0 && <div className="px-3 py-8 text-center text-sm text-ink-3">You’re all caught up.</div>}
            {data.slice(0, 12).map((n) => {
              const Icon = NOTIF_ICON[n.kind] ?? Bell;
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => {
                    if (!n.readAt) markRead.mutate([n.id]);
                    close();
                    if (n.link) navigate(n.link);
                  }}
                  className={cn('flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-surface-2', !n.readAt && 'bg-brand-50/60')}
                >
                  <span className={cn('mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', n.kind === 'reminder' || n.kind === 'overdue' ? 'bg-warn-soft text-warn-ink' : 'bg-brand-50 text-brand-700')}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-ink">{n.title}</span>
                    <span className="mt-0.5 line-clamp-2 block text-xs text-ink-3">{n.body}</span>
                    <span className="mt-1 block text-[11px] text-ink-3">{relative(n.createdAt)}</span>
                  </span>
                  {!n.readAt && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-label="Unread" />}
                </button>
              );
            })}
          </div>
          <div className="border-t border-line p-2">
            <Link to="/notifications" onClick={close} className="block rounded-lg px-3 py-2 text-center text-sm font-medium text-brand hover:bg-surface-2">
              See all notifications
            </Link>
          </div>
        </div>
      )}
    </Menu>
  );
}
