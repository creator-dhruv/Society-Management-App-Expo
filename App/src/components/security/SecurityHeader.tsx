import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";
import { useAuthStore } from "@/store/auth.store";

const SecurityHeader = () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const firstName = user?.name || "Guard";

  return (
    <View style={styles.container}>
      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />

      <View style={styles.hero}>
        <View style={styles.left}>
          <View style={styles.badge}>
            <View style={styles.badgeDot} />

            <Text style={styles.badgeText}>ON DUTY</Text>
          </View>

          <Text style={styles.greeting}>Good Morning</Text>

          <Text style={styles.name}>{firstName}</Text>

          <View style={styles.meta}>
            <Ionicons
              name="shield-checkmark-outline"
              size={18}
              //   color={Colors.primary}
            />

            <Text style={styles.metaText}>Gate 1 | Morning Shift</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push("/(profile)/Profile")}
          style={styles.profileButton}
        >
          <Image source={require("@/assets/image.png")} style={styles.avatar} />

          <View style={styles.onlineDot} />
        </Pressable>
      </View>
    </View>
  );
};

export default SecurityHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    // overflow: "hidden",
  },

  circleOne: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 110,
    backgroundColor: Colors.primary + 12,
    top: -60,
    right: -60,
  },

  circleTwo: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.primary + 8,
    bottom: -40,
    left: -60,
  },

  hero: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  left: {
    flex: 1,
    paddingRight: 20,
  },

  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Colors.radius.pill,
    backgroundColor: Colors.blue[50],
    borderWidth: 1,
    borderColor: Colors.blue[100],
    marginBottom: 22,
  },

  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
    marginRight: 8,
  },

  badgeText: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    letterSpacing: 1.2,
    color: Colors.success,
  },

  greeting: {
    fontFamily: Fonts.medium,
    fontSize: FontSize.lg,
    color: Colors.text.secondary,
  },

  name: {
    fontFamily: Fonts.extrabold,
    fontSize: 34,
    color: Colors.text.primary,
    letterSpacing: -1,
  },

  meta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 8,
    gap: 10,
  },

  metaText: {
    fontFamily: Fonts.semibold,
    fontSize: FontSize.md,
    color: Colors.text.secondary,
  },

  profileButton: {
    position: "relative",
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: Colors.white,
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
    borderWidth: 2.5,
    borderColor: Colors.white,
  },
});
