import type { DataApi } from './api.ts';
import { BACKEND, SUPABASE_ANON_KEY, SUPABASE_URL } from '@/config.ts';
import { DemoApi } from './demo/demoApi.ts';
import { SupabaseApi } from './supabase/supabaseApi.ts';
import { removeItem, setItem } from '@/lib/storage.ts';

let instance: DataApi | null = null;

export function api(): DataApi {
  if (!instance) instance = BACKEND === 'supabase' ? new SupabaseApi(SUPABASE_URL, SUPABASE_ANON_KEY) : new DemoApi();
  return instance;
}

export function demoApi(): DemoApi | null {
  const a = api();
  return a instanceof DemoApi ? a : null;
}

/** Switch this browser between the live backend and the demo (reloads the page). */
export function setDemoBackend(on: boolean) {
  if (on) setItem('educore-backend', 'demo');
  else removeItem('educore-backend');
  window.location.assign(import.meta.env.BASE_URL);
}

export type { DataApi };
