import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

import Button from "@/components/common/Button";
import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SecurityHeader from "@/components/security/SecurityHeader";
import WaitingApprovalSection from "@/components/security/WaitingApprovalSection";

import { WaitingVisitor } from "@/components/security/WaitingApprovalSection";

const waitingVisitors: WaitingVisitor[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    flat: "B-302",
    waitingTime: "2 min",
    type: "visitor",
  },
  {
    id: "2",
    name: "Amazon Delivery",
    flat: "A-102",
    waitingTime: "38 sec",
    type: "delivery",
  },
  {
    id: "3",
    name: "Priya Verma",
    flat: "C-204",
    waitingTime: "1 min",
    type: "visitor",
  },
  {
    id: "4",
    name: "Swiggy Delivery",
    flat: "D-108",
    waitingTime: "55 sec",
    type: "delivery",
  },
  {
    id: "5",
    name: "Ramesh Kumar",
    flat: "A-405",
    waitingTime: "4 min",
    type: "househelp",
  },
  {
    id: "6",
    name: "Ankit Gupta",
    flat: "B-501",
    waitingTime: "3 min",
    type: "visitor",
  },
  {
    id: "7",
    name: "Blinkit Delivery",
    flat: "E-210",
    waitingTime: "28 sec",
    type: "delivery",
  },
  {
    id: "8",
    name: "Sunita Devi",
    flat: "F-106",
    waitingTime: "6 min",
    type: "househelp",
  },
  {
    id: "9",
    name: "Ajay Singh",
    flat: "C-312",
    waitingTime: "1 min",
    type: "visitor",
  },
  {
    id: "10",
    name: "Zomato Delivery",
    flat: "A-215",
    waitingTime: "42 sec",
    type: "delivery",
  },
];

const Index = () => {
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView style={[styles.container, { paddingTop: top }]}>
      <View style={styles.content}>
        {/* Header */}
        <SecurityHeader />

        {/* Actions */}

        <View style={styles.actions}>
          <Button
            title="Scan Visitor QR"
            icon="qr-code-outline"
            onPress={() => {}}
          />

          <Button
            title="Request Approval"
            icon="paper-plane-outline"
            onPress={() => {}}
          />
        </View>

        {/* Status */}
        <WaitingApprovalSection
          data={waitingVisitors}
          onPress={(visitor) => {
            console.log(visitor);

            // Example:
            // router.push(`/visitor/${visitor.id}`);
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 40,
  },

  actions: {
    alignItems: "center",
    marginTop: 40,
  },
});
