import type { SkillDef } from '../../types.ts';
import { SETSLOGIC_SKILLS } from './gen/setslogic.ts';
import { COUNTING_SKILLS } from './gen/counting.ts';
import { PROBABILITY_SKILLS } from './gen/probability.ts';
import { RATIONAL_SKILLS } from './gen/rational.ts';
import { POLYNOMIAL_SKILLS } from './gen/polynomial.ts';
import { EXPLOG_SKILLS } from './gen/explog.ts';
import { SINUSOIDAL_SKILLS } from './gen/sinusoidal.ts';
import { PUZZLES_SKILLS } from './gen/puzzles.ts';

export const MATH30_2_SKILLS: SkillDef[] = [
  ...SETSLOGIC_SKILLS,
  ...COUNTING_SKILLS,
  ...PROBABILITY_SKILLS,
  ...RATIONAL_SKILLS,
  ...POLYNOMIAL_SKILLS,
  ...EXPLOG_SKILLS,
  ...SINUSOIDAL_SKILLS,
  ...PUZZLES_SKILLS,
];
