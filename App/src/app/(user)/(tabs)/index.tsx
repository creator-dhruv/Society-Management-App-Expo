import Header from "@/components/tabs/index/Header";
import QuickActionContainer from "@/components/tabs/index/QuickActionContainer";
import ApprovalCardStack from "@/components/tabs/index/ApprovalCardStack";
import UpcomingEventsContainer from "@/components/tabs/index/UpcomingEventsContainer";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/color";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <ApprovalCardStack />
        <View style={styles.contentSurface}>
          <QuickActionContainer />
          <View style={styles.eventsSurface}>
            <UpcomingEventsContainer />
          </View>
        </View>
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
    backgroundColor: Colors.background,
  },
  contentSurface: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 16,
    paddingTop: 20,
  },
  eventsSurface: {
    marginTop: 12,
    paddingTop: 20,
    paddingBottom: 120,
  },
});
