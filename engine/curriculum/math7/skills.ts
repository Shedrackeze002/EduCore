import type { SkillDef } from '../../types.ts';
import { NUMBERS_SKILLS } from './gen/numbers.ts';
import { DECIMALS_SKILLS } from './gen/decimals.ts';
import { FRACTIONS_SKILLS } from './gen/fractions.ts';
import { INTEGERS_SKILLS } from './gen/integers.ts';
import { PATTERNS_SKILLS } from './gen/patterns.ts';
import { EQUATIONS_SKILLS } from './gen/equations.ts';
import { CIRCLESAREA_SKILLS } from './gen/circlesarea.ts';
import { CONSTRUCTIONS_SKILLS } from './gen/constructions.ts';
import { TRANSFORMATIONS_SKILLS } from './gen/transformations.ts';
import { DATA_SKILLS } from './gen/data.ts';
import { PROBABILITY_SKILLS } from './gen/probability.ts';

export const MATH7_SKILLS: SkillDef[] = [
  ...NUMBERS_SKILLS,
  ...DECIMALS_SKILLS,
  ...FRACTIONS_SKILLS,
  ...INTEGERS_SKILLS,
  ...PATTERNS_SKILLS,
  ...EQUATIONS_SKILLS,
  ...CIRCLESAREA_SKILLS,
  ...CONSTRUCTIONS_SKILLS,
  ...TRANSFORMATIONS_SKILLS,
  ...DATA_SKILLS,
  ...PROBABILITY_SKILLS,
];
