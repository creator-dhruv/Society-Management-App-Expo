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

export default function Signup() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Missing details", "Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      await signUp({
        name,
        email,
        phone,
        flatNo,
        password,
        confirmPassword,
        role,
      });
      router.replace(getDashboardRouteForRole(role));
    } catch (error) {
      Alert.alert(
        "Signup failed",
        error instanceof Error ? error.message : "Unable to create account.",
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
          <AuthHeader
            title="Join your society"
            subtitle="Create an account for smooth guest approvals and community access"
            icon="person-add-outline"
          />

          <View style={styles.formCard}>
            <RoleSelector value={role} onChange={setRole} />

            <AuthInput
              label="Full name"
              icon="person-outline"
              placeholder="Your full name"
              value={name}
              onChangeText={setName}
            />

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
              label="Phone (optional)"
              icon="call-outline"
              placeholder="10-digit mobile number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            {role === "user" ? (
              <AuthInput
                label="Flat number"
                icon="home-outline"
                placeholder="e.g. A-1204"
                autoCapitalize="characters"
                value={flatNo}
                onChangeText={setFlatNo}
              />
            ) : null}

            <AuthInput
              label="Password"
              icon="lock-closed-outline"
              placeholder="Minimum 6 characters"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <AuthInput
              label="Confirm password"
              icon="lock-closed-outline"
              placeholder="Re-enter your password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <AuthButton
              title="Create Account"
              loading={loading}
              onPress={handleSignup}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <Link href="/Login" asChild>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Sign in</Text>
                </TouchableOpacity>
              </Link>
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
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  formCard: {
    backgroundColor: Colors.surface,
    borderRadius: Colors.radius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.divider,
    ...Colors.shadowStyle.card,
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
});
