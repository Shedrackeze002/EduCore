import type { SkillDef } from '../../types.ts';
import { TRANSFORMATIONS_SKILLS } from './gen/transformations.ts';
import { RADICALFNS_SKILLS } from './gen/radicalfns.ts';
import { POLYNOMIALS_SKILLS } from './gen/polynomials.ts';
import { UNITCIRCLE_SKILLS } from './gen/unitcircle.ts';
import { TRIGFUNCTIONS_SKILLS } from './gen/trigfunctions.ts';
import { IDENTITIES_SKILLS } from './gen/identities.ts';
import { EXPLOG_SKILLS } from './gen/explog.ts';
import { RATIONALFNS_SKILLS } from './gen/rationalfns.ts';
import { COUNTING_SKILLS } from './gen/counting.ts';

export const MATH30_1_SKILLS: SkillDef[] = [
  ...TRANSFORMATIONS_SKILLS,
  ...RADICALFNS_SKILLS,
  ...POLYNOMIALS_SKILLS,
  ...UNITCIRCLE_SKILLS,
  ...TRIGFUNCTIONS_SKILLS,
  ...IDENTITIES_SKILLS,
  ...EXPLOG_SKILLS,
  ...RATIONALFNS_SKILLS,
  ...COUNTING_SKILLS,
];
