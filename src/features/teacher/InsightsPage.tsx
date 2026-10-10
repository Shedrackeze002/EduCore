import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Bot, ChevronRight, Cpu, History, Sparkles, Users } from 'lucide-react';
import { api } from '@/data/index.ts';
import { useAiStatus, useClass, useInsights, useRoster, useUpdateClass } from '@/data/hooks.ts';
import type { Insight } from '@/data/types.ts';
import { Avatar, Badge, Button, Card, CardBody, CardHeader, Modal, PageHeader, PageSpinner, ProgressBar, Switch, useToast } from '@/components/ui/index.ts';
import { GenerateButton, InsightBody, SourceBadge } from '@/features/ai/InsightReport.tsx';
import { fmtDateTime, relative } from '@/lib/dates.ts';
import { useClassId } from './shared.tsx';

const RISK_TONE = { on_track: 'good', watch: 'warn', at_risk: 'bad' } as const;
const RISK_LABEL = { on_track: 'On track', watch: 'Watch', at_risk: 'Needs support' } as const;

export default function InsightsPage() {
  const classId = useClassId();
  const cls = useClass(classId);
  const roster = useRoster(classId);
  const all = useInsights(classId);
  const status = useAiStatus();
  const update = useUpdateClass(classId);
  const qc = useQueryClient();
  const toast = useToast();
  const [batch, setBatch] = useState<{ done: number; total: number } | null>(null);
  const [viewing, setViewing] = useState<Insight | null>(null);

  const classReports = useMemo(() => (all.data ?? []).filter((i) => !i.studentId), [all.data]);
  const latestByStudent = useMemo(() => {
    const m = new Map<string, Insight>();
    for (const i of all.data ?? []) if (i.studentId && !m.has(i.studentId)) m.set(i.studentId, i);
    return m;
  }, [all.data]);

  async function analyseEveryone() {
    const students = roster.data ?? [];
    setBatch({ done: 0, total: students.length });
    let fallbacks = 0;
    try {
      for (let i = 0; i < students.length; i++) {
        const ins = await api().generateInsight(classId, students[i].id);
        if (ins.error) fallbacks++;
        setBatch({ done: i + 1, total: students.length });
      }
      toast({ kind: 'success', title: `Analysed ${students.length} students`, body: fallbacks ? `${fallbacks} used the offline analyst because MiniMax was unavailable.` : undefined });
    } catch (e) {
      toast({ kind: 'error', title: 'Stopped early', body: (e as Error).message });
    } finally {
      await qc.invalidateQueries({ queryKey: ['insights', classId] });
      setBatch(null);
    }
  }

  if (cls.isLoading || all.isLoading) return <PageSpinner />;
  const latest = classReports[0];
  const order = { at_risk: 0, watch: 1, on_track: 2 } as const;
  const students = [...(roster.data ?? [])].sort((a, b) => {
    const ra = latestByStudent.get(a.id)?.data.riskLevel;
    const rb = latestByStudent.get(b.id)?.data.riskLevel;
    return (ra ? order[ra] : 3) - (rb ? order[rb] : 3) || a.fullName.localeCompare(b.fullName);
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI teaching assistant"
        subtitle="Reads every answer, hint and mastery change, then suggests the most valuable next steps. You approve before anything is assigned."
        actions={<GenerateButton classId={classId} studentId={null} label="Analyse class" size="md" />}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">{status.data?.live ? <Sparkles className="h-5 w-5" /> : <Cpu className="h-5 w-5" />}</span>
            <div className="min-w-0">
              <div className="font-semibold">{status.data?.live ? `Live: ${status.data.model}` : 'Offline analyst'}</div>
              <p className="mt-0.5 text-sm text-ink-3">{status.data?.note}</p>
              {!status.data?.live && (
                <Link to={`/t/c/${classId}/settings#ai`} className="mt-2 inline-block text-sm font-semibold text-brand hover:underline">
                  Connect MiniMax
                </Link>
              )}
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <Switch
            checked={!!cls.data?.settings.aiAutopilot}
            onChange={async (aiAutopilot) => {
              await update.mutateAsync({ settings: { aiAutopilot } });
              toast({ kind: 'success', title: aiAutopilot ? 'Autopilot on' : 'Autopilot off' });
            }}
            label={
              <span className="inline-flex items-center gap-2">
                <Bot className="h-4 w-4 text-brand" /> Autopilot practice
              </span>
            }
            description="After each graded assignment, automatically assign a short practice set on the skills a student missed. Practice sets are low-stakes and labelled as AI-assigned."
          />
        </Card>
      </div>

      <Card>
        <CardHeader title="Class report" subtitle={latest ? `Generated ${relative(latest.createdAt)}` : 'Not generated yet'} icon={<Sparkles className="h-5 w-5" />} />
        <CardBody className="pt-4">
          {latest ? (
            <InsightBody data={latest.data} insight={latest} classId={classId} />
          ) : (
            <div className="rounded-xl border border-dashed border-line-strong p-8 text-center text-sm text-ink-3">
              Analyse the class to see strengths, gaps, likely misconceptions, suggested groups and ready-to-assign next steps.
              <div className="mt-3">
                <GenerateButton classId={classId} studentId={null} label="Analyse class" />
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Student reports"
          subtitle="Students needing support are listed first"
          icon={<Users className="h-5 w-5" />}
          action={
            <Button size="sm" variant="soft" loading={!!batch} onClick={analyseEveryone} disabled={!roster.data?.length}>
              {batch ? `${batch.done}/${batch.total}` : 'Analyse every student'}
            </Button>
          }
        />
        {batch && <ProgressBar className="mx-5 mt-3 w-auto" value={(batch.done / Math.max(1, batch.total)) * 100} />}
        <div className="mt-3 divide-y divide-line border-t border-line">
          {students.map((s) => {
            const ins = latestByStudent.get(s.id);
            return (
              <div key={s.id} className="flex flex-wrap items-center gap-3 px-5 py-3 sm:flex-nowrap">
                <Avatar name={s.fullName} color={s.avatarColor} size={34} />
                <div className="min-w-0 flex-1 basis-60">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{s.fullName}</span>
                    {ins && <Badge tone={RISK_TONE[ins.data.riskLevel]}>{RISK_LABEL[ins.data.riskLevel]}</Badge>}
                  </div>
                  <div className="truncate text-sm text-ink-3">{ins ? ins.data.headline : 'No report yet'}</div>
                </div>
                {ins && <span className="hidden text-xs text-ink-3 md:inline">{relative(ins.createdAt)}</span>}
                <GenerateButton classId={classId} studentId={s.id} label={ins ? 'Refresh' : 'Analyse'} />
                <Link to={`/t/c/${classId}/students/${s.id}`} className="rounded-lg p-1.5 text-ink-3 hover:bg-surface-2 hover:text-ink" aria-label={`Open ${s.fullName}`}>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </Card>

      {classReports.length > 1 && (
        <Card>
          <CardHeader title="Earlier class reports" icon={<History className="h-5 w-5" />} />
          <div className="mt-3 divide-y divide-line border-t border-line">
            {classReports.slice(1, 11).map((i) => (
              <button key={i.id} type="button" onClick={() => setViewing(i)} className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-surface-2/50">
                <Badge tone={RISK_TONE[i.data.riskLevel]}>{RISK_LABEL[i.data.riskLevel]}</Badge>
                <span className="min-w-0 flex-1 truncate text-sm">{i.data.headline}</span>
                <SourceBadge insight={i} />
                <span className="hidden text-xs text-ink-3 sm:inline">{fmtDateTime(i.createdAt)}</span>
              </button>
            ))}
          </div>
        </Card>
      )}
      {viewing && (
        <Modal open onClose={() => setViewing(null)} size="lg" title="Class report" description={fmtDateTime(viewing.createdAt)}>
          <InsightBody data={viewing.data} insight={viewing} classId={classId} />
        </Modal>
      )}
    </div>
  );
}
