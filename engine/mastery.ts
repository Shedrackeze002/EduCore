/**
 * Skill mastery via Bayesian Knowledge Tracing (Corbett & Anderson, 1995), with
 * Khan-Academy-style levels layered on top so students and teachers see simple labels.
 *
 * Mastered requires strong evidence across separate sessions, so a lucky streak in
 * one sitting is not enough — the student must show the skill again on another day
 * or in another assignment (spaced retrieval).
 */

export type MasteryLevel = 'not_started' | 'attempted' | 'familiar' | 'proficient' | 'mastered';

export const LEVELS: MasteryLevel[] = ['not_started', 'attempted', 'familiar', 'proficient', 'mastered'];

export const LEVEL_LABEL: Record<MasteryLevel, string> = {
  not_started: 'Not started',
  attempted: 'Attempted',
  familiar: 'Familiar',
  proficient: 'Proficient',
  mastered: 'Mastered',
};

/** Mastery points per skill (same scale as Khan Academy: 0 / 0 / 50 / 80 / 100). */
export const LEVEL_POINTS: Record<MasteryLevel, number> = {
  not_started: 0,
  attempted: 0,
  familiar: 50,
  proficient: 80,
  mastered: 100,
};

export interface BktParams {
  pInit: number;
  pTransit: number;
  pGuess: number;
  pSlip: number;
}

export const DEFAULT_BKT: Record<'mc' | 'free', BktParams> = {
  mc: { pInit: 0.1, pTransit: 0.12, pGuess: 0.25, pSlip: 0.1 },
  free: { pInit: 0.1, pTransit: 0.12, pGuess: 0.08, pSlip: 0.1 },
};

export interface SkillState {
  skillId: string;
  pKnown: number;
  attempts: number;
  correct: number;
  /** Consecutive correct answers. */
  streak: number;
  /** Distinct sessions (submissions) in which the student answered correctly. */
  sessions: number;
  level: MasteryLevel;
  lastPracticedAt: string | null;
  lastCorrectAt: string | null;
  /** The last session id that counted toward `sessions`. */
  lastSessionId?: string | null;
}

export function emptySkillState(skillId: string, params: BktParams = DEFAULT_BKT.free): SkillState {
  return {
    skillId,
    pKnown: params.pInit,
    attempts: 0,
    correct: 0,
    streak: 0,
    sessions: 0,
    level: 'not_started',
    lastPracticedAt: null,
    lastCorrectAt: null,
    lastSessionId: null,
  };
}

export interface Observation {
  correct: boolean;
  /** Hints or a revealed solution mean the answer is not independent evidence. */
  assisted?: boolean;
  sessionId: string;
  at: string;
}

export function bktUpdate(p: number, correct: boolean, params: BktParams): number {
  const { pTransit, pGuess, pSlip } = params;
  const posterior = correct
    ? (p * (1 - pSlip)) / (p * (1 - pSlip) + (1 - p) * pGuess)
    : (p * pSlip) / (p * pSlip + (1 - p) * (1 - pGuess));
  const next = posterior + (1 - posterior) * pTransit;
  return Math.min(0.999, Math.max(0.001, next));
}

export function levelFor(s: Pick<SkillState, 'pKnown' | 'attempts' | 'correct' | 'sessions'>): MasteryLevel {
  if (s.attempts === 0) return 'not_started';
  if (s.pKnown >= 0.95 && s.correct >= 5 && s.sessions >= 2) return 'mastered';
  if (s.pKnown >= 0.8 && s.correct >= 3) return 'proficient';
  if (s.pKnown >= 0.45 && s.correct >= 1) return 'familiar';
  return 'attempted';
}

export function applyObservation(state: SkillState, obs: Observation, params: BktParams = DEFAULT_BKT.free): SkillState {
  // Assisted answers count as incorrect evidence (the student needed help), but do
  // not reset learning as harshly: we treat them as a weak negative.
  const effectiveCorrect = obs.correct && !obs.assisted;
  let pKnown = bktUpdate(state.pKnown, effectiveCorrect, params);
  if (obs.correct && obs.assisted) pKnown = Math.max(pKnown, state.pKnown * 0.97);
  const correct = state.correct + (effectiveCorrect ? 1 : 0);
  const newSession = effectiveCorrect && state.lastSessionId !== obs.sessionId;
  const next: SkillState = {
    ...state,
    pKnown,
    attempts: state.attempts + 1,
    correct,
    streak: effectiveCorrect ? state.streak + 1 : 0,
    sessions: state.sessions + (newSession ? 1 : 0),
    lastPracticedAt: obs.at,
    lastCorrectAt: effectiveCorrect ? obs.at : state.lastCorrectAt,
    lastSessionId: newSession ? obs.sessionId : state.lastSessionId,
    level: state.level,
  };
  next.level = levelFor(next);
  return next;
}

/** Spaced review: mastered/proficient skills not seen for a while are due for review. */
export function reviewDue(state: SkillState, now: Date = new Date()): boolean {
  if (state.level !== 'mastered' && state.level !== 'proficient') return false;
  if (!state.lastPracticedAt) return false;
  const days = (now.getTime() - new Date(state.lastPracticedAt).getTime()) / 86_400_000;
  const interval = state.level === 'mastered' ? 21 : 7;
  return days >= interval;
}

export interface MasterySummary {
  points: number;
  maxPoints: number;
  percent: number;
  counts: Record<MasteryLevel, number>;
}

export function summarize(skillIds: string[], states: Map<string, SkillState> | Record<string, SkillState>): MasterySummary {
  const get = (id: string) => (states instanceof Map ? states.get(id) : states[id]);
  const counts: Record<MasteryLevel, number> = { not_started: 0, attempted: 0, familiar: 0, proficient: 0, mastered: 0 };
  let points = 0;
  for (const id of skillIds) {
    const level = get(id)?.level ?? 'not_started';
    counts[level]++;
    points += LEVEL_POINTS[level];
  }
  const maxPoints = skillIds.length * 100;
  return { points, maxPoints, percent: maxPoints ? Math.round((points / maxPoints) * 100) : 0, counts };
}
