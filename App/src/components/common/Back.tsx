import Colors from "@/constants/color";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type BackProps = {
  onPress?: () => void;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  absolute?: boolean;
  backgroundColor?: string;
};

const Back = ({
  onPress,
  top = 0,
  left = 0,
  absolute = true,
  backgroundColor,
}: BackProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
          return;
        }

        if (router.canGoBack()) {
          router.back();
        }
      }}
      style={[
        styles.button,
        backgroundColor && { backgroundColor: backgroundColor },
        absolute && {
          position: "absolute",
          top,
          left: left + 10,
        },
      ]}
    >
      <Ionicons name="arrow-back" size={24} color={Colors.black} />
    </TouchableOpacity>
  );
};

export default Back;

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
});
