import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "@/store/auth.store";

export default function ProfileLayout() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Redirect href="/(auth)/Login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Profile" />
    </Stack>
  );
}
