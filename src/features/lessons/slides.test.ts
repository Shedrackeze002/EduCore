import { describe, expect, it } from 'vitest';
import { parseLesson } from '@/content/lessonParser.ts';
import { activityEmbedUrl, buildSlides, lastStep, placeExplainers, presentedSlides, revealAt, splitMarkdown, stepFor, withQuestionsSlide, type SlideExplainer } from './slides.ts';

const LESSON = `A hook sentence.

## First idea

Some explanation that sets up the idea.

- first point
- second point,
  which wraps onto a second line

:::figure
{"type":"numberLine","min":0,"max":10}
:::

:::mistake Watch the sign
A common slip.
:::

## Second idea

A short lead-in.

:::example Adding
What is 2 + 3?
@step Start at 2.
@step Count on 3.
@answer 5
:::

:::tip Check it
Count back to check.
:::

:::check m10c-1-1-a 1
:::

:::check m10c-1-1-a 2
:::

:::summary
- Point one.
- Point two.
:::
`;

const resources = [
  { id: 'v1', kind: 'video' as const, url: 'https://youtu.be/abc', title: 'A video' },
  { id: 'l1', kind: 'link' as const, url: 'https://www.desmos.com/calculator/xyz', title: 'Explore in Desmos' },
];

describe('splitMarkdown', () => {
  it('splits paragraphs and list items, keeping tables and display maths whole', () => {
    expect(splitMarkdown('One.\n\nTwo.')).toEqual(['One.', 'Two.']);
    expect(splitMarkdown('- a\n- b\n  more b\n- c')).toEqual(['- a', '- b\n  more b', '- c']);
    expect(splitMarkdown('1. one\n2. two')).toEqual(['1. one', '2. two']);
    expect(splitMarkdown('| a | b |\n|---|---|\n| 1 | 2 |')).toHaveLength(1);
    expect(splitMarkdown('$$\nx = 1\n\ny = 2\n$$\n\nAfter.')).toEqual(['$$\nx = 1\n\ny = 2\n$$', 'After.']);
  });
});

describe('slides', () => {
  const content = parseLesson(LESSON);
  const slides = buildSlides(content, 'Adding numbers', resources);

  it('builds a full deck: title, hook, teaching, worked example, one question per slide, takeaways, resources, end', () => {
    expect(slides.map((s) => s.kind)).toEqual(['title', 'hook', 'content', 'example', 'check', 'check', 'summary', 'video', 'link', 'end']);
    expect(slides[2].title).toBe('First idea');
    expect(slides[2].part).toEqual({ n: 1, of: 2, first: true, title: 'First idea' });
    // Text splits into pieces that build one at a time; the figure and the warning share the slide.
    expect(slides[2].items.map((x) => x.block.type)).toEqual(['md', 'md', 'md', 'figure', 'callout']);
    expect(slides[4].title).toBe('Your turn');
    expect(slides[6].items).toHaveLength(2);
    expect(slides[8].url).toBe('https://www.desmos.com/calculator/xyz');
  });

  it('packs a short lead-in and a following tip onto the worked example slide', () => {
    const ex = slides[3];
    expect(ex.title).toBe('Adding');
    expect(ex.items.map((x) => x.block.type)).toEqual(['md', 'example', 'callout']);
  });

  it('puts a short introduction to a question on the question\'s slide', () => {
    const deck = buildSlides(parseLesson('## A\n\nUse the top view first.\n\n:::check s-1 1\n:::\n'), 'T');
    expect(deck.map((s) => s.kind)).toEqual(['title', 'check', 'end']);
    expect(deck[1].items.map((x) => x.block.type)).toEqual(['md', 'check']);
  });

  it('keys items by their lesson block, so keys survive edits elsewhere in the lesson', () => {
    const keys = slides.flatMap((s) => s.items.map((b) => b.key));
    expect(new Set(keys).size).toBe(keys.length);
    const chunks = slides[2].items.slice(0, 3);
    expect(new Set(chunks.map((c) => c.blockKey)).size).toBe(1);
    const edited = buildSlides(parseLesson(LESSON.replace('A short lead-in.', 'A different lead-in.')), 'Adding numbers');
    expect(edited[2].items.map((b) => b.key)).toEqual(slides[2].items.map((b) => b.key));
    expect(edited[3].items[0].key).not.toBe(slides[3].items[0].key);
  });

  it('hides whole blocks and drops slides left empty, but never the title or end', () => {
    const hidden = new Set([slides[2].items[0].blockKey, slides[4].items[0].blockKey]);
    const shown = presentedSlides(slides, hidden);
    expect(shown.find((s) => s.id === slides[2].id)?.items.map((x) => x.block.type)).toEqual(['figure', 'callout']);
    expect(shown.some((s) => s.id === slides[4].id)).toBe(false);
    expect(shown[0].kind).toBe('title');
    expect(shown[shown.length - 1].kind).toBe('end');
    expect(presentedSlides(slides, new Set())).toBe(slides);
  });

  it('turns the introduction of a hidden question into a teaching slide', () => {
    const deck = buildSlides(parseLesson('## A\n\nUse the top view first.\n\n:::check s-1 1\n:::\n'), 'T');
    const shown = presentedSlides(deck, new Set([deck[1].items[1].blockKey]));
    expect(shown[1]).toMatchObject({ kind: 'content', title: 'A' });
    expect(shown[1].items.map((x) => x.block.type)).toEqual(['md']);
  });

  it('reveals one piece per step, and a worked example one step at a time', () => {
    const teach = slides[2];
    expect(lastStep(teach)).toBe(4);
    expect(revealAt(teach, 0).map((r) => r.visible)).toEqual([true, false, false, false, false]);
    expect(revealAt(teach, 4).every((r) => r.visible)).toBe(true);

    const ex = slides[3];
    // lead-in, problem, two steps, answer, tip
    expect(lastStep(ex)).toBe(5);
    expect(revealAt(ex, 1)[1]).toEqual({ visible: true, shown: 0 });
    expect(revealAt(ex, 3)[1]).toEqual({ visible: true, shown: 2 });
    expect(revealAt(ex, 4)[1]).toEqual({ visible: true, shown: 3 });
    expect(revealAt(ex, 4)[2].visible).toBe(false);
    expect(stepFor(ex, 1, 2)).toBe(3);

    for (const s of [slides[0], slides[7], slides[8], slides[9]]) {
      expect(lastStep(s)).toBe(0);
      expect(revealAt(s, 0).every((r) => r.visible)).toBe(true);
    }
  });
});

describe('the Questions slide', () => {
  const slides = buildSlides(parseLesson(LESSON), 'Adding numbers', resources);

  it('goes before the end when the class asked something, and is left out otherwise', () => {
    expect(withQuestionsSlide(slides, 0)).toBe(slides);
    const withQ = withQuestionsSlide(slides, 3);
    expect(withQ.map((s) => s.kind).slice(-2)).toEqual(['questions', 'end']);
    expect(withQ).toHaveLength(slides.length + 1);
    // It shows everything at once and cannot be hidden.
    expect(lastStep(withQ[withQ.length - 2])).toBe(0);
    expect(presentedSlides(withQ, new Set(['no-such-block'])).some((s) => s.kind === 'questions')).toBe(true);
  });
});

describe('explainer videos in present mode', () => {
  const part = (title: string, chapters: string[]) => ({ title, chapters });

  it('puts each part before the section its first chapter names', () => {
    // Math 10C lesson 2.1 and its two parts.
    const sections = ['Naming the sides', 'Similar triangles have equal ratios', 'Finding a side length', 'Finding an angle'];
    const parts = [
      part('The Tangent Ratio, Part 1: Naming the Sides', ['Introduction', 'Naming the sides', 'Similar triangles', 'The tangent ratio', 'Your turn', 'Summary']),
      part('The Tangent Ratio, Part 2: Finding Sides and Angles', ['Recap', 'Finding a side', 'Unknown on the bottom', 'Finding an angle', 'Your turn', 'Summary']),
    ];
    expect(placeExplainers(sections, parts)).toEqual([0, 2]);
  });

  it('places later parts by their subtitle, then their chapters, then an even split, in order', () => {
    // Math 20-1 lesson 1.2: part 2's chapters name no section, but its subtitle names the last one.
    const series = ['Series and partial sums', 'Reverse and add', 'Using the formulas', 'Problems with arithmetic series'];
    const parts = [
      part('Arithmetic Series, Part 1: Reverse and Add', ['Introduction', 'Partial sums', 'Reverse and add', 'The formulas', 'Your turn']),
      part('Arithmetic Series, Part 2: Finding n, and Problems', ['Introduction', 'When the last term is given', 'A pile of logs', 'How many rows?']),
    ];
    expect(placeExplainers(series, parts)).toEqual([0, 3]);
    // Nothing in common: the parts share the lesson evenly.
    expect(placeExplainers(['Alpha', 'Beta', 'Gamma', 'Delta'], [part('X, Part 1: One', ['Zeta']), part('X, Part 2: Two', ['Eta'])])).toEqual([0, 2]);
    // Part 1 opens the lesson, and a later part never goes before an earlier one: part 2's match
    // (Circles) is behind it, so it goes where the even split puts it.
    expect(placeExplainers(['Circles', 'Squares', 'Triangles'], [part('Shapes, Part 1: Squares', ['Squares']), part('Shapes, Part 2: Circles', ['Circles'])])).toEqual([0, 2]);
    // The first idea a subtitle names decides between two sections it covers.
    expect(placeExplainers(['Tally charts', 'Bar graphs', 'Circle graphs', 'Fair surveys and the best graph'], [part('Graphs, Part 1: Tallies and Bar Graphs', []), part('Graphs, Part 2: Circle Graphs and Fair Surveys', [])])).toEqual([0, 2]);
    expect(placeExplainers([], [part('A', ['B'])])).toEqual([-1]);
  });

  const explainer = (id: string, n: number, chapters: string[], youtubeId?: string): SlideExplainer => ({ id, title: `Adding, Part ${n}: Idea ${n}`, duration: 200, chapters, part: n, parts: 2, youtubeId });
  const content = parseLesson(LESSON);
  const videos = [explainer('v-1', 1, ['First idea']), explainer('v-1-b', 2, ['Second idea'], 'dQw4w9WgXcQ')];

  it('gives each part on YouTube a video slide before its section, and none to a part not uploaded yet', () => {
    const slides = buildSlides(content, 'Adding numbers', [], videos);
    expect(slides.map((s) => s.id).filter((id) => id.startsWith('xv-'))).toEqual(['xv-v-1-b']);
    const at = slides.findIndex((s) => s.id === 'xv-v-1-b');
    expect(slides[at]).toMatchObject({ kind: 'video', title: 'Idea 2', part: { n: 2, title: 'Second idea' }, explainer: { youtubeId: 'dQw4w9WgXcQ' } });
    expect(slides[at + 1].part).toMatchObject({ n: 2, first: true });
    expect(slides[at - 1].part?.n).toBe(1);
    expect(lastStep(slides[at])).toBe(0);
  });

  it('can be hidden like any other part, and a lesson without sections plays them after the hook', () => {
    const slides = buildSlides(content, 'Adding numbers', [], videos);
    expect(presentedSlides(slides, new Set(['xv-v-1-b'])).some((s) => s.kind === 'video')).toBe(false);
    const short = buildSlides(parseLesson('Just a hook.'), 'Short', [], [explainer('v-2', 1, ['Anything'], 'abcdefghijk')]);
    expect(short.map((s) => s.kind)).toEqual(['title', 'hook', 'video', 'end']);
  });
});

describe('activityEmbedUrl', () => {
  it('embeds Desmos, GeoGebra and PhET activities and nothing else', () => {
    expect(activityEmbedUrl('https://www.desmos.com/calculator/abc123')).toBe('https://www.desmos.com/calculator/abc123?embed=');
    expect(activityEmbedUrl('https://www.geogebra.org/m/xyz789')).toBe('https://www.geogebra.org/material/iframe/id/xyz789');
    expect(activityEmbedUrl('https://phet.colorado.edu/sims/html/area-builder/latest/area-builder_en.html')).toContain('phet.colorado.edu');
    expect(activityEmbedUrl('https://example.com/page')).toBeNull();
    expect(activityEmbedUrl('http://www.desmos.com/calculator/abc')).toBeNull();
    expect(activityEmbedUrl('not a url')).toBeNull();
  });
});
