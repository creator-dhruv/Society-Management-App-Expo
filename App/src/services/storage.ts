import * as SecureStore from "expo-secure-store";
import type { AuthSession, StoredUserRecord } from "@/types/auth";

const AUTH_SESSION_KEY = "auth_session";
const REGISTERED_USERS_KEY = "registered_users";

export async function getAuthSession(): Promise<AuthSession | null> {
  try {
    const raw = await SecureStore.getItemAsync(AUTH_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export async function saveAuthSession(session: AuthSession): Promise<void> {
  await SecureStore.setItemAsync(AUTH_SESSION_KEY, JSON.stringify(session));
}

export async function clearAuthSession(): Promise<void> {
  await SecureStore.deleteItemAsync(AUTH_SESSION_KEY);
}

export async function getRegisteredUsers(): Promise<StoredUserRecord[]> {
  try {
    const raw = await SecureStore.getItemAsync(REGISTERED_USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredUserRecord[];
  } catch {
    return [];
  }
}

export async function saveRegisteredUsers(
  users: StoredUserRecord[],
): Promise<void> {
  await SecureStore.setItemAsync(REGISTERED_USERS_KEY, JSON.stringify(users));
}
