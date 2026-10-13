/**
 * Narration with Kokoro, an open-weight text-to-speech model (Apache 2.0) that runs on the CPU, so
 * voicing costs nothing. Each line is voiced once and cached by its text, voice and speed.
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { env } from '@huggingface/transformers';
import { KokoroTTS } from 'kokoro-js';
import { readWav, seconds, trimSilence, writeWav, type Pcm } from './wav.ts';

export const MODEL = 'onnx-community/Kokoro-82M-v1.0-ONNX';

export interface Voice {
  /** A Kokoro voice, for example af_heart. */
  name: string;
  speed: number;
}

let tts: Promise<KokoroTTS> | null = null;

export function useCache(dir: string) {
  env.cacheDir = path.join(dir, 'models');
  mkdirSync(path.join(dir, 'tts'), { recursive: true });
}

export function clipFile(cache: string, text: string, voice: Voice): string {
  const hash = createHash('sha1').update(`${MODEL}|${voice.name}|${voice.speed}|${text}`).digest('hex').slice(0, 16);
  return path.join(cache, 'tts', `${hash}.wav`);
}

/** Voices a line (or reads it from the cache) and returns the clip. */
export async function narrate(cache: string, text: string, voice: Voice): Promise<{ file: string; pcm: Pcm; seconds: number }> {
  const file = clipFile(cache, text, voice);
  if (!existsSync(file)) {
    tts ??= KokoroTTS.from_pretrained(MODEL, { dtype: 'fp32', device: 'cpu' });
    const audio = await (await tts).generate(text, { voice: voice.name as 'af_heart', speed: voice.speed });
    writeWav(file, trimSilence({ rate: audio.sampling_rate, samples: audio.audio }));
  }
  const pcm = readWav(file);
  return { file, pcm, seconds: seconds(pcm) };
}
