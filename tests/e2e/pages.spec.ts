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
