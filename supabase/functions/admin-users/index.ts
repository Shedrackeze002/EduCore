/**
 * admin-users: account actions that need the Auth admin API, for platform administrators.
 *
 *   disable         blocks sign-in (an Auth ban) and marks the profile disabled
 *   enable          lifts the ban
 *   reset_password  sets a new temporary password and returns it once
 *
 * Every action is written to admin_audit_log. Approvals, roles and settings are plain
 * database changes and go through the admin_* RPCs instead.
 */
import { HttpError, readJson, serve } from '../_shared/http.ts';
import { adminClient, getCaller, str } from '../_shared/db.ts';

const WORDS = ['maple', 'river', 'cedar', 'prairie', 'aurora', 'summit', 'canyon', 'harbor', 'meadow', 'falcon', 'glacier', 'willow', 'timber', 'comet', 'orbit', 'delta'];
// About a century: Auth has no permanent ban, so this is how "disabled" is expressed.
const FOREVER = '876000h';

function randomInt(n: number): number {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] % n;
}

function password(): string {
  return `${WORDS[randomInt(WORDS.length)]}-${10 + randomInt(90)}-${WORDS[randomInt(WORDS.length)]}`;
}

serve(async (req) => {
  const db = adminClient();
  const me = await getCaller(req, db);
  if (!me.platform_admin) throw new HttpError(403, 'Platform administrators only.');
  const body = await readJson(req);
  const action = str(body.action, 32);
  const userId = str(body.userId, 64);
  if (!/^[0-9a-f-]{36}$/i.test(userId)) throw new HttpError(400, 'Choose a user.');

  const { data: target } = await db.from('profiles').select('id, role, platform_admin, disabled_at').eq('id', userId).maybeSingle();
  if (!target) throw new HttpError(404, 'User not found.');
  const audit = (name: string, details: Record<string, unknown> = {}) =>
    db.from('admin_audit_log').insert({ actor_id: me.id, action: name, target_user: userId, details }).then(({ error }) => {
      if (error) console.error('audit failed', error.message);
    });

  switch (action) {
    case 'disable': {
      if (userId === me.id) throw new HttpError(400, 'You cannot disable your own account.');
      if (target.platform_admin) {
        const { count } = await db.from('profiles').select('id', { count: 'exact', head: true }).eq('platform_admin', true).is('disabled_at', null).neq('id', userId);
        if (!count) throw new HttpError(400, 'Gradileo needs at least one administrator.');
      }
      const { error } = await db.auth.admin.updateUserById(userId, { ban_duration: FOREVER });
      if (error) throw new Error(error.message);
      const { error: e2 } = await db.from('profiles').update({ disabled_at: new Date().toISOString() }).eq('id', userId);
      if (e2) throw new Error(e2.message);
      await audit('user_disabled');
      return { ok: true };
    }
    case 'enable': {
      const { error } = await db.auth.admin.updateUserById(userId, { ban_duration: 'none' });
      if (error) throw new Error(error.message);
      const { error: e2 } = await db.from('profiles').update({ disabled_at: null }).eq('id', userId);
      if (e2) throw new Error(e2.message);
      await audit('user_enabled');
      return { ok: true };
    }
    case 'reset_password': {
      const pw = password();
      const { error } = await db.auth.admin.updateUserById(userId, { password: pw });
      if (error) throw new Error(error.message);
      await audit('password_reset');
      return { password: pw };
    }
    default:
      throw new HttpError(400, 'Unknown action.');
  }
});
