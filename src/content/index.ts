/** Lesson content registry. Lessons are lazy-loaded Markdown files, one per lesson id. */
import { parseLesson, type LessonContent } from './lessonParser.ts';

const loaders = import.meta.glob('./*/lessons/*.md', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;

const byId = new Map<string, () => Promise<string>>();
for (const [path, load] of Object.entries(loaders)) {
  const id = path.split('/').pop()!.replace(/\.md$/, '');
  byId.set(id, load);
}

const cache = new Map<string, LessonContent>();

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
