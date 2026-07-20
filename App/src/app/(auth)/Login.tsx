import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthButton from "@/components/auth/AuthButton";
import AuthInput from "@/components/auth/AuthInput";
import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";
// import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/types/auth";
import { getDashboardRouteForRole } from "@/utils/authRoutes";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.services";
import { saveAuthSession } from "@/services/storage";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthError from "@/components/auth/AuthError";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});
  const [errorString, setErrorString] = useState("");
  const { width } = useWindowDimensions();
  const { login, user } = useAuthStore();

  const handleReset = () => {
    setEmail("");
    setError({});
    setErrorString("");
    setPassword("");
  };

  const handleLogin = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        setErrorString("Please fill all required fields.");
        return;
      }
      setLoading(true);
      setError({});
      setErrorString("");

      const { data } = await authService.login({
        email: email,
        password: String(password),
      });

      // Save tokens
      await saveAuthSession({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      // Update Zustand
      login(data.user, data.accessToken, data.refreshToken);

      // Navigate based on actual user role
      router.replace(getDashboardRouteForRole(data.user.role) as any);
    } catch (error: any) {
      typeof error?.response?.data?.message == "object"
        ? setError(error?.response?.data?.message)
        : setErrorString(error?.response?.data?.message);
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
          {/* <AuthHeader title="Welcome back!" subtitle="Login to get access" /> */}
          <AuthHeader screen="login" />
          <View style={styles.formCard}>
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
              secureTextEntry={true}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              error={error.password}
            />

            <TouchableOpacity
              style={styles.forgotLink}
              onPress={() => {
                router.dismissTo("/(auth)/ForgotPassword");
                handleReset();
              }}
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            {errorString && <AuthError error={errorString} />}

            <AuthButton title="Login" loading={loading} onPress={handleLogin} />

            <View style={styles.footer}>
              <Text style={styles.footerText}>New to the society app?</Text>
              <TouchableOpacity
                onPress={() => {
                  router.push("/(auth)/Role");
                  handleReset();
                }}
              >
                <Text style={styles.footerLink}>Create an account</Text>
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
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  formCard: {
    padding: 20,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  togglePassword: {
    alignSelf: "flex-end",
    marginTop: -8,
    marginBottom: Colors.spacing.sm,
  },
  togglePasswordText: {
    fontFamily: Fonts.medium,
    fontSize: FontSize.xs,
    color: Colors.primary,
  },
  forgotLink: {
    alignSelf: "flex-end",
    marginBottom: Colors.spacing.lg,
  },
  forgotText: {
    fontFamily: Fonts.semibold,
    fontSize: FontSize.sm,
    color: Colors.primary,
  },
  footer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
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
