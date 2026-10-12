import type { SkillDef } from '../../types.ts';
import { PLACEVALUE_SKILLS } from './gen/placevalue.ts';
import { ADDSUB_SKILLS } from './gen/addsub.ts';
import { DIVISIBILITY_SKILLS } from './gen/divisibility.ts';
import { MULTDIV_SKILLS } from './gen/multdiv.ts';
import { FRACTIONS_SKILLS } from './gen/fractions.ts';
import { RATIOS_SKILLS } from './gen/ratios.ts';
import { ALGEBRA_SKILLS } from './gen/algebra.ts';
import { SYMMETRY_SKILLS } from './gen/symmetry.ts';
import { GRIDS_SKILLS } from './gen/grids.ts';
import { AREA_SKILLS } from './gen/area.ts';
import { SEQUENCES_SKILLS } from './gen/sequences.ts';
import { DATA_SKILLS } from './gen/data.ts';

export const MATH5_SKILLS: SkillDef[] = [
  ...PLACEVALUE_SKILLS,
  ...ADDSUB_SKILLS,
  ...DIVISIBILITY_SKILLS,
  ...MULTDIV_SKILLS,
  ...FRACTIONS_SKILLS,
  ...RATIOS_SKILLS,
  ...ALGEBRA_SKILLS,
  ...SYMMETRY_SKILLS,
  ...GRIDS_SKILLS,
  ...AREA_SKILLS,
  ...SEQUENCES_SKILLS,
  ...DATA_SKILLS,
];
