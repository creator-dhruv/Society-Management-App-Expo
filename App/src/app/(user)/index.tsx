import Header from "@/components/Header";
import QuickActionContainer from "@/components/QuickActionContainer";
import ApprovalCardStack from "@/components/ApprovalCardStack";
import UpcomingEventsContainer from "@/components/UpcomingEventsContainer";
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
    backgroundColor: Colors.background,
  },
  contentSurface: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: Colors.spacing.md,
    paddingTop: Colors.spacing.xl,
  },
  eventsSurface: {
    marginTop: Colors.spacing.sm,
    paddingTop: Colors.spacing.xl,
    paddingBottom: 120,
  },
});
