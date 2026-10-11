/**
 * Registers every course's question generators at once. The server, tests and tools import this;
 * the browser loads each course's generators on demand instead (see ./index.ts).
 */
import { registerSkills } from './index.ts';
import { MATH10C_SKILLS } from './math10c/skills.ts';
import { MATH10_3_SKILLS } from './math10-3/skills.ts';
import { MATH10_4_SKILLS } from './math10-4/skills.ts';
import { MATH20_4_SKILLS } from './math20-4/skills.ts';

export const ALL_SKILLS = [...MATH10C_SKILLS, ...MATH10_3_SKILLS, ...MATH10_4_SKILLS, ...MATH20_4_SKILLS];

registerSkills(ALL_SKILLS);
