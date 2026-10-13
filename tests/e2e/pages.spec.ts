import { expect, test } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

test('landing page renders', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('button', { name: 'Try the teacher demo' }).click();
  await page.waitForURL(/\/t\/c\//);
  expect(errors).toEqual([]);
});

test('every teacher page loads without errors', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  const pages: Array<[string, string | RegExp]> = [
    ['/t/c/c_math10a', 'Math 10C'],
    ['/t/c/c_math10a/curriculum', 'Curriculum'],
    ['/t/c/c_math10a/lessons/m10c-2-1', 'The Tangent Ratio'],
    ['/t/c/c_math10a/assignments', 'Assignments'],
    ['/t/c/c_math10a/assignments/new', 'New assignment'],
    ['/t/c/c_math10a/students', 'Students'],
    ['/t/c/c_math10a/gradebook', 'Gradebook'],
    ['/t/c/c_math10a/mastery', 'Mastery map'],
    ['/t/c/c_math10a/insights', 'AI teaching assistant'],
    ['/t/c/c_math10a/settings', 'Class settings'],
    ['/notifications', 'Notifications'],
    ['/settings', 'Settings'],
  ];
  for (const [path, heading] of pages) {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: heading }).first()).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test('every student page loads without errors', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Student');
  await expect(page.getByRole('heading', { name: /Amara/ })).toBeVisible();
  for (const [path, heading] of [
    ['/s/learn', /Learn|Lessons/],
    ['/s/learn/m10c-1-1', 'Referents, Estimation and Units'],
    ['/s/work', /Classwork|Work/],
    ['/s/progress', 'My progress'],
    ['/s/live', 'Class question'],
  ] as const) {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: heading }).first()).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test('teacher can analyse the class with the AI assistant and approve a suggestion', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/c/c_math10a/insights');
  await page.getByRole('button', { name: 'Analyse class' }).first().click();
  await expect(page.getByText('Recommended next steps')).toBeVisible();
  const approve = page.getByRole('button', { name: 'Approve & assign' }).first();
  await approve.click();
  await expect(page.getByText('Assigned', { exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test('students practise a skill with instant feedback', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Student');
  await page.goto('/s/practice?skills=m1-referents');
  const choice = page.getByRole('radio').first();
  await choice.click();
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.getByText(/Correct|Not quite|Incorrect/).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('a teacher creates a Math 10-3 class and teaches from its curriculum', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('button', { name: /Math 10-3/ }).click();
  await expect(page.getByLabel('Class name')).toHaveValue('Math 10-3');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await expect(page.getByText('Grade 10 Mathematics (Math 10-3)').first()).toBeVisible();
  await page.goto(`${page.url().replace(/\/$/, '')}/curriculum`);
  await expect(page.getByText('Unit Pricing and Currency Exchange').first()).toBeVisible();
  await page.goto(`${page.url().replace(/\/curriculum$/, '')}/lessons/m103-6-3`);
  await expect(page.getByText('Parallel Lines and Transversals').first()).toBeVisible();
  await expect(page.getByText(/Check your understanding/i).first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a Grade 11 lesson check takes a list of roots', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('button', { name: /Math 20-1/ }).click();
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await page.goto(`${page.url().replace(/\/$/, '')}/lessons/m201-4-2`);
  await expect(page.getByText('Solving Quadratic Equations by Graphing and Factoring').first()).toBeVisible();
  const check = page.locator('div.border-dashed', { hasText: 'Check your understanding · Roots from a graph' }).first();
  await check.getByRole('textbox', { name: 'Answer' }).first().fill('100, -100');
  await check.getByRole('button', { name: 'Check' }).click();
  await expect(check.getByText(/Not quite|Close/).first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a Math 31 lesson reads calculus answers', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('button', { name: /Mathematics 31/ }).click();
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await page.goto(`${page.url().replace(/\/$/, '')}/lessons/m31-4-3`);
  await expect(page.getByText('The Chain Rule').first()).toBeVisible();
  const check = page.locator('div.border-dashed', { hasText: 'Check your understanding' }).first();
  await check.getByRole('textbox', { name: 'Answer' }).first().fill('3sin^2 x cos x');
  // The live preview typesets what the student typed, functions included.
  await expect(check.locator('.katex', { hasText: 'sin' }).first()).toBeVisible();
  await check.getByRole('button', { name: 'Check' }).click();
  // The check is drawn at random: a derivative is graded, while an f'(a) value asks for a number.
  await expect(check.getByText(/Not quite|Correct|should be a number/).first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a Grade 5 lesson loads its practice questions', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('button', { name: /Grade 5 Mathematics/ }).click();
  await expect(page.getByLabel('Class name')).toHaveValue('Math 5');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await page.goto(`${page.url().replace(/\/$/, '')}/lessons/m5-5-1`);
  await expect(page.getByText('Improper Fractions and Mixed Numbers').first()).toBeVisible();
  // The checks come from the Grade 5 generators, which load on demand.
  await expect(page.getByText(/Check your understanding · /).first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a Grade 8 lesson draws structures of cubes', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('button', { name: /Grade 8 Mathematics/ }).click();
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await page.goto(`${page.url().replace(/\/$/, '')}/lessons/m8-8-1`);
  await expect(page.getByText('Views of Three-Dimensional Objects').first()).toBeVisible();
  await expect(page.locator('svg[aria-label*="cube"]').first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a teacher creates a Knowledge and Employability class and sees its graphs', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('button', { name: /Mathematics 20-4/ }).click();
  await expect(page.getByLabel('Class name')).toHaveValue('Math 20-4');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await expect(page.getByText('Knowledge and Employability Mathematics 20-4').first()).toBeVisible();
  await page.goto(`${page.url().replace(/\/$/, '')}/curriculum`);
  await expect(page.getByText('Budgeting and Credit').first()).toBeVisible();
  await page.goto(`${page.url().replace(/\/curriculum$/, '')}/lessons/m204-9-1`);
  await expect(page.getByText('Displaying Data').first()).toBeVisible();
  await expect(page.locator('svg[role="img"][aria-label*="graph" i]').first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a teacher presents a lesson as slides that build step by step, with a whiteboard', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/present/c_math10a/m10c-2-1');
  const slide = page.locator('[aria-roledescription="slide"]');
  await expect(slide).toHaveAttribute('aria-label', /^Slide 1 of \d+: The Tangent Ratio$/);
  await expect(page.getByRole('heading', { level: 1, name: 'The Tangent Ratio' })).toBeVisible();

  // Next reveals one piece at a time before moving on.
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(slide).toHaveAttribute('aria-label', /Naming the sides/);
  const waiting = slide.locator('.build-wait');
  const before = await waiting.count();
  expect(before).toBeGreaterThan(0);
  await page.keyboard.press('ArrowRight');
  await expect(waiting).toHaveCount(before - 1);

  // The whiteboard opens over the slide, saves to the lesson and closes back to the same slide.
  await page.keyboard.press('w');
  const board = page.getByRole('dialog', { name: 'Whiteboard' });
  await expect(board).toBeVisible();
  const canvas = board.getByRole('img', { name: /Whiteboard, page 1/ });
  const box = (await canvas.boundingBox())!;
  await page.mouse.move(box.x + 100, box.y + 100);
  await page.mouse.down();
  await page.mouse.move(box.x + 300, box.y + 200, { steps: 8 });
  await page.mouse.up();
  await board.getByRole('button', { name: 'Save to lesson' }).click();
  await expect(board.getByRole('button', { name: 'Saved' })).toBeVisible();
  await board.getByRole('button', { name: 'Back to slide' }).click();
  await expect(board).toBeHidden();
  await expect(slide).toHaveAttribute('aria-label', /Naming the sides/);

  // The slide overview jumps to a "Your turn" slide with the lesson's interactive question.
  await page.keyboard.press('o');
  await page.getByRole('dialog', { name: 'All slides' }).getByRole('button', { name: /Your turn/ }).first().click();
  await expect(slide.locator('[data-question]')).toBeVisible();

  // The saved board is listed on the lesson page.
  await page.getByRole('button', { name: 'Exit presentation' }).click();
  await expect(page.getByText('Saved whiteboards')).toBeVisible();
  expect(errors).toEqual([]);
});

test('the teacher asks the class a live question and students answer on their own devices', async ({ context }) => {
  // Two tabs share the demo's storage but each signs in on its own, like two devices.
  const teacher = await context.newPage();
  const student = await context.newPage();
  const teacherErrors = trackErrors(teacher);
  const studentErrors = trackErrors(student);
  await signInDemo(teacher, 'Teacher');
  await teacher.goto('/present/c_math10a/m10c-2-1');
  await expect(teacher.locator('[aria-roledescription="slide"]')).toHaveAttribute('aria-label', /^Slide 1 of/);
  await teacher.keyboard.press('o');
  await teacher.getByRole('dialog', { name: 'All slides' }).getByRole('button', { name: /Your turn/ }).first().click();
  await teacher.getByRole('button', { name: 'Ask the class on their devices' }).click();
  await expect(teacher.getByText('Live · 0 answered')).toBeVisible();

  await signInDemo(student, 'Student');
  await student.getByRole('link', { name: /Answer now/ }).click();
  await expect(student.getByRole('heading', { name: 'Class question' })).toBeVisible();
  await student.locator('[data-question] button').first().click();
  await student.getByRole('button', { name: 'Send answer' }).click();
  await expect(student.getByText(/Answer sent/).first()).toBeVisible();

  await expect(teacher.getByText('Live · 1 answered')).toBeVisible();
  await teacher.getByRole('button', { name: /Add the sample class/ }).click();
  await teacher.getByRole('button', { name: 'Stop and show results' }).click();
  await expect(teacher.getByLabel('Answers by choice')).toBeVisible();
  await expect(teacher.getByText(/correct ·/)).toBeVisible();

  await expect(student.getByText(/Correct — well done!|Not quite/)).toBeVisible();
  await expect(student.getByText('Worked solution')).toBeVisible();
  expect([...teacherErrors, ...studentErrors]).toEqual([]);
});
