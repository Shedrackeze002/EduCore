/** The AI teaching assistant: MiniMax analysis with a deterministic offline fallback. */
import { classPrompt, studentPrompt } from './prompt.ts';
import { extractJson, validateInsight } from './parse.ts';
import { minimaxChat, type MiniMaxConfig } from './minimax.ts';
import { analyzeClass, analyzeStudent } from './heuristic.ts';
import { buildClassContext, buildStudentContext, type AnalystInput } from './context.ts';
import { allSkills, COURSES } from '../curriculum/index.ts';
import type { InsightData } from './types.ts';

export * from './types.ts';
export { buildClassContext, buildStudentContext } from './context.ts';
export type { AnalystInput, RawAssignment, RawEvent, RawSubmission } from './context.ts';
export { analyzeClass, analyzeStudent } from './heuristic.ts';
export { DEFAULT_MODEL, DEFAULT_BASE_URL, minimaxChat } from './minimax.ts';
export type { MiniMaxConfig } from './minimax.ts';

export interface InsightResult {
  data: InsightData;
  source: 'minimax' | 'offline';
  model: string | null;
  error?: string;
}

function known(input: AnalystInput, defaultStudentId?: string) {
  return {
    skillIds: new Set(allSkills().map((s) => s.id)),
    studentIds: new Set(input.students.map((s) => s.id)),
    lessonIds: new Set(COURSES.flatMap((c) => c.lessons.map((l) => l.id))),
    defaultStudentId,
  };
}

/**
 * Generate an insight. If `ai` is provided, MiniMax is used; any failure falls back to
 * the offline analyst so teachers always get a useful answer.
 */
export async function generateInsight(
  input: AnalystInput,
  target: { scope: 'student'; studentId: string } | { scope: 'class' },
  ai?: MiniMaxConfig | null,
): Promise<InsightResult> {
  const offline = (): InsightData =>
    target.scope === 'student' ? analyzeStudent(buildStudentContext(input, target.studentId)) : analyzeClass(buildClassContext(input));
  if (!ai?.apiKey) return { data: offline(), source: 'offline', model: null };
  try {
    const p = target.scope === 'student' ? studentPrompt(buildStudentContext(input, target.studentId)) : classPrompt(buildClassContext(input));
    const res = await minimaxChat(ai, [
      { role: 'system', content: p.system },
      { role: 'user', content: p.user },
    ]);
    const data = validateInsight(extractJson(res.content), target.scope, known(input, target.scope === 'student' ? target.studentId : undefined));
    return { data, source: 'minimax', model: res.model };
  } catch (e) {
    return { data: offline(), source: 'offline', model: null, error: e instanceof Error ? e.message : String(e) };
  }
}
