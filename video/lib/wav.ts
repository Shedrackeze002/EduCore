/** Mono 16-bit PCM WAV files: enough for narration clips and the narration track. */
import { readFileSync, writeFileSync } from 'node:fs';

export interface Pcm {
  rate: number;
  samples: Float32Array;
}

export function writeWav(file: string, { rate, samples }: Pcm) {
  const buf = Buffer.alloc(44 + samples.length * 2);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + samples.length * 2, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(rate, 24);
  buf.writeUInt32LE(rate * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(samples.length * 2, 40);
  for (let i = 0; i < samples.length; i++) buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, samples[i])) * 32767), 44 + i * 2);
  writeFileSync(file, buf);
}

export function readWav(file: string): Pcm {
  const buf = readFileSync(file);
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.readUInt16LE(20) !== 1 || buf.readUInt16LE(22) !== 1 || buf.readUInt16LE(34) !== 16) throw new Error(`${file} is not a mono 16-bit WAV.`);
  const rate = buf.readUInt32LE(24);
  // Find the data chunk (it follows "fmt " in our files, but other chunks may come first).
  let off = 12;
  while (buf.toString('ascii', off, off + 4) !== 'data') off += 8 + buf.readUInt32LE(off + 4);
  const n = buf.readUInt32LE(off + 4) / 2;
  const samples = new Float32Array(n);
  for (let i = 0; i < n; i++) samples[i] = buf.readInt16LE(off + 8 + i * 2) / 32768;
  return { rate, samples };
}

/** Trims silence at both ends, keeping a short margin so words are not clipped. */
export function trimSilence({ rate, samples }: Pcm, threshold = 0.01, margin = 0.04): Pcm {
  let a = 0;
  let b = samples.length - 1;
  while (a < b && Math.abs(samples[a]) < threshold) a++;
  while (b > a && Math.abs(samples[b]) < threshold) b--;
  const m = Math.round(rate * margin);
  return { rate, samples: samples.slice(Math.max(0, a - m), Math.min(samples.length, b + m + 1)) };
}

export const seconds = (p: Pcm) => p.samples.length / p.rate;
