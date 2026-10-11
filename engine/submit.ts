/**
 * Submission processing shared by the browser (demo mode) and the
 * `grade-submission` edge function (production): validate item references,
 * grade authoritatively, update mastery, and produce analytics events.
 */
import { applyToMastery, gradeSubmission, type AssignmentContent, type GradeSummary, type StoredResponse, itemFromRef } from './assemble.ts';
import { answerMarkdown } from './answers.ts';
import { gradeItem } from './grade.ts';
import { getSkill } from './curriculum/index.ts';
import { applyObservation, DEFAULT_BKT, emptySkillState, type MasteryLevel, type SkillState } from './mastery.ts';
import type { Item, ItemRef } from './types.ts';

export interface SubmitInput {
  assignmentId: string | null;
  content: AssignmentContent;
  dueAt: string | null;
  submissionId: string;
  items: ItemRef[];
  responses: Record<number, StoredResponse>;
  mastery: Map<string, SkillState>;
  now: string;
  hintPenalty?: boolean;
}

export interface SkillEventOut {
  skillId: string;
  correct: boolean;
  assisted: boolean;
  at: string;
  prompt: string;
  answer: string;
  expected: string;
}

export interface SubmitOutput {
  summary: GradeSummary;
  mastery: Map<string, SkillState>;
  changes: Array<{ skillId: string; before: MasteryLevel; after: MasteryLevel; pBefore: number; pAfter: number }>;
  events: SkillEventOut[];
  status: 'graded' | 'submitted';
  late: boolean;
}

const MAX_ITEMS = 120;

/** Ensure the client did not invent items outside what the assignment allows. Returns an error message or null. */
export function validateRefs(items: ItemRef[], content: AssignmentContent, practiceSkillIds?: string[]): string | null {
  if (!Array.isArray(items) || items.length > MAX_ITEMS) return 'Too many items.';
  const allowedSkills = new Set([...content.sections.map((s) => s.skillId), ...(practiceSkillIds ?? [])]);
  const perSkill = new Map<string, number>();
  for (const ref of items) {
    if ('custom' in ref) {
      if (!Number.isInteger(ref.custom) || ref.custom < 0 || ref.custom >= content.custom.length) return 'Unknown custom question.';
      continue;
    }
    if (!allowedSkills.has(ref.skillId) || !getSkill(ref.skillId)) return `Skill ${ref.skillId} is not part of this assignment.`;
    if (![1, 2, 3].includes(ref.difficulty)) return 'Invalid difficulty.';
    if (!Number.isInteger(ref.seed)) return 'Invalid seed.';
    perSkill.set(ref.skillId, (perSkill.get(ref.skillId) ?? 0) + 1);
  }
  // Fixed assignments (no practice) must contain exactly the configured counts.
  if (!practiceSkillIds?.length && content.masteryGoal === undefined) {
    for (const s of content.sections) {
      if ((perSkill.get(s.skillId) ?? 0) !== s.count) return `Expected ${s.count} questions for ${s.skillId}.`;
    }
  }
  return null;
}

function plain(md: string): string {
  return md
    .replace(/\$\$?([^$]+)\$\$?/g, '$1')
    .replace(/\\(?:dfrac|frac)\{([^{}]*)\}\{([^{}]*)\}/g, (_, a: string, b: string) => {
      const wrap = (x: string) => (/^-?[\w.]+$/.test(x.trim()) ? x.trim() : `(${x.trim()})`);
      return `${wrap(a)}/${wrap(b)}`;
    })
    .replace(/\\sqrt\[(\d+)\]\{([^{}]*)\}/g, '$1√($2)')
    .replace(/\\sqrt\{([^{}]*)\}/g, (_, a: string) => (/^[\w.]+$/.test(a) ? `√${a}` : `√(${a})`))
    .replace(/\\text\{([^}]*)\}/g, '$1')
    .replace(/\\(?:cdot|times)/g, '×')
    .replace(/\\pi/g, 'π')
    .replace(/\\pm/g, '±')
    .replace(/\\(?:le|leq)\b/g, '≤')
    .replace(/\\(?:ge|geq)\b/g, '≥')
    .replace(/\^\{?\\circ\}?/g, '°')
    .replace(/\\theta/g, 'θ')
    .replace(/\^\{([^{}]*)\}/g, '^$1')
    .replace(/\\[,;! ]/g, ' ')
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[{}`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 300);
}

/** A student's response in words: choice text instead of choice ids. */
function readableAnswer(item: Item | null, answers: string[]): string {
  if (!item) return answers.join(' | ');
  return item.parts
    .map((p, i) => {
      const r = answers[i] ?? '';
      const spec = p.answer;
      if (spec.kind === 'mc') return plain(spec.choices.find((c) => c.id === r)?.md ?? r);
      if (spec.kind === 'multi' || spec.kind === 'order') {
        const list = spec.kind === 'multi' ? spec.choices : spec.items;
        return r
          .split(',')
          .filter(Boolean)
          .map((id) => plain(list.find((c) => c.id === id)?.md ?? id))
          .join('; ');
      }
      return r;
    })
    .join(' | ');
}

export function processSubmission(input: SubmitInput): SubmitOutput {
  const summary = gradeSubmission(input.items, input.responses, input.content, input.assignmentId ?? 'practice', { hintPenalty: input.hintPenalty });
  const before = new Map(input.mastery);
  let states = new Map(input.mastery);

  // Earlier tries on a slot ("try a similar question") are evidence too.
  input.items.forEach((_, i) => {
    const hist = input.responses[i]?.history ?? [];
    for (const h of hist) {
      if ('custom' in h.ref) continue;
      const item = itemFromRef(h.ref, input.content, input.assignmentId ?? 'practice');
      const def = getSkill(h.ref.skillId);
      if (!item || !def) continue;
      const res = gradeItem(item, h.answers ?? []);
      const params = DEFAULT_BKT[def.format];
      const prev = states.get(def.id) ?? emptySkillState(def.id, params);
      states.set(def.id, applyObservation(prev, { correct: res.correct, assisted: (h.hintsUsed ?? 0) > 0, sessionId: input.submissionId, at: input.now }, params));
    }
  });
  states = applyToMastery(states, summary.items, input.submissionId, input.now);

  const events: SkillEventOut[] = summary.items
    .filter((g) => !g.manual && getSkill(g.skillId))
    .map((g, idx) => {
      const i = input.items.indexOf(g.ref);
      const item = itemFromRef(g.ref, input.content, input.assignmentId ?? 'practice');
      const resp = input.responses[i >= 0 ? i : idx];
      return {
        skillId: g.skillId,
        correct: g.result.correct,
        assisted: g.assisted,
        at: input.now,
        prompt: item ? plain(item.prompt) : '',
        answer: readableAnswer(item, resp?.answers ?? []).slice(0, 160),
        expected: item ? plain(item.parts.map((p) => answerMarkdown(p.answer, p)).join(' | ')) : '',
      };
    });

  const changes = [...states.entries()]
    .filter(([id]) => before.get(id)?.level !== states.get(id)?.level || before.get(id)?.pKnown !== states.get(id)?.pKnown)
    .map(([id, s]) => ({ skillId: id, before: before.get(id)?.level ?? 'not_started', after: s.level, pBefore: before.get(id)?.pKnown ?? 0, pAfter: s.pKnown }));

  return {
    summary,
    mastery: states,
    changes,
    events,
    status: summary.pendingManual > 0 ? 'submitted' : 'graded',
    late: !!input.dueAt && new Date(input.now) > new Date(input.dueAt),
  };
}
