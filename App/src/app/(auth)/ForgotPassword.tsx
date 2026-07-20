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
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { BlurView } from "expo-blur";

import AuthButton from "@/components/auth/AuthButton";
import AuthInput from "@/components/auth/AuthInput";
import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthError from "@/components/auth/AuthError";

export default function ForgotPassword() {
  const router = useRouter();
  // const { forgotPassword } = useAuthStore((state) => state.fo);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorString, setErrorString] = useState("");

  const handleReset = async () => {
    if (!email.trim()) {
      setErrorString("Please enter your registered email.");
      return;
    }

    setErrorString("");

    setLoading(true);
    try {
      setSent(true);
    } catch (error) {
      Alert.alert(
        "Reset failed",
        error instanceof Error ? error.message : "Unable to process request.",
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
          <TouchableOpacity
            onPress={() => router.dismissTo("/(auth)/Login")}
            style={styles.backButton}
          >
            <BlurView intensity={85} tint="light" style={styles.backBlur}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={Colors.text.primary}
              />
            </BlurView>
          </TouchableOpacity>

          <View style={styles.formCard}>
            {sent ? (
              <View style={styles.successBox}>
                <Ionicons
                  name="checkmark-circle"
                  size={48}
                  color={Colors.success}
                />
                <Text style={styles.successTitle}>Check your email</Text>
                <Text style={styles.successText}>
                  If an account exists for {email}, password reset instructions
                  have been sent.
                </Text>
                <View style={{ marginTop: 20 }}>
                  <AuthButton
                    title="Back to Sign In"
                    onPress={() => router.replace("/Login")}
                    style={styles.backToLogin}
                  />
                </View>
              </View>
            ) : (
              <>
                <AuthHeader screen="forgotPassword" />
                <AuthInput
                  label="Email Address"
                  icon="mail-outline"
                  placeholder="you@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                />
                <View style={{ marginTop: 20 }}>
                  {errorString && <AuthError error={errorString} />}
                  <AuthButton
                    title="Send Reset Link"
                    loading={loading}
                    onPress={handleReset}
                  />
                </View>
              </>
            )}
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: Colors.spacing.lg,
  },
  backBlur: {
    width: 50,
    height: 50,
    borderRadius: Colors.radius.pill,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#9d9a9a3c",
    backgroundColor: "#ffffff60",
  },
  formCard: {
    padding: 20,
  },
  successBox: {
    alignItems: "center",
    paddingVertical: Colors.spacing.lg,
  },
  successTitle: {
    marginTop: Colors.spacing.lg,
    fontFamily: Fonts.bold,
    fontSize: FontSize.lg,
    color: Colors.text.primary,
  },
  successText: {
    marginTop: Colors.spacing.sm,
    textAlign: "center",
    fontFamily: Fonts.regular,
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  backToLogin: {
    marginTop: Colors.spacing.xl,
    width: "100%",
  },
});
