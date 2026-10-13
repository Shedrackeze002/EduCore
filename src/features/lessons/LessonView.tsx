import { useEffect, useState, type ReactNode } from 'react';
import { BookOpen, Clock, ExternalLink, FileText, PencilLine, Target, Video } from 'lucide-react';
import { courseOfLesson, lessonById, skillInfo, unitById } from '@engine/curriculum/index.ts';
import { loadLessonSource } from '@/content/index.ts';
import { applyEdits, type EditedLesson } from '@/content/edits.ts';
import { useApprovedLessonEdits } from '@/data/hooks.ts';
import type { Board, Resource } from '@/data/types.ts';
import { ClassBoards } from '@/features/whiteboard/BoardView.tsx';
import { Markdown } from '@/components/math/Markdown.tsx';
import { PageSpinner } from '@/components/ui/index.ts';
import { BlockView, VideoEmbed } from './LessonBlocks.tsx';
import type { SectionSource } from './SuggestEdit.tsx';
import { cn } from '@/lib/cn.ts';

/**
 * A lesson's content with approved teacher edits applied (they are part of the lesson for every
 * class). `sources` gives each section's current Markdown, for suggesting a further edit.
 */
export function useLessonContent(lessonId: string | undefined) {
  const [lesson, setLesson] = useState<EditedLesson | null>(null);
  const [error, setError] = useState<string | null>(null);
  const edits = useApprovedLessonEdits(lessonId);
  // Without approved edits (or if they cannot be loaded) the lesson is the file as it is.
  const ready = !edits.isPending || edits.isError;
  const key = (edits.data ?? []).map((e) => `${e.id}:${e.baseHash}`).join(',');
  useEffect(() => {
    if (!lessonId || !ready) return;
    let alive = true;
    loadLessonSource(lessonId)
      .then((raw) => {
        if (!alive) return;
        if (!raw) return setError('This lesson has no content yet.');
        setLesson(applyEdits(raw, (edits.data ?? []).map((e) => ({ baseHash: e.baseHash, markdown: e.markdown })), (id) => !!skillInfo(id)));
      })
      .catch((e) => alive && setError((e as Error).message));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, ready, key]);
  useEffect(() => setLesson(null), [lessonId]);
  return { content: lesson?.content ?? null, sources: lesson?.sources ?? [], error };
}

export function LessonHeader({ lessonId, actions }: { lessonId: string; actions?: ReactNode }) {
  const meta = lessonById(lessonId);
  const unit = meta ? unitById(meta.unitId) : undefined;
  const course = courseOfLesson(lessonId);
  if (!meta) return null;
  return (
    <div className="card overflow-hidden">
      <div className="bg-gradient-to-br from-brand-50 to-surface px-5 pb-5 pt-6 sm:px-7">
        <div className="text-xs font-semibold uppercase tracking-wider text-brand-700">
          Unit {unit?.number} · {unit?.title} · Lesson {meta.number}
        </div>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-2xl font-semibold sm:text-[30px]">{meta.title}</h1>
          {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink-3">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" /> {meta.minutes} min
          </span>
          <span>·</span>
          {meta.outcomes.map((o) => (
            <span key={o} className="rounded-md bg-surface px-1.5 py-0.5 text-xs font-semibold text-ink-2 ring-1 ring-line" title={course?.outcomes.find((x) => x.code === o)?.text}>
              {o}
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-5 border-t border-line px-5 py-5 sm:px-7 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Target className="h-4 w-4 text-brand" /> By the end of this lesson you can
          </div>
          <ul className="space-y-1.5 text-[15px] text-ink-2">
            {meta.objectives.map((o) => (
              <li key={o} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {o}
              </li>
            ))}
          </ul>
        </div>
        {meta.vocabulary && meta.vocabulary.length > 0 && (
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <BookOpen className="h-4 w-4 text-brand" /> Key vocabulary
            </div>
            <div className="flex flex-wrap gap-1.5">
              {meta.vocabulary.map((v) => (
                <span key={v} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink-2">
                  {v}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function TeacherResources({ resources }: { resources: Resource[] }) {
  if (!resources.length) return null;
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">From your teacher</h2>
      {resources.map((r) =>
        r.kind === 'video' && r.url ? (
          <VideoEmbed key={r.id} url={r.url} title={r.title} />
        ) : r.kind === 'link' && r.url ? (
          <a key={r.id} href={r.url} target="_blank" rel="noreferrer" className="card flex items-center gap-3 p-4 hover:bg-surface-2">
            <ExternalLink className="h-5 w-5 text-brand" />
            <div className="min-w-0">
              <div className="font-medium">{r.title}</div>
              <div className="truncate text-xs text-ink-3">{r.url}</div>
            </div>
          </a>
        ) : (
          <div key={r.id} className="card p-4">
            <div className="mb-1 flex items-center gap-2 font-medium">
              {r.kind === 'video' ? <Video className="h-4 w-4 text-brand" /> : <FileText className="h-4 w-4 text-brand" />}
              {r.title}
            </div>
            {r.body && <Markdown md={r.body} sanitize />}
          </div>
        ),
      )}
    </section>
  );
}

export function LessonView({
  lessonId,
  resources = [],
  boards = [],
  footer,
  headerActions,
  onSuggest,
}: {
  lessonId: string;
  resources?: Resource[];
  boards?: Board[];
  footer?: ReactNode;
  headerActions?: ReactNode;
  /** Teachers: show "Suggest an edit" on each section. */
  onSuggest?: (source: SectionSource) => void;
}) {
  const { content, sources, error } = useLessonContent(lessonId);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!content) return;
    const els = content.sections.map((_, i) => document.getElementById(`sec-${i}`)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (vis) setActive(Number(vis.target.id.replace('sec-', '')));
      },
      { rootMargin: '-80px 0px -60% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [content]);

  if (error) return <div className="card p-6 text-ink-3">{error}</div>;
  if (!content) return <PageSpinner label="Loading lesson…" />;
  return (
    <div className="space-y-6">
      <LessonHeader lessonId={lessonId} actions={headerActions} />
      <div className="grid gap-8 xl:grid-cols-[1fr_240px]">
        <article className="min-w-0 space-y-8">
          {content.intro.length > 0 && (
            <div className="space-y-4 text-[17px]">
              {content.intro.map((b, i) => (
                <BlockView key={i} block={b} />
              ))}
            </div>
          )}
          {content.sections.map((s, i) => (
            <section key={i} id={`sec-${i}`} className="scroll-mt-24 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold sm:text-2xl">{s.title}</h2>
                {onSuggest && sources[i] && (
                  <>
                    {sources[i].edited && (
                      <span className="rounded-full bg-good-soft px-2 py-0.5 text-xs font-semibold text-good-ink" title="This section includes an approved teacher edit.">
                        Edited
                      </span>
                    )}
                    <button type="button" onClick={() => onSuggest(sources[i])} className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1 text-sm font-medium text-ink-2 hover:bg-surface-2 hover:text-ink" aria-label={`Suggest an edit to ${s.title}`}>
                      <PencilLine className="h-4 w-4" /> Suggest an edit
                    </button>
                  </>
                )}
              </div>
              {s.blocks.map((b, j) => (
                <BlockView key={j} block={b} />
              ))}
            </section>
          ))}
          <TeacherResources resources={resources} />
          <ClassBoards boards={boards} />
          {footer}
        </article>
        <aside className="hidden xl:block">
          <div className="sticky top-24">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-3">In this lesson</div>
            <nav className="space-y-0.5 border-l border-line">
              {content.sections.map((s, i) => (
                <a key={i} href={`#sec-${i}`} className={cn('-ml-px block border-l-2 py-1.5 pl-3 text-sm', active === i ? 'border-brand font-medium text-brand-800' : 'border-transparent text-ink-3 hover:text-ink')}>
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
