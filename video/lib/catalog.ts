/**
 * Every explainer video's script and its record in src/content/videos.json, and the YouTube text
 * made from them, for the tools that work on finished videos without rendering them.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { courseOfLesson } from '../../engine/curriculum/index.ts';
import type { Explainer } from '../../src/video/script.ts';
import { youtubeChapters, type Timeline } from '../../src/video/timeline.ts';
import { youtubeFields, youtubeText, type YoutubeFields } from '../../src/video/youtube-text.ts';

const CONTENT = path.resolve(import.meta.dirname, '../../src/content');

/** Every video script, src/content/<course>/videos/<id>.ts, by id. */
export const SCRIPT_FILES = new Map(
  readdirSync(CONTENT).flatMap((dir) => {
    const videos = path.join(CONTENT, dir, 'videos');
    return existsSync(videos)
      ? readdirSync(videos)
          .filter((f) => f.endsWith('.ts'))
          .map((f): [string, string] => [f.slice(0, -3), path.join(videos, f)])
      : [];
  }),
);

/** The lesson player's record of every rendered video: its title, lesson, length and chapters. */
export const MANIFEST = JSON.parse(readFileSync(path.join(CONTENT, 'videos.json'), 'utf8')) as Record<
  string,
  { lessonId: string; title: string; duration: number; chapters: Array<{ title: string; t: number }> }
>;

async function load(id: string) {
  const file = SCRIPT_FILES.get(id);
  const entry = MANIFEST[id];
  if (!file || !entry) throw new Error(`${id}: no script or no entry in src/content/videos.json`);
  const x = (await import(file)).default as Explainer;
  return { x, chapters: youtubeChapters({ chapters: entry.chapters, duration: entry.duration } as Timeline) };
}

/** A finished video's YouTube text file, made again from its script and its chapters. */
export async function youtubeTextFor(id: string): Promise<string> {
  const { x, chapters } = await load(id);
  return youtubeText(x, chapters);
}

/** A finished video's YouTube title, description and tags. */
export async function youtubeFieldsFor(id: string): Promise<YoutubeFields> {
  const { x, chapters } = await load(id);
  return youtubeFields(x, chapters);
}

/**
 * The script of a video on YouTube, from its title (the part before " | ") and, when two scripts
 * share a title, the course named in its description ("Math 10C · Lesson 1.1" or "Alberta Math
 * 10C, lesson 1.1"). Undefined when none, or more than one, fits.
 */
export function scriptOf(title: string, description: string): string | undefined {
  const own = title.split(' | ')[0].trim();
  const found = Object.keys(MANIFEST).filter((id) => MANIFEST[id].title === own);
  if (found.length <= 1) return found[0];
  const named = found.filter((id) => {
    const course = courseOfLesson(MANIFEST[id].lessonId)?.shortTitle;
    return course && (description.includes(`${course} ·`) || description.includes(`${course},`));
  });
  return named.length === 1 ? named[0] : undefined;
}
