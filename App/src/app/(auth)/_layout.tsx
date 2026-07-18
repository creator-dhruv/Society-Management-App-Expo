import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/context/AuthContext";
import { getDashboardRouteForRole } from "@/utils/authRoutes";

export default function AuthLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  //   if (user) {
  //     return <Redirect href={getDashboardRouteForRole(user.role)} />;
  //   }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Role" />
      <Stack.Screen name="Login" />
      <Stack.Screen name="Signup" />
      <Stack.Screen name="ForgotPassword" />
    </Stack>
  );
}
