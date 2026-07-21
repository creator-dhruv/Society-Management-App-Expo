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

type ButtonTheme = "red" | "blue";
interface AuthButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  direction?: "right" | "left";
  theme?: ButtonTheme;
  icon?: string;
  w?: number;
  marginVertical?: number;
}

const colorTheme: Record<ButtonTheme, [string, string, string]> = {
  red: ["#FF8A8A", "#FF5C5C", "#EF4444"],
  blue: ["#6DBBFF", "#3B9DFF", "#1E7CF8"],
} as const;

export default function Button({
  title,
  loading = false,
  theme = "blue",
  direction = "right",
  w = 0.85,
  marginVertical = 10,
  disabled,
  style,
  icon,
  ...props
}: AuthButtonProps) {
  const isDisabled = disabled || loading;
  const { width } = useWindowDimensions();

  return (
    <TouchableOpacity activeOpacity={0.4} disabled={isDisabled} {...props}>
      <LinearGradient
        colors={colorTheme[theme]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.primaryButton,
          { width: width * w, marginVertical: marginVertical },
        ]}
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
            {direction == "left" && (
              <Ionicons
                name={(icon as any) || "arrow-forward"}
                size={20}
                color={Colors.white}
              />
            )}
            <Text style={styles.primaryText}>{title}</Text>
            {direction == "right" && (
              <Ionicons
                name={(icon as any) || "arrow-forward"}
                size={20}
                color={Colors.white}
              />
            )}
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    minHeight: 50,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
});
