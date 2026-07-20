import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "@/store/auth.store";
import { getDashboardRouteForRole } from "@/utils/authRoutes";

export default function AuthLayout() {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Redirect href={getDashboardRouteForRole(user.role) as any} />;
  }

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
      <Stack.Screen name="OTP" />
    </Stack>
  );
}
