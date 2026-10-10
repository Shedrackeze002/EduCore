/**
 * send-emails: delivers new-assignment and deadline-reminder notifications by email
 * for classes that turned on "email reminders". Called every 10 minutes by pg_cron.
 *
 * Secrets: EDUCORE_CRON_SECRET (must match the Vault secret educore_cron_secret),
 *          RESEND_API_KEY, EMAIL_FROM (e.g. "EduCore <no-reply@yourschool.ca>"),
 *          APP_URL (e.g. https://educore.yourschool.ca).
 */
import { HttpError, serve } from '../_shared/http.ts';
import { adminClient } from '../_shared/db.ts';

const DOMAIN = Deno.env.get('STUDENT_EMAIL_DOMAIN') ?? 'students.educore.local';

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

serve(async (req) => {
  const secret = Deno.env.get('EDUCORE_CRON_SECRET') ?? '';
  const token = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '');
  if (!secret || !safeEqual(token, secret)) throw new HttpError(401, 'Unauthorized');
  const apiKey = Deno.env.get('RESEND_API_KEY');
  const from = Deno.env.get('EMAIL_FROM');
  if (!apiKey || !from) return { sent: 0, skipped: 'RESEND_API_KEY or EMAIL_FROM not set' };
  const appUrl = (Deno.env.get('APP_URL') ?? '').replace(/\/$/, '');

  const db = adminClient();
  const since = new Date(Date.now() - 86_400_000).toISOString();
  const { data, error } = await db
    .from('notifications')
    .select('id, title, body, link, profiles!inner(email, full_name), assignments(class_id, classes(name, settings))')
    .is('emailed_at', null)
    .in('kind', ['assignment', 'reminder'])
    .gte('created_at', since)
    .order('created_at')
    .limit(200);
  if (error) throw new Error(error.message);

  let sent = 0;
  const processed: string[] = [];
  // deno-lint-ignore no-explicit-any
  for (const n of (data ?? []) as any[]) {
    processed.push(n.id);
    const profile = Array.isArray(n.profiles) ? n.profiles[0] : n.profiles;
    const assignment = Array.isArray(n.assignments) ? n.assignments[0] : n.assignments;
    const cls = assignment ? (Array.isArray(assignment.classes) ? assignment.classes[0] : assignment.classes) : null;
    const email: string = profile?.email ?? '';
    if (!cls?.settings?.emailReminders || !email || email.endsWith(`@${DOMAIN}`)) continue;
    const href = appUrl && n.link ? `${appUrl}${n.link}` : appUrl;
    const html = `<div style="font-family:system-ui,sans-serif;max-width:520px;margin:auto;padding:24px;color:#14161f">
      <div style="font-size:12px;font-weight:700;color:#6a43e3;letter-spacing:.06em;text-transform:uppercase">EduCore · ${esc(cls.name ?? '')}</div>
      <h2 style="margin:8px 0 6px;font-size:20px">${esc(n.title)}</h2>
      <p style="margin:0 0 18px;color:#4b5060;line-height:1.5">${esc(n.body ?? '')}</p>
      ${href ? `<a href="${esc(href)}" style="display:inline-block;background:#6a43e3;color:#fff;text-decoration:none;padding:10px 18px;border-radius:10px;font-weight:600">Open in EduCore</a>` : ''}
    </div>`;
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [email], subject: n.title, html, text: `${n.title}\n\n${n.body ?? ''}${href ? `\n\n${href}` : ''}` }),
    });
    if (res.ok) sent++;
    else console.error('email failed', res.status, await res.text());
  }
  if (processed.length) await db.from('notifications').update({ emailed_at: new Date().toISOString() }).in('id', processed);
  return { sent, processed: processed.length };
});
