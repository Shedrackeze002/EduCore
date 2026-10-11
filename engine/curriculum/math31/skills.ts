import type { SkillDef } from '../../types.ts';
import { REVIEW_SKILLS } from './gen/review.ts';
import { LIMITS_SKILLS } from './gen/limits.ts';
import { DERIVATIVE_SKILLS } from './gen/derivative.ts';
import { RULES_SKILLS } from './gen/rules.ts';
import { TRANSCENDENTAL_SKILLS } from './gen/transcendental.ts';
import { APPLICATIONS_SKILLS } from './gen/applications.ts';
import { OPTIMIZATION_SKILLS } from './gen/optimization.ts';
import { INTEGRALS_SKILLS } from './gen/integrals.ts';
import { INTEGRALAPPS_SKILLS } from './gen/integralapps.ts';

export const MATH31_SKILLS: SkillDef[] = [
  ...REVIEW_SKILLS,
  ...LIMITS_SKILLS,
  ...DERIVATIVE_SKILLS,
  ...RULES_SKILLS,
  ...TRANSCENDENTAL_SKILLS,
  ...APPLICATIONS_SKILLS,
  ...OPTIMIZATION_SKILLS,
  ...INTEGRALS_SKILLS,
  ...INTEGRALAPPS_SKILLS,
];
