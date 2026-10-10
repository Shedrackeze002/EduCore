/** Domain model shared by the demo (browser) backend and the Supabase backend. */
import type { AssignmentContent, AssignmentSettings, AssignmentType, StoredResponse } from '@engine/assemble.ts';
import type { ItemRef } from '@engine/types.ts';
import type { SkillState } from '@engine/mastery.ts';
import type { InsightData, ProposedAction } from '@engine/ai/types.ts';

export type Role = 'teacher' | 'student';

export interface Profile {
  id: string;
  role: Role;
  fullName: string;
  email: string;
  username?: string | null;
  avatarColor: string;
  createdAt: string;
}

export interface ClassSettings {
  /** Hours before the due date at which students who have not submitted are reminded. */
  reminderHours: number[];
  /** Let the AI assistant assign targeted practice automatically after graded work. */
  aiAutopilot: boolean;
  /** Also send reminders by email (production only, requires an email provider). */
  emailReminders: boolean;
}

export interface ClassRoom {
  id: string;
  teacherId: string;
  name: string;
  section: string | null;
  courseId: string;
  joinCode: string;
  settings: ClassSettings;
  createdAt: string;
  archived: boolean;
}

export interface Publication {
  classId: string;
  lessonId: string;
  publishedAt: string;
}

export interface Resource {
  id: string;
  classId: string;
  lessonId: string | null;
  kind: 'video' | 'link' | 'note';
  title: string;
  url: string | null;
  body: string | null;
  createdAt: string;
}

export type AssignmentStatus = 'draft' | 'published' | 'archived';

export interface Assignment {
  id: string;
  classId: string;
  title: string;
  type: AssignmentType;
  instructions: string;
  content: AssignmentContent;
  settings: AssignmentSettings;
  openAt: string | null;
  dueAt: string | null;
  allowLate: boolean;
  reminderHours: number[];
  assignedTo: 'all' | string[];
  status: AssignmentStatus;
  createdAt: string;
  publishedAt: string | null;
  createdBy: 'teacher' | 'ai';
  aiRationale: string | null;
}

export type SubmissionStatus = 'in_progress' | 'submitted' | 'graded' | 'returned';

export interface Submission {
  id: string;
  assignmentId: string | null;
  classId: string;
  studentId: string;
  attempt: number;
  status: SubmissionStatus;
  seed: number;
  items: ItemRef[];
  responses: Record<number, StoredResponse>;
  /** For self-directed practice (no assignment): the skills being practised. */
  practiceSkillIds: string[] | null;
  startedAt: string;
  submittedAt: string | null;
  score: number | null;
  maxScore: number | null;
  percent: number | null;
  pendingManual: number;
  late: boolean;
  feedback: string | null;
  integrity: { blurCount: number };
  masteryChanges?: Array<{ skillId: string; before: string; after: string; pBefore: number; pAfter: number }>;
}

export interface SkillMastery extends SkillState {
  studentId: string;
}

export interface SkillEvent {
  id: string;
  studentId: string;
  classId: string;
  skillId: string;
  correct: boolean;
  assisted: boolean;
  submissionId: string;
  assignmentId: string | null;
  at: string;
  prompt?: string;
  answer?: string;
  expected?: string;
}

export type NotificationKind = 'assignment' | 'reminder' | 'graded' | 'announcement' | 'insight' | 'overdue' | 'submission';

export interface AppNotification {
  id: string;
  userId: string;
  kind: NotificationKind;
  title: string;
  body: string;
  link: string | null;
  createdAt: string;
  readAt: string | null;
  assignmentId: string | null;
}

export interface Insight {
  id: string;
  classId: string;
  studentId: string | null;
  createdAt: string;
  source: 'minimax' | 'offline';
  model: string | null;
  data: InsightData;
  error?: string | null;
}

export interface Announcement {
  id: string;
  classId: string;
  authorId: string;
  title: string;
  body: string;
  createdAt: string;
}

export interface NewStudentCredential {
  fullName: string;
  username: string;
  password: string;
}

export type { AssignmentContent, AssignmentSettings, AssignmentType, StoredResponse, ItemRef, InsightData, ProposedAction };
