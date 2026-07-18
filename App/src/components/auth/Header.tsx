import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/color";
import { Fonts } from "@/constants/font";

type HeaderProps = {
  screen: "login" | "signin" | "forgotPassword" | "roleSelection";
};

const Header = ({ screen }: HeaderProps) => {
  const content = {
    login: {
      title: "Welcome Back 👋",
      subtitle: "Sign in to continue managing your society.",
    },
    signin: {
      title: "Create Account",
      subtitle: "Join your society in just a few simple steps.",
    },
    forgotPassword: {
      title: "Forgot Password?",
      subtitle: "Enter your registered email to reset your password.",
    },
    roleSelection: {
      title: "Choose Your Role",
      subtitle: "Select how you want to continue.",
    },
  };

  const { title, subtitle } = content[screen];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 32,
    // gap: 8,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.black,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: Fonts.medium,
    color: Colors.text.tertiary,
  },
});
