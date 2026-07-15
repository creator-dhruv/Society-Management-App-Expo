import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@react-native-vector-icons/ionicons";

import useDimension from "@/hooks/dimensions";
import Colors from "@/constants/color";
import { Fonts } from "@/constants/font";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Layout,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { useState } from "react";

const ApprovalCard = ({ data, onDismiss }) => {
  const { width } = useDimension();

  const theme = Colors.approvalCard[data.type];

  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        translateX: translateX.value,
      },
      {
        scale: scale.value,
      },
      {
        rotate: `${rotate.value}deg`,
      },
    ],
  }));

  const dismiss = (direction) => {
    scale.value = withTiming(0.95, { duration: 120 });

    rotate.value = withTiming(direction === "right" ? 8 : -8, {
      duration: 300,
    });

    translateX.value = withTiming(direction === "right" ? 600 : -600, {
      duration: 350,
    });

    opacity.value = withTiming(
      0,
      {
        duration: 300,
      },
      (finished) => {
        if (finished) {
          runOnJS(onDismiss)();
        }
      },
    );
  };

  return (
    <Animated.View style={animatedStyle}>
      <LinearGradient
        colors={theme.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width,
          padding: 22,
          borderRadius: 28,
          overflow: "hidden",

          shadowColor: theme.shadow,
          shadowOpacity: 0.35,
          shadowRadius: 18,
          shadowOffset: {
            width: 0,
            height: 10,
          },

          elevation: 12,
        }}
      >
        {/* Glow */}

        <View
          style={{
            position: "absolute",
            top: -60,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: theme.glowTop,
          }}
        />

        <View
          style={{
            position: "absolute",
            bottom: -70,
            left: -40,
            width: 140,
            height: 140,
            borderRadius: 70,
            backgroundColor: theme.glowBottom,
          }}
        />

        {/* Header */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: theme.text,
                fontFamily: Fonts.bold,
                fontSize: 24,
              }}
            >
              {data.title}
            </Text>

            <Text
              style={{
                marginTop: 4,
                color: theme.subText,
                fontFamily: Fonts.medium,
                fontSize: 14,
              }}
            >
              {data.subtitle}
            </Text>
          </View>

          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.12)",
            }}
          >
            <Ionicons name={data.icon} size={30} color={theme.iconColor} />
          </View>
        </View>

        {/* Body */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <View
            style={{
              width: 58,
              height: 58,
              borderRadius: 29,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.iconBackground,
            }}
          >
            <Ionicons name={data.icon} size={30} color={theme.iconColor} />
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: 14,
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontSize: 18,
                fontFamily: Fonts.bold,
              }}
            >
              {data.name}
            </Text>

            <Text
              style={{
                marginTop: 4,
                color: theme.subText,
                fontSize: 14,
                fontFamily: Fonts.medium,
              }}
            >
              {data.info}
            </Text>
          </View>

          <Ionicons
            name="chevron-forward-circle"
            size={30}
            color={theme.iconColor}
          />
        </View>

        {/* Buttons */}

        <View
          style={{
            flexDirection: "row",
            marginTop: 24,
          }}
        >
          <TouchableOpacity
            onPress={() => dismiss("right")}
            style={{
              flex: 1,
              height: 52,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.primaryButton,
              marginRight: 10,
            }}
          >
            <Text
              style={{
                color: theme.primaryButtonText,
                fontFamily: Fonts.bold,
              }}
            >
              {data.primaryButton}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => dismiss("left")}
            style={{
              flex: 1,
              height: 52,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.secondaryButton,
              borderWidth: 1,
              borderColor: theme.secondaryBorder,
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontFamily: Fonts.bold,
              }}
            >
              {data.secondaryButton}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const CARD_HEIGHT = 285;
const STACK_OFFSET = 18;
const MAX_VISIBLE = 3;

const INITIAL_CARDS = [
  {
    id: "1",
    type: "visitor",
    title: "Visitor Waiting",
    subtitle: "Approval required",
    name: "Rahul Sharma",
    info: "Main Gate • 2 min ago",
    primaryButton: "Approve",
    secondaryButton: "Reject",
    icon: "person-circle-outline",
  },
  {
    id: "2",
    type: "delivery",
    title: "Delivery Waiting",
    subtitle: "Verify before entry",
    name: "Blinkit Delivery",
    info: "Gate 2 • 1 min ago",
    primaryButton: "Share OTP",
    secondaryButton: "Reject",
    icon: "cube-outline",
  },
  {
    id: "3",
    type: "houseHelp",
    title: "House Help",
    subtitle: "Daily Staff",
    name: "Sunita Devi",
    info: "7:58 AM",
    primaryButton: "Allow",
    secondaryButton: "Deny",
    icon: "person-outline",
  },
  {
    id: "4",
    type: "visitor",
    title: "Visitor Waiting",
    subtitle: "Approval required",
    name: "Rahul Sharma",
    info: "Main Gate • 2 min ago",
    primaryButton: "Approve",
    secondaryButton: "Reject",
    icon: "person-circle-outline",
  },
  {
    id: "5",
    type: "delivery",
    title: "Delivery Waiting",
    subtitle: "Verify before entry",
    name: "Blinkit Delivery",
    info: "Gate 2 • 1 min ago",
    primaryButton: "Share OTP",
    secondaryButton: "Reject",
    icon: "cube-outline",
  },
  {
    id: "6",
    type: "houseHelp",
    title: "House Help",
    subtitle: "Daily Staff",
    name: "Sunita Devi",
    info: "7:58 AM",
    primaryButton: "Allow",
    secondaryButton: "Deny",
    icon: "person-outline",
  },
];

const ApprovalCardStack = () => {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const { width } = useDimension();

  const removeCard = (id) => {
    setCards((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View
      style={{
        marginTop: 20,
        paddingHorizontal: 10,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        height:
          CARD_HEIGHT +
          STACK_OFFSET * (Math.min(cards.length, MAX_VISIBLE) - 2) +
          5,
        width: width,
      }}
    >
      {cards.slice(0, MAX_VISIBLE).map((card, index) => {
        const scale = 1 - index * 0.04;
        const translateY = index * STACK_OFFSET;

        return (
          <Animated.View
            key={card.id}
            entering={FadeIn.duration(250)}
            exiting={FadeOut.duration(250)}
            layout={Layout.springify()}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: translateY,
              zIndex: MAX_VISIBLE - index,
              transform: [{ scale }],
            }}
          >
            <ApprovalCard data={card} onDismiss={() => removeCard(card.id)} />
          </Animated.View>
        );
      })}
    </View>
  );
};

export default ApprovalCardStack;
