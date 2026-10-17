import { courseOfLesson, lessonById, unitById } from '../../engine/curriculum/index.ts';
import type { CourseMeta } from '../../engine/types.ts';
import { BRAND } from './script.ts';
import { clock } from './timeline.ts';

export const SITE = 'https://gradileo.com/';

/**
 * What a course covers, in words used around the world: Gradileo is for learners in every
 * English-speaking country, so the YouTube text leads with the topic and the level, and the Alberta
 * course is named only as one curriculum the video follows.
 */
const KIND: Record<string, string> = {
  'math-10-3': 'workplace mathematics',
  'math-20-3': 'workplace mathematics',
  'math-30-3': 'workplace mathematics',
  'math-10-4': 'everyday mathematics',
  'math-20-4': 'everyday mathematics',
  'math-20-1': 'pre-calculus',
  'math-30-1': 'pre-calculus',
  'math-20-2': 'mathematics',
  'math-30-2': 'mathematics',
  'math-31': 'calculus',
};

/** "Grade 12 / Year 13 · pre-calculus": the grade, the year it is in the UK, and the kind of course. */
export function levelOf(course: CourseMeta): string {
  return `Grade ${course.grade} / Year ${course.grade + 1} · ${KIND[course.id] ?? 'mathematics'}`;
}

interface Video {
  title: string;
  summary: string;
  lessonId: string;
}

/** The title, description and tags to paste into YouTube, with the chapters as listed there. */
export function youtubeText(x: Video, chapters: Array<{ title: string; t: number }> | null): string {
  const lesson = lessonById(x.lessonId);
  const course = courseOfLesson(x.lessonId);
  const unit = lesson ? unitById(lesson.unitId) : undefined;
  const branded = `${x.title} | ${BRAND}`;
  const title = branded.length <= 100 ? branded : x.title;
  const level = course ? levelOf(course) : undefined;
  return [
    `TITLE (${title.length}/100 characters)`,
    title,
    '',
    'DESCRIPTION',
    x.summary,
    '',
    ...(unit ? [`Topic: ${unit.title}`] : []),
    ...(level ? [`Level: ${level}`] : []),
    ...(chapters ? ['', 'Chapters', ...chapters.map((c) => `${clock(c.t)} ${c.title}`)] : []),
    '',
    `Practise this topic with instant feedback on ${BRAND}: ${SITE}`,
    ...(course && lesson ? ['', 'Curriculum', `Alberta ${course.shortTitle}, lesson ${lesson.number}: ${lesson.title}`] : []),
    '',
    'TAGS',
    [
      BRAND,
      'math',
      'maths',
      unit?.title,
      lesson?.title,
      course && KIND[course.id],
      course && `Grade ${course.grade} math`,
      course && `Year ${course.grade + 1} maths`,
      course && (course.grade >= 9 ? 'high school math' : course.grade >= 6 ? 'middle school math' : 'elementary math'),
      'explainer',
      course?.shortTitle,
    ]
      // YouTube splits tags at commas, so a comma inside one ("Decimals, Percents and Money") goes.
      .map((t) => t && t.replace(/,/g, ''))
      .filter((t, i, all): t is string => Boolean(t) && all.indexOf(t) === i)
      .join(', '),
    '',
    'Upload the captions (captions.srt, English) and the thumbnail (thumbnail.png) with the video.',
  ].join('\n');
}
