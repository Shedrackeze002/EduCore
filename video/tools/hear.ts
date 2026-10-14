// Usage: npx tsx video/tools/hear.ts "a line to try" "another line"
// Voices each line with the narration voice and prints what Whisper hears, to try a respelling
// before adding it to speechText (src/video/words.ts).
import path from 'node:path';
import { narrate, useCache } from '../lib/narrate.ts';
import { transcribe } from '../lib/qa.ts';

const cache = path.resolve(import.meta.dirname, '../.cache');
useCache(cache);
for (const text of process.argv.slice(2)) {
  const clip = await narrate(cache, text, { name: 'af_heart', speed: 1 });
  console.log(`${text}\n   heard: ${await transcribe(clip.pcm)}`);
}
