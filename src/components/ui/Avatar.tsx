import { cn } from '@/lib/cn.ts';

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

function luminance(r: number, g: number, b: number): number {
  const f = (v: number) => ((v /= 255) <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/** Darkens a hex colour just enough for white initials to reach 4.5:1 contrast. */
export function readableBackground(hex: string): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  let [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  for (let i = 0; i < 20 && 1.05 / (luminance(r, g, b) + 0.05) < 4.5; i++) [r, g, b] = [r * 0.94, g * 0.94, b * 0.94];
  return `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(b)})`;
}

export function Avatar({ name, color, size = 32, className }: { name: string; color?: string; size?: number; className?: string }) {
  return (
    <span
      className={cn('inline-flex shrink-0 select-none items-center justify-center rounded-full font-semibold text-white', className)}
      style={{ width: size, height: size, fontSize: Math.max(10, size * 0.38), background: readableBackground(color ?? '#6a43e3') }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
