import Ionicons from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";
import { Pressable, Text } from "react-native";
import { BlurView } from "expo-blur";

import Colors from "@/constants/color";
import { Fonts } from "@/constants/font";

function AdminTabBar({ state, descriptors, navigation }: any) {
  return (
    <BlurView
      intensity={85}
      tint="light"
      style={{
        position: "absolute",
        left: 40,
        right: 40,
        bottom: 20,
        height: 65,
        backgroundColor: "#ffffff8d",
        borderRadius: Colors.radius.pill,
        overflow: "hidden",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 8,
        borderWidth: 1.5,
        borderColor: "#514a4a52",
        ...Colors.shadowStyle.card,
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const focused = state.index === index;
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{
              height: 50,
              borderRadius: 25,
              paddingHorizontal: 18,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: focused
                ? Colors.text.primary
                : Colors.transparent,
            }}
          >
            <Ionicons
              name="shield-checkmark"
              size={focused ? 24 : 30}
              color={focused ? Colors.text.white : Colors.icon.dark}
            />
            {focused ? (
              <Text
                style={{
                  color: Colors.text.white,
                  marginLeft: 8,
                  fontSize: 16,
                  fontFamily: Fonts.semibold,
                }}
              >
                {label}
              </Text>
            ) : null}
          </Pressable>
        );
      })}
    </BlurView>
  );
}

export default function AdminTabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <AdminTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "Admin" }} />
    </Tabs>
  );
}
