import type { SkillDef } from '../../types.ts';
import { PRICING_SKILLS } from './gen/pricing.ts';
import { INCOME_SKILLS } from './gen/income.ts';
import { UNIT_SYSTEM_SKILLS } from './gen/units.ts';
import { LINEAR_SKILLS } from './gen/linear.ts';
import { AREA_SKILLS } from './gen/area.ts';
import { ANGLE_SKILLS } from './gen/angles.ts';
import { PYTHAGORAS_SKILLS } from './gen/pythagoras.ts';
import { TRIG_SKILLS } from './gen/trig.ts';

export const MATH10_3_SKILLS: SkillDef[] = [
  ...PRICING_SKILLS,
  ...INCOME_SKILLS,
  ...UNIT_SYSTEM_SKILLS,
  ...LINEAR_SKILLS,
  ...AREA_SKILLS,
  ...ANGLE_SKILLS,
  ...PYTHAGORAS_SKILLS,
  ...TRIG_SKILLS,
];
