// Email at gradileo.com through Cloudflare Email Routing: mail sent to admin@gradileo.com is
// forwarded to the owner's inbox. Run by .github/workflows/email.yml (see docs/SETUP.md, "Email at
// your domain"). Running it again only adds what is missing. Cloudflare forwards only to an inbox
// whose owner has clicked its verification link, so a run waits for that click before it creates
// the addresses.
//
// Environment (repository secrets):
//   CLOUDFLARE_EMAIL_TOKEN  Account: Email Routing Addresses: Edit; Zone: Email Routing Rules: Edit
//                           and Zone Settings: Edit
//   CLOUDFLARE_API_TOKEN    the deploy token, used only to find the domain's zone (Zone: Read)
//   EMAIL_FORWARD_TO        the inbox to forward to. The repository is public, so this stays in a
//                           secret and is never printed.
//   VERIFY_WAIT_MINUTES     how long to wait for the verification click (default 15)
const DOMAIN = 'gradileo.com';
// The addresses at the domain that forward to the inbox; add 'hello', 'support', … here.
const ADDRESSES = ['admin'];
const API = 'https://api.cloudflare.com/client/v4';
// The permission each call needs, named in the error when Cloudflare refuses it.
const SETTINGS = 'Zone Settings: Edit';
const INBOXES = 'Email Routing Addresses: Edit';
const RULES = 'Email Routing Rules: Edit';
const POLL_SECONDS = 15;

const env = process.env;
const token = env.CLOUDFLARE_EMAIL_TOKEN;
const inboxEmail = env.EMAIL_FORWARD_TO?.trim();
const waitMinutes = Number(env.VERIFY_WAIT_MINUTES ?? 15);

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
  const error = new Error(
    `${method} ${path}: ${res.status} ${why}.${refused ? ` The token needs ${permission}.` : ''}`,
  );
  error.refused = refused;
  throw error;
}

// What kind of token the email token is, to say how to fix a refusal (no ID is printed).
async function tokenKind(account) {
  const kinds = [
    ['an account API token', `/accounts/${account}/tokens/verify`],
    ['a user API token', '/user/tokens/verify'],
  ];
  for (const [kind, path] of kinds) {
    const found = await cf('GET', path).catch(() => null);
    const expires = found?.expires_on ? ` (expires ${found.expires_on.slice(0, 10)})` : '';
    if (found) return { text: kind + expires, account: path.startsWith('/accounts') };
  }
  return { text: 'a token Cloudflare does not recognise', account: false };
}

const sameAddress = (a, b) => a.toLowerCase() === b.toLowerCase();

try {
  // 1. The zone. The email token is limited to Email Routing, so the deploy token looks it up.
  const [zone] = await cf('GET', `/zones?name=${DOMAIN}`, {
    auth: env.CLOUDFLARE_API_TOKEN || token,
    permission: 'Zone: Read',
  });
  if (!zone) throw new Error(`The token cannot see a Cloudflare zone named ${DOMAIN}.`);
  const account = zone.account.id;
  const routing = `/zones/${zone.id}/email/routing`;

  // 2. Turn on Email Routing, which adds and locks the MX and SPF records it needs. (The body names
  // a subdomain to set up; the domain itself takes an empty one.)
  let settings = await cf('GET', routing, { permission: SETTINGS });
  if (!settings.enabled) {
    await cf('POST', `${routing}/dns`, { body: {}, permission: SETTINGS });
    settings = await cf('GET', routing, { permission: SETTINGS });
    console.log('Turned on Email Routing and added its DNS records.');
  }
  console.log(`Email Routing is ${settings.enabled ? 'on' : 'off'} (status: ${settings.status}).`);

  // 3. The inbox, an account-level destination address.
  const addresses = `/accounts/${account}/email/routing/addresses`;
  let inbox;
  try {
    const known = await cf('GET', `${addresses}?per_page=50`, { permission: INBOXES });
    inbox = known.find((a) => sameAddress(a.email, inboxEmail));
    if (!inbox) {
      inbox = await cf('POST', addresses, { body: { email: inboxEmail }, permission: INBOXES });
      console.log('Added the inbox; Cloudflare has emailed it a verification link.');
    }
  } catch (error) {
    if (!error.refused) throw error;
    const kind = await tokenKind(account);
    error.message += ` The email token is ${kind.text}. Give it Account → ${INBOXES}, with the account that owns ${DOMAIN} under Account Resources.`;
    if (kind.account)
      error.message +=
        " If it already has that, Cloudflare's account tokens cannot use this part of Email Routing: create" +
        ' the same token under My Profile → API Tokens (a user token) and put it in the CLOUDFLARE_EMAIL_TOKEN secret.';
    throw error;
  }

  // Forwarding needs a verified inbox, so wait for the link in Cloudflare's email to be clicked.
  if (!inbox.verified && waitMinutes > 0) {
    console.log(`Waiting up to ${waitMinutes} minutes for the link in Cloudflare's email to be clicked…`);
    const deadline = Date.now() + waitMinutes * 60_000;
    while (!inbox.verified && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, POLL_SECONDS * 1000));
      inbox = await cf('GET', `${addresses}/${inbox.id}`, { permission: INBOXES });
    }
  }
  if (!inbox.verified)
    throw new Error(
      "The inbox is not verified yet: click the link in Cloudflare's email (resend it from Email " +
        'Routing → Destination addresses), then run this workflow again.',
    );
  console.log('The inbox is verified.');

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
    if (upToDate) console.log(`${address} already forwards to the inbox.`);
    else if (current) {
      await cf('PUT', `${routing}/rules/${current.id}`, { body: rule, permission: RULES });
      console.log(`Updated ${address} to forward to the inbox.`);
    } else {
      await cf('POST', `${routing}/rules`, { body: rule, permission: RULES });
      console.log(`Created ${address}, forwarding to the inbox.`);
    }
  }

  console.log(`Done: mail to ${ADDRESSES.map((a) => `${a}@${DOMAIN}`).join(', ')} reaches the inbox.`);
} catch (error) {
  fail(error.message);
}
