# Roadmap

What comes next for Gradileo (formerly EduCore), in order, with the decisions already made. Update this file as
items ship or decisions change.

## Done

- Math 10C (all 19 outcomes) and Math 10-3 (all 13 outcomes), with lessons, generators,
  mastery tracking, assignments, reminders and the AI teaching assistant.
- Knowledge and Employability Math 10-4 and 20-4 (all four strands of each), with bar and circle
  graphs for data questions.
- Grade 11: Math 20-1, 20-2 and 20-3 (every outcome of each), with list answers for equations
  with several solutions.
- Grade 12: Math 30-1, 30-2, 30-3 and Math 31, with trigonometric, logarithmic and calculus
  answers graded by equivalence (derivatives, identities, exact values).
- Grades 5 to 9: Math 5 and Math 6 on Alberta's new K–6 curriculum, and Math 7, 8 and 9 on the
  2016 program of studies, every outcome checked word for word against new LearnAlberta. Every
  Alberta mathematics course from Grade 5 to Grade 12 is now available.
- Platform administration: admin console, teacher approval, account controls, audit log.
- Present mode as a slide deck, with a whiteboard: 16:9 slides that build point by point with
  transitions, worked examples step by step, "Your turn" slides with the interactive questions,
  drawing on slides, a whiteboard with pen pressure and palm rejection saved to the lesson (and
  shared with students), a timer, a student picker, embedded videos and activities, and "Choose
  what to show" per class.
- Live class questions: from a "Your turn" slide the teacher sends the question to every
  student's device; answers arrive in real time and the slide shows how many answered, how many
  were right, each choice's share or the common wrong answers, without names. Students see
  whether they were right and the worked solution when the teacher shows the results.

- Student self-sign-up, AI course placement and course requests:
  - Students who sign up without a class code answer a few questions (grade, plans, calculus, how
    mathematics feels), get a recommended course that follows Alberta's sequences, can take a
    6-question placement check on the course before, and study in a self-paced section where every
    lesson is open and the AI acts as tutor (study coach and autopilot practice). Students can
    study several courses and switch between them.
  - Join requests: a class can ask the teacher to approve students who use its code (on by default
    for new classes); the teacher approves or declines on the Students page, and the student keeps
    their self-paced progress.
  - Course requests: students and teachers ask for a missing course or topic; requests land in the
    admin inbox, and approving one opens a prefilled GitHub issue for a build session (the issue
    link is saved and the person who asked is told when it is planned and when it is built).

- Teacher edit suggestions with admin approval: on a lesson page a teacher suggests a change to
  any section in an editor with a live preview; an administrator reviews a line-by-line diff and a
  preview and approves or declines it. Approved edits are stored in the database as a layer over
  the lesson files and apply to every class (lessons and present mode); they can be reverted, and
  an edit stops applying if its section in the file changes.

- Exam mode for quizzes and exams, when the teacher turns it on per assessment: full screen;
  leaving it, switching tabs or apps and the camera turning off are recorded and shown to the
  teacher; after a set number of exits the attempt locks until the teacher unlocks it, or is
  submitted automatically. The camera option only checks that the camera is on: nothing is
  recorded or stored, and students see a consent notice before they start.

## Next, in order

0. **Rename EduCore to Gradileo** (the owner's decision, after the Math 10C Unit 2 videos and
   before any new work). Gradileo, from *gradient* and *Galileo*, said "grad-ih-LAY-oh"
   (gradileo.com, .net, .io, .app and .academy were free when checked).
   - Done: everything people see (the app, wordmark, page title, emails, the AI assistant, error
     messages, documents, the video stage and YouTube text), with the eight Math 10C videos
     rendered again as Gradileo. Internal names stay as they were so nothing breaks: browser
     storage keys, the student sign-in email domain, Supabase secret and project names, and the
     repository path. Demo accounts moved to `gradileo.demo`, and saved demo data is updated when
     it loads.
   - Done: the site moved to gradileo.com on Cloudflare, with email at admin@gradileo.com (see
     Hosting), and the owner is setting up the Gradileo YouTube channel. Last: the owner renames the
     GitHub repository (Hosting, step 3).
1. **Explainer videos.** Our own animated explainers (MP4 with captions and thumbnails), hosted
   on our YouTube channel and shown in a player that pauses for questions at set times.
   - Decision: **every lesson gets its own explainer video**, at least one per lesson and about
     two minutes or longer depending on difficulty; harder lessons (expected mostly in Grades
     9–12) get more than one. They must be high quality and fully explanatory.
   - Start with a pilot of about 3 videos for one unit to settle style and voice.
   - Decision: narration with a cloned human voice, a paid voice or a free voice, chosen by cost
     at the pilot stage. The channel owner uploads; the build produces the files.
   - Built: the video pipeline (`video/`, scripts in `src/content/<course>/videos/`) and the pilot,
     four videos of about three minutes for Math 10C Unit 2 (lessons 2.1 and 2.2, two parts
     each). Narration uses Kokoro, a free open-weight voice (`af_heart`).
   - Decision: the owner approved the pilot's style and voice (13 Oct 2026), and asked for
     captions; the build makes them from the script, they are uploaded with each video, and the
     lesson player shows them from the start.
   - Built: the lesson player (YouTube's player above the lesson, pausing at each "Your turn" to ask
     the question in Gradileo, from the cues in `src/content/videos.json`) and the admin **Videos**
     page where each video's YouTube link is recorded.
   - Built: Math 10C Unit 2 is complete, eight videos (lessons 2.1 to 2.4, two parts each). Lessons
     2.3 and 2.4 brought a `diagram` element for figures drawn from points (angles of elevation and
     depression, a cliff and a boat, a clinometer, two triangles sharing a side).
   - Built: Math 10C Unit 1 is complete, sixteen videos (lessons 1.1 to 1.8, two parts each, about
     two and a half to four minutes). They brought 3-D solids drawn in an oblique view with hidden
     edges dashed (prisms, cylinders, pyramids, cones, spheres, hemispheres and composites such
     as a silo), nets that unfold them, rulers (metric and to the sixteenth of an inch), a vernier
     caliper, and unit squares and cubes for area and volume units (`src/video/solids.ts`,
     `src/video/measure.ts`).
   - Built: Math 10C Unit 3, twelve videos (lessons 3.1 to 3.6, two parts each, about three to
     four minutes): prime factors, GCF and LCM, squares and cubes and their roots, the real number
     system, mixed and entire radicals, and integral and rational exponents. They brought number
     figures (`src/video/numbers.ts`): factor trees, a Venn diagram of shared primes, number
     lines, tiled rectangles, the real number system as nested sets, and a row of powers.
   - Built: Math 10C Unit 4, twelve videos (lessons 4.1 to 4.6, two parts each, about three
     minutes): multiplying binomials and polynomials, common factors, factoring x² + bx + c and
     ax² + bx + c, and special products with a strategy for factoring completely. They brought an
     area model that can also be drawn as algebra tiles (`src/video/algebra.ts`).
   - Built: Math 10C Unit 5, eight videos (lessons 5.1 to 5.4, two parts each, about two to three
     minutes): relations and their representations, functions, domain and range, and function
     notation. They brought graphs (`src/video/graph.ts`): coordinate planes stretched to any
     scale, plotted functions, polylines, points (open or closed) and arrow diagrams.
   - Built: Math 10C Unit 6, ten videos (lessons 6.1 to 6.5, two parts each, about two to three
     minutes): linear relations and rates of change, intercepts, slope, parallel and
     perpendicular lines, and the distance and midpoint formulas.
   - Scripted: Math 10C Unit 7, ten videos (lessons 7.1 to 7.5, two parts each): slope-intercept,
     slope-point and general form, parallel and perpendicular equations, linear models, and
     lines of best fit.
   - Scripted: Math 10C Unit 8, eight videos (lessons 8.1 to 8.4, two parts each): systems of
     linear equations, solving by graphing, substitution and elimination, the number of
     solutions, and problems solved with systems.
   - Scripted: Math 10-3 Units 1 to 7, two parts per lesson (about three minutes each): units and
     measurement, money and finance, ratios and rates, perimeter, area and surface area, angles
     and spatial puzzles, the Pythagorean theorem and similar figures. Units 6 and 7 brought angle
     figures (`src/video/angles.ts`: rays, crossing lines, transversals, a clock and a protractor)
     and triangle figures (`src/video/triangles.ts`: squares on the sides, any triangle, and a
     rectangle with its diagonal). Unit 8 (trigonometry) is being scripted.
   - Next: render Math 10C Units 7 and 8 to finish Math 10C, then render Math 10-3, then the other
     courses in order (Math 10-4, 20-1, 20-2, 20-3, 20-4, 30-1, 30-2, 30-3, 31, 5, 6, 7, 8 and 9),
     each lesson split into parts of about three minutes when it needs more.
2. **AI question builder for quizzes, exams and assignments.** In the assignment builder the
   teacher chooses the kind of work (quiz, exam, homework, exercise, activity, classwork and so
   on), the question formats and every other setting, then presses one button (name to settle;
   for example "Draft with AI") and the AI drafts the questions from the course curriculum and
   the class.
   - Question formats: single choice, multiple choice (several answers), short answers graded by
     the engine (numbers, expressions, equations, points), open-ended written answers, and
     "solve it on the canvas" questions where students work on a whiteboard and show their steps
     (this needs a new canvas answer type built on the whiteboard's ink, graded by the teacher
     with an AI-suggested mark).
   - Settings: the units, lessons or outcomes to cover, number of questions, difficulty mix,
     marks, time limit, attempts, dates, feedback and every other option the builder already has.
   - "Based on the class": weight the questions towards the skills the class has not yet
     mastered, using the mastery data.
   - Auto-graded questions come from the engine's generators (fresh numbers for each student);
     the AI writes the questions the generators cannot (open-ended, canvas) with answer keys and
     marking guides. The teacher previews everything, regenerates or edits single questions, and
     publishes; nothing reaches students without the teacher's approval.
3. **Other subjects**, once mathematics is complete.

## Hosting

- Decision: move the site from GitHub Pages to **Cloudflare** (Pages, or Workers with static
  assets, whichever Cloudflare recommends at the time) at **gradileo.com**, bought through
  Cloudflare Registrar. Reasons: GitHub Pages' terms do not allow running a business or software
  service on it; Cloudflare serves static sites free without a bandwidth cap, from data centres in
  Kigali and Canada; and the domain lives in the same account.
- The move, in two steps so the site never goes down:
  1. Built: the deploy workflow also publishes to Cloudflare once the tests pass (a Worker serving
     the built app, `wrangler.jsonc`, at gradileo.com and www.gradileo.com), while GitHub Pages
     keeps serving the site as before. The owner bought the domain and added the secrets
     `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
  2. Built: gradileo.com is live (checked: the landing and sign-in pages, www, deep links and
     assets). GitHub Pages now serves a redirect from the old address to the same page on
     gradileo.com, keeping the path, query and sign-in tokens, and the video build links to
     gradileo.com. Done: gradileo.com is the Supabase Site URL and a sign-in redirect address (with
     www), `APP_URL` is set to it, and `ALLOWED_ORIGINS` is gradileo.com and www.gradileo.com
     (checked: the Edge Functions answer those two and refuse other sites, including github.io).
  3. Last, the owner renames the GitHub repository to Gradileo (GitHub Pages does not redirect
     the old project address, so this waits until gradileo.com is the main address), and the
     repository path in the code follows.
- Email: done. admin@gradileo.com forwards to the owner's inbox through Cloudflare Email Routing,
  set up by the *Set up email* workflow (docs/SETUP.md 3.3; gradileo.com's MX and SPF records
  point to Cloudflare). More addresses are a line in `scripts/cloudflare-email.mjs`. Next: send
  from gradileo.com through Resend, which also lets reminders come from an address at
  gradileo.com (and Gmail's "Send mail as").
- Before investing further in the brand, check the Canadian (CIPO) and US (USPTO) trademark
  databases for "Gradileo" in classes 9, 41 and 42.

## Technical follow-ups

- Check the K&E, Math 10-3, Grade 11 and Grade 12 outcome wording word for word against Alberta's
  program of studies and *Outcomes with Assessment Standards*. Their hosts are now reachable from
  the build environment (Grades 5 to 9 were checked this way).
- Update Math 7, 8 and 9 to Alberta's new Grades 7–9 curriculum before it becomes mandatory in
  September 2027 (functions, irrational numbers, scientific notation, quadratic equations and
  more). Optional classroom piloting runs in 2026–27.
- The *Deploy Supabase backend* workflow skips itself because its repository secrets
  (`SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_ID`, `SUPABASE_DB_PASSWORD`) are not set, so
  migrations are applied by hand and recorded in `supabase_migrations.schema_migrations`. Add the
  secrets so merges apply migrations and redeploy the Edge Functions on their own.
- Self-paced study, next steps: an AI tutor chat inside lessons (explain a step, give a hint,
  check working) using the same AI provider as the teaching assistant; store placement results on
  the server (today they stay on the device); let a student leave a self-paced course; and email
  the AI tutor's weekly summary.
- Exam mode, next steps: a Safe Exam Browser option for schools that need true lockdown, a
  per-class default for exam mode, and a live view of who is locked during an exam.
- Lesson edits, next steps: let administrators edit the lesson introduction (before the first
  section) as well as sections, and export approved edits as a pull request so they can be folded
  into the lesson files.
- Course requests, next step: create the GitHub issue automatically from an Edge Function with a
  repository token (today the administrator submits GitHub's prefilled form and pastes the link).
- Live class questions, next steps: a teacher-only list of who has and has not answered (never on
  the projector), an optional countdown per question, and counting live answers as practice
  evidence for mastery.
- Figures: label number-line ticks as fractions where a lesson works in fractions, and make the
  shading of filled shapes on coordinate grids a little stronger.
- The main JavaScript bundle is about 875 KB (240 KB compressed); split the remaining large
  shared modules so first loads are faster on school networks.
