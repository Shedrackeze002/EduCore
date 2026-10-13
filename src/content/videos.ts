/**
 * Explainer videos, from the manifest the video build writes (src/content/videos.json): each
 * video's lesson, length, chapters and the "Your turn" questions it pauses for. Whether a video is
 * on YouTube yet comes from the links administrators record (useVideoLinks).
 */
import type { Cue } from '@/video/timeline.ts';
import manifest from './videos.json';

export interface ExplainerVideo {
  id: string;
  lessonId: string;
  title: string;
  /** Seconds. */
  duration: number;
  chapters: Array<{ title: string; t: number }>;
  cues: Cue[];
}

export const VIDEOS: ExplainerVideo[] = Object.entries(manifest as Record<string, Omit<ExplainerVideo, 'id'>>)
  .map(([id, v]) => ({ id, lessonId: v.lessonId, title: v.title, duration: v.duration, chapters: v.chapters, cues: v.cues }))
  .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

/** A lesson's videos in order (part 1, part 2…). */
export const videosForLesson = (lessonId: string) => VIDEOS.filter((v) => v.lessonId === lessonId);
