import { describe, expect, it } from 'vitest';
import { parseLesson } from '@/content/lessonParser.ts';
import { buildSlides, lastStep, presentedSlides, revealAt, stepFor } from './slides.ts';

const LESSON = `A hook sentence.

## First idea

Some explanation.

:::definition Term
A meaning.
:::

:::example Adding
What is 2 + 3?
@step Start at 2.
@step Count on 3.
@answer 5
:::

After the example.

:::check m10c-1-1-a 1
:::

## Second idea

Only text here.

Another paragraph.
`;

describe('slides', () => {
  const content = parseLesson(LESSON);
  const slides = buildSlides(content, 'Adding numbers', [{ id: 'r1', url: 'https://youtu.be/abc', title: 'A video' }]);

  it('splits sections at worked examples and checks, and adds teacher videos at the end', () => {
    expect(slides.map((s) => s.title)).toEqual(['Adding numbers', 'First idea', 'First idea (cont.)', 'First idea (cont.)', 'First idea (cont.)', 'Second idea', 'A video']);
    expect(slides.map((s) => s.kind)).toEqual(['title', 'content', 'content', 'content', 'content', 'content', 'video']);
    expect(slides[2].blocks[0].block.type).toBe('example');
    expect(slides[6].blocks[0]).toEqual({ key: 'res-r1', block: { type: 'video', url: 'https://youtu.be/abc' } });
  });

  it('keys blocks by content, so keys survive edits elsewhere in the lesson', () => {
    const keys = slides.flatMap((s) => s.blocks.map((b) => b.key));
    expect(new Set(keys).size).toBe(keys.length);
    const edited = buildSlides(parseLesson(LESSON.replace('Only text here.', 'Changed text.')), 'Adding numbers');
    expect(edited[1].blocks.map((b) => b.key)).toEqual(slides[1].blocks.map((b) => b.key));
    expect(edited[5].blocks[0].key).not.toBe(slides[5].blocks[0].key);
  });

  it('gives repeated identical blocks different keys', () => {
    const twice = buildSlides(parseLesson('## A\n\n:::check s-1 1\n:::\n\n## B\n\n:::check s-1 1\n:::\n'), 'T');
    expect(twice[1].blocks[0].key).not.toBe(twice[2].blocks[0].key);
  });

  it('hides blocks and drops slides left empty, but never the title slide', () => {
    const hidden = new Set([...slides[1].blocks.map((b) => b.key), ...slides[0].blocks.map((b) => b.key)]);
    const shown = presentedSlides(slides, hidden);
    expect(shown).toHaveLength(slides.length - 1);
    expect(shown[0].kind).toBe('title');
    expect(shown[0].blocks).toHaveLength(0);
    expect(presentedSlides(slides, new Set())).toBe(slides);
  });

  it('reveals one block per step, and a worked example one step at a time', () => {
    const title = slides[0];
    expect(lastStep(title)).toBe(1);
    expect(revealAt(title, 0)[0].visible).toBe(false);
    expect(revealAt(title, 1)[0].visible).toBe(true);

    const first = slides[1];
    expect(first.blocks).toHaveLength(2);
    expect(lastStep(first)).toBe(1);
    expect(revealAt(first, 0).map((r) => r.visible)).toEqual([true, false]);

    const ex = slides[2];
    expect(lastStep(ex)).toBe(3);
    expect(revealAt(ex, 0)[0]).toEqual({ visible: true, shown: 0 });
    expect(revealAt(ex, 2)[0]).toEqual({ visible: true, shown: 2 });
    expect(revealAt(ex, 3)[0]).toEqual({ visible: true, shown: 3 });
    expect(stepFor(ex, 0, 2)).toBe(2);

    // A slide with text then an example: the example's steps come after it appears.
    const mixed = buildSlides(parseLesson('## M\n\nText.\n\n:::example E\nQ\n@step a\n@step b\n:::\n'), 'T')[1];
    expect(mixed.blocks).toHaveLength(1);
    const together = { ...mixed, blocks: [{ key: 't', block: { type: 'md' as const, md: 'Text.' } }, ...buildSlides(parseLesson('## M\n\n:::example E\nQ\n@step a\n@step b\n:::\n'), 'T')[1].blocks] };
    expect(lastStep(together)).toBe(3);
    expect(revealAt(together, 1)).toEqual([{ visible: true, shown: 0 }, { visible: true, shown: 0 }]);
    expect(revealAt(together, 3)[1]).toEqual({ visible: true, shown: 2 });
    expect(stepFor(together, 1, 1)).toBe(2);
    expect(stepFor(together, 1, 0)).toBe(1);
  });
});
