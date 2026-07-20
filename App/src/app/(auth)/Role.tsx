import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import RoleSelector from "@/components/auth/RoleSelector";
import { UserRole } from "@/types/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthHeader from "@/components/auth/AuthHeader";
import Colors from "@/constants/color";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Fonts } from "@/constants/font";
import { useRouter } from "expo-router";
import AuthButton from "@/components/auth/AuthButton";
import { useAuthStore } from "@/store/auth.store";

const Role = () => {
  // const [role, setRole] = useState<UserRole>("user");
  const router = useRouter();
  const role = useAuthStore((state) => state.role);
  const setRole = useAuthStore((state) => state.setRole);
  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader screen="roleSelection" />
      <RoleSelector value={role} onChange={setRole} />
      <AuthButton title="Next" onPress={() => router.push("/(auth)/Signup")} />
    </SafeAreaView>
  );
};

export default Role;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
