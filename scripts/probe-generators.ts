// Dev utility: generate items for every skill and report slow or hanging generators.
import { allSkills } from '../engine/curriculum/index.ts';
const only = process.argv[2];
for (const s of allSkills()) {
  if (only && !s.id.startsWith(only)) continue;
  const t = Date.now();
  for (const d of [1, 2, 3] as const)
    for (let seed = 1; seed <= Number(process.env.SEEDS ?? 30); seed++) {
      process.stdout.write(`\r${s.id} d=${d} seed=${seed}          `);
      s.generate(seed, d);
    }
  process.stdout.write(` ok ${Date.now() - t}ms\n`);
}
