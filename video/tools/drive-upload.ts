// Usage: npx tsx video/tools/drive-upload.ts [--dry-run] <video id | unit id | course id> ...
//
// Uploads rendered videos from video/out/<id>/ to the owner's Google Drive, into
//   Gradileo videos/<course>/Unit <n> – <title>/<NN>-<id>/
// with the MP4, thumbnail, captions and YouTube text, the same layout as the upload packs.
// NN is the video's place in its unit, in course order, so it never changes with what is
// uploaded. A unit id (m104-u1) or course id (math-10-4) stands for every video in it that has
// been rendered. Files already in Drive with the same size are skipped, so a run can be repeated.
//
// It signs in with the environment variables GDRIVE_CLIENT_ID, GDRIVE_CLIENT_SECRET and
// GDRIVE_REFRESH_TOKEN (an OAuth client with the drive.file scope, which can only see the files
// and folders this tool creates). Their values are never printed.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { COURSES } from '../../engine/curriculum/index.ts';
import type { CourseMeta, UnitMeta } from '../../engine/types.ts';

const ROOT = path.resolve(import.meta.dirname, '../..');
const OUT = path.join(ROOT, 'video/out');
const CONTENT = path.join(ROOT, 'src/content');
const ROOT_FOLDER = 'Gradileo videos';
const FOLDER = 'application/vnd.google-apps.folder';
const FILES: [file: (id: string) => string, mime: string][] = [
  [(id) => `${id}.mp4`, 'video/mp4'],
  [() => 'thumbnail.png', 'image/png'],
  [() => 'captions.srt', 'application/x-subrip'],
  [() => 'youtube.txt', 'text/plain'],
];

interface Planned {
  id: string;
  course: CourseMeta;
  unit: UnitMeta;
  folder: string;
}

/** Every scripted video id, from src/content/<course>/videos/<id>.ts. */
const SCRIPTS = readdirSync(CONTENT).flatMap((dir) => {
  const videos = path.join(CONTENT, dir, 'videos');
  return existsSync(videos) ? readdirSync(videos).filter((f) => f.endsWith('.ts')).map((f) => f.slice(0, -3)) : [];
});

/** Every video id of a lesson, part 1 first (m104-1-1, m104-1-1-b, m104-1-1-c, …). */
function lessonVideos(lessonId: string): string[] {
  return SCRIPTS.filter((id) => id === lessonId || (id.startsWith(`${lessonId}-`) && /^-[b-z]$/.test(id.slice(lessonId.length))))
    .sort((a, b) => a.length - b.length || a.localeCompare(b));
}

function unitVideos(unit: UnitMeta): string[] {
  return unit.lessons.flatMap(lessonVideos);
}

const unitFolder = (unit: UnitMeta) => `Unit ${unit.number} – ${unit.title}`;

/** Where a video goes: its course, unit and numbered folder. */
function plan(id: string): Planned {
  for (const course of COURSES) {
    for (const unit of course.units) {
      const ids = unitVideos(unit);
      const i = ids.indexOf(id);
      if (i >= 0) return { id, course, unit, folder: `${String(i + 1).padStart(2, '0')}-${id}` };
    }
  }
  throw new Error(`${id}: no script for this video in src/content/*/videos/`);
}

/** Video ids for the arguments: video ids as given, units and courses as their rendered videos. */
function expand(args: string[]): string[] {
  const rendered = (id: string) => existsSync(path.join(OUT, id, `${id}.mp4`));
  const ids: string[] = [];
  for (const arg of args) {
    const course = COURSES.find((c) => c.id === arg);
    const unit = COURSES.flatMap((c) => c.units).find((u) => u.id === arg);
    if (course) ids.push(...course.units.flatMap(unitVideos).filter(rendered));
    else if (unit) ids.push(...unitVideos(unit).filter(rendered));
    else ids.push(arg);
  }
  return [...new Set(ids)];
}

// ---------------------------------------------------------------- Google Drive

let token: { value: string; until: number } | undefined;

async function accessToken(): Promise<string> {
  if (token && Date.now() < token.until) return token.value;
  const env = ['GDRIVE_CLIENT_ID', 'GDRIVE_CLIENT_SECRET', 'GDRIVE_REFRESH_TOKEN'];
  const missing = env.filter((k) => !process.env[k]);
  if (missing.length) throw new Error(`Set ${missing.join(', ')} (see video/README.md, "Google Drive")`);
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.GDRIVE_CLIENT_ID!,
      client_secret: process.env.GDRIVE_CLIENT_SECRET!,
      refresh_token: process.env.GDRIVE_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  });
  const body = (await res.json()) as { access_token?: string; expires_in?: number; error?: string; error_description?: string };
  if (!res.ok || !body.access_token) {
    throw new Error(`Google refused the Drive sign-in (${res.status} ${body.error ?? ''}: ${body.error_description ?? ''})`);
  }
  token = { value: body.access_token, until: Date.now() + ((body.expires_in ?? 3600) - 300) * 1000 };
  return token.value;
}

/** A Drive API call, retried on rate limits and server errors. */
async function drive(url: string, init: RequestInit = {}): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    const headers = new Headers(init.headers);
    headers.set('Authorization', `Bearer ${await accessToken()}`);
    const res = await fetch(url, { ...init, headers });
    if (res.ok) return res;
    if (attempt < 4 && (res.status === 429 || res.status >= 500)) {
      await new Promise((r) => setTimeout(r, 2000 * 2 ** attempt));
      continue;
    }
    throw new Error(`Drive ${init.method ?? 'GET'} ${url.split('?')[0]} failed: ${res.status} ${await res.text()}`);
  }
}

const quote = (s: string) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

async function find(name: string, parent: string, folder: boolean) {
  const q = [`name = ${quote(name)}`, `${quote(parent)} in parents`, 'trashed = false', `mimeType ${folder ? '=' : '!='} '${FOLDER}'`];
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q.join(' and '))}&fields=files(id,size)&spaces=drive`;
  const { files } = (await (await drive(url)).json()) as { files: { id: string; size?: string }[] };
  return files[0];
}

const folders = new Map<string, string>();

async function ensureFolder(name: string, parent: string): Promise<string> {
  const key = `${parent}/${name}`;
  const known = folders.get(key);
  if (known) return known;
  let id = (await find(name, parent, true))?.id;
  if (!id) {
    const res = await drive('https://www.googleapis.com/drive/v3/files?fields=id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, mimeType: FOLDER, parents: [parent] }),
    });
    id = ((await res.json()) as { id: string }).id;
  }
  folders.set(key, id);
  return id;
}

/** Uploads one file into a folder; skips it when Drive already has it at the same size. */
async function upload(file: string, name: string, mime: string, parent: string): Promise<'uploaded' | 'replaced' | 'unchanged'> {
  const size = statSync(file).size;
  const existing = await find(name, parent, false);
  if (existing && Number(existing.size) === size) return 'unchanged';
  const start = existing
    ? await drive(`https://www.googleapis.com/upload/drive/v3/files/${existing.id}?uploadType=resumable`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'X-Upload-Content-Type': mime, 'X-Upload-Content-Length': String(size) },
        body: '{}',
      })
    : await drive('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Upload-Content-Type': mime, 'X-Upload-Content-Length': String(size) },
        body: JSON.stringify({ name, parents: [parent] }),
      });
  const session = start.headers.get('location');
  if (!session) throw new Error(`Drive gave no upload address for ${name}`);
  await drive(session, { method: 'PUT', headers: { 'Content-Type': mime }, body: readFileSync(file) });
  return existing ? 'replaced' : 'uploaded';
}

// ---------------------------------------------------------------- main

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const targets = args.filter((a) => a !== '--dry-run');
if (!targets.length) {
  console.error('Usage: npx tsx video/tools/drive-upload.ts [--dry-run] <video id | unit id | course id> ...');
  process.exit(1);
}
const ids = expand(targets);
if (!ids.length) {
  console.error(`Nothing rendered for ${targets.join(' ')} in video/out/`);
  process.exit(1);
}

let failed = 0;
const planned: Planned[] = [];
for (const id of ids) {
  try {
    planned.push(plan(id));
  } catch (e) {
    console.error((e as Error).message);
    failed++;
  }
}
const unitLinks = new Map<string, string>();
for (const p of planned) {
  const where = `${ROOT_FOLDER}/${p.course.shortTitle}/${unitFolder(p.unit)}/${p.folder}`;
  const missing = FILES.map(([f]) => f(p.id)).filter((f) => !existsSync(path.join(OUT, p.id, f)));
  if (missing.length) {
    console.error(`${p.id}: not rendered (missing ${missing.join(', ')}); skipped`);
    failed++;
    continue;
  }
  if (dryRun) {
    console.log(`${p.id} -> ${where}/`);
    continue;
  }
  try {
    const root = await ensureFolder(ROOT_FOLDER, 'root');
    const course = await ensureFolder(p.course.shortTitle, root);
    const unit = await ensureFolder(unitFolder(p.unit), course);
    const video = await ensureFolder(p.folder, unit);
    unitLinks.set(`${p.course.shortTitle}/${unitFolder(p.unit)}`, `https://drive.google.com/drive/folders/${unit}`);
    const results = [];
    for (const [f, mime] of FILES) results.push(`${f(p.id)} ${await upload(path.join(OUT, p.id, f(p.id)), f(p.id), mime, video)}`);
    console.log(`${p.id} -> ${where}/: ${results.join(', ')}`);
  } catch (e) {
    console.error(`${p.id}: ${(e as Error).message}`);
    failed++;
  }
}
for (const [name, link] of unitLinks) console.log(`${name}: ${link}`);
if (failed) {
  console.error(`${failed} of ${ids.length} videos not uploaded`);
  process.exit(1);
}
