import { ComponentProps } from "react";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Fonts } from "@/constants/font";
import Colors from "@/constants/color";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useAuthStore } from "@/store/auth.store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

type Stat = {
  data: number;
  title: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  color: string;
};

type AdminHeaderProps = {
  divData: Stat[];
};

const AdminHeader = ({ divData }: AdminHeaderProps) => {
  const user = useAuthStore((state) => state.user);
  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const router = useRouter();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={[styles.container, { paddingTop: top + 10 }]}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.leftSection}>
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>ADMIN DASHBOARD</Text>
          </View>

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.greeting}>
              Hi, {user?.name.split(" ")[0]} 👋
            </Text>

            <View style={{ marginVertical: 10 }}>
              <View style={styles.infoBox}>
                <Ionicons
                  name="location-outline"
                  size={16}
                  color={Colors.text.secondary}
                />
                <Text style={styles.infoTitle}>Gokuldham Society</Text>
              </View>

              <View style={styles.infoBox}>
                <Ionicons
                  name="calendar-clear-outline"
                  size={16}
                  color={Colors.text.secondary}
                />
                <Text style={styles.infoTitle}>{today}</Text>
              </View>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => router.navigate("/(profile)/Profile")}
          style={styles.profile}
        >
          <Image source={require("@/assets/image.png")} style={styles.avatar} />
          <View style={styles.onlineDot} />
        </Pressable>
      </View>

      {/* Stats */}
      <View style={[styles.statsRow, { width: width * 0.9 }]}>
        {divData.map((item) => (
          <View
            key={item.title}
            style={[styles.statCard, { width: width * 0.4 }]}
          >
            <View style={styles.statIcon}>
              <Ionicons name={item.icon} size={40} color={item.color} />
            </View>

            <View style={styles.statContent}>
              <Text style={styles.statValue}>{item.data}</Text>
              <Text style={styles.statLabel}>{item.title}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default AdminHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingBottom: 24,
    overflow: "hidden",
  },

  circle1: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: Colors.primary + 10,
    top: -80,
    right: -80,
  },

  circle2: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.primary + 10,
    top: 220,
    left: -60,
  },

  circle3: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.primary + "10",
    bottom: 40,
    right: 10,
  },
  /* ================= Hero ================= */

  hero: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  leftSection: {
    flex: 1,
    paddingRight: 16,
  },

  /* ================= Badge ================= */

  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.blue[50],
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: Colors.radius.pill,
    borderWidth: 1,
    borderColor: Colors.blue[300],
    marginBottom: 18,
  },

  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: 8,
  },

  badgeText: {
    fontSize: 11,
    letterSpacing: 1,
    color: Colors.primary,
    fontFamily: Fonts.bold,
  },

  /* ================= Heading ================= */

  greeting: {
    fontSize: 38,
    color: Colors.text.primary,
    fontFamily: Fonts.bold,
  },

  title: {
    marginTop: 6,
    fontSize: 26,
    lineHeight: 34,
    color: Colors.text.primary,
    fontFamily: Fonts.semibold,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.text.secondary,
    fontFamily: Fonts.regular,
  },

  /* ================= Info ================= */

  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  infoTitle: {
    marginLeft: 6,
    fontSize: 13,
    color: Colors.text.tertiary,
    fontFamily: Fonts.medium,
  },

  /* ================= Profile ================= */

  profile: {
    position: "relative",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Colors.shadowStyle.card,
  },

  onlineDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.success,
    borderWidth: 3,
    borderColor: Colors.surface,
  },

  /* ================= Stats ================= */

  statsRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 26,
    paddingVertical: 20,
    paddingLeft: 30,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000000dc",
    elevation: 4,
  },

  statCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  statIcon: {
    width: 58,
    justifyContent: "center",
    alignItems: "center",
  },

  statContent: {
    alignItems: "flex-start",
  },

  statValue: {
    fontSize: 24,
    color: Colors.text.primary,
    fontFamily: Fonts.bold,
  },

  statLabel: {
    fontSize: 13,
    color: Colors.text.secondary,
    fontFamily: Fonts.medium,
    textAlign: "center",
  },

  /* ================= Search (Optional) ================= */

  searchCard: {
    marginTop: 20,
    height: 60,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    ...Colors.shadowStyle.card,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    color: Colors.text.primary,
    fontSize: 15,
    fontFamily: Fonts.medium,
  },

  filterButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.blue[50],
  },
});
