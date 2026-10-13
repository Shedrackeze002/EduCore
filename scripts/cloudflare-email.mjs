// Email at gradileo.com through Cloudflare Email Routing: mail sent to admin@gradileo.com is
// forwarded to the owner's inbox. Run by .github/workflows/email.yml (see docs/SETUP.md, "Email at
// your domain"). Running it again only adds what is missing and says whether the inbox is verified.
//
// Environment (repository secrets):
//   CLOUDFLARE_EMAIL_TOKEN  Account: Email Routing Addresses: Edit; Zone: Email Routing Rules: Edit
//                           and Zone Settings: Edit
//   CLOUDFLARE_API_TOKEN    the deploy token, used only to find the domain's zone (Zone: Read)
//   CLOUDFLARE_ACCOUNT_ID   the Cloudflare account (defaults to the zone's account)
//   EMAIL_FORWARD_TO        the inbox to forward to. The repository is public, so this stays in a
//                           secret and is never printed.
const DOMAIN = 'gradileo.com';
// The addresses at the domain that forward to the inbox; add 'hello', 'support', … here.
const ADDRESSES = ['admin'];
const API = 'https://api.cloudflare.com/client/v4';
// The permission each call needs, named in the error when Cloudflare refuses it.
const SETTINGS = 'Zone Settings: Edit';
const INBOXES = 'Email Routing Addresses: Edit';
const RULES = 'Email Routing Rules: Edit';

const env = process.env;
const token = env.CLOUDFLARE_EMAIL_TOKEN;
const inboxEmail = env.EMAIL_FORWARD_TO?.trim();

const hide = (text) =>
  inboxEmail
    ? String(text).replace(new RegExp(inboxEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '<inbox>')
    : String(text);
const fail = (message) => {
  console.error(`::error::${hide(message)}`);
  process.exit(1);
};

if (!token || !inboxEmail) fail('Set the CLOUDFLARE_EMAIL_TOKEN and EMAIL_FORWARD_TO repository secrets.');
if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inboxEmail)) fail('EMAIL_FORWARD_TO is not an email address.');

// One Cloudflare API call; throws with Cloudflare's reason, naming the permission when it is refused.
async function cf(method, path, { body, auth = token, permission } = {}) {
  const res = await fetch(API + path, {
    method,
    headers: { Authorization: `Bearer ${auth}`, 'Content-Type': 'application/json' },
    body: body && JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (res.ok && data.success) return data.result;
  const why = (data.errors ?? []).map((e) => `${e.code} ${e.message}`).join('; ') || res.statusText;
  const refused = (res.status === 401 || res.status === 403) && permission;
  throw new Error(
    `${method} ${path}: ${res.status} ${why}.${refused ? ` The token needs ${permission}.` : ''}`,
  );
}

const sameAddress = (a, b) => a.toLowerCase() === b.toLowerCase();

try {
  // 1. The zone. The email token is limited to Email Routing, so the deploy token looks it up.
  const [zone] = await cf('GET', `/zones?name=${DOMAIN}`, {
    auth: env.CLOUDFLARE_API_TOKEN || token,
    permission: 'Zone: Read',
  });
  if (!zone) throw new Error(`The token cannot see a Cloudflare zone named ${DOMAIN}.`);
  const account = env.CLOUDFLARE_ACCOUNT_ID || zone.account.id;
  const routing = `/zones/${zone.id}/email/routing`;

  // 2. Turn on Email Routing, which adds and locks the MX and SPF records it needs.
  let settings = await cf('GET', routing, { permission: SETTINGS });
  if (!settings.enabled) {
    await cf('POST', `${routing}/dns`, { body: { name: DOMAIN }, permission: SETTINGS });
    settings = await cf('GET', routing, { permission: SETTINGS });
    console.log('Turned on Email Routing and added its DNS records.');
  }
  console.log(`Email Routing is ${settings.enabled ? 'on' : 'off'} (status: ${settings.status}).`);

  // 3. The inbox. Cloudflare forwards only to an inbox whose owner has clicked its verification link.
  const addresses = `/accounts/${account}/email/routing/addresses`;
  const known = await cf('GET', `${addresses}?per_page=50`, { permission: INBOXES });
  let inbox = known.find((a) => sameAddress(a.email, inboxEmail));
  if (!inbox) {
    inbox = await cf('POST', addresses, { body: { email: inboxEmail }, permission: INBOXES });
    console.log('Added the inbox; Cloudflare has emailed it a verification link.');
  }

  // 4. A rule for each address, forwarding it to the inbox.
  const rules = await cf('GET', `${routing}/rules?per_page=50`, { permission: RULES });
  for (const name of ADDRESSES) {
    const address = `${name}@${DOMAIN}`;
    const rule = {
      name: `Forward ${address}`,
      enabled: true,
      matchers: [{ type: 'literal', field: 'to', value: address }],
      actions: [{ type: 'forward', value: [inbox.email] }],
    };
    const current = rules.find((r) =>
      r.matchers?.some(
        (m) => m.type === 'literal' && m.field === 'to' && sameAddress(m.value ?? '', address),
      ),
    );
    const forward = current?.actions?.length === 1 && current.actions[0];
    const upToDate =
      current?.enabled &&
      forward?.type === 'forward' &&
      forward.value?.length === 1 &&
      sameAddress(forward.value[0], inbox.email);
    try {
      if (upToDate) console.log(`${address} already forwards to the inbox.`);
      else if (current) {
        await cf('PUT', `${routing}/rules/${current.id}`, { body: rule, permission: RULES });
        console.log(`Updated ${address} to forward to the inbox.`);
      } else {
        await cf('POST', `${routing}/rules`, { body: rule, permission: RULES });
        console.log(`Created ${address}, forwarding to the inbox.`);
      }
    } catch (error) {
      if (!inbox.verified)
        error.message += ' If Cloudflare needs the inbox verified first, click its link and run this again.';
      throw error;
    }
  }

  if (inbox.verified)
    console.log(`Done: mail to ${ADDRESSES.map((a) => `${a}@${DOMAIN}`).join(', ')} reaches the inbox.`);
  else
    console.log(
      '::warning::The inbox is not verified yet, so nothing is forwarded until its owner clicks the link ' +
        "in Cloudflare's verification email (resend it from Email Routing → Destination addresses). " +
        'Then run this again to check.',
    );
} catch (error) {
  fail(error.message);
}
