import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import AuthHeader from "@/components/auth/AuthHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/color";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthError from "@/components/auth/AuthError";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.services";
import { saveAuthSession } from "@/services/storage";
import { useRouter } from "expo-router";
import { getDashboardRouteForRole } from "@/utils/authRoutes";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [errorString, setErrorString] = useState("");
  const { emailAddress, login } = useAuthStore();
  const router = useRouter();

  const handleReset = () => {
    setOtp("");
  };

  const handleVerify = async () => {
    try {
      if (!emailAddress.trim() || !otp.trim()) {
        setErrorString("Please fill all required fields.");
        return;
      }
      setLoading(true);
      setError({});
      setErrorString("");

      const { data } = await authService.verifyEmail(otp, emailAddress);

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
      handleReset();
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
            <AuthHeader screen="otp" />
            <AuthInput
              label="Verification Code"
              icon="person-outline"
              placeholder="Enter your OTP"
              value={otp}
              onChangeText={setOtp}
            />
            <View style={{ marginTop: 20 }}>
              {errorString && <AuthError error={errorString} />}
              <AuthButton
                title="Verify OTP"
                loading={loading}
                onPress={handleVerify}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTP;

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
});
