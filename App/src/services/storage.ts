import * as SecureStore from "expo-secure-store";
import type { AuthSession } from "@/types/auth";

const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";

export async function getAuthSession() {
  try {
    const raw = await SecureStore.getItemAsync(ACCESS_TOKEN);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export async function saveAuthSession(token: AuthSession) {
  await SecureStore.setItemAsync(
    ACCESS_TOKEN,
    JSON.stringify(token.accessToken),
  );
  await SecureStore.setItemAsync(
    REFRESH_TOKEN,
    JSON.stringify(token.refreshToken),
  );
}

export async function clearAuthSession(): Promise<void> {
  await SecureStore.deleteItemAsync("ACCESS_TOKEN");
  await SecureStore.deleteItemAsync("REFRESH_TOKEN");
}
