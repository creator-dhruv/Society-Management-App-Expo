import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/color";
import { Fonts } from "@/constants/font";
import { BlurView } from "expo-blur";

const TabBar = ({ state, descriptors, navigation }: any) => {
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <View
      style={[
        styles.wrapper,
        {
          bottom: Math.max(bottom, 20),
          width: width * 0.22 * state.routes.length,
        },
      ]}
    >
      <BlurView
        intensity={100}
        tint="light"
        blurMethod="dimezisBlurView"
        style={styles.blur}
      >
        {state.routes.map((route: any, index: number) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;

          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={[
                styles.tab,
                focused && { paddingHorizontal: 20 },
                focused && styles.activeTab,
              ]}
            >
              {options.tabBarIcon?.({
                focused,
                color: focused ? Colors.text.white : Colors.text.primary,
                size: focused ? 26 : 28,
              })}

              <Text
                style={[
                  styles.label,
                  { color: focused ? Colors.text.white : Colors.text.primary },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    alignSelf: "center",
  },

  blur: {
    height: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: "#ffffff85",
    borderWidth: 1,
    borderColor: "#0000001b",
    shadowColor: "#18161682",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,

    elevation: 12,
  },

  tab: {
    height: 56,
    borderRadius: 30,
    paddingHorizontal: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  activeTab: {
    backgroundColor: Colors.text.primary,
  },

  label: {
    fontFamily: Fonts.semibold,
    fontSize: 12,
  },
});
