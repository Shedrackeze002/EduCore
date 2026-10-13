/**
 * Parser for Gradileo lesson Markdown.
 *
 * Lessons are ordinary Markdown with a few directives:
 *
 *   ## Section title              starts a section (one slide in Present mode)
 *   :::definition Term ... :::    callouts: definition | tip | mistake | note | summary
 *   :::example Title ... :::      worked example; "@step" lines start steps, "@answer" the answer
 *   :::check skill-id 2 :::        an interactive generated question (difficulty 1-3)
 *   :::figure {json} :::           a diagram (see engine Figure types)
 *   :::video URL Title :::         an embedded video
 */
import type { Difficulty, Figure } from '@engine/types.ts';

export type CalloutVariant = 'definition' | 'tip' | 'mistake' | 'note' | 'summary';

export type Block =
  | { type: 'md'; md: string }
  | { type: 'callout'; variant: CalloutVariant; title?: string; md: string }
  | { type: 'example'; title: string; problem: string; steps: string[]; answer?: string }
  | { type: 'check'; skillId: string; difficulty: Difficulty }
  | { type: 'figure'; figure: Figure }
  | { type: 'video'; url: string; title?: string };

export interface LessonSection {
  title: string;
  blocks: Block[];
}

export interface LessonContent {
  intro: Block[];
  sections: LessonSection[];
}

const CALLOUTS: CalloutVariant[] = ['definition', 'tip', 'mistake', 'note', 'summary'];

export class LessonParseError extends Error {}

export function parseLesson(source: string): LessonContent {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const intro: Block[] = [];
  const sections: LessonSection[] = [];
  let target = intro;
  let buffer: string[] = [];

  const flush = () => {
    const md = buffer.join('\n').trim();
    if (md) target.push({ type: 'md', md });
    buffer = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const heading = /^##\s+(.+)$/.exec(line);
    if (heading) {
      flush();
      const sec: LessonSection = { title: heading[1].trim(), blocks: [] };
      sections.push(sec);
      target = sec.blocks;
      continue;
    }
    const open = /^:::(\w+)\s*(.*)$/.exec(line);
    if (open && open[1]) {
      flush();
      const kind = open[1];
      const args = open[2].trim();
      const body: string[] = [];
      let j = i + 1;
      while (j < lines.length && lines[j].trim() !== ':::') body.push(lines[j++]);
      if (j >= lines.length) throw new LessonParseError(`Unclosed :::${kind} block at line ${i + 1}`);
      i = j;
      target.push(directive(kind, args, body.join('\n'), i));
      continue;
    }
    buffer.push(line);
  }
  flush();
  return { intro, sections };
}

function directive(kind: string, args: string, body: string, line: number): Block {
  if ((CALLOUTS as string[]).includes(kind)) {
    return { type: 'callout', variant: kind as CalloutVariant, title: args || undefined, md: body.trim() };
  }
  switch (kind) {
    case 'example': {
      const steps: string[] = [];
      let answer: string | undefined;
      const problem: string[] = [];
      let current: string[] | null = null;
      let inAnswer = false;
      const push = () => {
        if (current) {
          const text = current.join('\n').trim();
          if (inAnswer) answer = text;
          else steps.push(text);
        }
      };
      for (const l of body.split('\n')) {
        const step = /^@step\s+(.*)$/.exec(l);
        const ans = /^@answer\s+(.*)$/.exec(l);
        if (step || ans) {
          push();
          current = [(step ?? ans)![1]];
          inAnswer = !!ans;
          continue;
        }
        if (current) current.push(l);
        else problem.push(l);
      }
      push();
      return { type: 'example', title: args || 'Example', problem: problem.join('\n').trim(), steps, answer };
    }
    case 'check': {
      const [skillId, d] = args.split(/\s+/);
      if (!skillId) throw new LessonParseError(`:::check without a skill id near line ${line}`);
      const difficulty = Math.min(3, Math.max(1, Number(d) || 1)) as Difficulty;
      return { type: 'check', skillId, difficulty };
    }
    case 'figure': {
      try {
        return { type: 'figure', figure: JSON.parse(body) as Figure };
      } catch (e) {
        throw new LessonParseError(`Invalid figure JSON near line ${line}: ${(e as Error).message}`);
      }
    }
    case 'video': {
      const [url, ...title] = args.split(/\s+/);
      return { type: 'video', url, title: title.join(' ') || undefined };
    }
    default:
      throw new LessonParseError(`Unknown directive :::${kind} near line ${line}`);
  }
}

/** All skill ids referenced by check blocks (for validation and teacher previews). */
export function referencedSkills(content: LessonContent): string[] {
  const all = [...content.intro, ...content.sections.flatMap((s) => s.blocks)];
  return all.filter((b): b is Extract<Block, { type: 'check' }> => b.type === 'check').map((b) => b.skillId);
}
