import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";
import { useAuth } from "@/context/AuthContext";

const ADMIN_ACTIONS = [
  {
    title: "Resident Approvals",
    subtitle: "Review pending registrations",
    icon: "people-outline" as const,
    color: Colors.primary,
  },
  {
    title: "Notice Management",
    subtitle: "Publish society notices",
    icon: "megaphone-outline" as const,
    color: Colors.accent,
  },
  {
    title: "Complaint Overview",
    subtitle: "Track open complaints",
    icon: "alert-circle-outline" as const,
    color: Colors.warning,
  },
  {
    title: "Maintenance Reports",
    subtitle: "View payment summaries",
    icon: "wallet-outline" as const,
    color: Colors.info,
  },
];

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/Login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={["#6DBBFF", "#3B9DFF", "#1E7CF8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroLabel}>Admin Dashboard</Text>
              <Text style={styles.heroTitle}>Hello, {user?.name}</Text>
              <Text style={styles.heroSubtitle}>
                Manage society operations and approvals
              </Text>
            </View>
            <TouchableOpacity onPress={handleSignOut} style={styles.logoutBtn}>
              <Ionicons name="log-out-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Pending Approvals</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Open Complaints</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {ADMIN_ACTIONS.map((action) => (
            <TouchableOpacity key={action.title} style={styles.actionCard}>
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: `${action.color}20` },
                ]}
              >
                <Ionicons name={action.icon} size={24} color={action.color} />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  hero: {
    borderRadius: Colors.radius.lg,
    padding: 22,
    ...Colors.shadowStyle.card,
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  heroLabel: {
    fontFamily: Fonts.medium,
    fontSize: FontSize.sm,
    color: "rgba(255,255,255,0.85)",
  },
  heroTitle: {
    marginTop: 4,
    fontFamily: Fonts.bold,
    fontSize: FontSize["2xl"],
    color: Colors.text.white,
  },
  heroSubtitle: {
    marginTop: 6,
    fontFamily: Fonts.regular,
    fontSize: FontSize.sm,
    color: "rgba(255,255,255,0.9)",
  },
  logoutBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Colors.radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.divider,
    ...Colors.shadowStyle.card,
  },
  statValue: {
    fontFamily: Fonts.bold,
    fontSize: FontSize["2xl"],
    color: Colors.text.primary,
  },
  statLabel: {
    marginTop: 4,
    fontFamily: Fonts.regular,
    fontSize: FontSize.xs,
    color: Colors.text.tertiary,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontFamily: Fonts.bold,
    fontSize: FontSize.lg,
    color: Colors.text.primary,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    width: "48%",
    backgroundColor: Colors.surface,
    borderRadius: Colors.radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.divider,
    ...Colors.shadowStyle.card,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  actionTitle: {
    fontFamily: Fonts.semibold,
    fontSize: FontSize.sm,
    color: Colors.text.primary,
  },
  actionSubtitle: {
    marginTop: 4,
    fontFamily: Fonts.regular,
    fontSize: FontSize.xs,
    color: Colors.text.tertiary,
  },
});
