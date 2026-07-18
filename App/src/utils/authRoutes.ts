import type { UserRole } from "@/types/auth";

export const ROLE_LABELS: Record<UserRole, string> = {
  user: "Resident",
  admin: "Admin",
  guard: "Security Guard",
};

export function getDashboardRouteForRole(role: UserRole): string {
  switch (role) {
    case "admin":
      return "/(admin)/(tabs)";
    case "guard":
      return "/(guard)/(tabs)";
    case "user":
    default:
      return "/(user)/(tabs)";
  }
}
