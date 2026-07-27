import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthUser } from "@/types/user";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  setAuth: (token: string, user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => {
        set({ token, user });
        if (typeof document !== "undefined") {
          document.cookie = `venuze_token=${token}; path=/; max-age=604800; samesite=lax`;
        }
      },
      logout: () => {
        set({ token: null, user: null });
        if (typeof document !== "undefined") {
          document.cookie = `venuze_token=; path=/; max-age=0; samesite=lax`;
        }
      },
    }),
    {
      name: "venuze-auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
