import TopTabContainer from "@/components/tabs/community/TopTabContainer";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <>
      {/* <TopTabContainer /> */}

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </>
  );
}
