import { beforeEach, describe, expect, it } from 'vitest';
import { DB_KEY, DB_VERSION, loadDb, type DemoDB } from './db.ts';

class MemoryStorage {
  private m = new Map<string, string>();
  getItem(k: string) {
    return this.m.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.m.set(k, String(v));
  }
  removeItem(k: string) {
    this.m.delete(k);
  }
}

describe('loadDb', () => {
  beforeEach(() => {
    Object.assign(globalThis, { localStorage: new MemoryStorage() });
  });

  it('moves demo accounts saved before the rename to gradileo.demo, keeping everything else', () => {
    const saved = { version: DB_VERSION, users: [{ id: 'u1', email: 'teacher@educore.demo' }, { id: 'u2', email: 'amara@educore.demo' }, { id: 'u3', email: 'lee.k@school.ca' }] };
    localStorage.setItem(DB_KEY, JSON.stringify(saved));
    const db = loadDb() as DemoDB;
    expect(db.users.map((u) => u.email)).toEqual(['teacher@gradileo.demo', 'amara@gradileo.demo', 'lee.k@school.ca']);
  });

  it('starts afresh from another version or unreadable data', () => {
    localStorage.setItem(DB_KEY, JSON.stringify({ version: DB_VERSION + 1, users: [] }));
    expect(loadDb()).toBeNull();
    localStorage.setItem(DB_KEY, '{not json');
    expect(loadDb()).toBeNull();
  });
});
