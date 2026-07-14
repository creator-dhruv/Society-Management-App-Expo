import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "@/constants/font";
import Colors from "@/constants/color";
import { LinearGradient } from "expo-linear-gradient";

const COLORS = {
  primary: "#14F195",
  primaryDark: "#0BCB79",
  bg: "#F6F8F7",
  card: "#FFFFFF",
  surface: "#EEFDF7",
  text: "#101214",
  sub: "#6B7280",
  border: "#E6ECE8",
  danger: "#FF5A5F",
};

const actions = [
  { title: "Approve Visitor", icon: "person-add" },
  { title: "Pre-Approve Guest", icon: "shield-checkmark" },
  { title: "Raise Complaint", icon: "warning" },
  { title: "Book Amenities", icon: "fitness" },
  { title: "Pay Maintenance", icon: "card" },
];

const upcoming = [
  { title: "Gym Booking", sub: "Tomorrow • 7 PM", icon: "calendar" },
  { title: "Maintenance", sub: "Due in 3 days", icon: "wallet" },
  { title: "Yoga Event", sub: "Saturday • 8 AM", icon: "people" },
];

const notices = [
  "Water supply maintenance tomorrow 10 AM.",
  "Parking sticker renewal has started.",
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning 👋</Text>
            <Text style={styles.flat}>Flat A-1204</Text>
            <Text style={styles.society}>Green Valley Residency</Text>
          </View>

          <TouchableOpacity style={styles.circle}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={COLORS.text}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { backgroundColor: COLORS.surface }]}>
          <View style={styles.row}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={COLORS.primaryDark}
            />
            <Text style={styles.status}> Society Running Smoothly</Text>
          </View>
          <Text style={styles.sub}>No pending security alerts</Text>
          <View style={[styles.row, { marginTop: 16 }]}>
            <Info icon="shield" text="2 Guards Active" />
            <Info icon="home" text="Main Gate Open" />
          </View>
        </View>

        <LinearGradient
          colors={Colors.gradient.primary}
          style={styles.card}
          start={{ x: 0, y: 0 }} // Left side
          end={{ x: 1, y: 1 }} // Bottom right corner
        >
          <Text style={[styles.title, { color: "#fff" }]}>Visitor Waiting</Text>
          <Text style={{ color: "#fff", marginTop: 6 }}>
            Rahul Sharma is waiting at Main Gate.
          </Text>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TouchableOpacity
              style={[
                styles.primaryBtn,
                { backgroundColor: Colors.visitor.approved },
              ]}
            >
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  color: Colors.white,
                }}
              >
                Approve
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.rejectBtn,
                { backgroundColor: Colors.visitor.rejected },
              ]}
            >
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  color: Colors.white,
                }}
              >
                Reject
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <Text style={styles.section}>Quick Actions</Text>

        <View style={styles.grid}>
          {actions.map((item) => (
            <TouchableOpacity key={item.title} style={styles.action}>
              <View style={styles.iconWrap}>
                <Ionicons
                  name={item.icon}
                  size={28}
                  color={COLORS.primaryDark}
                />
              </View>
              <Text style={styles.actionTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.section}>Upcoming</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {upcoming.map((item) => (
            <View key={item.title} style={styles.upcoming}>
              <Ionicons name={item.icon} size={26} color={COLORS.primaryDark} />
              <Text style={styles.upTitle}>{item.title}</Text>
              <Text style={styles.sub}>{item.sub}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.section}>Recent Notices</Text>

        {notices.map((n) => (
          <View style={styles.notice} key={n}>
            <Ionicons name="megaphone" size={22} color={COLORS.primaryDark} />
            <Text style={styles.noticeText}>{n}</Text>
          </View>
        ))}

        <Text style={styles.section}>Community Poll</Text>

        <View style={styles.card}>
          <Text style={styles.title}>Should we install EV chargers?</Text>
          <View style={styles.rowButtons}>
            <TouchableOpacity style={styles.vote}>
              <Ionicons name="thumbs-up" size={20} color={COLORS.primaryDark} />
              <Text style={styles.voteText}> Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.vote}>
              <Ionicons name="thumbs-down" size={20} color={COLORS.danger} />
              <Text style={styles.voteText}> No</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.section}>Announcement</Text>

        <View
          style={[
            styles.card,
            { backgroundColor: COLORS.surface, marginBottom: 30 },
          ]}
        >
          <Text style={styles.title}>🎉 Independence Day Celebration</Text>
          <Text style={styles.sub}>
            Join the society celebration on 15 August at the clubhouse.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Info = ({ icon, text }) => (
  <View style={{ flexDirection: "row", alignItems: "center", marginRight: 18 }}>
    <Ionicons name={icon} size={18} color={COLORS.primaryDark} />
    <Text style={{ marginLeft: 6 }}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  greeting: { fontSize: 30, fontWeight: "700", color: COLORS.text },
  flat: { fontSize: 16, fontWeight: "600", marginTop: 5 },
  society: { fontSize: 14, color: COLORS.sub },
  circle: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 24,
    backgroundColor: "#fff",
  },
  row: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  status: { fontSize: 18, fontWeight: "700" },
  sub: { color: COLORS.sub, marginTop: 4 },
  title: { fontSize: 20, fontWeight: "700", color: COLORS.text },
  primaryBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    marginRight: 12,
  },
  rejectBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },
  btnText: { fontWeight: "700" },
  section: {
    fontSize: 22,
    fontWeight: "700",
    marginHorizontal: 20,
    marginBottom: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  action: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },
  iconWrap: {
    height: 52,
    width: 52,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  actionTitle: { fontWeight: "700", marginTop: 12 },
  upcoming: {
    width: 180,
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 22,
    marginLeft: 20,
    marginBottom: 20,
  },
  upTitle: { fontWeight: "700", marginTop: 10 },
  notice: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 20,
    marginBottom: 12,
    flexDirection: "row",
  },
  noticeText: { flex: 1, marginLeft: 12, color: COLORS.text },
  rowButtons: { flexDirection: "row", marginTop: 18 },
  vote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 14,
    marginRight: 12,
  },
  voteText: { fontWeight: "600" },
});
