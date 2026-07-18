import Colors from "@/constants/color";
import { Fonts } from "@/constants/font";
import { BlurView } from "expo-blur";
import { router, usePathname } from "expo-router";
import Ionicons from "@react-native-vector-icons/ionicons";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import useDimension from "@/hooks/dimensions";

const tabs = [
  {
    title: "Feed",
    route: "/",
    icon: "people",
  },
  {
    title: "Polls",
    route: "/polls",
    icon: "stats-chart",
  },
];

export default function TopTabContainer() {
  const pathname = usePathname();
  const { width } = useDimension();

  const containerWidth = width - 80;
  const tabWidth = (containerWidth - 16) / tabs.length;

  const translateX = useSharedValue(0);

  useEffect(() => {
    const index = tabs.findIndex((t) => t.route === pathname);

    translateX.value = withSpring(index * tabWidth, {
      stiffness: 280,
    });
  }, [pathname, tabWidth]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <BlurView
      intensity={85}
      tint="light"
      style={{
        marginHorizontal: 40,
        marginTop: 16,
        height: 65,
        borderRadius: Colors.radius.pill,
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        backgroundColor: "#ffffff8d",
        borderWidth: 1.5,
        borderColor: "#514a4a52",
        ...Colors.shadowStyle.card,
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            left: 8,
            width: tabWidth,
            height: 50,
            borderRadius: 25,
            backgroundColor: Colors.text.primary,
          },
          indicatorStyle,
        ]}
      />

      {tabs.map((tab) => {
        const focused = pathname === tab.route;

        return (
          <Pressable
            key={tab.route}
            onPress={() => router.replace(tab.route as any)}
            style={{
              width: tabWidth,
              height: 50,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <Ionicons
              name={tab.icon as any}
              size={focused ? 22 : 24}
              color={focused ? Colors.text.white : Colors.icon.dark}
            />
            (
            <Text
              style={{
                color: focused ? Colors.text.white : Colors.icon.dark,
                marginLeft: 8,
                fontSize: 15,
                fontFamily: Fonts.semibold,
              }}
            >
              {tab.title}
            </Text>
            )
          </Pressable>
        );
      })}
    </BlurView>
  );
}
