import { describe, expect, it } from 'vitest';
import { capitalize, cleanNamePart, sameName } from './names.ts';

describe('names typed to join a class', () => {
  it('keeps letters from any alphabet, with spaces, hyphens and apostrophes', () => {
    expect(cleanNamePart('  Zoë  ', 'first name')).toEqual({ value: 'Zoë' });
    expect(cleanNamePart("O'Brien-Nwosu", 'last name')).toEqual({ value: "O'Brien-Nwosu" });
    expect(cleanNamePart('Nguyễn', 'last name')).toEqual({ value: 'Nguyễn' });
    expect(cleanNamePart('', 'first name')).toEqual({ error: 'Type your first name.' });
    expect(cleanNamePart('<b>', 'last name')).toEqual({ error: 'Use letters only in your last name.' });
    expect(cleanNamePart('a'.repeat(41), 'first name')).toEqual({ error: 'Use letters only in your first name.' });
  });

  it('capitalizes a name typed all in lower case, and keeps capitals the student chose', () => {
    expect(capitalize('ama')).toBe('Ama');
    expect(capitalize('mary-jane o')).toBe('Mary-Jane O');
    expect(capitalize('McDonald')).toBe('McDonald');
    expect(capitalize('de la Cruz')).toBe('de la Cruz');
    expect(cleanNamePart('kofi', 'first name')).toEqual({ value: 'Kofi' });
  });

  it('treats names differing only in capitals and spaces as the same', () => {
    expect(sameName('Ama  Mensah', ' ama mensah')).toBe(true);
    expect(sameName('Ama Mensah', 'Ama Mensa')).toBe(false);
  });
});
