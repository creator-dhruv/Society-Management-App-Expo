import type { UserRole } from "@/types/auth";

export const ROLE_LABELS: Record<UserRole, string> = {
  user: "Resident",
  admin: "Admin",
  security: "Security Guard",
};

export function getDashboardRouteForRole(role: UserRole): string {
  switch (role) {
    case "admin":
      return "/(admin)/(tabs)";
    case "security":
      return "/(guard)/(tabs)";
    case "user":
    default:
      return "/(user)/(tabs)";
  }
}
