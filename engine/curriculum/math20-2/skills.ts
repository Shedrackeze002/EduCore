import type { SkillDef } from '../../types.ts';
import { REASONING_SKILLS } from './gen/reasoning.ts';
import { ANGLE_SKILLS } from './gen/angles.ts';
import { TRIG_SKILLS } from './gen/trig.ts';
import { RADICAL_SKILLS } from './gen/radicals.ts';
import { STATISTICS_SKILLS } from './gen/statistics.ts';
import { QUAD_FUNCTION_SKILLS } from './gen/quadfunctions.ts';
import { QUAD_EQUATION_SKILLS } from './gen/quadequations.ts';
import { PROPORTIONAL_SKILLS } from './gen/proportional.ts';
import { RESEARCH_SKILLS } from './gen/research.ts';

export const MATH20_2_SKILLS: SkillDef[] = [
  ...REASONING_SKILLS,
  ...ANGLE_SKILLS,
  ...TRIG_SKILLS,
  ...RADICAL_SKILLS,
  ...STATISTICS_SKILLS,
  ...QUAD_FUNCTION_SKILLS,
  ...QUAD_EQUATION_SKILLS,
  ...PROPORTIONAL_SKILLS,
  ...RESEARCH_SKILLS,
];
