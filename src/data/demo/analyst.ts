import type { AnalystInput } from '@engine/ai/index.ts';
import type { DemoDB } from './db.ts';

/** Gather the analyst's view of one class from the demo database. */
export function buildAnalystInput(db: DemoDB, classId: string): AnalystInput {
  const cls = db.classes.find((c) => c.id === classId)!;
  const studentIds = db.enrollments.filter((e) => e.classId === classId).map((e) => e.studentId);
  const ids = new Set(studentIds);
  return {
    courseId: cls.courseId,
    className: `${cls.name}${cls.section ? ` — ${cls.section}` : ''}`,
    students: db.users.filter((u) => ids.has(u.id)).map((u) => ({ id: u.id, name: u.fullName })),
    taughtLessonIds: db.publications.filter((p) => p.classId === classId).map((p) => p.lessonId),
    mastery: db.mastery.filter((m) => ids.has(m.studentId)),
    events: db.events
      .filter((e) => e.classId === classId)
      .map((e) => ({ studentId: e.studentId, skillId: e.skillId, correct: e.correct, assisted: e.assisted, at: e.at, prompt: e.prompt, answer: e.answer, expected: e.expected })),
    assignments: db.assignments
      .filter((a) => a.classId === classId)
      .map((a) => ({ id: a.id, title: a.title, type: a.type, dueAt: a.dueAt, assignedTo: a.assignedTo, status: a.status })),
    submissions: db.submissions
      .filter((s) => s.classId === classId && s.assignmentId)
      .map((s) => ({ assignmentId: s.assignmentId!, studentId: s.studentId, status: s.status, submittedAt: s.submittedAt, percent: s.percent })),
  };
}
