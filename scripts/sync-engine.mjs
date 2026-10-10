// Copies the shared learning engine into the Supabase Edge Functions folder so the
// server grades, tracks mastery and analyses with exactly the same code as the app.
// Run automatically by `npm run functions:deploy`; the copy is git-ignored.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'engine');
const dest = join(root, 'supabase', 'functions', '_shared', 'engine');

if (existsSync(dest)) rmSync(dest, { recursive: true });
let count = 0;
function copy(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) copy(p);
    else if (name.endsWith('.ts') && !name.endsWith('.test.ts')) {
      const out = join(dest, relative(src, p));
      mkdirSync(dirname(out), { recursive: true });
      cpSync(p, out);
      count++;
    }
  }
}
copy(src);
console.log(`Synced ${count} engine files to ${relative(root, dest)}`);
