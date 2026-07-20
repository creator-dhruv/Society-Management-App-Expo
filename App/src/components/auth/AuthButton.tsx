import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";
import Ionicons from "@react-native-vector-icons/ionicons";

interface AuthButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: "primary" | "secondary";
}

export default function AuthButton({
  title,
  loading = false,
  variant = "primary",
  disabled,
  style,
  ...props
}: AuthButtonProps) {
  const isDisabled = disabled || loading;
  const { width } = useWindowDimensions();

  if (variant === "secondary") {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        disabled={isDisabled}
        style={[styles.secondaryButton, style]}
        {...props}
      >
        {loading ? (
          <ActivityIndicator color={Colors.primary} />
        ) : (
          <Text style={styles.secondaryText}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.85} disabled={isDisabled} {...props}>
      <LinearGradient
        colors={["#6DBBFF", "#3B9DFF", "#1E7CF8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.primaryButton, { width: width * 0.85 }]}
      >
        {loading ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              gap: 10,
            }}
          >
            <Text style={styles.primaryText}>Loading</Text>
            <ActivityIndicator color={Colors.text.white} />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Text style={styles.primaryText}>{title}</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.white} />
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    minHeight: 56,
    borderRadius: Colors.radius.md,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    ...Colors.shadowStyle.card,
  },
  primaryText: {
    fontFamily: Fonts.bold,
    fontSize: FontSize.lg,
    color: Colors.text.white,
  },
  secondaryButton: {
    minHeight: 56,
    borderRadius: Colors.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.button.secondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryText: {
    fontFamily: Fonts.semibold,
    fontSize: FontSize.md,
    color: Colors.primary,
  },
});
