import { expect, test } from '@playwright/test';
import { signInDemo, signOut, trackErrors } from './helpers';

test('the administrator opens every admin page from the account menu', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.getByRole('button', { name: 'Account menu' }).click();
  await page.getByRole('button', { name: 'Admin console' }).click();
  await page.waitForURL(/\/admin$/);
  await expect(page.getByRole('heading', { name: 'Platform overview' })).toBeVisible();
  await expect(page.getByText('New accounts per week')).toBeVisible();
  const pages: Array<[string, string]> = [
    ['/admin/users', 'Users'],
    ['/admin/classes', 'Classes'],
    ['/admin/settings', 'Platform settings'],
    ['/admin/audit', 'Audit log'],
  ];
  for (const [path, heading] of pages) {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
  }
  await page.goto('/admin/users');
  await expect(page.getByRole('list', { name: 'Users' }).getByText('Amara Okafor')).toBeVisible();
  await page.goto('/admin/classes');
  await expect(page.getByRole('list', { name: 'Classes' }).getByText('Shedrack Eze', { exact: false })).toBeVisible();
  expect(errors).toEqual([]);
});

test('a new teacher waits for approval, the administrator approves, and the teacher can start', async ({ page }) => {
  const errors = trackErrors(page);
  const email = `new.teacher.${Date.now() % 100000}@school.ca`;

  // The administrator requires approval for new teachers.
  await signInDemo(page, 'Teacher');
  await page.goto('/admin/settings');
  await page.getByRole('radio', { name: /Approve new teachers/ }).click();
  await expect(page.getByRole('radio', { name: /Approve new teachers/ })).toHaveAttribute('aria-checked', 'true');
  await signOut(page);

  // A teacher signs up and lands on the waiting screen.
  await page.goto('/signup?role=teacher');
  await expect(page.getByText(/reviewed by an administrator/)).toBeVisible();
  await page.getByLabel('Full name').fill('Grace Hopper');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill('secret12');
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page.getByRole('heading', { name: 'Your teacher account is waiting for approval' })).toBeVisible();
  await page.goto('/t/new-class');
  await expect(page.getByRole('heading', { name: 'Your teacher account is waiting for approval' })).toBeVisible();
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.waitForURL(/\/login/);

  // The administrator approves from the overview.
  await signInDemo(page, 'Teacher');
  await page.goto('/admin');
  await expect(page.getByText('1 teacher waiting for approval')).toBeVisible();
  await page.getByRole('button', { name: 'Approve', exact: true }).click();
  await expect(page.getByText('Grace Hopper can now teach on EduCore')).toBeVisible();
  await page.goto('/admin/audit');
  await expect(page.getByText('Shedrack Eze approved the teacher account of Grace Hopper')).toBeVisible();
  await signOut(page);

  // The teacher can now create a class.
  await page.getByLabel(/Email or username/).fill(email);
  await page.getByLabel('Password').fill('secret12');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Create your first class' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('students cannot open the admin console', async ({ page }) => {
  await signInDemo(page, 'Student');
  await page.goto('/admin/users');
  await page.waitForURL(/\/s$/);
});
