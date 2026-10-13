/**
 * A countdown timer for class activities. It floats above the slides and the whiteboard,
 * chimes when time is up, then counts the time over so the teacher can see it.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2, Minus, Pause, Play, Plus, RotateCcw, Timer, X } from 'lucide-react';
import { cn } from '@/lib/cn.ts';

const PRESETS = [1, 2, 3, 5, 10, 15];

export function formatClock(ms: number): string {
  const over = ms < 0;
  const total = over ? Math.floor(-ms / 1000) : Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${over ? '+' : ''}${m}:${String(s).padStart(2, '0')}`;
}

function chime(ctx: AudioContext | null) {
  if (!ctx) return;
  try {
    const t0 = ctx.currentTime;
    for (let k = 0; k < 3; k++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.0001, t0 + k * 0.35);
      gain.gain.exponentialRampToValueAtTime(0.25, t0 + k * 0.35 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + k * 0.35 + 0.3);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0 + k * 0.35);
      osc.stop(t0 + k * 0.35 + 0.32);
    }
  } catch {
    /* sound is optional */
  }
}

export function PresentTimer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [minutes, setMinutes] = useState(5);
  const [duration, setDuration] = useState(0);
  const [endAt, setEndAt] = useState<number | null>(null);
  const [pausedLeft, setPausedLeft] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [large, setLarge] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  const chimed = useRef(false);

  const running = endAt !== null;
  const active = running || pausedLeft !== null;
  const left = endAt !== null ? endAt - now : (pausedLeft ?? 0);
  const done = active && left <= 0;

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (running && left <= 0 && !chimed.current) {
      chimed.current = true;
      chime(audio.current);
    }
  }, [running, left]);

  const start = useCallback((mins: number) => {
    // Browsers allow sound only after a click, so the audio context is made here.
    try {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!audio.current && Ctx) audio.current = new Ctx();
      void audio.current?.resume();
    } catch {
      audio.current = null;
    }
    const ms = mins * 60_000;
    chimed.current = false;
    setDuration(ms);
    setPausedLeft(null);
    setNow(Date.now());
    setEndAt(Date.now() + ms);
  }, []);

  const pause = () => {
    if (endAt === null) return;
    setPausedLeft(endAt - Date.now());
    setEndAt(null);
  };
  const resume = () => {
    if (pausedLeft === null) return;
    setNow(Date.now());
    setEndAt(Date.now() + pausedLeft);
    setPausedLeft(null);
  };
  const addMinute = () => {
    chimed.current = left + 60_000 <= 0;
    setDuration((d) => d + 60_000);
    if (running) setEndAt((e) => (e === null ? e : e + 60_000));
    else setPausedLeft((p) => (p ?? 0) + 60_000);
  };
  const reset = () => {
    setEndAt(null);
    setPausedLeft(null);
    setLarge(false);
  };
  const close = () => {
    reset();
    onClose();
  };

  useEffect(() => () => void audio.current?.close().catch(() => undefined), []);

  if (!open && !active) return null;
  const progress = duration > 0 ? Math.min(1, Math.max(0, left / duration)) : 0;
  const btn = 'flex h-9 w-9 items-center justify-center rounded-lg text-ink-2 hover:bg-surface-2';

  return (
    <div className={cn('fixed right-3 top-16 z-[55] rounded-2xl border bg-surface p-3 shadow-pop', done ? 'border-bad/50' : 'border-line', large ? 'w-[min(92vw,420px)]' : 'w-64')} role="timer" aria-label="Class timer">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-sm font-semibold">
          <Timer className="h-4 w-4 text-brand" /> {done ? 'Time’s up' : 'Timer'}
        </div>
        <div className="flex items-center">
          {active && (
            <button type="button" className={btn} onClick={() => setLarge(!large)} aria-label={large ? 'Smaller timer' : 'Larger timer'}>
              {large ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          )}
          <button type="button" className={btn} onClick={close} aria-label="Close the timer">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      {active ? (
        <>
          <div className={cn('mt-1 text-center font-semibold tabular-nums tracking-tight', large ? 'text-8xl' : 'text-5xl', done ? 'animate-pulse text-bad' : 'text-ink')} aria-live={done ? 'assertive' : 'off'}>
            {formatClock(left)}
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-3">
            <div className={cn('h-full rounded-full transition-[width] duration-300', done ? 'bg-bad' : 'bg-brand')} style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="mt-3 flex items-center justify-center gap-1">
            {running ? (
              <button type="button" className={btn} onClick={pause} aria-label="Pause">
                <Pause className="h-5 w-5" />
              </button>
            ) : (
              <button type="button" className={btn} onClick={resume} aria-label="Resume">
                <Play className="h-5 w-5" />
              </button>
            )}
            <button type="button" className="h-9 rounded-lg px-3 text-sm font-medium text-ink-2 hover:bg-surface-2" onClick={addMinute}>
              +1 min
            </button>
            <button type="button" className={btn} onClick={reset} aria-label="Reset the timer">
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {PRESETS.map((m) => (
              <button key={m} type="button" onClick={() => start(m)} className="h-10 rounded-xl bg-surface-2 text-sm font-semibold hover:bg-brand-50 hover:text-brand-800">
                {m} min
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-line p-1">
            <button type="button" className={btn} onClick={() => setMinutes(Math.max(1, minutes - 1))} aria-label="One minute less">
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-sm font-semibold tabular-nums">{minutes} min</span>
            <button type="button" className={btn} onClick={() => setMinutes(Math.min(90, minutes + 1))} aria-label="One minute more">
              <Plus className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => start(minutes)} className="h-9 rounded-lg bg-brand px-3 text-sm font-semibold text-brand-ink hover:bg-brand-700">
              Start
            </button>
          </div>
        </>
      )}
    </div>
  );
}
