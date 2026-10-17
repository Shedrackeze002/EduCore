// Usage: npx tsx video/tools/youtube-update.ts [--dry-run] [video id ...]
//
// Brings the title, description and tags of Gradileo's videos on YouTube up to date with the
// YouTube text (src/video/youtube-text.ts), without uploading anything again. It lists the
// channel's uploads and finds each one's script by its title (the part before " | "); when two
// scripts share a title, the course named in the description decides. Only videos whose text
// differs are updated; with video ids, only those. --dry-run lists what would change.
//
// It signs in with the environment variables YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET and
// YOUTUBE_REFRESH_TOKEN (an OAuth client with the youtube.force-ssl scope, signed in as the
// channel; see video/README.md, "YouTube API"). Their values are never printed. An update costs 50
// of the 10,000 units the API allows a day, so about 200 videos can be renamed a day.
import { scriptOf, youtubeFieldsFor } from '../lib/catalog.ts';

const API = 'https://www.googleapis.com/youtube/v3';

let token: { value: string; until: number } | undefined;

async function accessToken(): Promise<string> {
  if (token && Date.now() < token.until) return token.value;
  const env = ['YOUTUBE_CLIENT_ID', 'YOUTUBE_CLIENT_SECRET', 'YOUTUBE_REFRESH_TOKEN'];
  const missing = env.filter((k) => !process.env[k]);
  if (missing.length) throw new Error(`Set ${missing.join(', ')} (see video/README.md, "YouTube API")`);
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.YOUTUBE_CLIENT_ID!,
      client_secret: process.env.YOUTUBE_CLIENT_SECRET!,
      refresh_token: process.env.YOUTUBE_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  });
  const body = (await res.json()) as { access_token?: string; expires_in?: number; error?: string; error_description?: string };
  if (!res.ok || !body.access_token) {
    throw new Error(`Google refused the YouTube sign-in (${res.status} ${body.error ?? ''}: ${body.error_description ?? ''})`);
  }
  token = { value: body.access_token, until: Date.now() + ((body.expires_in ?? 3600) - 300) * 1000 };
  return token.value;
}

/** A YouTube API call, retried on server errors. */
async function youtube<T>(url: string, init: RequestInit = {}): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    const headers = new Headers(init.headers);
    headers.set('Authorization', `Bearer ${await accessToken()}`);
    const res = await fetch(url, { ...init, headers });
    if (res.ok) return (await res.json()) as T;
    if (attempt < 4 && res.status >= 500) {
      await new Promise((r) => setTimeout(r, 2000 * 2 ** attempt));
      continue;
    }
    throw new Error(`YouTube ${init.method ?? 'GET'} ${url.split('?')[0]} failed: ${res.status} ${await res.text()}`);
  }
}

interface Snippet {
  title: string;
  description: string;
  tags?: string[];
  categoryId: string;
  defaultLanguage?: string;
  defaultAudioLanguage?: string;
}

/** Every video the channel has uploaded, with its snippet. */
async function uploads(): Promise<Array<{ id: string; snippet: Snippet }>> {
  const channels = await youtube<{ items: Array<{ contentDetails: { relatedPlaylists: { uploads: string } } }> }>(
    `${API}/channels?part=contentDetails&mine=true`,
  );
  const playlist = channels.items[0]?.contentDetails.relatedPlaylists.uploads;
  if (!playlist) throw new Error('This sign-in has no YouTube channel');
  const ids: string[] = [];
  let page = '';
  do {
    const list = await youtube<{ items: Array<{ contentDetails: { videoId: string } }>; nextPageToken?: string }>(
      `${API}/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlist}${page ? `&pageToken=${page}` : ''}`,
    );
    ids.push(...list.items.map((i) => i.contentDetails.videoId));
    page = list.nextPageToken ?? '';
  } while (page);
  const videos: Array<{ id: string; snippet: Snippet }> = [];
  for (let i = 0; i < ids.length; i += 50) {
    const list = await youtube<{ items: Array<{ id: string; snippet: Snippet }> }>(`${API}/videos?part=snippet&id=${ids.slice(i, i + 50).join(',')}`);
    videos.push(...list.items);
  }
  return videos;
}

const same = (a: string[] = [], b: string[] = []) => a.length === b.length && a.every((t, i) => t === b[i]);

// ---------------------------------------------------------------- main

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const only = new Set(args.filter((a) => a !== '--dry-run'));
let failed = 0;
let updated = 0;
for (const { id: youtubeId, snippet } of await uploads()) {
  const id = scriptOf(snippet.title, snippet.description);
  if (!id) {
    console.log(`${youtubeId}: no script matches "${snippet.title}"; left as it is`);
    continue;
  }
  if (only.size && !only.has(id)) continue;
  try {
    const want = await youtubeFieldsFor(id);
    const norm = (s: string) => s.replace(/\r\n/g, '\n').trim();
    if (snippet.title === want.title && norm(snippet.description) === norm(want.description) && same(snippet.tags, want.tags)) {
      console.log(`${id} (${youtubeId}): unchanged`);
      continue;
    }
    if (dryRun) {
      console.log(`${id} (${youtubeId}): would rename "${snippet.title}" to "${want.title}"`);
      continue;
    }
    const { categoryId, defaultLanguage, defaultAudioLanguage } = snippet;
    await youtube(`${API}/videos?part=snippet`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: youtubeId, snippet: { ...want, categoryId, defaultLanguage, defaultAudioLanguage } }),
    });
    updated++;
    console.log(`${id} (${youtubeId}): renamed "${want.title}"`);
  } catch (e) {
    console.error(`${id} (${youtubeId}): ${(e as Error).message}`);
    failed++;
  }
}
console.log(`${updated} updated${failed ? `, ${failed} failed` : ''}`);
if (failed) process.exit(1);
