// Usage: npx tsx video/tools/hear.ts [--speed 0.85] "a line to try" "another line"
// Voices each line with the narration voice (at the build's speed unless --speed says otherwise)
// and prints how long it runs and what Whisper hears, to try a respelling before adding it to
// speechText (src/video/words.ts).
import path from 'node:path';
import { speechText } from '../../src/video/words.ts';
import { narrate, useCache } from '../lib/narrate.ts';
import { transcribe } from '../lib/qa.ts';

const args = process.argv.slice(2);
const at = args.indexOf('--speed');
const speed = at >= 0 ? Number(args.splice(at, 2)[1]) : 0.85;
const cache = path.resolve(import.meta.dirname, '../.cache');
useCache(cache);
for (const text of args) {
  const clip = await narrate(cache, speechText(text), { name: 'af_heart', speed });
  console.log(`${text}\n   ${clip.seconds.toFixed(1)} s, heard: ${await transcribe(clip.pcm)}`);
}
