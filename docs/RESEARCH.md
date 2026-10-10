# The research behind EduCore

EduCore's goal is that after each lesson every student can solve every type of question in the
Math 10C program. This document explains which findings from learning science and which
existing platforms shaped the design, and where the current version still has limits.

## Learning science

| Principle | What the research says | How EduCore applies it |
|---|---|---|
| **Mastery learning** | Students taught with mastery learning and corrective feedback reach far higher achievement than with conventional instruction; one-to-one tutoring raised average performance by about two standard deviations [1]. | Work is organised by skill, students can retry with fresh questions, and progress is reported as mastery per skill rather than a single grade. |
| **Knowledge tracing** | A student's knowledge of a skill can be estimated from the sequence of right and wrong answers with a simple probabilistic model [2]. | Every answer updates a Bayesian Knowledge Tracing estimate; levels require repeated success across sessions, not a single lucky streak. |
| **Retrieval practice** | Being tested on material produces better long-term retention than restudying it [3], [8]. | Lessons contain short checks between sections; classwork, homework and quizzes are retrieval opportunities, and hints are optional. |
| **Spaced practice** | Practice spread over time is remembered better than massed practice [4]. | Skills that are Proficient or Mastered but have not been practised for 7 or 21 days are flagged for review, for students and in teacher reports. |
| **Interleaving** | Mixing problem types in practice improves the ability to choose the right method [5]. | Assignments can combine skills across lessons and shuffle question order; unit tests and reviews mix skills by design. |
| **Worked examples** | Studying worked examples is more efficient than unguided problem solving for novices in algebra [6]. | Every lesson has step-by-step worked examples that reveal one step at a time, and every generated question has a full worked solution. |
| **Feedback** | Feedback is among the strongest influences on learning when it tells students where they are, where they are going and what to do next [7]; formative assessment raises achievement [9]. | Instant, specific feedback ("Factor completely", "Write the radical in simplest form"), "try a similar question" after a miss, and teacher views that show exactly which skill and which wrong answers to address. |

## Platforms we learned from

- **Khan Academy** uses per-skill mastery levels (Attempted, Familiar, Proficient, Mastered) worth
  0–100 points, with levels that can go down after mistakes [10]. EduCore keeps the familiar
  level names and point values so teachers and students recognise them, but estimates the level
  with knowledge tracing across every assignment rather than with fixed exercise rules.
- **DeltaMath** popularised algorithmically generated problems with a new version after each
  miss. EduCore's 126 skill generators work the same way, so answers cannot be copied between
  students and practice never runs out.
- **IXL** shows how adaptive difficulty keeps practice in the productive zone. EduCore's practice
  sessions raise or lower difficulty from the student's current estimate and recent answers.
- **Desmos Classroom** shows how much teachers value controlling the pace of a live lesson.
  EduCore's present mode and publish-as-you-teach curriculum follow that model.
- **Google Classroom** set the expectation for assignments, due dates and notifications. EduCore
  adds deadline reminders that skip students who have already submitted.

## The curriculum

Lessons and skills follow the Alberta *Mathematics Grades 10–12 Program of Studies* for
Mathematics 10C [11], using the outcome codes in the course syllabus (M1–M4, A1–A5, R1–R10).
Each outcome is broken into specific skills; each skill has a generator with three difficulty
levels, hints and worked solutions, and appears in at least one lesson check.

## AI teaching assistant

The assistant uses MiniMax through its OpenAI-compatible Chat Completions API [12]. The model
receives a compact, factual summary (skills, scores, sample wrong answers) instead of raw records,
must answer in a fixed JSON format, and any skill, student or lesson it invents is removed before
the teacher sees the report. Recommendations become assignments only after the teacher approves
them, or under the opt-in autopilot, which is limited to one practice set per student every
three days.

## Accessibility and design

The interface targets WCAG 2.2 AA [13]: keyboard-operable controls, labelled buttons and inputs,
visible focus, reduced-motion support, dark mode, and mastery colours chosen from a single-hue
ramp that was checked for colour-vision deficiency and contrast. Charts include text summaries
and hover details, and every level is also named in text, so colour is never the only signal.

## Known limits and next steps

- **Answer secrecy.** Questions are generated in the browser so that feedback is instant. A
  determined student with developer tools could compute answers. The server re-grades every
  submission and chooses the questions for each attempt, but high-stakes exams should still be
  supervised.
- **Model calibration.** The knowledge-tracing parameters are sensible defaults from the
  literature. After a term of real data they should be fitted per skill.
- **Offline analyst.** Without a MiniMax key, insights come from rules and a misconception library.
  They are reliable but less nuanced than the language model.
- **Accessibility audit.** The interface follows WCAG guidance but has not yet had a formal audit
  with assistive-technology users.

## References

[1] B. S. Bloom, "The 2 sigma problem: The search for methods of group instruction as effective as one-to-one tutoring," *Educational Researcher*, vol. 13, no. 6, pp. 4–16, 1984. [doi:10.3102/0013189X013006004](https://doi.org/10.3102/0013189X013006004)

[2] A. T. Corbett and J. R. Anderson, "Knowledge tracing: Modeling the acquisition of procedural knowledge," *User Modeling and User-Adapted Interaction*, vol. 4, no. 4, pp. 253–278, 1994. [doi:10.1007/BF01099821](https://doi.org/10.1007/BF01099821)

[3] H. L. Roediger and J. D. Karpicke, "Test-enhanced learning: Taking memory tests improves long-term retention," *Psychological Science*, vol. 17, no. 3, pp. 249–255, 2006. [doi:10.1111/j.1467-9280.2006.01693.x](https://doi.org/10.1111/j.1467-9280.2006.01693.x)

[4] N. J. Cepeda, H. Pashler, E. Vul, J. T. Wixted and D. Rohrer, "Distributed practice in verbal recall tasks: A review and quantitative synthesis," *Psychological Bulletin*, vol. 132, no. 3, pp. 354–380, 2006. [doi:10.1037/0033-2909.132.3.354](https://doi.org/10.1037/0033-2909.132.3.354)

[5] D. Rohrer and K. Taylor, "The shuffling of mathematics problems improves learning," *Instructional Science*, vol. 35, pp. 481–498, 2007. [doi:10.1007/s11251-007-9015-8](https://doi.org/10.1007/s11251-007-9015-8)

[6] J. Sweller and G. A. Cooper, "The use of worked examples as a substitute for problem solving in learning algebra," *Cognition and Instruction*, vol. 2, no. 1, pp. 59–89, 1985. [doi:10.1207/s1532690xci0201_3](https://doi.org/10.1207/s1532690xci0201_3)

[7] J. Hattie and H. Timperley, "The power of feedback," *Review of Educational Research*, vol. 77, no. 1, pp. 81–112, 2007. [doi:10.3102/003465430298487](https://doi.org/10.3102/003465430298487)

[8] J. Dunlosky, K. A. Rawson, E. J. Marsh, M. J. Nathan and D. T. Willingham, "Improving students' learning with effective learning techniques," *Psychological Science in the Public Interest*, vol. 14, no. 1, pp. 4–58, 2013. [doi:10.1177/1529100612453266](https://doi.org/10.1177/1529100612453266)

[9] P. Black and D. Wiliam, "Assessment and classroom learning," *Assessment in Education: Principles, Policy & Practice*, vol. 5, no. 1, pp. 7–74, 1998. [doi:10.1080/0969595980050102](https://doi.org/10.1080/0969595980050102)

[10] Khan Academy, "How do Khan Academy's Mastery levels work?" Khan Academy Help Center. [support.khanacademy.org](https://support.khanacademy.org/hc/en-us/articles/5548760867853)

[11] Alberta Education, *Mathematics Grades 10–12 Program of Studies*, 2008. [education.alberta.ca](https://education.alberta.ca/media/564028/math10to12.pdf)

[12] MiniMax, "OpenAI SDK," MiniMax API Docs. [platform.minimax.io](https://platform.minimax.io/docs/api-reference/text-openai-api)

[13] W3C, *Web Content Accessibility Guidelines (WCAG) 2.2*, 2023. [w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/)
