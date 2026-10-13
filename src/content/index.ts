/** Lesson content registry. Lessons are lazy-loaded Markdown files, one per lesson id. */
import { parseLesson, type LessonContent } from './lessonParser.ts';

const loaders = import.meta.glob('./*/lessons/*.md', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;

const byId = new Map<string, () => Promise<string>>();
for (const [path, load] of Object.entries(loaders)) {
  const id = path.split('/').pop()!.replace(/\.md$/, '');
  byId.set(id, load);
}

const cache = new Map<string, LessonContent>();
const sources = new Map<string, string>();

/** A lesson's Markdown as it is in the file (teacher edits are applied on top; see edits.ts). */
export async function loadLessonSource(lessonId: string): Promise<string | null> {
  if (sources.has(lessonId)) return sources.get(lessonId)!;
  const load = byId.get(lessonId);
  if (!load) return null;
  const raw = await load();
  sources.set(lessonId, raw);
  return raw;
}

export function hasLessonContent(lessonId: string): boolean {
  return byId.has(lessonId);
}

export async function loadLesson(lessonId: string): Promise<LessonContent | null> {
  if (cache.has(lessonId)) return cache.get(lessonId)!;
  const load = byId.get(lessonId);
  if (!load) return null;
  const content = parseLesson(await load());
  cache.set(lessonId, content);
  return content;
}
