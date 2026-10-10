import type { SkillDef } from '../../types.ts';
import { MEASUREMENT_SKILLS } from './gen/measurement.ts';
import { TRIG_SKILLS } from './gen/trig.ts';
import { NUMBER_SKILLS } from './gen/number.ts';
import { POLYNOMIAL_SKILLS } from './gen/polynomials.ts';
import { RELATION_SKILLS } from './gen/relations.ts';
import { LINEAR_SKILLS } from './gen/linear.ts';
import { EQUATION_SKILLS } from './gen/equations.ts';
import { SYSTEM_SKILLS } from './gen/systems.ts';

export const MATH10C_SKILLS: SkillDef[] = [
  ...MEASUREMENT_SKILLS,
  ...TRIG_SKILLS,
  ...NUMBER_SKILLS,
  ...POLYNOMIAL_SKILLS,
  ...RELATION_SKILLS,
  ...LINEAR_SKILLS,
  ...EQUATION_SKILLS,
  ...SYSTEM_SKILLS,
];
