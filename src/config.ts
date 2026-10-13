/** Build-time configuration (Vite env vars) with safe defaults. */
import { getItem } from './lib/storage.ts';

const env = import.meta.env;

export const SUPABASE_URL = (env.VITE_SUPABASE_URL as string | undefined)?.trim() || '';
export const SUPABASE_ANON_KEY = (env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() || '';

/** Teacher-created student accounts get an internal email on this domain (they log in with a username). */
export const STUDENT_EMAIL_DOMAIN = (env.VITE_STUDENT_EMAIL_DOMAIN as string | undefined)?.trim() || 'students.educore.local';

export const SUPABASE_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/**
 * "demo": everything runs in this browser (no server needed — works on GitHub Pages).
 * "supabase": real accounts and data. A visitor can still explore the demo on a
 * production site; the choice is remembered per browser.
 */
export const BACKEND: 'demo' | 'supabase' = SUPABASE_CONFIGURED && getItem('educore-backend') !== 'demo' ? 'supabase' : 'demo';

export const APP_NAME = 'Gradileo';
export const SUPPORT_EMAIL = (env.VITE_SUPPORT_EMAIL as string | undefined) || '';

/** The GitHub repository where approved course requests become issues for a build session. */
export const GITHUB_REPO = (env.VITE_GITHUB_REPO as string | undefined)?.trim() || 'Shedrackeze002/EduCore';
