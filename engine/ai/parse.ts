/** Robust parsing and validation of model output into InsightData. */
import type { ActionType, InsightData, InsightItem, ProposedAction } from './types.ts';

const ACTION_TYPES: ActionType[] = ['assign_practice', 'assign_review', 'reteach_lesson', 'challenge', 'check_in'];

/** Remove <think> blocks and code fences, then extract the first balanced JSON object. */
export function extractJson(text: string): unknown {
  let t = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  t = t.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  const start = t.indexOf('{');
  if (start < 0) throw new Error('No JSON object in model output');
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = start; i < t.length; i++) {
    const c = t[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return JSON.parse(t.slice(start, i + 1));
    }
  }
  throw new Error('Unterminated JSON object in model output');
}

const str = (v: unknown, max = 600): string => (typeof v === 'string' ? v.trim().slice(0, max) : '');

function items(v: unknown, skillIds: Set<string>, max: number): InsightItem[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => {
      if (typeof x === 'string') return { text: x.slice(0, 400) };
      if (!x || typeof x !== 'object') return null;
      const o = x as Record<string, unknown>;
      const text = str(o.text, 400);
      if (!text) return null;
      const skillId = typeof o.skillId === 'string' && skillIds.has(o.skillId) ? o.skillId : undefined;
      const evidence = str(o.evidence, 300) || undefined;
      return { text, skillId, evidence };
    })
    .filter((x): x is InsightItem => !!x)
    .slice(0, max);
}

let counter = 0;
export function actionId(): string {
  counter = (counter + 1) % 1e6;
  return `act_${Date.now().toString(36)}_${counter.toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Validate a parsed object against what we know is real (skill ids, student ids, lesson ids).
 * Unknown references are dropped rather than trusted.
 */
export function validateInsight(
  raw: unknown,
  scope: 'student' | 'class',
  known: { skillIds: Set<string>; studentIds: Set<string>; lessonIds: Set<string>; defaultStudentId?: string },
): InsightData {
  if (!raw || typeof raw !== 'object') throw new Error('Model output is not an object');
  const o = raw as Record<string, unknown>;
  const risk = o.riskLevel === 'at_risk' || o.riskLevel === 'watch' || o.riskLevel === 'on_track' ? o.riskLevel : 'watch';
  const actions: ProposedAction[] = (Array.isArray(o.actions) ? o.actions : [])
    .map((a): ProposedAction | null => {
      if (!a || typeof a !== 'object') return null;
      const r = a as Record<string, unknown>;
      const type = ACTION_TYPES.includes(r.type as ActionType) ? (r.type as ActionType) : null;
      if (!type) return null;
      const skillIds = (Array.isArray(r.skillIds) ? r.skillIds : []).filter((s): s is string => typeof s === 'string' && known.skillIds.has(s)).slice(0, 6);
      let studentIds = (Array.isArray(r.studentIds) ? r.studentIds : []).filter((s): s is string => typeof s === 'string' && known.studentIds.has(s));
      if (scope === 'student' && known.defaultStudentId) studentIds = [known.defaultStudentId];
      if (type !== 'check_in' && type !== 'reteach_lesson' && skillIds.length === 0) return null;
      if (studentIds.length === 0 && scope === 'class' && type !== 'reteach_lesson') return null;
      const lessonId = typeof r.lessonId === 'string' && known.lessonIds.has(r.lessonId) ? r.lessonId : undefined;
      const qc = typeof r.questionCount === 'number' ? Math.min(20, Math.max(3, Math.round(r.questionCount))) : undefined;
      const due = typeof r.dueInDays === 'number' ? Math.min(14, Math.max(1, Math.round(r.dueInDays))) : undefined;
      return {
        id: actionId(),
        type,
        title: str(r.title, 120) || 'Suggested action',
        skillIds,
        studentIds,
        lessonId,
        questionCount: qc,
        dueInDays: due,
        rationale: str(r.rationale, 400),
        status: 'proposed',
      };
    })
    .filter((a): a is ProposedAction => !!a)
    .slice(0, scope === 'class' ? 4 : 3);

  const nextSteps = (Array.isArray(o.nextSteps) ? o.nextSteps : [])
    .map((n) => {
      if (typeof n === 'string') return { text: n.slice(0, 300) };
      if (!n || typeof n !== 'object') return null;
      const r = n as Record<string, unknown>;
      const text = str(r.text, 300);
      if (!text) return null;
      const idx = typeof r.actionIndex === 'number' ? r.actionIndex : -1;
      return { text, actionId: actions[idx]?.id };
    })
    .filter((x): x is { text: string; actionId: string | undefined } => !!x)
    .slice(0, 5);

  const groups =
    scope === 'class' && Array.isArray(o.groups)
      ? o.groups
          .map((g) => {
            if (!g || typeof g !== 'object') return null;
            const r = g as Record<string, unknown>;
            const studentIds = (Array.isArray(r.studentIds) ? r.studentIds : []).filter((s): s is string => typeof s === 'string' && known.studentIds.has(s));
            const skillIds = (Array.isArray(r.skillIds) ? r.skillIds : []).filter((s): s is string => typeof s === 'string' && known.skillIds.has(s));
            if (!studentIds.length) return null;
            return { name: str(r.name, 80) || 'Group', studentIds, skillIds, rationale: str(r.rationale, 300) };
          })
          .filter((g): g is NonNullable<typeof g> => !!g)
          .slice(0, 4)
      : undefined;

  const headline = str(o.headline, 200);
  const summary = str(o.summary, 1200);
  if (!headline && !summary) throw new Error('Model output is missing a summary');
  return {
    scope,
    headline: headline || summary.split('. ')[0],
    summary,
    riskLevel: risk,
    strengths: items(o.strengths, known.skillIds, 5),
    weaknesses: items(o.weaknesses, known.skillIds, 5),
    misconceptions: items(o.misconceptions, known.skillIds, 5),
    growth: items(o.growth, known.skillIds, 5),
    nextSteps: nextSteps.length ? nextSteps : actions.map((a) => ({ text: a.title, actionId: a.id })),
    actions,
    groups,
    studentNote: scope === 'student' ? str(o.studentNote, 500) || undefined : undefined,
  };
}
