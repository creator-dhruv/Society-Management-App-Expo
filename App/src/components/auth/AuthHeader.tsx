import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@react-native-vector-icons/ionicons";

import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function AuthHeader({
  title,
  subtitle,
  icon = "home",
}: AuthHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={["#6DBBFF", "#3B9DFF", "#1E7CF8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.circle1} />
        <View style={styles.circle2} />

        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={28} color={Colors.text.white} />
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Colors.spacing["2xl"],
  },
  gradient: {
    padding: 24,
    borderRadius: Colors.radius.lg,
    overflow: "hidden",
    ...Colors.shadowStyle.card,
  },
  circle1: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#5caef09e",
    top: -70,
    right: -50,
  },
  circle2: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#5caef09e",
    bottom: -40,
    left: -30,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: Colors.radius.md,
    backgroundColor: "#accfeb80",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Colors.spacing.lg,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: FontSize["2xl"],
    color: Colors.text.white,
  },
  subtitle: {
    marginTop: Colors.spacing.sm,
    fontFamily: Fonts.regular,
    fontSize: FontSize.sm,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 20,
  },
});
