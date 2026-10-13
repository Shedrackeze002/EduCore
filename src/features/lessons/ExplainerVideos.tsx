/**
 * A lesson's explainer videos, played from EduCore's YouTube channel. At each "Your turn" in the
 * video the player pauses and asks the question here, then carries on when the student has
 * answered (or skipped). The questions and their times come from the video build's manifest.
 */
import { useEffect, useId, useRef, useState } from 'react';
import { ExternalLink, PlayCircle } from 'lucide-react';
import { videosForLesson, type ExplainerVideo } from '@/content/videos.ts';
import { useVideoLinks } from '@/data/hooks.ts';
import { Button } from '@/components/ui/index.ts';
import { Markdown } from '@/components/math/Markdown.tsx';
import { crossedCue, isRight } from '@/video/cues.ts';
import type { Cue } from '@/video/timeline.ts';
import { cn } from '@/lib/cn.ts';

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  getCurrentTime(): number;
  getPlayerState(): number;
  destroy(): void;
}

interface YTApi {
  Player: new (el: HTMLElement, options: { videoId: string; host?: string; width?: string; height?: string; playerVars?: Record<string, string | number> }) => YTPlayer;
  PlayerState: { PLAYING: number };
}

declare global {
  interface Window {
    YT?: YTApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let api: Promise<YTApi> | null = null;

/** Loads YouTube's IFrame Player API once. */
function loadYouTube(): Promise<YTApi> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  api ??= new Promise<YTApi>((resolve, reject) => {
    const before = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      before?.();
      resolve(window.YT!);
    };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.onerror = () => {
      api = null;
      reject(new Error('YouTube could not be loaded.'));
    };
    document.head.appendChild(script);
  });
  return api;
}

const minutes = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

export function ExplainerVideos({ lessonId }: { lessonId: string }) {
  const links = useVideoLinks();
  const videos = videosForLesson(lessonId).filter((v) => links.data?.[v.id]);
  const [part, setPart] = useState(0);
  if (!videos.length || !links.data) return null;
  const v = videos[Math.min(part, videos.length - 1)];
  return (
    <section className="card overflow-hidden" aria-label="Explainer video">
      <div className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-3">
        <PlayCircle className="h-5 w-5 shrink-0 text-brand" />
        <div className="min-w-0">
          <div className="font-semibold">{v.title}</div>
          <div className="text-sm text-ink-3">
            {minutes(v.duration)} · {v.cues.length ? `pauses for ${v.cues.length === 1 ? 'a question' : `${v.cues.length} questions`}` : 'explainer'}
          </div>
        </div>
        {videos.length > 1 && (
          <div className="ml-auto inline-flex gap-1 rounded-xl bg-surface-2 p-1" role="tablist" aria-label="Videos">
            {videos.map((x, i) => (
              <button key={x.id} type="button" role="tab" aria-selected={x.id === v.id} onClick={() => setPart(i)} className={cn('rounded-lg px-3 py-1 text-sm font-medium', x.id === v.id ? 'bg-surface text-ink shadow-card' : 'text-ink-3 hover:text-ink')}>
                Part {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      <CuePlayer key={v.id} video={v} youtubeId={links.data[v.id]} />
    </section>
  );
}

function CuePlayer({ video, youtubeId }: { video: ExplainerVideo; youtubeId: string }) {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const asked = useRef(new Set<string>());
  const card = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [ask, setAsk] = useState<Cue | null>(null);

  useEffect(() => {
    let alive = true;
    let timer = 0;
    let prev = 0;
    loadYouTube()
      .then((YT) => {
        if (!alive || !host.current) return;
        // The API swaps this element for the player's iframe.
        const el = document.createElement('div');
        host.current.appendChild(el);
        const p = new YT.Player(el, { videoId: youtubeId, host: 'https://www.youtube-nocookie.com', width: '100%', height: '100%', playerVars: { rel: 0, playsinline: 1 } });
        player.current = p;
        timer = window.setInterval(() => {
          if (typeof p.getCurrentTime !== 'function') return;
          const now = p.getCurrentTime();
          const cue = p.getPlayerState() === YT.PlayerState.PLAYING ? crossedCue(prev, now, video.cues, asked.current) : null;
          prev = now;
          if (cue) {
            asked.current.add(cue.id);
            p.pauseVideo();
            setAsk(cue);
          }
        }, 200);
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
      window.clearInterval(timer);
      player.current?.destroy();
      player.current = null;
    };
  }, [video, youtubeId]);

  useEffect(() => {
    if (ask) card.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [ask]);

  return (
    <div>
      <div className="relative aspect-video bg-black">
        <div ref={host} className="absolute inset-0 [&>iframe]:h-full [&>iframe]:w-full" data-testid="explainer-player" />
        {failed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center text-white">
            <p>The video player could not be loaded here.</p>
            <a className="inline-flex items-center gap-1.5 font-semibold underline" href={`https://www.youtube.com/watch?v=${youtubeId}`} target="_blank" rel="noreferrer">
              Watch on YouTube <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}
        {ask && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 p-4 text-center text-lg font-semibold text-white" aria-hidden>
            Your turn: answer below to carry on
          </div>
        )}
      </div>
      {ask && (
        <div ref={card}>
          <CueQuestion
            cue={ask}
            onDone={() => {
              setAsk(null);
              player.current?.playVideo();
            }}
          />
        </div>
      )}
    </div>
  );
}

function CueQuestion({ cue, onDone }: { cue: Cue; onDone: () => void }) {
  const titleId = useId();
  const [picked, setPicked] = useState<number | null>(null);
  const [typed, setTyped] = useState('');
  const [checked, setChecked] = useState(false);
  const answered = cue.choices ? picked !== null : checked;
  const right = answered && isRight(cue, cue.choices ? picked! : typed);
  const correct = typeof cue.answer === 'number' && cue.choices ? `${String.fromCharCode(65 + cue.answer)}` : String(cue.answer);
  return (
    <div className="space-y-3 border-t border-line bg-brand-50/60 p-4 sm:p-5" role="group" aria-labelledby={titleId}>
      <div id={titleId} className="text-xs font-semibold uppercase tracking-wider text-brand-700">
        Your turn
      </div>
      <Markdown md={cue.prompt} className="text-[17px]" />
      {cue.choices ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {cue.choices.map((c, i) => {
            const state = answered ? (i === cue.answer ? 'right' : i === picked ? 'wrong' : 'other') : 'open';
            return (
              <button
                key={i}
                type="button"
                disabled={answered}
                onClick={() => setPicked(i)}
                className={cn(
                  'flex items-center gap-3 rounded-xl border bg-surface px-3 py-2.5 text-left transition',
                  state === 'open' && 'border-line hover:border-brand-300 hover:bg-brand-50',
                  state === 'right' && 'border-good bg-good-soft',
                  state === 'wrong' && 'border-bad bg-bad-soft',
                  state === 'other' && 'border-line opacity-60',
                )}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-sm font-semibold">{String.fromCharCode(65 + i)}</span>
                <Markdown md={c} inline />
              </button>
            );
          })}
        </div>
      ) : (
        <form
          className="flex flex-wrap gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (typed.trim()) setChecked(true);
          }}
        >
          <input className="input max-w-xs" value={typed} disabled={checked} onChange={(e) => setTyped(e.target.value)} aria-label="Your answer" />
          {!checked && <Button type="submit">Check</Button>}
        </form>
      )}
      {answered && (
        <div className={cn('rounded-xl px-3 py-2 text-[15px]', right ? 'bg-good-soft text-good-ink' : 'bg-bad-soft text-bad-ink')} role="status">
          <span className="font-semibold">{right ? 'Right!' : `Not quite. The answer is ${correct}.`}</span>
          {cue.working && <Markdown md={cue.working} className="mt-1" />}
        </div>
      )}
      <div className="flex gap-2">
        <Button variant={answered ? 'primary' : 'ghost'} icon={<PlayCircle className="h-4 w-4" />} onClick={onDone}>
          {answered ? 'Carry on with the video' : 'Skip and carry on'}
        </Button>
      </div>
    </div>
  );
}
