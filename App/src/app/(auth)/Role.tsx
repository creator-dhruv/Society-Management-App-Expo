import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import RoleSelector from "@/components/auth/RoleSelector";
import { UserRole } from "@/types/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/auth/Header";
import Colors from "@/constants/color";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Fonts } from "@/constants/font";
import { useRouter } from "expo-router";

const Role = () => {
  const [role, setRole] = useState<UserRole>("user");
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Header screen="roleSelection" />
      <RoleSelector value={role} onChange={setRole} />
      <TouchableOpacity
        onPress={() => router.push("/(auth)/Login")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          paddingVertical: 9,
          paddingHorizontal: 20,
          borderRadius: 20,
          backgroundColor: "#2f94face",
          alignSelf: "center",
          justifyContent: "center",
          width: "100%",
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            color: Colors.white,
            fontFamily: Fonts.semibold,
            fontSize: 16,
          }}
        >
          Next
        </Text>
        <Ionicons name="arrow-forward" size={16} color={Colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Role;

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
});
