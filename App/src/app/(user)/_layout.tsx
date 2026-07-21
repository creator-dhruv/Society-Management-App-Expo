import { Redirect, Stack } from "expo-router";

// import { useAuth } from "@/context/AuthContext";
import { getDashboardRouteForRole } from "@/utils/authRoutes";

export default function UserLayout() {
  // const { user, isLoading } = useAuth();

  // if (isLoading) {
  //   return null;
  // }

  // if (!user) {
  //   return <Redirect href="/Login" />;
  // }

  // if (user.role !== "user") {
  //   return <Redirect href={getDashboardRouteForRole(user.role)} />;
  // }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(QuickActions)" />
    </Stack>
  );
}
