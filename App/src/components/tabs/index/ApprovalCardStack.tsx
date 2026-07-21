import React, { useState } from "react";
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
  FadeIn,
  FadeOut,
  Layout,
} from "react-native-reanimated";
import Button from "@/components/common/Button";
import EmptyStateContainer from "@/components/common/EmptyStateContainer";

const ApprovalCard = ({ data, onDismiss }: any) => {
  const { width } = useDimension();
  const cardWidth = width - Colors.spacing.xl * 2;

  const theme =
    Colors.approvalCard[data.type as keyof typeof Colors.approvalCard];

  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  const dismiss = (direction: "right" | "left") => {
    scale.value = withTiming(0.95, {
      duration: 120,
    });

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
        style={[styles.card, { width: cardWidth }]}
      >
        {/* Glow */}

        <View
          style={[
            styles.topGlow,
            {
              backgroundColor: theme.glowTop,
            },
          ]}
        />

        <View
          style={[
            styles.bottomGlow,
            {
              backgroundColor: theme.glowBottom,
            },
          ]}
        />

        {/* Header */}

        <View style={styles.header}>
          <View>
            <Text
              style={[
                styles.title,
                {
                  color: theme.text,
                },
              ]}
            >
              {data.title}
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.subText,
                },
              ]}
            >
              {data.subtitle}
            </Text>
          </View>

          <View style={styles.headerIconContainer}>
            <Ionicons name={data.icon} size={30} color={theme.iconColor} />
          </View>
        </View>

        {/* Body */}

        <View style={styles.body}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: theme.iconBackground,
              },
            ]}
          >
            <Ionicons name={data.icon} size={30} color={theme.iconColor} />
          </View>

          <View style={styles.info}>
            <Text
              style={[
                styles.name,
                {
                  color: theme.text,
                },
              ]}
            >
              {data.name}
            </Text>

            <Text
              style={[
                styles.infoText,
                {
                  color: theme.subText,
                },
              ]}
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

        <View style={styles.buttonRow}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`${data.primaryButton} ${data.title}`}
            onPress={() => dismiss("right")}
            style={[
              styles.primaryButton,
              {
                backgroundColor: theme.primaryButton,
              },
            ]}
          >
            <Text
              style={[
                styles.primaryButtonText,
                {
                  color: theme.primaryButtonText,
                },
              ]}
            >
              {data.primaryButton}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`${data.secondaryButton} ${data.title}`}
            onPress={() => dismiss("left")}
            style={[
              styles.secondaryButton,
              {
                backgroundColor: theme.secondaryButton,
                borderColor: theme.secondaryBorder,
              },
            ]}
          >
            <Text
              style={[
                styles.secondaryButtonText,
                {
                  color: theme.text,
                },
              ]}
            >
              {data.secondaryButton}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

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
    name: "Amit Verma",
    info: "Gate 1 • Just now",
    primaryButton: "Approve",
    secondaryButton: "Reject",
    icon: "person-circle-outline",
  },
  {
    id: "5",
    type: "delivery",
    title: "Delivery Waiting",
    subtitle: "Verify before entry",
    name: "Amazon Delivery",
    info: "Main Gate • 3 min ago",
    primaryButton: "Share OTP",
    secondaryButton: "Reject",
    icon: "cube-outline",
  },
  {
    id: "6",
    type: "houseHelp",
    title: "House Help",
    subtitle: "Daily Staff",
    name: "Ramesh Kumar",
    info: "8:05 AM",
    primaryButton: "Allow",
    secondaryButton: "Deny",
    icon: "person-outline",
  },
];

const ApprovalCardStack = () => {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const MAX_VISIBLE = 3;
  const CARD_HEIGHT = 280;
  const STACK_OFFSET = 12;

  const { width } = useDimension();
  const cardWidth = width - 40;

  const removeCard = (id: string) => {
    setCards((prev) => prev.filter((item) => item.id !== id));
  };

  const containerHeight =
    (cards.length !== 0 &&
      CARD_HEIGHT + STACK_OFFSET * (Math.min(cards.length, MAX_VISIBLE) - 2)) ||
    "auto";

  return (
    <View
      style={[
        stackStyles.container,
        {
          width: cardWidth,
          height: containerHeight,
        },
      ]}
    >
      {cards.length === 0 ? (
        <EmptyStateContainer
          title="No More Approvals"
          subTitle="There are no visitor, delivery or staff approvals waiting right now."
          buttonTitle="Live monitoring enabled"
        />
      ) : (
        cards.slice(0, MAX_VISIBLE).map((card, index) => {
          const scale = 1 - index * 0.04;
          const translateY = index * STACK_OFFSET;

          return (
            <Animated.View
              key={card.id}
              entering={FadeIn.duration(250)}
              exiting={FadeOut.duration(250)}
              layout={Layout.springify()}
              style={[
                stackStyles.cardWrapper,
                {
                  top: translateY,
                  zIndex: MAX_VISIBLE - index,
                  transform: [{ scale }],
                },
              ]}
            >
              <ApprovalCard data={card} onDismiss={() => removeCard(card.id)} />
            </Animated.View>
          );
        })
      )}
    </View>
  );
};

export default ApprovalCardStack;

const styles = StyleSheet.create({
  card: {
    padding: 22,
    borderRadius: 28,
    overflow: "hidden",
    ...Colors.shadowStyle.card,
  },

  topGlow: {
    position: "absolute",
    top: -60,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
  },

  bottomGlow: {
    position: "absolute",
    bottom: -70,
    left: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
  },

  subtitle: {
    marginTop: 4,
    fontFamily: Fonts.medium,
    fontSize: 14,
  },

  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  body: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontFamily: Fonts.bold,
    fontSize: 18,
  },

  infoText: {
    marginTop: 4,
    fontFamily: Fonts.medium,
    fontSize: 14,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 24,
  },

  primaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  primaryButtonText: {
    fontFamily: Fonts.bold,
  },

  secondaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  secondaryButtonText: {
    fontFamily: Fonts.bold,
  },
});

const stackStyles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  cardWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
  },
});
