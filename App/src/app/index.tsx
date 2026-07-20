import { Redirect } from "expo-router";
import { getDashboardRouteForRole } from "@/utils/authRoutes";
import { useAuthStore } from "@/store/auth.store";

export default function Index() {
  const { user, isLoading } = useAuthStore();
  if (isLoading) {
    return null;
  }
  if (!user) {
    return <Redirect href="/Login" />;
  }
  return <Redirect href={getDashboardRouteForRole("user")} />;
}
