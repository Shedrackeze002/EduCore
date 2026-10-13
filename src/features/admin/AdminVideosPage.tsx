/**
 * Explainer videos: every video built from the scripts in the repository, and its YouTube link.
 * After uploading a video to EduCore's channel, an administrator pastes the link here; the
 * lesson then shows the video, with its questions.
 */
import { useMemo, useState } from 'react';
import { CheckCircle2, Clapperboard, ExternalLink, Link2, Trash2 } from 'lucide-react';
import { courseOfLesson, lessonById } from '@engine/curriculum/index.ts';
import { VIDEOS, type ExplainerVideo } from '@/content/videos.ts';
import { useAdminSetVideoLink, useVideoLinks } from '@/data/hooks.ts';
import { Badge, Button, Card, EmptyState, Input, PageHeader, Skeleton, useToast } from '@/components/ui/index.ts';
import { youtubeId } from '@/video/youtube.ts';

const minutes = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

export default function AdminVideosPage() {
  const links = useVideoLinks();
  const groups = useMemo(() => {
    const out: Array<{ course: string; videos: ExplainerVideo[] }> = [];
    for (const v of VIDEOS) {
      const course = courseOfLesson(v.lessonId)?.shortTitle ?? 'Other';
      const g = out.find((x) => x.course === course) ?? out[out.push({ course, videos: [] }) - 1];
      g.videos.push(v);
    }
    return out;
  }, []);
  const linked = VIDEOS.filter((v) => links.data?.[v.id]).length;
  return (
    <div>
      <PageHeader
        eyebrow="Admin console"
        title="Explainer videos"
        subtitle="Videos built from the scripts in the repository. Upload each one to EduCore's YouTube channel (with its captions and thumbnail), then paste its link here so its lesson shows it."
      />
      {links.isLoading ? (
        <Skeleton className="h-48" />
      ) : !VIDEOS.length ? (
        <EmptyState icon={<Clapperboard className="h-6 w-6" />} title="No videos yet">
          Build videos with video/build.ts; they appear here once their scripts are merged.
        </EmptyState>
      ) : (
        <div className="space-y-6">
          <p className="text-sm text-ink-3">
            {linked} of {VIDEOS.length} {VIDEOS.length === 1 ? 'video is' : 'videos are'} on YouTube.
          </p>
          {groups.map((g) => (
            <section key={g.course} className="space-y-3">
              <h2 className="text-lg font-semibold">{g.course}</h2>
              <ul className="space-y-3" aria-label={`${g.course} videos`}>
                {g.videos.map((v) => (
                  <VideoRow key={v.id} video={v} youtube={links.data?.[v.id] ?? null} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function VideoRow({ video, youtube }: { video: ExplainerVideo; youtube: string | null }) {
  const set = useAdminSetVideoLink();
  const toast = useToast();
  const [link, setLink] = useState('');
  const [problem, setProblem] = useState<string | null>(null);
  const lesson = lessonById(video.lessonId);

  const save = async (id: string | null) => {
    try {
      await set.mutateAsync({ videoId: video.id, youtubeId: id });
      setLink('');
      toast({ kind: 'success', title: id ? 'Video linked. Its lesson now shows it.' : 'Link removed' });
    } catch (e) {
      toast({ kind: 'error', title: 'Could not save the link', body: (e as Error).message });
    }
  };

  return (
    <li>
      <Card className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start">
        {youtube ? (
          <a href={`https://www.youtube.com/watch?v=${youtube}`} target="_blank" rel="noreferrer" className="shrink-0">
            <img src={`https://i.ytimg.com/vi/${youtube}/mqdefault.jpg`} alt={`YouTube thumbnail of ${video.title}`} className="h-[90px] w-40 rounded-lg bg-surface-2 object-cover" loading="lazy" />
          </a>
        ) : (
          <div className="flex h-[90px] w-40 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-ink-3">
            <Clapperboard className="h-7 w-7" />
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold">{video.title}</span>
            {youtube ? <Badge tone="good">On YouTube</Badge> : <Badge tone="neutral">Not linked</Badge>}
          </div>
          <div className="text-sm text-ink-3">
            {video.id} · Lesson {lesson?.number} {lesson?.title} · {minutes(video.duration)} · {video.cues.length} {video.cues.length === 1 ? 'question' : 'questions'}
          </div>
          {youtube ? (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-good" />
              <a className="inline-flex items-center gap-1 text-brand-700 hover:underline" href={`https://www.youtube.com/watch?v=${youtube}`} target="_blank" rel="noreferrer">
                youtube.com/watch?v={youtube} <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Button size="sm" variant="ghost" icon={<Trash2 className="h-4 w-4" />} loading={set.isPending} onClick={() => window.confirm('Remove this link? The lesson stops showing the video.') && save(null)}>
                Remove
              </Button>
            </div>
          ) : (
            <form
              className="flex flex-wrap items-end gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const id = youtubeId(link);
                setProblem(id ? null : 'Paste the link of the video on YouTube, like https://youtu.be/…');
                if (id) void save(id);
              }}
            >
              <Input label="YouTube link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://youtu.be/…" className="w-80 max-w-full" error={problem ?? undefined} />
              <Button type="submit" icon={<Link2 className="h-4 w-4" />} loading={set.isPending} disabled={!link.trim()}>
                Link video
              </Button>
            </form>
          )}
        </div>
      </Card>
    </li>
  );
}
