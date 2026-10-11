/**
 * Fails when the production config names a Supabase backend but the built site does not
 * contain it, so it would silently run as a demo for every visitor. The intended backend
 * is read from the .env files themselves, because an empty VITE_* variable in the build
 * environment is exactly what blanks it. Run after `npm run build`.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function fromFiles(key) {
  for (const file of ['.env.production.local', '.env.local', '.env.production', '.env']) {
    if (!existsSync(file)) continue;
    const line = readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .find((l) => l.trim().startsWith(`${key}=`));
    const value = line?.slice(line.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '');
    if (value) return value;
  }
  return '';
}

const url = fromFiles('VITE_SUPABASE_URL');
if (!url) {
  console.log('No Supabase backend configured: this build is the demo only.');
  process.exit(0);
}
const dir = 'dist/assets';
const found = readdirSync(dir).some((f) => f.endsWith('.js') && readFileSync(join(dir, f), 'utf8').includes(url));
if (!found) {
  console.error(`The site was configured for ${url} but the build does not contain it, so it would run as a demo only.`);
  console.error('Check that VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are not set to empty values in the build environment.');
  process.exit(1);
}
console.log(`Built against ${url}.`);
