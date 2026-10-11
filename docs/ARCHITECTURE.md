# Architecture

EduCore is a single-page React app with a shared TypeScript **learning engine**. The engine runs
in the browser for instant feedback and, unchanged, inside Supabase Edge Functions where it grades
work authoritatively. This keeps the server and the student's screen in exact agreement.

```
                 ┌──────────────────────────── browser ─────────────────────────────┐
                 │  React app (src/)                                                 │
                 │   features/  teacher · student · lessons · player · ai            │
                 │   data/api.ts  ── DataApi interface ──┬── DemoApi (localStorage)   │
                 │                                       └── SupabaseApi              │
                 │  engine/  generators · grader · mastery · AI analyst (shared)      │
                 └───────────────────────────────┬───────────────────────────────────┘
                                                 │ HTTPS (anon key + user JWT)
                 ┌───────────────────────────────▼───────────────────────────────────┐
                 │ Supabase                                                           │
                 │  Postgres: tables + row-level security + triggers + RPCs           │
                 │  pg_cron: send_due_reminders() every 5 min, email delivery         │
                 │  Edge Functions (Deno, engine copied in by scripts/sync-engine):   │
                 │    grade-submission · ai-agent · create-students · send-emails ·   │
                 │    admin-users                                                     │
                 └──────────────┬───────────────────────────────┬────────────────────┘
                                │                               │
                         MiniMax chat API                  Resend email API
```

## The learning engine (`engine/`)

| Module | Responsibility |
|---|---|
| `rng.ts` | Seeded random numbers (mulberry32). An item is fully described by `{skillId, seed, difficulty}`. |
| `math/` | A forgiving expression parser (implicit multiplication, `sqrt`, roots, unicode), polynomial normalisation, linear-relation helpers. |
| `curriculum/` | Course metadata (units, lessons, outcomes) and one generator per skill. |
| `grade.ts` | Grades every answer type: numbers, expressions in a required form (expanded, factored, simplified radical, exponent form…), lines in a required form, points, graphs, choices, ordering. Gives specific messages such as "Factor completely". |
| `mastery.ts` | Bayesian Knowledge Tracing and mastery levels. |
| `assemble.ts` | Builds an attempt from an assignment, regenerates items from references, grades a submission. |
| `submit.ts` | `validateRefs` and `processSubmission`: the single code path used by the demo and the server. |
| `reminders.ts` | The reminder rule (mirrored in SQL by `send_due_reminders`). |
| `actions.ts` | Turns an AI-proposed action into an assignment draft. |
| `ai/` | Context builders, prompts, MiniMax client, JSON validation and the offline analyst. |

Every generator is tested: for 60 seeds at each difficulty on every run (`GEN_SEEDS=300 npm test`
for a deeper sweep), the item's own canonical answer must grade as correct, every item needs hints
and a worked solution, choices must be unique, and no value may be `NaN`.

### Mastery model

Each answer updates the probability that the student knows the skill:

- Prior `p(L₀) = 0.10`, learning `p(T) = 0.12`, slip `p(S) = 0.10`, guess `p(G) = 0.25` for
  multiple choice and `0.08` for typed answers.
- An answer that needed a hint or a revealed solution does not count as a correct answer, but it
  lowers the estimate only slightly.
- Levels: **Familiar** at p ≥ 0.45 with a correct answer; **Proficient** at p ≥ 0.80 with 3 correct;
  **Mastered** at p ≥ 0.95 with 5 correct across at least 2 sessions.
- Points per skill follow Khan Academy's convention (Familiar 50, Proficient 80, Mastered 100), so
  course mastery is the share of available points.
- Review is due when a Proficient skill has not been practised for 7 days, or a Mastered one for 21 days.

## Data access (`src/data/`)

All screens use the `DataApi` interface through React Query hooks (`hooks.ts`). Two
implementations exist:

- **DemoApi** keeps a seeded class in `localStorage`, syncs between tabs with the `storage` event,
  and runs the reminder scheduler in the browser every minute.
- **SupabaseApi** maps rows to domain types (`mappers.ts`), uses RPCs and Edge Functions for
  anything sensitive, and subscribes to new notifications with Supabase Realtime.

## Security model (Supabase)

- **Row-level security on every table.** Teachers see only their own classes and the students
  enrolled in them; students see only their own work, their classes, published lessons and the
  assignments meant for them (after the open date). The anonymous role has no table access.
- **Column-level grants.** For example, a student may update only `responses`, `items` and
  `integrity` on their own open attempt; a trigger additionally locks `items` when "try a similar
  question" is off.
- **Server-chosen questions.** Assignment attempts are created by `grade-submission` (`start`), and
  submissions are re-graded there. Scores, mastery and analytics are written only with the service
  role. History entries for "try a similar question" must match the slot's skill.
- **Definer functions** with an empty `search_path` handle cross-row work: joining with a code,
  publishing (which notifies students), reminders and insight actions.
- **Platform administrators** (`profiles.platform_admin`) work only through `admin_*` definer
  functions that check `is_platform_admin()` first, and the `admin-users` Edge Function for Auth
  actions (disable, enable, password reset). Every change is written to `admin_audit_log`, which
  has no client access. Self sign-up teachers start as `pending` when approval is required, and
  `can_teach()` keeps them from creating classes until approved. Disabled accounts are banned in
  Auth and rejected by every Edge Function.
- **Secrets** (MiniMax, Resend, cron secret) live in Edge Function secrets or Vault, never in the
  browser bundle.

`supabase/tests/10_policies_test.sql` exercises these rules on plain PostgreSQL in CI.

## Notifications and reminders

1. Publishing an assignment (or its open date arriving) inserts an `assignment` notification for
   every targeted student.
2. Every 5 minutes `send_due_reminders()` finds, for each open assignment, the most urgent
   reminder threshold that has passed (for example 2 hours) and notifies each targeted student who
   has **not submitted**. Each `(assignment, student, threshold, due date)` is sent once, so moving
   the deadline re-arms reminders.
3. The browser shows new notifications instantly (Realtime), as a toast, and as a system
   notification when the tab is in the background.
4. If the class has email reminders on, `send-emails` delivers `assignment` and `reminder`
   notifications through Resend to students with a real email address.

## AI teaching assistant

1. `loadAnalystInput` gathers the class roster, published lessons, mastery, the last 90 days of
   answer events (with sample wrong answers), assignments and submissions.
2. `buildStudentContext` / `buildClassContext` turn this into a compact, factual summary.
3. With a MiniMax key, the prompt asks for strict JSON (strengths, weaknesses, misconceptions,
   growth, groups and actions). Reasoning is kept separate (`reasoning_split`), JSON is extracted
   and validated, and any skill, student or lesson id the model invents is dropped.
4. Without a key, or if the call fails, the offline analyst produces the same structure from rules
   and a library of common Math 10C misconceptions.
5. Teachers approve actions; `draftFromAction` turns them into practice, review, challenge or
   reteach assignments. Autopilot does this automatically for one practice set at a time.

## Adding Grades 5–12

The platform is course-agnostic: Math 10C, Math 10-3 and the Knowledge and Employability courses
Math 10-4 and 20-4 already run side by side. To add a course, for example Math 20-1:

1. Create `engine/curriculum/math20-1/course.ts` with outcomes, units and lessons (ids such as
   `m201-1-1`), following `math10c/course.ts` or `math10-3/course.ts`.
2. Write skill generators in `engine/curriculum/math20-1/gen/*.ts` using the `skill()` helper:
   each skill returns a prompt, answer parts, hints and a worked solution for difficulty 1–3.
3. Export the skills and register the course in `engine/curriculum/index.ts` (`COURSES` and the
   skill map).
4. Add lesson text in `src/content/math20-1/lessons/<lesson-id>.md` using the same directives
   (`:::definition`, `:::example` with `@step`/`@answer`, `:::check <skill-id> <difficulty>`,
   `:::mistake`, `:::summary`).
5. Run `npm test`: the generator and lesson tests automatically cover the new course, and the new
   course appears in *New class*. Money answers must be graded to the cent (`tolerance: 0.011`, or
   up to 0.03 where several amounts are each rounded before adding); a test fails any "nearest
   cent" question that is graded more loosely. Figures must use the types in `engine/types.ts`
   (`FIGURE_TYPES`), including `barChart` and `circleGraph` for data; the tests reject unknown types.
6. Redeploy the Edge Functions (`npm run functions:deploy`, or the *Deploy Supabase backend*
   workflow). The server re-grades every submission with the shared engine, so until the
   functions carry the new course, its assignments cannot be started or graded.

## Lesson format

```markdown
## Section title

:::definition Perfect square
A number that is the product of an integer with itself.
:::

:::example Simplifying a radical
Simplify $\sqrt{72}$.
@step Find the largest perfect-square factor: $72 = 36 \times 2$.
@step $\sqrt{72} = \sqrt{36}\,\sqrt{2} = 6\sqrt{2}$
@answer $6\sqrt{2}$
:::

:::check a2-mixed-radical 2
:::
```
