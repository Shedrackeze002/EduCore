import { expect, test } from '@playwright/test';
import { signInDemo, signOut, trackErrors } from './helpers';

test('teacher assigns a quiz, the student is notified, completes it, and the teacher sees the result', async ({ page }) => {
  const errors = trackErrors(page);
  const title = `Checkpoint quiz ${Date.now() % 100000}`;

  // Teacher builds a quiz from Lesson 1.1 and publishes it.
  await signInDemo(page, 'Teacher');
  await page.goto('/t/c/c_math10a/assignments/new?type=quiz&lesson=m10c-1-1');
  await expect(page.getByRole('heading', { name: 'New assignment' })).toBeVisible();
  await page.getByLabel('Title').fill(title);
  await page.getByRole('button', { name: 'Publish & notify students' }).click();
  await page.waitForURL(/\/assignments\/a_/);
  await expect(page.getByRole('heading', { name: title })).toBeVisible();
  await expect(page.getByText('0/16')).toBeVisible();
  await signOut(page);

  // Student sees the notification and the work.
  await signInDemo(page, 'Student');
  await page.getByRole('button', { name: /Notifications/ }).click();
  await expect(page.getByText(`New quiz: ${title}`)).toBeVisible();
  await page.getByText(`New quiz: ${title}`).click();
  await page.waitForURL(/\/s\/work\/a_/);
  await page.getByRole('button', { name: /^Start/ }).click();
  await page.waitForURL(/\/take$/);

  // Answer the first question if it is multiple choice, then move through to the end.
  const choice = page.getByRole('radio').first();
  if (await choice.isVisible().catch(() => false)) await choice.click();
  for (let i = 0; i < 12; i++) {
    const finish = page.getByRole('button', { name: 'Finish' });
    if (await finish.isVisible()) break;
    await page.getByRole('button', { name: /Save & next/ }).click();
  }
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Submit' }).click();
  await page.waitForURL(/\/s\/work\/a_[^/]+$/);
  await expect(page.getByText('Your best result')).toBeVisible();
  await signOut(page);

  // Teacher sees the submission.
  await signInDemo(page, 'Teacher');
  await page.goto('/t/c/c_math10a/assignments');
  await page.getByRole('link', { name: new RegExp(title) }).click();
  await expect(page.getByText('1/16')).toBeVisible();
  await expect(page.getByRole('row', { name: /Amara Okafor/ }).getByText('Submitted')).toBeVisible();

  expect(errors).toEqual([]);
});
