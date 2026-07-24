import Ionicons from "@react-native-vector-icons/ionicons";
import { Tabs, useRouter } from "expo-router";
import TabBar from "@/components/common/TabBar";
import Back from "@/components/common/Back";
import { View } from "react-native";
import Colors from "@/constants/color";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomTab = (props: any) => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        position: "absolute",
        top: top,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        gap: 10,
      }}
    >
      <Back
        absolute={false}
        onPress={() => router.dismissTo("/(user)/(tabs)")}
        backgroundColor={Colors.surface}
      />
      <TabBar {...props} position="top" isWidthFull={true} absolute={false} />
    </View>
  );
};

export default function Layout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTab {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="notice"
        options={{
          title: "Notice",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "document-text" : "document-text-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="chats"
        options={{
          title: "Discussion",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="polls"
        options={{
          title: "Polls",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "stats-chart" : "stats-chart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
