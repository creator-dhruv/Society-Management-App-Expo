import Back from "@/components/common/Back";
import Colors from "@/constants/color";
import { FontSize, Fonts } from "@/constants/font";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Button from "@/components/common/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/auth.store";
import { clearAuthSession, getAuthSession } from "@/services/storage";
import { authService } from "@/services/auth.services";
import { useRouter } from "expo-router";

const Profile = () => {
  const { user } = useAuthStore();
  const { width } = useWindowDimensions();
  const navigate = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      const keys = await getAuthSession();

      if (keys) {
        console.log(keys.accessToken);
        try {
          await authService.logout(keys);
        } catch (apiErr: any) {
          console.warn(
            "Backend logout failed:",
            apiErr?.response?.data?.message || apiErr.message,
          );
        }
      }
    } catch (err) {
      console.error("Error reading session during logout:", err);
    } finally {
      await clearAuthSession();
      logout();
      navigate.replace("/(auth)/Login");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Back />

        {/* Profile */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: user?.avatar[0] || "https://i.pravatar.cc/300?img=12",
            }}
            style={styles.avatar}
          />
          <Text style={styles.heading}>{user?.name}</Text>
          <Text style={styles.subHeading}>{user?.email}</Text>
        </View>

        {/* Society */}
        <View style={[styles.card, { width: width }]}>
          <View style={[styles.card, { width: width * 0.9 }]}>
            <View style={styles.emptyCard}>
              <LinearGradient
                colors={["#6DBBFF", "#3B9DFF", "#1E7CF8"]}
                style={styles.emptyIcon}
              >
                <Ionicons
                  name="business-outline"
                  size={34}
                  color={Colors.white}
                />
              </LinearGradient>

              <Text
                style={styles.emptyTitle}
              >{`No Society ${user?.role.toLowerCase() == "admin" ? "Created" : "Joined"}`}</Text>

              <Text style={styles.emptySubtitle}>
                {`You haven't ${user?.role.toLowerCase() == "admin" ? "created" : "joined"} any society yet.`}
              </Text>
            </View>
          </View>

          {/* Logout */}
          <View style={{ marginBottom: 20 }}>
            {user?.role == "admin" && (
              <Button
                title="Setup Society"
                theme="blue"
                onPress={handleLogout}
              />
            )}
            <Button title="Logout" theme="red" onPress={handleLogout} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoRow = ({
  icon,
  title,
  value,
  isLast = false,
}: {
  icon: any;
  title: string;
  value: string | undefined;
  isLast?: boolean;
}) => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={[
        styles.infoRow,
        !isLast && {
          borderBottomWidth: 1,
          borderBottomColor: "#EEF2F7",
        },
      ]}
    >
      <View style={styles.infoLeft}>
        <Ionicons name={icon} size={20} color="#1E7CF8" />
        <Text style={styles.infoTitle}>{title}</Text>
      </View>

      <Text
        numberOfLines={1}
        style={[styles.infoValue, { width: width * 0.5 }]}
      >
        {value}
      </Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: FontSize["2xl"],
    fontFamily: Fonts.bold,
    color: "#0F172A",
    letterSpacing: -0.7,
  },

  subHeading: {
    fontSize: FontSize.sm,
    color: "#64748B",
    fontFamily: Fonts.medium,
    lineHeight: 20,
  },

  profileContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  avatarGradient: {
    padding: 5,
    borderRadius: 70,
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 80,
    backgroundColor: "#fff",
  },

  gradientButton: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    ...Colors.shadowStyle.card,
  },

  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.semibold,
    fontSize: FontSize.md,
  },

  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 16,
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: FontSize["2xl"],
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    letterSpacing: -0.7,
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },

  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  infoTitle: {
    fontFamily: Fonts.medium,
    color: Colors.text.secondary,
    fontSize: FontSize.md,
  },

  infoValue: {
    fontFamily: Fonts.semibold,
    color: Colors.text.primary,
    fontSize: FontSize.md,
    textAlign: "right",
  },

  emptyCard: {
    alignItems: "center",
    paddingVertical: 20,
  },

  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    marginTop: 18,
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.text.primary,
  },

  emptySubtitle: {
    marginVertical: 10,
    textAlign: "center",
    color: Colors.text.secondary,
    lineHeight: 22,
    paddingHorizontal: 12,
    fontFamily: Fonts.medium,
  },

  joinButton: {
    marginTop: 20,
    borderRadius: 14,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },

  joinText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: FontSize.md,
  },
});
