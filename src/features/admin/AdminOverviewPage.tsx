import { Link } from 'react-router-dom';
import { Activity, ArrowRight, ClipboardList, Clock3, FilePenLine, GraduationCap, Inbox, Presentation, School, Sparkles, UserX } from 'lucide-react';
import { useAdminAudit, useAdminCourseRequests, useAdminLessonEdits, useAdminOverview, useAdminUsers } from '@/data/hooks.ts';
import { useMe } from '@/features/auth/AuthProvider.tsx';
import { Avatar, Badge, Card, CardBody, CardHeader, PageHeader, PageSpinner, Skeleton, StatTile } from '@/components/ui/index.ts';
import { relative } from '@/lib/dates.ts';
import { SignupsChart } from './SignupsChart.tsx';
import { UserActions } from './UserActions.tsx';
import { auditTone, describeAudit } from './shared.tsx';

export default function AdminOverviewPage() {
  const me = useMe();
  const overview = useAdminOverview();
  const pending = useAdminUsers({ status: 'pending', limit: 5 });
  const audit = useAdminAudit(6);
  const requests = useAdminCourseRequests('new');
  const newRequests = requests.data?.length ?? 0;
  const edits = useAdminLessonEdits('pending');
  const waitingEdits = edits.data?.length ?? 0;

  if (overview.isLoading) return <PageSpinner />;
  if (overview.error) return <p className="rounded-xl bg-bad-soft px-4 py-3 text-bad-ink">{(overview.error as Error).message}</p>;
  const o = overview.data!;
  const newThisWeek = o.signupsByWeek.at(-1);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Admin console" title="Platform overview" subtitle="Everyone using Gradileo, at a glance." />

      {newRequests > 0 && (
        <Link to="/admin/requests" className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800 hover:bg-brand-100">
          <Inbox className="h-5 w-5 shrink-0" />
          <span className="flex-1">
            {newRequests} new course {newRequests === 1 ? 'request' : 'requests'} from students and teachers.
          </span>
          <span className="font-semibold">Review</span>
        </Link>
      )}
      {waitingEdits > 0 && (
        <Link to="/admin/edits" className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800 hover:bg-brand-100">
          <FilePenLine className="h-5 w-5 shrink-0" />
          <span className="flex-1">
            {waitingEdits} lesson {waitingEdits === 1 ? 'edit' : 'edits'} suggested by teachers {waitingEdits === 1 ? 'is' : 'are'} waiting for review.
          </span>
          <span className="font-semibold">Review</span>
        </Link>
      )}

      {o.pendingTeachers > 0 && (
        <Card className="ring-1 ring-warn/30">
          <CardHeader
            icon={<Clock3 className="h-5 w-5" />}
            title={`${o.pendingTeachers} teacher${o.pendingTeachers === 1 ? '' : 's'} waiting for approval`}
            subtitle="New teachers cannot create classes until you approve them."
            action={
              <Link to="/admin/users?status=pending" className="text-sm font-medium text-brand hover:underline">
                See all
              </Link>
            }
          />
          <CardBody className="pt-3">
            <ul className="divide-y divide-line">
              {(pending.data?.rows ?? []).map((u) => (
                <li key={u.id} className="flex flex-wrap items-center gap-3 py-3">
                  <Avatar name={u.fullName} color={u.avatarColor} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-ink">{u.fullName}</div>
                    <div className="truncate text-sm text-ink-3">
                      {u.email} · signed up {relative(u.createdAt)}
                    </div>
                  </div>
                  <UserActions u={u} meId={me.id} />
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Teachers" value={o.teachers} icon={<Presentation className="h-4 w-4" />} hint={o.pendingTeachers ? `${o.pendingTeachers} awaiting approval` : 'All approved'} />
        <StatTile label="Students" value={o.students} icon={<GraduationCap className="h-4 w-4" />} hint={`${o.activeStudents7d} active in the last 7 days`} />
        <StatTile label="Classes" value={o.classes} icon={<School className="h-4 w-4" />} hint={`${o.assignments} published assignment${o.assignments === 1 ? '' : 's'}`} />
        <StatTile label="Submissions" value={o.submissions7d} icon={<ClipboardList className="h-4 w-4" />} hint="Last 7 days" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader
            title="New accounts per week"
            subtitle={newThisWeek ? `${newThisWeek.teachers + newThisWeek.students} so far this week · last 12 weeks` : 'Last 12 weeks'}
          />
          <CardBody>
            <SignupsChart weeks={o.signupsByWeek} />
          </CardBody>
        </Card>
        <div className="space-y-3 lg:col-span-2">
          <StatTile label="AI insights generated" value={o.aiInsights30d} icon={<Sparkles className="h-4 w-4" />} hint="Last 30 days" />
          <StatTile label="Disabled accounts" value={o.disabled} icon={<UserX className="h-4 w-4" />} hint={o.disabled ? 'Cannot sign in until re-enabled' : 'None'} />
          <Card>
            <CardHeader
              icon={<Activity className="h-5 w-5" />}
              title="Recent admin activity"
              action={
                <Link to="/admin/audit" className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline">
                  Audit log <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            />
            <CardBody className="pt-3">
              {audit.isLoading ? (
                <Skeleton className="h-20" />
              ) : (audit.data ?? []).length === 0 ? (
                <p className="text-sm text-ink-3">No administrator changes yet.</p>
              ) : (
                <ul className="space-y-2.5">
                  {audit.data!.map((e) => (
                    <li key={e.id} className="flex items-start gap-2 text-sm">
                      <Badge tone={auditTone(e.action)} className="mt-0.5 shrink-0">
                        {relative(e.createdAt)}
                      </Badge>
                      <span className="text-ink-2">{describeAudit(e)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
