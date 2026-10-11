# Setting up EduCore

EduCore runs in three stages. You can stop at any stage and come back later.

1. **Demo on GitHub Pages**: free, no accounts, everything runs in the visitor's browser.
2. **Real classes with Supabase**: teacher and student accounts, shared data, reminders, AI.
3. **Your own domain**: the professional finish.

---

## 1. Demo on GitHub Pages

1. Push this repository to GitHub and merge into `main`.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The **Deploy to GitHub Pages** workflow builds and publishes the site to
   `https://<your-username>.github.io/EduCore/`.

The demo shows a sample Math 10C class with 16 students. Changes are stored only in that browser,
and visitors can reset them from the account menu.

---

## 2. Real classes with Supabase

Supabase provides the database, sign-in, scheduled jobs and the server functions that grade work
and run the AI assistant. The free plan is enough to start.

### 2.1 Create the project

1. Sign up at [supabase.com](https://supabase.com) and create a project. For an Alberta school,
   choose the **Canada (Central)** region so student data stays in Canada. Save the database
   password.
2. In **Project Settings → API**, note the **Project URL** and the **anon / publishable key**.
   The anon key is designed to be public; the database's row-level security protects the data.

### 2.2 Push the database and functions

Install the [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started), then from the repository:

```bash
supabase login
supabase link --project-ref <project-ref>      # the "abcd…" in https://abcd….supabase.co
npm run db:push                                 # tables, security policies, reminder schedule
npm run functions:deploy                        # grade-submission, ai-agent, create-students, send-emails, admin-users
```

The migration turns on `pg_cron` and schedules `send_due_reminders()` every 5 minutes.
You can confirm it under **Integrations → Cron** in the dashboard.

### 2.3 Configure sign-in

In **Authentication → URL Configuration**:

- **Site URL**: `https://<your-username>.github.io/EduCore/`
- **Redirect URLs**: add the same URL followed by `**`

Email confirmation is on by default, which is a good choice for teachers. Students that you
create from the Students page do not need an email address: they sign in with a username and a
temporary password that you print for them.

### 2.4 Connect the website

In GitHub, open **Settings → Secrets and variables → Actions → Variables** and add:

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | the Project URL |
| `VITE_SUPABASE_ANON_KEY` | the anon / publishable key |

Re-run **Deploy to GitHub Pages** (Actions tab → Run workflow). The site now uses real accounts.
Visitors can still open the demo from the sign-in page.

This repository already contains `.env.production` with the values for its own Supabase
project, so it needs no variables. Repository variables with the same names take precedence
when they are set (an unset variable is ignored), so a fork can point at its own project without
editing files. The deploy stops with an error if the built site would not reach its backend,
rather than quietly publishing a demo-only site.

### 2.5 Turn on the AI assistant (MiniMax)

The assistant works without a key using EduCore's offline analyst. For live analysis with
MiniMax, set the key as a server secret (it is never sent to browsers):

```bash
supabase secrets set MINIMAX_API_KEY=<your key>
# Optional:
supabase secrets set MINIMAX_MODEL=MiniMax-M3.1-Flash-Preview
supabase secrets set MINIMAX_BASE_URL=https://api.minimax.io     # mainland China: https://api.minimax.cn
supabase secrets set ALLOWED_ORIGINS=https://<your-username>.github.io
```

Notes:

- At the time of writing, MiniMax documents `MiniMax-M3.1-Flash-Preview` as available through its
  M Plan (Token Plan) subscription. If your key does not include it, set `MINIMAX_MODEL` to a
  model your key can use. If MiniMax is unreachable, EduCore falls back to the offline analyst
  and tells you, so teachers always get a report.
- Analyses are limited to 60 per class per hour (`AI_INSIGHTS_PER_HOUR` changes this).
- To try MiniMax in the **demo**, a teacher can paste a key in *Class settings → AI teaching
  assistant*. That key is stored only in their browser.

### 2.6 Email reminders (optional)

In-app and browser notifications work without any setup. To also email reminders to students
and parents who signed up with an email address:

1. Create an account at [resend.com](https://resend.com) and verify a sending domain.
2. Set the function secrets:

   ```bash
   supabase secrets set RESEND_API_KEY=<key> EMAIL_FROM="EduCore <reminders@yourschool.ca>" \
     APP_URL=https://<your-username>.github.io/EduCore EDUCORE_CRON_SECRET=<long random string>
   ```

3. In the SQL editor, store the two values the scheduler needs in Vault:

   ```sql
   select vault.create_secret('https://<project-ref>.supabase.co', 'educore_project_url');
   select vault.create_secret('<the same long random string>', 'educore_cron_secret');
   ```

4. Turn on **Also send reminders by email** in each class's settings.

### 2.7 Deploy the backend from GitHub (optional)

To apply migrations and deploy functions automatically when `supabase/` or `engine/` changes on
`main`, add these repository **secrets**: `SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_ID` and
`SUPABASE_DB_PASSWORD`. The **Deploy Supabase backend** workflow skips itself until they exist.

### 2.8 Become the platform administrator

Platform administrators see every teacher, student and class, approve new teachers, reset
passwords, disable accounts and change platform settings. Every change they make is written to an
audit log. New teacher sign-ups wait for an administrator's approval by default, so make yourself
the first administrator straight after connecting the site:

1. Sign up on the live site as a **teacher**. You will see "waiting for approval" for now.
2. In Supabase, open **SQL Editor** and run, with your own email:

   ```sql
   update public.profiles set platform_admin = true, teacher_status = 'approved'
   where id = (select id from auth.users where email = 'you@yourschool.ca');
   ```

3. Reload the site. **Admin console** now appears in the sidebar and the account menu.

From then on, use the console to approve teachers (you are notified of each request) and to make
other teachers administrators. EduCore always keeps at least one active administrator.

| Page | What it does |
|---|---|
| **Overview** | Teachers, students, classes, submissions and AI use, new accounts per week, pending approvals. |
| **Users** | Search and filter every account; approve or decline teachers, grant or remove admin access, reset a password (shown once), disable or re-enable an account. |
| **Classes** | Every class with its teacher, students, assignments and last activity. |
| **Settings** | Teacher sign-up: **Approve new teachers** (recommended) or **Open sign-up**. |
| **Audit log** | Who changed what, and when. |

Disabling an account bans it in Supabase Auth and marks the profile disabled: the person cannot
sign in or call the Edge Functions, but their classes, work and grades are kept. To erase someone's
data entirely, delete the user in **Authentication → Users**.

---

## 3. Your own domain

1. Buy a domain, for example `educore.ca`, or use a subdomain of your school's site such as
   `math.yourschool.ca`.
2. Add a DNS record at your domain provider:
   - Subdomain: a **CNAME** record pointing to `<your-username>.github.io`.
   - Apex domain: **A** records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and
     `185.199.111.153`.
3. In GitHub, add the repository variable `CUSTOM_DOMAIN` (for example `math.yourschool.ca`) and
   re-run the deploy. The build serves from `/` and writes the `CNAME` file for you.
4. In **Settings → Pages**, enter the domain and tick **Enforce HTTPS** once the certificate is ready.
5. Update the Supabase **Site URL**, `ALLOWED_ORIGINS` and `APP_URL` to the new address.

See GitHub's guide to [managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

---

## Privacy checklist

- Generated student accounts use usernames, so students do not need to share an email address.
- Choose a Canadian Supabase region and review your district's privacy requirements (in Alberta,
  the FOIP Act) before entering real student names.
- For analysis, MiniMax receives skill names, scores, sample wrong answers and each student's
  first name with a last initial (for example "Amara O."); surnames and emails are never sent.
  If your district requires it, use only the offline analyst by not setting `MINIMAX_API_KEY`.
- Teachers can remove a student from a class at any time. Deleting the user in
  **Authentication → Users** removes all of their data.

## Running the checks locally

```bash
npm test                         # unit and content tests
npx playwright test              # browser tests (demo mode)
PGHOST=localhost PGUSER=postgres PGPASSWORD=postgres npm run test:db   # database policies
npm run functions:check          # Edge Function type-check (downloads Deno through npx)
```
