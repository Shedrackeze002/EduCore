/** Read-only views of saved whiteboards: a thumbnail and a full-size viewer with pages. */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, PenLine } from 'lucide-react';
import { BOARD_H, BOARD_W, drawBackground, drawStrokes, type BoardPage } from '@/lib/ink.ts';
import type { Board } from '@/data/types.ts';
import { Modal } from '@/components/ui/index.ts';
import { cn } from '@/lib/cn.ts';
import { useInkTheme } from './useInkTheme.ts';

export function BoardPageCanvas({ page, className, label }: { page: BoardPage; className?: string; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [w, setW] = useState(0);
  const theme = useInkTheme();
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx || w === 0) return;
    const dpr = window.devicePixelRatio || 1;
    const h = (w * BOARD_H) / BOARD_W;
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
    const s = (w / BOARD_W) * dpr;
    ctx.setTransform(s, 0, 0, s, 0, 0);
    ctx.clearRect(0, 0, BOARD_W, BOARD_H);
    drawBackground(ctx, page.background, BOARD_W, BOARD_H, theme.rule);
    drawStrokes(ctx, page.strokes, theme.palette);
  }, [page, w, theme]);
  return <canvas ref={ref} role="img" aria-label={label} className={cn('block aspect-video w-full rounded-xl bg-surface ring-1 ring-line', className)} />;
}

export function BoardViewer({ board, onClose }: { board: Board | null; onClose: () => void }) {
  const [ix, setIx] = useState(0);
  useEffect(() => setIx(0), [board?.id]);
  if (!board) return null;
  const page = board.pages[Math.min(ix, board.pages.length - 1)];
  return (
    <Modal open onClose={onClose} title={board.title} size="xl">
      {page ? <BoardPageCanvas page={page} label={`${board.title}, page ${ix + 1}`} /> : <p className="text-sm text-ink-3">This board is empty.</p>}
      {board.pages.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          <button type="button" className="rounded-lg p-1.5 text-ink-2 hover:bg-surface-2 disabled:opacity-35" disabled={ix === 0} onClick={() => setIx(ix - 1)} aria-label="Previous page">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm tabular-nums text-ink-2">
            Page {ix + 1} of {board.pages.length}
          </span>
          <button type="button" className="rounded-lg p-1.5 text-ink-2 hover:bg-surface-2 disabled:opacity-35" disabled={ix >= board.pages.length - 1} onClick={() => setIx(ix + 1)} aria-label="Next page">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </Modal>
  );
}

/** Shared boards on a student's lesson page. */
export function ClassBoards({ boards }: { boards: Board[] }) {
  const [open, setOpen] = useState<Board | null>(null);
  if (!boards.length) return null;
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <PenLine className="h-5 w-5 text-brand" /> Whiteboards from class
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {boards.map((b) => (
          <button key={b.id} type="button" onClick={() => setOpen(b)} className="card p-2 text-left transition hover:shadow-pop">
            {b.pages[0] && <BoardPageCanvas page={b.pages[0]} label={`${b.title}, first page`} />}
            <div className="px-1.5 pb-1 pt-2">
              <div className="truncate text-sm font-medium">{b.title}</div>
              <div className="text-xs text-ink-3">
                {b.pages.length} page{b.pages.length === 1 ? '' : 's'}
              </div>
            </div>
          </button>
        ))}
      </div>
      <BoardViewer board={open} onClose={() => setOpen(null)} />
    </section>
  );
}
