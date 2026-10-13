# The research behind Gradileo

Gradileo's goal is that after each lesson every student can solve every type of question in the
Math 10C program. This document explains which findings from learning science and which
existing platforms shaped the design, and where the current version still has limits.

## Learning science

| Principle | What the research says | How Gradileo applies it |
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
  0–100 points, with levels that can go down after mistakes [10]. Gradileo keeps the familiar
  level names and point values so teachers and students recognise them, but estimates the level
  with knowledge tracing across every assignment rather than with fixed exercise rules.
- **DeltaMath** popularised algorithmically generated problems with a new version after each
  miss. Gradileo's 126 skill generators work the same way, so answers cannot be copied between
  students and practice never runs out.
- **IXL** shows how adaptive difficulty keeps practice in the productive zone. Gradileo's practice
  sessions raise or lower difficulty from the student's current estimate and recent answers.
- **Desmos Classroom** shows how much teachers value controlling the pace of a live lesson.
  Gradileo's present mode and publish-as-you-teach curriculum follow that model.
- **Google Classroom** set the expectation for assignments, due dates and notifications. Gradileo
  adds deadline reminders that skip students who have already submitted.

## The curriculum

Lessons and skills follow Alberta's programs of study: the *Mathematics Kindergarten to Grade 6*
curriculum (2022) for Grades 5 and 6 [35], the *Mathematics Kindergarten to Grade 9 Program of
Studies* (2007, updated 2016) for Grades 7 to 9 [36], and the *Mathematics Grades 10–12 Program of
Studies* [11]. Each outcome is broken into specific skills; each skill has a generator with three
difficulty levels, hints and worked solutions, and appears in at least one lesson check.

| Course | Stream | Outcomes |
|---|---|---|
| Mathematics 5 | Grade 5 | Number N1–N7, Algebra A1, Geometry G1, Coordinate Geometry CG1, Measurement M1, Patterns P1, Statistics S1 (the curriculum's learning outcomes, numbered by Gradileo in the order listed). |
| Mathematics 6 | Grade 6 | Number N1–N8, Algebra A1, Geometry G1, Coordinate Geometry CG1, Measurement M1–M2, Patterns P1, Statistics S1 (numbered the same way). |
| Mathematics 7 | Grade 7 | Number N1–N7, Patterns and Relations PR1–PR7, Shape and Space SS1–SS5, Statistics and Probability SP1–SP6. |
| Mathematics 8 | Grade 8 | Number N1–N7, Patterns and Relations PR1–PR2, Shape and Space SS1–SS6, Statistics and Probability SP1–SP2. |
| Mathematics 9 | Grade 9 | Number N1–N6, Patterns and Relations PR1–PR7, Shape and Space SS1–SS5, Statistics and Probability SP1–SP4. |
| Mathematics 10C | -1 and -2 (pre-calculus and foundations) | Measurement M1–M4, Algebra and Number A1–A5, Relations and Functions R1–R10, using the codes in the course syllabus. |
| Mathematics 10-3 | -3 (workplace and apprenticeship) | Measurement M1–M4, Geometry G1–G6, Number N1–N2, Algebra A1. |
| K&E Mathematics 10-4 | -4 (Knowledge and Employability) | Number N1–N2, Patterns and Relations PR1–PR2, Shape and Space SS1–SS4, Statistics and Probability SP1–SP2 (Gradileo's grouping of the program's strands). |
| K&E Mathematics 20-4 | -4 (Knowledge and Employability) | Number N1–N4 (including shopping, income, budgeting and credit), Patterns and Relations PR1, Shape and Space SS1–SS3, Statistics and Probability SP1–SP2 (Gradileo's grouping). |
| Mathematics 20-1 | -1 (pre-calculus) | Algebra and Number AN1–AN6, Trigonometry T1–T3, Relations and Functions RF1–RF11. |
| Mathematics 20-2 | -2 (foundations) | Measurement M1–M3, Geometry G1–G3, Number and Logic NL1–NL4, Statistics S1–S2, Relations and Functions RF1–RF2, and the Mathematics Research Project. |
| Mathematics 20-3 | -3 (workplace and apprenticeship) | Measurement M1–M2, Geometry G1–G4, Number N1–N5, Algebra A1–A3, Statistics S1. |
| Mathematics 30-1 | -1 (pre-calculus) | Trigonometry T1–T6, Relations and Functions RF1–RF14, Permutations, Combinations and Binomial Theorem PCBT1–PCBT4. |
| Mathematics 30-2 | -2 (foundations) | Logical Reasoning LR1–LR3, Probability P1–P6, Relations and Functions RF1–RF8, and the Mathematics Research Project. |
| Mathematics 30-3 | -3 (workplace and apprenticeship) | Measurement M1, Geometry G1–G3, Number N1–N3, Algebra A1, Statistics S1–S2, Probability P1. |
| Mathematics 31 | calculus | Precalculus PC1, Limits L1–L2, Derivatives D1–D4, Derivative Applications DA1–DA4, Integrals I1–I3, Integral Applications IA1 (Gradileo's grouping). |

Alberta's Grade 10–12 courses are built on the WNCP *Common Curriculum Framework for Grades 10–12
Mathematics* (2008), so Mathematics 10-3 corresponds to its *Apprenticeship and Workplace
Mathematics, Grade 10* [14] and to Saskatchewan's *Workplace and Apprenticeship Mathematics 10*
[15]. The Mathematics 10-3 outcome codes and the wording of M1–M4, G1, G2, G4 and N1 were
confirmed against Alberta-labelled sources [16], [17]; the wording of G3, G5, G6, N2 and A1
follows the WNCP framework and the matching Saskatchewan outcomes. Alberta's own *Outcomes with
Assessment Standards for Mathematics 10-3* [18] should be used for a final word-for-word check,
which this build could not do because the document host was unreachable from the build
environment.

Knowledge and Employability (K&E) courses are for students in Grades 8 to 12 who are working two
to three grade levels below their age-appropriate grade and are preparing for the workplace [19].
The *Knowledge and Employability Mathematics 10-4, 20-4* program of studies (2006) organizes both
courses into four strands: Number, Patterns and Relations, Shape and Space, and Statistics and
Probability [20]. Alberta's parent guide describes Mathematics 10-4 as whole numbers, fractions,
decimals, percents and integers applied to everyday, community and workplace problems; patterns,
variables, expressions, equations and graphs; visualization and symmetry with shapes; and a plan
to collect, display and analyze data [21]. A Calgary Board of Education outline for Mathematics
20-4 lists its units as a number review, shopping, income, budgeting (interest, vehicles, renting
and budgets), SI and imperial measurement, perimeter and area, maps and scale, and statistics and
probability [22]. Gradileo's outcome codes for 10-4 and 20-4 summarize these strands in plain words;
they are not quotations, and a word-for-word check against the program of studies [20] is still
needed, because its host could not be reached from the build environment. K&E lessons are written
at about a Grade 5–6 reading level with short sentences, a definition for every new term, and
many tables, graphs and pictures.

The Grade 11 courses follow the WNCP Grade 11 frameworks: Pre-calculus for Mathematics 20-1,
Foundations of Mathematics for 20-2, and Apprenticeship and Workplace Mathematics for 20-3. The
20-1 outcome codes (absolute value, radicals and rational expressions in AN1–AN6; angles in
standard position and the sine and cosine laws, including the ambiguous case, in T1–T3; factoring,
quadratic and absolute value functions, systems, inequalities, sequences and series, and
reciprocal functions in RF1–RF11) were confirmed from a Calgary Board of Education course outline
[26] and the Alberta scope and sequence [17]. The 20-2 units (rates and scale, proofs about angles
and triangles, the sine and cosine laws without the ambiguous case, reasoning and puzzles,
radicals, the normal distribution and confidence intervals, quadratics, and the research project)
follow a CBE outline [27]; its codes differ slightly between sources, and Gradileo uses the
WNCP-coded list. The 20-3 topics (surface area, volume and capacity, two and three right
triangles, scale and 3-D views, budgets, banking, interest and credit, slope and rate of change,
graphs, and puzzles) follow two CBE outlines [28], [29]. Alberta's *Outcomes with Assessment
Standards* for each course [23]–[25] should be used for a final word-for-word check of the outcome
wording, which this build could not do because their hosts were unreachable from the build
environment.

The Grade 12 courses follow the WNCP Grade 12 frameworks in the same way. Mathematics 30-1's strands
(Relations and Functions; Permutations, Combinations and Binomial Theorem; Trigonometry) are
confirmed by a Calgary Board of Education outline and by Alberta's assessment standards and
exemplars for the course [30]. Mathematics 30-2 includes Alberta's own additions to the WNCP
Foundations framework, rational expressions and equations and the laws of logarithms, alongside
set theory and conditional statements, counting and probability, polynomial, exponential,
logarithmic and sinusoidal models, and the research project [11], [31]. Mathematics 30-3 covers the
limits of measurement, the sine and cosine laws, polygons, transformations, linear relations,
statistics, probability, buying or leasing a vehicle and small business, as listed in
Alberta-equivalent college outlines and Alberta's 2014 assessment standards [32], [33]. Mathematics
31's units (precalculus, limits, derivatives and their applications, integrals and their
applications) follow Alberta-equivalent college outlines [34]; its outcome codes are Gradileo's
grouping of those units. As with Grade 11, a word-for-word check of the outcome wording against
Alberta's documents is still needed because their hosts were unreachable from the build
environment.

Grades 5 to 9 were checked word for word against the program of studies on new LearnAlberta
(curriculum.learnalberta.ca) in October 2026 [35], [36]. Grades 5 and 6 follow Alberta's new K–6
curriculum, in effect for Grades 4 to 6 since September 2023. It states learning outcomes under
organizing ideas (Number, Algebra, Geometry, Coordinate Geometry, Measurement, Patterns,
Statistics) with the knowledge, understanding, and skills and procedures for each; Gradileo numbers
the outcomes in the order listed, and every lesson stays within those skills and procedures. The
K–6 outcomes are meant to be achieved without calculators, so no Grade 5 or 6 question needs one.
Grades 7 to 9 follow the 2016 program of studies, which Alberta derived from the WNCP *Common
Curriculum Framework for K–9 Mathematics* but changed in places: Grade 8 Shape and Space outcome 6,
for example, is the congruence of polygons rather than the framework's tessellations. A new
Grades 7 to 9 mathematics curriculum is in optional classroom piloting in 2026–27, with mandatory
implementation planned for September 2027 [37]; it adds topics such as functions, irrational
numbers, scientific notation and quadratic equations, so these courses will need updating then.

Workplace contexts state every rate in the question itself (GST, exchange rates, simplified
payroll deduction rates, overtime rules), so questions stay correct when official rates change.

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

[14] Western and Northern Canadian Protocol, *The Common Curriculum Framework for Grades 10–12 Mathematics: Apprenticeship and Workplace Mathematics, Grade 10*, 2008. [bced.gov.bc.ca](https://www.bced.gov.bc.ca/irp/pdfs/mathematics/WNCPmath1012/2008math_app_work10.pdf)

[15] Saskatchewan Ministry of Education, *Workplace and Apprenticeship Mathematics 10*, 2010. [curriculum.gov.sk.ca](https://curriculum.gov.sk.ca/CurriculumOutcomeContent?id=160)

[16] "Math 10-3 Measurement" and "Math 10-3 Trigonometry," *WNCP Orchestrated Experiences for High School Math*. [wncpactivemath.wordpress.com](https://wncpactivemath.wordpress.com/math-10-3/math-10-3-measurement/)

[17] Calgary Board of Education, *Alberta Mathematics Kindergarten to Grade 12 Scope and Sequence*, 2017. [cbe.ab.ca](https://joanecardinalschubert.cbe.ab.ca/documents/3b6ad6a1-0128-554f-a162-22e16a145d51/00-alberta_math_k-12_scope_sequence-2017.pdf)

[18] Alberta Education, *Outcomes with Assessment Standards for Mathematics 10-3*, 2012. [open.alberta.ca](https://open.alberta.ca/publications/9780778598855)

[19] Alberta Education, "Knowledge and Employability," LearnAlberta curriculum. [curriculum.learnalberta.ca](https://curriculum.learnalberta.ca/curriculum/en/pos/matkae_hs)

[20] Alberta Education, *Knowledge and Employability Mathematics 10-4, 20-4 Program of Studies*, 2006. [education.alberta.ca](https://education.alberta.ca/media/3653319/kemath1020.pdf)

[21] Alberta Education, "Senior High School — Mathematics 10-4," LearnAlberta parent guide. [curriculum.learnalberta.ca](https://curriculum.learnalberta.ca/parents/en/grade/hs/mat/kae1782)

[22] Nelson Mandela High School (Calgary Board of Education), *Mathematics 20-4 Course Outline*, September 2023. [nelsonmandela.cbe.ab.ca](https://nelsonmandela.cbe.ab.ca/documents/c45830bc-fdc4-53cd-853d-1520ffc5956e/Math%2020-4%20Course%20Outline%20-%20September%202023.pdf)

[23] Alberta Education, *Mathematics 20-1 Outcomes with Assessment Standards*. [education.alberta.ca](https://education.alberta.ca/media/564034/mathematics-20-1-standards.pdf)

[24] Alberta Education, *Mathematics 20-2 Outcomes with Assessment Standards*. [education.alberta.ca](https://education.alberta.ca/media/564035/mathematics-20-2-standards.pdf)

[25] Alberta Education, *Mathematics 20-3 Outcomes with Assessment Standards*. [education.alberta.ca](https://education.alberta.ca/media/564036/mathematics-20-3-standards.pdf)

[26] Nelson Mandela High School (Calgary Board of Education), *Math 20-1 Course Outline*, 2023–2024. [nelsonmandela.cbe.ab.ca](https://nelsonmandela.cbe.ab.ca/documents/0bad0d92-9d2d-5e94-a852-ac41bfedd7ed/Math%2020-1%20Course%20Outline%202023-2024.pdf)

[27] Nelson Mandela High School (Calgary Board of Education), *Math 20-2 Course Outline*, 2023–24. [nelsonmandela.cbe.ab.ca](https://nelsonmandela.cbe.ab.ca/documents/0a2812b8-fe4e-591b-b3ab-8f9f28d84548/Math_20-2_Course_Outline_2023-24.pdf)

[28] Nelson Mandela High School (Calgary Board of Education), *Math 20-3 Course Outline*, Fall 2023. [nelsonmandela.cbe.ab.ca](https://nelsonmandela.cbe.ab.ca/documents/e080eab8-c565-5da2-8af9-4adbe3cef298/20-3%20Course%20Outline%20Fall%202023.pdf)

[29] Dr. E. P. Scarlett High School (Calgary Board of Education), *Math 20-3 Course Outline*. [drepscarlett.cbe.ab.ca](https://drepscarlett.cbe.ab.ca/documents/05a24089-0e5a-5e21-834f-890fc4ca2463/Math%2020-3%20Course%20Ouline.pdf)

[30] Alberta Education, *Mathematics 30-1 Assessment Standards and Exemplars*, 2015–2016. [education.alberta.ca](https://education.alberta.ca/media/563816/03-math30-1-standardexemp-2015-16_20150826.pdf)

[31] Calgary Board of Education, *Mathematics 30-2 course planning document*. [eps.cbe.ab.ca](https://eps.cbe.ab.ca/documents/0a46715e-d6b3-57f8-9cfe-ef81d5a95011)

[32] Alberta Education, *Mathematics 30-3 Outcomes with Assessment Standards*, 2014. [education.alberta.ca](https://education.alberta.ca/media/564033/math30_3_assessment_standards.pdf)

[33] Keyano College, *MATH 30-3 Course Outline*, Winter 2018. [keyano.ca](https://www.keyano.ca/en/resourcesGeneral/academics/WIN18_MATH30-3_A.pdf)

[34] Keyano College, *MATH 031 Course Outline*, Spring 2023. [keyano.ca](https://keyano.ca/en/resourcesGeneral/academics/SPR23_MATH031_A.pdf)

[35] Alberta Education, *Mathematics (K–6)*, new LearnAlberta, 2022 (Grades 5 and 6). [curriculum.learnalberta.ca](https://curriculum.learnalberta.ca/curriculum/en/c/mat6)

[36] Alberta Education, *Mathematics (7–9) Program of Studies*, implemented 2016-09-01. [curriculum.learnalberta.ca](https://curriculum.learnalberta.ca/curriculum/en/pos/MAT_79)

[37] Government of Alberta, *K to 12 curriculum renewal: how we got here* and *Mathematics* (updated June 2026). [alberta.ca](https://www.alberta.ca/curriculum-how-we-got-here)
