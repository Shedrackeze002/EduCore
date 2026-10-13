# Working on EduCore

## Pull requests
- After every push to a pull request, read GitHub Copilot's review: the inline comments and the
  summary (including "previously missed" items). If Copilot has not reviewed the latest push,
  request a review. Fix every valid finding, reply on each thread naming the fixing commit, and
  resolve it; explain in the thread when a finding is not worth changing.
- Merge only when CI is green on the latest commit and the review findings are handled.
- Check `git status` before committing; never commit build output (`dist/`, `*.tsbuildinfo`).

## Backups
- Before a major redesign or rewrite, commit and push a checkpoint of the working version first
  (say in the message that it is a checkpoint), so the change can be undone if the owner does
  not like it. Tell the owner which commit holds the backup.

## Checks before pushing
- `npm run typecheck`, `npm test`, `npm run build && node scripts/check-backend.mjs`
- `npx playwright test` (in the cloud container set
  `CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`)
- `npm run functions:check` when anything under `engine/` or `supabase/functions/` changes.

## Curriculum content
- Courses live in `engine/curriculum/<course>/` (outcomes, units, lessons, generators) and
  `src/content/<course>/lessons/*.md`; see `docs/ARCHITECTURE.md` ("Adding a course").
- After adding or renaming a skill, run `npm run catalog` (the app loads skill names from the
  generated catalogue and each course's generators on demand).
- Money: write `\$` in Markdown, keep money out of `$...$` maths, grade to the cent
  (`decimals: 2, tolerance: 0.011`).
- State every rate, tax or rule inside the question; never claim a current official figure.
- Lesson figures: `:::figure` on its own line, the JSON on the next line, then `:::`.

## After merging engine or curriculum changes
The `grade-submission` and `ai-agent` Edge Functions re-grade with the shared engine. Redeploy them
(the *Deploy Supabase backend* workflow, or `npm run functions:deploy`) so new courses can be
started and graded on the live site.
