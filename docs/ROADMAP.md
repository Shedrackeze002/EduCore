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

## Next, in order

1. **Live class questions.** From a "Your turn" slide, send the question to the class; students
   answer on their own devices and the results appear on the slide (how many answered, how many
   were right, the common wrong answers), without names on the projector.
2. **Student self-sign-up, AI course placement and course requests.**
   - Onboarding asks grade, stream and goals; the AI recommends a course.
   - Decision: **both** paths. Students land in a self-paced section by default (the AI acts as
     tutor) and can request to join a teacher's class, which the teacher approves.
   - Missing topics become course requests in an admin inbox; requests the admin approves become
     GitHub issues for a build session.
3. **Teacher edit suggestions with admin approval.** Teachers suggest changes on a lesson page;
   approved edits are stored in the database as a layer over the lesson files.
4. **Lockdown for quizzes and exams — only when the teacher turns it on, per assessment.**
   - Full-screen exam mode; leaving it or switching tabs is logged and shown to the teacher, with
     optional lock or auto-submit after a set number of exits.
   - Camera mode is a separate teacher choice. Decision: **no snapshots are stored**; the camera
     only has to be on. Students and parents see a consent notice.
   - A website cannot stop a student closing a tab; a Safe Exam Browser option can be added for
     schools that need true lockdown.
5. **Explainer videos.** Our own animated explainers (MP4 with captions and thumbnails), hosted
   on our YouTube channel and shown in a player that pauses for questions at set times.
   - Decision: **every lesson gets its own explainer video**, at least one per lesson and about
     two minutes or longer depending on difficulty; harder lessons (expected mostly in Grades
     9–12) get more than one. They must be high quality and fully explanatory.
   - Start with a pilot of about 3 videos for one unit to settle style and voice.
   - Decision: narration with a cloned human voice, a paid voice or a free voice, chosen by cost
     at the pilot stage. The channel owner uploads; the build produces the files.
6. **AI question builder for quizzes, exams and assignments.** In the assignment builder the
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
7. **Other subjects**, once mathematics is complete.

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
