/** Ink colours for the current theme, updated when the theme or the system setting changes. */
import { useEffect, useState } from 'react';
import { inkPalette, type InkColor } from '@/lib/ink.ts';

export interface InkTheme {
  dark: boolean;
  palette: Record<InkColor, string>;
  /** Colour of ruled lines, squares and dots on the board. */
  rule: string;
  surface: string;
}

function readTheme(): InkTheme {
  const css = getComputedStyle(document.documentElement);
  const rgb = (name: string, fallback: string) => {
    const v = css.getPropertyValue(name).trim();
    return v ? `rgb(${v.split(/\s+/).join(', ')})` : fallback;
  };
  const surface = css.getPropertyValue('--surface').trim().split(/\s+/).map(Number);
  const dark = surface.length === 3 && surface.every(Number.isFinite) ? surface[0] * 0.299 + surface[1] * 0.587 + surface[2] * 0.114 < 128 : false;
  return { dark, palette: inkPalette(dark), rule: rgb('--line-strong', '#ccd1df'), surface: rgb('--surface', '#ffffff') };
}

export function useInkTheme(): InkTheme {
  const [theme, setTheme] = useState(readTheme);
  useEffect(() => {
    const update = () => setTheme((t) => {
      const next = readTheme();
      return next.dark === t.dark && next.rule === t.rule && next.surface === t.surface ? t : next;
    });
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    mq?.addEventListener?.('change', update);
    return () => {
      obs.disconnect();
      mq?.removeEventListener?.('change', update);
    };
  }, []);
  return theme;
}
