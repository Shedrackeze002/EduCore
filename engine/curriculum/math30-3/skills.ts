import type { SkillDef } from '../../types.ts';
import { MEASUREMENT_SKILLS } from './gen/measurement.ts';
import { OBLIQUE_SKILLS } from './gen/oblique.ts';
import { POLYGONS_SKILLS } from './gen/polygons.ts';
import { TRANSFORMATIONS_SKILLS } from './gen/transformations.ts';
import { LINEAR_SKILLS } from './gen/linear.ts';
import { STATISTICS_SKILLS } from './gen/statistics.ts';
import { PROBABILITY_SKILLS } from './gen/probability.ts';
import { FINANCE_SKILLS } from './gen/finance.ts';
import { PUZZLES_SKILLS } from './gen/puzzles.ts';

export const MATH30_3_SKILLS: SkillDef[] = [
  ...MEASUREMENT_SKILLS,
  ...OBLIQUE_SKILLS,
  ...POLYGONS_SKILLS,
  ...TRANSFORMATIONS_SKILLS,
  ...LINEAR_SKILLS,
  ...STATISTICS_SKILLS,
  ...PROBABILITY_SKILLS,
  ...FINANCE_SKILLS,
  ...PUZZLES_SKILLS,
];
