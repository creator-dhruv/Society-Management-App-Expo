import Colors from "@/constants/color";
import { BlurView } from "expo-blur";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";

type BackProps = {
  onPress?: () => void;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

const Back = ({
  onPress,
  top = 0,
  bottom = 0,
  left = 0,
  right = 0,
}: BackProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (router.canGoBack()) {
          router.back();
        }
      }}
      style={{
        position: "absolute",
        left: left + 10,
        top: top + 0,
        width: 50,
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name="arrow-back" size={25} color={Colors.black} />
    </TouchableOpacity>
  );
};

export default Back;
