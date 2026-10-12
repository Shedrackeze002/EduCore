import type { SkillDef } from '../../types.ts';
import { INTEGERS_SKILLS } from './gen/integers.ts';
import { OPERATIONS_SKILLS } from './gen/operations.ts';
import { PRIMES_SKILLS } from './gen/primes.ts';
import { FRACTIONS_SKILLS } from './gen/fractions.ts';
import { RATIOS_SKILLS } from './gen/ratios.ts';
import { ALGEBRA_SKILLS } from './gen/algebra.ts';
import { CONGRUENCE_SKILLS } from './gen/congruence.ts';
import { CARTESIAN_SKILLS } from './gen/cartesian.ts';
import { AREA_SKILLS } from './gen/area.ts';
import { VOLUME_SKILLS } from './gen/volume.ts';
import { FUNCTIONS_SKILLS } from './gen/functions.ts';
import { PROBABILITY_SKILLS } from './gen/probability.ts';

export const MATH6_SKILLS: SkillDef[] = [
  ...INTEGERS_SKILLS,
  ...OPERATIONS_SKILLS,
  ...PRIMES_SKILLS,
  ...FRACTIONS_SKILLS,
  ...RATIOS_SKILLS,
  ...ALGEBRA_SKILLS,
  ...CONGRUENCE_SKILLS,
  ...CARTESIAN_SKILLS,
  ...AREA_SKILLS,
  ...VOLUME_SKILLS,
  ...FUNCTIONS_SKILLS,
  ...PROBABILITY_SKILLS,
];
