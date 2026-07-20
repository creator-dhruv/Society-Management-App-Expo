import * as SecureStore from "expo-secure-store";
import type { AuthSession } from "@/types/auth";

const TOKEN_KEY = "AUTH_ACCESS_TOKEN";
const REFRESH_TOKEN_KEY = "AUTH_REFRESH_TOKEN";

export async function getAuthSession(): Promise<AuthSession | null> {
  try {
    const accessToken = await SecureStore.getItemAsync(TOKEN_KEY);
    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

    if (!accessToken || !refreshToken) return null;

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error("Failed to fetch auth session:", error);
    return null;
  }
}

export async function saveAuthSession(session: AuthSession): Promise<void> {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, session.accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, session.refreshToken);
  } catch (error) {
    console.error("Failed to save auth session:", error);
    throw error;
  }
}

export async function clearAuthSession(): Promise<void> {
  try {
    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEY),
      SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    ]);
  } catch (error) {
    console.error("Failed to clear auth session:", error);
  }
}
