import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthButton from "@/components/auth/AuthButton";
import AuthInput from "@/components/auth/AuthInput";
import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";
import type { UserRole } from "@/types/auth";
import { getDashboardRouteForRole } from "@/utils/authRoutes";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.services";
import { saveAuthSession } from "@/services/storage";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthError from "@/components/auth/AuthError";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<Record<string, string>>({});
  const [errorString, setErrorString] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setName("");
    setEmail("");
    setError({});
    setErrorString("");
    setPassword("");
    setConfirmPassword("");
  };
  const { role, setEmailAddress } = useAuthStore();
  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorString("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError({});
    setErrorString("");

    try {
      await authService.register({
        name,
        email,
        password,
        confirmPassword,
        role,
      });
      setEmailAddress(email);
      handleReset();
      router.push("/(auth)/OTP");
    } catch (error: any) {
      if (error.response) {
        typeof error?.response?.data?.message == "object"
          ? setError(error?.response?.data?.message)
          : setErrorString(error?.response?.data?.message);
      } else {
        console.error("Error Message:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.flex} behavior={"padding"}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formCard}>
            <AuthHeader screen="signup" />
            <AuthInput
              label="Full name"
              icon="person-outline"
              placeholder="Your full name"
              value={name}
              onChangeText={setName}
              error={error.name}
            />

            <AuthInput
              label="Email Address"
              icon="mail-outline"
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              error={error.email}
            />

            <AuthInput
              label="Password"
              icon="lock-closed-outline"
              placeholder="Minimum 6 characters"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              error={error.password}
            />

            <AuthInput
              label="Confirm password"
              icon="lock-closed-outline"
              placeholder="Re-enter your password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={error.confirmPassword}
            />

            <View style={{ marginTop: 20 }}>
              {errorString && <AuthError error={errorString} />}
              <AuthButton
                title="Create Account"
                loading={loading}
                onPress={handleSignup}
              />
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  router.dismissTo("/(auth)/Login");
                  handleReset();
                }}
              >
                <Text style={styles.footerLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
    width: "100%",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingBottom: 40,
  },
  formCard: {
    padding: 20,
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    fontFamily: Fonts.regular,
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },
  footerLink: {
    fontFamily: Fonts.bold,
    fontSize: FontSize.sm,
    color: Colors.primary,
  },
});
