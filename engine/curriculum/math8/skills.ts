import type { SkillDef } from '../../types.ts';
import { PYTHAGORAS_SKILLS } from './gen/pythagoras.ts';
import { PERCENTS_SKILLS } from './gen/percents.ts';
import { RATIOS_SKILLS } from './gen/ratios.ts';
import { FRACTIONS_SKILLS } from './gen/fractions.ts';
import { INTEGERS_SKILLS } from './gen/integers.ts';
import { LINEAR_SKILLS } from './gen/linear.ts';
import { EQUATIONS_SKILLS } from './gen/equations.ts';
import { SOLIDS_SKILLS } from './gen/solids.ts';
import { CONGRUENCE_SKILLS } from './gen/congruence.ts';
import { DATAPROB_SKILLS } from './gen/dataprob.ts';

export const MATH8_SKILLS: SkillDef[] = [
  ...PYTHAGORAS_SKILLS,
  ...PERCENTS_SKILLS,
  ...RATIOS_SKILLS,
  ...FRACTIONS_SKILLS,
  ...INTEGERS_SKILLS,
  ...LINEAR_SKILLS,
  ...EQUATIONS_SKILLS,
  ...SOLIDS_SKILLS,
  ...CONGRUENCE_SKILLS,
  ...DATAPROB_SKILLS,
];
