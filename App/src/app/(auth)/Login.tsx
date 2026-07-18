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
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import RoleSelector from "@/components/auth/RoleSelector";
import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/types/auth";
import { getDashboardRouteForRole } from "@/utils/authRoutes";

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing details", "Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      await signIn({ email: email.trim(), password, role });
      router.replace(getDashboardRouteForRole(role));
    } catch (error) {
      Alert.alert(
        "Login failed",
        error instanceof Error ? error.message : "Unable to sign in.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formCard}>
            <AuthInput
              label="Email"
              icon="mail-outline"
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />

            <AuthInput
              label="Password"
              icon="lock-closed-outline"
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.togglePassword}
            >
              <Text style={styles.togglePasswordText}>
                {showPassword ? "Hide password" : "Show password"}
              </Text>
            </TouchableOpacity>

            <Link href="/ForgotPassword" asChild>
              <TouchableOpacity style={styles.forgotLink}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </Link>

            <AuthButton
              title="Sign In"
              loading={loading}
              onPress={handleLogin}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>New to the society app?</Text>
              <Link href="/Signup" asChild>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Create an account</Text>
                </TouchableOpacity>
              </Link>
            </View>

            <View style={styles.demoBox}>
              <Text style={styles.demoTitle}>Demo accounts</Text>
              <Text style={styles.demoText}>user@demo.com / demo123</Text>
              <Text style={styles.demoText}>admin@demo.com / demo123</Text>
              <Text style={styles.demoText}>guard@demo.com / demo123</Text>
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
    padding: 20,
    paddingBottom: 40,
  },
  formCard: {
    padding: 20,
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
    marginTop: Colors.spacing.xl,
    alignItems: "center",
    gap: Colors.spacing.xs,
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
  demoBox: {
    marginTop: Colors.spacing.xl,
    padding: Colors.spacing.lg,
    borderRadius: Colors.radius.md,
    backgroundColor: Colors.surfaceTertiary,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  demoTitle: {
    fontFamily: Fonts.semibold,
    fontSize: FontSize.sm,
    color: Colors.text.primary,
    marginBottom: Colors.spacing.sm,
  },
  demoText: {
    fontFamily: Fonts.regular,
    fontSize: FontSize.xs,
    color: Colors.text.tertiary,
    marginTop: 2,
  },
});
