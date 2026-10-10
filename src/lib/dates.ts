import { differenceInCalendarDays, format, formatDistanceToNowStrict, isPast, isToday, isTomorrow } from 'date-fns';

export function fmtDate(iso: string | null | undefined, pattern = 'MMM d'): string {
  if (!iso) return '—';
  return format(new Date(iso), pattern);
}

export function fmtDateTime(iso: string | null | undefined): string {
  if (!iso) return '—';
  return format(new Date(iso), "EEE, MMM d 'at' h:mm a");
}

export function relative(iso: string | null | undefined): string {
  if (!iso) return '';
  return formatDistanceToNowStrict(new Date(iso), { addSuffix: true });
}

/** "Due today at 3:00 PM", "Due tomorrow", "Due in 3 days", "Overdue by 2 days". */
export function dueLabel(iso: string | null | undefined): { text: string; tone: 'neutral' | 'soon' | 'urgent' | 'overdue' } {
  if (!iso) return { text: 'No due date', tone: 'neutral' };
  const d = new Date(iso);
  const now = new Date();
  if (isPast(d)) {
    const days = differenceInCalendarDays(now, d);
    return { text: days === 0 ? `Was due ${format(d, 'h:mm a')}` : `Overdue by ${days} day${days === 1 ? '' : 's'}`, tone: 'overdue' };
  }
  const hours = (d.getTime() - now.getTime()) / 3_600_000;
  if (isToday(d)) return { text: `Due today at ${format(d, 'h:mm a')}`, tone: 'urgent' };
  if (isTomorrow(d)) return { text: `Due tomorrow at ${format(d, 'h:mm a')}`, tone: hours < 24 ? 'urgent' : 'soon' };
  const days = differenceInCalendarDays(d, now);
  return { text: `Due ${format(d, 'EEE, MMM d')}`, tone: days <= 3 ? 'soon' : 'neutral' };
}

/** Value for <input type="datetime-local"> from an ISO string. */
export function toLocalInput(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function fromLocalInput(v: string): string | null {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

export function addDays(base: Date, days: number, hour?: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  if (hour !== undefined) d.setHours(hour, 0, 0, 0);
  return d;
}

export function greeting(): string {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}
