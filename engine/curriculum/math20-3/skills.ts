import type { SkillDef } from '../../types.ts';
import { SLOPE_SKILLS } from './gen/slope.ts';
import { SURFACE_AREA_SKILLS } from './gen/surfacearea.ts';
import { VOLUME_SKILLS } from './gen/volume.ts';
import { TRIANGLE_SKILLS } from './gen/triangles.ts';
import { SCALE_SKILLS } from './gen/scale.ts';
import { BUDGET_SKILLS } from './gen/budgets.ts';
import { INTEREST_SKILLS } from './gen/interest.ts';
import { GRAPH_SKILLS } from './gen/graphs.ts';

export const MATH20_3_SKILLS: SkillDef[] = [
  ...SLOPE_SKILLS,
  ...SURFACE_AREA_SKILLS,
  ...VOLUME_SKILLS,
  ...TRIANGLE_SKILLS,
  ...SCALE_SKILLS,
  ...BUDGET_SKILLS,
  ...INTEREST_SKILLS,
  ...GRAPH_SKILLS,
];
