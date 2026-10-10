import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Users } from 'lucide-react';
import type { AdminUserStatus, Role } from '@/data/types.ts';
import { useAdminOverview, useAdminUsers } from '@/data/hooks.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { Avatar, Badge, Card, EmptyState, Input, PageHeader, Select, Skeleton, Tabs } from '@/components/ui/index.ts';
import { fmtDate, relative } from '@/lib/dates.ts';
import { UserActions } from './UserActions.tsx';
import { Pager, UserStatusBadges, useDebounced } from './shared.tsx';

const LIMIT = 50;
const STATUSES: Array<AdminUserStatus | ''> = ['', 'active', 'pending', 'disabled', 'admin'];

export default function AdminUsersPage() {
  const me = useMe();
  const [params, setParams] = useSearchParams();
  const status = (STATUSES.includes(params.get('status') as AdminUserStatus) ? params.get('status') : '') as AdminUserStatus | '';
  const role = (params.get('role') === 'teacher' || params.get('role') === 'student' ? params.get('role') : '') as Role | '';
  const offset = Math.max(0, Number(params.get('from')) || 0);
  const [search, setSearch] = useState(params.get('q') ?? '');
  const q = useDebounced(search.trim());
  const users = useAdminUsers({ search: q, role, status, limit: LIMIT, offset });
  const overview = useAdminOverview();

  const update = (patch: Record<string, string>) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    if (!('from' in patch)) next.delete('from');
    setParams(next, { replace: true });
  };

  const rows = users.data?.rows ?? [];
  const total = users.data?.total ?? 0;

  return (
    <div>
      <PageHeader eyebrow="Admin console" title="Users" subtitle="Every teacher and student account on EduCore." />
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        <Tabs
          value={status || 'all'}
          onChange={(v) => update({ status: v === 'all' ? '' : v })}
          items={[
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'pending', label: 'Awaiting approval', count: overview.data?.pendingTeachers || undefined },
            { value: 'disabled', label: 'Disabled' },
            { value: 'admin', label: 'Admins' },
          ]}
        />
        <div className="flex flex-1 gap-2 lg:justify-end">
          <div className="relative min-w-0 flex-1 lg:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-ink-3" />
            <Input
              aria-label="Search users"
              placeholder="Search name, email or username"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (offset) update({ from: '' });
              }}
              className="[&_input]:pl-9"
            />
          </div>
          <Select aria-label="Role" value={role} onChange={(e) => update({ role: e.target.value })} className="w-36 shrink-0">
            <option value="">All roles</option>
            <option value="teacher">Teachers</option>
            <option value="student">Students</option>
          </Select>
        </div>
      </div>

      <Card>
        {users.isLoading ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
        ) : users.error ? (
          <p className="m-5 rounded-xl bg-bad-soft px-4 py-3 text-bad-ink">{(users.error as Error).message}</p>
        ) : rows.length === 0 ? (
          <EmptyState className="m-5 border-0" icon={<Users className="h-6 w-6" />} title="No one matches">
            {q || role || status ? 'Try a different search or filter.' : 'Nobody has signed up yet.'}
          </EmptyState>
        ) : (
          <ul className="divide-y divide-line" aria-label="Users">
            {rows.map((u) => (
              <li key={u.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5 sm:px-5">
                <div className="flex min-w-0 flex-1 basis-64 items-center gap-3">
                  <Avatar name={u.fullName} color={u.avatarColor} size={38} />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="truncate font-medium text-ink">{u.fullName}</span>
                      {u.id === me.id && <span className="text-xs text-ink-3">(you)</span>}
                      <UserStatusBadges u={u} />
                    </div>
                    <div className="truncate text-sm text-ink-3">{u.role === 'student' && u.username ? `@${u.username}` : u.email}</div>
                  </div>
                </div>
                <div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pl-[50px] text-sm text-ink-3 md:order-2 md:w-auto md:shrink-0 md:gap-x-5 md:pl-0">
                  <Badge tone={u.role === 'teacher' ? 'brand' : 'neutral'}>{u.role === 'teacher' ? 'Teacher' : 'Student'}</Badge>
                  <span className="tabular-nums md:w-20">
                    {u.classes} class{u.classes === 1 ? '' : 'es'}
                  </span>
                  <span className="md:w-28" title={`Joined ${fmtDate(u.createdAt, 'MMM d, yyyy')}`}>
                    Joined {fmtDate(u.createdAt, 'MMM d')}
                  </span>
                  <span className="truncate md:w-36">{u.lastSignInAt ? `Active ${relative(u.lastSignInAt)}` : 'Never signed in'}</span>
                </div>
                <div className="order-2 ml-auto shrink-0 md:order-3">
                  <UserActions u={u} meId={me.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
      <Pager offset={offset} limit={LIMIT} total={total} onChange={(o) => update({ from: o ? String(o) : '' })} />
    </div>
  );
}
