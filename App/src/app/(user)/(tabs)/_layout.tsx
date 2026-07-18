import { useFonts } from "expo-font";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";

import Ionicons from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";
import { Pressable, Text } from "react-native";
import { BlurView } from "expo-blur";
import Colors from "@/constants/color";
import { Fonts } from "@/constants/font";

function CustomTabBar({ state, descriptors, navigation }: any) {
  const currentRoute = state.routes[state.index].name;

  if (currentRoute !== "index") {
    return null;
  }

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
        marginHorizontal: 4,
        backgroundColor: "#ffffff8d",
        borderRadius: Colors.radius.pill,
        overflow: "hidden",
        flexDirection: "row",
        justifyContent:
          state.index === 0
            ? "flex-start"
            : state.index === 1
              ? "center"
              : "flex-end",
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

        const label = options.title ?? options.tabBarLabel ?? route.name;

        let iconName: any = "ellipse";

        if (route.name === "index") iconName = "home";
        if (route.name === "(community)") iconName = "people";
        if (route.name === "approval") iconName = "add-circle";

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
              name={iconName}
              size={focused ? 24 : 30}
              color={focused ? Colors.text.white : Colors.icon.dark}
            />

            {focused && (
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
            )}
          </Pressable>
        );
      })}
    </BlurView>
  );
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
        }}
      />

      <Tabs.Screen
        name="(community)"
        options={{
          title: "Community",
        }}
      />
      <Tabs.Screen
        name="approval"
        options={{
          title: "Add Approval",
        }}
      />
    </Tabs>
  );
}
