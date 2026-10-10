export function uid(prefix = ''): string {
  const r =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  return prefix ? `${prefix}_${r}` : r;
}

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/** Human-friendly class join code without ambiguous characters (0/O, 1/I). */
export function joinCode(len = 6): string {
  let s = '';
  for (let i = 0; i < len; i++) s += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  return s;
}

/** Readable temporary password such as "maple-42-river". */
export function friendlyPassword(): string {
  const words = ['maple', 'river', 'cedar', 'prairie', 'aurora', 'summit', 'canyon', 'harbor', 'meadow', 'falcon', 'glacier', 'willow', 'timber', 'comet', 'orbit', 'delta'];
  const w = () => words[Math.floor(Math.random() * words.length)];
  return `${w()}-${10 + Math.floor(Math.random() * 90)}-${w()}`;
}
