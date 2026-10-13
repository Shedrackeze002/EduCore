/** A short burst of confetti over the screen, for a correct answer or the end of a lesson. */
import { useEffect, useRef } from 'react';

const COLORS = ['#7c5cf2', '#2a78d6', '#eb6834', '#1baf7a', '#f2b705', '#e64980'];

export function Confetti({ fire }: { fire: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext('2d');
    if (!fire || !c || !ctx) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    c.width = w * dpr;
    c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Seeded from the burst number so the burst is the same in a re-render.
    let seed = fire * 9301 + 49297;
    const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    const parts = Array.from({ length: 160 }, (_, i) => {
      const fromLeft = i % 2 === 0;
      const angle = (fromLeft ? -Math.PI / 3 : (-2 * Math.PI) / 3) + (rand() - 0.5) * 0.9;
      const speed = 9 + rand() * 9;
      return { x: fromLeft ? 0 : w, y: h * 0.75, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r: rand() * Math.PI, vr: (rand() - 0.5) * 0.3, s: 6 + rand() * 7, color: COLORS[i % COLORS.length] };
    });
    const start = performance.now();
    let frame = 0;
    const tick = (t: number) => {
      const age = t - start;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.vy += 0.32;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - age / 2400);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        ctx.restore();
      }
      if (age < 2400) frame = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, w, h);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [fire]);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80] h-full w-full" />;
}
