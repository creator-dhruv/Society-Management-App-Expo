import { create } from "zustand";
import { User } from "@/types/auth";

export type UserRole = "user" | "admin" | "security";

interface AuthState {
  user: User | null;
  role: UserRole;
  emailAddress: string;

  accessToken: string | null;
  refreshToken: string | null;

  isAuthenticated: boolean;
  isLoading: boolean;

  setLoading: (loading: boolean) => void;

  setRole: (role: UserRole) => void;
  setEmailAddress: (email: string) => void;

  login: (user: User, accessToken: string, refreshToken: string) => void;

  logout: () => void;

  updateUser: (user: User) => void;

  restoreSession: (
    user: User,
    accessToken: string,
    refreshToken: string,
  ) => void;

  setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  role: "user",
  emailAddress: "",

  accessToken: null,
  refreshToken: null,

  isAuthenticated: false,
  isLoading: true,

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  setRole: (role) =>
    set({
      role: role,
    }),

  setEmailAddress: (email) =>
    set({
      emailAddress: email,
    }),

  login: (user, accessToken, refreshToken) =>
    set({
      user,
      role: user.role,
      accessToken,
      refreshToken,
      isAuthenticated: true,
      isLoading: false,
    }),

  logout: () =>
    set({
      user: null,
      role: "user",
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    }),

  updateUser: (user) =>
    set({
      user,
      role: user.role,
    }),

  restoreSession: (user, accessToken, refreshToken) =>
    set({
      user,
      role: user.role,
      accessToken,
      refreshToken,
      isAuthenticated: true,
      isLoading: false,
    }),

  setTokens: (accessToken, refreshToken) =>
    set({
      accessToken,
      refreshToken,
    }),
}));
