import { Redirect } from "expo-router";

import { useAuth } from "@/context/AuthContext";
import { getDashboardRouteForRole } from "@/utils/authRoutes";

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Redirect href="/Role" />;
  }

  return <Redirect href={getDashboardRouteForRole(user.role)} />;
}
