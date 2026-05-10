"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { getUserFirstName, clearAuth as clearLocalAuth } from "@/lib/auth";

type AuthState = {
  isAuthed: boolean;
  firstName: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  isAuthed: false,
  firstName: null,
  loading: true,
  refresh: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const me = await api.auth.me();
      setIsAuthed(true);
      const backendName = me.name?.split(" ")[0];
      const stored = getUserFirstName();
      setFirstName(backendName || stored || "Student");
    } catch {
      setIsAuthed(false);
      setFirstName(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
    } catch {
      // proceed even if the backend call fails
    } finally {
      clearLocalAuth();
      setIsAuthed(false);
      setFirstName(null);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ isAuthed, firstName, loading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
