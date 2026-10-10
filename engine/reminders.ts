/**
 * Deadline reminders. Given assignments, rosters and submissions, work out which
 * students should be reminded now. Students who already submitted are skipped.
 * The Supabase cron job implements the same rule in SQL (see migrations).
 */
export interface ReminderAssignment {
  id: string;
  classId: string;
  title: string;
  type: string;
  dueAt: string | null;
  reminderHours: number[];
  assignedTo: 'all' | string[];
  status: string;
}

export interface ReminderOut {
  key: string;
  assignmentId: string;
  studentId: string;
  hours: number;
  title: string;
  body: string;
}

function humanHours(h: number): string {
  if (h >= 48 && h % 24 === 0) return `${h / 24} days`;
  if (h === 24) return '24 hours';
  return `${h} hour${h === 1 ? '' : 's'}`;
}

export function dueReminders(params: {
  now: Date;
  assignments: ReminderAssignment[];
  roster: Map<string, string[]>;
  done: Set<string>; // `${assignmentId}:${studentId}`
  sent: Set<string>; // keys already sent
}): { reminders: ReminderOut[]; suppressed: string[] } {
  const { now } = params;
  const reminders: ReminderOut[] = [];
  const suppressed: string[] = [];
  for (const a of params.assignments) {
    if (a.status !== 'published' || !a.dueAt) continue;
    const due = new Date(a.dueAt).getTime();
    const msLeft = due - now.getTime();
    if (msLeft <= 0) continue;
    const hoursLeft = msLeft / 3_600_000;
    const thresholds = [...a.reminderHours].filter((h) => h > 0).sort((x, y) => x - y);
    const passed = thresholds.filter((h) => hoursLeft <= h);
    if (!passed.length) continue;
    const mostUrgent = passed[0];
    const students = a.assignedTo === 'all' ? params.roster.get(a.classId) ?? [] : a.assignedTo;
    for (const sid of students) {
      if (params.done.has(`${a.id}:${sid}`)) continue;
      const key = `${a.id}:${sid}:${mostUrgent}`;
      // Larger thresholds that were skipped (e.g. the app was closed) are suppressed, not sent late.
      for (const h of passed.slice(1)) suppressed.push(`${a.id}:${sid}:${h}`);
      if (params.sent.has(key)) continue;
      reminders.push({
        key,
        assignmentId: a.id,
        studentId: sid,
        hours: mostUrgent,
        title: `Reminder: ${a.title} is due soon`,
        body: `“${a.title}” is due in less than ${humanHours(mostUrgent)} and you haven’t submitted it yet.`,
      });
    }
  }
  return { reminders, suppressed };
}
