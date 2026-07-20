import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/color";
import { Fonts } from "@/constants/font";

type HeaderProps = {
  screen: "login" | "signup" | "forgotPassword" | "roleSelection" | "otp";
};

const AuthHeader = ({ screen }: HeaderProps) => {
  const content = {
    login: {
      badge: "WELCOME BACK",
      title: "Login to Portl",
      subtitle: "Sign in to manage your society with ease.",
      width: 75,
    },
    signup: {
      badge: "GET STARTED",
      title: "Create an Account",
      subtitle: "Join your community in just a few steps.",
      width: 140,
    },
    forgotPassword: {
      badge: "PASSWORD RESET",
      title: "Reset your Password",
      subtitle: "We'll email you a secure reset link.",
      width: 160,
    },
    roleSelection: {
      badge: "EXPERIENCE",
      title: "Choose your Role",
      subtitle: "Select to personalize your experience.",
      width: 75,
    },
    otp: {
      badge: "VERIFICATION",
      title: "Verify using OTP",
      subtitle: "We've sent a 6-digit verification code.",
      width: 70,
    },
  };

  const { badge, title, subtitle, width } = content[screen];

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <View style={styles.dot} />
        <Text style={styles.badgeText}>{badge}</Text>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.underlineContainer}>
          <View
            style={[
              styles.line1,
              {
                width: width,
              },
            ]}
          />
        </View>
      </View>

      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 40,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  badge: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 100,
    backgroundColor: Colors.blue[50],
    marginBottom: 22,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: 8,
  },

  badgeText: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: 11,
    letterSpacing: 1.2,
  },

  title: {
    fontFamily: Fonts.bold,
    fontSize: 34,
    lineHeight: 46,
    color: Colors.text.primary,
    letterSpacing: -1.2,
  },

  subtitle: {
    marginTop: 4,
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 26,
    color: Colors.text.muted,
    maxWidth: "90%",
    textAlign: "center",
  },
  titleContainer: {
    alignItems: "flex-end",
  },

  underlineContainer: {
    marginTop: 1,
  },

  line1: {
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
});
