import { expect, test, type Page } from '@playwright/test';
import { lowContrastText, signInDemo, signOut } from './helpers';

// Every text on these pages must reach WCAG AA (4.5:1) against what is behind it,
// in both themes. Dark mode flips the colour ramps, so it is checked separately.
const TEACHER = ['/t/c/c_math10a', '/t/c/c_math10a/assignments/a_1', '/t/c/c_math10a/gradebook', '/t/c/c_math10a/mastery', '/t/c/c_math10a/insights', '/admin', '/admin/users'];
const STUDENT = ['/s', '/s/learn/m10c-3-4', '/s/work', '/s/progress'];

async function expectReadable(page: Page, path: string) {
  await page.goto(path);
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('Loading…')).toHaveCount(0);
  expect(await lowContrastText(page, 4.5), `low-contrast text on ${path}`).toEqual([]);
}

for (const scheme of ['light', 'dark'] as const) {
  test.describe(`${scheme} mode`, () => {
    test.use({ colorScheme: scheme });

    test('text is readable on public, teacher, admin and student pages', async ({ page }) => {
      test.setTimeout(120_000);
      for (const path of ['/', '/login', '/signup?role=teacher']) await expectReadable(page, path);
      await signInDemo(page, 'Teacher');
      for (const path of TEACHER) await expectReadable(page, path);
      await signOut(page);
      await signInDemo(page, 'Student');
      for (const path of STUDENT) await expectReadable(page, path);
    });
  });
}
