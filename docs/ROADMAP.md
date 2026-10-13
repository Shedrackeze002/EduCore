# Roadmap

What comes next for EduCore, in order, with the decisions already made. Update this file as
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
   before any new work). Gradileo, from *gradient* and *Galileo* (gradileo.com, .net, .io, .app and
   .academy were free when checked). The rename covers the app, logo, emails, documents, the
   video stage, the YouTube text and channel, and the site address; all videos are rendered again
   with the new name before they are uploaded.
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
     the question in EduCore, from the cues in `src/content/videos.json`) and the admin **Videos**
     page where each video's YouTube link is recorded.
   - Built: Math 10C Unit 2 is complete, eight videos (lessons 2.1 to 2.4, two parts each). Lessons
     2.3 and 2.4 brought a `diagram` element for figures drawn from points (angles of elevation and
     depression, a cliff and a boat, a clinometer, two triangles sharing a side).
   - Next: the remaining videos unit by unit (Math 10C Unit 1, then Units 3 to 8, then the other
     courses), each lesson split into parts of about three minutes when it needs more.
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

- Move the site from GitHub Pages to **Cloudflare Pages** when the domain is bought (planned:
  `educore.net`, through Cloudflare Registrar). Update the Supabase Site URL and redirect URLs,
  `ALLOWED_ORIGINS` and `APP_URL` at the same time.
- Before investing in the brand, check the Canadian trademarks database for "EduCore" and
  consider a `.ca` domain as well.

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
