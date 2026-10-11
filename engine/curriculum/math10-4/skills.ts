import type { SkillDef } from '../../types.ts';
import { WHOLE_SKILLS } from './gen/whole.ts';
import { FRACTION_SKILLS } from './gen/fractions.ts';
import { DECIMAL_SKILLS } from './gen/decimals.ts';
import { INTEGER_SKILLS } from './gen/integers.ts';
import { PATTERN_SKILLS } from './gen/patterns.ts';
import { MEASUREMENT_SKILLS } from './gen/measurement.ts';
import { PERIMETER_SKILLS } from './gen/perimeter.ts';
import { SHAPE_SKILLS } from './gen/shapes.ts';
import { DATA_SKILLS } from './gen/data.ts';

export const MATH10_4_SKILLS: SkillDef[] = [
  ...WHOLE_SKILLS,
  ...FRACTION_SKILLS,
  ...DECIMAL_SKILLS,
  ...INTEGER_SKILLS,
  ...PATTERN_SKILLS,
  ...MEASUREMENT_SKILLS,
  ...PERIMETER_SKILLS,
  ...SHAPE_SKILLS,
  ...DATA_SKILLS,
];
