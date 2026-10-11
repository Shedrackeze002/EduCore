# Roadmap

What comes next for EduCore, in order, with the decisions already made. Update this file as
items ship or decisions change.

## Done

- Math 10C (all 19 outcomes) and Math 10-3 (all 13 outcomes), with lessons, generators,
  mastery tracking, assignments, reminders and the AI teaching assistant.
- Knowledge and Employability Math 10-4 and 20-4 (all four strands of each), with bar and circle
  graphs for data questions.
- Platform administration: admin console, teacher approval, account controls, audit log.

## Next, in order

1. **Finish Alberta mathematics, every stream.** Math 20-1, 20-2, 20-3, 30-1, 30-2, 30-3 and
   Math 31, then Grades 5 to 9. No student is left without a course.
2. **Whiteboard and a dynamic present mode.**
   - A whiteboard opened from present mode and closed back to the slide; pressure-sensitive pen
     (Apple Pencil, styluses), mouse and touch, with palm rejection; boards can be saved to the
     lesson.
   - Present mode with more slides revealed step by step, animation, embedded videos, live class
     questions answered on students' devices with results on screen, and a timer. Lessons stay
     comprehensive: teachers hide what they do not want rather than students missing content.
3. **Student self-sign-up, AI course placement and course requests.**
   - Onboarding asks grade, stream and goals; the AI recommends a course.
   - Decision: **both** paths. Students land in a self-paced section by default (the AI acts as
     tutor) and can request to join a teacher's class, which the teacher approves.
   - Missing topics become course requests in an admin inbox; requests the admin approves become
     GitHub issues for a build session.
4. **Teacher edit suggestions with admin approval.** Teachers suggest changes on a lesson page;
   approved edits are stored in the database as a layer over the lesson files.
5. **Lockdown for quizzes and exams — only when the teacher turns it on, per assessment.**
   - Full-screen exam mode; leaving it or switching tabs is logged and shown to the teacher, with
     optional lock or auto-submit after a set number of exits.
   - Camera mode is a separate teacher choice. Decision: **no snapshots are stored**; the camera
     only has to be on. Students and parents see a consent notice.
   - A website cannot stop a student closing a tab; a Safe Exam Browser option can be added for
     schools that need true lockdown.
6. **Explainer videos.** Our own animated explainers (MP4 with captions and thumbnails), hosted
   on our YouTube channel and shown in a player that pauses for questions at set times.
   - Start with a pilot of about 3 videos for one unit to settle style and voice.
   - Decision: narration with a cloned human voice, a paid voice or a free voice, chosen by cost
     at the pilot stage. The channel owner uploads; the build produces the files.
7. **Other subjects**, once mathematics is complete.

## Hosting

- Move the site from GitHub Pages to **Cloudflare Pages** when the domain is bought (planned:
  `educore.net`, through Cloudflare Registrar). Update the Supabase Site URL and redirect URLs,
  `ALLOWED_ORIGINS` and `APP_URL` at the same time.
- Before investing in the brand, check the Canadian trademarks database for "EduCore" and
  consider a `.ca` domain as well.

## Technical follow-ups

- Split each course's question generators into their own bundle so the app loads only the
  courses a user needs (the main bundle is about 2 MB, 615 KB compressed, with four courses).
  Do this before adding the Grade 11 courses.
- Check the K&E outcome wording word for word against the program of studies once its host
  (education.alberta.ca) is reachable from the build environment.
