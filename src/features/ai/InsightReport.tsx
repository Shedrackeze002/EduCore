import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, Brain, Check, CheckCircle2, ClipboardPlus, Cpu, GraduationCap, Lightbulb, MessageCircle, RefreshCw, Sparkles, TrendingUp, Users, X } from 'lucide-react';
import { draftFromAction } from '@engine/actions.ts';
import { getSkill, lessonById } from '@engine/curriculum/index.ts';
import type { InsightData, InsightItem, ProposedAction } from '@engine/ai/types.ts';
import { api } from '@/data/index.ts';
import { qk, useAiStatus, useGenerateInsight, useRoster, useSetActionStatus } from '@/data/hooks.ts';
import type { Insight } from '@/data/types.ts';
import { Badge, Button, Card, CardBody, useToast } from '@/components/ui/index.ts';
import { relative } from '@/lib/dates.ts';
import { cn } from '@/lib/cn.ts';

const RISK = {
  on_track: { tone: 'good' as const, label: 'On track' },
  watch: { tone: 'warn' as const, label: 'Watch' },
  at_risk: { tone: 'bad' as const, label: 'Needs support' },
};

const ACTION_ICON = {
  assign_practice: ClipboardPlus,
  assign_review: RefreshCw,
  reteach_lesson: GraduationCap,
  challenge: TrendingUp,
  check_in: MessageCircle,
};

export function SourceBadge({ insight }: { insight: Insight }) {
  return insight.source === 'minimax' ? (
    <Badge tone="brand" icon={<Sparkles className="h-3 w-3" />}>
      {insight.model ?? 'MiniMax'}
    </Badge>
  ) : (
    <Badge tone="neutral" icon={<Cpu className="h-3 w-3" />}>
      Offline analyst
    </Badge>
  );
}

export function GenerateButton({ classId, studentId, label, size = 'sm' }: { classId: string; studentId: string | null; label?: string; size?: 'sm' | 'md' }) {
  const gen = useGenerateInsight(classId);
  const toast = useToast();
  const status = useAiStatus();
  return (
    <Button
      size={size}
      variant="soft"
      loading={gen.isPending}
      icon={<Sparkles className="h-4 w-4" />}
      onClick={async () => {
        try {
          const ins = await gen.mutateAsync(studentId);
          if (ins.error) toast({ kind: 'info', title: 'Used the offline analyst', body: `MiniMax was unavailable: ${ins.error.slice(0, 140)}` });
        } catch (e) {
          toast({ kind: 'error', title: 'Could not analyse', body: (e as Error).message });
        }
      }}
      title={status.data?.note}
    >
      {label ?? 'Analyse now'}
    </Button>
  );
}

export function useApplyAction(classId: string) {
  const toast = useToast();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const setStatus = useSetActionStatus(classId);
  return async (insightId: string, action: ProposedAction) => {
    try {
      if (action.type === 'check_in') {
        await setStatus.mutateAsync({ insightId, actionId: action.id, status: 'done' });
        toast({ kind: 'success', title: 'Marked as done' });
        return;
      }
      const draft = draftFromAction(action);
      if (!draft) throw new Error('This suggestion cannot be turned into an assignment.');
      const saved = await api().saveAssignment({ classId, ...draft, createdBy: 'ai' });
      await api().publishAssignment(saved.id);
      await setStatus.mutateAsync({ insightId, actionId: action.id, status: 'done' });
      await qc.invalidateQueries({ queryKey: qk.assignments(classId) });
      toast({ kind: 'success', title: 'Assigned', body: `${saved.title} was published${draft.assignedTo === 'all' ? ' to the class' : ` to ${draft.assignedTo.length} student${draft.assignedTo.length > 1 ? 's' : ''}`}.`, action: { label: 'View', onClick: () => navigate(`/t/c/${classId}/assignments/${saved.id}`) } });
    } catch (e) {
      toast({ kind: 'error', title: 'Could not apply', body: (e as Error).message });
    }
  };
}

export function ActionRow({ classId, insightId, action, names }: { classId: string; insightId: string; action: ProposedAction; names: Map<string, string> }) {
  const apply = useApplyAction(classId);
  const setStatus = useSetActionStatus(classId);
  const [busy, setBusy] = useState(false);
  const Icon = ACTION_ICON[action.type];
  const who = action.studentIds.length ? action.studentIds.map((id) => names.get(id)?.split(' ')[0] ?? 'student').slice(0, 5).join(', ') + (action.studentIds.length > 5 ? ` +${action.studentIds.length - 5}` : '') : 'Whole class';
  const done = action.status === 'done' || action.status === 'accepted';
  return (
    <div className={cn('rounded-xl border p-3.5', done ? 'border-good/30 bg-good-soft/30' : action.status === 'dismissed' ? 'border-line opacity-60' : 'border-line bg-surface')}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-medium text-ink">{action.title}</div>
          <div className="mt-0.5 text-xs text-ink-3">
            {who}
            {action.skillIds.length > 0 && ` · ${action.skillIds.map((s) => getSkill(s)?.name).filter(Boolean).join(', ')}`}
            {action.lessonId && ` · Lesson ${lessonById(action.lessonId)?.number}`}
          </div>
          {action.rationale && <p className="mt-1.5 text-sm text-ink-2">{action.rationale}</p>}
        </div>
      </div>
      {action.status === 'proposed' && (
        <div className="mt-3 flex flex-wrap justify-end gap-2">
          <Button size="xs" variant="ghost" icon={<X className="h-3.5 w-3.5" />} onClick={() => setStatus.mutate({ insightId, actionId: action.id, status: 'dismissed' })}>
            Dismiss
          </Button>
          {action.type === 'reteach_lesson' && action.lessonId && (
            <Button size="xs" variant="secondary" to={`/present/${classId}/${action.lessonId}`}>
              Present lesson
            </Button>
          )}
          <Button
            size="xs"
            loading={busy}
            icon={<Check className="h-3.5 w-3.5" />}
            onClick={async () => {
              setBusy(true);
              await apply(insightId, action);
              setBusy(false);
            }}
          >
            {action.type === 'check_in' ? 'Mark done' : action.type === 'reteach_lesson' ? 'Assign lesson' : 'Approve & assign'}
          </Button>
        </div>
      )}
      {done && (
        <div className="mt-2 flex items-center justify-end gap-1 text-xs font-medium text-good-ink">
          <CheckCircle2 className="h-3.5 w-3.5" /> Done
        </div>
      )}
    </div>
  );
}

function ItemList({ title, items, icon, tone }: { title: string; items: InsightItem[]; icon: React.ReactNode; tone: string }) {
  if (!items.length) return null;
  return (
    <div>
      <div className={cn('mb-2 flex items-center gap-2 text-sm font-semibold', tone)}>
        {icon}
        {title}
      </div>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="rounded-xl bg-surface-2/70 px-3 py-2 text-sm">
            {it.skillId && !it.text.startsWith(getSkill(it.skillId)?.name ?? '\u0000') && <div className="text-xs font-semibold text-ink-3">{getSkill(it.skillId)?.name}</div>}
            <div className="text-ink-2">{it.text}</div>
            {it.evidence && <div className="mt-0.5 text-xs text-ink-3">{it.evidence}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InsightBody({ data, insight, classId }: { data: InsightData; insight: Insight; classId: string }) {
  const roster = useRoster(classId);
  const names = new Map((roster.data ?? []).map((p) => [p.id, p.fullName]));
  return (
    <div className="space-y-5">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={RISK[data.riskLevel].tone}>{RISK[data.riskLevel].label}</Badge>
          <SourceBadge insight={insight} />
          <span className="text-xs text-ink-3">{relative(insight.createdAt)}</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold leading-snug">{data.headline}</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{data.summary}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <ItemList title="Strengths" items={data.strengths} icon={<CheckCircle2 className="h-4 w-4" />} tone="text-good-ink" />
        <ItemList title="Gaps to address" items={data.weaknesses} icon={<AlertTriangle className="h-4 w-4" />} tone="text-bad-ink" />
        <ItemList title="Likely misconceptions" items={data.misconceptions} icon={<Brain className="h-4 w-4" />} tone="text-warn-ink" />
        <ItemList title="Areas of growth" items={data.growth} icon={<TrendingUp className="h-4 w-4" />} tone="text-info-ink" />
      </div>
      {data.groups && data.groups.length > 0 && (
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Users className="h-4 w-4 text-brand" /> Suggested small groups
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {data.groups.map((g, i) => (
              <div key={i} className="rounded-xl border border-line p-3 text-sm">
                <div className="font-medium">{g.name}</div>
                <div className="mt-1 text-ink-2">{g.studentIds.map((id) => names.get(id) ?? 'Student').join(', ')}</div>
                {g.rationale && <div className="mt-1 text-xs text-ink-3">{g.rationale}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      {data.actions.length > 0 && (
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Lightbulb className="h-4 w-4 text-brand" /> Recommended next steps
          </div>
          <div className="space-y-2">
            {data.actions.map((a) => (
              <ActionRow key={a.id} classId={classId} insightId={insight.id} action={a} names={names} />
            ))}
          </div>
        </div>
      )}
      {data.studentNote && (
        <div className="rounded-xl border border-brand-200 bg-brand-50/60 p-3 text-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-brand-700">Message for the student</div>
          <p className="mt-1 text-ink-2">{data.studentNote}</p>
        </div>
      )}
    </div>
  );
}

export function InsightCompact({ insight, classId, link }: { insight: Insight | undefined; classId: string; link?: string }) {
  const roster = useRoster(classId);
  const names = new Map((roster.data ?? []).map((p) => [p.id, p.fullName]));
  if (!insight)
    return (
      <Card>
        <CardBody>
          <div className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-5 w-5 text-brand" /> AI teaching assistant
          </div>
          <p className="mt-2 text-sm text-ink-3">Analyse your class to find gaps, misconceptions and the most valuable next steps.</p>
          <div className="mt-4">
            <GenerateButton classId={classId} studentId={null} />
          </div>
        </CardBody>
      </Card>
    );
  const open = insight.data.actions.filter((a) => a.status === 'proposed');
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-line bg-gradient-to-br from-brand-50 to-surface px-5 py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-5 w-5 text-brand" /> AI teaching assistant
          </div>
          <GenerateButton classId={classId} studentId={null} label="Refresh" />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge tone={RISK[insight.data.riskLevel].tone}>{RISK[insight.data.riskLevel].label}</Badge>
          <SourceBadge insight={insight} />
          <span className="text-xs text-ink-3">{relative(insight.createdAt)}</span>
        </div>
        <p className="mt-2 font-medium leading-snug">{insight.data.headline}</p>
      </div>
      <CardBody className="space-y-2">
        {open.length === 0 && <p className="text-sm text-ink-3">No open suggestions. Refresh after students complete more work.</p>}
        {open.slice(0, 3).map((a) => (
          <ActionRow key={a.id} classId={classId} insightId={insight.id} action={a} names={names} />
        ))}
        {link && (
          <Link to={link} className="block pt-1 text-center text-sm font-semibold text-brand hover:underline">
            Open full report
          </Link>
        )}
      </CardBody>
    </Card>
  );
}
