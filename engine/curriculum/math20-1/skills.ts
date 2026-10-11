import type { SkillDef } from '../../types.ts';
import { SEQUENCE_SKILLS } from './gen/sequences.ts';
import { TRIG_SKILLS } from './gen/trig.ts';
import { QUAD_FUNCTION_SKILLS } from './gen/quadfunctions.ts';
import { QUAD_EQUATION_SKILLS } from './gen/quadequations.ts';
import { RADICAL_SKILLS } from './gen/radicals.ts';
import { RATIONAL_SKILLS } from './gen/rational.ts';
import { ABS_RECIPROCAL_SKILLS } from './gen/absreciprocal.ts';
import { SYSTEM_SKILLS } from './gen/systems.ts';
import { INEQUALITY_SKILLS } from './gen/inequalities.ts';

export const MATH20_1_SKILLS: SkillDef[] = [
  ...SEQUENCE_SKILLS,
  ...TRIG_SKILLS,
  ...QUAD_FUNCTION_SKILLS,
  ...QUAD_EQUATION_SKILLS,
  ...RADICAL_SKILLS,
  ...RATIONAL_SKILLS,
  ...ABS_RECIPROCAL_SKILLS,
  ...SYSTEM_SKILLS,
  ...INEQUALITY_SKILLS,
];
