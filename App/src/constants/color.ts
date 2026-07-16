// src/constants/colors.js

export const Colors = {
  // ==========================
  // Brand
  // ==========================
  primary: "#00B2FF",
  primaryDark: "#0095E6",
  primaryLight: "#42C2FF",
  secondary: "#163A5F",
  accent: "#22D3A6",

  // ==========================
  // Primary Shades
  // ==========================
  blue: {
    50: "#EEF8FF",
    100: "#D8F0FF",
    200: "#B8E6FF",
    300: "#84D6FF",
    400: "#42C2FF",
    500: "#00B2FF",
    600: "#0095E6",
    700: "#0076B8",
    800: "#00598A",
    900: "#003C5C",
  },

  // ==========================
  // Background
  // ==========================
  background: "#ecf4f9",
  surface: "#FFFFFF",
  surfaceSecondary: "#F8FBFD",
  surfaceTertiary: "#EEF5FA",

  // ==========================
  // Text
  // ==========================
  text: {
    primary: "#0F172A",
    secondary: "#475569",
    tertiary: "#64748B",
    muted: "#94A3B8",
    placeholder: "#CBD5E1",
    white: "#FFFFFF",
  },

  // ==========================
  // Border
  // ==========================
  border: "#E2E8F0",
  divider: "#EDF2F7",
  focus: "#00B2FF",

  // ==========================
  // Status
  // ==========================
  success: "#16C784",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  // ==========================
  // Visitor Status
  // ==========================
  visitor: {
    approved: "#16C784",
    waiting: "#FBBF24",
    rejected: "#EF4444",
    inside: "#00B2FF",
    exited: "#64748B",
  },

  // ==========================
  // Complaint Priority
  // ==========================
  priority: {
    low: "#22C55E",
    medium: "#FACC15",
    high: "#F97316",
    critical: "#DC2626",
  },

  // ==========================
  // Payment
  // ==========================
  payment: {
    paid: "#16C784",
    pending: "#F59E0B",
    overdue: "#DC2626",
  },

  // ==========================
  // Poll
  // ==========================
  poll: {
    yes: "#22C55E",
    no: "#EF4444",
    neutral: "#64748B",
  },

  // ==========================
  // Notifications
  // ==========================
  notification: {
    visitor: "#00B2FF",
    delivery: "#7C3AED",
    emergency: "#EF4444",
    payment: "#F59E0B",
    complaint: "#22C55E",
  },

  // ==========================
  // Icon
  // ==========================
  icon: {
    active: "#00B2FF",
    inactive: "#94A3B8",
    dark: "#163A5F",
    light: "#FFFFFF",
  },

  // ==========================
  // Buttons
  // ==========================
  button: {
    primary: "#00B2FF",
    secondary: "#EEF8FF",
    danger: "#EF4444",
    disabled: "#CBD5E1",
  },

  // ==========================
  // Misc
  // ==========================
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",

  // ==========================
  // Shadow
  // ==========================
  shadow: "rgba(0, 178, 255, 0.15)",

  // ==========================
  // Approval Cards
  // ==========================
  approvalCard: {
    // ---------------------------------
    // Visitor
    // ---------------------------------
    visitor: {
      gradient: ["#6DBBFF", "#3B9DFF", "#1E7CF8"],
      shadow: "#000000",

      iconBackground: "rgba(255,255,255,0.18)",
      iconColor: "#FFFFFF",

      secondaryButton: "rgba(255,255,255,0.18)",
      secondaryBorder: "rgba(255,255,255,0.30)",

      glowTop: "rgba(255,255,255,0.12)",
      glowBottom: "rgba(255,255,255,0.08)",

      primaryButton: "#FFFFFF",
      primaryButtonText: "#1E7CF8",

      text: "#FFFFFF",
      subText: "rgba(255,255,255,0.82)",
    },

    // ---------------------------------
    // Delivery / Cab
    // ---------------------------------
    delivery: {
      gradient: ["#FF8A80", "#FF5F5F", "#EF4444"],
      shadow: "#000000",

      iconBackground: "rgba(255,255,255,0.18)",
      iconColor: "#FFFFFF",

      secondaryButton: "rgba(255,255,255,0.18)",
      secondaryBorder: "rgba(255,255,255,0.30)",

      glowTop: "rgba(255,255,255,0.12)",
      glowBottom: "rgba(255,255,255,0.08)",

      primaryButton: "#FFFFFF",
      primaryButtonText: "#EF4444",

      text: "#FFFFFF",
      subText: "rgba(255,255,255,0.82)",
    },

    // ---------------------------------
    // House Help
    // ---------------------------------
    houseHelp: {
      gradient: ["#5EE7A8", "#34D399", "#16A34A"],
      shadow: "#000000",

      iconBackground: "rgba(255,255,255,0.18)",
      iconColor: "#FFFFFF",

      secondaryButton: "rgba(255,255,255,0.18)",
      secondaryBorder: "rgba(255,255,255,0.30)",

      glowTop: "rgba(255,255,255,0.12)",
      glowBottom: "rgba(255,255,255,0.08)",

      primaryButton: "#FFFFFF",
      primaryButtonText: "#16A34A",

      text: "#FFFFFF",
      subText: "rgba(255,255,255,0.82)",
    },
  },

  // ==========================
  // Event Card
  // ==========================

  // Colors.js

  eventCard: {
    Meeting: {
      gradient: ["#60A5FA", "#3B82F6", "#2563EB"],
      chip: "#DBEAFE",
      chipText: "#1D4ED8",
      shadow: "#2563EB",
      icon: "#FFFFFF",
    },

    Festival: {
      gradient: ["#FB923C", "#F97316", "#EA580C"],
      chip: "#FFEDD5",
      chipText: "#d0460f",
      shadow: "#EA580C",
      icon: "#FFFFFF",
    },

    Sports: {
      gradient: ["#4ADE80", "#22C55E", "#16A34A"],
      chip: "#DCFCE7",
      chipText: "#15803D",
      shadow: "#16A34A",
      icon: "#FFFFFF",
    },

    Workshop: {
      gradient: ["#C084FC", "#8B5CF6", "#6D28D9"],
      chip: "#F3E8FF",
      chipText: "#7E22CE",
      shadow: "#7C3AED",
      icon: "#FFFFFF",
    },

    Cultural: {
      gradient: ["#F472B6", "#EC4899", "#DB2777"],
      chip: "#FCE7F3",
      chipText: "#BE185D",
      shadow: "#DB2777",
      icon: "#FFFFFF",
    },

    Default: {
      gradient: ["#60A5FA", "#3B82F6", "#2563EB"],
      chip: "#DBEAFE",
      chipText: "#1D4ED8",
      shadow: "#2563EB",
      icon: "#FFFFFF",
    },
  },

  // ==========================
  // Gradients
  // ==========================
  gradient: {
    primary: ["#00B2FF", "#6DD5FF"],
    dark: ["#00B2FF", "#0095E6"],
    success: ["#16C784", "#22D3A6"],
  },

  // ==========================
  // Layout tokens
  // ==========================
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    "2xl": 24,
    "3xl": 32,
  },

  radius: {
    sm: 12,
    md: 16,
    lg: 24,
    xl: 28,
    pill: 999,
  },

  shadowStyle: {
    card: {
      shadowColor: "#0F172A",
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 4,
    },
  },

  quickAction: {
    visitors: { color: "#059669", backgroundColor: "#34D399" },
    amenities: { color: "#7C3AED", backgroundColor: "#A78BFA" },
    notices: { color: "#A16207", backgroundColor: "#FCD34D" },
    payments: { color: "#0891B2", backgroundColor: "#22D3EE" },
    emergency: { color: "#DC2626", backgroundColor: "#F87171" },
    complaints: { color: "#EA580C", backgroundColor: "#FB923C" },
  },
} as const;

export default Colors;
