import { create } from "zustand";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthState {
  auth: {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
    resetAccessToken: () => void;
    reset: () => void;
  };
}

export const useAuthStore = create<AuthState>()((set) => {
  const initToken = "";
  return {
    auth: {
      user: null,
      setUser: (user) =>
        set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken: initToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          return { ...state, auth: { ...state.auth, accessToken } };
        }),
      resetAccessToken: () =>
        set((state) => {
          return {
            ...state,
            auth: { ...state.auth, accessToken: "" },
          };
        }),
      reset: () =>
        set((state) => {
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: "" },
          };
        }),
    },
  };
});

export const useAuth = () => useAuthStore((state) => state.auth);
