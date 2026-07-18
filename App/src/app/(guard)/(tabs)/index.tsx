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

const PENDING_VISITORS = [
  { name: "Amit Verma", flat: "B-302", time: "10:30 AM", type: "Guest" },
  { name: "Swiggy Delivery", flat: "A-1204", time: "10:45 AM", type: "Delivery" },
  { name: "House Help", flat: "C-501", time: "11:00 AM", type: "Staff" },
];

export default function GuardDashboard() {
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
              <Text style={styles.heroLabel}>Security Gate</Text>
              <Text style={styles.heroTitle}>{user?.name}</Text>
              <Text style={styles.heroSubtitle}>
                Verify visitors and manage gate entries
              </Text>
            </View>
            <TouchableOpacity onPress={handleSignOut} style={styles.logoutBtn}>
              <Ionicons name="log-out-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.scanBox}>
            <Ionicons name="qr-code-outline" size={28} color="#fff" />
            <View style={styles.scanTextWrap}>
              <Text style={styles.scanTitle}>Scan Visitor QR</Text>
              <Text style={styles.scanSubtitle}>
                Verify pre-approved guest passes instantly
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </View>
        </LinearGradient>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Inside Society</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Awaiting Entry</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Pending Verifications</Text>
        {PENDING_VISITORS.map((visitor) => (
          <View key={visitor.name + visitor.time} style={styles.visitorCard}>
            <View style={styles.visitorInfo}>
              <Text style={styles.visitorName}>{visitor.name}</Text>
              <Text style={styles.visitorMeta}>
                {visitor.flat} • {visitor.time} • {visitor.type}
              </Text>
            </View>
            <View style={styles.visitorActions}>
              <TouchableOpacity style={styles.rejectBtn}>
                <Ionicons name="close" size={18} color={Colors.error} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.approveBtn}>
                <Ionicons name="checkmark" size={18} color={Colors.success} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  scanBox: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: Colors.radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  scanTextWrap: {
    flex: 1,
    marginHorizontal: 12,
  },
  scanTitle: {
    fontFamily: Fonts.semibold,
    fontSize: FontSize.sm,
    color: Colors.text.white,
  },
  scanSubtitle: {
    marginTop: 2,
    fontFamily: Fonts.regular,
    fontSize: FontSize.xs,
    color: "rgba(255,255,255,0.85)",
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
  visitorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: Colors.radius.md,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.divider,
    ...Colors.shadowStyle.card,
  },
  visitorInfo: {
    flex: 1,
  },
  visitorName: {
    fontFamily: Fonts.semibold,
    fontSize: FontSize.sm,
    color: Colors.text.primary,
  },
  visitorMeta: {
    marginTop: 4,
    fontFamily: Fonts.regular,
    fontSize: FontSize.xs,
    color: Colors.text.tertiary,
  },
  visitorActions: {
    flexDirection: "row",
    gap: 8,
  },
  rejectBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
  },
  approveBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
  },
});
