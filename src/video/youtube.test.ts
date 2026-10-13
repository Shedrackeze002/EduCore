import { describe, expect, it } from 'vitest';
import { youtubeId } from './youtube.ts';

describe('youtubeId', () => {
  it('reads the id from every kind of YouTube link', () => {
    const id = 'dQw4w9WgXcQ';
    for (const link of [
      id,
      `https://www.youtube.com/watch?v=${id}`,
      `https://youtube.com/watch?v=${id}&t=42s`,
      `https://m.youtube.com/watch?v=${id}`,
      `youtube.com/watch?v=${id}`,
      `https://youtu.be/${id}?si=abc`,
      `https://www.youtube.com/shorts/${id}`,
      `https://www.youtube.com/embed/${id}`,
      `https://www.youtube-nocookie.com/embed/${id}`,
      `https://www.youtube.com/live/${id}`,
      `  ${id}  `,
    ]) {
      expect(youtubeId(link), link).toBe(id);
    }
  });

  it('rejects anything else', () => {
    for (const link of ['', 'hello', 'https://vimeo.com/123456', 'https://www.youtube.com/watch?v=short', 'https://evil.example/watch?v=dQw4w9WgXcQ', 'https://www.youtube.com/channel/UC123']) {
      expect(youtubeId(link), link).toBeNull();
    }
  });
});
