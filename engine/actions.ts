/** Turn an AI-proposed action into a concrete assignment draft. */
import type { ProposedAction } from './ai/types.ts';
import { DEFAULT_SETTINGS, type AssignmentContent, type AssignmentSettings, type AssignmentType } from './assemble.ts';
import { getSkill } from './curriculum/index.ts';

export interface AssignmentDraft {
  title: string;
  type: AssignmentType;
  instructions: string;
  content: AssignmentContent;
  settings: AssignmentSettings;
  dueAt: string | null;
  assignedTo: 'all' | string[];
  reminderHours: number[];
  aiRationale: string;
}

export function draftFromAction(action: ProposedAction, now = new Date()): AssignmentDraft | null {
  if (action.type === 'check_in') return null;
  const due = new Date(now);
  due.setDate(due.getDate() + (action.dueInDays ?? 3));
  due.setHours(21, 0, 0, 0);
  const skills = action.skillIds.filter((s) => getSkill(s));
  if (action.type === 'reteach_lesson') {
    const lessonId = action.lessonId ?? (skills[0] ? getSkill(skills[0])!.lessonId : undefined);
    if (!lessonId) return null;
    return {
      title: action.title,
      type: 'lesson',
      instructions: `Re-read this lesson carefully and try every “Check your understanding” question. ${action.rationale}`,
      content: { sections: [], custom: [], lessonId },
      settings: DEFAULT_SETTINGS.lesson,
      dueAt: due.toISOString(),
      assignedTo: action.studentIds.length ? action.studentIds : 'all',
      reminderHours: [24, 2],
      aiRationale: action.rationale,
    };
  }
  if (!skills.length) return null;
  const total = action.questionCount ?? 8;
  const per = Math.max(2, Math.round(total / skills.length));
  const difficulty = action.type === 'challenge' ? 3 : 'mixed';
  return {
    title: action.title,
    type: 'practice',
    instructions:
      action.type === 'assign_review'
        ? 'A short spaced-review set to keep these skills fresh. Use hints only if you are stuck.'
        : action.type === 'challenge'
          ? 'Harder questions to stretch your thinking. Read each problem carefully.'
          : 'Targeted practice on the skills you are working on. Use the hints and read the worked solution whenever you miss a question.',
    content: { sections: skills.map((skillId) => ({ skillId, count: per, difficulty })), custom: [] },
    settings: DEFAULT_SETTINGS.practice,
    dueAt: due.toISOString(),
    assignedTo: action.studentIds.length ? action.studentIds : 'all',
    reminderHours: [24, 2],
    aiRationale: action.rationale,
  };
}
