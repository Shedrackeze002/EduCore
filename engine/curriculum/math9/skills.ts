import type { SkillDef } from '../../types.ts';
import { SQRTSURFACE_SKILLS } from './gen/sqrtsurface.ts';
import { POWERS_SKILLS } from './gen/powers.ts';
import { RATIONAL_SKILLS } from './gen/rational.ts';
import { LINEAR_SKILLS } from './gen/linear.ts';
import { POLYNOMIALS_SKILLS } from './gen/polynomials.ts';
import { EQUATIONS_SKILLS } from './gen/equations.ts';
import { SIMILARITY_SKILLS } from './gen/similarity.ts';
import { CIRCLES_SKILLS } from './gen/circles.ts';
import { SYMMETRY_SKILLS } from './gen/symmetry.ts';
import { DATASOCIETY_SKILLS } from './gen/datasociety.ts';

export const MATH9_SKILLS: SkillDef[] = [
  ...SQRTSURFACE_SKILLS,
  ...POWERS_SKILLS,
  ...RATIONAL_SKILLS,
  ...LINEAR_SKILLS,
  ...POLYNOMIALS_SKILLS,
  ...EQUATIONS_SKILLS,
  ...SIMILARITY_SKILLS,
  ...CIRCLES_SKILLS,
  ...SYMMETRY_SKILLS,
  ...DATASOCIETY_SKILLS,
];
