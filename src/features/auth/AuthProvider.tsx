import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/data/index.ts';
import type { Profile } from '@/data/types.ts';

interface AuthState {
  user: Profile | null;
  loading: boolean;
  setUser: (u: Profile | null) => void;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthState>({ user: null, loading: true, setUser: () => {}, signOut: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const qc = useQueryClient();

  const setUser = useCallback(
    (u: Profile | null) => {
      setUserState((prev) => {
        if (prev?.id !== u?.id) qc.clear();
        return u;
      });
    },
    [qc],
  );

  useEffect(() => {
    let alive = true;
    api()
      .getCurrentUser()
      .then((u) => alive && setUser(u))
      .catch(() => alive && setUser(null))
      .finally(() => alive && setLoading(false));
    const off = api().onAuthChange((u) => setUser(u));
    return () => {
      alive = false;
      off();
    };
  }, [setUser]);

  const signOut = useCallback(async () => {
    await api().signOut();
    setUser(null);
  }, [setUser]);

  return <Ctx.Provider value={{ user, loading, setUser, signOut }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  return useContext(Ctx);
}

export function useMe(): Profile {
  const { user } = useAuth();
  if (!user) throw new Error('Not signed in');
  return user;
}
