import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";

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

  if (variant === "secondary") {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        disabled={isDisabled}
        style={[
          styles.secondaryButton,
          isDisabled ? styles.disabled : null,
          style,
        ]}
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
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={isDisabled}
      style={[isDisabled ? styles.disabled : null, style]}
      {...props}
    >
      <LinearGradient
        colors={["#6DBBFF", "#3B9DFF", "#1E7CF8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.primaryButton}
      >
        {loading ? (
          <ActivityIndicator color={Colors.text.white} />
        ) : (
          <Text style={styles.primaryText}>{title}</Text>
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
    ...Colors.shadowStyle.card,
  },
  primaryText: {
    fontFamily: Fonts.bold,
    fontSize: FontSize.md,
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
  disabled: {
    opacity: 0.6,
  },
});
