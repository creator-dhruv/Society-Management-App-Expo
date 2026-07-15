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
import { View, Pressable, Text } from "react-native";

function CustomTabBar({ state, descriptors, navigation }: any) {
  const currentRoute = state.routes[state.index].name;

  if (currentRoute === "plus") {
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        left: 40,
        right: 40,
        bottom: 20,
        height: 65,
        marginHorizontal: 4,
        backgroundColor: "#ffffffd9",
        borderRadius: 35,
        flexDirection: "row",
        justifyContent:
          state.index == 0
            ? "flex-start"
            : state.index == 1
              ? "center"
              : "flex-end",
        alignItems: "center",
        paddingHorizontal: 8,
        elevation: 10,
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const focused = state.index === index;

        const { options } = descriptors[route.key];

        const label = options.title ?? options.tabBarLabel ?? route.name;

        let iconName: any = "ellipse";

        if (route.name === "index") iconName = "home";
        if (route.name === "demo") iconName = "people";
        if (route.name === "plus") iconName = "add-circle";

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
              backgroundColor: focused ? "#000" : "transparent",
            }}
          >
            <Ionicons
              name={iconName}
              size={focused ? 24 : 30}
              color={focused ? "#fff" : "#000"}
            />

            {focused && (
              <Text
                style={{
                  color: focused ? "#fff" : "#000",
                  marginLeft: 8,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {label}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
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
        name="demo"
        options={{
          title: "Community",
        }}
      />
      <Tabs.Screen
        name="plus"
        options={{
          title: "Add Approval",
        }}
      />
    </Tabs>
  );
}
