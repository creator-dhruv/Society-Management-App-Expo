import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  resetPassword,
} from "@/services/auth";
import {
  clearAuthSession,
  getAuthSession,
  saveAuthSession,
} from "@/services/storage";
import type {
  AuthSession,
  LoginCredentials,
  SignupCredentials,
  User,
} from "@/types/auth";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (credentials: SignupCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const applySession = useCallback((session: AuthSession | null) => {
    setUser(session?.user ?? null);
  }, []);

  const refreshSession = useCallback(async () => {
    const session = await getAuthSession();
    applySession(session);
  }, [applySession]);

  useEffect(() => {
    refreshSession().finally(() => setIsLoading(false));
  }, [refreshSession]);

  const signIn = useCallback(
    async (credentials: LoginCredentials) => {
      const session = await loginUser(credentials);
      applySession(session);
    },
    [applySession],
  );

  const signUp = useCallback(
    async (credentials: SignupCredentials) => {
      const session = await registerUser(credentials);
      applySession(session);
    },
    [applySession],
  );

  const signOut = useCallback(async () => {
    await clearAuthSession();
    applySession(null);
  }, [applySession]);

  const forgotPassword = useCallback(async (email: string) => {
    await resetPassword(email);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      signIn,
      signUp,
      signOut,
      forgotPassword,
      refreshSession,
    }),
    [
      user,
      isLoading,
      signIn,
      signUp,
      signOut,
      forgotPassword,
      refreshSession,
    ],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export async function checkAuthSession(): Promise<AuthSession | null> {
  return getAuthSession();
}

export async function persistAuthSession(session: AuthSession): Promise<void> {
  await saveAuthSession(session);
}
