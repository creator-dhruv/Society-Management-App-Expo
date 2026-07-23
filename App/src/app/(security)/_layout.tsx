import { Redirect, Stack } from "expo-router";

// import { useAuth } from "@/context/AuthContext";
import { getDashboardRouteForRole } from "@/utils/authRoutes";

export default function GuardLayout() {
  // const { user, isLoading } = useAuth();

  // if (isLoading) {
  //   return null;
  // }

  // if (!user) {
  //   return <Redirect href="/Login" />;
  // }

  // if (user.role !== "guard") {
  //   return <Redirect href={getDashboardRouteForRole(user.role)} />;
  // }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
