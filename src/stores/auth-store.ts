import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthUser } from "@/types/user";

const SESSION_MAX_AGE_MS = 604800 * 1000;

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  expiresAt: number | null;
  setAuth: (token: string, user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      expiresAt: null,
      setAuth: (token, user) =>
        set({ token, user, expiresAt: Date.now() + SESSION_MAX_AGE_MS }),
      logout: () => set({ token: null, user: null, expiresAt: null }),
    }),
    {
      name: "venuze-auth",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state?.token) return;
        if (state.expiresAt === null || state.expiresAt <= Date.now()) {
          state.logout();
        }
      },
    },
  ),
);
