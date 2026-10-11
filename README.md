# EduCore

EduCore is a mastery-based learning platform for mathematics. Teachers publish lessons,
present them in class, and assign work in one click. Students learn, practise and get
feedback. An AI teaching assistant reads every answer and suggests the next step for each
student and for the class.

It covers **Alberta's Grade 10 courses in the -1/-2 and -3 streams (Math 10C and Math 10-3) and the Knowledge and Employability courses Math 10-4 and 20-4**, and is built to grow to every stream in Grades 5–12.

## What is inside

| | |
|---|---|
| **Curriculum** | **Math 10C:** 8 units, 42 lessons and 126 skills covering all 19 outcomes (M1–M4, A1–A5, R1–R10). **Math 10-3:** 8 units, 31 lessons and 73 skills covering all 13 outcomes (M1–M4, G1–G6, N1–N2, A1), with workplace contexts such as wages, unit pricing, currency exchange, trades measurement and building plans. **Knowledge and Employability Math 10-4** (9 units, 27 lessons, 44 skills) and **Math 20-4** (9 units, 29 lessons, 36 skills): number sense, money, shopping, income, budgeting and credit, measurement, shapes, maps, and data and probability, written at an easier reading level with many tables, graphs and pictures. Every lesson has explanations, step-by-step worked examples, common mistakes and "check your understanding" questions. |
| **Questions** | Every skill generates unlimited fresh questions at three difficulty levels, with hints, worked solutions and a forgiving math input (fractions, radicals, exponents, equations, points, graphs). Each student gets different numbers, so answers cannot be copied. |
| **Work types** | Lesson reading, video, reading, practice, classwork, homework, quiz and exam. Instant or delayed feedback, attempts, time limits, hints, "try a similar question", shuffling, open and due dates, late work, and targeting individual students. |
| **Mastery** | Bayesian Knowledge Tracing per student and skill with five levels: Not started, Attempted, Familiar, Proficient, Mastered. Spaced review is suggested when a skill may be fading. |
| **Reminders** | Students are notified when work is assigned. Before the deadline, only students who have **not** submitted are reminded (24 h and 2 h by default, configurable). |
| **AI assistant** | Powered by MiniMax (`MiniMax-M3.1-Flash-Preview`) with an offline analyst as a fallback. It reports strengths, gaps, likely misconceptions, areas of growth and suggested groups, and proposes actions the teacher approves with one click. An optional autopilot assigns targeted practice after graded work. |
| **Admin console** | For running EduCore across a school or district: platform overview, every user and class, teacher approval, admin roles, password resets, disabling accounts, sign-up settings and an audit log. |
| **Teacher tools** | Class overview, curriculum publishing, present mode, assignment builder with student preview, per-question analysis with sample wrong answers, grading of written responses, gradebook with optional category weights, mastery heatmap, roster with generated logins and printable cards, announcements, CSV export. |

## Try it

```bash
npm install
npm run dev
```

Open http://localhost:5173 and choose **Try the teacher demo** or **Try as a student**. The demo
runs entirely in your browser with a sample class of 16 students, so no server is needed. Open the
student demo in a second tab to watch notifications and submissions arrive live.

## Going live

1. **GitHub Pages (demo):** push to `main` and set *Settings → Pages → Source* to *GitHub Actions*.
   The site appears at `https://<you>.github.io/EduCore/`.
2. **Real accounts:** create a free Supabase project, push the database and functions, and add
   two repository variables. Follow [docs/SETUP.md](docs/SETUP.md).
3. **Your own domain:** set the `CUSTOM_DOMAIN` variable and one DNS record (also in SETUP.md).

## Documentation

- [docs/TEACHER_GUIDE.md](docs/TEACHER_GUIDE.md): a teacher's week with EduCore.
- [docs/SETUP.md](docs/SETUP.md): GitHub Pages, Supabase, MiniMax, email reminders and a custom domain.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): how the pieces fit together, the security model, and how to add Grades 5–12.
- [docs/RESEARCH.md](docs/RESEARCH.md): the learning science and platforms behind the design, with sources.
- [docs/ROADMAP.md](docs/ROADMAP.md): what comes next, in order, and the product decisions already made.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the app (demo mode unless Supabase variables are set). |
| `npm test` | Engine, generator and lesson tests (every generated question is checked against its own answer key). |
| `npm run test:e2e` | Browser tests of the teacher → student → teacher loop, every page, and phone layouts. |
| `npm run test:db` | Database policy and reminder tests on any PostgreSQL 15+ server (`PGHOST`, `PGUSER`, …). |
| `npm run functions:check` | Type-check the Supabase Edge Functions with Deno. |
| `npm run build` | Production build for GitHub Pages. |
| `npm run db:push` / `npm run functions:deploy` | Deploy the backend with the Supabase CLI. |

## Project layout

```
engine/            Shared learning engine (runs in the browser and in Edge Functions)
  curriculum/      Courses, lessons metadata and question generators
  ai/              MiniMax client, prompts, validation and the offline analyst
src/
  content/         Lesson text (Markdown with worked-example and check directives)
  features/        Teacher, student, lesson, player, AI and settings screens
  data/            Data API with a browser demo backend and a Supabase backend
supabase/
  migrations/      Schema, row-level security, triggers, RPCs and scheduled reminders
  functions/       grade-submission, ai-agent, create-students, send-emails, admin-users
  tests/           Database behaviour tests
tests/e2e/         Playwright tests
```
