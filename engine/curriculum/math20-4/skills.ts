import type { SkillDef } from '../../types.ts';
import { NUMBER_SKILLS } from './gen/number.ts';
import { SHOPPING_SKILLS } from './gen/shopping.ts';
import { INCOME_SKILLS } from './gen/income.ts';
import { BUDGET_SKILLS } from './gen/budget.ts';
import { FORMULA_SKILLS } from './gen/formulas.ts';
import { MEASUREMENT_SKILLS } from './gen/measurement.ts';
import { AREA_SKILLS } from './gen/area.ts';
import { MAP_SKILLS } from './gen/maps.ts';
import { DATA_SKILLS } from './gen/data.ts';

export const MATH20_4_SKILLS: SkillDef[] = [
  ...NUMBER_SKILLS,
  ...SHOPPING_SKILLS,
  ...INCOME_SKILLS,
  ...BUDGET_SKILLS,
  ...FORMULA_SKILLS,
  ...MEASUREMENT_SKILLS,
  ...AREA_SKILLS,
  ...MAP_SKILLS,
  ...DATA_SKILLS,
];
