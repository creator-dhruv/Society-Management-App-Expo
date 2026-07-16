import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";

const actions: {
  title: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}[] = [
  { title: "Approve Visitor", icon: "person-add", color: Colors.info },
  {
    title: "Pre-Approve Guest",
    icon: "shield-checkmark",
    color: Colors.primary,
  },
  { title: "Raise Complaint", icon: "warning", color: Colors.warning },
  {
    title: "Book Amenities",
    icon: "fitness",
    color: Colors.notification.delivery,
  },
];

const upcoming: {
  title: string;
  sub: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}[] = [
  { title: "Gym Booking", sub: "Tomorrow \u2022 7 PM", icon: "calendar" },
  { title: "Maintenance", sub: "Due in 3 days", icon: "wallet" },
  { title: "Yoga Event", sub: "Saturday \u2022 8 AM", icon: "people" },
];

export default function Community() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.flat}>Flat A-1204</Text>
            <Text style={styles.society}>Green Valley Residency</Text>
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            style={styles.circle}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={Colors.icon.dark}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.statusCard]}>
          <View style={styles.row}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={Colors.success}
            />
            <Text style={styles.status}> Society running smoothly</Text>
          </View>
          <Text style={styles.sub}>No pending security alerts</Text>
          <View style={[styles.row, { marginTop: Colors.spacing.lg }]}>
            <Info icon="shield" text="2 guards active" />
            <Info icon="home" text="Main gate open" />
          </View>
        </View>

        <SectionTitle title="Quick Actions" />
        <View style={styles.grid}>
          {actions.map((item) => (
            <TouchableOpacity
              key={item.title}
              accessibilityRole="button"
              accessibilityLabel={item.title}
              style={styles.action}
            >
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: item.color + "18" },
                ]}
              >
                <Ionicons name={item.icon} size={26} color={item.color} />
              </View>
              <Text style={styles.actionTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <SectionTitle title="Upcoming" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {upcoming.map((item) => (
            <View key={item.title} style={styles.upcoming}>
              <Ionicons name={item.icon} size={26} color={Colors.primaryDark} />
              <Text style={styles.upTitle}>{item.title}</Text>
              <Text style={styles.sub}>{item.sub}</Text>
            </View>
          ))}
        </ScrollView>

        <SectionTitle title="Recent Notices" />
        <Notice text="Water supply maintenance tomorrow at 10 AM." />
        <Notice text="Parking sticker renewal has started." />

        <SectionTitle title="Community Poll" />
        <View style={styles.card}>
          <Text style={styles.title}>Should we install EV chargers?</Text>
          <View style={styles.rowButtons}>
            <Vote icon="thumbs-up" title="Yes" color={Colors.success} />
            <Vote icon="thumbs-down" title="No" color={Colors.error} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.section}>{title}</Text>;
}

function Info({ icon, text }: { icon: any; text: string }) {
  return (
    <View style={styles.info}>
      <Ionicons name={icon} size={18} color={Colors.primaryDark} />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

function Notice({ text }: { text: string }) {
  return (
    <View style={styles.notice}>
      <Ionicons name="megaphone" size={22} color={Colors.primaryDark} />
      <Text style={styles.noticeText}>{text}</Text>
    </View>
  );
}

function Vote({
  icon,
  title,
  color,
}: {
  icon: any;
  title: string;
  color: string;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Vote ${title}`}
      style={styles.vote}
    >
      <Ionicons name={icon} size={20} color={color} />
      <Text style={styles.voteText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingBottom: 120 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Colors.spacing.xl,
  },
  greeting: {
    fontSize: FontSize["2xl"],
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
  },
  flat: {
    fontSize: FontSize.md,
    fontFamily: Fonts.semibold,
    color: Colors.text.primary,
    marginTop: 5,
  },
  society: {
    fontSize: FontSize.sm,
    fontFamily: Fonts.medium,
    color: Colors.text.tertiary,
    marginTop: 2,
  },
  circle: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    ...Colors.shadowStyle.card,
  },
  card: {
    marginHorizontal: Colors.spacing.xl,
    marginBottom: Colors.spacing.xl,
    padding: Colors.spacing.xl,
    borderRadius: Colors.radius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.divider,
    ...Colors.shadowStyle.card,
  },
  statusCard: { backgroundColor: Colors.blue[50] },
  row: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  status: {
    fontSize: FontSize.lg,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
  },
  sub: {
    color: Colors.text.tertiary,
    fontFamily: Fonts.medium,
    fontSize: FontSize.sm,
    marginTop: 4,
  },
  title: {
    fontSize: FontSize.lg,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
  },
  section: {
    fontSize: FontSize.xl,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginHorizontal: Colors.spacing.xl,
    marginBottom: Colors.spacing.md,
    marginTop: Colors.spacing.sm,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Colors.spacing.md,
    paddingHorizontal: Colors.spacing.xl,
    marginBottom: Colors.spacing.xl,
  },
  action: {
    width: "48%",
    flexGrow: 1,
    backgroundColor: Colors.surface,
    borderRadius: Colors.radius.md,
    padding: Colors.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.divider,
    ...Colors.shadowStyle.card,
  },
  iconWrap: {
    height: 52,
    width: 52,
    borderRadius: Colors.radius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  actionTitle: {
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginTop: Colors.spacing.md,
  },
  horizontalList: {
    gap: Colors.spacing.md,
    paddingHorizontal: Colors.spacing.xl,
    paddingBottom: Colors.spacing.xl,
  },
  upcoming: {
    width: 180,
    backgroundColor: Colors.surface,
    padding: Colors.spacing.lg,
    borderRadius: Colors.radius.md,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  upTitle: {
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    marginTop: Colors.spacing.md,
  },
  notice: {
    marginHorizontal: Colors.spacing.xl,
    backgroundColor: Colors.surface,
    padding: Colors.spacing.lg,
    borderRadius: Colors.radius.md,
    marginBottom: Colors.spacing.md,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  noticeText: {
    flex: 1,
    marginLeft: Colors.spacing.md,
    color: Colors.text.primary,
    fontFamily: Fonts.medium,
  },
  rowButtons: {
    flexDirection: "row",
    gap: Colors.spacing.md,
    marginTop: Colors.spacing.lg,
  },
  vote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surfaceTertiary,
    padding: Colors.spacing.md,
    borderRadius: Colors.radius.sm,
    gap: Colors.spacing.sm,
  },
  voteText: { fontFamily: Fonts.semibold, color: Colors.text.primary },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Colors.spacing.lg,
  },
  infoText: {
    marginLeft: 6,
    color: Colors.text.secondary,
    fontFamily: Fonts.medium,
    fontSize: FontSize.xs,
  },
});
