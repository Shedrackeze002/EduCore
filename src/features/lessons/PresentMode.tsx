/** Full-screen lesson presentation for teaching: one section per slide, keyboard navigation. */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X } from 'lucide-react';
import { lessonById, unitById } from '@engine/curriculum/index.ts';
import type { Block } from '@/content/lessonParser.ts';
import { PageSpinner } from '@/components/ui/index.ts';
import { BlockView, CheckBlock, ExampleBlock } from './LessonBlocks.tsx';
import { useLessonContent } from './LessonView.tsx';
import { cn } from '@/lib/cn.ts';

interface Slide {
  title: string;
  blocks: Block[];
}

function buildSlides(intro: Block[], sections: Array<{ title: string; blocks: Block[] }>, lessonTitle: string): Slide[] {
  const slides: Slide[] = [{ title: lessonTitle, blocks: intro }];
  for (const s of sections) {
    // Split long sections so each slide stays readable: break before worked examples and checks.
    let cur: Block[] = [];
    let part = 0;
    const push = () => {
      if (cur.length) slides.push({ title: part++ ? `${s.title} (cont.)` : s.title, blocks: cur });
      cur = [];
    };
    for (const b of s.blocks) {
      if ((b.type === 'example' || b.type === 'check') && cur.length) push();
      cur.push(b);
      if (b.type === 'example' || b.type === 'check') push();
    }
    push();
  }
  return slides;
}

export default function PresentMode() {
  const { classId, lessonId } = useParams();
  const navigate = useNavigate();
  const meta = lessonById(lessonId ?? '');
  const unit = meta ? unitById(meta.unitId) : undefined;
  const { content } = useLessonContent(lessonId);
  const slides = useMemo(() => (content && meta ? buildSlides(content.intro, content.sections, meta.title) : []), [content, meta]);
  const [i, setI] = useState(0);
  const [full, setFull] = useState(false);

  const exit = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    navigate(`/t/c/${classId}/lessons/${lessonId}`);
  }, [navigate, classId, lessonId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') setI((x) => Math.min(slides.length - 1, x + 1));
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') setI((x) => Math.max(0, x - 1));
      if (e.key === 'Escape' && !document.fullscreenElement) exit();
    };
    const onFs = () => setFull(!!document.fullscreenElement);
    window.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', onFs);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('fullscreenchange', onFs);
    };
  }, [slides.length, exit]);

  if (!meta) return null;
  if (!content) return <PageSpinner label="Preparing slides…" />;
  const slide = slides[i];

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <header className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-2.5">
        <div className="min-w-0 text-sm">
          <span className="font-semibold">Lesson {meta.number}</span>
          <span className="text-ink-3"> · Unit {unit?.number} {unit?.title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" className="rounded-lg p-2 text-ink-2 hover:bg-surface-2" onClick={() => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen())} aria-label="Toggle full screen">
            {full ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
          <button type="button" className="rounded-lg p-2 text-ink-2 hover:bg-surface-2" onClick={exit} aria-label="Exit presentation">
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>
      <main className="flex flex-1 items-start justify-center overflow-y-auto px-4 py-8 sm:px-10">
        <div key={i} className="w-full max-w-5xl animate-fade-in">
          {i === 0 ? (
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
              {slide.blocks.length > 0 && (
                <div className="mt-8 space-y-4 text-xl">
                  {slide.blocks.map((b, k) => (
                    <BlockView key={k} block={b} large />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold sm:text-4xl">{slide.title}</h2>
              {slide.blocks.map((b, k) =>
                b.type === 'example' ? (
                  <ExampleBlock key={k} block={b} large presenter />
                ) : b.type === 'check' ? (
                  <div key={k} className="text-lg">
                    <CheckBlock skillId={b.skillId} difficulty={b.difficulty} />
                  </div>
                ) : (
                  <BlockView key={k} block={b} large />
                ),
              )}
            </div>
          )}
        </div>
      </main>
      <footer className="border-t border-line bg-surface px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center gap-4">
          <button type="button" disabled={i === 0} onClick={() => setI((x) => x - 1)} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 font-medium text-ink-2 hover:bg-surface-2 disabled:opacity-40">
            <ChevronLeft className="h-5 w-5" /> Back
          </button>
          <div className="flex flex-1 items-center justify-center gap-1.5 overflow-hidden">
            {slides.map((_, k) => (
              <button key={k} type="button" onClick={() => setI(k)} aria-label={`Slide ${k + 1}`} className={cn('h-2 rounded-full transition-all', k === i ? 'w-6 bg-brand' : 'w-2 bg-line-strong hover:bg-ink-3')} />
            ))}
          </div>
          <span className="hidden text-sm text-ink-3 sm:block">
            {i + 1} / {slides.length}
          </span>
          <button type="button" disabled={i === slides.length - 1} onClick={() => setI((x) => x + 1)} className="inline-flex items-center gap-1 rounded-xl bg-brand px-4 py-2 font-medium text-brand-ink hover:bg-brand-700 disabled:opacity-40">
            Next <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
