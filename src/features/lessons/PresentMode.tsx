/**
 * Full-screen lesson presentation for teaching.
 *
 *  - Step by step: Next reveals one block at a time, and the steps of a worked example one by one.
 *  - Draw on a slide, or open a whiteboard and come back to the same slide.
 *  - A class timer, a blank screen, and the teacher's own videos as slides.
 *  - "Choose what to show" hides blocks from the slides for this class. Lessons stay complete:
 *    students still see every part on their lesson page.
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Eye, EyeOff, ListOrdered, Maximize2, Minimize2, MonitorOff, PenLine, SquarePen, Timer, X } from 'lucide-react';
import { lessonById, unitById } from '@engine/curriculum/index.ts';
import { Button, PageSpinner } from '@/components/ui/index.ts';
import { useBoards, useLessonPrefs, useResources, useSaveBoard, useSetHiddenBlocks } from '@/data/hooks.ts';
import { inkCommit, inkDoc, inkRedo, inkUndo, type InkDoc } from '@/lib/ink.ts';
import { getItem, setItem } from '@/lib/storage.ts';
import { cn } from '@/lib/cn.ts';
import { InkSurface } from '@/features/whiteboard/InkSurface.tsx';
import { InkToolbar, useInkTools } from '@/features/whiteboard/InkToolbar.tsx';
import { Whiteboard } from '@/features/whiteboard/Whiteboard.tsx';
import { BlockView, CheckBlock, ExampleBlock, VideoEmbed } from './LessonBlocks.tsx';
import { useLessonContent } from './LessonView.tsx';
import { PresentTimer } from './PresentTimer.tsx';
import { buildSlides, lastStep, presentedSlides, revealAt, stepFor, type SlideBlock } from './slides.ts';

const STEPS_KEY = 'educore-present-steps';
/** Board units across a slide, for ink drawn on slides. */
const SLIDE_UNITS = 1000;

function HeaderButton({ label, icon, on, onClick, shortcut }: { label: string; icon: ReactNode; on?: boolean; onClick: () => void; shortcut?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      aria-label={label}
      title={shortcut ? `${label} (${shortcut})` : label}
      className={cn('inline-flex h-9 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-ink-2 hover:bg-surface-2', on && 'bg-brand-100 text-brand-800 hover:bg-brand-100')}
    >
      {icon}
      <span className="hidden xl:inline">{label}</span>
    </button>
  );
}

export default function PresentMode() {
  const { classId = '', lessonId = '' } = useParams();
  const navigate = useNavigate();
  const meta = lessonById(lessonId);
  const unit = meta ? unitById(meta.unitId) : undefined;
  const { content, error } = useLessonContent(lessonId);
  const resources = useResources(classId);
  const prefs = useLessonPrefs(classId, lessonId);
  const setHiddenBlocks = useSetHiddenBlocks(classId, lessonId);
  const boards = useBoards(classId, lessonId);
  const saveBoard = useSaveBoard(classId, lessonId);
  const tools = useInkTools();

  const videos = useMemo(
    () => (resources.data ?? []).filter((r) => r.lessonId === lessonId && r.kind === 'video' && r.url).map((r) => ({ id: r.id, url: r.url!, title: r.title })),
    [resources.data, lessonId],
  );
  const allSlides = useMemo(() => (content && meta ? buildSlides(content, meta.title, videos) : []), [content, meta, videos]);
  const hidden = useMemo(() => new Set(prefs.data?.hidden ?? []), [prefs.data]);
  const [editing, setEditing] = useState(false);
  const slides = useMemo(() => (editing ? allSlides : presentedSlides(allSlides, hidden)), [editing, allSlides, hidden]);

  const [stepsOn, setStepsOn] = useState(() => getItem(STEPS_KEY) !== 'off');
  const build = stepsOn && !editing;
  const [pos, setPos] = useState({ id: 'title', step: 0, dir: 1 });
  const lastIx = useRef(0);
  let ix = slides.findIndex((s) => s.id === pos.id);
  if (ix < 0) ix = Math.max(0, Math.min(lastIx.current, slides.length - 1));
  lastIx.current = ix;
  const slide = slides[ix];
  const maxStep = slide ? lastStep(slide) : 0;
  const step = build ? Math.min(pos.step, maxStep) : maxStep;

  const [full, setFull] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [boardOpen, setBoardOpen] = useState(false);
  const [timerOpen, setTimerOpen] = useState(false);
  const [blank, setBlank] = useState(false);
  const [notes, setNotes] = useState<Record<string, InkDoc>>({});
  const note = (slide && notes[slide.id]) || inkDoc();
  const editNote = useCallback((fn: (d: InkDoc) => InkDoc) => slide && setNotes((n) => ({ ...n, [slide.id]: fn(n[slide.id] ?? inkDoc()) })), [slide]);

  const mainRef = useRef<HTMLElement>(null);
  const blockRefs = useRef(new Map<string, HTMLDivElement>());

  const goTo = useCallback((k: number, stepAt = 0, dir = 1) => {
    const s = slides[k];
    if (s) setPos({ id: s.id, step: stepAt, dir });
  }, [slides]);
  const next = useCallback(() => {
    if (!slide) return;
    if (build && step < maxStep) setPos({ id: slide.id, step: step + 1, dir: 0 });
    else if (ix < slides.length - 1) goTo(ix + 1, 0, 1);
  }, [slide, build, step, maxStep, ix, slides.length, goTo]);
  const prev = useCallback(() => {
    if (!slide) return;
    if (build && step > 0) setPos({ id: slide.id, step: step - 1, dir: 0 });
    else if (ix > 0) goTo(ix - 1, build ? lastStep(slides[ix - 1]) : 0, -1);
  }, [slide, build, step, ix, slides, goTo]);

  const exit = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    navigate(`/t/c/${classId}/lessons/${lessonId}`);
  }, [navigate, classId, lessonId]);

  // A new slide starts at the top; a newly revealed block scrolls into view.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [slide?.id]);
  useEffect(() => {
    if (!build || pos.dir !== 0 || !slide) return;
    const reveal = revealAt(slide, step);
    const lastVisible = reveal.map((r, k) => (r.visible ? k : -1)).filter((k) => k >= 0).pop();
    const el = lastVisible === undefined ? null : blockRefs.current.get(slide.blocks[lastVisible].key);
    el?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
  }, [build, step, pos.dir, slide]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (boardOpen) return; // the whiteboard has its own keys
      const t = e.target as HTMLElement | null;
      if (t?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      if (blank) {
        e.preventDefault();
        setBlank(false);
        return;
      }
      const k = e.key;
      if (e.ctrlKey || e.metaKey) {
        if (drawing && k.toLowerCase() === 'z') {
          e.preventDefault();
          editNote(e.shiftKey ? inkRedo : inkUndo);
        }
        return;
      }
      if (e.altKey) return;
      if (k === 'ArrowRight' || k === 'PageDown' || (k === ' ' && t?.tagName !== 'BUTTON')) {
        e.preventDefault();
        next();
      } else if (k === 'ArrowLeft' || k === 'PageUp') {
        e.preventDefault();
        prev();
      } else if (k === 'Home') goTo(0, 0, -1);
      else if (k === 'End') goTo(slides.length - 1, 0, 1);
      else if (k === 'w' || k === 'W') setBoardOpen(true);
      else if (k === 'd' || k === 'D') setDrawing((d) => !d);
      else if (k === 't' || k === 'T') setTimerOpen(true);
      else if (k === 'b' || k === 'B' || k === '.') setBlank(true);
      else if (drawing && (k === 'p' || k === 'P')) tools.setMode('pen');
      else if (drawing && (k === 'h' || k === 'H')) tools.setMode('highlighter');
      else if (drawing && (k === 'e' || k === 'E')) tools.setMode('eraser');
      else if (k === 'Escape') {
        if (drawing) setDrawing(false);
        else if (editing) setEditing(false);
        else if (!document.fullscreenElement) exit();
      }
    };
    const onFs = () => setFull(!!document.fullscreenElement);
    window.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', onFs);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('fullscreenchange', onFs);
    };
  }, [boardOpen, blank, drawing, editing, next, prev, goTo, slides.length, exit, editNote, tools]);

  const setHidden = (keys: string[], hide: boolean) => {
    const nextSet = new Set(hidden);
    for (const key of keys) {
      if (hide) nextSet.add(key);
      else nextSet.delete(key);
    }
    setHiddenBlocks.mutate([...nextSet]);
  };

  if (!meta) return null;
  if (error) return <div className="p-8 text-ink-3">{error}</div>;
  if (!content || !slide) return <PageSpinner label="Preparing slides…" />;
  const reveal = build ? revealAt(slide, step) : null;
  const hiddenHere = slide.blocks.filter((b) => hidden.has(b.key)).length;
  const slideHidden = slide.kind !== 'title' && slide.blocks.length > 0 && hiddenHere === slide.blocks.length;

  const renderBlock = (sb: SlideBlock, k: number) => {
    const r = reveal?.[k];
    if (r && !r.visible) return null;
    const b = sb.block;
    const isHidden = editing && hidden.has(sb.key);
    return (
      <div
        key={sb.key}
        ref={(el) => {
          if (el) blockRefs.current.set(sb.key, el);
          else blockRefs.current.delete(sb.key);
        }}
        className={cn('relative', reveal && 'motion-safe:animate-slide-up', editing && 'rounded-2xl outline-dashed outline-2 outline-offset-4', editing && (isHidden ? 'outline-line-strong' : 'outline-transparent hover:outline-brand-200'))}
      >
        {editing && (
          <button
            type="button"
            onClick={() => setHidden([sb.key], !isHidden)}
            className={cn('absolute -top-3 right-2 z-10 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold shadow-card', isHidden ? 'border-brand-300 bg-brand text-brand-ink' : 'border-line bg-surface text-ink-2 hover:bg-surface-2')}
          >
            {isHidden ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            {isHidden ? 'Show on slides' : 'Hide'}
          </button>
        )}
        <div className={cn(isHidden && 'opacity-35')}>
          {b.type === 'example' ? (
            <ExampleBlock block={b} large presenter shown={r ? r.shown : undefined} onShownChange={r ? (n) => setPos({ id: slide.id, step: stepFor(slide, k, n), dir: 0 }) : undefined} />
          ) : b.type === 'check' ? (
            <div className="text-lg">
              <CheckBlock skillId={b.skillId} difficulty={b.difficulty} />
            </div>
          ) : b.type === 'video' ? (
            <VideoEmbed url={b.url} title={b.title} />
          ) : (
            <BlockView block={b} large />
          )}
        </div>
      </div>
    );
  };

  const showInk = drawing || note.strokes.length > 0;

  return (
    <div className="flex h-[100dvh] flex-col bg-canvas">
      <header className="flex items-center justify-between gap-3 border-b border-line bg-surface px-3 py-2 sm:px-4">
        <div className="min-w-0 truncate text-sm">
          <span className="font-semibold">Lesson {meta.number}</span>
          <span className="hidden text-ink-3 md:inline"> · Unit {unit?.number} {unit?.title}</span>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <HeaderButton
            label="Step by step"
            icon={<ListOrdered className="h-5 w-5" />}
            on={stepsOn}
            onClick={() => {
              setStepsOn(!stepsOn);
              setItem(STEPS_KEY, stepsOn ? 'off' : 'on');
            }}
          />
          <HeaderButton label="Choose what to show" icon={<EyeOff className="h-5 w-5" />} on={editing} onClick={() => (setEditing(!editing), setDrawing(false))} />
          <HeaderButton label="Draw" shortcut="D" icon={<PenLine className="h-5 w-5" />} on={drawing} onClick={() => (setDrawing(!drawing), setEditing(false))} />
          <HeaderButton label="Whiteboard" shortcut="W" icon={<SquarePen className="h-5 w-5" />} onClick={() => setBoardOpen(true)} />
          <HeaderButton label="Timer" shortcut="T" icon={<Timer className="h-5 w-5" />} on={timerOpen} onClick={() => setTimerOpen(!timerOpen)} />
          <HeaderButton label="Blank screen" shortcut="B" icon={<MonitorOff className="h-5 w-5" />} onClick={() => setBlank(true)} />
          <span className="mx-1 h-6 w-px bg-line" />
          <button type="button" className="rounded-lg p-2 text-ink-2 hover:bg-surface-2" onClick={() => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.())} aria-label="Toggle full screen">
            {full ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
          <button type="button" className="rounded-lg p-2 text-ink-2 hover:bg-surface-2" onClick={exit} aria-label="Exit presentation">
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      {editing && (
        <div className="flex flex-wrap items-center gap-3 border-b border-brand-200 bg-brand-50 px-4 py-2 text-sm text-brand-900">
          <EyeOff className="h-4 w-4 shrink-0" />
          <span className="min-w-0 flex-1">
            Hide the parts you will not teach to this class. Students still see the whole lesson on their lesson page.
            {hidden.size > 0 && <strong className="ml-1">{hidden.size} hidden.</strong>}
          </span>
          {hidden.size > 0 && (
            <Button size="xs" variant="ghost" onClick={() => setHiddenBlocks.mutate([])}>
              Show everything
            </Button>
          )}
          <Button size="xs" onClick={() => setEditing(false)}>
            Done
          </Button>
        </div>
      )}

      <main ref={mainRef} className="relative flex-1 overflow-y-auto">
        <div key={slide.id} className={cn('relative mx-auto w-full max-w-5xl px-4 py-8 sm:px-10', pos.dir > 0 && 'motion-safe:animate-slide-in-right', pos.dir < 0 && 'motion-safe:animate-slide-in-left')}>
          {slide.kind === 'title' ? (
            <div className="py-6">
              <div className="text-sm font-semibold uppercase tracking-widest text-brand-700">Lesson {meta.number}</div>
              <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-6xl">{meta.title}</h1>
              <ul className="mt-8 space-y-3 text-xl text-ink-2">
                {meta.objectives.map((o) => (
                  <li key={o} className="flex gap-3">
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-brand" />
                    {o}
                  </li>
                ))}
              </ul>
              {slide.blocks.length > 0 && <div className="mt-8 space-y-5 text-xl">{slide.blocks.map(renderBlock)}</div>}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  {slide.kind === 'video' && <div className="text-sm font-semibold uppercase tracking-widest text-brand-700">Video</div>}
                  <h2 className={cn('text-3xl font-semibold sm:text-4xl', slideHidden && 'text-ink-3 line-through decoration-2')}>{slide.title}</h2>
                </div>
                {editing && (
                  <Button size="sm" variant={slideHidden ? 'primary' : 'secondary'} icon={slideHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />} onClick={() => setHidden(slide.blocks.map((b) => b.key), !slideHidden)}>
                    {slideHidden ? 'Show this slide' : 'Hide this slide'}
                  </Button>
                )}
              </div>
              {slide.blocks.map(renderBlock)}
            </div>
          )}
          {showInk && (
            <div className="absolute inset-0 z-20">
              <InkSurface
                strokes={note.strokes}
                onCommit={(strokes) => editNote((d) => inkCommit(d, strokes))}
                mode={tools.mode}
                color={tools.color}
                size={tools.size}
                unitsWide={SLIDE_UNITS}
                penOnly={tools.penOnly}
                onPen={tools.onPen}
                active={drawing}
                label="Drawing on the slide"
              />
            </div>
          )}
        </div>
      </main>

      {drawing && (
        <div className="pointer-events-none fixed inset-x-0 bottom-[76px] z-40 flex justify-center px-3">
          <InkToolbar
            className="pointer-events-auto"
            tools={tools}
            onUndo={() => editNote(inkUndo)}
            onRedo={() => editNote(inkRedo)}
            onClear={() => editNote((d) => inkCommit(d, []))}
            canUndo={note.past.length > 0}
            canRedo={note.future.length > 0}
            canClear={note.strokes.length > 0}
          />
        </div>
      )}

      <footer className="border-t border-line bg-surface px-3 py-3 sm:px-4">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <button type="button" disabled={ix === 0 && (!build || step === 0)} onClick={prev} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 font-medium text-ink-2 hover:bg-surface-2 disabled:opacity-40">
            <ChevronLeft className="h-5 w-5" /> Back
          </button>
          <div className="flex flex-1 items-center justify-center gap-1.5 overflow-hidden">
            {slides.map((s, k) => {
              const off = editing && s.kind !== 'title' && s.blocks.length > 0 && s.blocks.every((b) => hidden.has(b.key));
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(k, 0, k >= ix ? 1 : -1)}
                  aria-label={`Slide ${k + 1}: ${s.title}`}
                  aria-current={k === ix ? 'step' : undefined}
                  className={cn('h-2 shrink-0 rounded-full transition-all', k === ix ? 'w-6 bg-brand' : off ? 'w-2 border border-line-strong bg-transparent' : 'w-2 bg-line-strong hover:bg-ink-3')}
                />
              );
            })}
          </div>
          <span className="hidden text-sm tabular-nums text-ink-3 sm:block">
            {ix + 1} / {slides.length}
            {build && maxStep > 0 && (
              <span className="ml-2 text-xs">
                · step {step + 1} of {maxStep + 1}
              </span>
            )}
          </span>
          <button type="button" disabled={ix === slides.length - 1 && step >= maxStep} onClick={next} className="inline-flex items-center gap-1 rounded-xl bg-brand px-4 py-2 font-medium text-brand-ink hover:bg-brand-700 disabled:opacity-40">
            Next <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </footer>

      <Whiteboard open={boardOpen} onClose={() => setBoardOpen(false)} tools={tools} lessonTitle={meta.title} boards={boards.data} onSave={(b) => saveBoard.mutateAsync(b)} />
      <PresentTimer open={timerOpen} onClose={() => setTimerOpen(false)} />
      {blank && <button type="button" className="fixed inset-0 z-[70] cursor-default bg-black" onClick={() => setBlank(false)} aria-label="Show the slide again" />}
    </div>
  );
}
