import Header from "@/components/Header";
import QuickActionContainer from "@/components/QuickActionContainer";
import {
  VisitorApprovalCard,
  DeliveryApprovalCard,
  HouseHelpApprovalCard,
  ApprovalCardStack,
} from "@/components/VisitorApprovalCard";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <ApprovalCardStack
          children={[
            <VisitorApprovalCard />,
            <VisitorApprovalCard />,
            <DeliveryApprovalCard />,
            <HouseHelpApprovalCard />,
          ]}
        />
        <QuickActionContainer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
  },
});
