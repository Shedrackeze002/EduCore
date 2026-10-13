/** The demo backend's database: a JSON document persisted in localStorage. */
import type {
  Announcement,
  AppNotification,
  Assignment,
  Board,
  ClassRoom,
  Insight,
  LessonPrefs,
  LiveAnswer,
  LiveQuestion,
  PlatformSettings,
  Profile,
  Publication,
  Resource,
  SkillEvent,
  SkillMastery,
  Submission,
} from '../types.ts';
import { getItem, removeItem, setItem } from '@/lib/storage.ts';

export interface DemoUser extends Profile {
  password: string;
  lastSignInAt?: string | null;
}

export interface DemoAuditRow {
  id: string;
  createdAt: string;
  action: string;
  actorId: string | null;
  targetUser: string | null;
  details: Record<string, unknown>;
}

export interface DemoDB {
  version: number;
  createdAt: string;
  users: DemoUser[];
  classes: ClassRoom[];
  enrollments: Array<{ classId: string; studentId: string; joinedAt: string }>;
  publications: Publication[];
  resources: Resource[];
  assignments: Assignment[];
  submissions: Submission[];
  mastery: SkillMastery[];
  events: SkillEvent[];
  notifications: AppNotification[];
  insights: Insight[];
  announcements: Announcement[];
  reminderLog: string[];
  aiKey: string | null;
  aiModel: string | null;
  /** Platform administration (added later; older saved demos may lack these). */
  settings?: PlatformSettings;
  audit?: DemoAuditRow[];
  /** Presenting (added later; older saved demos may lack these). */
  boards?: Board[];
  lessonPrefs?: LessonPrefs[];
  liveQuestions?: LiveQuestion[];
  liveAnswers?: LiveAnswer[];
}

export const DB_KEY = 'educore-demo-db-v1';
export const DB_VERSION = 1;

export function loadDb(): DemoDB | null {
  const raw = getItem(DB_KEY);
  if (!raw) return null;
  try {
    const db = JSON.parse(raw) as DemoDB;
    return db.version === DB_VERSION ? db : null;
  } catch {
    return null;
  }
}

export function saveDb(db: DemoDB): void {
  // Keep storage bounded: trim old analytics events if the document grows large.
  let raw = JSON.stringify(db);
  if (raw.length > 3_500_000) {
    db.events = db.events.slice(-4000).map((e) => ({ ...e, prompt: e.correct ? undefined : e.prompt }));
    db.notifications = db.notifications.slice(-400);
    raw = JSON.stringify(db);
  }
  setItem(DB_KEY, raw);
}

export function clearDb(): void {
  removeItem(DB_KEY);
}
