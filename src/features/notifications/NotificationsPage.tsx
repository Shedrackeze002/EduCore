import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellOff } from 'lucide-react';
import { useMarkRead, useNotifications } from '@/data/hooks.ts';
import { Button, EmptyState, PageHeader, PageSpinner, Tabs } from '@/components/ui/index.ts';
import { NOTIF_ICON } from '@/components/layout/NotificationBell.tsx';
import { fmtDateTime, relative } from '@/lib/dates.ts';
import { cn } from '@/lib/cn.ts';

export default function NotificationsPage() {
  const { data = [], isLoading } = useNotifications();
  const markRead = useMarkRead();
  const navigate = useNavigate();
  const [view, setView] = useState<'all' | 'unread'>('all');
  const unread = data.filter((n) => !n.readAt);
  const list = view === 'unread' ? unread : data;
  if (isLoading) return <PageSpinner />;
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Notifications"
        actions={
          unread.length > 0 && (
            <Button variant="secondary" onClick={() => markRead.mutate('all')}>
              Mark all read
            </Button>
          )
        }
      />
      <Tabs
        className="mb-4"
        value={view}
        onChange={setView}
        items={[
          { value: 'all', label: 'All', count: data.length },
          { value: 'unread', label: 'Unread', count: unread.length },
        ]}
      />
      {list.length === 0 ? (
        <EmptyState icon={<BellOff className="h-6 w-6" />} title={view === 'unread' ? 'You are all caught up' : 'No notifications yet'}>
          New assignments, deadline reminders, grades and announcements appear here.
        </EmptyState>
      ) : (
        <div className="card divide-y divide-line overflow-hidden">
          {list.map((n) => {
            const Icon = NOTIF_ICON[n.kind];
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => {
                  if (!n.readAt) markRead.mutate([n.id]);
                  if (n.link) navigate(n.link);
                }}
                className={cn('flex w-full items-start gap-3 px-4 py-3.5 text-left transition hover:bg-surface-2/60 sm:px-5', !n.readAt && 'bg-brand-50/40')}
              >
                <span className={cn('mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', n.kind === 'reminder' || n.kind === 'overdue' ? 'bg-warn-soft text-warn-ink' : 'bg-brand-50 text-brand-700')}>
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn('block text-[15px]', !n.readAt ? 'font-semibold' : 'font-medium')}>{n.title}</span>
                  {n.body && <span className="mt-0.5 block text-sm text-ink-3">{n.body}</span>}
                  <span className="mt-1 block text-xs text-ink-3" title={fmtDateTime(n.createdAt)}>
                    {relative(n.createdAt)}
                  </span>
                </span>
                {!n.readAt && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-label="Unread" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
