/**
 * A first or last name typed to join a class by link: letters (any alphabet), with spaces,
 * hyphens, apostrophes and full stops between them. The join-class Edge Function applies the
 * same rule.
 */
export const NAME_PART = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u;
export const NAME_MAX = 40;

/** "ama" becomes "Ama"; a name typed with capitals of its own ("McDonald", "de la Cruz") stays as typed. */
export function capitalize(name: string): string {
  return name === name.toLowerCase() ? name.replace(/(^|[\s-])(\p{L})/gu, (_, sep: string, c: string) => sep + c.toUpperCase()) : name;
}

/** The name as it is kept, or an error message to show. */
export function cleanNamePart(v: string, label: string): { value: string } | { error: string } {
  const value = v.normalize('NFC').replace(/\s+/g, ' ').trim();
  if (!value) return { error: `Type your ${label}.` };
  if (value.length > NAME_MAX || !NAME_PART.test(value)) return { error: `Use letters only in your ${label}.` };
  return { value: capitalize(value) };
}

/** Two names that are the same apart from capitals and spacing. */
export const sameName = (a: string, b: string) => a.replace(/\s+/g, ' ').trim().toLowerCase() === b.replace(/\s+/g, ' ').trim().toLowerCase();

/** A name for the class's screen: "Maya Ruiz" becomes "Maya R.". */
export function screenName(fullName: string): string {
  const parts = fullName.replace(/\s+/g, ' ').trim().split(' ');
  if (parts.length < 2) return parts[0] ?? '';
  const last = parts[parts.length - 1];
  return `${parts.slice(0, -1).join(' ')} ${last[0]}.`;
}
