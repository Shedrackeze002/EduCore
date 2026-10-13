/** Fitting slides to the screen, and slide content to the slide. */
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn.ts';

/** Slides are designed at this size and scaled to fit the screen, like a PowerPoint slide. */
export const SLIDE_W = 1600;
export const SLIDE_H = 900;

/** The scale at which a SLIDE_W × SLIDE_H slide fits inside the element. */
export function useStageScale(margin = 24) {
  // A callback ref, because the stage appears only once the lesson has loaded.
  const [el, ref] = useState<HTMLElement | null>(null);
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    if (!el) return;
    const measure = () => setScale(Math.max(0.1, Math.min((el.clientWidth - margin) / SLIDE_W, (el.clientHeight - margin) / SLIDE_H)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [el, margin]);
  return [ref, scale] as const;
}

const MIN_ZOOM = 0.6;
const MAX_ZOOM = 1.3;

/**
 * Sizes its content to fill the available height: text grows on a sparse slide (easier to read at
 * the back of the room) and shrinks on a full one, the way PowerPoint fits text to its box.
 * Content that still does not fit at the smallest size scrolls. Items not yet revealed keep their
 * space, so the size does not jump as a slide builds.
 */
export function FitContent({ children, className }: { children: ReactNode; className?: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [scroll, setScroll] = useState(false);
  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    let frame = 0;
    const ratio = () => {
      const avail = o.getBoundingClientRect().height;
      const need = i.getBoundingClientRect().height;
      return avail > 0 && need > 0 ? avail / need : 1;
    };
    const fits = (z: number) => {
      i.style.zoom = String(z);
      return ratio() >= 1;
    };
    // Text reflows as it is resized, so height is not proportional to size: search for the
    // largest size that fits.
    const fit = () => {
      let z: number;
      if (fits(MAX_ZOOM)) z = MAX_ZOOM;
      else if (!fits(MIN_ZOOM)) z = MIN_ZOOM;
      else {
        let lo = MIN_ZOOM;
        let hi = MAX_ZOOM;
        for (let k = 0; k < 7; k++) {
          const mid = (lo + hi) / 2;
          if (fits(mid)) lo = mid;
          else hi = mid;
        }
        z = lo;
      }
      i.style.zoom = String(z);
      setZoom(z);
      setScroll(ratio() < 0.995);
    };
    fit();
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    });
    ro.observe(o);
    ro.observe(i);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);
  return (
    <div ref={outer} className={cn('min-h-0 flex-1', scroll ? 'overflow-y-auto' : 'overflow-hidden', className)}>
      <div ref={inner} style={{ zoom }}>
        {children}
      </div>
    </div>
  );
}
