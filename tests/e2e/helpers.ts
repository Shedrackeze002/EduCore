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

/**
 * Text whose contrast with the background behind it is below `min` (WCAG ratio).
 * The background is the nearest ancestor with an opaque background colour.
 */
export async function lowContrastText(page: Page, min = 3): Promise<string[]> {
  return page.evaluate((min) => {
    const parse = (c: string) => {
      const m = c.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
      return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    };
    const lum = (c: { r: number; g: number; b: number }) => {
      const f = (v: number) => ((v /= 255) <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
      return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
    };
    const backdrop = (el: Element | null) => {
      for (; el; el = el.parentElement) {
        const c = parse(getComputedStyle(el).backgroundColor);
        if (c && c.a > 0.5) return c;
      }
      return parse(getComputedStyle(document.body).backgroundColor) ?? { r: 255, g: 255, b: 255, a: 1 };
    };
    const out = new Set<string>();
    for (const el of Array.from(document.querySelectorAll('body *'))) {
      if (!Array.from(el.childNodes).some((n) => n.nodeType === 3 && (n.textContent ?? '').trim().length > 1)) continue;
      const box = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (!box.width || !box.height || cs.visibility === 'hidden' || Number(cs.opacity) < 0.3) continue;
      const fg = parse(cs.color);
      if (!fg) continue;
      const bg = backdrop(el);
      const mix = { r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a) };
      const [a, b] = [lum(mix), lum(bg)];
      const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      if (ratio < min) out.add(`${ratio.toFixed(2)}: "${(el.textContent ?? '').trim().slice(0, 40)}"`);
    }
    return [...out];
  }, min);
}
