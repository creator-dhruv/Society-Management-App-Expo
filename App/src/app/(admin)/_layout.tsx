import { Redirect, Stack } from "expo-router";
import { getDashboardRouteForRole } from "@/utils/authRoutes";
import { useAuthStore } from "@/store/auth.store";

export default function AdminLayout() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Redirect href="/Login" />;
  }

  if (user.role !== "admin") {
    return <Redirect href={getDashboardRouteForRole(user.role) as any} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
