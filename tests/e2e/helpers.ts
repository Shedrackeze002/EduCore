import { expect, type Page } from '@playwright/test';

/** Collects uncaught errors and console errors so tests can assert a clean run. */
export function trackErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`console: ${m.text()}`);
  });
  return errors;
}

export async function signInDemo(page: Page, who: 'Teacher' | 'Student') {
  await page.goto('/login');
  await page.getByRole('button', { name: `${who} demo` }).click();
  await page.waitForURL(who === 'Teacher' ? /\/t\/c\// : /\/s$/);
}

export async function signOut(page: Page) {
  await page.getByRole('button', { name: 'Account menu' }).click();
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.waitForURL(/\/login/);
}

export async function expectNoHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}
