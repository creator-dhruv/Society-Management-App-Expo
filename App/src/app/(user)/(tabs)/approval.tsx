import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";

export default function AddApprovalScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.icon}>
          <Ionicons name="add" size={34} color={Colors.primary} />
        </View>
        <Text style={styles.title}>Add approval</Text>
        <Text style={styles.description}>
          Create a visitor, delivery, or household-staff approval request.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 24,
    padding: 32,
    ...Colors.shadowStyle.card,
  },
  icon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.blue[50],
  },
  title: {
    marginTop: 16,
    fontFamily: Fonts.bold,
    fontSize: FontSize.xl,
    color: Colors.text.primary,
  },
  description: {
    marginTop: 8,
    fontFamily: Fonts.medium,
    fontSize: FontSize.sm,
    color: Colors.text.tertiary,
    textAlign: "center",
    lineHeight: 20,
  },
});
