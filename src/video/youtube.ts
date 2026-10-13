/** YouTube links for Gradileo's explainer videos. */

/** A YouTube video id: 11 letters, digits, "-" or "_". */
export const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

/**
 * The video id in a YouTube link (watch, youtu.be, shorts, embed or live links), or a bare id;
 * null when there is none.
 */
export function youtubeId(input: string): string | null {
  const s = input.trim();
  if (YOUTUBE_ID.test(s)) return s;
  let u: URL;
  try {
    u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^(www|m|music)\./, '');
  let id: string | null = null;
  if (host === 'youtu.be') id = u.pathname.slice(1).split('/')[0];
  else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    id = u.searchParams.get('v') ?? u.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/)?.[1] ?? null;
  }
  return id && YOUTUBE_ID.test(id) ? id : null;
}
