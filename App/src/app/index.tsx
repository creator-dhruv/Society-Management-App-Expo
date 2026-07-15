import Header from "@/components/Header";
import QuickActionContainer from "@/components/QuickActionContainer";
import ApprovalCardStack from "@/components/ApprovalCardStack";
import CommunityContainer from "@/components/CommunityContainer";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/color";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <ApprovalCardStack />
        <View
          style={{
            backgroundColor: Colors.surface,
            borderTopEndRadius: 40,
            borderTopStartRadius: 40,
            marginTop: 10,
            paddingVertical: 20,
            paddingBottom: 100,
            elevation: 5,
            shadowColor: Colors.black,
          }}
        >
          <QuickActionContainer />
        </View>

        {/* <CommunityContainer /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
